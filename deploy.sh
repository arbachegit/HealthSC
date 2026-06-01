#!/bin/bash
# ═══════════════════════════════════════════════════════════
# Deploy discoveryHealth → https://iconsai.ai/aiFuture/
# Droplet: 192.81.212.31 (apex iconsai.ai)
#   - WorkingDirectory=/opt/aiFuture/app  ExecStart=node server.js  PORT=3212
#   - Caddy: handle /aiFuture* → 127.0.0.1:3212
#   - systemd: aiFuture.service
# Pipeline anti-deploy-fantasma (§17): build standalone → rsync (--delete) → restart → validate chunks.
# Clonado do deploy.sh canônico do intelligenceHub. NUNCA edita arquivos no servidor à mão.
# ═══════════════════════════════════════════════════════════

set -euo pipefail

SERVER="root@192.81.212.31"
APP_DIR="/opt/bg-health"
SERVICE="iconsai-bg-health"
DOMAIN="iconsai.ai"
BASEPATH="/discoveryhealth"
PORT="3103"
LOCAL_DIR="$(cd "$(dirname "$0")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; YELLOW='\033[1;33m'; NC='\033[0m'
log()  { echo -e "${CYAN}[$(date '+%H:%M:%S')]${NC} $1"; }
ok()   { echo -e "${GREEN}  ✓${NC} $1"; }
fail() { echo -e "${RED}  ✗${NC} $1"; exit 1; }
warn() { echo -e "${YELLOW}  ⚠${NC} $1"; }

COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "nogit")
BUILD_ID="dh-$(date -u +%Y%m%d-%H%M%S)-${COMMIT}"

echo ""
echo -e "${CYAN}═══════════════════════════════════════${NC}"
echo -e "${CYAN}  DEPLOY discoveryHealth — ${BUILD_ID}${NC}"
echo -e "${CYAN}═══════════════════════════════════════${NC}"
echo ""

# ── FASE 0: Pre-Check ──────────────────────────────────────
log "Fase 0: Pre-Check"
ssh -o ConnectTimeout=6 "$SERVER" 'echo ok' > /dev/null 2>&1 || fail "SSH não conecta em $SERVER"
ok "SSH OK"
ls "$LOCAL_DIR"/next.config.* >/dev/null 2>&1 || fail "next.config.* não encontrado"
[ -f "$LOCAL_DIR/package.json" ] || fail "package.json não encontrado"
ok "Arquivos locais OK"

# ── FASE 1: Stamp BUILD_ID ─────────────────────────────────
log "Fase 1: Stamp BUILD_ID em public/build-info.txt"
cd "$LOCAL_DIR"
mkdir -p public
echo "$BUILD_ID" > public/build-info.txt
ok "BUILD_ID stampado: $BUILD_ID"

# ── FASE 2: Build standalone ───────────────────────────────
log "Fase 2: Build standalone"
rm -rf .next
npx next build 2>&1 | tail -8
[ -d ".next/standalone" ] || fail "Build falhou — .next/standalone não existe"
[ -d ".next/static" ]     || fail "Build falhou — .next/static não existe"
ok "Build standalone OK"

# ── FASE 3: Publish ────────────────────────────────────────
log "Fase 3: Publish"
ssh "$SERVER" "mkdir -p $APP_DIR/.next/static"

log "  3a. Standalone (sem --delete)"
rsync -avz --exclude='.env.local' --exclude='.env' \
  .next/standalone/ "$SERVER:$APP_DIR/" 2>&1 | tail -2
ok "Standalone publicado"

log "  3b. Static (com --delete)"
rsync -avz --delete .next/static/ "$SERVER:$APP_DIR/.next/static/" 2>&1 | tail -2
ok "Static publicado"

log "  3c. Public (com --delete)"
rsync -avz --delete public/ "$SERVER:$APP_DIR/public/" 2>&1 | tail -2
ok "Public publicado"

# ── FASE 3b: Bootstrap idempotente (cria só se faltar) ─────
log "Fase 3b: Bootstrap (systemd + Caddy — idempotente)"
ssh "$SERVER" 'bash -s' "$APP_DIR" "$SERVICE" "$PORT" "$BASEPATH" <<'REMOTE'
set -e
APP_DIR="$1"; SERVICE="$2"; PORT="$3"; BASEPATH="$4"

if [ ! -f "/etc/systemd/system/${SERVICE}.service" ]; then
  cat > "/etc/systemd/system/${SERVICE}.service" <<UNIT
