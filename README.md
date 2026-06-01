# iconsaiDiscoveryHealthShowCase

Showcase canônico (keynote interativo) do **Icons.ai · Discovery Health** — versão da Discovery especializada em saúde (anamnese guiada por Aura, auto-exames, triagem clínica, gestão financeira e antifraude num único fluxo).

Segue a skill global `/showcase`: scroll-snap horizontal, chrome canônico (logo `icons.ai`, dock Sair·BR·PT·EN·«Aa»·áudio, setas juntas inf-esq, numeração inf-dir, marca centro-footer, progress-bar topo), tema dark, zero dependências de UI, zero backend em runtime.

- **Stack:** Next.js 15 + React 19 + TypeScript strict, `output: 'standalone'`
- **basePath:** `/discoveryHealthShowcase` (rota final `icon.iconsai.ai/discoveryHealthShowcase`)
- **Porta dev:** `3103`
- **Accent:** `#10b981` (emerald)

## Desenvolvimento

```bash
npm install
npm run dev
# http://localhost:3103/discoveryHealthShowcase
```

## Deploy

```bash
./deploy.sh
```

Pipeline 8-fases anti-deploy-fantasma: stamp `BUILD_ID` → `next build` → rsync `.next/standalone` + `.next/static` + `public/` com `--delete` → systemd restart → valida HTTP 200 + `build-info.txt`.

- systemd unit `iconsai-discovery-health-showcase`
- Caddy `icon.iconsai.ai/discoveryHealthShowcase/*` → `127.0.0.1:3103/discoveryHealthShowcase/*`

## Slides

Abertura tipográfica + 24 slides do fluxo clínico/operacional (termos LGPD, identificação, Aura, áudio-livre, fisiológico, auto-exames, upload de exames, medicações, chat-anamnese, laudo SOAP, agenda, faturamento, almoxarifado, farmácia, cobrança PIX, antifraude, NF-e, previsão de receita, diagnóstico CID-10, expectativa de vida, navegação do paciente, combinação de tratamentos).

Narração tri-idioma (BR·PT·EN) com painel de leitura «Aa» — guiões em `narration/`; mp3 pré-gerados via `scripts/generate-narration.mjs` (etapa de áudio).
