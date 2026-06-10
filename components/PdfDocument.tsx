"use client";

/**
 * PdfDocument — documento PDF do DiscoveryHealth, renderizado SO na impressao.
 * Zero dependencias: usa @media print (globals.css) para esconder o deck e revelar
 * este documento, que o browser salva como PDF. Conteudo no idioma ativo.
 *
 * 7 paginas: Capa + Indice + Clinico + Operacional + Inteligencia + Impacto + Fecho
 */
import { useLang } from "@/app/SlideEngine";
import type { LangId } from "./langs";

/* ═══ Wordmark logo icons.ai (§18.1) ═══ */
function WM({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`pdf-wm${dark ? " on-dark" : ""}`}>
      <span className="i">i</span>
      <span className="c">cons</span>
      <span className="a">.ai</span>
    </span>
  );
}

/* ═══ Strings localizadas do documento ═══ */
const DOC: Record<LangId, {
  type: string; overview: string; modules: string; flow: string;
  clinical: string; operational: string; closing: string;
  page: string; confidential: string; toc: string;
  intelligence: string; impact: string;
  tocCover: string; tocClinical: string; tocOperational: string;
  tocIntelligence: string; tocImpact: string; tocClosing: string;
}> = {
  "pt-BR": {
    type: "PROPOSTA COMERCIAL",
    overview: "Visao geral",
    modules: "Modulos do fluxo",
    flow: "Jornada do paciente",
    clinical: "Fluxo clinico",
    operational: "Fluxo operacional",
    closing: "Confianca & alcance",
    page: "pag.",
    confidential: "Documento confidencial — distribuicao restrita. © 2026 IconsAI.",
    toc: "Indice",
    intelligence: "Inteligencia clinica",
    impact: "Impacto & metricas",
    tocCover: "Capa",
    tocClinical: "Jornada clinica — 12 passos orquestrados pela Aura",
    tocOperational: "Jornada operacional — da agenda a nota fiscal",
    tocIntelligence: "Inteligencia clinica — laudo SOAP, vitais e CID-10",
    tocImpact: "Impacto & metricas — KPIs, antifraude e receita",
    tocClosing: "Confianca & alcance",
  },
  "pt-PT": {
    type: "PROPOSTA COMERCIAL",
    overview: "Sintese",
    modules: "Modulos do fluxo",
    flow: "Percurso do doente",
    clinical: "Fluxo clinico",
    operational: "Fluxo operacional",
    closing: "Confianca & alcance",
    page: "pag.",
    confidential: "Documento confidencial — distribuicao restrita. © 2026 IconsAI.",
    toc: "Indice",
    intelligence: "Inteligencia clinica",
    impact: "Impacto & metricas",
    tocCover: "Capa",
    tocClinical: "Jornada clinica — 12 passos orquestrados pela Aura",
    tocOperational: "Jornada operacional — da agenda a fatura",
    tocIntelligence: "Inteligencia clinica — laudo SOAP, vitais e CID-10",
    tocImpact: "Impacto & metricas — KPIs, antifraude e receita",
    tocClosing: "Confianca & alcance",
  },
  en: {
    type: "COMMERCIAL PROPOSAL",
    overview: "Overview",
    modules: "Workflow modules",
    flow: "Patient journey",
    clinical: "Clinical workflow",
    operational: "Operational workflow",
    closing: "Trust & reach",
    page: "page",
    confidential: "Confidential document — restricted distribution. © 2026 IconsAI.",
    toc: "Contents",
    intelligence: "Clinical intelligence",
    impact: "Impact & metrics",
    tocCover: "Cover",
    tocClinical: "Clinical journey — 12 steps orchestrated by Aura",
    tocOperational: "Operational journey — from scheduling to invoicing",
    tocIntelligence: "Clinical intelligence — SOAP report, vitals & ICD-10",
    tocImpact: "Impact & metrics — KPIs, anti-fraud & revenue",
    tocClosing: "Trust & reach",
  },
};

