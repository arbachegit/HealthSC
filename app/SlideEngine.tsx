'use client'

/**
 * SlideEngine — motor canônico de showcase IconsAI (skill /showcase §7).
 *
 * MOTOR = scroll-snap horizontal (`x mandatory`). Slides lado a lado; navegar =
 * a tela desliza e encaixa no próximo. Sem overlay/fade/lib (proibido §11).
 *
 * Chrome canônico (§3, §3.1):
 *   HEADER: progress-bar (topo) · logo icons.ai (esq) · nome do projeto (centro)
 *           · dock dir (Sair → BR·PT·EN → «Aa» → áudio)
 *   FOOTER: setas juntas (esq) · marca + legal (centro) · numeração NN/TT (dir)
 *   PALCO: só o conteúdo do slide, 100% entre as faixas (scale-to-fit §6.3)
 */

import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect,
  useRef, useState, type ReactNode,
} from 'react'
import { BASE_PATH, EXIT_HREF } from '@/components/config'
import { getReading } from '@/components/readingText'
import { LANGS, type LangId } from '@/components/langs'

/* Saída frame-aware (§3.1): embutido em iframe do hub → fecha o fullscreen do
 * top (o hub detecta fullscreenchange e volta à grade); acesso direto → navega
 * para o hub. NUNCA history.back(). */
function exitDeck() {
  try {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      const topDoc = window.top?.document
      if (topDoc?.fullscreenElement && topDoc.exitFullscreen) {
        void topDoc.exitFullscreen()
        return
      }
    }
  } catch {
    /* cross-origin top — cai no fallback de navegação */
  }
  window.location.href = EXIT_HREF
}

/* LangContext — idioma ativo do dock, partilhado com as cenas (tela tri-locale §8.5). */
const LangContext = createContext<LangId>('pt-BR')
export function useLang() {
  return useContext(LangContext)
}

export interface SlideDef {
  id: string
  label: string
  render: () => ReactNode
}

interface SlideContextValue {
  currentSlide: number
  totalSlides: number
  seenSlides: Set<number>
  goTo: (i: number) => void
}
const SlideContext = createContext<SlideContextValue | null>(null)
export function useSlide() {
  const ctx = useContext(SlideContext)
  if (!ctx) throw new Error('useSlide must be used within SlideEngine')
  return ctx
}

/* ═══════════════════════════════════════════════════════════
   SlideFrame — PALCO com scale-to-fit (§6.3). Conteúdo nunca
   invade header/footer; encolhe pra caber, sem scroll, sem corte.
   ═══════════════════════════════════════════════════════════ */
