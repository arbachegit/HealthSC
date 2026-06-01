import { chromium } from 'playwright-core'
const EXE='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL='http://localhost:3103/discoveryhealth'
const b=await chromium.launch({executablePath:EXE,headless:true})
const goto=async(p,t)=>{let g=0;while(g++<40){const i=await p.evaluate(()=>Math.round(document.querySelector('.deck').scrollLeft/innerWidth));if(i===t-1)break;await p.keyboard.press('ArrowRight');await p.waitForTimeout(400)}await p.waitForTimeout(450)}
const p=await b.newPage({viewport:{width:1440,height:800}})
await p.goto(URL,{waitUntil:'networkidle'});await p.waitForTimeout(700)
await p.screenshot({path:'/tmp/dh-gray-opening.png'})
await goto(p,9); await p.screenshot({path:'/tmp/dh-gray-s9.png'})
await goto(p,15); await p.screenshot({path:'/tmp/dh-gray-s15.png'})
console.log('body bg:', await p.evaluate(()=>getComputedStyle(document.body).backgroundColor))
console.log('logo-cons color:', await p.evaluate(()=>getComputedStyle(document.querySelector('.logo-cons')).color))
await b.close()
