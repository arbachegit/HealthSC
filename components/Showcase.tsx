'use client'

/**
 * Discovery Health · Aura — Showcase v2 (2026-05-17)
 *
 * Refatorado para usar shell canônico <ShowcaseShell>.
 * Loop infinito 259s · LIGHT THEME emerald/teal.
 *
 * Timeline:
 *   - Cena 00 (0-19s):  Opening tipográfico
 *   - Cenas 01-24 (19-259s, 10s cada): 24 telas reais
 */

import { useState, type CSSProperties } from 'react'
import { ShowcaseShell, type ShowcaseScene } from './showcase-shell'
import './showcase.css'

const CYCLE = 259
const OPENING = 19
const SCENE_SLOT = 10
const SCENE_COUNT = 24
const SOURCES_FOOTER = 'Fonte: UpToDate · PubMed · Cochrane · CFM · ANS'
const DH_CYCLE_MS = CYCLE * 1000

interface DhNavScene {
  startMs: number
  step: string
  label: string
}

const DH_NAV: DhNavScene[] = [
  { startMs: 0, step: '00', label: 'Abertura' },
  { startMs:  19_000, step: '01', label: 'Termos LGPD' },
  { startMs:  29_000, step: '02', label: 'Identificação' },
  { startMs:  39_000, step: '03', label: 'Confirmação' },
  { startMs:  49_000, step: '04', label: 'Aura · apresentação' },
  { startMs:  59_000, step: '05', label: 'Áudio livre' },
  { startMs:  69_000, step: '06', label: 'Aura · pergunta' },
  { startMs:  79_000, step: '07', label: 'Fisiológico' },
  { startMs:  89_000, step: '08', label: 'Auto-exames' },
  { startMs:  99_000, step: '09', label: 'Upload exames' },
  { startMs: 109_000, step: '10', label: 'Remédios · RAG' },
  { startMs: 119_000, step: '11', label: 'Chat anamnese' },
  { startMs: 129_000, step: '12', label: 'Laudo SOAP' },
  { startMs: 139_000, step: '13', label: 'Agenda' },
  { startMs: 149_000, step: '14', label: 'Faturamento' },
  { startMs: 159_000, step: '15', label: 'Almoxarifado' },
  { startMs: 169_000, step: '16', label: 'Farmácia' },
  { startMs: 179_000, step: '17', label: 'Cobrança PIX' },
  { startMs: 189_000, step: '18', label: 'Antifraude' },
  { startMs: 199_000, step: '19', label: 'NF automática' },
  { startMs: 209_000, step: '20', label: 'Previsão receita' },
  { startMs: 219_000, step: '21', label: 'Diagnóstico CID' },
  { startMs: 229_000, step: '22', label: 'Expectativa vida' },
  { startMs: 239_000, step: '23', label: 'Navegação paciente' },
  { startMs: 249_000, step: '24', label: 'Combinação tratos' },
]

interface TermoDoc {
  id: 'uso' | 'privacidade' | 'voz'
  titulo: string
  texto: string
  resumo: string
  base: string
  risco: 'baixo' | 'moderado' | 'alto'
  aceite: string
  kicker?: string
  sinais: readonly string[]
}

const TERMOS: readonly TermoDoc[] = [
  {
    id: 'uso',
    titulo: '1 · Termos de Uso',
    texto: 'O que o Discovery Health faz, o que não substitui consulta presencial, suspensão por descumprimento.',
    resumo: 'Paciente entende escopo do produto, limites clínicos e quando o caso deve ser escalado para atendimento humano.',
    base: 'contrato de uso · onboarding',
    risco: 'baixo',
    aceite: 'aceite simples',
    sinais: ['escopo da plataforma', 'limites de responsabilidade', 'encaminhamento presencial'],
  },
  {
    id: 'privacidade',
    titulo: '2 · Política de Privacidade',
    texto: 'Quais dados, bases legais, retenção, compartilhamento com Anthropic/Supabase/Resend.',
    resumo: 'Explica o ciclo de vida dos dados, os operadores envolvidos e a retenção operacional do histórico clínico.',
    base: 'LGPD art. 7º e art. 9º',
    risco: 'moderado',
    aceite: 'aceite explícito',
    sinais: ['bases legais', 'retenção', 'operadores e subprocessadores'],
  },
  {
    id: 'voz',
    titulo: '3 · Biometria de Voz',
    texto: 'Gravação de áudio + características acústicas + prosódia. LGPD Art. 5º II.',
    resumo: 'Documento sensível para consentimento específico de biometria e processamento de traços de voz no fluxo clínico.',
    base: 'LGPD art. 5º II',
    risco: 'alto',
    aceite: 'consentimento sensível',
    kicker: '⚠ DADO SENSÍVEL · CONSENTIMENTO ESPECÍFICO',
    sinais: ['biometria de voz', 'traços acústicos', 'revogação assistida'],
  },
]

type TermoId = TermoDoc['id']

/* ═════════════════════════════════════════════════════════════════════
   HELPERS
   ═════════════════════════════════════════════════════════════════════ */

function DhTw({
  text, startMs, endMs, entryDelayMs, perWordMs, uid, className,
}: {
  text: string; startMs: number; endMs: number; entryDelayMs: number; perWordMs: number; uid: string; className: string
}) {
  const words = text.split(/(\s+)/)
  const css: string[] = []
  const spans: React.ReactNode[] = []
  let visibleIdx = 0
  words.forEach((w, i) => {
    if (!w.trim()) { spans.push(<span key={i}>{w}</span>); return }
    const wordOnMs = startMs + entryDelayMs + visibleIdx * perWordMs
    const onPct = (wordOnMs / DH_CYCLE_MS) * 100
    const onFullPct = Math.min(100, onPct + 0.02)
    const offPct = (endMs / DH_CYCLE_MS) * 100
    const offFullPct = Math.min(100, offPct + 0.3)
    const prePct = Math.max(0, onPct - 0.001)
    const kfName = `dh-tw-${uid}-${visibleIdx}`
    css.push(`@keyframes ${kfName} {
      0% { opacity: 0; }
      ${prePct.toFixed(4)}% { opacity: 0; }
      ${onPct.toFixed(4)}% { opacity: 0; }
      ${onFullPct.toFixed(4)}% { opacity: 1; }
      ${offPct.toFixed(4)}% { opacity: 1; }
      ${offFullPct.toFixed(4)}% { opacity: 0; }
      100% { opacity: 0; }
    }`)
    spans.push(
      <span key={i} className="dh-tw-word"
        style={{
          animationName: kfName, animationDuration: `${DH_CYCLE_MS}ms`,
          animationIterationCount: 'infinite', animationTimingFunction: 'linear', animationFillMode: 'both',
        }}>{w}</span>
    )
    visibleIdx++
  })
  const caretOnPct = ((startMs + entryDelayMs) / DH_CYCLE_MS) * 100
  const caretOffPct = (endMs / DH_CYCLE_MS) * 100
  const caretKf = `dh-tw-caret-${uid}`
  css.push(`@keyframes ${caretKf} {
    0%, ${Math.max(0, caretOnPct - 0.001).toFixed(4)}% { opacity: 0; }
    ${caretOnPct.toFixed(4)}% { opacity: 1; }
    ${caretOffPct.toFixed(4)}% { opacity: 1; }
    ${Math.min(100, caretOffPct + 0.05).toFixed(4)}%, 100% { opacity: 0; }
  }`)
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css.join('\n') }} />
      <span className={className}>
        {spans}
        <span className="dh-tw-caret" aria-hidden="true"
          style={{
            animationName: caretKf, animationDuration: `${DH_CYCLE_MS}ms`,
            animationIterationCount: 'infinite', animationTimingFunction: 'linear', animationFillMode: 'both',
          }}>▌</span>
      </span>
    </>
  )
}

function Scene({ index, url, children }: { index: number; url: string; caption?: string; children: React.ReactNode }) {
  return (
    <section className={`dh-scene dh-scene-${index}`}>
      <div className="dh-window">
        <BrowserChrome url={url} />
        <div className="dh-window-body">{children}</div>
      </div>
    </section>
  )
}

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="dh-chrome">
      <span className="dh-chrome-dot dh-chrome-dot-r" />
      <span className="dh-chrome-dot dh-chrome-dot-y" />
      <span className="dh-chrome-dot dh-chrome-dot-g" />
      <div className="dh-chrome-url">
        <svg viewBox="0 0 16 16" className="dh-chrome-lock" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="3" y="7" width="10" height="7" rx="1.5" />
          <path d="M5 7V5a3 3 0 0 1 6 0v2" />
        </svg>
        {url}
      </div>
    </div>
  )
}

