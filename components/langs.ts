/**
 * Idiomas do deck. Ordem de apresentação: BR · PT · EN · ES.
 * Fonte única do tipo LangId + lista, partilhada por SlideEngine, content e cenas.
 */
export const LANGS = [
  { id: 'pt-BR', label: 'BR' },
  { id: 'pt-PT', label: 'PT' },
  { id: 'en', label: 'EN' },
  { id: 'es', label: 'ES' },
] as const

export type LangId = (typeof LANGS)[number]['id']

/** Conteúdo localizado por idioma (§8.5). Sem fallback silencioso: cada locale completo. */
export type L10n<T> = Record<LangId, T>

/** Helper para escolher o objeto de conteúdo do idioma ativo. */
export function pick<T>(map: L10n<T>, lang: LangId): T {
  return map[lang]
}