const CLINICAL = {
  "pt-BR": [
    { n: "01", label: "Termos LGPD" },
    { n: "02", label: "Identificacao do paciente" },
    { n: "03", label: "Confirmacao de dados" },
    { n: "04", label: "Aura — medica virtual" },
    { n: "05", label: "Audio livre" },
    { n: "06", label: "Perguntas da Aura" },
    { n: "07", label: "Dados fisiologicos" },
    { n: "08", label: "Auto-exames orientados" },
    { n: "09", label: "Upload de exames" },
    { n: "10", label: "Medicacao RAG" },
    { n: "11", label: "Chat de anamnese" },
    { n: "12", label: "Laudo SOAP + CID-10" },
  ],
  "pt-PT": [
    { n: "01", label: "Termos RGPD" },
    { n: "02", label: "Identificacao do doente" },
    { n: "03", label: "Confirmacao de dados" },
    { n: "04", label: "Aura — medica virtual" },
    { n: "05", label: "Audio livre" },
    { n: "06", label: "Perguntas da Aura" },
    { n: "07", label: "Dados fisiologicos" },
    { n: "08", label: "Auto-exames orientados" },
    { n: "09", label: "Upload de exames" },
    { n: "10", label: "Medicacao RAG" },
    { n: "11", label: "Chat de anamnese" },
    { n: "12", label: "Laudo SOAP + CID-10" },
  ],
  en: [
    { n: "01", label: "HIPAA consent" },
    { n: "02", label: "Patient identification" },
    { n: "03", label: "Data confirmation" },
    { n: "04", label: "Aura — virtual physician" },
    { n: "05", label: "Free audio" },
    { n: "06", label: "Aura questions" },
    { n: "07", label: "Physiological data" },
    { n: "08", label: "Guided self-exams" },
    { n: "09", label: "Exam upload" },
    { n: "10", label: "Medication RAG" },
    { n: "11", label: "Anamnesis chat" },
    { n: "12", label: "SOAP report + ICD-10" },
  ],
} satisfies Record<LangId, Array<{ n: string; label: string }>>;

const OPERATIONAL = {
  "pt-BR": [
    { n: "13", label: "Gestao de agenda" },
    { n: "14", label: "Faturamento" },
    { n: "15", label: "Almoxarifado" },
    { n: "16", label: "Farmacia · SNGPC" },
    { n: "17", label: "Cobranca PIX" },
    { n: "18", label: "Score antifraude" },
    { n: "19", label: "NF automatica" },
    { n: "20", label: "Previsao de receita" },
    { n: "21", label: "Diagnostico CID" },
    { n: "22", label: "Expectativa de vida" },
    { n: "23", label: "Navegacao do paciente" },
    { n: "24", label: "Combinacao de tratamentos" },
  ],
  "pt-PT": [
    { n: "13", label: "Gestao de agenda" },
    { n: "14", label: "Faturacao" },
    { n: "15", label: "Stock" },
    { n: "16", label: "Farmacia · INFARMED" },
    { n: "17", label: "Cobranca MB WAY" },
    { n: "18", label: "Score antifraude" },
    { n: "19", label: "e-Fatura automatica" },
    { n: "20", label: "Previsao de receita" },
    { n: "21", label: "Diagnostico CID" },
    { n: "22", label: "Esperanca de vida" },
    { n: "23", label: "Navegacao do doente" },
    { n: "24", label: "Combinacao de tratamentos" },
  ],
  en: [
    { n: "13", label: "Schedule management" },
    { n: "14", label: "Billing" },
    { n: "15", label: "Inventory" },
    { n: "16", label: "Pharmacy · DEA" },
    { n: "17", label: "Zelle collection" },
    { n: "18", label: "Anti-fraud scoring" },
    { n: "19", label: "Auto e-invoice" },
    { n: "20", label: "Revenue forecast" },
    { n: "21", label: "ICD diagnosis" },
    { n: "22", label: "Life expectancy" },
    { n: "23", label: "Patient navigation" },
    { n: "24", label: "Treatment combinations" },
  ],
} satisfies Record<LangId, Array<{ n: string; label: string }>>;

/* ═══ SOAP data (from content.ts S12) ═══ */
const SOAP: Record<LangId, { letter: string; title: string; text: string }[]> = {
  "pt-BR": [
    { letter: "S", title: "Subjetivo", text: "Cefaleia pulsatil ha 3 dias, piora a tarde, sensibilidade a luz. Dor 6/10." },
    { letter: "O", title: "Objetivo", text: "PA 128/82 · FC 74 · IMC 23.5 · hemograma normal · auto-relato 6/10." },
    { letter: "A", title: "Avaliacao", text: "Cefaleia tensional + fadiga visual digital. DD: enxaqueca sem aura." },
    { letter: "P", title: "Plano", text: "Higiene visual (20-20-20). Reavaliar PA em 7 dias. Encaminhar se persistir." },
  ],
  "pt-PT": [
    { letter: "S", title: "Subjetivo", text: "Cefaleia pulsatil ha 3 dias, piora a tarde, sensibilidade a luz. Dor 6/10." },
    { letter: "O", title: "Objetivo", text: "TA 128/82 · FC 74 · IMC 23.5 · hemograma normal · autorrelato 6/10." },
    { letter: "A", title: "Avaliacao", text: "Cefaleia de tensao + fadiga visual digital. DD: enxaqueca sem aura." },
    { letter: "P", title: "Plano", text: "Higiene visual (20-20-20). Reavaliar TA em 7 dias. Encaminhar se persistir." },
  ],
  en: [
    { letter: "S", title: "Subjective", text: "Pulsating headache for 3 days, worse in the afternoon, light sensitivity. Pain 6/10." },
    { letter: "O", title: "Objective", text: "BP 128/82 · HR 74 · BMI 23.5 · normal CBC · self-report 6/10." },
    { letter: "A", title: "Assessment", text: "Tension headache + digital eye strain. DDx: migraine without aura." },
    { letter: "P", title: "Plan", text: "Visual hygiene (20-20-20). Recheck BP in 7 days. Refer if it persists." },
  ],
};

