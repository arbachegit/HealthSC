#!/usr/bin/env bash
# audit-css.sh — gate estático de cabimento (showcase skill T1-T2)
# Integrar: "prebuild": "bash audit-css.sh"
set -uo pipefail
CSS="app/globals.css"
FAIL=0
fail(){ echo "FAIL [$1]: $2"; FAIL=$((FAIL+1)); }

# Helper: flatten CSS into one-line-per-rule for multi-line grep.
FLAT=$(awk '{gsub(/\n/," ")} 1' RS='}' "$CSS" | sed 's/  */ /g')

# ═══ 1. GLOBALS.CSS ═══

# F1: .slide-stage align-items
echo "$FLAT" | grep -qE '\.slide-stage\b[^}]*align-items:\s*center' 2>/dev/null \
  && fail F1 ".slide-stage tem align-items:center (deve ser stretch)"
echo "$FLAT" | grep -qE '\.slide-stage\b[^}]*align-items:\s*stretch' 2>/dev/null \
  || fail F1 ".slide-stage sem align-items:stretch"

# F2: .slide-content align-items
echo "$FLAT" | grep -qE '\.slide-content\b[^}]*align-items:\s*center' 2>/dev/null \
  && fail F2 ".slide-content tem align-items:center (deve ser stretch)"

# F3: classe .slide-fit (obsoleta)
grep -qE '\.slide-fit\b' "$CSS" 2>/dev/null \
  && fail F3 "classe .slide-fit encontrada (usar .slide-content)"

# F4: max-width em containers de slide
echo "$FLAT" | grep -qE '\.(slide-content|slide-fit)\b[^}]*max-width' 2>/dev/null \
  && fail F4 "max-width em container de slide"
echo "$FLAT" | grep -qE '\.(slide-content|slide-fit)\b[^}]*width:\s*min\(' 2>/dev/null \
  && fail F4 "width:min() em container de slide"

# F8: .slide-content DEVE ter height:100%
echo "$FLAT" | grep -qE '\.slide-content\b[^}]*height:\s*100%' 2>/dev/null \
  || fail F8 ".slide-content sem height:100%"

# F9: .slide-content DEVE ter align-items:stretch
echo "$FLAT" | grep -qE '\.slide-content\b[^}]*align-items:\s*stretch' 2>/dev/null \
  || fail F9 ".slide-content sem align-items:stretch"

# F13: .slide-band justify/align center
echo "$FLAT" | grep -qE '\.slide-band\b[^}]*justify-content:\s*center' 2>/dev/null \
  && fail F13 ".slide-band tem justify-content:center"
echo "$FLAT" | grep -qE '\.slide-band\b[^}]*align-items:\s*center' 2>/dev/null \
  && fail F13 ".slide-band tem align-items:center"

# F14: .slide-stage height:100% (deve ser flex:1)
echo "$FLAT" | grep -qE '\.slide-stage\b[^}]*height:\s*100%' 2>/dev/null \
  && fail F14 ".slide-stage tem height:100% (deve ser flex:1; min-height:0)"

# F15: max() no padding de .slide-band (deve ser clamp())
echo "$FLAT" | grep -qE '\.slide-band\b[^}]*padding-top:\s*max\(' 2>/dev/null \
  && fail F15 ".slide-band usa max() no padding-top (deve ser clamp())"
echo "$FLAT" | grep -qE '\.slide-band\b[^}]*padding-bottom:\s*max\(' 2>/dev/null \
  && fail F15 ".slide-band usa max() no padding-bottom (deve ser clamp())"

# F22: faixas opacas (body::before/after)
echo "$FLAT" | grep -qE 'body::before[^}]*background' 2>/dev/null \
  || fail F22 "body::before sem background (faixas opacas ausentes)"
echo "$FLAT" | grep -qE 'body::after[^}]*background' 2>/dev/null \
  || fail F22 "body::after sem background (faixas opacas ausentes)"

# ═══ 2. TSX (componentes) ═══

# F5: max-w-grid em wrappers de slide
SHELL_FILES=$(grep -rlE 'Shell|slide-content|slide-stage' app/ components/ 2>/dev/null || true)
for f in $SHELL_FILES; do
  grep -qE 'max-w-grid' "$f" 2>/dev/null \
    && fail F5 "$f: max-w-grid em wrapper de slide"
done

# F6: items-center na Shell
SHELL_DEF=$(grep -rlE 'function Shell|const Shell' components/ 2>/dev/null || true)
for f in $SHELL_DEF; do
  grep -qE 'items-center' "$f" 2>/dev/null \
    && fail F6 "$f: Shell com items-center (usar items-stretch)"
done

# F7: UPCAP deve ser exactamente 1.0
FRAME_FILES=$(grep -rlE 'UPCAP' components/ app/ 2>/dev/null || true)
for f in $FRAME_FILES; do
  grep -qE 'UPCAP\s*=\s*1\.0' "$f" 2>/dev/null \
    || fail F7 "$f: UPCAP != 1.0 (proibido ampliar)"
done