function StepIndicator({ current }: { current: number }) {
  const steps = ['Você', 'O problema', 'Entrevista', 'Laudo']
  return (
    <div className="dh-steps">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending'
        return (
          <div key={label} className={`dh-step dh-step-${state}`}>
            <span className="dh-step-dot">{state === 'done' ? '✓' : i + 1}</span>
            <span className="dh-step-label">{label}</span>
            {i < steps.length - 1 && <span className="dh-step-line" />}
          </div>
        )
      })}
    </div>
  )
}

function SectionHeader({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <header className="dh-section-header">
      {kicker && <div className="dh-section-kicker">{kicker}</div>}
      <h1 className="dh-section-title">{title}</h1>
      {subtitle && <p className="dh-section-subtitle">{subtitle}</p>}
    </header>
  )
}

function Field({ label, value, mono, hint, chip, span }: { label: string; value: string; mono?: boolean; hint?: string; chip?: boolean; span?: number }) {
  const style = span ? ({ gridColumn: `span ${span}` } as CSSProperties) : undefined
  return (
    <label className="dh-field" style={style}>
      <span className="dh-field-label">{label}</span>
      {chip ? <span className="dh-field-chip">{value}</span> : <span className={`dh-field-input ${mono ? 'dh-mono' : ''}`}>{value}</span>}
      {hint && <span className="dh-field-hint">{hint}</span>}
    </label>
  )
}

function Vital({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="dh-vital">
      <div className="dh-vital-label">{label}</div>
      <div className="dh-vital-row">
        <span className="dh-vital-value">{value}</span>
        <span className="dh-vital-suffix">{suffix}</span>
      </div>
    </div>
  )
}

function ExameCheck({ pict, title, guia, selected }: { pict: string; title: string; guia: string; selected?: boolean }) {
  return (
    <label className={`dh-exame-check ${selected ? 'dh-exame-check-on' : ''}`}>
      <span className={`dh-checkbox ${selected ? 'dh-checkbox-on' : ''}`} />
      <span className="dh-exame-check-pict">{pict}</span>
      <span className="dh-exame-check-body">
        <span className="dh-exame-check-title">{title}</span>
        <span className="dh-exame-check-guia">{guia}</span>
      </span>
    </label>
  )
}