/* ═══ Vitals data (from content.ts S7) ═══ */
const VITALS: Record<LangId, [string, string, string][]> = {
  "pt-BR": [["Peso", "72", "kg"], ["Altura", "175", "cm"], ["PA", "128/82", "mmHg"], ["FC", "74", "bpm"], ["Glicemia", "94", "mg/dL"], ["IMC", "23.5", ""]],
  "pt-PT": [["Peso", "72", "kg"], ["Altura", "175", "cm"], ["TA", "128/82", "mmHg"], ["FC", "74", "bpm"], ["Glicemia", "94", "mg/dL"], ["IMC", "23.5", ""]],
  en: [["Weight", "159", "lb"], ["Height", "5'9\"", ""], ["BP", "128/82", "mmHg"], ["HR", "74", "bpm"], ["Glucose", "94", "mg/dL"], ["BMI", "23.5", ""]],
};

/* ═══ CID/ICD data (from content.ts S21) ═══ */
const CIDS: Record<LangId, { code: string; prob: string }[]> = {
  "pt-BR": [
    { code: "G44.2 · Cefaleia tensional", prob: "72%" },
    { code: "G43.0 · Enxaqueca s/ aura", prob: "19%" },
    { code: "H53.5 · Fadiga visual", prob: "6%" },
  ],
  "pt-PT": [
    { code: "G44.2 · Cefaleia de tensao", prob: "72%" },
    { code: "G43.0 · Enxaqueca s/ aura", prob: "19%" },
    { code: "H53.5 · Fadiga visual", prob: "6%" },
  ],
  en: [
    { code: "G44.2 · Tension headache", prob: "72%" },
    { code: "G43.0 · Migraine w/o aura", prob: "19%" },
    { code: "H53.5 · Eye strain", prob: "6%" },
  ],
};

/* ═══ Impact/KPI data (from content.ts S14, S18, S20) ═══ */
const IMPACT: Record<LangId, {
  kpiTitle: string; fraudTitle: string; revenueTitle: string;
  kpis: { k: string; v: string }[];
  fraudScore: string; fraudLabel: string; fraudCopy: string;
  revenue: string; revenueCagr: string; revenueCi: string;
}> = {
  "pt-BR": {
    kpiTitle: "KPIs operacionais",
    fraudTitle: "Antifraude · IA forense",
    revenueTitle: "Previsao de receita",
    kpis: [
      { k: "Modulos integrados", v: "7" },
      { k: "Passos por jornada", v: "24" },
      { k: "Ticket medio", v: "R$ 312" },
      { k: "Cancelamentos", v: "8,4%" },
      { k: "Realizado / Previsto", v: "96,2%" },
      { k: "Projecao mensal", v: "R$ 285k" },
    ],
    fraudScore: "38/100",
    fraudLabel: "Suspeita alta — reembolso bloqueado automaticamente",
    fraudCopy: "IconsAI Vision compara metadados, fonte, pixels e cruza com transacoes reais. Revisao humana acionada em < 1 min.",
    revenue: "R$ 3,82M",
    revenueCagr: "+18,4%",
    revenueCi: "IC 80%: ±7,2%",
  },
  "pt-PT": {
    kpiTitle: "KPIs operacionais",
    fraudTitle: "Antifraude · IA forense",
    revenueTitle: "Previsao de receita",
    kpis: [
      { k: "Modulos integrados", v: "7" },
      { k: "Passos por jornada", v: "24" },
      { k: "Bilhete medio", v: "EUR 60" },
      { k: "Cancelamentos", v: "8,4%" },
      { k: "Realizado / Previsto", v: "96,2%" },
      { k: "Projecao mensal", v: "EUR 54k" },
    ],
    fraudScore: "38/100",
    fraudLabel: "Suspeita elevada — reembolso bloqueado automaticamente",
    fraudCopy: "IconsAI Vision compara metadados, origem, pixels e cruza com transacoes reais. Revisao humana acionada em < 1 min.",
    revenue: "EUR 640k",
    revenueCagr: "+18,4%",
    revenueCi: "IC 80%: ±7,2%",
  },
  en: {
    kpiTitle: "Operational KPIs",
    fraudTitle: "Anti-fraud · forensic AI",
    revenueTitle: "Revenue forecast",
    kpis: [
      { k: "Integrated modules", v: "7" },
      { k: "Steps per journey", v: "24" },
      { k: "Avg ticket", v: "$ 68" },
      { k: "Cancellations", v: "8.4%" },
      { k: "Actual / Forecast", v: "96.2%" },
      { k: "Monthly projection", v: "$ 62k" },
    ],
    fraudScore: "38/100",
    fraudLabel: "High suspicion — reimbursement auto-blocked",
    fraudCopy: "IconsAI Vision compares metadata, source, pixels and cross-checks real transactions. Human review triggered in < 1 min.",
    revenue: "$ 740k",
    revenueCagr: "+18.4%",
    revenueCi: "80% CI: ±7.2%",
  },
};