# F10: offsetWidth/offsetHeight no fit()
FRAME_FILES2=$(grep -rlE 'SlideFrame|function fit|const fit' components/ app/ 2>/dev/null || true)
for f in $FRAME_FILES2; do
  grep -qE 'offset(Width|Height)' "$f" 2>/dev/null \
    && fail F10 "$f: offsetWidth/Height no fit() (usar scrollWidth/Height)"
done

# F11: max-width em pixel em visuais
ACT_FILES=$(find app/ components/ -name '*.tsx' -not -name 'SlideFrame*' -not -name 'SlideEngine*' -not -name 'AudioControl*' -not -name 'Logo*' -not -name 'SlideNav*' -not -name 'SlideProgress*' 2>/dev/null || true)
for f in $ACT_FILES; do
  HITS=$(grep -nE 'max-width:\s*[0-9]+px' "$f" 2>/dev/null | grep -vE '@media' || true)
  if [ -n "$HITS" ]; then
    while IFS= read -r line; do
      fail F11 "$f: max-width em pixel em visual — $line"
    done <<< "$HITS"
  fi
  HITS2=$(grep -nE 'max-w-\[[0-9]+px\]' "$f" 2>/dev/null || true)
  if [ -n "$HITS2" ]; then
    while IFS= read -r line; do
      fail F11 "$f: max-w-[Npx] em visual — $line"
    done <<< "$HITS2"
  fi
  HITS_MW=$(grep -nE "maxWidth:\s*['\"][0-9]+px['\"]" "$f" 2>/dev/null || true)
  if [ -n "$HITS_MW" ]; then
    while IFS= read -r line; do
      fail F11 "$f: maxWidth inline pixel — $line"
    done <<< "$HITS_MW"
  fi
done

# Also check secondary CSS files
EXTRA_CSS=$(find components/ -name '*.css' 2>/dev/null || true)
for f in $EXTRA_CSS; do
  HITS=$(grep -nE 'max-width:\s*[0-9]+px' "$f" 2>/dev/null | grep -vE '@media' || true)
  if [ -n "$HITS" ]; then
    while IFS= read -r line; do
      fail F11 "$f: max-width em pixel em visual — $line"
    done <<< "$HITS"
  fi
done

# F17: mapa sem GeoJSON
for f in $ACT_FILES; do
  grep -qiE '<img[^>]*map|iframe.*google.*maps' "$f" 2>/dev/null \
    && fail F17 "$f: mapa sem GeoJSON (img/iframe)"
  LONG_PATHS=$(grep -nE '<path d="[^"]{200,}"' "$f" 2>/dev/null || true)
  if [ -n "$LONG_PATHS" ]; then
    while IFS= read -r line; do
      LINENUM=$(echo "$line" | cut -d: -f1)
      HAS_TODO=$(awk -v ln="$LINENUM" 'NR>=ln-3 && NR<ln' "$f" 2>/dev/null | grep -c 'F17' || true)
      if [ "$HAS_TODO" -eq 0 ]; then
        fail F17 "$f: hardcoded SVG path (200+ chars) sem GeoJSON — $line"
      fi
    done <<< "$LONG_PATHS"
  fi
done

# F18: overflow-hidden em Shell
for f in $SHELL_DEF; do
  grep -qE 'overflow-hidden|overflow:\s*hidden' "$f" 2>/dev/null \
    && fail F18 "$f: Shell com overflow-hidden (mascara scrollHeight)"
done

# F19: .slide-fit em SlideFrame
for f in $FRAME_FILES; do
  grep -qE 'slide-fit' "$f" 2>/dev/null \
    && fail F19 "$f: usa slide-fit (deve ser slide-content)"
done

# F20: font-size < 12px em slides (exclui chrome)
for f in $ACT_FILES; do
  HITS3=$(grep -nE 'font-size:\s*(([0-9]|1[01])(\.[0-9]+)?px)' "$f" 2>/dev/null || true)
  if [ -n "$HITS3" ]; then
    while IFS= read -r line; do
      fail F20 "$f: font-size < 12px — $line"
    done <<< "$HITS3"
  fi
  HITS4=$(grep -nE 'text-\[(([0-9]|1[01])(\.[0-9]+)?px)\]' "$f" 2>/dev/null || true)
  if [ -n "$HITS4" ]; then
    while IFS= read -r line; do
      fail F20 "$f: text-[<12px] — $line"
    done <<< "$HITS4"
  fi
  HITS5=$(grep -nE "fontSize:\s*['\"]([0-9]|1[01])(\.[0-9]+)?px['\"]" "$f" 2>/dev/null || true)
  if [ -n "$HITS5" ]; then
    while IFS= read -r line; do
      fail F20 "$f: fontSize JSX < 12px — $line"
    done <<< "$HITS5"
  fi
  HITS6=$(grep -nE 'font-size="(([0-9]|1[01])(\.[0-9]+)?px)"' "$f" 2>/dev/null || true)
  if [ -n "$HITS6" ]; then
    while IFS= read -r line; do
      fail F20 "$f: SVG font-size < 12px — $line"
    done <<< "$HITS6"
  fi
