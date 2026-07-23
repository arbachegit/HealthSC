/**
 * readingText — fonte única da leitura «Aa» (§8.3).
 * Partilha os MESMOS guiões da narração (§8.1). Sanitiza respellings
 * fonéticos que só servem ao TTS para exibição limpa no painel.
 */
import { NARRATION as BR } from '@/narration/script.pt-BR'
import { NARRATION as PT } from '@/narration/script.pt-PT'
import { NARRATION as EN } from '@/narration/script.en'
import { NARRATION as ES } from '@/narration/script.es'

const MAP: Record<string, Record<number, string>> = {
  'pt-BR': BR,
  'pt-PT': PT,
  en: EN,
  es: ES,
}

export function getReading(lang: string, slide0: number): string {
  const raw = MAP[lang]?.[slide0 + 1] ?? ''
  // Desfaz respellings fonéticos do TTS para leitura limpa (nenhum por ora).
  return raw
}
