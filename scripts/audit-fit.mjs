/**
 * audit-fit.mjs — gate de cabimento (skill /showcase §6.7). BLOQUEIA deploy.
 * Mede CADA slide × 6 viewports no build servido: cut, fillArea, scale, minFont.
 * Env: URL (obrigatório apontar pro build de produção servido), LOCALES (opcional).
 * Exit 1 se qualquer gate falhar.
 */
import { chromium } from 'playwright-core'

const URL = process.env.URL || 'http://localhost:3103/discoveryhealth'
const LOCALES = (process.env.LOCALES || '').split(',').filter(Boolean) // vazio = locale default
const EXE = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const VIEWPORTS = [
  { w: 1440, h: 800, kind: 'desktop' }, { w: 1280, h: 620, kind: 'desktop' }, { w: 1280, h: 560, kind: 'desktop' },
  { w: 390, h: 844, kind: 'mobile' }, { w: 390, h: 740, kind: 'mobile' }, { w: 390, h: 667, kind: 'mobile' },
]
const GATE = { cut: 2, fillDesktop: 0.75, fillMobile: 0.70, scale: 0.70, minFontPx: 8 }

// Roda DENTRO da página, no slide ativo. Mede contra .slide-stage (palco + moldura).
const measure = () => {
  const slide = document.querySelector('.slide[data-active="true"]')
  if (!slide) return null
  const stage = slide.querySelector('.slide-stage')
  const content = slide.querySelector('.slide-content')
  if (!stage || !content) return null
  const cs = getComputedStyle(stage)
  const s = stage.getBoundingClientRect()
  const r = content.getBoundingClientRect()
  const availW = s.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
  const availH = s.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)

  // Corte: conteúdo invadindo faixas ou moldura
  const cutTop = Math.max(0, (s.top + parseFloat(cs.paddingTop)) - r.top)
  const cutBot = Math.max(0, r.bottom - (s.bottom - parseFloat(cs.paddingBottom)))
  const cut = Math.max(cutTop, cutBot)

  // Fill por ÁREA (rect já reflete o scale aplicado = o que é visível)
  const fillArea = (r.width * r.height) / (availW * availH)

  // Scale aplicado pelo SlideFrame (matrix(a, ...) → a)
  const t = getComputedStyle(content).transform
  const scale = t && t !== 'none' ? parseFloat(t.split('(')[1]) : 1

  // Menor font-size de texto visível dentro do slide (exclui chrome — está fora do .slide)
  let minFont = Infinity
  for (const el of slide.querySelectorAll('*')) {
    if (!el.textContent || !el.textContent.trim()) continue
    const ecs = getComputedStyle(el)
    if (ecs.display === 'none' || ecs.visibility === 'hidden' || parseFloat(ecs.opacity) === 0) continue
    const hasOwnText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    if (!hasOwnText) continue
    minFont = Math.min(minFont, parseFloat(ecs.fontSize))
  }
  if (!isFinite(minFont)) minFont = 999

  return {
    cut: Math.round(cut * 10) / 10,
    fillArea: Math.round(fillArea * 100) / 100,
    scale: Math.round(scale * 100) / 100,
    minFont: Math.round(minFont * 10) / 10,
  }
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true })
  const failures = []
  const targets = LOCALES.length ? LOCALES : [null]
  for (const locale of targets) {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } })
      await page.goto(URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(600)
      if (locale) { // troca o idioma via seletor do dock (rótulos BR/PT/EN — §8.2)
        const label = { 'pt-BR': 'BR', 'pt-PT': 'PT', en: 'EN' }[locale]
        if (label) await page.getByRole('button', { name: label, exact: true }).click().catch(() => {})
        await page.waitForTimeout(300)
      }
      const total = await page.$$eval('.slide', (n) => n.length)
      const fillGate = vp.kind === 'mobile' ? GATE.fillMobile : GATE.fillDesktop
      const rows = []
      for (let i = 0; i < total; i++) {
        await page.waitForTimeout(700)
        const m = await page.evaluate(measure)
        const id = `${locale || 'default'} ${vp.w}x${vp.h} slide ${String(i + 1).padStart(2, '0')}`
        if (!m) { failures.push(`${id}: MEASURE FAILED (hierarquia §6.2.4 ausente?)`) }
        else {
          rows.push(`${String(i + 1).padStart(2, '0')} cut=${m.cut} fill=${m.fillArea} scale=${m.scale} minFont=${m.minFont}`)
          if (m.cut > GATE.cut) failures.push(`${id}: CUT ${m.cut}px (gate ≤ ${GATE.cut}px)`)
          if (m.fillArea <= fillGate) failures.push(`${id}: FILL ${m.fillArea} (gate > ${fillGate})`)
          if (m.scale < GATE.scale) failures.push(`${id}: SCALE ${m.scale} (gate ≥ ${GATE.scale})`)
          if (m.minFont * m.scale < GATE.minFontPx) failures.push(`${id}: MINFONT ${m.minFont}×${m.scale} < ${GATE.minFontPx}px`)
        }
        await page.keyboard.press('ArrowRight')
      }
      console.log(`\n=== ${locale || 'default'} · ${vp.w}x${vp.h} (${vp.kind}, fill > ${fillGate}) ===`)
      rows.forEach((r) => console.log('  ' + r))
      await page.close()
    }
  }
  await browser.close()
  if (failures.length) {
    console.log(`\n❌ AUDIT-FIT: ${failures.length} FALHA(S) — deploy BLOQUEADO`)
    failures.forEach((f) => console.log('  · ' + f))
    process.exit(1)
  }
  console.log('\n✅ AUDIT-FIT: todos os gates passaram')
  process.exit(0)
}
run().catch((e) => { console.error(e); process.exit(2) })
