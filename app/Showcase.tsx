'use client'

/**
 * Discovery Health · Aura — Showcase canônico (skill /showcase).
 *
 * Motor scroll-snap horizontal via <SlideEngine>. Tema dark, chrome canônico.
 * Abertura tipográfica + 24 slides do fluxo clínico/operacional, cada um no
 * PALCO (entre header/footer) com scale-to-fit.
 */

import { useState, type CSSProperties } from 'react'
import { SlideEngine, useLang, type SlideDef } from './SlideEngine'
import { MedIcon } from '@/components/MedIcon'
import {
  UI, OPENING, STEPS, FECHO, S1 as S1C, S2 as S2C, S3 as S3C, S4 as S4C,
  S5 as S5C, S6 as S6C, S7 as S7C, S8 as S8C,
  S9 as S9C, S10 as S10C, S11 as S11C, S12 as S12C,
  S13 as S13C, S14 as S14C, S15 as S15C, S16 as S16C,
  S17 as S17C, S18 as S18C, S19 as S19C, S20 as S20C,
  S21 as S21C, S22 as S22C, S23 as S23C, S24 as S24C,
} from './content'
import '@/components/showcase.css'

const SCENE_COUNT = 24
/* §2/§8.5: estas telas são DEMONSTRAÇÃO de produto. Números nas telas são
 * ilustrativos (tipo 2) — não são dados reais colhidos e não podem se
 * apresentar como tais. O rodapé honesto (operacional vs médico) vive em
 * `UI.sourcesDemo`/`UI.sourcesMedical` no content, localizado por país. */

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
  { startMs: 259_000, step: '25', label: 'Fecho' },
]

type TermoId = 'uso' | 'privacidade' | 'voz'

/* ═════════════════════════════════════════════════════════════════════
   HELPERS
   ═════════════════════════════════════════════════════════════════════ */

/**
 * DhTw — outrora typewriter atado ao ciclo de 259s. No motor scroll-snap não há
 * ciclo global; renderiza o texto estático (reveal de entrada fica a cargo do
 * cascade .a/.d1… via [data-active]/[data-seen] no CSS, §7).
 * Mantém a assinatura para não tocar os 25 renderers.
 */
