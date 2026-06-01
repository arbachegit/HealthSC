/**
 * MedIcon — ícones SVG inline (skill /showcase §6.0: ZERO emoji, sempre ícone SVG).
 * Substitui os pictogramas emoji dos auto-exames (S8), dos títulos de gestão (S12),
 * do bloco de pagamento (S17) e dos badges de alerta. Stroke consistente, currentColor.
 */
import { type CSSProperties } from 'react'

export type MedIconKey =
  | 'breast' | 'prostate' | 'skin' | 'tongue' | 'pulse' | 'lung' | 'mouth' | 'testicle'
  | 'calendar' | 'box' | 'mic' | 'bolt' | 'warning'

const P: Record<MedIconKey, React.ReactNode> = {
  // ── auto-exames (S8) ──
  breast: <><circle cx="12" cy="13" r="6" /><circle cx="12" cy="13" r="1.4" /><path d="M12 7V4" /></>,
  prostate: <><circle cx="12" cy="14" r="5" /><path d="M12 9V3M9 5l3-2 3 2" /></>,
  skin: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 10.5l2.2 2.6 2-1.8 2 3" /><circle cx="14.5" cy="9" r="1" /></>,
  tongue: <><path d="M6 6h12v4a6 6 0 0 1-12 0V6Z" /><path d="M12 10v6" /></>,
  pulse: <><path d="M3 12h4l2-5 3 10 2-7 1 2h6" /></>,
  lung: <><path d="M12 3v9" /><path d="M12 8c-1 4-1 6-3 8-2 1-3 0-3-3 0-3 1-6 3-7 2-1 3 0 3 2Z" /><path d="M12 8c1 4 1 6 3 8 2 1 3 0 3-3 0-3-1-6-3-7-2-1-3 0-3 2Z" /></>,
  mouth: <><path d="M4 10c3-3 13-3 16 0" /><path d="M4 10c2 5 14 5 16 0" /><path d="M8 11.5l1 2M12 12v2M16 11.5l-1 2" /></>,
  testicle: <><circle cx="12" cy="14" r="5" /><path d="M12 9V3" /></>,
  // ── títulos de gestão (S12) ──
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
  box: <><path d="M3 7l9-4 9 4v10l-9 4-9-4V7Z" /><path d="M3 7l9 4 9-4M12 11v10" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  // ── alertas / pagamento ──
  bolt: <><polygon points="13 2 4 14 11 14 9 22 20 10 13 10 13 2" /></>,
  warning: <><path d="M12 3 1.5 21h21L12 3Z" /><path d="M12 9v5M12 17.5v.5" /></>,
}

export function MedIcon({
  name, size = 28, className, style,
}: { name: MedIconKey; size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24" width={size} height={size} className={className}
      style={style} fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      {P[name]}
    </svg>
  )
}