done
# Also check secondary CSS
for f in $EXTRA_CSS; do
  HITS3=$(grep -nE 'font-size:\s*(([0-9]|1[01])(\.[0-9]+)?px)' "$f" 2>/dev/null || true)
  if [ -n "$HITS3" ]; then
    while IFS= read -r line; do
      fail F20 "$f: font-size < 12px — $line"
    done <<< "$HITS3"
  fi
done

# F23: .shell__content must NOT have justify-content:center (causes content
# to overflow into header/footer zones when taller than the stage).
# Content anchors top; individual slides handle vertical centering internally.
echo "$FLAT" | grep -qE '\.shell__content\b[^}]*justify-content:\s*center' 2>/dev/null \
  && fail F23 ".shell__content com justify-content:center (causa clipping no header/footer)"

# F12: mx-auto + max-w-[Npx] na mesma className (redundante; ambos devem ser removidos)
for f in $ACT_FILES; do
  HITS=$(grep -nE 'mx-auto[^"]*max-w-\[[0-9]+px\]|max-w-\[[0-9]+px\][^"]*mx-auto' "$f" 2>/dev/null || true)
  if [ -n "$HITS" ]; then
    while IFS= read -r line; do
      fail F12 "$f: mx-auto + max-w-[Npx] (remover ambos §6.10) — $line"
    done <<< "$HITS"
  fi
done

# F16: .slide-nav__btn com width/height > 44px (footer reduzido; setas 44×44 canónicas)
echo "$FLAT" | grep -qE '\.slide-nav__btn\b[^}]*(width|height):\s*(4[5-9]|[5-9][0-9])[0-9]*px' 2>/dev/null \
  && fail F16 ".slide-nav__btn com width/height > 44px (canónico = 44×44; §4)"

# F21: visuals repetidos/idênticos — não detectável estaticamente.
# VERIFICAÇÃO MANUAL: confirmar que cada item num grid tem SVG/ícone visualmente distinto (§6.14).

# F24: callout/note-box como último filho de coluna densa — não detectável estaticamente.
# VERIFICAÇÃO MANUAL: coluna com kicker+H2+lede+≥5 items não deve ter callout/note-box no final (§6.17).

# F25: fit() deve ter content.style.height="auto" antes de medir scrollHeight (§6.18)
FRAME_TSX=$(grep -rlE 'function fit|const fit|useCallback' components/ app/ 2>/dev/null || true)
for f in $FRAME_TSX; do
  if grep -qE 'scrollHeight' "$f" 2>/dev/null; then
    grep -qE "content\.style\.height\s*=\s*[\"']auto[\"']" "$f" 2>/dev/null \
      || fail F25 "$f: fit() sem content.style.height='auto' antes de scrollHeight (§6.18)"
  fi
done

# F26: min-h-[Npx] em container visual (filhos absolute colapsam — usar flex-1 min-h-0; §6.6 item 7)
for f in $ACT_FILES; do
  HITS=$(grep -nE 'min-h-\[[0-9]+(px|rem|vh)\]' "$f" 2>/dev/null || true)
  if [ -n "$HITS" ]; then
    while IFS= read -r line; do
      fail F26 "$f: min-h-[Npx/rem/vh] em visual (usar flex-1 min-h-0) — $line"
    done <<< "$HITS"
  fi
done

# ═══ PDF (T1.11, T3.6) ═══

# F29: PdfDocument existe
PDF_FILE=$(find components/ -name 'PdfDocument*' -name '*.tsx' 2>/dev/null || true)
if [ -z "$PDF_FILE" ]; then
  fail F29 "PdfDocument.tsx não encontrado em components/"
fi

# F30: PdfDocument tem classe .pdf-doc
for f in $PDF_FILE; do
  grep -qE 'pdf-doc' "$f" 2>/dev/null \
    || fail F30 "$f: PdfDocument sem classe .pdf-doc"
done

# F31: PdfDocument está FORA de SlideEngine no page.tsx
PAGE_FILE=$(find app/ -name 'page.tsx' 2>/dev/null | head -1)
if [ -n "$PAGE_FILE" ]; then
  if awk '/<SlideEngine/,/<\/SlideEngine>/' "$PAGE_FILE" 2>/dev/null | grep -q 'PdfDocument'; then
    fail F31 "$PAGE_FILE: PdfDocument está DENTRO de SlideEngine (T1.11 — deve ser FORA)"
  fi
fi

# F32: body::before/after escondidas em @media print
grep -qE 'body::before.*body::after.*display:\s*none|body::after.*body::before.*display:\s*none' "$CSS" 2>/dev/null \
  || grep -A2 'body::before' "$CSS" 2>/dev/null | grep -q 'display:\s*none' \
  || fail F32 "body::before/after não escondidas em @media print (T1.11)"

# ═══ RESULTADO ═══
if [ $FAIL -eq 0 ]; then
  echo "audit-css: OK (0 falhas)"
  exit 0
else
  echo "audit-css: $FAIL FALHA(S) — build bloqueado"
  exit 1
fi
