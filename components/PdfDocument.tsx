"use client";

/**
 * PdfDocument — documento PDF do DiscoveryHealth, renderizado SÓ na impressão.
 * Zero dependências: usa @media print (globals.css) para esconder o deck e revelar
 * este documento, que o browser salva como PDF. Conteúdo no idioma ativo.
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
  page: string; confidential: string;
}> = {
  "pt-BR": {
    type: "PROPOSTA COMERCIAL",
    overview: "Visão geral",
    modules: "Módulos do fluxo",
    flow: "Jornada do paciente",
    clinical: "Fluxo clínico",
    operational: "Fluxo operacional",
    closing: "Confiança & alcance",
    page: "pág.",
    confidential: "Documento confidencial — distribuição restrita. © 2026 IconsAI.",
  },
  "pt-PT": {
    type: "PROPOSTA COMERCIAL",
    overview: "Síntese",
    modules: "Módulos do fluxo",
    flow: "Percurso do doente",
    clinical: "Fluxo clínico",
    operational: "Fluxo operacional",
    closing: "Confiança & alcance",
    page: "pág.",
    confidential: "Documento confidencial — distribuição restrita. © 2026 IconsAI.",
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
  },
};

const CLINICAL = {
  "pt-BR": [
    { n: "01", label: "Termos LGPD" },
    { n: "02", label: "Identificação do paciente" },
    { n: "03", label: "Confirmação de dados" },
    { n: "04", label: "Aura — médica virtual" },
    { n: "05", label: "Áudio livre" },
    { n: "06", label: "Perguntas da Aura" },
    { n: "07", label: "Dados fisiológicos" },
    { n: "08", label: "Auto-exames orientados" },
    { n: "09", label: "Upload de exames" },
    { n: "10", label: "Medicação RAG" },
    { n: "11", label: "Chat de anamnese" },
    { n: "12", label: "Laudo SOAP + CID-10" },
  ],
  "pt-PT": [
    { n: "01", label: "Termos RGPD" },
    { n: "02", label: "Identificação do doente" },
    { n: "03", label: "Confirmação de dados" },
    { n: "04", label: "Aura — médica virtual" },
    { n: "05", label: "Áudio livre" },
    { n: "06", label: "Perguntas da Aura" },
    { n: "07", label: "Dados fisiológicos" },
    { n: "08", label: "Auto-exames orientados" },
    { n: "09", label: "Upload de exames" },
    { n: "10", label: "Medicação RAG" },
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
    { n: "13", label: "Gestão de agenda" },
    { n: "14", label: "Faturamento" },
    { n: "15", label: "Almoxarifado" },
    { n: "16", label: "Farmácia · SNGPC" },
    { n: "17", label: "Cobrança PIX" },
    { n: "18", label: "Score antifraude" },
    { n: "19", label: "NF automática" },
    { n: "20", label: "Previsão de receita" },
    { n: "21", label: "Diagnóstico CID" },
    { n: "22", label: "Expectativa de vida" },
    { n: "23", label: "Navegação do paciente" },
    { n: "24", label: "Combinação de tratamentos" },
  ],
  "pt-PT": [
    { n: "13", label: "Gestão de agenda" },
    { n: "14", label: "Faturação" },
    { n: "15", label: "Stock" },
    { n: "16", label: "Farmácia · INFARMED" },
    { n: "17", label: "Cobrança MB WAY" },
    { n: "18", label: "Score antifraude" },
    { n: "19", label: "e-Fatura automática" },
    { n: "20", label: "Previsão de receita" },
    { n: "21", label: "Diagnóstico CID" },
    { n: "22", label: "Esperança de vida" },
    { n: "23", label: "Navegação do doente" },
    { n: "24", label: "Combinação de tratamentos" },
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

export default function PdfDocument() {
  const lang = useLang();
  const s = DOC[lang];
  const clinical = CLINICAL[lang];
  const operational = OPERATIONAL[lang];

  const head = (n: number) => (
    <div className="pdf-head">
      <span className="brand"><WM /> · DiscoveryHealth</span>
      <span className="brand pdf-mono">{String(n).padStart(2, "0")} · 03</span>
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
      {/* ───────── PÁGINA 1 — CAPA (dark) ───────── */}
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
                  ? "Anamnese guiada, auto-exames, triagem clínica, gestao financeira e antifraude a funcionar como um unico fluxo."
                  : "Anamnese guiada, auto-exames, triagem clinica, gestao financeira e antifraude funcionando como um unico fluxo."}
            </p>
          </div>
          <div style={{ position: "absolute", bottom: "48mm", left: "25mm" }}>
            <div style={{ fontSize: "10pt", color: "#6b7280" }}>iconsai.ai</div>
          </div>
        </div>
      </section>

      {/* ───────── PÁGINA 2 — FLUXO CLÍNICO ───────── */}
      <section className="pdf-page">
        {head(1)}
        <div className="pdf-sec-kick">{s.clinical}</div>
        <h2 style={{ fontSize: "22pt", fontWeight: 700, color: "#1f2937", marginBottom: "6mm" }}>
          {lang === "en" ? "Clinical" : "Fluxo"}{" "}
          <span style={{ color: "#10b981" }}>{lang === "en" ? "workflow." : "clinico."}</span>
        </h2>
        <p style={{ fontSize: "11pt", color: "#6b7280", marginBottom: "8mm", lineHeight: 1.5 }}>
          {lang === "en"
            ? "From informed consent to structured SOAP report — 12 steps orchestrated by Aura, the virtual physician."
            : lang === "pt-PT"
              ? "Do consentimento informado ao laudo SOAP estruturado — 12 passos orquestrados pela Aura, a medica virtual."
              : "Do consentimento informado ao laudo SOAP estruturado — 12 passos orquestrados pela Aura, a medica virtual."}
        </p>
        <table className="pdf-table" style={{ marginTop: "4mm" }}>
          <thead>
            <tr>
              <th style={{ width: "16mm" }}>#</th>
              <th>{lang === "en" ? "Step" : "Etapa"}</th>
            </tr>
          </thead>
          <tbody>
            {clinical.map((step) => (
              <tr key={step.n}>
                <td className="pdf-mono" style={{ color: "#10b981", fontWeight: 700 }}>{step.n}</td>
                <td>{step.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {foot(2)}
      </section>

      {/* ───────── PÁGINA 3 — FLUXO OPERACIONAL ───────── */}
      <section className="pdf-page">
        {head(2)}
        <div className="pdf-sec-kick">{s.operational}</div>
        <h2 style={{ fontSize: "22pt", fontWeight: 700, color: "#1f2937", marginBottom: "6mm" }}>
          {lang === "en" ? "Operational" : "Fluxo"}{" "}
          <span style={{ color: "#10b981" }}>{lang === "en" ? "workflow." : "operacional."}</span>
        </h2>
        <p style={{ fontSize: "11pt", color: "#6b7280", marginBottom: "8mm", lineHeight: 1.5 }}>
          {lang === "en"
            ? "Scheduling, billing, inventory, pharmacy, anti-fraud and automated invoicing — clinical OS meets ERP."
            : lang === "pt-PT"
              ? "Agenda, faturacao, stock, farmacia, antifraude e faturacao automatica — Clinical OS encontra ERP."
              : "Agenda, faturamento, estoque, farmacia, antifraude e nota fiscal automatica — Clinical OS encontra ERP."}
        </p>
        <table className="pdf-table" style={{ marginTop: "4mm" }}>
          <thead>
            <tr>
              <th style={{ width: "16mm" }}>#</th>
              <th>{lang === "en" ? "Step" : "Etapa"}</th>
            </tr>
          </thead>
          <tbody>
            {operational.map((step) => (
              <tr key={step.n}>
                <td className="pdf-mono" style={{ color: "#10b981", fontWeight: 700 }}>{step.n}</td>
                <td>{step.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {foot(3)}
      </section>

      {/* ───────── PÁGINA 4 — FECHO (dark) ───────── */}
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