function MedCard({ nome, classe, selected, dose, freq }: { nome: string; classe: string; selected?: boolean; dose?: string; freq?: string }) {
  return (
    <div className={`dh-med ${selected ? 'dh-med-selected' : ''}`}>
      <span className={`dh-checkbox ${selected ? 'dh-checkbox-on' : ''}`} />
      <div className="dh-med-body">
        <div className="dh-med-name">{nome}</div>
        <div className="dh-med-classe">{classe}</div>
        {selected && dose && freq && (
          <div className="dh-med-fields">
            <span className="dh-med-field">dose: {dose}</span>
            <span className="dh-med-field">freq: {freq}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function SoapCard({ letter, title, text, revealClass }: { letter: string; title: string; text: string; revealClass: string }) {
  return (
    <div className={`dh-soap-row ${revealClass}`}>
      <div className="dh-soap-letter">{letter}</div>
      <div className="dh-soap-body">
        <div className="dh-soap-title">{title}</div>
        <div className="dh-soap-text">{text}</div>
      </div>
    </div>
  )
}

function FatBar({ label, prev, real, prevK, realK, pending }: { label: string; prev: number; real: number; prevK: string; realK: string; pending?: boolean }) {
  return (
    <div className="dh-fat-bar">
      <div className="dh-fat-bar-pair">
        <span className="dh-fat-bar-col dh-fat-bar-col-prev" style={{ height: `${prev}%` }}>
          <span className="dh-fat-bar-num">{prevK}</span>
        </span>
        <span className={`dh-fat-bar-col dh-fat-bar-col-real ${pending ? 'dh-fat-bar-col-pending' : ''}`} style={{ height: `${real}%` }}>
          {!pending && <span className="dh-fat-bar-num">{realK}</span>}
          {pending && <span className="dh-fat-bar-pending-label">previsto</span>}
        </span>
      </div>
      <span className="dh-fat-bar-label">{label}</span>
    </div>
  )
}

function StockRow({ item, atual, min, sug, status }: { item: string; atual: string; min: string; sug: string; status: 'ok' | 'low' | 'critical' }) {
  const label = status === 'ok' ? 'ok' : status === 'low' ? 'baixo · pedido' : 'crítico · auto-restock'
  return (
    <div className={`dh-stock-tr dh-stock-tr-${status}`}>
      <span className="dh-stock-tr-name">{item}</span>
      <span className="dh-stock-tr-num">{atual}</span>
      <span className="dh-stock-tr-num">{min}</span>
      <span className="dh-stock-tr-num">{sug}</span>
      <span className={`dh-stock-tr-status dh-stock-tr-status-${status}`}>{label}</span>
    </div>
  )
}

function FarmaRow({ nome, classe, lote, val, saldo, warn, critical }: { nome: string; classe: string; lote: string; val: string; saldo: string; warn?: boolean; critical?: boolean }) {
  return (
    <div className={`dh-farma-tr ${warn ? 'dh-farma-tr-warn' : ''} ${critical ? 'dh-farma-tr-critical' : ''}`}>
      <span className="dh-farma-tr-name">{nome}</span>
      <span className="dh-farma-tr-classe">{classe}</span>
      <span className="dh-farma-tr-lote">{lote}</span>
      <span className="dh-farma-tr-val">{val}</span>
      <span className="dh-farma-tr-saldo">{saldo}</span>
    </div>
  )
}

function NfRow({ num, cliente, valor, data, status }: { num: string; cliente: string; valor: string; data: string; status: 'ok' | 'pending' }) {
  return (
    <div className="dh-nf-tr">
      <span className="dh-mono">{num}</span>
      <span>{cliente}</span>
      <span className="dh-mono">{valor}</span>
      <span className="dh-mono dh-nf-tr-data">{data}</span>
      <span className={`dh-nf-tr-status dh-nf-tr-status-${status}`}>{status === 'ok' ? '✓ autorizada' : '… em fila'}</span>
    </div>
  )
}

function LifeRow({ nome, idade, comorb, adesao, score, level }: { nome: string; idade: string; comorb: string; adesao: string; score: number; level: 'low' | 'mid' | 'high' }) {
  return (
    <div className={`dh-life-tr dh-life-tr-${level}`}>
      <span className="dh-life-tr-name">{nome}</span>
      <span className="dh-mono">{idade}</span>
      <span className="dh-life-tr-comorb">{comorb}</span>
      <span className="dh-mono">{adesao}</span>
      <span className="dh-life-tr-score">
        <span className="dh-life-tr-bar">
          <span className={`dh-life-tr-fill dh-life-tr-fill-${level}`} style={{ width: `${score}%` }} />
        </span>
        <span className="dh-life-tr-num">{score}</span>
      </span>
    </div>
  )
}

function MatrixRow({ tratamento, children }: { tratamento: string; children: React.ReactNode }) {
  return (
    <div className="dh-matrix-row">
      <span className="dh-matrix-row-head">{tratamento}</span>
      {children}
    </div>
  )
}

function MatrixCell({ prob, ic, tone }: { prob: string; ic: string; tone: 'ok-strong' | 'ok' | 'mid' | 'warn' | 'low' }) {
  return (
    <span className={`dh-matrix-cell dh-matrix-cell-${tone}`}>
      <span className="dh-matrix-cell-p">{prob}</span>
      <span className="dh-matrix-cell-ic">IC 95% {ic}</span>
    </span>
  )
}

function SourcesFooter({ strong }: { strong?: boolean }) {
  return (
    <div className={`dh-sources ${strong ? 'dh-sources-strong' : ''}`}>
      <span className="dh-sources-dot" />
      {SOURCES_FOOTER}
    </div>
  )
}

/* Caption sidebar (overlay sutil — opcional) */
function SceneCaption({ index, title, desc }: { index: number; title: string; desc: string }) {
  const startMs = 19_000 + (index - 1) * 10_000
  const endMs = startMs + 10_000 - 100
  const TITLE_ENTRY = 500
  const TITLE_TW = 1200
  const DESC_ENTRY = TITLE_ENTRY + TITLE_TW + 200
  const titlePerWord = Math.min(140, TITLE_TW / Math.max(1, title.split(/\s+/).length))
  const descPerWord = desc ? Math.min(110, 2600 / Math.max(1, desc.split(/\s+/).length)) : 0
  return (
    <div className="dh-caption-stage">
      <div className="dh-caption is-active">
        <span className="dh-caption-step">Cena {index}/{SCENE_COUNT}</span>
        <DhTw text={title} startMs={startMs} endMs={endMs} entryDelayMs={TITLE_ENTRY} perWordMs={titlePerWord} uid={`t${index}`} className="dh-caption-title" />
        {desc && <DhTw text={desc} startMs={startMs} endMs={endMs} entryDelayMs={DESC_ENTRY} perWordMs={descPerWord} uid={`d${index}`} className="dh-caption-desc" />}
      </div>
    </div>
  )
}

const CAPTIONS_RAW = [
  'Termos LGPD — 3 documentos com consentimento específico para biometria de voz',
  'Identificação — prefill com dim_pessoas (Receita Federal) + ViaCEP autocomplete',
  'Confirmação "é você?" — nome mascarado antes de liberar cleartext',
  'Aura se apresenta — typewriter sincronizado com TTS, voz sage warm',
  'Áudio-livre — paciente fala 60s sem perguntas, waveform reativo',
  'Aura-pergunta — análise NURSE + pergunta CNV baseada no áudio',
  'Fisiológico — vitais classificados (IMC, PA, FC, glicemia) com red flags',
  'Auto-exames — checkboxes com pictogramas (Mama, Próstata, Pele, Língua…)',
  'Upload de exames — Claude Vision processa PDF/JPG em background',
  'Remédios — RAG cruza transcript com catálogo de medicações',
  'Chat — entrevista estruturada com citação literal do áudio, bubbles emerald',
  'Laudo SOAP + Gestão clínica — agenda, estoque, resumo por áudio, selo LGPD/ANS',
  'Marcação de agenda — slots semanais + drag paciente + confirmação WhatsApp',
  'Faturamento previsto — 4 semanas previsto vs realizado, ticket, cancelamentos',
  'Almoxarifado — estoque atual, mínimo, sugestão de compra, auto-restock',
  'Farmácia — controlados, validade próxima, rastreabilidade lote/fabricante',
  'Cobrança automatizada — WhatsApp Business + lembrete + botão PIX integrado',
  'Antifraude de recibos — IA detecta inconsistências, score de confiança 0-100%',
  'NF automática — NFS-e municipal pós-atendimento, status SEFAZ em tempo real',
  'Previsão de receita — 12 meses, CAGR, sazonalidade, IC 80% sombreado',
  'Diagnóstico assistido — Sintomas → CID-10 (prob.) → Plano de ação',
  'Expectativa de vida — score risco perda/mortalidade, busca ativa priorizada',
  'Navegação paciente — flow diagram + probabilidade desfecho por caminho',
  'Combinação de tratamentos — matriz × outcomes com IC 95% e fontes médicas',
]

function captionFor(i: number) {
  const c = CAPTIONS_RAW[i - 1]
  const idx = c.indexOf('—')
  const title = idx > -1 ? c.slice(0, idx).trim() : c
  const desc = idx > -1 ? c.slice(idx + 1).trim() : ''
  return { title, desc }
}

/* ═════════════════════════════════════════════════════════════════════
   SCENE RENDERERS
   ═════════════════════════════════════════════════════════════════════ */

function RenderOpening() {
  return (
    <section className="dh-opening">
      <div className="dh-opening-kicker">
        <span className="dh-opening-kicker-dot" />
        DISCOVERY HEALTH · MEDICINA INTELIGENTE
      </div>
      <h1 className="dh-wordmark">
        ai<span className="dh-wordmark-dot">.</span>discovery
        <span className="dh-wordmark-sep">·</span>health
      </h1>
      <div className="dh-opening-quotes">
        <p className="dh-quote dh-quote-1">Quer aumentar atendimentos no consultório, clínica ou hospital?</p>
        <p className="dh-quote dh-quote-2">Cansado de organizar agenda que vira bagunça?</p>
        <p className="dh-quote dh-quote-3">Conheça o Discovery Health — Aura conhece a história inteira do paciente.</p>
        <p className="dh-quote dh-quote-4 dh-quote-closer">
          Anamnese precisa com auto-exames antecipa peculiaridades. Resumo via áudio em minutos.
          Organiza agenda, gerencia fluxo financeiro, controla estoques e automatiza compras com menor custo.
        </p>
      </div>
      <div className="dh-opening-foot">
        <span className="dh-foot-pill">Aura · médica virtual</span>
        <span className="dh-foot-pill">Laudo SOAP · CID-10</span>
        <span className="dh-foot-pill">LGPD-Saúde · ANS</span>
      </div>
    </section>
  )
}

function RenderS1() {
  const c = captionFor(1)
  const [selected, setSelected] = useState<TermoId>('voz')
  const termo = TERMOS.find((item) => item.id === selected) ?? TERMOS[0]
  return (
    <>
      <Scene index={1} url="health.iconsai.ai/termos">
        <SectionHeader kicker="discovery health · termos legais" title="Antes de começar." subtitle="Aceite explícito em três documentos — exigência LGPD." />
        <div className="dh-termos-shell">
          <div className="dh-termos-list">
            {TERMOS.map((item) => {
              const isSelected = item.id === selected
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`dh-termo-card dh-termo-card-button${item.id === 'voz' ? ' dh-termo-sensivel' : ''}${isSelected ? ' dh-termo-card-active' : ''}`}
                  onClick={() => setSelected(item.id)}
                  aria-pressed={isSelected}
                >
                  <span className={`dh-checkbox ${isSelected ? 'dh-checkbox-on' : ''}`} />
                  <div className="dh-termo-body">
                    {item.kicker && <div className="dh-termo-kicker">{item.kicker}</div>}
                    <div className="dh-termo-title">{item.titulo}</div>
                    <div className="dh-termo-text">{item.texto}</div>
                  </div>
                </button>
              )
            })}
          </div>

          <aside className="dh-termo-panel">
            <div className="dh-termo-panel-head">
              <span className="dh-termo-panel-kicker">documento em foco</span>
              <span className={`dh-termo-risk dh-termo-risk-${termo.risco}`}>{termo.risco}</span>
            </div>
            <div className="dh-termo-panel-title">{termo.titulo}</div>
            <p className="dh-termo-panel-copy">{termo.resumo}</p>

            <div className="dh-termo-panel-meta">
              <div><span>base legal</span><strong>{termo.base}</strong></div>
              <div><span>tipo de aceite</span><strong>{termo.aceite}</strong></div>
              <div><span>status</span><strong>pronto para assinatura</strong></div>
            </div>

            <div className="dh-termo-panel-block">
              <div className="dh-termo-panel-label">itens validados no fluxo</div>
              <div className="dh-termo-sinais">
                {termo.sinais.map((sinal) => (
                  <span key={sinal} className="dh-termo-sinal">{sinal}</span>
                ))}
              </div>
            </div>

            <div className="dh-termo-panel-foot">
              <span className="dh-termo-live-dot" />
              clique em outro termo para simular a revisão do onboarding clínico
            </div>
          </aside>
        </div>
        <div className="dh-btn-row dh-self-end">
          <button className="dh-btn dh-btn-ghost" type="button">Revisar depois</button>
          <button className="dh-btn dh-btn-primary" type="button">Aceito e quero começar →</button>
        </div>
      </Scene>
      <SceneCaption index={1} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS2() {
  const c = captionFor(2)
  return (
    <>
      <Scene index={2} url="health.iconsai.ai/identificacao">
        <StepIndicator current={0} />
        <SectionHeader title="Antes de começar." subtitle="CPF cruza com dados públicos da Receita Federal — fica seguro e não é compartilhado." />
        <div className="dh-prefill-banner">
          <div className="dh-prefill-kicker">dados pré-preenchidos</div>
          <div className="dh-prefill-text">Achei seus dados em registros públicos. Confere se está tudo certo.</div>
        </div>
        <div className="dh-form-grid">
          <Field label="Como gostaria de ser chamado(a)?" value="Fernando" />
          <div className="dh-form-row dh-form-row-2">
            <Field label="Idade" value="38" />
            <Field label="Gênero" value="M" chip />
          </div>
          <Field label="CPF" value="123.456.789-00" mono />
          <Field label="CEP" value="01310-100" mono hint="✓ endereço preenchido — confere e ajusta se precisar" />
          <div className="dh-form-row dh-form-row-3">
            <Field label="Rua" value="Avenida Paulista" span={2} />
            <Field label="Número" value="1578" />
          </div>
        </div>
      </Scene>
      <SceneCaption index={2} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS3() {
  const c = captionFor(3)
  return (
    <>
      <Scene index={3} url="health.iconsai.ai/confirm-identidade">
        <div className="dh-rf-stage">
          <div className="dh-rf-loader" aria-hidden="true">
            <div className="dh-rf-loader-kicker">cruzando registros públicos</div>
            <div className="dh-rf-donut">
              <svg className="dh-rf-donut-svg" viewBox="0 0 120 120" role="img" aria-label="Cruzando bases médicas">
                <defs>
                  <linearGradient id="dh-rf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <circle className="dh-rf-donut-track" cx="60" cy="60" r="52" fill="none" strokeWidth="8" />
                <circle className="dh-rf-donut-arc" cx="60" cy="60" r="52" fill="none" stroke="url(#dh-rf-grad)" strokeWidth="8" strokeLinecap="round" pathLength={100} />
              </svg>
              <div className="dh-rf-donut-center">
                <div className="dh-rf-counter">
                  <span className="dh-rf-counter-num">
                    <span className="dh-rf-tick dh-rf-tick-0">0.0</span>
                    <span className="dh-rf-tick dh-rf-tick-1">1.2</span>
                    <span className="dh-rf-tick dh-rf-tick-2">2.4</span>
                    <span className="dh-rf-tick dh-rf-tick-3">3.6</span>
                    <span className="dh-rf-tick dh-rf-tick-4 dh-rf-tick-done">4.8 <span className="dh-rf-counter-check">✓</span></span>
                  </span>
                  <span className="dh-rf-counter-unit">s</span>
                </div>
              </div>
            </div>
            <div className="dh-rf-loader-label">Cruzando bases médicas...</div>
            <div className="dh-rf-loader-steps">
              <span className="dh-rf-step dh-rf-step-1">dim_pessoas · Receita Federal</span>
              <span className="dh-rf-step dh-rf-step-2">vínculos QSA · sócios</span>
              <span className="dh-rf-step dh-rf-step-3">consentimento LGPD</span>
            </div>
          </div>
          <div className="dh-rf-revealed">
            <SectionHeader kicker="confirmação · registros públicos" title="Achei alguém com esse CPF. É você?" subtitle="Nome mascarado por privacidade. Libera o pré-preenchimento só após gesto explícito." />
            <div className="dh-confirm-card">
              <div className="dh-confirm-field"><div className="dh-confirm-kicker">nome</div><div className="dh-confirm-value">F••••••• A•••••••</div></div>
              <div className="dh-confirm-field"><div className="dh-confirm-kicker">idade aproximada</div><div className="dh-confirm-value-sm">38 anos</div></div>
              <div className="dh-confirm-field"><div className="dh-confirm-kicker">vínculo empresarial mais recente</div><div className="dh-confirm-text">IconsAI · Sócio</div></div>
            </div>
            <div className="dh-btn-row">
              <button className="dh-btn dh-btn-primary">Sou eu →</button>
              <button className="dh-btn dh-btn-ghost">Não sou eu</button>
            </div>
          </div>
        </div>
      </Scene>
      <SceneCaption index={3} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS4() {
  const c = captionFor(4)
  return (
    <>
      <Scene index={4} url="health.iconsai.ai/apresentacao">
        <StepIndicator current={1} />
        <div className="dh-aura-header">
          <div className="dh-aura-avatar">
            <span className="dh-aura-pulse" />
            <span className="dh-aura-pulse dh-aura-pulse-2" />
            <span className="dh-aura-initials">DH</span>
          </div>
          <div className="dh-aura-meta">
            <div className="dh-aura-kicker">Aura · Médica Virtual</div>
            <div className="dh-aura-status">falando...</div>
          </div>
        </div>
        <div className="dh-aura-script">
          <p className="dh-typew dh-typew-a1"><span className="dh-typew-text">Oi. Eu sou a Aura, a médica virtual da IconsAI.</span><span className="dh-typew-caret" /></p>
          <p className="dh-typew dh-typew-a2"><span className="dh-typew-text">Já atendi milhares de pessoas por aqui. Hoje você é o meu foco principal — vou escutar com atenção.</span><span className="dh-typew-caret" /></p>
          <p className="dh-typew dh-typew-a3"><span className="dh-typew-text">Essa anamnese não substitui consulta presencial. É triagem pra te poupar tempo — no final, laudo organizado pro seu médico.</span><span className="dh-typew-caret" /></p>
        </div>
      </Scene>
      <SceneCaption index={4} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS5() {
  const c = captionFor(5)
  return (
    <>
      <Scene index={5} url="health.iconsai.ai/audio-livre">
        <StepIndicator current={1} />
        <SectionHeader title="Fernando, conta o que está te incomodando." subtitle="Em até 2 minutos, fale como sente. Não precisa usar termo técnico." />
        <div className="dh-mic-card">
          <div className="dh-mic-ring">
            <div className="dh-mic-pulse" />
            <div className="dh-mic-pulse dh-mic-pulse-2" />
            <svg className="dh-mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          </div>
          <div className="dh-mic-status">gravando · escutando você</div>
          <div className="dh-wave">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="dh-wave-bar" style={{ animationDelay: `${(i % 8) * 0.09}s` }} />
            ))}
          </div>
          <div className="dh-mic-timer">00:47 / 02:00</div>
        </div>
      </Scene>
      <SceneCaption index={5} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS6() {
  const c = captionFor(6)
  return (
    <>
      <Scene index={6} url="health.iconsai.ai/aura-pergunta">
        <StepIndicator current={1} />
        <div className="dh-aura-header">
          <div className="dh-aura-avatar">
            <span className="dh-aura-pulse" />
            <span className="dh-aura-initials">DH</span>
          </div>
          <div className="dh-aura-meta">
            <div className="dh-aura-kicker">Aura · escutou você</div>
            <div className="dh-aura-status">falando...</div>
          </div>
        </div>
        <div className="dh-aura-script">
          <p className="dh-typew dh-typew-b1"><span className="dh-typew-text">Entendi. Você descreveu cefaleia pulsátil há 3 dias, piorando à tarde, sensível à luz. Parece coisa que tá te tirando do eixo.</span><span className="dh-typew-caret" /></p>
          <p className="dh-typew dh-typew-b2"><span className="dh-typew-text">Pergunto uma coisa: nessas crises, você consegue continuar trabalhando ou precisa parar tudo e deitar?</span><span className="dh-typew-caret" /></p>
        </div>
        <div className="dh-chips">
          <div className="dh-chips-kicker">resposta rápida</div>
          <div className="dh-chips-row">
            <span className="dh-chip">Continuo, com dificuldade</span>
            <span className="dh-chip">Preciso parar e deitar</span>
            <span className="dh-chip">Depende da intensidade</span>
          </div>
        </div>
      </Scene>
      <SceneCaption index={6} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS7() {
  const c = captionFor(7)
  return (
    <>
      <Scene index={7} url="health.iconsai.ai/fisiologico">
        <StepIndicator current={2} />
        <SectionHeader kicker="sinais vitais" title="Confere os dados fisiológicos." subtitle="Tudo que puder medir ajuda. Não tem? Marca 'Não sei' e segue." />
        <div className="dh-vitals-grid">
          <Vital label="Peso" value="72" suffix="kg" />
          <Vital label="Altura" value="175" suffix="cm" />
          <Vital label="PA sis." value="128" suffix="mmHg" />
          <Vital label="PA dia." value="82" suffix="mmHg" />
          <Vital label="Freq. card." value="74" suffix="bpm" />
          <Vital label="Glicemia" value="94" suffix="mg/dL" />
        </div>
        <div className="dh-vitals-classification">
          <span className="dh-tag dh-tag-ok">IMC 23.5 · Eutrofia</span>
          <span className="dh-tag dh-tag-warn">PA 128/82 · Pré-hipertensão</span>
          <span className="dh-tag dh-tag-ok">FC 74 · Normal</span>
        </div>
        <div className="dh-pain-slider">
          <div className="dh-pain-label">Dor agora (0–10)</div>
          <div className="dh-pain-track"><span className="dh-pain-thumb" /></div>
          <div className="dh-pain-value">6/10</div>
        </div>
      </Scene>
      <SceneCaption index={7} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS8() {
  const c = captionFor(8)
  return (
    <>
      <Scene index={8} url="health.iconsai.ai/auto-exames">
        <SectionHeader kicker="biblioteca · auto-exames guiados" title="Quais você quer fazer agora?" subtitle="Marque os auto-exames. Cada um vem com guia visual passo a passo." />
        <div className="dh-exames-check-grid">
          <ExameCheck pict="🌸" title="Mama" guia="palpação circular" selected />
          <ExameCheck pict="♂" title="Próstata" guia="toque retal orientado" />
          <ExameCheck pict="🟤" title="Pele" guia="ABCDE de melanoma" selected />
          <ExameCheck pict="👅" title="Língua" guia="cor, saburra, textura" />
          <ExameCheck pict="❤️" title="Pulso" guia="15s × 4 (radial)" selected />
          <ExameCheck pict="🫁" title="SpO₂" guia="oxímetro de dedo" />
          <ExameCheck pict="👄" title="Boca" guia="mucosa, gengiva, palato" />
          <ExameCheck pict="⚪" title="Testículo" guia="palpação pós-banho" />
        </div>
      </Scene>
      <SceneCaption index={8} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS9() {
  const c = captionFor(9)
  return (
    <>
      <Scene index={9} url="health.iconsai.ai/upload-exames">
        <SectionHeader kicker="exames laboratoriais / imagem" title="Trouxe exames?" subtitle="Sobe PDF, JPG ou PNG até 20MB cada. Eu leio e uso pra montar seu laudo." />
        <div className="dh-upload-drop">
          <svg className="dh-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <div className="dh-upload-text">Solte aqui ou escolha arquivos</div>
          <div className="dh-upload-hint">PDF, JPG, PNG · até 20 MB cada</div>
        </div>
        <ul className="dh-upload-list">
          <li className="dh-upload-item">
            <div><div className="dh-upload-name">hemograma_2026-03.pdf</div><div className="dh-upload-meta">412 KB · ✓ analisado</div></div>
            <span className="dh-upload-check">✓</span>
          </li>
          <li className="dh-upload-item">
            <div><div className="dh-upload-name">colesterol_total.pdf</div><div className="dh-upload-meta">238 KB · lendo o exame...</div></div>
            <span className="dh-upload-spinner" />
          </li>
          <li className="dh-upload-item">
            <div><div className="dh-upload-name">ressonancia_cranio.jpg</div><div className="dh-upload-meta">3.2 MB · aguardando análise</div></div>
            <span className="dh-upload-pending">…</span>
          </li>
        </ul>
      </Scene>
      <SceneCaption index={9} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS10() {
  const c = captionFor(10)
  return (
    <>
      <Scene index={10} url="health.iconsai.ai/remedios">
        <StepIndicator current={2} />
        <SectionHeader kicker="medicações em uso" title="Fernando, marca o que você usa." subtitle="Listei os remédios que casam com o áudio que você me contou." />
        <div className="dh-meds-list">
          <MedCard nome="Dipirona 500mg" classe="Analgésico · Antipirético" selected dose="1 cp" freq="se dor" />
          <MedCard nome="Losartana 50mg" classe="Anti-hipertensivo · ARB" selected dose="1 cp" freq="1x/dia" />
          <MedCard nome="Sertralina 50mg" classe="Antidepressivo · ISRS" />
          <MedCard nome="Omeprazol 20mg" classe="Inibidor bomba de prótons" />
        </div>
      </Scene>
      <SceneCaption index={10} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS11() {
  const c = captionFor(11)
  return (
    <>
      <Scene index={11} url="health.iconsai.ai/chat">
        <StepIndicator current={2} />
        <div className="dh-chat-progress">
          <div className="dh-chat-progress-track"><div className="dh-chat-progress-fill" /></div>
          <div className="dh-chat-progress-pct">68%</div>
        </div>
        <div className="dh-chat-thread">
          <div className="dh-msg dh-msg-agent">
            <div className="dh-msg-avatar">DH</div>
            <div className="dh-msg-bubble">Quando essa dor aperta mais — manhã, tarde, noite? Tá tendo gatilho?</div>
          </div>
          <div className="dh-msg-quote">citei do áudio: <strong>&quot;piora muito à tarde quando o computador esquenta&quot;</strong></div>
          <div className="dh-msg dh-msg-user">
            <div className="dh-msg-bubble dh-msg-bubble-user">Sempre depois do almoço. Umas 14h começa, fica forte até as 18.</div>
          </div>
          <div className="dh-msg dh-msg-agent">
            <div className="dh-msg-avatar">DH</div>
            <div className="dh-msg-bubble">Aham. E o sono — você tá conseguindo descansar? Quantas horas?</div>
          </div>
          <div className="dh-msg dh-msg-typing">
            <span className="dh-msg-avatar">DH</span>
            <div className="dh-msg-dots"><span /><span /><span /></div>
          </div>
        </div>
      </Scene>
      <SceneCaption index={11} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS12() {
  const c = captionFor(12)
  return (
    <>
      <Scene index={12} url="health.iconsai.ai/laudo/Tk-Hf3pK9q">
        <StepIndicator current={3} />
        <div className="dh-laudo-header">
          <div className="dh-laudo-stamp">
            <div className="dh-laudo-stamp-kicker">laudo pronto</div>
            <div className="dh-laudo-stamp-meta">Token público · 2026-05-15 14:32</div>
          </div>
          <div className="dh-laudo-selo">
            <span className="dh-laudo-selo-dot" />
            LGPD-Saúde · ANS
          </div>
        </div>
        <div className="dh-laudo-soap">
          <SoapCard letter="S" title="Subjetivo" text="Cefaleia pulsátil há 3 dias, piora à tarde, sensibilidade à luz. Dor 6/10." revealClass="dh-reveal-s" />
          <SoapCard letter="O" title="Objetivo" text="PA 128/82 · FC 74 · IMC 23.5 · hemograma normal · auto-relato 6/10." revealClass="dh-reveal-o" />
          <SoapCard letter="A" title="Avaliação" text="Cefaleia tensional + fadiga visual digital. DD: enxaqueca sem aura." revealClass="dh-reveal-a" />
          <SoapCard letter="P" title="Plano" text="Higiene visual (20-20-20). Reavaliar PA em 7 dias. Encaminhar se persistir." revealClass="dh-reveal-p" />
        </div>
        <div className="dh-gestao-strip">
          <div className="dh-gestao-card">
            <div className="dh-gestao-kicker">📅 Agenda organizada</div>
            <div className="dh-mini-cal">
              <span className="dh-cal-day dh-cal-day-full">14h</span>
              <span className="dh-cal-day dh-cal-day-full">15h</span>
              <span className="dh-cal-day dh-cal-day-open">16h</span>
              <span className="dh-cal-day dh-cal-day-full">17h</span>
              <span className="dh-cal-day dh-cal-day-open">18h</span>
            </div>
          </div>
          <div className="dh-gestao-card">
            <div className="dh-gestao-kicker">📦 Estoque · auto-restock</div>
            <div className="dh-stock-row">
              <span className="dh-stock-label">Dipirona</span>
              <span className="dh-stock-bar"><span className="dh-stock-fill" style={{ width: '74%' }} /></span>
              <span className="dh-stock-val">74%</span>
            </div>
            <div className="dh-stock-row">
              <span className="dh-stock-label">Luvas P</span>
              <span className="dh-stock-bar"><span className="dh-stock-fill dh-stock-fill-warn" style={{ width: '22%' }} /></span>
              <span className="dh-stock-val">22% ↻</span>
            </div>
          </div>
          <div className="dh-gestao-card">
            <div className="dh-gestao-kicker">🎙 Resumo paciente · áudio</div>
            <div className="dh-audio-mini">
              <button className="dh-audio-play" aria-label="play">▶</button>
              <div className="dh-audio-wave">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} className="dh-audio-bar" style={{ animationDelay: `${(i % 7) * 0.08}s` }} />
                ))}
              </div>
              <span className="dh-audio-time">1:42</span>
            </div>
          </div>
        </div>
      </Scene>
      <SceneCaption index={12} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS13() {
  const c = captionFor(13)
  return (
    <>
      <Scene index={13} url="health.iconsai.ai/agenda">
        <SectionHeader kicker="agenda · semana corrente" title="Arraste o paciente para o slot." subtitle="Confirmação automática via WhatsApp. Sem ligação, sem retrabalho." />
        <div className="dh-agenda-grid">
          <div className="dh-agenda-row dh-agenda-row-head">
            <span className="dh-agenda-cell-head">Turno</span><span className="dh-agenda-cell-head">Seg</span><span className="dh-agenda-cell-head">Ter</span><span className="dh-agenda-cell-head">Qua</span><span className="dh-agenda-cell-head">Qui</span><span className="dh-agenda-cell-head">Sex</span>
          </div>
          <div className="dh-agenda-row">
            <span className="dh-agenda-cell-head">Manhã</span><span className="dh-agenda-slot dh-slot-full">M.Silva</span><span className="dh-agenda-slot dh-slot-full">R.Souza</span><span className="dh-agenda-slot dh-slot-open">livre</span><span className="dh-agenda-slot dh-slot-full">A.Costa</span><span className="dh-agenda-slot dh-slot-open">livre</span>
          </div>
          <div className="dh-agenda-row">
            <span className="dh-agenda-cell-head">Tarde</span><span className="dh-agenda-slot dh-slot-full">P.Lima</span><span className="dh-agenda-slot dh-slot-drop">Fernando ⇣</span><span className="dh-agenda-slot dh-slot-full">J.Alves</span><span className="dh-agenda-slot dh-slot-open">livre</span><span className="dh-agenda-slot dh-slot-full">B.Rocha</span>
          </div>
          <div className="dh-agenda-row">
            <span className="dh-agenda-cell-head">Noite</span><span className="dh-agenda-slot dh-slot-open">livre</span><span className="dh-agenda-slot dh-slot-full">L.Mendes</span><span className="dh-agenda-slot dh-slot-open">livre</span><span className="dh-agenda-slot dh-slot-full">T.Pinto</span><span className="dh-agenda-slot dh-slot-open">livre</span>
          </div>
        </div>
        <div className="dh-agenda-confirm">
          <span className="dh-agenda-wa">✓ Confirmado por WhatsApp</span>
          <span className="dh-agenda-meta">Fernando · Ter 14h00 · lembrete 24h antes</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={13} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS14() {
  const c = captionFor(14)
  return (
    <>
      <Scene index={14} url="health.iconsai.ai/faturamento">
        <SectionHeader kicker="financeiro · próximas 4 semanas" title="Previsto vs realizado." subtitle="Curva real cruzada com agenda confirmada. Identifica gap antes de fechar o mês." />
        <div className="dh-fat-chart">
          <FatBar label="S1" prev={62} real={58} prevK="R$ 62k" realK="R$ 58k" />
          <FatBar label="S2" prev={71} real={69} prevK="R$ 71k" realK="R$ 69k" />
          <FatBar label="S3" prev={68} real={72} prevK="R$ 68k" realK="R$ 72k" />
          <FatBar label="S4" prev={84} real={0} prevK="R$ 84k" realK="—" pending />
        </div>
        <div className="dh-fat-stats">
          <div className="dh-fat-stat"><span className="dh-fat-stat-k">Ticket médio</span><span className="dh-fat-stat-v">R$ 312</span></div>
          <div className="dh-fat-stat"><span className="dh-fat-stat-k">Cancelamentos</span><span className="dh-fat-stat-v dh-fat-warn">8,4%</span></div>
          <div className="dh-fat-stat"><span className="dh-fat-stat-k">Realizado / Previsto</span><span className="dh-fat-stat-v">96,2%</span></div>
          <div className="dh-fat-stat"><span className="dh-fat-stat-k">Projeção mês</span><span className="dh-fat-stat-v dh-fat-ok">R$ 285k</span></div>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={14} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS15() {
  const c = captionFor(15)
  return (
    <>
      <Scene index={15} url="health.iconsai.ai/almoxarifado">
        <SectionHeader kicker="estoque · materiais clínicos" title="Almoxarifado — visão por item." subtitle="Vermelho = abaixo do mínimo. Sugestão de compra calculada por consumo médio das 4 últimas semanas." />
        <div className="dh-stock-table">
          <div className="dh-stock-th"><span>Item</span><span>Atual</span><span>Mínimo</span><span>Sugestão</span><span>Status</span></div>
          <StockRow item="Luvas P (cx 100)" atual="22" min="40" sug="80" status="low" />
          <StockRow item="Seringa 10mL" atual="184" min="60" sug="—" status="ok" />
          <StockRow item="Gaze estéril" atual="38" min="50" sug="120" status="low" />
          <StockRow item="Álcool 70% 1L" atual="62" min="20" sug="—" status="ok" />
          <StockRow item="Máscara N95" atual="9" min="30" sug="100" status="critical" />
        </div>
        <div className="dh-stock-foot">
          <span className="dh-stock-badge">⚡ Auto-restock ativo · 3 itens em pedido</span>
          <span className="dh-stock-info">Fornecedor padrão · Cremer · entrega em 2 dias úteis</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={15} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS16() {
  const c = captionFor(16)
  return (
    <>
      <Scene index={16} url="health.iconsai.ai/farmacia">
        <SectionHeader kicker="farmácia · medicamentos controlados" title="Controle por lote, validade e classe." subtitle="Rastreabilidade completa para ANVISA. Alertas 60 dias antes do vencimento." />
        <div className="dh-farma-table">
          <div className="dh-farma-th"><span>Medicamento</span><span>Classe</span><span>Lote / Fab.</span><span>Validade</span><span>Saldo</span></div>
          <FarmaRow nome="Clonazepam 2mg" classe="B1" lote="CL2026-09 · EMS" val="2026-09-15" saldo="48 cp" warn />
          <FarmaRow nome="Morfina 10mg" classe="A1" lote="MF2026-11 · Cristália" val="2026-11-20" saldo="12 amp" />
          <FarmaRow nome="Diazepam 10mg" classe="B1" lote="DZ2026-07 · Teuto" val="2026-07-30" saldo="22 cp" warn critical />
          <FarmaRow nome="Tramadol 50mg" classe="A2" lote="TR2027-02 · Aché" val="2027-02-10" saldo="60 cp" />
        </div>
        <div className="dh-farma-foot">
          <span className="dh-farma-badge">⚠ 2 lotes vencendo em &lt; 90 dias</span>
          <span className="dh-farma-badge dh-farma-badge-ok">✓ SNGPC sincronizado</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={16} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS17() {
  const c = captionFor(17)
  return (
    <>
      <Scene index={17} url="health.iconsai.ai/cobranca">
        <SectionHeader kicker="cobrança · automatizada" title="WhatsApp com PIX integrado." subtitle="Sequência humanizada: lembrete D-3, D-1, D+0. Quitação em segundos via PIX." />
        <div className="dh-wa-card">
          <div className="dh-wa-header">
            <div className="dh-wa-avatar">DH</div>
            <div className="dh-wa-meta"><div className="dh-wa-name">Discovery Health · Clínica Aurora</div><div className="dh-wa-online">online · responde em segundos</div></div>
          </div>
          <div className="dh-wa-thread">
            <div className="dh-wa-msg">Olá, Fernando 👋 Sua consulta com Dra. Marina está marcada para amanhã às 14h.</div>
            <div className="dh-wa-msg">O valor é <strong>R$ 320,00</strong>. Quer adiantar via PIX? Recibo e NF saem automáticos.</div>
            <div className="dh-wa-pix">
              <span className="dh-wa-pix-icon">⚡</span>
              <div className="dh-wa-pix-body">
                <div className="dh-wa-pix-k">Pagar via PIX · R$ 320,00</div>
                <div className="dh-wa-pix-v">QR Code expira em 10 min · CNPJ 12.345.678/0001-00</div>
              </div>
              <button className="dh-wa-pix-btn">Abrir →</button>
            </div>
            <div className="dh-wa-msg dh-wa-msg-user">Acabei de pagar 👍</div>
            <div className="dh-wa-msg dh-wa-ok">✓ Recebido. Recibo e NFS-e enviados por e-mail. Até amanhã!</div>
          </div>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={17} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS18() {
  const c = captionFor(18)
  return (
    <>
      <Scene index={18} url="health.iconsai.ai/antifraude">
        <SectionHeader kicker="antifraude · IA forense" title="Recibo recebido. Validando..." subtitle="Claude Vision compara metadados, fonte, pixels e cruza com transações reais." />
        <div className="dh-fraud-grid">
          <div className="dh-fraud-doc">
            <div className="dh-fraud-doc-kicker">DOCUMENTO</div>
            <div className="dh-fraud-doc-title">recibo_consulta_2026-05-12.pdf</div>
            <div className="dh-fraud-doc-row"><span>Emitente</span><span>Clínica Aurora</span></div>
            <div className="dh-fraud-doc-row"><span>Valor</span><span className="dh-mono">R$ 1.280,00</span></div>
            <div className="dh-fraud-doc-row"><span>Data</span><span className="dh-mono">2026-05-12</span></div>
          </div>
          <div className="dh-fraud-score">
            <div className="dh-fraud-score-kicker">SCORE DE CONFIANÇA</div>
            <div className="dh-fraud-score-ring">
              <span className="dh-fraud-score-val">38</span>
              <span className="dh-fraud-score-unit">/100</span>
            </div>
            <div className="dh-fraud-score-label dh-fraud-score-bad">⚠ Suspeita alta</div>
          </div>
        </div>
        <div className="dh-fraud-issues">
          <div className="dh-fraud-issue"><span className="dh-fraud-issue-dot dh-fraud-issue-bad" /><span>Data foi reescrita sobre o PDF original (forense de pixel)</span></div>
          <div className="dh-fraud-issue"><span className="dh-fraud-issue-dot dh-fraud-issue-bad" /><span>Valor R$ 1.280 não bate com tabela do procedimento (R$ 320)</span></div>
          <div className="dh-fraud-issue"><span className="dh-fraud-issue-dot dh-fraud-issue-warn" /><span>CNPJ confere, mas sem NFS-e correspondente emitida</span></div>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={18} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS19() {
  const c = captionFor(19)
  return (
    <>
      <Scene index={19} url="health.iconsai.ai/nf">
        <SectionHeader kicker="fiscal · NFS-e municipal" title="NF emitida automaticamente." subtitle="Após cada atendimento, o sistema emite a NFS-e no padrão da prefeitura e devolve XML + PDF." />
        <div className="dh-nf-table">
          <div className="dh-nf-th"><span>Nº</span><span>Cliente</span><span>Valor</span><span>Emissão</span><span>SEFAZ</span></div>
          <NfRow num="002.418" cliente="Fernando Arbache" valor="R$ 320,00" data="2026-05-15 14:42" status="ok" />
          <NfRow num="002.417" cliente="M.Silva" valor="R$ 280,00" data="2026-05-15 11:20" status="ok" />
          <NfRow num="002.416" cliente="R.Souza" valor="R$ 450,00" data="2026-05-15 10:08" status="ok" />
          <NfRow num="002.415" cliente="A.Costa" valor="R$ 320,00" data="2026-05-14 16:55" status="pending" />
          <NfRow num="002.414" cliente="P.Lima" valor="R$ 380,00" data="2026-05-14 14:30" status="ok" />
        </div>
        <div className="dh-nf-foot">
          <div className="dh-nf-foot-stat"><span className="dh-nf-foot-k">Emitidas hoje</span><span className="dh-nf-foot-v">14</span></div>
          <div className="dh-nf-foot-stat"><span className="dh-nf-foot-k">Aguardando SEFAZ</span><span className="dh-nf-foot-v dh-fat-warn">1</span></div>
          <div className="dh-nf-foot-stat"><span className="dh-nf-foot-k">Webhook ABRASF</span><span className="dh-nf-foot-v dh-fat-ok">● live</span></div>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={19} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS20() {
  const c = captionFor(20)
  return (
    <>
      <Scene index={20} url="health.iconsai.ai/previsao-receita">
        <SectionHeader kicker="forecast · receita anual" title="Projeção 12 meses · banda de confiança." subtitle="Modelo VAR com sazonalidade e dummy de feriados. IC 80% sombreado." />
        <div className="dh-prev-chart">
          <svg viewBox="0 0 600 220" preserveAspectRatio="none" className="dh-prev-svg">
            <line x1="0" y1="50" x2="600" y2="50" className="dh-prev-grid" />
            <line x1="0" y1="110" x2="600" y2="110" className="dh-prev-grid" />
            <line x1="0" y1="170" x2="600" y2="170" className="dh-prev-grid" />
            <path d="M 0 130 L 50 122 L 100 118 L 150 110 L 200 102 L 250 90 L 300 96 L 350 84 L 400 76 L 450 70 L 500 62 L 550 56 L 600 50 L 600 90 L 550 92 L 500 98 L 450 106 L 400 112 L 350 118 L 300 130 L 250 124 L 200 134 L 150 140 L 100 148 L 50 152 L 0 160 Z" className="dh-prev-band" />
            <path d="M 0 145 L 50 138 L 100 134 L 150 126 L 200 118 L 250 106 L 300 112" className="dh-prev-line dh-prev-line-real" />
            <path d="M 300 112 L 350 100 L 400 92 L 450 86 L 500 78 L 550 72 L 600 64" className="dh-prev-line dh-prev-line-prev" />
            {[0, 50, 100, 150, 200, 250, 300].map((x, i) => (
              <circle key={i} cx={x} cy={[145, 138, 134, 126, 118, 106, 112][i]} r="3" className="dh-prev-dot" />
            ))}
            <line x1="300" y1="20" x2="300" y2="200" className="dh-prev-now" />
            <text x="304" y="32" className="dh-prev-now-label">HOJE</text>
          </svg>
          <div className="dh-prev-xaxis">
            <span>Jun</span><span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span><span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span>
          </div>
        </div>
        <div className="dh-prev-stats">
          <div className="dh-prev-stat"><span className="dh-prev-stat-k">CAGR 12m</span><span className="dh-prev-stat-v dh-fat-ok">+18,4%</span></div>
          <div className="dh-prev-stat"><span className="dh-prev-stat-k">Sazonalidade pico</span><span className="dh-prev-stat-v">Mar–Mai</span></div>
          <div className="dh-prev-stat"><span className="dh-prev-stat-k">Projeção 12m</span><span className="dh-prev-stat-v">R$ 3,82M</span></div>
          <div className="dh-prev-stat"><span className="dh-prev-stat-k">IC 80%</span><span className="dh-prev-stat-v">±7,2%</span></div>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={20} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS21() {
  const c = captionFor(21)
  return (
    <>
      <Scene index={21} url="health.iconsai.ai/diagnostico">
        <SectionHeader kicker="diagnóstico assistido · pipeline IA" title="Sintomas → CID-10 → Plano." subtitle="Probabilidades calibradas. Decisão clínica final é sempre do médico — IA é apoio." />
        <div className="dh-diag-pipeline">
          <div className="dh-diag-node">
            <div className="dh-diag-node-k">SINTOMAS</div>
            <div className="dh-diag-chip">cefaleia pulsátil</div>
            <div className="dh-diag-chip">fotofobia</div>
            <div className="dh-diag-chip">piora vespertina</div>
            <div className="dh-diag-chip">dor 6/10</div>
          </div>
          <span className="dh-diag-arrow">→</span>
          <div className="dh-diag-node">
            <div className="dh-diag-node-k">CID-10 (PROB.)</div>
            <div className="dh-diag-cid"><span>G44.2 · Cefaleia tensional</span><span className="dh-diag-prob dh-prob-high">72%</span></div>
            <div className="dh-diag-cid"><span>G43.0 · Enxaqueca s/ aura</span><span className="dh-diag-prob dh-prob-mid">19%</span></div>
            <div className="dh-diag-cid"><span>H53.5 · Fadiga visual</span><span className="dh-diag-prob dh-prob-low">6%</span></div>
            <div className="dh-diag-cid"><span>Outros</span><span className="dh-diag-prob dh-prob-low">3%</span></div>
          </div>
          <span className="dh-diag-arrow">→</span>
          <div className="dh-diag-node">
            <div className="dh-diag-node-k">PLANO SUGERIDO</div>
            <div className="dh-diag-action">Higiene visual 20-20-20</div>
            <div className="dh-diag-action">Hidratação + sono regular</div>
            <div className="dh-diag-action">Reavaliar PA em 7 dias</div>
            <div className="dh-diag-action dh-diag-action-warn">Encaminhar neuro se &gt; 14 dias</div>
          </div>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={21} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS22() {
  const c = captionFor(22)
  return (
    <>
      <Scene index={22} url="health.iconsai.ai/expectativa-vida">
        <SectionHeader kicker="risco populacional · longitudinal" title="Pacientes em risco de perda." subtitle="Score 0–100 com comorbidades, idade, adesão. Vermelho = intervenção prioritária." />
        <div className="dh-life-table">
          <div className="dh-life-th"><span>Paciente</span><span>Idade</span><span>Comorbid.</span><span>Adesão</span><span>Score risco</span></div>
          <LifeRow nome="M.Silva" idade="68" comorb="HAS, DM2, DRC" adesao="62%" score={84} level="high" />
          <LifeRow nome="R.Souza" idade="54" comorb="HAS, dislipidemia" adesao="88%" score={42} level="mid" />
          <LifeRow nome="A.Costa" idade="71" comorb="ICC, FA, DM2" adesao="71%" score={78} level="high" />
          <LifeRow nome="P.Lima" idade="46" comorb="obesidade" adesao="95%" score={22} level="low" />
          <LifeRow nome="J.Alves" idade="62" comorb="DPOC, HAS" adesao="58%" score={71} level="high" />
        </div>
        <div className="dh-life-foot">
          <span className="dh-life-badge dh-life-badge-bad">3 pacientes · busca ativa hoje</span>
          <span className="dh-life-badge">⌀ Expectativa ajustada: 78,4 anos · IC 95%: ±2,1</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={22} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS23() {
  const c = captionFor(23)
  return (
    <>
      <Scene index={23} url="health.iconsai.ai/navegacao">
        <SectionHeader kicker="patient journey · markov" title="Trajetória prevista — caminho A vs B." subtitle="Cada nó é uma etapa do tratamento. Edges mostram probabilidade de transição." />
        <div className="dh-flow">
          <svg viewBox="0 0 640 220" className="dh-flow-svg" preserveAspectRatio="xMidYMid meet">
            <path d="M 90 110 C 160 60, 220 60, 290 60" className="dh-flow-edge dh-flow-edge-a" />
            <path d="M 90 110 C 160 160, 220 160, 290 160" className="dh-flow-edge dh-flow-edge-b" />
            <path d="M 350 60 L 510 60" className="dh-flow-edge dh-flow-edge-a" />
            <path d="M 350 160 L 510 160" className="dh-flow-edge dh-flow-edge-b" />
            <text x="180" y="78" className="dh-flow-edge-label">caminho A · 67%</text>
            <text x="180" y="190" className="dh-flow-edge-label">caminho B · 89%</text>
            <text x="410" y="50" className="dh-flow-edge-label">↗ recovery</text>
            <text x="410" y="180" className="dh-flow-edge-label">↗ recovery</text>
            <g>
              <circle cx="60" cy="110" r="28" className="dh-flow-node" />
              <text x="60" y="105" className="dh-flow-node-t">Triagem</text>
              <text x="60" y="120" className="dh-flow-node-s">início</text>
            </g>
            <g>
              <circle cx="320" cy="60" r="28" className="dh-flow-node dh-flow-node-a" />
              <text x="320" y="55" className="dh-flow-node-t">Trato A</text>
              <text x="320" y="70" className="dh-flow-node-s">conservador</text>
            </g>
            <g>
              <circle cx="320" cy="160" r="28" className="dh-flow-node dh-flow-node-b" />
              <text x="320" y="155" className="dh-flow-node-t">Trato B</text>
              <text x="320" y="170" className="dh-flow-node-s">intensivo</text>
            </g>
            <g>
              <circle cx="540" cy="60" r="28" className="dh-flow-node dh-flow-node-out" />
              <text x="540" y="55" className="dh-flow-node-t">Alta</text>
              <text x="540" y="70" className="dh-flow-node-s">67%</text>
            </g>
            <g>
              <circle cx="540" cy="160" r="28" className="dh-flow-node dh-flow-node-out" />
              <text x="540" y="155" className="dh-flow-node-t">Alta</text>
              <text x="540" y="170" className="dh-flow-node-s">89%</text>
            </g>
          </svg>
        </div>
        <div className="dh-flow-legend">
          <span className="dh-flow-leg dh-flow-leg-a">● Caminho A · conservador · custo R$ 4.2k · 67% recovery</span>
          <span className="dh-flow-leg dh-flow-leg-b">● Caminho B · intensivo · custo R$ 11.8k · 89% recovery</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={23} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS24() {
  const c = captionFor(24)
  return (
    <>
      <Scene index={24} url="health.iconsai.ai/combinacao-tratamentos">
        <SectionHeader kicker="evidence matrix · meta-análise" title="Combinações de tratamento × desfecho." subtitle="Cada célula traz probabilidade + intervalo de confiança 95% das fontes médicas." />
        <div className="dh-matrix">
          <div className="dh-matrix-row dh-matrix-row-head">
            <span className="dh-matrix-corner">tratamento ↓ / desfecho →</span>
            <span className="dh-matrix-h">Remissão</span>
            <span className="dh-matrix-h">Melhora parcial</span>
            <span className="dh-matrix-h">Sem efeito</span>
            <span className="dh-matrix-h">Eventos adversos</span>
          </div>
          <MatrixRow tratamento="A · monoterapia">
            <MatrixCell prob="62%" ic="±4,8" tone="ok" />
            <MatrixCell prob="24%" ic="±3,1" tone="mid" />
            <MatrixCell prob="12%" ic="±2,4" tone="low" />
            <MatrixCell prob="2%" ic="±0,9" tone="low" />
          </MatrixRow>
          <MatrixRow tratamento="A + B">
            <MatrixCell prob="78%" ic="±3,2" tone="ok-strong" />
            <MatrixCell prob="14%" ic="±2,1" tone="low" />
            <MatrixCell prob="6%" ic="±1,4" tone="low" />
            <MatrixCell prob="2%" ic="±0,8" tone="low" />
          </MatrixRow>
          <MatrixRow tratamento="B · monoterapia">
            <MatrixCell prob="48%" ic="±5,1" tone="mid" />
            <MatrixCell prob="32%" ic="±3,8" tone="mid" />
            <MatrixCell prob="16%" ic="±2,6" tone="warn" />
            <MatrixCell prob="4%" ic="±1,2" tone="low" />
          </MatrixRow>
          <MatrixRow tratamento="A + B + C">
            <MatrixCell prob="84%" ic="±2,8" tone="ok-strong" />
            <MatrixCell prob="9%" ic="±1,6" tone="low" />
            <MatrixCell prob="3%" ic="±1,0" tone="low" />
            <MatrixCell prob="4%" ic="±1,2" tone="warn" />
          </MatrixRow>
        </div>
        <SourcesFooter strong />
      </Scene>
      <SceneCaption index={24} title={c.title} desc={c.desc} />
    </>
  )
}

/* ═════════════════════════════════════════════════════════════════════
   SCENES — composição pro shell
   ═════════════════════════════════════════════════════════════════════ */

const RENDERERS: Array<() => React.ReactNode> = [
  RenderOpening,
  RenderS1, RenderS2, RenderS3, RenderS4, RenderS5, RenderS6, RenderS7, RenderS8,
  RenderS9, RenderS10, RenderS11, RenderS12, RenderS13, RenderS14, RenderS15, RenderS16,
  RenderS17, RenderS18, RenderS19, RenderS20, RenderS21, RenderS22, RenderS23, RenderS24,
]

const DH_SCENES_NEW: ShowcaseScene[] = DH_NAV.map((sc, i) => {
  const next = i + 1 < DH_NAV.length ? DH_NAV[i + 1].startMs : DH_CYCLE_MS
  const Renderer = RENDERERS[i]
  return {
    id: sc.step,
    startMs: sc.startMs,
    durationMs: next - sc.startMs,
    label: sc.label,
    render: () => <Renderer />,
  }
})

export function Showcase() {
  return (
    <ShowcaseShell
      scenes={DH_SCENES_NEW}
      accentColor="#10b981"
      productEyebrow="DISCOVERY HEALTH · MEDICINA INTELIGENTE"
      productName="ai.discovery·health"
    />
  )
}

// Voids unused-warnings on helpers consumed by inline scenes
void SCENE_SLOT
void OPENING
