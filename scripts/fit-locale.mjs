import { chromium } from 'playwright-core'
const URL = 'http://localhost:3103/discoveryhealth'
const EXE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const VIEWPORTS = [{w:1440,h:800},{w:1280,h:620},{w:1280,h:560},{w:390,h:844},{w:390,h:740},{w:390,h:667}]
const LANG = process.env.LANGBTN || 'BR'
const measure = () => {
  const slide = document.querySelector('.slide[data-active="true"]') || document.querySelectorAll('.slide')[Math.round(document.querySelector('.deck').scrollLeft/window.innerWidth)]
  if(!slide) return null
  const band=slide.querySelector('.slide-band'), fit=slide.querySelector('.slide-fit'); if(!band||!fit) return null
  const cs=getComputedStyle(band), padT=parseFloat(cs.paddingTop), padB=parseFloat(cs.paddingBottom)
  const b=band.getBoundingClientRect(), r=fit.getBoundingClientRect(), avail=b.height-padT-padB
  return { cut: Math.round(Math.max((b.top+padT)-r.top, r.bottom-(b.bottom-padB))*10)/10, fill: Math.round(r.height/avail*100)/100 }
}
const b = await chromium.launch({executablePath:EXE,headless:true})
let worst=-Infinity; const weak=[]
for(const vp of VIEWPORTS){
  const p=await b.newPage({viewport:{width:vp.w,height:vp.h}})
  await p.goto(URL,{waitUntil:'networkidle'}); await p.waitForTimeout(500)
  await p.click(`.lang-btn >> text=${LANG}`); await p.waitForTimeout(400)
  const total=await p.$$eval('.slide',n=>n.length)
  for(let i=0;i<total;i++){
    await p.waitForTimeout(380)
    const m=await p.evaluate(measure)
    if(m){ if(m.cut>worst)worst=m.cut; if(m.cut>2)console.log(`  ❌ ${LANG} ${vp.w}x${vp.h} slide ${i+1}: cut ${m.cut}`); if(m.fill<0.65)weak.push(`${LANG} ${vp.w}x${vp.h} s${i+1} fill ${m.fill}`)}
    await p.keyboard.press('ArrowRight')
  }
  await p.close()
}
await b.close()
console.log(`[${LANG}] worst cut = ${worst.toFixed(1)}px ${worst>2?'FAIL':'OK'}; palco-fraco: ${weak.length}`)
process.exit(worst>2?1:0)
