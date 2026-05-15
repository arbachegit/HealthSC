# iconsaiDiscoveryHealthShowCase

Página showcase do **Icons.ai · Discovery Health** — versão da Discovery especializada em saúde pública (triagem, agendamento, prontuário unificado).

- **Stack:** Next.js 15 + React 19 + TypeScript strict
- **basePath:** `/bg-health` (rota final `icon.iconsai.ai/bg-health`)
- **Porta dev:** `3103`
- **Accent:** `#10b981` (verde)

## Desenvolvimento

```bash
npm install
npm run dev
# http://localhost:3103/bg-health
```

## Deploy

1. `npm run build`
2. `rsync .next/standalone/ .next/static/ public/ root@<droplet>:/opt/iconsai-discovery-health-showcase/app/ --delete`
3. systemd unit + Caddy `icon.iconsai.ai/bg-health/*` → `127.0.0.1:3103/bg-health/*`

## Cenas (5)

1. "Da queixa ao protocolo" + triagem
2. "Triagem antes da fila" + busca por CEP
3. Dialog overlay — "SUS · DATASUS · ANS · LGPD SAÚDE"
4. Browser gallery — agenda
5. Deck + prontuário export

CanopyIntro é compartilhado entre 6 ShowCases.
