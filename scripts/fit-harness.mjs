/**
 * Harness de cabimento (skill /showcase §6.5).
 * Mede CADA slide × {viewports} no build servido: cut (corte) e fill (uso do palco).
 * Gate: cut > 2px em qualquer slide/viewport = FALHA. fill < 0.65 = dívida (lista).
 */
import { chromium } from 'playwright-core'

const URL = process.env.URL || 'http://localhost:3103/discoveryhealth'
const VIEWPORTS = [
  { w: 1440, h: 800 }, { w: 1280, h: 620 }, { w: 1280, h: 560 },
  { w: 390, h: 844 }, { w: 390, h: 740 }, { w: 390, h: 667 },
]

const EXE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const measure = () => {
  const slide = document.querySelector('.slide[data-active="true"]') ||
    document.querySelectorAll('.slide')[Math.round(document.querySelector('.deck').scrollLeft / window.innerWidth)]
  if (!slide) return null
  const band = slide.querySelector('.slide-band')
  const fit = slide.querySelector('.slide-fit')
  if (!band || !fit) return null
  const cs = getComputedStyle(band)
  const padT = parseFloat(cs.paddingTop), padB = parseFloat(cs.paddingBottom)
  const b = band.getBoundingClientRect(), r = fit.getBoundingClientRect()
  const avail = b.height - padT - padB
  const cut = Math.max((b.top + padT) - r.top, r.bottom - (b.bottom - padB))
  const fill = r.height / avail
  return { cut: Math.round(cut * 10) / 10, fill: Math.round(fill * 100) / 100 }
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true })
  let worstCut = -Infinity
  const weak = []
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const total = await page.$$eval('.slide', (n) => n.length)
    const row = []
    for (let i = 0; i < total; i++) {
      await page.waitForTimeout(450)
      const m = await page.evaluate(measure)
      const tag = m ? `${i + 1}:cut=${m.cut}|fill=${m.fill}` : `${i + 1}:NA`
      row.push(tag)
      if (m) {
        if (m.cut > worstCut) worstCut = m.cut
        if (m.cut > 2) console.log(`  ❌ CUT ${vp.w}x${vp.h} slide ${i + 1}: ${m.cut}px`)
        if (m.fill < 0.65) weak.push(`${vp.w}x${vp.h} slide ${i + 1}: fill ${m.fill}`)
      }
      await page.keyboard.press('ArrowRight')
    }
    console.log(`\n${vp.w}x${vp.h}:`)
    console.log('  ' + row.join('  '))
    await page.close()
  }
  await browser.close()
  console.log(`\n=== worst cut = ${worstCut.toFixed(1)}px (gate: <=2px) ===`)
  if (weak.length) {
    console.log(`=== dívida de palco-fraco (fill<0.65), ${weak.length} casos ===`)
    weak.slice(0, 20).forEach((w) => console.log('  · ' + w))
  }
  process.exit(worstCut > 2 ? 1 : 0)
}
run().catch((e) => { console.error(e); process.exit(2) })
