import type { CanopyScene } from './CanopyIntro'

export const PRODUCT_NAME = 'Icons.ai · Discovery Health'
export const PRODUCT_TAGLINE = 'Triagem, agendamento e prontuário unificado.'
export const PRODUCT_ACCENT = '#10b981'
export const CONTINUE_HREF = 'https://icon.iconsai.ai/icon'

const HOLD = 14000

export const SCENES: CanopyScene[] = [
  { bg: '#c8e0d0', hero: 'Triagem antes do balcão',    mockup: 'prompt', promptText: 'Estou com febre há 3 dias e dor nas costas', hold: HOLD },
  { bg: '#eef0e0', hero: 'Do sintoma ao agendamento',     mockup: 'prompt', promptText: 'Mais perto do meu CEP, hoje', hold: HOLD },
  { bg: '#0d1b15', caption: 'SUS · DATASUS · ANS · LGPD SAÚDE', mockup: 'dialog', browserUrl: 'health.iconsai.ai/triagem', promptText: 'Posso tomar este remédio com pressão alta?', hold: HOLD },
  { bg: '#d6e3da', mockup: 'gallery', browserUrl: 'health.iconsai.ai/agenda', hold: HOLD },
  { bg: '#dde3da', mockup: 'deck-export', browserUrl: 'health.iconsai.ai/prontuario', hold: HOLD },
]