function SlideFrame({ children }: { children: ReactNode }) {
  const bandRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef(1)
  const [scale, setScale] = useState(1)

  const fit = useCallback(() => {
    const band = bandRef.current
    const content = contentRef.current
    if (!band || !content) return
    const cs = getComputedStyle(band)
    const available =
      band.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
    const natural = content.offsetHeight // altura de layout — imune ao transform
    if (natural <= 0 || available <= 0) return
    const target = available * 0.9
    const next = natural > target ? Math.max(0.15, target / natural) : 1
    if (Math.abs(next - scaleRef.current) > 0.004) {
      scaleRef.current = next
      setScale(next)
    }
  }, [])

  useLayoutEffect(() => {
    fit()
    const band = bandRef.current
    const content = contentRef.current
    if (!band || !content) return
    const ro = new ResizeObserver(() => fit())
    ro.observe(band)
    ro.observe(content)
    window.addEventListener('resize', fit)
    const t1 = window.setTimeout(fit, 60)
    const t2 = window.setTimeout(fit, 300)
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(fit).catch(() => {})
    }
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [fit])

  return (
    <div className="slide-band" ref={bandRef}>
      <div
        className="slide-fit"
        ref={contentRef}
        style={scale < 1 ? { transform: `scale(${scale})` } : undefined}
      >
        {children}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Logo canônico icons.ai (§18.1) — tipográfico, nunca imagem.
   ═══════════════════════════════════════════════════════════ */
function LogoMark({ className }: { className: string }) {
  return (
    <a className={className} href="https://iconsai.ai" target="_blank" rel="noopener noreferrer">
      <span className="logo-i">i</span>
      <span className="logo-cons">cons</span>
      <span className="logo-ai">.ai</span>
    </a>
  )
}

export interface SlideEngineProps {
  slides: SlideDef[]
  projectName: string
  kicker?: string
}

export function SlideEngine({ slides, projectName, kicker }: SlideEngineProps) {
  const total = slides.length
  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]))
  const [lang, setLang] = useState<LangId>('pt-BR')
  const [reading, setReading] = useState(false)
  const [muted, setMuted] = useState(true)
  const [audioOk, setAudioOk] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const goTo = useCallback(
    (i: number) => {
      const el = scrollRef.current
      if (!el) return
      const clamped = Math.max(0, Math.min(total - 1, i))
      el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    },
    [total],
  )

  /* Slide ativo via scrollLeft/clientWidth (tolerância 0.2). */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth)
        setCurrent((prev) => {
          if (prev === idx) return prev
          setSeen((s) => (s.has(idx) ? s : new Set(s).add(idx)))
          return idx
        })
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* Teclado: avança/volta/Home/End; Esc → hub. Ignora foco em campo. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'Escape') {
        exitDeck()
        return
      }
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        goTo(current + 1)
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        goTo(current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(total - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo, total])

  /* Re-centra o slide ativo no resize. */
  useEffect(() => {
    const onResize = () => {
      const el = scrollRef.current
      if (el) el.scrollLeft = current * el.clientWidth
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [current])

  /* Narração: troca faixa no slide/idioma; degrada se faltar o mp3. */
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const nn = String(current + 1).padStart(2, '0')
    a.src = `${BASE_PATH}/narration/${lang}/slide-${nn}.mp3`
    a.load()
    if (!muted) a.play().catch(() => {})
  }, [current, lang, muted])

  const progressPct = total > 1 ? (current / (total - 1)) * 100 : 0
  const nn = String(current + 1).padStart(2, '0')
  const tt = String(total).padStart(2, '0')

  return (
    <SlideContext.Provider
      value={{ currentSlide: current, totalSlides: total, seenSlides: seen, goTo }}
    >
      {/* Progress-bar — TOPO */}
      <div className="progress-bar" style={{ width: `${progressPct}%` }} />

      {/* Logo — header ESQ */}
      <LogoMark className="logo-fixed" />

      {/* Nome do projeto — header CENTRO */}
      <header className="slide-head">
        {kicker && <span className="slide-head__kicker">{kicker}</span>}
        <span className="slide-head__name">{projectName}</span>
      </header>

      {/* Dock — header DIR: Sair → idioma → «Aa» → áudio */}
      <div className="slide-dock">
        <a
          className="exit-btn"
          href={EXIT_HREF}
          aria-label="Sair para o hub"
          onClick={(e) => {
            e.preventDefault()
            exitDeck()
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Sair</span>
        </a>

        <div className="lang-switch" role="group" aria-label="Idioma da narração">
          {LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              className="lang-btn"
              data-active={lang === l.id}
              aria-pressed={lang === l.id}
              onClick={() => setLang(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="reading-btn"
          data-active={reading}
          aria-pressed={reading}
          aria-label="Leitura do slide"
          onClick={() => setReading((v) => !v)}
        >
          Aa
        </button>

        <button
          type="button"
          className="audio-btn"
          data-active={!muted && audioOk}
          aria-label={muted ? 'Ativar narração' : 'Silenciar narração'}
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
            </svg>
          )}
        </button>
      </div>

      {/* Painel de leitura «Aa» — atrelado ao idioma ativo */}
      {reading && (
        <div className="reading-panel" role="dialog" aria-label="Leitura do slide">
          <button
            type="button"
            className="reading-close"
            onClick={() => setReading(false)}
            aria-label="Fechar leitura"
          >
            ×
          </button>
          <p className="reading-text">{getReading(lang, current)}</p>
        </div>
      )}

      {/* DECK — scroll-snap horizontal. LangContext + arg `lang` para tela tri-locale. */}
      <LangContext.Provider value={lang}>
        <div className="deck" ref={scrollRef}>
          {slides.map((s, i) => (
            <section
              key={s.id}
              className="slide"
              data-active={i === current}
              data-seen={seen.has(i)}
              aria-hidden={i !== current}
            >
              <SlideFrame>{s.render()}</SlideFrame>
            </section>
          ))}
        </div>
      </LangContext.Provider>

      {/* Setas — JUNTAS, inferior-ESQ */}
      <div className="slide-nav">
        <button
          type="button"
          className="slide-nav__btn"
          aria-label="Slide anterior"
          disabled={current <= 0}
          onClick={() => goTo(current - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="slide-nav__btn"
          aria-label="Próximo slide"
          disabled={current >= total - 1}
          onClick={() => goTo(current + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Numeração — inferior-DIR */}
      <div className="slide-counter">
        <span>{nn}</span> / {tt}
      </div>

      {/* Marca + legal — centro do FOOTER (em todo slide) */}
      <footer className="slide-foot">
        <LogoMark className="logo-foot" />
        <span className="slide-foot__legal">
          © 2026 IconsAI · Kendall Square · CIC · Cambridge, MA · MIT · Harvard
        </span>
      </footer>

      <audio
        ref={audioRef}
        preload="none"
        muted={muted}
        onError={() => setAudioOk(false)}
        onCanPlay={() => setAudioOk(true)}
      />
    </SlideContext.Provider>
  )
}
