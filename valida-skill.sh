#!/usr/bin/env bash
# Logo canonico REAL = icons.ai (spans i·cons·.ai -> "icons.ai", .ai MINUSCULO COM ponto).
# i = Libre Baskerville RETO #f97316 MAIOR (1.55em) | cons = #ffffff | .ai = #ef4444.
# cons/.ai em sans (Plus Jakarta Sans via --font-logo); i RETO (Libre Baskerville). NAO e PNG, NAO e "AI" maiusculo, NAO e ai.t.
# Usa find (bash 3.2-safe; nada de globstar/grep -r recursando .next).
set -uo pipefail
CSS="app/globals.css"
TSX=$(find app -name '*.tsx' 2>/dev/null)
f(){ echo "FALHA: $1"; exit 1; }
has(){ echo "$TSX" | xargs grep -lE "$1" 2>/dev/null | grep -q .; }
hasi(){ echo "$TSX" | xargs grep -liE "$1" 2>/dev/null | grep -q .; }
has  'logo-i"[^>]*>[[:space:]]*i[[:space:]]*<'        || f "span logo-i ausente"
has  'logo-cons"[^>]*>[[:space:]]*cons[[:space:]]*<'  || f "span logo-cons ausente"
has  'logo-ai"[^>]*>[[:space:]]*\.ai[[:space:]]*<'    || f ".ai ausente/errado (logo-ai deve ser '.ai' minusculo com ponto)"
has  'logo-ai"[^>]*>[[:space:]]*AI[[:space:]]*<'      && f "AI maiusculo no logo (use '.ai' minusculo com ponto)"
hasi '(logo-fixed|logo-foot|logo-iconsai)[^>]*>.*(<img|\.png|\.svg|<svg)' && f "logo com imagem"
grep -qiE '\.logo-i[^{]*\{[^}]*font-style:[[:space:]]*italic' "$CSS" && f "logo-i com italic (canon = Libre Baskerville RETO)"
grep -qiE '\.logo-i[^{]*\{[^}]*font-size:[[:space:]]*1\.55em' "$CSS" || f "logo-i sem font-size 1.55em (i maior)"
grep -qiE '\.logo-i[^{]*\{[^}]*#f97316' "$CSS" || f "logo-i sem #f97316 (laranja)"
grep -qiE '\.logo-cons[^{]*\{[^}]*#ffffff' "$CSS" || f "logo-cons sem #ffffff (branco)"
grep -qiE '\.logo-ai[^{]*\{[^}]*#ef4444' "$CSS" || f "logo-ai sem #ef4444 (vermelho)"
# Fonte do wordmark: cons/.ai = Plus Jakarta Sans; i = Libre Baskerville RETO. NUNCA herdar --font-display.
awk '/\.logo-(fixed|foot|iconsai)[ ,{]/{b=1} b&&/font-display/{print "X"} /}/{b=0}' "$CSS" | grep -q X \
  && f "wordmark herda --font-display (use --font-logo Plus Jakarta Sans)"
grep -q 'var(--font-logo' "$CSS" || f "wordmark sem var(--font-logo)"
has 'Plus_Jakarta_Sans' || f "Plus Jakarta Sans nao carregada (cons/.ai)"
has 'Libre_Baskerville' || f "Libre Baskerville nao carregada (fonte do i)"
echo "OK: logo canonico icons.ai RETO (i #f97316 Libre Baskerville / cons #ffffff / .ai #ef4444)"; exit 0