[Unit]
Description=IconsAI Showcase aiFuture (Next.js standalone)
After=network.target

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=${APP_DIR}
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5
KillSignal=SIGINT
TimeoutStopSec=10
Environment=NODE_ENV=production
Environment=HOSTNAME=127.0.0.1
Environment=PORT=${PORT}
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true

[Install]
WantedBy=multi-user.target
UNIT
  systemctl daemon-reload
  systemctl enable "${SERVICE}.service"
  echo "  UNIT_CREATED"
else
  echo "  UNIT_EXISTS"
fi

if ! grep -q "handle ${BASEPATH}\*" /etc/caddy/Caddyfile; then
  cp /etc/caddy/Caddyfile "/etc/caddy/Caddyfile.bak-$(date -u +%Y%m%d-%H%M%S)"
  python3 - "$BASEPATH" "$PORT" <<'PY'
import sys
bp, port = sys.argv[1], sys.argv[2]
p = '/etc/caddy/Caddyfile'
s = open(p).read()
block = f"\thandle {bp}* {{\n\t\treverse_proxy 127.0.0.1:{port}\n\t}}\n\n"
idx = s.rfind('\thandle {')
s = s[:idx] + block + s[idx:] if idx != -1 else s + '\n' + block
open(p, 'w').write(s)
PY
  caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1 \
    && systemctl reload caddy \
    || { echo "  CADDY_FAIL"; exit 9; }
  echo "  CADDY_CREATED"
else
  echo "  CADDY_OK"
fi
echo "BOOTSTRAP_OK"
REMOTE
ok "Bootstrap concluído"

# ── FASE 4: Permissões + Restart ───────────────────────────
log "Fase 4: Permissões + Restart"
ssh "$SERVER" "chown -R root:root $APP_DIR/ && rm -rf $APP_DIR/.next/cache"
ssh "$SERVER" "systemctl restart $SERVICE && sleep 4 && systemctl is-active $SERVICE" \
  || fail "Serviço $SERVICE não reiniciou"
ok "Serviço $SERVICE ativo"

# ── FASE 5: Validate ───────────────────────────────────────
log "Fase 5: Validate"
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "https://${DOMAIN}${BASEPATH}/")
[ "$HTTP_CODE" = "200" ] || fail "HTTP $HTTP_CODE em https://${DOMAIN}${BASEPATH}/ (esperado 200)"
ok "HTTP OK ($HTTP_CODE)"

ACTUAL=$(curl -s -L "https://${DOMAIN}${BASEPATH}/build-info.txt" || echo "MISSING")
[ "$ACTUAL" = "$BUILD_ID" ] || fail "MISMATCH — esperado $BUILD_ID, deployed $ACTUAL"
ok "Deploy fresco: build-info.txt = $BUILD_ID"

log "  Validando chunks referenciados no HTML"
HTML=$(curl -s -L "https://${DOMAIN}${BASEPATH}/")
BAD=0
while read -r p; do
  [ -z "$p" ] && continue
  CODE=$(curl -sI "https://${DOMAIN}${p}" -o /dev/null -w "%{http_code}")
  CT=$(curl -sI "https://${DOMAIN}${p}" -o /dev/null -w "%{content_type}")
  case "$p" in
    *.js)  EXPECT="javascript" ;;
    *.css) EXPECT="css" ;;
    *)     EXPECT="" ;;
  esac
  if [ "$CODE" != "200" ] || { [ -n "$EXPECT" ] && ! echo "$CT" | grep -qi "$EXPECT"; }; then
    warn "chunk $p → $CODE $CT"; BAD=1
  fi
done < <(echo "$HTML" | grep -oE "${BASEPATH}/_next/static/[^\"]+\.(js|css)" | sort -u)
[ "$BAD" = "0" ] && ok "Todos os chunks 200 + content-type correto" || fail "Chunks com erro — deploy-fantasma de static"

# Chrome de deck canônico presente no HTML servido
echo "$HTML" | grep -q 'slide-foot'  && ok "footer-brand (.slide-foot) presente" || warn "slide-foot ausente"
echo "$HTML" | grep -q 'logo-fixed'  && ok "Logo (.logo-fixed) presente"         || warn "logo ausente"
echo "$HTML" | grep -q 'floating-logo' && warn "floating-logo presente (deck NÃO deve ter §3.1)" || ok "sem floating (correto p/ deck)"

echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}  DEPLOY CONCLUÍDO — ${BUILD_ID}${NC}"
echo -e "${GREEN}  → https://${DOMAIN}${BASEPATH}/${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