/* ═══ SVG: Clinical Flow Diagram (4x3 grid) ═══ */
function ClinicalFlowSVG({ steps }: { steps: { n: string; label: string }[] }) {
  const cols = 4;
  const cellW = 125;
  const cellH = 56;
  const gapX = 14;
  const gapY = 12;
  const w = cols * cellW + (cols - 1) * gapX;
  const rows = Math.ceil(steps.length / cols);
  const h = rows * cellH + (rows - 1) * gapY;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: "170mm", display: "block", margin: "4mm auto 0" }} xmlns="http://www.w3.org/2000/svg">
      {steps.map((step, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * (cellW + gapX);
        const y = row * (cellH + gapY);
        return (
          <g key={step.n}>
            <rect x={x} y={y} width={cellW} height={cellH} rx={8} fill="#f0fdf4" stroke="#10b981" strokeWidth={1.2} />
            <text x={x + 10} y={y + 20} fontFamily="JetBrains Mono, monospace" fontSize={11} fontWeight={700} fill="#10b981">{step.n}</text>
            <text x={x + 10} y={y + 38} fontFamily="Inter Tight, Inter, system-ui, sans-serif" fontSize={8.5} fill="#1f2937">
              {step.label.length > 18 ? step.label.slice(0, 17) + "..." : step.label}
            </text>
            {i < steps.length - 1 && col < cols - 1 && (
              <line x1={x + cellW + 2} y1={y + cellH / 2} x2={x + cellW + gapX - 2} y2={y + cellH / 2} stroke="#10b981" strokeWidth={1.2} markerEnd="url(#arrowG)" />
            )}
            {i < steps.length - 1 && col === cols - 1 && row < rows - 1 && (
              <path d={`M${x + cellW / 2},${y + cellH + 1} L${x + cellW / 2},${y + cellH + gapY - 1}`} stroke="#10b981" strokeWidth={1.2} fill="none" markerEnd="url(#arrowG)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowG" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
        </marker>
      </defs>
    </svg>
  );
}

/* ═══ SVG: Operational Flow Diagram (4x3 grid) ═══ */
function OperationalFlowSVG({ steps }: { steps: { n: string; label: string }[] }) {
  const cols = 4;
  const cellW = 125;
  const cellH = 56;
  const gapX = 14;
  const gapY = 12;
  const w = cols * cellW + (cols - 1) * gapX;
  const rows = Math.ceil(steps.length / cols);
  const h = rows * cellH + (rows - 1) * gapY;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: "170mm", display: "block", margin: "4mm auto 0" }} xmlns="http://www.w3.org/2000/svg">
      {steps.map((step, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * (cellW + gapX);
        const y = row * (cellH + gapY);
        return (
          <g key={step.n}>
            <rect x={x} y={y} width={cellW} height={cellH} rx={8} fill="#f5f3ff" stroke="#7c3aed" strokeWidth={1.2} />
            <text x={x + 10} y={y + 20} fontFamily="JetBrains Mono, monospace" fontSize={11} fontWeight={700} fill="#7c3aed">{step.n}</text>
            <text x={x + 10} y={y + 38} fontFamily="Inter Tight, Inter, system-ui, sans-serif" fontSize={8.5} fill="#1f2937">
              {step.label.length > 18 ? step.label.slice(0, 17) + "..." : step.label}
            </text>
            {i < steps.length - 1 && col < cols - 1 && (
              <line x1={x + cellW + 2} y1={y + cellH / 2} x2={x + cellW + gapX - 2} y2={y + cellH / 2} stroke="#7c3aed" strokeWidth={1.2} markerEnd="url(#arrowV)" />
            )}
            {i < steps.length - 1 && col === cols - 1 && row < rows - 1 && (
              <path d={`M${x + cellW / 2},${y + cellH + 1} L${x + cellW / 2},${y + cellH + gapY - 1}`} stroke="#7c3aed" strokeWidth={1.2} fill="none" markerEnd="url(#arrowV)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowV" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
        </marker>
      </defs>
    </svg>
  );
}

/* ═══ Shared styles ═══ */
const sectionBar = (color: string): React.CSSProperties => ({
  width: "40mm", height: "3px", background: color, borderRadius: "2px", marginBottom: "5mm",
});
const cardStyle: React.CSSProperties = {
  background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px",
  padding: "3.5mm 4mm", marginBottom: "2.5mm",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace", fontSize: "8pt", fontWeight: 700,
  letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#10b981", marginBottom: "1mm",
};
const valueStyle: React.CSSProperties = {
  fontSize: "10pt", color: "#1f2937", lineHeight: 1.5,
};

export default function PdfDocument() {
  const lang = useLang();
  const s = DOC[lang];
  const clinical = CLINICAL[lang];
  const operational = OPERATIONAL[lang];
  const soap = SOAP[lang];
  const vitals = VITALS[lang];
  const cids = CIDS[lang];
  const impact = IMPACT[lang];

  const TOTAL_CONTENT = 5; // pages 2-6 are content (TOC + 4 enriched)
  const head = (n: number) => (
    <div className="pdf-head">
      <span className="brand"><WM /> · DiscoveryHealth</span>
      <span className="brand pdf-mono">{String(n).padStart(2, "0")} · {String(TOTAL_CONTENT).padStart(2, "0")}</span>
    </div>
  );
  const foot = (pg: number) => (
    <div className="pdf-foot">
      <span>DiscoveryHealth — IconsAI</span>
      <span>{s.page} {pg}</span>
    </div>
  );

  return (
    <div className="pdf-doc" aria-hidden>
      {/* ───────── PAGE 1 — COVER (dark) ───────── */}
      <section className="pdf-page pdf-cover">
        <div className="pdf-cover-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <WM dark />
            <span className="pdf-mono" style={{ fontSize: "9pt", color: "#9aa3b0", letterSpacing: ".1em" }}>
              {s.type}
            </span>
          </div>
          <div style={{ marginTop: "28mm" }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9pt", color: "#10b981", letterSpacing: ".18em", textTransform: "uppercase" }}>
              CLINICAL OS · ICONSAI
            </div>
            <h1 style={{ fontSize: "36pt", fontWeight: 800, color: "#e8eaed", lineHeight: 1.1, marginTop: "4mm" }}>
              Discovery
              <span style={{ color: "#10b981" }}>Health.</span>
            </h1>
            <p style={{ fontSize: "14pt", color: "#9aa3b0", marginTop: "6mm", maxWidth: "140mm", lineHeight: 1.5 }}>
              {lang === "en"
                ? "Guided anamnesis, self-exams, clinical triage, financial management and anti-fraud working as a single flow."
                : lang === "pt-PT"
                  ? "Anamnese guiada, auto-exames, triagem clinica, gestao financeira e antifraude a funcionar como um unico fluxo."
                  : "Anamnese guiada, auto-exames, triagem clinica, gestao financeira e antifraude funcionando como um unico fluxo."}
            </p>
          </div>
          <div style={{ position: "absolute", bottom: "48mm", left: "25mm" }}>
            <div style={{ fontSize: "10pt", color: "#6b7280" }}>iconsai.ai</div>
          </div>
        </div>
      </section>

      {/* ───────── PAGE 2 — TABLE OF CONTENTS ───────── */}
      <section className="pdf-page">
        {head(1)}
        <div className="pdf-sec-kick">{s.type}</div>
        <h2 style={{ fontSize: "22pt", fontWeight: 700, color: "#1f2937", marginBottom: "4mm" }}>
          {s.toc}
        </h2>
        <div style={sectionBar("#10b981")} />

        <div style={{ marginTop: "8mm" }}>
          {[
            { pg: "01", label: s.tocCover },
            { pg: "02", label: s.toc },
            { pg: "03", label: s.tocClinical },
            { pg: "04", label: s.tocOperational },
            { pg: "05", label: s.tocIntelligence },
            { pg: "06", label: s.tocImpact },
            { pg: "07", label: s.tocClosing },
          ].map((entry) => (
            <div key={entry.pg} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "3mm 0", borderBottom: "1px solid #f3f4f6",
            }}>
              <span style={{ fontSize: "11pt", color: "#1f2937", maxWidth: "140mm" }}>{entry.label}</span>
              <span className="pdf-mono" style={{ fontSize: "10pt", color: "#10b981", fontWeight: 700 }}>{entry.pg}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "12mm", padding: "4mm 5mm", background: "#f0fdf4", borderRadius: "8px", border: "1px solid #d1fae5" }}>
          <div style={{ fontSize: "9pt", color: "#10b981", fontWeight: 700, fontFamily: "JetBrains Mono, monospace", letterSpacing: ".1em", marginBottom: "2mm" }}>
            {lang === "en" ? "SCOPE" : "ESCOPO"}
          </div>
          <p style={{ fontSize: "10pt", color: "#374151", lineHeight: 1.5, margin: 0 }}>
            {lang === "en"
              ? "24 integrated modules — 12 clinical (guided anamnesis to SOAP report) + 12 operational (scheduling to treatment combinations). Unified patient journey with AI orchestration, real-time anti-fraud, and automated invoicing."
              : lang === "pt-PT"
                ? "24 modulos integrados — 12 clinicos (anamnese guiada ate laudo SOAP) + 12 operacionais (agenda ate combinacao de tratamentos). Percurso unico do doente com orquestracao IA, antifraude em tempo real e faturacao automatica."
                : "24 modulos integrados — 12 clinicos (anamnese guiada ate laudo SOAP) + 12 operacionais (agenda ate combinacao de tratamentos). Jornada unica do paciente com orquestracao IA, antifraude em tempo real e nota fiscal automatica."}
          </p>
        </div>
        {foot(2)}
      </section>

      {/* ───────── PAGE 3 — CLINICAL WORKFLOW (enriched) ───────── */}
      <section className="pdf-page">
        {head(2)}
        <div className="pdf-sec-kick">{s.clinical}</div>
        <h2 style={{ fontSize: "22pt", fontWeight: 700, color: "#1f2937", marginBottom: "4mm" }}>
          {lang === "en" ? "Clinical" : "Fluxo"}{" "}
          <span style={{ color: "#10b981" }}>{lang === "en" ? "workflow." : "clinico."}</span>
        </h2>
        <p style={{ fontSize: "10.5pt", color: "#6b7280", marginBottom: "5mm", lineHeight: 1.5 }}>
          {lang === "en"
            ? "From informed consent to structured SOAP report — 12 steps orchestrated by Aura, the virtual physician. Each step captures clinical data, validates compliance, and feeds the AI pipeline that produces the final report."
            : lang === "pt-PT"
              ? "Do consentimento informado ao laudo SOAP estruturado — 12 passos orquestrados pela Aura, a medica virtual. Cada passo captura dados clinicos, valida conformidade e alimenta o pipeline IA que produz o relatorio final."
              : "Do consentimento informado ao laudo SOAP estruturado — 12 passos orquestrados pela Aura, a medica virtual. Cada passo captura dados clinicos, valida conformidade e alimenta o pipeline IA que produz o laudo final."}
        </p>

        {/* SVG flow diagram */}
        <ClinicalFlowSVG steps={clinical} />

        {/* Compact table */}
        <table className="pdf-table" style={{ marginTop: "5mm", fontSize: "9pt" }}>
          <thead>
            <tr>
              <th style={{ width: "12mm" }}>#</th>
              <th>{lang === "en" ? "Step" : "Etapa"}</th>
            </tr>
          </thead>
          <tbody>
            {clinical.map((step) => (
              <tr key={step.n}>
                <td className="pdf-mono" style={{ color: "#10b981", fontWeight: 700, fontSize: "9pt" }}>{step.n}</td>
                <td style={{ fontSize: "9pt" }}>{step.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {foot(3)}
      </section>

      {/* ───────── PAGE 4 — OPERATIONAL WORKFLOW (enriched) ───────── */}
      <section className="pdf-page">
        {head(3)}
        <div className="pdf-sec-kick">{s.operational}</div>
        <h2 style={{ fontSize: "22pt", fontWeight: 700, color: "#1f2937", marginBottom: "4mm" }}>
          {lang === "en" ? "Operational" : "Fluxo"}{" "}
          <span style={{ color: "#7c3aed" }}>{lang === "en" ? "workflow." : "operacional."}</span>
        </h2>
        <p style={{ fontSize: "10.5pt", color: "#6b7280", marginBottom: "5mm", lineHeight: 1.5 }}>
          {lang === "en"
            ? "Scheduling, billing, inventory, pharmacy, anti-fraud and automated invoicing — the clinical OS meets ERP. Each module runs in parallel with the clinical flow, sharing context and eliminating double data entry."
            : lang === "pt-PT"
              ? "Agenda, faturacao, stock, farmacia, antifraude e faturacao automatica — o Clinical OS encontra ERP. Cada modulo corre em paralelo com o fluxo clinico, partilhando contexto e eliminando dupla entrada de dados."
              : "Agenda, faturamento, estoque, farmacia, antifraude e nota fiscal automatica — o Clinical OS encontra ERP. Cada modulo roda em paralelo com o fluxo clinico, compartilhando contexto e eliminando dupla entrada de dados."}
        </p>

        {/* SVG flow diagram */}
        <OperationalFlowSVG steps={operational} />

        {/* Compact table */}
        <table className="pdf-table" style={{ marginTop: "5mm", fontSize: "9pt" }}>
          <thead>
            <tr>
              <th style={{ width: "12mm" }}>#</th>
              <th>{lang === "en" ? "Step" : "Etapa"}</th>
            </tr>
          </thead>
          <tbody>
            {operational.map((step) => (
              <tr key={step.n}>
                <td className="pdf-mono" style={{ color: "#7c3aed", fontWeight: 700, fontSize: "9pt" }}>{step.n}</td>
                <td style={{ fontSize: "9pt" }}>{step.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {foot(4)}
      </section>

      {/* ───────── PAGE 5 — CLINICAL INTELLIGENCE ───────── */}
      <section className="pdf-page">
        {head(4)}
        <div className="pdf-sec-kick">{s.intelligence}</div>
        <h2 style={{ fontSize: "22pt", fontWeight: 700, color: "#1f2937", marginBottom: "4mm" }}>
          {lang === "en" ? "Clinical" : "Inteligencia"}{" "}
          <span style={{ color: "#10b981" }}>{lang === "en" ? "intelligence." : "clinica."}</span>
        </h2>
        <p style={{ fontSize: "10.5pt", color: "#6b7280", marginBottom: "6mm", lineHeight: 1.5 }}>
          {lang === "en"
            ? "Every consultation produces a structured SOAP report, cross-referenced with ICD-10 codes and calibrated probabilities. The physician makes the final call — the AI provides evidence-based support."
            : lang === "pt-PT"
              ? "Cada consulta produz um laudo SOAP estruturado, cruzado com codigos CID-10 e probabilidades calibradas. O medico decide — a IA fornece suporte baseado em evidencia."
              : "Cada consulta produz um laudo SOAP estruturado, cruzado com codigos CID-10 e probabilidades calibradas. O medico decide — a IA fornece suporte baseado em evidencia."}
        </p>

        {/* SOAP report cards */}
        <div style={{ marginBottom: "5mm" }}>
          <div style={labelStyle}>
            {lang === "en" ? "SOAP REPORT — EXAMPLE" : "LAUDO SOAP — EXEMPLO"}
          </div>
          {soap.map((s) => (
            <div key={s.letter} style={cardStyle}>
              <div style={{ display: "flex", gap: "3mm", alignItems: "baseline" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12pt", fontWeight: 800, color: "#10b981", minWidth: "8mm" }}>
                  {s.letter}
                </span>
                <div>
                  <div style={{ fontSize: "9pt", fontWeight: 700, color: "#374151", marginBottom: "0.5mm" }}>{s.title}</div>
                  <div style={valueStyle}>{s.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vitals + CID side by side */}
        <div style={{ display: "flex", gap: "5mm" }}>
          {/* Vitals */}
          <div style={{ flex: 1 }}>
            <div style={labelStyle}>
              {lang === "en" ? "VITAL SIGNS" : "SINAIS VITAIS"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2mm" }}>
              {vitals.map(([k, v, u]) => (
                <div key={k} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", marginBottom: "1.5mm" }}>
                  <span style={{ fontSize: "9pt", color: "#6b7280" }}>{k}</span>
                  <span style={{ fontSize: "9pt", fontWeight: 700, color: "#1f2937" }}>{v} {u}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CID-10 */}
          <div style={{ flex: 1 }}>
            <div style={labelStyle}>
              {lang === "en" ? "ICD-10 (CALIBRATED)" : "CID-10 (CALIBRADO)"}
            </div>
            {cids.map((c) => (
              <div key={c.code} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5mm" }}>
                <span style={{ fontSize: "9pt", color: "#1f2937" }}>{c.code}</span>
                <span className="pdf-mono" style={{ fontSize: "9pt", fontWeight: 700, color: "#10b981" }}>{c.prob}</span>
              </div>
            ))}
            <div style={{ fontSize: "8pt", color: "#9ca3af", marginTop: "1mm", fontStyle: "italic" }}>
              {lang === "en" ? "Final clinical decision is always the physician's." : "Decisao clinica final e sempre do medico."}
            </div>
          </div>
        </div>
        {foot(5)}
      </section>

      {/* ───────── PAGE 6 — IMPACT & METRICS ───────── */}
      <section className="pdf-page">
        {head(5)}
        <div className="pdf-sec-kick">{s.impact}</div>
        <h2 style={{ fontSize: "22pt", fontWeight: 700, color: "#1f2937", marginBottom: "4mm" }}>
          {lang === "en" ? "Impact &" : "Impacto &"}{" "}
          <span style={{ color: "#10b981" }}>{lang === "en" ? "metrics." : "metricas."}</span>
        </h2>
        <p style={{ fontSize: "10.5pt", color: "#6b7280", marginBottom: "6mm", lineHeight: 1.5 }}>
          {lang === "en"
            ? "Quantified results from the integrated clinical + operational pipeline."
            : lang === "pt-PT"
              ? "Resultados quantificados do pipeline integrado clinico + operacional."
              : "Resultados quantificados do pipeline integrado clinico + operacional."}
        </p>

        {/* KPIs grid */}
        <div style={labelStyle}>{impact.kpiTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3mm", marginBottom: "6mm" }}>
          {impact.kpis.map((kpi) => (
            <div key={kpi.k} style={{ ...cardStyle, textAlign: "center" as const }}>
              <div style={{ fontSize: "16pt", fontWeight: 800, color: "#10b981" }}>{kpi.v}</div>
              <div style={{ fontSize: "8pt", color: "#6b7280", marginTop: "1mm" }}>{kpi.k}</div>
            </div>
          ))}
        </div>

        {/* Anti-fraud + Revenue side by side */}
        <div style={{ display: "flex", gap: "5mm" }}>
          {/* Anti-fraud */}
          <div style={{ flex: 1 }}>
            <div style={labelStyle}>{impact.fraudTitle}</div>
            <div style={{ ...cardStyle, textAlign: "center" as const, padding: "5mm 4mm" }}>
              <div style={{ fontSize: "28pt", fontWeight: 800, color: "#ef4444" }}>{impact.fraudScore}</div>
              <div style={{ fontSize: "9pt", fontWeight: 600, color: "#dc2626", marginTop: "2mm" }}>{impact.fraudLabel}</div>
              <div style={{ fontSize: "8.5pt", color: "#6b7280", marginTop: "3mm", lineHeight: 1.5 }}>{impact.fraudCopy}</div>
            </div>
          </div>

          {/* Revenue */}
          <div style={{ flex: 1 }}>
            <div style={labelStyle}>{impact.revenueTitle}</div>
            <div style={{ ...cardStyle, textAlign: "center" as const, padding: "5mm 4mm" }}>
              <div style={{ fontSize: "9pt", color: "#6b7280", marginBottom: "2mm" }}>
                {lang === "en" ? "12-month projection" : "Projecao 12 meses"}
              </div>
              <div style={{ fontSize: "28pt", fontWeight: 800, color: "#10b981" }}>{impact.revenue}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "4mm", marginTop: "3mm" }}>
                <div style={{ fontSize: "9pt" }}>
                  <span style={{ color: "#6b7280" }}>CAGR </span>
                  <span style={{ fontWeight: 700, color: "#10b981" }}>{impact.revenueCagr}</span>
                </div>
                <div style={{ fontSize: "9pt", color: "#6b7280" }}>{impact.revenueCi}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits summary */}
        <div style={{ marginTop: "6mm" }}>
          <div style={labelStyle}>
            {lang === "en" ? "KEY BENEFITS" : "BENEFICIOS"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5mm" }}>
            {(lang === "en" ? [
              "Single patient journey — zero duplicate entry",
              "AI-orchestrated anamnesis with SOAP output",
              "Real-time anti-fraud with forensic pixel analysis",
              "Automated invoicing with tax authority sync",
              "ICD-10 diagnosis pipeline with calibrated probabilities",
              "12-month revenue forecast with 80% confidence band",
            ] : lang === "pt-PT" ? [
              "Percurso unico do doente — zero entrada duplicada",
              "Anamnese orquestrada por IA com laudo SOAP",
              "Antifraude em tempo real com analise forense de pixels",
              "Faturacao automatica com comunicacao a AT",
              "Pipeline de diagnostico CID-10 com probabilidades calibradas",
              "Previsao de receita 12 meses com banda de confianca 80%",
            ] : [
              "Jornada unica do paciente — zero entrada duplicada",
              "Anamnese orquestrada por IA com laudo SOAP",
              "Antifraude em tempo real com analise forense de pixels",
              "Nota fiscal automatica com sincronizacao SEFAZ",
              "Pipeline de diagnostico CID-10 com probabilidades calibradas",
              "Previsao de receita 12 meses com banda de confianca 80%",
            ]).map((b, i) => (
              <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: "2mm", marginBottom: "1mm" }}>
                <span style={{ color: "#10b981", fontWeight: 700, fontSize: "11pt" }}>&#x2713;</span>
                <span style={{ fontSize: "8.5pt", color: "#374151" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
        {foot(6)}
      </section>

      {/* ───────── PAGE 7 — CLOSING (dark) ───────── */}
      <section className="pdf-page pdf-cover">
        <div className="pdf-cover-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <WM dark />
            <span className="pdf-mono" style={{ fontSize: "9pt", color: "#9aa3b0", letterSpacing: ".1em" }}>
              {s.closing}
            </span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontSize: "28pt", fontWeight: 800, color: "#e8eaed" }}>
              Discovery<span style={{ color: "#10b981" }}>Health.</span>
            </div>
            <div style={{ fontSize: "11pt", color: "#9aa3b0", marginTop: "4mm" }}>
              {lang === "en" ? "Clinical intelligence for modern healthcare." : "Inteligencia clinica para a saude moderna."}
            </div>
          </div>
          <div className="pdf-foot-legal" style={{ textAlign: "center", fontSize: "8pt", color: "#6b7280", marginTop: "auto" }}>
            {s.confidential}
            <br />
            © 2026 IconsAI · Kendall Square · CIC · Cambridge, MA · MIT · Harvard · iconsai.ai/DiscoveryHealth
          </div>
        </div>
      </section>
    </div>
  );
}