function DhTw({
  text,
  className,
}: {
  text: string
  className: string
  startMs?: number
  endMs?: number
  entryDelayMs?: number
  perWordMs?: number
  uid?: string
}) {
  return <span className={className}>{text}</span>
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
  const steps = STEPS[useLang()]
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

function ExameCheck({ pict, title, guia, selected }: { pict: import('@/components/MedIcon').MedIconKey; title: string; guia: string; selected?: boolean }) {
  return (
    <label className={`dh-exame-check ${selected ? 'dh-exame-check-on' : ''}`}>
      <span className={`dh-checkbox ${selected ? 'dh-checkbox-on' : ''}`} />
      <span className="dh-exame-check-pict"><MedIcon name={pict} size={28} /></span>
      <span className="dh-exame-check-body">
        <span className="dh-exame-check-title">{title}</span>
        <span className="dh-exame-check-guia">{guia}</span>
      </span>
    </label>
  )
}

function MedCard({ nome, classe, selected, dose, freq }: { nome: string; classe: string; selected?: boolean; dose?: string; freq?: string }) {
  const u = UI[useLang()]
  return (
    <div className={`dh-med ${selected ? 'dh-med-selected' : ''}`}>
      <span className={`dh-checkbox ${selected ? 'dh-checkbox-on' : ''}`} />
      <div className="dh-med-body">
        <div className="dh-med-name">{nome}</div>
        <div className="dh-med-classe">{classe}</div>
        {selected && dose && freq && (
          <div className="dh-med-fields">
            <span className="dh-med-field">{u.dose}: {dose}</span>
            <span className="dh-med-field">{u.freq}: {freq}</span>
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
  const u = UI[useLang()]
  return (
    <div className="dh-fat-bar">
      <div className="dh-fat-bar-pair">
        <span className="dh-fat-bar-col dh-fat-bar-col-prev" style={{ height: `${prev}%` }}>
          <span className="dh-fat-bar-num">{prevK}</span>
        </span>
        <span className={`dh-fat-bar-col dh-fat-bar-col-real ${pending ? 'dh-fat-bar-col-pending' : ''}`} style={{ height: `${real}%` }}>
          {!pending && <span className="dh-fat-bar-num">{realK}</span>}
          {pending && <span className="dh-fat-bar-pending-label">{u.previsto}</span>}
        </span>
      </div>
      <span className="dh-fat-bar-label">{label}</span>
    </div>
  )
}

function StockRow({ item, atual, min, sug, status }: { item: string; atual: string; min: string; sug: string; status: 'ok' | 'low' | 'critical' }) {
  const u = UI[useLang()]
  const label = status === 'ok' ? u.stockOk : status === 'low' ? u.stockLow : u.stockCritical
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

function NfRow({ num, cliente, valor, data, status, okLabel, pendingLabel }: { num: string; cliente: string; valor: string; data: string; status: 'ok' | 'pending'; okLabel: string; pendingLabel: string }) {
  return (
    <div className="dh-nf-tr">
      <span className="dh-mono">{num}</span>
      <span>{cliente}</span>
      <span className="dh-mono">{valor}</span>
      <span className="dh-mono dh-nf-tr-data">{data}</span>
      <span className={`dh-nf-tr-status dh-nf-tr-status-${status}`}>{status === 'ok' ? okLabel : pendingLabel}</span>
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
  const u = UI[useLang()]
  return (
    <span className={`dh-matrix-cell dh-matrix-cell-${tone}`}>
      <span className="dh-matrix-cell-p">{prob}</span>
      <span className="dh-matrix-cell-ic">{u.ic95} {ic}</span>
    </span>
  )
}

function SourcesFooter({ strong, variant = 'demo' }: { strong?: boolean; variant?: 'demo' | 'medical' }) {
  const u = UI[useLang()]
  return (
    <div className={`dh-sources ${strong ? 'dh-sources-strong' : ''}`}>
      <span className="dh-sources-dot" />
      {variant === 'medical' ? u.sourcesMedical : u.sourcesDemo}
    </div>
  )
}

/**
 * SceneCaption — no motor scroll-snap a descrição enriquecida vive no painel
 * «Aa» (§8.3) e o nome do produto no header. A legenda-overlay (atada ao ciclo)
 * foi removida; mantém a assinatura para não tocar os renderers.
 */
function SceneCaption(_props: { index: number; title: string; desc: string }) {
  void SCENE_COUNT
  return null
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
  'Upload de exames — IconsAI Vision processa PDF/JPG em background',
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
  const t = OPENING[useLang()]
  return (
    <section className="dh-opening">
      <div className="dh-opening-grid">
        <div className="dh-opening-copy">
          <div className="dh-opening-kicker">
            <span className="dh-opening-kicker-dot" />
            {t.eyebrow}
          </div>
          <h1 className="dh-wordmark">
            Discovery
            <span className="dh-wordmark-sep">·</span>Health
          </h1>
          <p className="dh-opening-sub">{t.sub}</p>
          <div className="dh-opening-story">
            <div className="dh-opening-story-kicker">{t.storyKicker}</div>
            <DhTw text={t.story1} className="dh-opening-story-line" />
            <DhTw text={t.story2} className="dh-opening-story-line dh-opening-story-line-soft" />
          </div>
        </div>

        <div className="dh-opening-console">
          <div className="dh-opening-console-head">
            <span className="dh-opening-console-tag">{t.consoleTag}</span>
            <span className="dh-opening-console-status"><span className="dh-live-dot" /> {t.consoleStatus}</span>
          </div>
          <div className="dh-opening-patient">
            <div className="dh-opening-patient-main">
              <div className="dh-opening-patient-avatar">FA</div>
              <div>
                <div className="dh-opening-patient-name">Fernando Arbache</div>
                <div className="dh-opening-patient-meta">{t.patientMeta}</div>
              </div>
            </div>
            <div className="dh-opening-patient-score">
              <span className="dh-opening-patient-score-k">{t.priorityK}</span>
              <span className="dh-opening-patient-score-v">{t.priorityV}</span>
            </div>
          </div>
          <div className="dh-opening-stream">
            {t.rows.map(([label, value]) => (
              <div className="dh-opening-stream-row" key={label}>
                <span className="dh-opening-stream-label">{label}</span>
                <span className="dh-opening-stream-value">{value}</span>
              </div>
            ))}
          </div>
          <div className="dh-opening-metrics">
            {t.metrics.map(([v, k]) => (
              <div className="dh-opening-metric" key={k}>
                <span className="dh-opening-metric-v">{v}</span>
                <span className="dh-opening-metric-k">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dh-opening-foot">
        {t.pills.map((p) => (
          <span className="dh-foot-pill" key={p}>{p}</span>
        ))}
      </div>
    </section>
  )
}

function RenderS1() {
  const c = captionFor(1)
  const t = S1C[useLang()]
  const [selected, setSelected] = useState<TermoId>('voz')
  const termo = t.termos.find((item) => item.id === selected) ?? t.termos[0]
  return (
    <>
      <Scene index={1} url="health.iconsai.ai/termos">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-termos-shell">
          <div className="dh-termos-list">
            {t.termos.map((item) => {
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
              <span className="dh-termo-panel-kicker">{t.panelKicker}</span>
              <span className={`dh-termo-risk dh-termo-risk-${termo.risco}`}>{termo.risco}</span>
            </div>
            <div className="dh-termo-panel-title">{termo.titulo}</div>
            <p className="dh-termo-panel-copy">{termo.resumo}</p>

            <div className="dh-termo-panel-meta">
              <div><span>{t.metaBase}</span><strong>{termo.base}</strong></div>
              <div><span>{t.metaAceite}</span><strong>{termo.aceite}</strong></div>
              <div><span>{t.metaStatus}</span><strong>{t.statusVal}</strong></div>
            </div>

            <div className="dh-termo-panel-block">
              <div className="dh-termo-panel-label">{t.itemsLabel}</div>
              <div className="dh-termo-sinais">
                {termo.sinais.map((sinal) => (
                  <span key={sinal} className="dh-termo-sinal">{sinal}</span>
                ))}
              </div>
            </div>

            <div className="dh-termo-panel-foot">
              <span className="dh-termo-live-dot" />
              {t.footNote}
            </div>
          </aside>
        </div>
        <div className="dh-btn-row dh-self-end">
          <button className="dh-btn dh-btn-ghost" type="button">{t.btnLater}</button>
          <button className="dh-btn dh-btn-primary" type="button">{t.btnAccept}</button>
        </div>
      </Scene>
      <SceneCaption index={1} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS2() {
  const c = captionFor(2)
  const t = S2C[useLang()]
  return (
    <>
      <Scene index={2} url="health.iconsai.ai/identificacao">
        <StepIndicator current={0} />
        <SectionHeader title={t.title} subtitle={t.subtitle} />
        <div className="dh-prefill-banner">
          <div className="dh-prefill-kicker">{t.prefillKicker}</div>
          <div className="dh-prefill-text">{t.prefillText}</div>
        </div>
        <div className="dh-form-grid">
          <Field label={t.fName} value={t.nameVal} />
          <div className="dh-form-row dh-form-row-2">
            <Field label={t.fAge} value="38" />
            <Field label={t.fGender} value={t.genderVal} chip />
          </div>
          <Field label={t.fId} value={t.idVal} mono />
          <Field label={t.fZip} value={t.zipVal} mono hint={t.zipHint} />
          <div className="dh-form-row dh-form-row-3">
            <Field label={t.fStreet} value={t.streetVal} span={2} />
            <Field label={t.fNumber} value={t.numberVal} />
          </div>
        </div>
      </Scene>
      <SceneCaption index={2} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS3() {
  const c = captionFor(3)
  const t = S3C[useLang()]
  return (
    <>
      <Scene index={3} url="health.iconsai.ai/confirm-identidade">
        <div className="dh-rf-stage">
          <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
          <div className="dh-rf-layout">
            <div className="dh-rf-loader" aria-hidden="true">
              <div className="dh-rf-loader-kicker">{t.loaderKicker}</div>
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
              <div className="dh-rf-loader-label">{t.loaderLabel}</div>
              <div className="dh-rf-loader-steps">
                <span className="dh-rf-step dh-rf-step-1">{t.steps[0]}</span>
                <span className="dh-rf-step dh-rf-step-2">{t.steps[1]}</span>
                <span className="dh-rf-step dh-rf-step-3">{t.steps[2]}</span>
              </div>
            </div>

            <div className="dh-rf-revealed">
              <div className="dh-confirm-card dh-confirm-card-live">
                <div className="dh-confirm-field"><div className="dh-confirm-kicker">{t.nameK}</div><div className="dh-confirm-value">F••••••• A•••••••</div></div>
                <div className="dh-confirm-field"><div className="dh-confirm-kicker">{t.ageK}</div><div className="dh-confirm-value-sm">{t.ageV}</div></div>
                <div className="dh-confirm-field"><div className="dh-confirm-kicker">{t.linkK}</div><div className="dh-confirm-text">{t.linkV}</div></div>
                <div className="dh-confirm-audit">
                  {t.chips.map((ch) => (
                    <span className="dh-confirm-chip" key={ch}>{ch}</span>
                  ))}
                </div>
              </div>
              <div className="dh-confirm-side">
                <div className="dh-confirm-side-kicker">{t.sideKicker}</div>
                {t.sideLines.map((l) => (
                  <div className="dh-confirm-side-line" key={l}><span className="dh-confirm-side-dot" /> {l}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="dh-btn-row">
            <button className="dh-btn dh-btn-primary">{t.btnYes}</button>
            <button className="dh-btn dh-btn-ghost">{t.btnNo}</button>
          </div>
        </div>
      </Scene>
      <SceneCaption index={3} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS4() {
  const c = captionFor(4)
  const t = S4C[useLang()]
  return (
    <>
      <Scene index={4} url="health.iconsai.ai/apresentacao">
        <StepIndicator current={1} />
        <div className="dh-aura-stage">
          <div className="dh-aura-panel">
            <div className="dh-aura-header">
              <div className="dh-aura-avatar">
                <span className="dh-aura-pulse" />
                <span className="dh-aura-pulse dh-aura-pulse-2" />
                <span className="dh-aura-initials">DH</span>
              </div>
              <div className="dh-aura-meta">
                <div className="dh-aura-kicker">{t.kicker}</div>
                <div className="dh-aura-status">{t.status}</div>
              </div>
            </div>
            <div className="dh-aura-script dh-aura-script-live">
              {t.lines.map((ln) => (
                <DhTw key={ln} text={ln} className="dh-aura-line" />
              ))}
            </div>
          </div>
          <aside className="dh-aura-side">
            <div className="dh-aura-side-card">
              <span className="dh-aura-side-kicker">{t.sideKicker1}</span>
              {t.side1.map((l) => (
                <div className="dh-aura-side-line" key={l}>{l}</div>
              ))}
            </div>
            <div className="dh-aura-side-card dh-aura-side-card-soft">
              <span className="dh-aura-side-kicker">{t.sideKicker2}</span>
              <div className="dh-aura-tags">
                {t.chips.map((ch) => (
                  <span className="dh-chip" key={ch}>{ch}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Scene>
      <SceneCaption index={4} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS5() {
  const c = captionFor(5)
  const t = S5C[useLang()]
  return (
    <>
      <Scene index={5} url="health.iconsai.ai/audio-livre">
        <StepIndicator current={1} />
        <SectionHeader title={t.title} subtitle={t.subtitle} />
        <div className="dh-mic-card">
          <div className="dh-mic-ring">
            <div className="dh-mic-pulse" />
            <div className="dh-mic-pulse dh-mic-pulse-2" />
            <svg className="dh-mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          </div>
          <div className="dh-mic-status">{t.status}</div>
          <div className="dh-wave">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="dh-wave-bar" style={{ animationDelay: `${(i % 8) * 0.09}s` }} />
            ))}
          </div>
          <div className="dh-mic-timer">{t.timer}</div>
        </div>
      </Scene>
      <SceneCaption index={5} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS6() {
  const c = captionFor(6)
  const t = S6C[useLang()]
  return (
    <>
      <Scene index={6} url="health.iconsai.ai/aura-pergunta">
        <StepIndicator current={1} />
        <div className="dh-aura-stage dh-aura-stage-compact">
          <div className="dh-aura-panel">
            <div className="dh-aura-header">
              <div className="dh-aura-avatar">
                <span className="dh-aura-pulse" />
                <span className="dh-aura-initials">DH</span>
              </div>
              <div className="dh-aura-meta">
                <div className="dh-aura-kicker">{t.kicker}</div>
                <div className="dh-aura-status">{t.status}</div>
              </div>
            </div>
            <div className="dh-aura-script dh-aura-script-live">
              {t.lines.map((ln) => (
                <DhTw key={ln} text={ln} className="dh-aura-line" />
              ))}
            </div>
            <div className="dh-chips">
              <div className="dh-chips-kicker">{t.chipsKicker}</div>
              <div className="dh-chips-row">
                {t.chips.map((ch) => (
                  <span className="dh-chip" key={ch}>{ch}</span>
                ))}
              </div>
            </div>
          </div>
          <aside className="dh-aura-side">
            <div className="dh-aura-side-card">
              <span className="dh-aura-side-kicker">{t.sideKicker1}</span>
              {t.side1.map((l) => (
                <div className="dh-aura-side-line" key={l}>{l}</div>
              ))}
            </div>
            <div className="dh-aura-side-card dh-aura-side-card-soft">
              <span className="dh-aura-side-kicker">{t.sideKicker2}</span>
              {t.side2.map((l) => (
                <div className="dh-aura-side-line" key={l}>{l}</div>
              ))}
            </div>
          </aside>
        </div>
      </Scene>
      <SceneCaption index={6} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS7() {
  const c = captionFor(7)
  const t = S7C[useLang()]
  return (
    <>
      <Scene index={7} url="health.iconsai.ai/fisiologico">
        <StepIndicator current={2} />
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-vitals-grid">
          {t.vitals.map(([label, value, suffix]) => (
            <Vital key={label} label={label} value={value} suffix={suffix} />
          ))}
        </div>
        <div className="dh-vitals-classification">
          {t.tags.map((tg) => (
            <span className={`dh-tag dh-tag-${tg.tone}`} key={tg.text}>{tg.text}</span>
          ))}
        </div>
        <div className="dh-pain-slider">
          <div className="dh-pain-label">{t.painLabel}</div>
          <div className="dh-pain-track"><span className="dh-pain-thumb" /></div>
          <div className="dh-pain-value">{t.painValue}</div>
        </div>
      </Scene>
      <SceneCaption index={7} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS8() {
  const c = captionFor(8)
  const t = S8C[useLang()]
  return (
    <>
      <Scene index={8} url="health.iconsai.ai/auto-exames">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-autoexam-stage">
          <div className="dh-exames-check-grid">
            {t.exams.map((e) => (
              <ExameCheck key={e.title} pict={e.pict} title={e.title} guia={e.guia} selected={e.selected} />
            ))}
          </div>
          <aside className="dh-autoexam-guide">
            <div className="dh-autoexam-guide-head">
              <span className="dh-autoexam-guide-kicker">{t.guideKicker}</span>
              <span className="dh-autoexam-guide-pill">{t.guidePill}</span>
            </div>
            <div className="dh-autoexam-preview">
              <div className="dh-autoexam-preview-badge">{t.previewBadge}</div>
              <div className="dh-autoexam-preview-ring" />
              <div className="dh-autoexam-preview-core">{t.lesionLabel} <strong>{t.lesion}</strong><span>{t.lesionNote}</span></div>
            </div>
            <div className="dh-autoexam-steps">
              {t.steps.map((s, i) => (
                <div className="dh-autoexam-step" key={s}><span>{i + 1}</span> {s}</div>
              ))}
            </div>
          </aside>
        </div>
      </Scene>
      <SceneCaption index={8} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS9() {
  const c = captionFor(9)
  const t = S9C[useLang()]
  return (
    <>
      <Scene index={9} url="health.iconsai.ai/upload-exames">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-upload-drop">
          <svg className="dh-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <div className="dh-upload-text">{t.dropText}</div>
          <div className="dh-upload-hint">{t.dropHint}</div>
        </div>
        <ul className="dh-upload-list">
          {t.files.map((f) => (
            <li className="dh-upload-item" key={f.name}>
              <div><div className="dh-upload-name">{f.name}</div><div className="dh-upload-meta">{f.meta}</div></div>
              {f.state === 'ok' && <span className="dh-upload-check">✓</span>}
              {f.state === 'loading' && <span className="dh-upload-spinner" />}
              {f.state === 'pending' && <span className="dh-upload-pending">…</span>}
            </li>
          ))}
        </ul>
      </Scene>
      <SceneCaption index={9} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS10() {
  const c = captionFor(10)
  const t = S10C[useLang()]
  return (
    <>
      <Scene index={10} url="health.iconsai.ai/remedios">
        <StepIndicator current={2} />
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-meds-list">
          {t.meds.map((m) => (
            <MedCard key={m.nome} nome={m.nome} classe={m.classe} selected={m.selected} dose={m.dose} freq={m.freq} />
          ))}
        </div>
      </Scene>
      <SceneCaption index={10} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS11() {
  const c = captionFor(11)
  const t = S11C[useLang()]
  return (
    <>
      <Scene index={11} url="health.iconsai.ai/chat">
        <StepIndicator current={2} />
        <div className="dh-chat-layout">
          <div className="dh-chat-main">
            <div className="dh-chat-progress">
              <div className="dh-chat-progress-track"><div className="dh-chat-progress-fill" /></div>
              <div className="dh-chat-progress-pct">{t.pct}</div>
            </div>
            <div className="dh-chat-thread">
              <div className="dh-msg dh-msg-agent">
                <div className="dh-msg-avatar">DH</div>
                <div className="dh-msg-bubble">{t.agent1}</div>
              </div>
              <div className="dh-msg-quote">{t.quote} <strong>&quot;{t.quoteText}&quot;</strong></div>
              <div className="dh-msg dh-msg-user">
                <div className="dh-msg-bubble dh-msg-bubble-user">{t.user1}</div>
              </div>
              <div className="dh-msg dh-msg-agent">
                <div className="dh-msg-avatar">DH</div>
                <div className="dh-msg-bubble">{t.agent2}</div>
              </div>
              <div className="dh-msg dh-msg-typing">
                <span className="dh-msg-avatar">DH</span>
                <div className="dh-msg-dots"><span /><span /><span /></div>
              </div>
            </div>
            <div className="dh-chat-compose">
              <span className="dh-chat-compose-label">{t.typingLabel}</span>
              <div className="dh-chat-compose-box">
                <DhTw text={t.composeLine} className="dh-chat-compose-line" />
              </div>
            </div>
          </div>
          <aside className="dh-chat-side">
            <div className="dh-chat-side-card">
              <span className="dh-chat-side-kicker">{t.sideKicker1}</span>
              {t.side1.map((l) => (
                <div className="dh-chat-side-line" key={l}>{l}</div>
              ))}
            </div>
            <div className="dh-chat-side-card dh-chat-side-card-soft">
              <span className="dh-chat-side-kicker">{t.sideKicker2}</span>
              {t.side2.map((l) => (
                <div className="dh-chat-side-line" key={l}>{l}</div>
              ))}
            </div>
          </aside>
        </div>
      </Scene>
      <SceneCaption index={11} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS12() {
  const c = captionFor(12)
  const t = S12C[useLang()]
  return (
    <>
      <Scene index={12} url="health.iconsai.ai/laudo/Tk-Hf3pK9q">
        <StepIndicator current={3} />
        <div className="dh-laudo-header">
          <div className="dh-laudo-stamp">
            <div className="dh-laudo-stamp-kicker">{t.stampKicker}</div>
            <div className="dh-laudo-stamp-meta">{t.stampMeta}</div>
          </div>
          <div className="dh-laudo-selo">
            <span className="dh-laudo-selo-dot" />
            {t.selo}
          </div>
        </div>
        <div className="dh-laudo-soap">
          {t.soap.map((s) => (
            <SoapCard key={s.letter} letter={s.letter} title={s.title} text={s.text} revealClass={s.reveal} />
          ))}
        </div>
        <div className="dh-gestao-strip">
          <div className="dh-gestao-card">
            <div className="dh-gestao-kicker"><MedIcon name="calendar" size={15} className="dh-gestao-ico" />{t.agendaTitle}</div>
            <div className="dh-mini-cal">
              {t.cal.map((d) => (
                <span key={d.label} className={`dh-cal-day ${d.full ? 'dh-cal-day-full' : 'dh-cal-day-open'}`}>{d.label}</span>
              ))}
            </div>
          </div>
          <div className="dh-gestao-card">
            <div className="dh-gestao-kicker"><MedIcon name="box" size={15} className="dh-gestao-ico" />{t.stockTitle}</div>
            {t.stock.map((s) => (
              <div className="dh-stock-row" key={s.label}>
                <span className="dh-stock-label">{s.label}</span>
                <span className="dh-stock-bar"><span className={`dh-stock-fill ${s.warn ? 'dh-stock-fill-warn' : ''}`} style={{ width: `${parseInt(s.pct, 10)}%` }} /></span>
                <span className="dh-stock-val">{s.pct}</span>
              </div>
            ))}
          </div>
          <div className="dh-gestao-card">
            <div className="dh-gestao-kicker"><MedIcon name="mic" size={15} className="dh-gestao-ico" />{t.audioTitle}</div>
            <div className="dh-audio-mini">
              <button className="dh-audio-play" aria-label="play">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4" /></svg>
              </button>
              <div className="dh-audio-wave">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} className="dh-audio-bar" style={{ animationDelay: `${(i % 7) * 0.08}s` }} />
                ))}
              </div>
              <span className="dh-audio-time">{t.audioTime}</span>
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
  const t = S13C[useLang()]
  return (
    <>
      <Scene index={13} url="health.iconsai.ai/agenda">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-agenda-grid">
          <div className="dh-agenda-row dh-agenda-row-head">
            {t.head.map((h) => (
              <span className="dh-agenda-cell-head" key={h}>{h}</span>
            ))}
          </div>
          {t.rows.map((row) => (
            <div className="dh-agenda-row" key={row.turno}>
              <span className="dh-agenda-cell-head">{row.turno}</span>
              {row.slots.map((s, i) => (
                <span className={`dh-agenda-slot dh-slot-${s.state}`} key={`${row.turno}-${i}`}>{s.label}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="dh-agenda-confirm">
          <span className="dh-agenda-wa">{t.waConfirm}</span>
          <span className="dh-agenda-meta">{t.waMeta}</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={13} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS14() {
  const c = captionFor(14)
  const t = S14C[useLang()]
  return (
    <>
      <Scene index={14} url="health.iconsai.ai/faturamento">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-fat-chart">
          {t.bars.map((b) => (
            <FatBar key={b.label} label={b.label} prev={b.prev} real={b.real} prevK={b.prevK} realK={b.realK} pending={b.pending} />
          ))}
        </div>
        <div className="dh-fat-stats">
          {t.stats.map((s) => (
            <div className="dh-fat-stat" key={s.k}>
              <span className="dh-fat-stat-k">{s.k}</span>
              <span className={`dh-fat-stat-v ${s.tone === 'warn' ? 'dh-fat-warn' : s.tone === 'ok' ? 'dh-fat-ok' : ''}`}>{s.v}</span>
            </div>
          ))}
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={14} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS15() {
  const c = captionFor(15)
  const t = S15C[useLang()]
  return (
    <>
      <Scene index={15} url="health.iconsai.ai/almoxarifado">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-stock-table">
          <div className="dh-stock-th">
            {t.th.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {t.rows.map((r) => (
            <StockRow key={r.item} item={r.item} atual={r.atual} min={r.min} sug={r.sug} status={r.status} />
          ))}
        </div>
        <div className="dh-stock-foot">
          <span className="dh-stock-badge">{t.badge}</span>
          <span className="dh-stock-info">{t.info}</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={15} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS16() {
  const c = captionFor(16)
  const t = S16C[useLang()]
  return (
    <>
      <Scene index={16} url="health.iconsai.ai/farmacia">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-farma-table">
          <div className="dh-farma-th">
            {t.th.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {t.rows.map((r) => (
            <FarmaRow key={r.nome} nome={r.nome} classe={r.classe} lote={r.lote} val={r.val} saldo={r.saldo} warn={r.warn} critical={r.critical} />
          ))}
        </div>
        <div className="dh-farma-foot">
          <span className="dh-farma-badge">{t.badgeWarn}</span>
          <span className="dh-farma-badge dh-farma-badge-ok">{t.badgeOk}</span>
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={16} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS17() {
  const c = captionFor(17)
  const t = S17C[useLang()]
  return (
    <>
      <Scene index={17} url="health.iconsai.ai/cobranca">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-wa-card">
          <div className="dh-wa-header">
            <div className="dh-wa-avatar">DH</div>
            <div className="dh-wa-meta"><div className="dh-wa-name">{t.waName}</div><div className="dh-wa-online">{t.waOnline}</div></div>
          </div>
          <div className="dh-wa-thread">
            <div className="dh-wa-msg">{t.msg1}</div>
            <div className="dh-wa-msg">{t.msg2pre}<strong>{t.msg2val}</strong>{t.msg2pos}</div>
            <div className="dh-wa-pix">
              <span className="dh-wa-pix-icon"><MedIcon name="bolt" size={18} /></span>
              <div className="dh-wa-pix-body">
                <div className="dh-wa-pix-k">{t.payTitle}</div>
                <div className="dh-wa-pix-v">{t.payMeta}</div>
              </div>
              <button className="dh-wa-pix-btn">{t.payBtn}</button>
            </div>
            <div className="dh-wa-msg dh-wa-msg-user">{t.userMsg}</div>
            <div className="dh-wa-msg dh-wa-ok">{t.okMsg}</div>
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
  const t = S18C[useLang()]
  return (
    <>
      <Scene index={18} url="health.iconsai.ai/antifraude">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-fraud-grid">
          <div className="dh-fraud-doc">
            <div className="dh-fraud-doc-kicker">{t.docKicker}</div>
            <div className="dh-fraud-doc-title">{t.docTitle}</div>
            <div className="dh-fraud-doc-row"><span>{t.rEmit}</span><span>{t.emitVal}</span></div>
            <div className="dh-fraud-doc-row"><span>{t.rVal}</span><span className="dh-mono">{t.valVal}</span></div>
            <div className="dh-fraud-doc-row"><span>{t.rDate}</span><span className="dh-mono">{t.dateVal}</span></div>
            <div className="dh-fraud-doc-scan">
              {t.scan.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="dh-fraud-score">
            <div className="dh-fraud-score-kicker">{t.scoreKicker}</div>
            <div className="dh-fraud-score-ring">
              <span className="dh-fraud-score-val">{t.scoreVal}</span>
              <span className="dh-fraud-score-unit">{t.scoreUnit}</span>
            </div>
            <div className="dh-fraud-score-label dh-fraud-score-bad">{t.scoreLabel}</div>
            <div className="dh-fraud-score-copy">{t.scoreCopy}</div>
          </div>
        </div>
        <div className="dh-fraud-trust">
          <div className="dh-fraud-trust-kicker">{t.trustKicker}</div>
          <div className="dh-fraud-trust-row">
            {t.trust.map((tr) => (
              <span className="dh-fraud-trust-chip" key={tr}>{tr}</span>
            ))}
          </div>
        </div>
        <div className="dh-fraud-issues">
          {t.issues.map((iss) => (
            <div className="dh-fraud-issue" key={iss.text}><span className={`dh-fraud-issue-dot dh-fraud-issue-${iss.tone}`} /><span>{iss.text}</span></div>
          ))}
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={18} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS19() {
  const c = captionFor(19)
  const t = S19C[useLang()]
  return (
    <>
      <Scene index={19} url="health.iconsai.ai/nf">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-nf-table">
          <div className="dh-nf-th">
            {t.th.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {t.rows.map((r) => (
            <NfRow key={r.num} num={r.num} cliente={r.cliente} valor={r.valor} data={r.data} status={r.status} okLabel={t.okLabel} pendingLabel={t.pendingLabel} />
          ))}
        </div>
        <div className="dh-nf-foot">
          {t.foot.map((f) => (
            <div className="dh-nf-foot-stat" key={f.k}>
              <span className="dh-nf-foot-k">{f.k}</span>
              <span className={`dh-nf-foot-v ${f.tone === 'warn' ? 'dh-fat-warn' : f.tone === 'ok' ? 'dh-fat-ok' : ''}`}>{f.v}</span>
            </div>
          ))}
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={19} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS20() {
  const c = captionFor(20)
  const t = S20C[useLang()]
  return (
    <>
      <Scene index={20} url="health.iconsai.ai/previsao-receita">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-prev-chart">
          <svg viewBox="0 0 600 220" preserveAspectRatio="none" className="dh-prev-svg">
            <line x1="0" y1="50" x2="600" y2="50" className="dh-prev-grid" />
            <line x1="0" y1="110" x2="600" y2="110" className="dh-prev-grid" />
            <line x1="0" y1="170" x2="600" y2="170" className="dh-prev-grid" />
            {/* F17 — TODO: Replace with GeoJSON-fed chart */}
            <path d="M 0 130 L 50 122 L 100 118 L 150 110 L 200 102 L 250 90 L 300 96 L 350 84 L 400 76 L 450 70 L 500 62 L 550 56 L 600 50 L 600 90 L 550 92 L 500 98 L 450 106 L 400 112 L 350 118 L 300 130 L 250 124 L 200 134 L 150 140 L 100 148 L 50 152 L 0 160 Z" className="dh-prev-band" />
            <path d="M 0 145 L 50 138 L 100 134 L 150 126 L 200 118 L 250 106 L 300 112" className="dh-prev-line dh-prev-line-real" />
            <path d="M 300 112 L 350 100 L 400 92 L 450 86 L 500 78 L 550 72 L 600 64" className="dh-prev-line dh-prev-line-prev" />
            {[0, 50, 100, 150, 200, 250, 300].map((x, i) => (
              <circle key={i} cx={x} cy={[145, 138, 134, 126, 118, 106, 112][i]} r="3" className="dh-prev-dot" />
            ))}
            <line x1="300" y1="20" x2="300" y2="200" className="dh-prev-now" />
            <text x="304" y="32" className="dh-prev-now-label">{t.nowLabel}</text>
          </svg>
          <div className="dh-prev-xaxis">
            {t.months.map((m, i) => (
              <span key={`${m}-${i}`}>{m}</span>
            ))}
          </div>
        </div>
        <div className="dh-prev-stats">
          {t.stats.map((s) => (
            <div className="dh-prev-stat" key={s.k}>
              <span className="dh-prev-stat-k">{s.k}</span>
              <span className={`dh-prev-stat-v ${s.tone === 'ok' ? 'dh-fat-ok' : ''}`}>{s.v}</span>
            </div>
          ))}
        </div>
        <SourcesFooter />
      </Scene>
      <SceneCaption index={20} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS21() {
  const c = captionFor(21)
  const t = S21C[useLang()]
  return (
    <>
      <Scene index={21} url="health.iconsai.ai/diagnostico">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-diag-pipeline">
          <div className="dh-diag-node">
            <div className="dh-diag-node-k">{t.nSymptoms}</div>
            {t.symptoms.map((s) => (
              <div className="dh-diag-chip" key={s}>{s}</div>
            ))}
          </div>
          <span className="dh-diag-arrow">→</span>
          <div className="dh-diag-node">
            <div className="dh-diag-node-k">{t.nCid}</div>
            {t.cids.map((cid) => (
              <div className="dh-diag-cid" key={cid.code}><span>{cid.code}</span><span className={`dh-diag-prob dh-prob-${cid.tone}`}>{cid.prob}</span></div>
            ))}
          </div>
          <span className="dh-diag-arrow">→</span>
          <div className="dh-diag-node">
            <div className="dh-diag-node-k">{t.nPlan}</div>
            {t.plan.map((p) => (
              <div className={`dh-diag-action ${p.warn ? 'dh-diag-action-warn' : ''}`} key={p.text}>{p.text}</div>
            ))}
          </div>
        </div>
        <SourcesFooter variant="medical" />
      </Scene>
      <SceneCaption index={21} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS22() {
  const c = captionFor(22)
  const t = S22C[useLang()]
  return (
    <>
      <Scene index={22} url="health.iconsai.ai/expectativa-vida">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-life-table">
          <div className="dh-life-th">
            {t.th.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {t.rows.map((r) => (
            <LifeRow key={r.nome} nome={r.nome} idade={r.idade} comorb={r.comorb} adesao={r.adesao} score={r.score} level={r.level} />
          ))}
        </div>
        <div className="dh-life-foot">
          <span className="dh-life-badge dh-life-badge-bad">{t.badgeBad}</span>
          <span className="dh-life-badge">{t.badge}</span>
        </div>
        <SourcesFooter variant="medical" />
      </Scene>
      <SceneCaption index={22} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS23() {
  const c = captionFor(23)
  const t = S23C[useLang()]
  return (
    <>
      <Scene index={23} url="health.iconsai.ai/navegacao">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-flow">
          <svg viewBox="0 0 640 220" className="dh-flow-svg" preserveAspectRatio="xMidYMid meet">
            <path d="M 90 110 C 160 60, 220 60, 290 60" className="dh-flow-edge dh-flow-edge-a" />
            <path d="M 90 110 C 160 160, 220 160, 290 160" className="dh-flow-edge dh-flow-edge-b" />
            <path d="M 350 60 L 510 60" className="dh-flow-edge dh-flow-edge-a" />
            <path d="M 350 160 L 510 160" className="dh-flow-edge dh-flow-edge-b" />
            <text x="180" y="78" className="dh-flow-edge-label">{t.edgeA}</text>
            <text x="180" y="190" className="dh-flow-edge-label">{t.edgeB}</text>
            <text x="410" y="50" className="dh-flow-edge-label">{t.recovery}</text>
            <text x="410" y="180" className="dh-flow-edge-label">{t.recovery}</text>
            <g>
              <circle cx="60" cy="110" r="28" className="dh-flow-node" />
              <text x="60" y="105" className="dh-flow-node-t">{t.nTriagem}</text>
              <text x="60" y="120" className="dh-flow-node-s">{t.nTriagemSub}</text>
            </g>
            <g>
              <circle cx="320" cy="60" r="28" className="dh-flow-node dh-flow-node-a" />
              <text x="320" y="55" className="dh-flow-node-t">{t.nTratoA}</text>
              <text x="320" y="70" className="dh-flow-node-s">{t.nTratoASub}</text>
            </g>
            <g>
              <circle cx="320" cy="160" r="28" className="dh-flow-node dh-flow-node-b" />
              <text x="320" y="155" className="dh-flow-node-t">{t.nTratoB}</text>
              <text x="320" y="170" className="dh-flow-node-s">{t.nTratoBSub}</text>
            </g>
            <g>
              <circle cx="540" cy="60" r="28" className="dh-flow-node dh-flow-node-out" />
              <text x="540" y="55" className="dh-flow-node-t">{t.nAlta}</text>
              <text x="540" y="70" className="dh-flow-node-s">67%</text>
            </g>
            <g>
              <circle cx="540" cy="160" r="28" className="dh-flow-node dh-flow-node-out" />
              <text x="540" y="155" className="dh-flow-node-t">{t.nAlta}</text>
              <text x="540" y="170" className="dh-flow-node-s">89%</text>
            </g>
          </svg>
        </div>
        <div className="dh-flow-legend">
          <span className="dh-flow-leg dh-flow-leg-a">{t.legA}</span>
          <span className="dh-flow-leg dh-flow-leg-b">{t.legB}</span>
        </div>
        <SourcesFooter variant="medical" />
      </Scene>
      <SceneCaption index={23} title={c.title} desc={c.desc} />
    </>
  )
}

function RenderS24() {
  const c = captionFor(24)
  const t = S24C[useLang()]
  return (
    <>
      <Scene index={24} url="health.iconsai.ai/combinacao-tratamentos">
        <SectionHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
        <div className="dh-matrix">
          <div className="dh-matrix-row dh-matrix-row-head">
            <span className="dh-matrix-corner">{t.corner}</span>
            {t.cols.map((col) => (
              <span className="dh-matrix-h" key={col}>{col}</span>
            ))}
          </div>
          {t.rows.map((row) => (
            <MatrixRow tratamento={row.tratamento} key={row.tratamento}>
              {row.cells.map((cell, i) => (
                <MatrixCell key={`${row.tratamento}-${i}`} prob={cell.prob} ic={cell.ic} tone={cell.tone} />
              ))}
            </MatrixRow>
          ))}
        </div>
        <SourcesFooter variant="medical" strong />
      </Scene>
      <SceneCaption index={24} title={c.title} desc={c.desc} />
    </>
  )
}

/* ═════════════════════════════════════════════════════════════════════
   FECHO — "Obrigado." canónico (§6.12)
   ═════════════════════════════════════════════════════════════════════ */
function RenderFecho() {
  const f = FECHO[useLang()]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
        {f.thanks}
      </h2>
      <a className="logo-foot" href="https://iconsai.ai" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.4rem' }}>
        <span className="logo-i">i</span>
        <span className="logo-cons">cons</span>
        <span className="logo-ai">.ai</span>
      </a>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem', letterSpacing: '.06em', color: 'var(--gray)' }}>
        iconsai.ai
      </span>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '.92rem', color: 'var(--gray)', maxWidth: '36ch', lineHeight: 1.5, marginTop: '.4rem' }}>
        {f.tagline}
      </p>
    </div>
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
  RenderFecho,
]

const SLIDES: SlideDef[] = DH_NAV.map((sc, i) => {
  const Renderer = RENDERERS[i]
  return {
    id: sc.step,
    label: sc.label,
    render: () => <Renderer />,
  }
})

export function Showcase() {
  return (
    <SlideEngine
      slides={SLIDES}
      projectName="DiscoveryHealth"
      kicker="Medicina inteligente · Clinical OS"
    />
  )
}
