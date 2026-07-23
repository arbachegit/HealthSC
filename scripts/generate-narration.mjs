/**
 * Pré-geração de narração (skill /showcase §8.4) — etapa de áudio.
 * Lê os guiões §8.1 e gera mp3 por slide/idioma via OpenAI gpt-4o-mini-tts.
 * Runtime = mp3 estático em public/narration/<lang>/slide-NN.mp3.
 *
 * Uso:  OPENAI_API_KEY=... node scripts/generate-narration.mjs
 * NUNCA commitar a key (§8.4) — vem só do ambiente.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { NARRATION as BR } from '../narration/script.pt-BR.ts'
import { NARRATION as PT } from '../narration/script.pt-PT.ts'
import { NARRATION as EN } from '../narration/script.en.ts'
import { NARRATION as ES } from '../narration/script.es.ts'

const KEY = process.env.OPENAI_API_KEY
if (!KEY) { console.error('Falta OPENAI_API_KEY no ambiente.'); process.exit(1) }

const VOICE = process.env.TTS_VOICE || 'coral'
const DECKS = [
  { lang: 'pt-BR', map: BR, dir: 'voz: português do Brasil, jovem-adulta, calorosa e próxima' },
  { lang: 'pt-PT', map: PT, dir: 'voz: português de Portugal, jovem-adulta, calorosa e próxima' },
  { lang: 'en', map: EN, dir: 'voice: American English, young adult, warm and close' },
  { lang: 'es', map: ES, dir: 'voz: espanhol neutro, jovem-adulta, calorosa e próxima' },
]
const instructions = (dir) =>
  `${dir}. Personalidade: apresentador humano entusiasmado mas natural, como quem ` +
  `conversa com um amigo — nunca locutor de telejornal. Ritmo variável, entoação ` +
  `rica, ênfase nas palavras-chave, pausas naturais. Não soar robótico nem comercial.`

for (const { lang, map, dir } of DECKS) {
  const out = `public/narration/${lang}`
  await mkdir(out, { recursive: true })
  for (const [num, text] of Object.entries(map)) {
    const nn = String(num).padStart(2, '0')
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts',
        voice: VOICE,
        input: text,
        instructions: instructions(dir),
        response_format: 'mp3',
      }),
    })
    if (!res.ok) { console.error(`${lang} slide ${nn}: HTTP ${res.status}`); continue }
    await writeFile(`${out}/slide-${nn}.mp3`, Buffer.from(await res.arrayBuffer()))
    console.log(`✓ ${lang}/slide-${nn}.mp3`)
  }
}
console.log('Narração gerada. Servida em /narration/<lang>/slide-NN.mp3 (basePath aplicado pelo SlideEngine).')
