import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Libre_Baskerville, JetBrains_Mono, Fraunces } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-libre',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'DiscoveryHealth',
  description: 'Anamnese guiada, auto-exames, triagem clínica, gestão financeira e antifraude num único fluxo.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${baskerville.variable} ${mono.variable} ${fraunces.variable}`}
    >
      <body className="theme-light">{children}</body>
    </html>
  )
}
