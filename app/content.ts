/**
 * Conteúdo de TELA localizado por país (skill /showcase §8.5).
 * Tela tri-locale: cada idioma traz idioma, moeda e instituições do SEU país.
 * Números são ILUSTRATIVOS (demonstração de produto, §8.5 tipo 2): localiza-se
 * moeda/formato/instituição, mantendo-os coerentes com a narração.
 *
 * BR (pt-BR): R$ · Receita Federal · ViaCEP · LGPD · SUS/ANS · ANVISA/SNGPC · SEFAZ/NFS-e · PIX · CID-10
 * PT (pt-PT): €  · registos/AT · CTT · RGPD · SNS/ERS · INFARMED · AT/e-Fatura · MB WAY · CID-10
 * EN (en):    US$ · public records/IRS · USPS · HIPAA · CMS · FDA/DEA · e-invoice · Zelle · ICD-10
 */
import { type L10n } from '@/components/langs'
import { type MedIconKey } from '@/components/MedIcon'

/* ───────────────────────── OPENING ───────────────────────── */
export const OPENING = {
  'pt-BR': {
    eyebrow: 'DISCOVERY HEALTH · ICONSAI CLINICAL OS',
    sub: 'Anamnese guiada, auto-exames, triagem clínica, gestão financeira e antifraude funcionando como um único fluxo.',
    storyKicker: 'o que acontece em minutos',
    story1: 'Aura escuta o paciente, estrutura os sintomas, pede auto-exames orientados e prepara um laudo acionável.',
    story2: 'Ao mesmo tempo, a operação da clínica organiza agenda, cobrança, estoque, nota fiscal e prevenção de fraude.',
    consoleTag: 'consulta ao vivo',
    consoleStatus: 'sessão ativa',
    patientMeta: 'cefaleia pulsátil · fotossensibilidade · 3 dias',
    priorityK: 'prioridade',
    priorityV: 'moderada',
    rows: [
      ['Aura', 'anamnese contextualizada'],
      ['Gestão', 'agenda, estoque, faturamento'],
      ['Auditoria', 'LGPD-Saúde, NFS-e, score antifraude'],
    ],
    metrics: [
      ['7', 'módulos no fluxo'],
      ['1', 'jornada do paciente'],
      ['24/7', 'orquestração contínua'],
    ],
    pills: ['Aura · médica virtual', 'Laudo SOAP · CID-10', 'LGPD-Saúde · ANS'],
  },
  'pt-PT': {
    eyebrow: 'DISCOVERY HEALTH · ICONSAI CLINICAL OS',
    sub: 'Anamnese guiada, auto-exames, triagem clínica, gestão financeira e antifraude a funcionar como um único fluxo.',
    storyKicker: 'o que acontece em minutos',
    story1: 'A Aura ouve o doente, estrutura os sintomas, pede auto-exames orientados e prepara um laudo acionável.',
    story2: 'Ao mesmo tempo, a operação da clínica organiza agenda, cobrança, stock, fatura e prevenção de fraude.',
    consoleTag: 'consulta em direto',
    consoleStatus: 'sessão ativa',
    patientMeta: 'cefaleia pulsátil · fotossensibilidade · 3 dias',
    priorityK: 'prioridade',
    priorityV: 'moderada',
    rows: [
      ['Aura', 'anamnese contextualizada'],
      ['Gestão', 'agenda, stock, faturação'],
      ['Auditoria', 'RGPD, e-Fatura, score antifraude'],
    ],
    metrics: [
      ['7', 'módulos no fluxo'],
      ['1', 'percurso do doente'],
      ['24/7', 'orquestração contínua'],
    ],
    pills: ['Aura · médica virtual', 'Laudo SOAP · CID-10', 'RGPD · SNS'],
  },
  en: {
    eyebrow: 'DISCOVERY HEALTH · ICONSAI CLINICAL OS',
    sub: 'Guided intake, self-exams, clinical triage, financial management, and fraud prevention working as a single flow.',
    storyKicker: 'what happens in minutes',
    story1: 'Aura listens to the patient, structures the symptoms, requests guided self-exams, and prepares an actionable report.',
    story2: 'At the same time, the clinic operation organizes scheduling, billing, inventory, invoicing, and fraud prevention.',
    consoleTag: 'live consult',
    consoleStatus: 'active session',
    patientMeta: 'pulsating headache · photosensitivity · 3 days',
    priorityK: 'priority',
    priorityV: 'moderate',
    rows: [
      ['Aura', 'contextualized intake'],
      ['Ops', 'scheduling, inventory, billing'],
      ['Audit', 'HIPAA, e-invoice, fraud score'],
    ],
    metrics: [
      ['7', 'modules in the flow'],
      ['1', 'patient journey'],
      ['24/7', 'continuous orchestration'],
    ],
    pills: ['Aura · virtual physician', 'SOAP report · ICD-10', 'HIPAA'],
  },
} satisfies L10n<{
  eyebrow: string; sub: string; storyKicker: string; story1: string; story2: string
  consoleTag: string; consoleStatus: string; patientMeta: string; priorityK: string; priorityV: string
  rows: [string, string][]; metrics: [string, string][]; pills: string[]
}>

/* ───────────────────────── S1 · TERMOS ───────────────────────── */
type Termo = {
  id: 'uso' | 'privacidade' | 'voz'
  titulo: string; texto: string; resumo: string; base: string
  risco: 'baixo' | 'moderado' | 'alto'; aceite: string; kicker?: string; sinais: string[]
}
type S1 = {
  kicker: string; title: string; subtitle: string
  panelKicker: string; metaBase: string; metaAceite: string; metaStatus: string
  statusVal: string; itemsLabel: string; footNote: string
  btnLater: string; btnAccept: string; termos: Termo[]
  chatTitle: string; chatLines: string[]
}
export const S1 = {
  'pt-BR': {
    kicker: 'discovery health · termos legais', title: 'Antes de começar.',
    subtitle: 'Aceite explícito em três documentos — exigência LGPD.',
    panelKicker: 'documento em foco', metaBase: 'base legal', metaAceite: 'tipo de aceite', metaStatus: 'status',
    statusVal: 'pronto para assinatura', itemsLabel: 'itens validados no fluxo',
    footNote: 'clique em outro termo para simular a revisão do onboarding clínico',
    btnLater: 'Revisar depois', btnAccept: 'Aceito e quero começar →',
    chatTitle: 'LGPD · CYBERSECURITY',
    chatLines: [
      '$ lgpd --check',
      '> aceite explícito obrigatório',
      '> dados de saúde: Art. 11',
      '$ crypto --status',
      '> criptografia end-to-end',
      '> chaves rotativas 24h',
      '$ audit --verify',
      '> zero partilha sem aceite',
      '> conformidade LGPD ativa',
    ],
    termos: [
      { id: 'uso', titulo: '1 · Termos de Uso', texto: 'O que o Discovery Health faz, o que não substitui consulta presencial, suspensão por descumprimento.', resumo: 'Paciente entende escopo do produto, limites clínicos e quando o caso deve ser escalado para atendimento humano.', base: 'contrato de uso · onboarding', risco: 'baixo', aceite: 'aceite simples', sinais: ['escopo da plataforma', 'limites de responsabilidade', 'encaminhamento presencial'] },
      { id: 'privacidade', titulo: '2 · Política de Privacidade', texto: 'Quais dados, bases legais, retenção e compartilhamento com operadores homologados pela IconsAI.', resumo: 'Explica o ciclo de vida dos dados, os operadores envolvidos e a retenção operacional do histórico clínico.', base: 'LGPD art. 7º e art. 9º', risco: 'moderado', aceite: 'aceite explícito', sinais: ['bases legais', 'retenção', 'operadores e subprocessadores'] },
      { id: 'voz', titulo: '3 · Biometria de Voz', texto: 'Gravação de áudio + características acústicas + prosódia. LGPD Art. 5º II.', resumo: 'Documento sensível para consentimento específico de biometria e processamento de traços de voz no fluxo clínico.', base: 'LGPD art. 5º II', risco: 'alto', aceite: 'consentimento sensível', kicker: 'DADO SENSÍVEL · CONSENTIMENTO ESPECÍFICO', sinais: ['biometria de voz', 'traços acústicos', 'revogação assistida'] },
    ],
  },
  'pt-PT': {
    kicker: 'discovery health · termos legais', title: 'Antes de começar.',
    subtitle: 'Aceitação explícita em três documentos — exigência do RGPD.',
    panelKicker: 'documento em foco', metaBase: 'base legal', metaAceite: 'tipo de aceitação', metaStatus: 'estado',
    statusVal: 'pronto para assinatura', itemsLabel: 'itens validados no fluxo',
    footNote: 'clique noutro termo para simular a revisão do onboarding clínico',
    btnLater: 'Rever depois', btnAccept: 'Aceito e quero começar →',
    chatTitle: 'RGPD · CYBERSECURITY',
    chatLines: [
      '$ rgpd --check',
      '> aceitação explícita requerida',
      '> dados de saúde: Art. 9.º',
      '$ crypto --status',
      '> cifração end-to-end activa',
      '> chaves rotativas 24h',
      '$ audit --verify',
      '> zero partilha sem aceite',
      '> conformidade RGPD activa',
    ],
    termos: [
      { id: 'uso', titulo: '1 · Termos de Utilização', texto: 'O que o Discovery Health faz, o que não substitui consulta presencial, suspensão por incumprimento.', resumo: 'O doente compreende o âmbito do produto, os limites clínicos e quando o caso deve ser encaminhado para atendimento humano.', base: 'contrato de utilização · onboarding', risco: 'baixo', aceite: 'aceitação simples', sinais: ['âmbito da plataforma', 'limites de responsabilidade', 'encaminhamento presencial'] },
      { id: 'privacidade', titulo: '2 · Política de Privacidade', texto: 'Que dados, bases legais, retenção e partilha com subcontratantes homologados pela IconsAI.', resumo: 'Explica o ciclo de vida dos dados, os subcontratantes envolvidos e a retenção operacional do histórico clínico.', base: 'RGPD art. 6.º e art. 9.º', risco: 'moderado', aceite: 'aceitação explícita', sinais: ['bases legais', 'retenção', 'subcontratantes'] },
      { id: 'voz', titulo: '3 · Biometria de Voz', texto: 'Gravação de áudio + características acústicas + prosódia. RGPD art. 9.º.', resumo: 'Documento sensível para consentimento específico de biometria e processamento de traços de voz no fluxo clínico.', base: 'RGPD art. 9.º', risco: 'alto', aceite: 'consentimento sensível', kicker: 'DADO SENSÍVEL · CONSENTIMENTO ESPECÍFICO', sinais: ['biometria de voz', 'traços acústicos', 'revogação assistida'] },
    ],
  },
  en: {
    kicker: 'discovery health · legal terms', title: 'Before we start.',
    subtitle: 'Explicit consent across three documents — required under HIPAA.',
    panelKicker: 'document in focus', metaBase: 'legal basis', metaAceite: 'consent type', metaStatus: 'status',
    statusVal: 'ready to sign', itemsLabel: 'items validated in the flow',
    footNote: 'click another term to simulate the clinical onboarding review',
    btnLater: 'Review later', btnAccept: 'I accept and want to start →',
    chatTitle: 'HIPAA · CYBERSECURITY',
    chatLines: [
      '$ hipaa --check',
      '> explicit consent required',
      '> health data: Privacy Rule',
      '$ crypto --status',
      '> end-to-end encryption on',
      '> keys rotated every 24h',
      '$ audit --verify',
      '> zero sharing w/o consent',
      '> HIPAA compliance verified',
    ],
    termos: [
      { id: 'uso', titulo: '1 · Terms of Use', texto: 'What Discovery Health does, what it does not replace in an in-person visit, suspension for misuse.', resumo: 'The patient understands the product scope, the clinical limits, and when a case must be escalated to human care.', base: 'terms of use · onboarding', risco: 'baixo', aceite: 'simple acceptance', sinais: ['platform scope', 'liability limits', 'in-person referral'] },
      { id: 'privacidade', titulo: '2 · Privacy Policy', texto: 'Which data, legal bases, retention, and sharing with IconsAI-approved processors.', resumo: 'Explains the data lifecycle, the processors involved, and the operational retention of the clinical record.', base: 'HIPAA Privacy Rule', risco: 'moderado', aceite: 'explicit acceptance', sinais: ['legal bases', 'retention', 'processors and subprocessors'] },
      { id: 'voz', titulo: '3 · Voice Biometrics', texto: 'Audio recording + acoustic features + prosody. Sensitive biometric identifier.', resumo: 'Sensitive document for specific consent to biometrics and processing of voice traits within the clinical flow.', base: 'HIPAA · biometric identifier', risco: 'alto', aceite: 'sensitive consent', kicker: 'SENSITIVE DATA · SPECIFIC CONSENT', sinais: ['voice biometrics', 'acoustic traits', 'assisted revocation'] },
    ],
  },
} satisfies L10n<S1>

/* ───────────────────────── S2 · IDENTIFICAÇÃO ───────────────────────── */
type S2 = {
  title: string; subtitle: string; prefillKicker: string; prefillText: string
  fName: string; fAge: string; fGender: string; genderVal: string
  fId: string; idVal: string; fZip: string; zipVal: string; zipHint: string
  fStreet: string; streetVal: string; fNumber: string; numberVal: string; nameVal: string
}
export const S2 = {
  'pt-BR': {
    title: 'Antes de começar.', subtitle: 'CPF cruza com dados públicos da Receita Federal — fica seguro e não é compartilhado.',
    prefillKicker: 'dados pré-preenchidos', prefillText: 'Achei seus dados em registros públicos. Confere se está tudo certo.',
    fName: 'Como gostaria de ser chamado(a)?', nameVal: 'Fernando', fAge: 'Idade', fGender: 'Gênero', genderVal: 'M',
    fId: 'CPF', idVal: '123.456.789-00', fZip: 'CEP', zipVal: '01310-100', zipHint: '✓ endereço preenchido — confere e ajusta se precisar',
    fStreet: 'Rua', streetVal: 'Avenida Paulista', fNumber: 'Número', numberVal: '1578',
  },
  'pt-PT': {
    title: 'Antes de começar.', subtitle: 'O NIF cruza com registos públicos — fica seguro e não é partilhado.',
    prefillKicker: 'dados pré-preenchidos', prefillText: 'Encontrei os seus dados em registos públicos. Confirme se está tudo certo.',
    fName: 'Como gostaria de ser tratado(a)?', nameVal: 'Fernando', fAge: 'Idade', fGender: 'Género', genderVal: 'M',
    fId: 'NIF', idVal: '123 456 789', fZip: 'Código postal', zipVal: '1250-096', zipHint: '✓ morada preenchida — confirme e ajuste se precisar',
    fStreet: 'Rua', streetVal: 'Avenida da Liberdade', fNumber: 'Número', numberVal: '110',
  },
  en: {
    title: 'Before we start.', subtitle: 'Your ID is matched against public records — kept secure and never shared.',
    prefillKicker: 'prefilled data', prefillText: 'I found your details in public records. Check that everything is right.',
    fName: 'How would you like to be called?', nameVal: 'Fernando', fAge: 'Age', fGender: 'Gender', genderVal: 'M',
    fId: 'SSN', idVal: '•••-••-6789', fZip: 'ZIP code', zipVal: '10010', zipHint: '✓ address filled — review and adjust if needed',
    fStreet: 'Street', streetVal: '5th Avenue', fNumber: 'Number', numberVal: '350',
  },
} satisfies L10n<S2>

/* ───────────────────────── S3 · CONFIRMAÇÃO ───────────────────────── */
type S3 = {
  kicker: string; title: string; subtitle: string; loaderKicker: string; loaderLabel: string
  totalLabel: string
  steps: string[]; nameK: string; ageK: string; ageV: string; linkK: string; linkV: string
  chips: string[]; sideKicker: string; sideLines: string[]; btnYes: string; btnNo: string
}
export const S3 = {
  'pt-BR': {
    kicker: 'confirmação · registros públicos', title: 'Achei alguém com esse CPF. É você?',
    subtitle: 'Pré-preenchimento só é liberado depois de um gesto explícito do paciente.',
    loaderKicker: 'cruzando registros públicos', loaderLabel: 'Cruzando bases médicas',
    totalLabel: 'dados analisados',
    steps: ['dim_pessoas · Receita Federal', 'vínculos QSA · sócios', 'consentimento LGPD'],
    nameK: 'nome', ageK: 'idade aproximada', ageV: '38 anos', linkK: 'vínculo empresarial mais recente', linkV: 'IconsAI · Sócio',
    chips: ['Receita Federal ✓', 'ViaCEP ✓', 'LGPD · consentimento válido'],
    sideKicker: 'sinais encontrados',
    sideLines: ['endereço compatível com CEP informado', 'perfil liberado para prefill clínico', 'áudio poderá ser vinculado ao prontuário'],
    btnYes: 'Sou eu →', btnNo: 'Não sou eu',
  },
  'pt-PT': {
    kicker: 'confirmação · registos públicos', title: 'Encontrei alguém com este NIF. É você?',
    subtitle: 'O pré-preenchimento só é libertado após um gesto explícito do doente.',
    loaderKicker: 'a cruzar registos públicos', loaderLabel: 'A cruzar bases médicas',
    totalLabel: 'dados analisados',
    steps: ['registos · AT', 'vínculos societários', 'consentimento RGPD'],
    nameK: 'nome', ageK: 'idade aproximada', ageV: '38 anos', linkK: 'vínculo empresarial mais recente', linkV: 'IconsAI · Sócio',
    chips: ['Registos AT ✓', 'CTT ✓', 'RGPD · consentimento válido'],
    sideKicker: 'sinais encontrados',
    sideLines: ['morada compatível com o código postal indicado', 'perfil libertado para pré-preenchimento clínico', 'áudio poderá ser associado ao processo clínico'],
    btnYes: 'Sou eu →', btnNo: 'Não sou eu',
  },
  en: {
    kicker: 'confirmation · public records', title: 'I found someone with this ID. Is it you?',
    subtitle: 'Prefill is only released after an explicit gesture from the patient.',
    loaderKicker: 'cross-referencing public records', loaderLabel: 'Cross-referencing medical records',
    totalLabel: 'data points analyzed',
    steps: ['public records · IRS', 'business affiliations', 'HIPAA consent'],
    nameK: 'name', ageK: 'approximate age', ageV: '38 years', linkK: 'most recent business affiliation', linkV: 'IconsAI · Partner',
    chips: ['Public records ✓', 'USPS ✓', 'HIPAA · valid consent'],
    sideKicker: 'signals found',
    sideLines: ['address consistent with the ZIP provided', 'profile released for clinical prefill', 'audio can be linked to the chart'],
    btnYes: 'That\'s me →', btnNo: 'Not me',
  },
} satisfies L10n<S3>

/* ───────────────────────── S4 · AURA APRESENTAÇÃO ───────────────────────── */
type S4 = {
  kicker: string; status: string; lines: string[]
  sideKicker1: string; side1: string[]; sideKicker2: string; chips: string[]
  micLabel: string
}
export const S4 = {
  'pt-BR': {
    kicker: 'Aura · Médica Virtual', status: 'voz ativa · escuta clínica empática',
    lines: [
      'Oi. Eu sou a Aura, a médica virtual da IconsAI.',
      'Vou ouvir com calma, organizar o seu relato e destacar o que pode merecer atenção médica mais rápida.',
      'Enquanto você fala, estou estruturando cada sintoma, cruzando com evidência clínica e identificando sinais de alerta em tempo real.',
      'No fim, você recebe um resumo clínico claro para seguir atendimento sem perder contexto.',
      'Tudo o que você disser fica protegido por criptografia ponta a ponta e segue as diretrizes da LGPD-Saúde.',
      'Quanto mais natural for o seu relato, mais preciso fica o meu raciocínio clínico — fale no seu ritmo, sem se preocupar com termos.',
      'Pode começar quando quiser — estou aqui para ouvir.',
    ],
    sideKicker1: 'o que ela faz enquanto fala',
    side1: ['estruturando sintomas principais', 'detectando red flags no relato', 'preparando perguntas de follow-up', 'correlacionando com evidência médica'],
    sideKicker2: 'camadas do fluxo', chips: ['anamnese', 'evidência médica', 'laudo SOAP'],
    micLabel: 'escuta ativa em tempo real',
  },
  'pt-PT': {
    kicker: 'Aura · Médica Virtual', status: 'voz ativa · escuta clínica empática',
    lines: [
      'Olá. Eu sou a Aura, a médica virtual da IconsAI.',
      'Vou ouvir com calma, organizar o seu relato e destacar o que pode merecer atenção médica mais rápida.',
      'Enquanto fala, estou a estruturar cada sintoma, a cruzar com evidência clínica e a identificar sinais de alarme em tempo real.',
      'No fim, recebe um resumo clínico claro para prosseguir o atendimento sem perder o contexto.',
      'Tudo o que disser fica protegido por encriptação ponta a ponta e segue as diretrizes do RGPD-Saúde.',
      'Quanto mais natural for o seu relato, mais preciso fica o meu raciocínio clínico — fale ao seu ritmo, sem se preocupar com termos.',
      'Pode começar quando quiser — estou aqui para o ouvir.',
    ],
    sideKicker1: 'o que faz enquanto fala',
    side1: ['a estruturar os sintomas principais', 'a detetar sinais de alarme no relato', 'a preparar perguntas de seguimento', 'a correlacionar com evidência médica'],
    sideKicker2: 'camadas do fluxo', chips: ['anamnese', 'evidência médica', 'laudo SOAP'],
    micLabel: 'escuta ativa em tempo real',
  },
  en: {
    kicker: 'Aura · Virtual Physician', status: 'voice active · empathetic clinical listening',
    lines: [
      'Hi. I\'m Aura, the virtual physician from IconsAI.',
      'I\'ll listen carefully, organize your account, and flag what may deserve faster medical attention.',
      'While you speak, I\'m structuring each symptom, cross-referencing clinical evidence, and identifying warning signs in real time.',
      'At the end, you get a clear clinical summary to continue care without losing context.',
      'Everything you share is protected by end-to-end encryption and follows HIPAA compliance standards.',
      'The more natural your account, the sharper my clinical reasoning — speak at your own pace, no medical terms needed.',
      'You can start whenever you\'re ready — I\'m here to listen.',
    ],
    sideKicker1: 'what she does while you talk',
    side1: ['structuring the main symptoms', 'detecting red flags in the account', 'preparing follow-up questions', 'cross-referencing medical evidence'],
    sideKicker2: 'flow layers', chips: ['intake', 'medical evidence', 'SOAP report'],
    micLabel: 'active real-time listening',
  },
} satisfies L10n<S4>

/* ───────────────────────── StepIndicator (compartilhado) ───────────────────────── */
export const STEPS = {
  'pt-BR': ['Você', 'O problema', 'Entrevista', 'Laudo'],
  'pt-PT': ['Si', 'O problema', 'Entrevista', 'Laudo'],
  en: ['You', 'The problem', 'Interview', 'Report'],
} satisfies L10n<string[]>

/* ───────────────────────── S5 · ÁUDIO LIVRE ───────────────────────── */
type S5 = { title: string; subtitle: string; status: string; timer: string }
export const S5 = {
  'pt-BR': { title: 'Fernando, conta o que está te incomodando.', subtitle: 'Em até 2 minutos, fale como sente. Não precisa usar termo técnico.', status: 'gravando · escutando você', timer: '00:47 / 02:00' },
  'pt-PT': { title: 'Fernando, conte o que o está a incomodar.', subtitle: 'Em até 2 minutos, fale como se sente. Não precisa de termo técnico.', status: 'a gravar · a ouvi-lo', timer: '00:47 / 02:00' },
  en: { title: 'Fernando, tell me what\'s bothering you.', subtitle: 'In up to 2 minutes, say how you feel. No medical terms needed.', status: 'recording · listening to you', timer: '00:47 / 02:00' },
} satisfies L10n<S5>

/* ───────────────────────── S6 · AURA PERGUNTA ───────────────────────── */
type S6 = {
  kicker: string; status: string; lines: string[]; chipsKicker: string; chips: string[]
  sideKicker1: string; side1: string[]; sideKicker2: string; side2: string[]
  micLabel: string
}
export const S6 = {
  'pt-BR': {
    kicker: 'Aura · escutou você', status: 'pergunta adaptativa · contexto emocional preservado',
    lines: [
      'Entendi. Você descreveu cefaleia pulsátil há 3 dias, piorando à tarde e sensível à luz.',
      'Parece algo que está te tirando do eixo. Normalmente nessas crises você consegue continuar trabalhando ou precisa parar tudo e deitar?',
      'Preciso entender o impacto real no seu dia a dia — isso muda a classificação de urgência e o tipo de encaminhamento.',
      'Também vou perguntar sobre sono, hidratação e tempo de tela, porque alteram o limiar de dor de forma significativa.',
    ],
    chipsKicker: 'resposta rápida', chips: ['Continuo, com dificuldade', 'Preciso parar e deitar', 'Depende da intensidade'],
    sideKicker1: 'sinais extraídos', side1: ['dor 6/10 com piora vespertina', 'fotossensibilidade presente', 'tela longa como gatilho provável', 'sem náusea ou aura visual'],
    sideKicker2: 'próximo objetivo', side2: ['medir impacto funcional e sono', 'decidir se sobe urgência clínica', 'avaliar padrão de hidratação'],
    micLabel: 'ouvindo e ajustando a pergunta',
  },
  'pt-PT': {
    kicker: 'Aura · ouviu-o', status: 'pergunta adaptativa · contexto emocional preservado',
    lines: [
      'Percebi. Descreveu cefaleia pulsátil há 3 dias, a piorar à tarde e sensível à luz.',
      'Parece algo que o está a desequilibrar. Normalmente nessas crises consegue continuar a trabalhar ou precisa de parar tudo e deitar-se?',
      'Preciso de perceber o impacto real no seu dia a dia — isso altera a classificação de urgência e o tipo de encaminhamento.',
      'Também vou perguntar sobre sono, hidratação e tempo de ecrã, porque alteram o limiar de dor de forma significativa.',
    ],
    chipsKicker: 'resposta rápida', chips: ['Continuo, com dificuldade', 'Preciso de parar e deitar-me', 'Depende da intensidade'],
    sideKicker1: 'sinais extraídos', side1: ['dor 6/10 com agravamento vespertino', 'fotossensibilidade presente', 'ecrã prolongado como gatilho provável', 'sem náusea ou aura visual'],
    sideKicker2: 'próximo objetivo', side2: ['medir impacto funcional e sono', 'decidir se aumenta a urgência clínica', 'avaliar padrão de hidratação'],
    micLabel: 'a ouvir e a ajustar a pergunta',
  },
  en: {
    kicker: 'Aura · heard you', status: 'adaptive question · emotional context preserved',
    lines: [
      'Got it. You described a pulsating headache for 3 days, worse in the afternoon and sensitive to light.',
      'It sounds like it\'s throwing you off. Normally during these episodes, can you keep working or do you need to stop everything and lie down?',
      'I need to understand the real impact on your daily life — that changes the urgency classification and the referral type.',
      'I\'ll also ask about sleep, hydration, and screen time, as they significantly affect the pain threshold.',
    ],
    chipsKicker: 'quick reply', chips: ['I keep going, with difficulty', 'I need to stop and lie down', 'Depends on the intensity'],
    sideKicker1: 'extracted signals', side1: ['pain 6/10 worsening in the afternoon', 'photosensitivity present', 'long screen time as likely trigger', 'no nausea or visual aura'],
    sideKicker2: 'next objective', side2: ['measure functional impact and sleep', 'decide whether to raise clinical urgency', 'assess hydration pattern'],
    micLabel: 'listening and adapting',
  },
} satisfies L10n<S6>

/* ───────────────────────── S7 · FISIOLÓGICO ───────────────────────── */
type S7 = {
  kicker: string; title: string; subtitle: string
  vitals: [string, string, string][]; tags: { tone: 'ok' | 'warn'; text: string }[]
  painLabel: string; painValue: string
}
export const S7 = {
  'pt-BR': {
    kicker: 'sinais vitais', title: 'Confere os dados fisiológicos.', subtitle: 'Tudo que puder medir ajuda. Não tem? Marca "Não sei" e segue.',
    vitals: [['Peso', '72', 'kg'], ['Altura', '175', 'cm'], ['PA sis.', '128', 'mmHg'], ['PA dia.', '82', 'mmHg'], ['Freq. card.', '74', 'bpm'], ['Glicemia', '94', 'mg/dL']],
    tags: [{ tone: 'ok', text: 'IMC 23.5 · Eutrofia' }, { tone: 'warn', text: 'PA 128/82 · Pré-hipertensão' }, { tone: 'ok', text: 'FC 74 · Normal' }],
    painLabel: 'Dor agora (0–10)', painValue: '6/10',
  },
  'pt-PT': {
    kicker: 'sinais vitais', title: 'Confirme os dados fisiológicos.', subtitle: 'Tudo o que puder medir ajuda. Não tem? Marque "Não sei" e prossiga.',
    vitals: [['Peso', '72', 'kg'], ['Altura', '175', 'cm'], ['TA sis.', '128', 'mmHg'], ['TA dia.', '82', 'mmHg'], ['Freq. card.', '74', 'bpm'], ['Glicemia', '94', 'mg/dL']],
    tags: [{ tone: 'ok', text: 'IMC 23.5 · Normoponderal' }, { tone: 'warn', text: 'TA 128/82 · Pré-hipertensão' }, { tone: 'ok', text: 'FC 74 · Normal' }],
    painLabel: 'Dor agora (0–10)', painValue: '6/10',
  },
  en: {
    kicker: 'vital signs', title: 'Confirm your physiological data.', subtitle: 'Whatever you can measure helps. Don\'t have it? Mark "Not sure" and move on.',
    vitals: [['Weight', '159', 'lb'], ['Height', '5\'9"', ''], ['BP sys.', '128', 'mmHg'], ['BP dia.', '82', 'mmHg'], ['Heart rate', '74', 'bpm'], ['Glucose', '94', 'mg/dL']],
    tags: [{ tone: 'ok', text: 'BMI 23.5 · Normal weight' }, { tone: 'warn', text: 'BP 128/82 · Elevated' }, { tone: 'ok', text: 'HR 74 · Normal' }],
    painLabel: 'Pain now (0–10)', painValue: '6/10',
  },
} satisfies L10n<S7>

/* ───────────────────────── S8 · AUTO-EXAMES ───────────────────────── */
type S8 = {
  kicker: string; title: string; subtitle: string
  exams: { pict: MedIconKey; title: string; guia: string; selected?: boolean }[]
  guideKicker: string; guidePill: string; previewBadge: string; lesionLabel: string; lesion: string; lesionNote: string
  steps: string[]
  // Pele · ABCDE guided self-exam (bottom-half animation)
  bodyMapTitle: string; bodyMapNote: string; bodyRegions: string[]
  abcdeTitle: string; abcde: { k: string; name: string; desc: string }[]
}
export const S8 = {
  'pt-BR': {
    kicker: 'biblioteca · auto-exames guiados', title: 'Quais você quer fazer agora?', subtitle: 'Marque os auto-exames. Cada um vem com guia visual passo a passo.',
    exams: [
      { pict: 'breast', title: 'Mama', guia: 'palpação circular', selected: true }, { pict: 'prostate', title: 'Próstata', guia: 'toque retal orientado' },
      { pict: 'skin', title: 'Pele', guia: 'ABCDE de melanoma', selected: true }, { pict: 'tongue', title: 'Língua', guia: 'cor, saburra, textura' },
      { pict: 'pulse', title: 'Pulso', guia: '15s × 4 (radial)', selected: true }, { pict: 'lung', title: 'SpO₂', guia: 'oxímetro de dedo' },
      { pict: 'mouth', title: 'Boca', guia: 'mucosa, gengiva, palato' }, { pict: 'testicle', title: 'Testículo', guia: 'palpação pós-banho' },
    ],
    guideKicker: 'guia ativo', guidePill: 'Pele · ABCDE', previewBadge: 'captura orientada', lesionLabel: 'lesão', lesion: '8 mm', lesionNote: 'borda irregular',
    steps: ['assimetria visível na metade direita', 'borda com serrilhado discreto', 'cor heterogênea em 2 tons', 'registrar foto e seguir para upload'],
    bodyMapTitle: 'como examinar', bodyMapNote: 'Toda a pele, com espelho — do couro cabeludo às solas dos pés.',
    bodyRegions: ['couro cabeludo', 'rosto e pescoço', 'tronco e mamas', 'braços e mãos', 'pernas', 'pés e entre dedos', 'costas no espelho'],
    abcdeTitle: 'regra ABCDE do melanoma',
    abcde: [
      { k: 'A', name: 'Assimetria', desc: 'metades diferentes' },
      { k: 'B', name: 'Borda', desc: 'irregular, serrilhada' },
      { k: 'C', name: 'Cor', desc: 'mais de um tom' },
      { k: 'D', name: 'Diâmetro', desc: 'maior que 6 mm' },
      { k: 'E', name: 'Evolução', desc: 'muda com o tempo' },
    ],
  },
  'pt-PT': {
    kicker: 'biblioteca · auto-exames guiados', title: 'Quais quer fazer agora?', subtitle: 'Marque os auto-exames. Cada um traz guia visual passo a passo.',
    exams: [
      { pict: 'breast', title: 'Mama', guia: 'palpação circular', selected: true }, { pict: 'prostate', title: 'Próstata', guia: 'toque retal orientado' },
      { pict: 'skin', title: 'Pele', guia: 'ABCDE de melanoma', selected: true }, { pict: 'tongue', title: 'Língua', guia: 'cor, saburra, textura' },
      { pict: 'pulse', title: 'Pulso', guia: '15s × 4 (radial)', selected: true }, { pict: 'lung', title: 'SpO₂', guia: 'oxímetro de dedo' },
      { pict: 'mouth', title: 'Boca', guia: 'mucosa, gengiva, palato' }, { pict: 'testicle', title: 'Testículo', guia: 'palpação pós-banho' },
    ],
    guideKicker: 'guia ativo', guidePill: 'Pele · ABCDE', previewBadge: 'captura orientada', lesionLabel: 'lesão', lesion: '8 mm', lesionNote: 'bordo irregular',
    steps: ['assimetria visível na metade direita', 'bordo com serrilhado discreto', 'cor heterogénea em 2 tons', 'registar foto e seguir para o carregamento'],
    bodyMapTitle: 'como examinar', bodyMapNote: 'Toda a pele, com espelho — do couro cabeludo às plantas dos pés.',
    bodyRegions: ['couro cabeludo', 'rosto e pescoço', 'tronco e mamas', 'braços e mãos', 'pernas', 'pés e entre dedos', 'costas no espelho'],
    abcdeTitle: 'regra ABCDE do melanoma',
    abcde: [
      { k: 'A', name: 'Assimetria', desc: 'metades diferentes' },
      { k: 'B', name: 'Bordo', desc: 'irregular, serrilhado' },
      { k: 'C', name: 'Cor', desc: 'mais de um tom' },
      { k: 'D', name: 'Diâmetro', desc: 'maior que 6 mm' },
      { k: 'E', name: 'Evolução', desc: 'muda com o tempo' },
    ],
  },
  en: {
    kicker: 'library · guided self-exams', title: 'Which ones now?', subtitle: 'Select the self-exams. Each comes with a step-by-step visual guide.',
    exams: [
      { pict: 'breast', title: 'Breast', guia: 'circular palpation', selected: true }, { pict: 'prostate', title: 'Prostate', guia: 'guided exam' },
      { pict: 'skin', title: 'Skin', guia: 'melanoma ABCDE', selected: true }, { pict: 'tongue', title: 'Tongue', guia: 'color, coating, texture' },
      { pict: 'pulse', title: 'Pulse', guia: '15s × 4 (radial)', selected: true }, { pict: 'lung', title: 'SpO₂', guia: 'finger oximeter' },
      { pict: 'mouth', title: 'Mouth', guia: 'mucosa, gums, palate' }, { pict: 'testicle', title: 'Testicle', guia: 'post-shower palpation' },
    ],
    guideKicker: 'active guide', guidePill: 'Skin · ABCDE', previewBadge: 'guided capture', lesionLabel: 'lesion', lesion: '8 mm', lesionNote: 'irregular border',
    steps: ['visible asymmetry on the right half', 'subtly serrated border', 'heterogeneous color in 2 tones', 'capture photo and go to upload'],
    bodyMapTitle: 'how to examine', bodyMapNote: 'All your skin, with a mirror — scalp to soles.',
    bodyRegions: ['scalp', 'face and neck', 'trunk and breasts', 'arms and hands', 'legs', 'feet and between toes', 'back in mirror'],
    abcdeTitle: 'melanoma ABCDE rule',
    abcde: [
      { k: 'A', name: 'Asymmetry', desc: 'halves differ' },
      { k: 'B', name: 'Border', desc: 'irregular, notched' },
      { k: 'C', name: 'Color', desc: 'more than one shade' },
      { k: 'D', name: 'Diameter', desc: 'over 6 mm' },
      { k: 'E', name: 'Evolving', desc: 'changes over time' },
    ],
  },
} satisfies L10n<S8>

/* ───────────────────────── S9 · UPLOAD EXAMES ───────────────────────── */
type S9 = {
  kicker: string; title: string; subtitle: string; dropText: string; dropHint: string
  files: { name: string; meta: string; state: 'ok' | 'loading' | 'pending' }[]
}
export const S9 = {
  'pt-BR': {
    kicker: 'exames laboratoriais / imagem', title: 'Trouxe exames?', subtitle: 'Sobe PDF, JPG ou PNG até 20MB cada. Eu leio e uso pra montar seu laudo.',
    dropText: 'Solte aqui ou escolha arquivos', dropHint: 'PDF, JPG, PNG · até 20 MB cada',
    files: [
      { name: 'hemograma_2026-03.pdf', meta: '412 KB · ✓ analisado', state: 'ok' },
      { name: 'colesterol_total.pdf', meta: '238 KB · lendo o exame...', state: 'loading' },
      { name: 'ressonancia_cranio.jpg', meta: '3.2 MB · aguardando análise', state: 'pending' },
    ],
  },
  'pt-PT': {
    kicker: 'exames laboratoriais / imagem', title: 'Trouxe exames?', subtitle: 'Carregue PDF, JPG ou PNG até 20 MB cada. Eu leio e uso para montar o seu laudo.',
    dropText: 'Largue aqui ou escolha ficheiros', dropHint: 'PDF, JPG, PNG · até 20 MB cada',
    files: [
      { name: 'hemograma_2026-03.pdf', meta: '412 KB · ✓ analisado', state: 'ok' },
      { name: 'colesterol_total.pdf', meta: '238 KB · a ler o exame...', state: 'loading' },
      { name: 'ressonancia_cranio.jpg', meta: '3,2 MB · a aguardar análise', state: 'pending' },
    ],
  },
  en: {
    kicker: 'lab / imaging results', title: 'Brought any results?', subtitle: 'Upload PDF, JPG, or PNG up to 20MB each. I read them to build your report.',
    dropText: 'Drop here or choose files', dropHint: 'PDF, JPG, PNG · up to 20 MB each',
    files: [
      { name: 'cbc_2026-03.pdf', meta: '412 KB · ✓ analyzed', state: 'ok' },
      { name: 'total_cholesterol.pdf', meta: '238 KB · reading the report...', state: 'loading' },
      { name: 'brain_mri.jpg', meta: '3.2 MB · awaiting analysis', state: 'pending' },
    ],
  },
} satisfies L10n<S9>

/* ───────────────────────── S10 · REMÉDIOS ───────────────────────── */
type S10 = {
  kicker: string; title: string; subtitle: string
  meds: { nome: string; classe: string; selected?: boolean; dose?: string; freq?: string }[]
}
export const S10 = {
  'pt-BR': {
    kicker: 'medicações em uso', title: 'Fernando, marca o que você usa.', subtitle: 'Listei os remédios que casam com o áudio que você me contou.',
    meds: [
      { nome: 'Dipirona 500mg', classe: 'Analgésico · Antipirético', selected: true, dose: '1 cp', freq: 'se dor' },
      { nome: 'Losartana 50mg', classe: 'Anti-hipertensivo · ARB', selected: true, dose: '1 cp', freq: '1x/dia' },
      { nome: 'Sertralina 50mg', classe: 'Antidepressivo · ISRS' },
      { nome: 'Omeprazol 20mg', classe: 'Inibidor de bomba de prótons' },
    ],
  },
  'pt-PT': {
    kicker: 'medicação em uso', title: 'Fernando, marque o que toma.', subtitle: 'Listei os medicamentos que coincidem com o áudio que me contou.',
    meds: [
      { nome: 'Paracetamol 1g', classe: 'Analgésico · Antipirético', selected: true, dose: '1 comp.', freq: 'se dor' },
      { nome: 'Losartan 50mg', classe: 'Anti-hipertensor · ARA', selected: true, dose: '1 comp.', freq: '1x/dia' },
      { nome: 'Sertralina 50mg', classe: 'Antidepressivo · ISRS' },
      { nome: 'Omeprazol 20mg', classe: 'Inibidor da bomba de protões' },
    ],
  },
  en: {
    kicker: 'current medications', title: 'Fernando, check what you take.', subtitle: 'I listed the medications that match the audio you shared with me.',
    meds: [
      { nome: 'Acetaminophen 500mg', classe: 'Analgesic · Antipyretic', selected: true, dose: '1 tab', freq: 'as needed' },
      { nome: 'Losartan 50mg', classe: 'Antihypertensive · ARB', selected: true, dose: '1 tab', freq: 'once daily' },
      { nome: 'Sertraline 50mg', classe: 'Antidepressant · SSRI' },
      { nome: 'Omeprazole 20mg', classe: 'Proton-pump inhibitor' },
    ],
  },
} satisfies L10n<S10>

/* ───────────────────────── S11 · CHAT ───────────────────────── */
type S11 = {
  pct: string; quoteCite: string
  messages: { who: 'agent' | 'patient' | 'quote'; text: string }[]
  typingLabel: string; composeLine: string
  sideKicker1: string; side1: string[]; sideKicker2: string; side2: string[]
}
export const S11 = {
  'pt-BR': {
    pct: '68%', quoteCite: 'citei do áudio:',
    messages: [
      { who: 'agent', text: 'Quando essa dor aperta mais — manhã, tarde, noite?' },
      { who: 'quote', text: 'piora muito à tarde quando o computador esquenta' },
      { who: 'patient', text: 'Sempre depois do almoço. Umas 14h começa e vai até as 18.' },
      { who: 'agent', text: 'E o sono? Está conseguindo descansar bem?' },
      { who: 'patient', text: 'Durmo mal. Acordo 2 ou 3 vezes e custo a voltar.' },
      { who: 'agent', text: 'Toma água ao longo do dia ou esquece quando foca no trabalho?' },
      { who: 'patient', text: 'Esqueço total. Às vezes passo a manhã sem beber nada.' },
    ],
    typingLabel: 'Aura está digitando a próxima pergunta', composeLine: 'Você percebe alguma náusea, visão borrada ou necessidade de deitar quando a crise fica mais forte?',
    sideKicker1: 'insights em paralelo', side1: ['dor com padrão vespertino', 'fotossensibilidade relatada', 'trabalho em tela como possível gatilho'],
    sideKicker2: 'próximo bloco', side2: ['fechar intensidade + impacto no sono', 'decidir se pede exame complementar'],
  },
  'pt-PT': {
    pct: '68%', quoteCite: 'citei do áudio:',
    messages: [
      { who: 'agent', text: 'Quando é que essa dor aperta mais — manhã, tarde, noite?' },
      { who: 'quote', text: 'piora muito à tarde quando o computador aquece' },
      { who: 'patient', text: 'Sempre depois do almoço. Por volta das 14h começa e vai até às 18.' },
      { who: 'agent', text: 'E o sono? Está a conseguir descansar bem?' },
      { who: 'patient', text: 'Durmo mal. Acordo 2 ou 3 vezes e custa-me voltar a adormecer.' },
      { who: 'agent', text: 'Bebe água ao longo do dia ou esquece-se quando está focado no trabalho?' },
      { who: 'patient', text: 'Esqueço-me por completo. Às vezes passo a manhã sem beber nada.' },
    ],
    typingLabel: 'A Aura está a escrever a próxima pergunta', composeLine: 'Nota alguma náusea, visão turva ou necessidade de se deitar quando a crise fica mais forte?',
    sideKicker1: 'insights em paralelo', side1: ['dor com padrão vespertino', 'fotossensibilidade relatada', 'trabalho ao ecrã como possível gatilho'],
    sideKicker2: 'próximo bloco', side2: ['fechar intensidade + impacto no sono', 'decidir se pede exame complementar'],
  },
  en: {
    pct: '68%', quoteCite: 'quoted from the audio:',
    messages: [
      { who: 'agent', text: 'When does the pain peak — morning, afternoon, night?' },
      { who: 'quote', text: 'it gets much worse in the afternoon when the computer heats up' },
      { who: 'patient', text: 'Always after lunch. Around 2 p.m. it starts and runs until 6.' },
      { who: 'agent', text: 'And sleep? Are you getting good rest?' },
      { who: 'patient', text: 'I sleep badly. I wake up 2 or 3 times and struggle to fall back.' },
      { who: 'agent', text: 'Do you drink water through the day or forget when you focus on work?' },
      { who: 'patient', text: 'I forget completely. Sometimes I go all morning without drinking.' },
    ],
    typingLabel: 'Aura is typing the next question', composeLine: 'Do you notice any nausea, blurred vision, or a need to lie down when the episode gets stronger?',
    sideKicker1: 'insights in parallel', side1: ['pain with an afternoon pattern', 'photosensitivity reported', 'screen work as a possible trigger'],
    sideKicker2: 'next block', side2: ['close intensity + sleep impact', 'decide whether to order further tests'],
  },
} satisfies L10n<S11>

/* ───────────────────────── S12 · LAUDO SOAP ───────────────────────── */
type S12 = {
  stampKicker: string; stampMeta: string; selo: string
  soap: { letter: string; title: string; text: string; reveal: string }[]
  agendaTitle: string; cal: { label: string; full: boolean }[]
  stockTitle: string; stock: { label: string; pct: string; warn?: boolean; restock?: boolean }[]
  audioTitle: string; audioTime: string
}
export const S12 = {
  'pt-BR': {
    stampKicker: 'laudo pronto', stampMeta: 'Token público · 15/05/2026 14:32', selo: 'LGPD-Saúde · ANS',
    soap: [
      { letter: 'S', title: 'Subjetivo', text: 'Cefaleia pulsátil há 3 dias, piora à tarde, sensibilidade à luz. Dor 6/10.', reveal: 'dh-reveal-s' },
      { letter: 'O', title: 'Objetivo', text: 'PA 128/82 · FC 74 · IMC 23.5 · hemograma normal · auto-relato 6/10.', reveal: 'dh-reveal-o' },
      { letter: 'A', title: 'Avaliação', text: 'Cefaleia tensional + fadiga visual digital. DD: enxaqueca sem aura.', reveal: 'dh-reveal-a' },
      { letter: 'P', title: 'Plano', text: 'Higiene visual (20-20-20). Reavaliar PA em 7 dias. Encaminhar se persistir.', reveal: 'dh-reveal-p' },
    ],
    agendaTitle: 'Agenda organizada', cal: [{ label: '14h', full: true }, { label: '15h', full: true }, { label: '16h', full: false }, { label: '17h', full: true }, { label: '18h', full: false }],
    stockTitle: 'Estoque · auto-restock', stock: [{ label: 'Dipirona', pct: '74%', warn: false }, { label: 'Luvas P', pct: '22% ↻', warn: true, restock: true }],
    audioTitle: 'Resumo paciente · áudio', audioTime: '1:42',
  },
  'pt-PT': {
    stampKicker: 'laudo pronto', stampMeta: 'Ligação pública · 15/05/2026 14:32', selo: 'RGPD · SNS',
    soap: [
      { letter: 'S', title: 'Subjetivo', text: 'Cefaleia pulsátil há 3 dias, piora à tarde, sensibilidade à luz. Dor 6/10.', reveal: 'dh-reveal-s' },
      { letter: 'O', title: 'Objetivo', text: 'TA 128/82 · FC 74 · IMC 23.5 · hemograma normal · autorrelato 6/10.', reveal: 'dh-reveal-o' },
      { letter: 'A', title: 'Avaliação', text: 'Cefaleia de tensão + fadiga visual digital. DD: enxaqueca sem aura.', reveal: 'dh-reveal-a' },
      { letter: 'P', title: 'Plano', text: 'Higiene visual (20-20-20). Reavaliar TA em 7 dias. Encaminhar se persistir.', reveal: 'dh-reveal-p' },
    ],
    agendaTitle: 'Agenda organizada', cal: [{ label: '14h', full: true }, { label: '15h', full: true }, { label: '16h', full: false }, { label: '17h', full: true }, { label: '18h', full: false }],
    stockTitle: 'Stock · reposição automática', stock: [{ label: 'Paracetamol', pct: '74%', warn: false }, { label: 'Luvas P', pct: '22% ↻', warn: true, restock: true }],
    audioTitle: 'Resumo do doente · áudio', audioTime: '1:42',
  },
  en: {
    stampKicker: 'report ready', stampMeta: 'Public token · 05/15/2026 2:32 p.m.', selo: 'HIPAA',
    soap: [
      { letter: 'S', title: 'Subjective', text: 'Pulsating headache for 3 days, worse in the afternoon, light sensitivity. Pain 6/10.', reveal: 'dh-reveal-s' },
      { letter: 'O', title: 'Objective', text: 'BP 128/82 · HR 74 · BMI 23.5 · normal CBC · self-report 6/10.', reveal: 'dh-reveal-o' },
      { letter: 'A', title: 'Assessment', text: 'Tension headache + digital eye strain. DDx: migraine without aura.', reveal: 'dh-reveal-a' },
      { letter: 'P', title: 'Plan', text: 'Visual hygiene (20-20-20). Recheck BP in 7 days. Refer if it persists.', reveal: 'dh-reveal-p' },
    ],
    agendaTitle: 'Schedule organized', cal: [{ label: '2pm', full: true }, { label: '3pm', full: true }, { label: '4pm', full: false }, { label: '5pm', full: true }, { label: '6pm', full: false }],
    stockTitle: 'Inventory · auto-restock', stock: [{ label: 'Acetaminophen', pct: '74%', warn: false }, { label: 'Gloves S', pct: '22% ↻', warn: true, restock: true }],
    audioTitle: 'Patient summary · audio', audioTime: '1:42',
  },
} satisfies L10n<S12>

/* ───────────────────────── S13 · AGENDA ───────────────────────── */
type Slot = { label: string; state: 'full' | 'open' | 'drop' }
type S13 = {
  kicker: string; title: string; subtitle: string
  head: string[]; rows: { turno: string; slots: Slot[] }[]
  waConfirm: string; waMeta: string
}
export const S13 = {
  'pt-BR': {
    kicker: 'agenda · semana corrente', title: 'Arraste o paciente para o slot.', subtitle: 'Confirmação automática via WhatsApp. Sem ligação, sem retrabalho.',
    head: ['Turno', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    rows: [
      { turno: 'Manhã', slots: [{ label: 'M.Silva', state: 'full' }, { label: 'R.Souza', state: 'full' }, { label: 'livre', state: 'open' }, { label: 'A.Costa', state: 'full' }, { label: 'livre', state: 'open' }] },
      { turno: 'Tarde', slots: [{ label: 'P.Lima', state: 'full' }, { label: 'Fernando ⇣', state: 'drop' }, { label: 'J.Alves', state: 'full' }, { label: 'livre', state: 'open' }, { label: 'B.Rocha', state: 'full' }] },
      { turno: 'Noite', slots: [{ label: 'livre', state: 'open' }, { label: 'L.Mendes', state: 'full' }, { label: 'livre', state: 'open' }, { label: 'T.Pinto', state: 'full' }, { label: 'livre', state: 'open' }] },
    ],
    waConfirm: '✓ Confirmado por WhatsApp', waMeta: 'Fernando · Ter 14h00 · lembrete 24h antes',
  },
  'pt-PT': {
    kicker: 'agenda · semana corrente', title: 'Arraste o doente para o horário.', subtitle: 'Confirmação automática via WhatsApp. Sem telefonema, sem retrabalho.',
    head: ['Turno', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    rows: [
      { turno: 'Manhã', slots: [{ label: 'M.Silva', state: 'full' }, { label: 'R.Sousa', state: 'full' }, { label: 'livre', state: 'open' }, { label: 'A.Costa', state: 'full' }, { label: 'livre', state: 'open' }] },
      { turno: 'Tarde', slots: [{ label: 'P.Lima', state: 'full' }, { label: 'Fernando ⇣', state: 'drop' }, { label: 'J.Alves', state: 'full' }, { label: 'livre', state: 'open' }, { label: 'B.Rocha', state: 'full' }] },
      { turno: 'Noite', slots: [{ label: 'livre', state: 'open' }, { label: 'L.Mendes', state: 'full' }, { label: 'livre', state: 'open' }, { label: 'T.Pinto', state: 'full' }, { label: 'livre', state: 'open' }] },
    ],
    waConfirm: '✓ Confirmado por WhatsApp', waMeta: 'Fernando · Ter 14h00 · lembrete 24h antes',
  },
  en: {
    kicker: 'schedule · current week', title: 'Drag the patient to the slot.', subtitle: 'Automatic confirmation by text. No phone call, no rework.',
    head: ['Shift', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    rows: [
      { turno: 'Morning', slots: [{ label: 'M.Smith', state: 'full' }, { label: 'R.Jones', state: 'full' }, { label: 'free', state: 'open' }, { label: 'A.Brown', state: 'full' }, { label: 'free', state: 'open' }] },
      { turno: 'Afternoon', slots: [{ label: 'P.Davis', state: 'full' }, { label: 'Fernando ⇣', state: 'drop' }, { label: 'J.Wilson', state: 'full' }, { label: 'free', state: 'open' }, { label: 'B.Taylor', state: 'full' }] },
      { turno: 'Evening', slots: [{ label: 'free', state: 'open' }, { label: 'L.Moore', state: 'full' }, { label: 'free', state: 'open' }, { label: 'T.Clark', state: 'full' }, { label: 'free', state: 'open' }] },
    ],
    waConfirm: '✓ Confirmed by text', waMeta: 'Fernando · Tue 2:00pm · reminder 24h ahead',
  },
} satisfies L10n<S13>

/* ───────────────────────── S14 · FATURAMENTO ───────────────────────── */
type S14 = {
  kicker: string; title: string; subtitle: string
  bars: { label: string; prev: number; real: number; prevK: string; realK: string; pending?: boolean }[]
  stats: { k: string; v: string; tone?: 'ok' | 'warn' }[]
}
export const S14 = {
  'pt-BR': {
    kicker: 'financeiro · próximas 4 semanas', title: 'Previsto vs realizado.', subtitle: 'Curva real cruzada com agenda confirmada. Identifica gap antes de fechar o mês.',
    bars: [
      { label: 'S1', prev: 62, real: 58, prevK: 'R$ 62k', realK: 'R$ 58k' }, { label: 'S2', prev: 71, real: 69, prevK: 'R$ 71k', realK: 'R$ 69k' },
      { label: 'S3', prev: 68, real: 72, prevK: 'R$ 68k', realK: 'R$ 72k' }, { label: 'S4', prev: 84, real: 0, prevK: 'R$ 84k', realK: '—', pending: true },
    ],
    stats: [{ k: 'Ticket médio', v: 'R$ 312' }, { k: 'Cancelamentos', v: '8,4%', tone: 'warn' }, { k: 'Realizado / Previsto', v: '96,2%' }, { k: 'Projeção mês', v: 'R$ 285k', tone: 'ok' }],
  },
  'pt-PT': {
    kicker: 'financeiro · próximas 4 semanas', title: 'Previsto vs realizado.', subtitle: 'Curva real cruzada com agenda confirmada. Identifica o desvio antes de fechar o mês.',
    bars: [
      { label: 'S1', prev: 62, real: 58, prevK: '€ 12k', realK: '€ 11k' }, { label: 'S2', prev: 71, real: 69, prevK: '€ 14k', realK: '€ 13k' },
      { label: 'S3', prev: 68, real: 72, prevK: '€ 13k', realK: '€ 14k' }, { label: 'S4', prev: 84, real: 0, prevK: '€ 16k', realK: '—', pending: true },
    ],
    stats: [{ k: 'Bilhete médio', v: '€ 60' }, { k: 'Cancelamentos', v: '8,4%', tone: 'warn' }, { k: 'Realizado / Previsto', v: '96,2%' }, { k: 'Projeção do mês', v: '€ 54k', tone: 'ok' }],
  },
  en: {
    kicker: 'finance · next 4 weeks', title: 'Forecast vs actual.', subtitle: 'Actual curve cross-checked with the confirmed schedule. Spots the gap before month-end.',
    bars: [
      { label: 'W1', prev: 62, real: 58, prevK: '$ 14k', realK: '$ 13k' }, { label: 'W2', prev: 71, real: 69, prevK: '$ 16k', realK: '$ 15k' },
      { label: 'W3', prev: 68, real: 72, prevK: '$ 15k', realK: '$ 16k' }, { label: 'W4', prev: 84, real: 0, prevK: '$ 18k', realK: '—', pending: true },
    ],
    stats: [{ k: 'Avg ticket', v: '$ 68' }, { k: 'Cancellations', v: '8.4%', tone: 'warn' }, { k: 'Actual / Forecast', v: '96.2%' }, { k: 'Month projection', v: '$ 62k', tone: 'ok' }],
  },
} satisfies L10n<S14>

/* ───────────────────────── S15 · ALMOXARIFADO ───────────────────────── */
type StockTone = 'ok' | 'low' | 'critical'
type S15 = {
  kicker: string; title: string; subtitle: string
  th: string[]; rows: { item: string; atual: string; min: string; sug: string; status: StockTone }[]
  badge: string; info: string
}
export const S15 = {
  'pt-BR': {
    kicker: 'estoque · materiais clínicos', title: 'Almoxarifado — visão por item.', subtitle: 'Vermelho = abaixo do mínimo. Sugestão de compra calculada por consumo médio das 4 últimas semanas.',
    th: ['Item', 'Atual', 'Mínimo', 'Sugestão', 'Status'],
    rows: [
      { item: 'Luvas P (cx 100)', atual: '22', min: '40', sug: '80', status: 'low' }, { item: 'Seringa 10mL', atual: '184', min: '60', sug: '—', status: 'ok' },
      { item: 'Gaze estéril', atual: '38', min: '50', sug: '120', status: 'low' }, { item: 'Álcool 70% 1L', atual: '62', min: '20', sug: '—', status: 'ok' },
      { item: 'Máscara N95', atual: '9', min: '30', sug: '100', status: 'critical' },
    ],
    badge: 'Auto-restock ativo · 3 itens em pedido', info: 'Fornecedor padrão · Cremer · entrega em 2 dias úteis',
  },
  'pt-PT': {
    kicker: 'stock · materiais clínicos', title: 'Armazém — visão por artigo.', subtitle: 'Vermelho = abaixo do mínimo. Sugestão de compra calculada pelo consumo médio das últimas 4 semanas.',
    th: ['Artigo', 'Atual', 'Mínimo', 'Sugestão', 'Estado'],
    rows: [
      { item: 'Luvas P (cx 100)', atual: '22', min: '40', sug: '80', status: 'low' }, { item: 'Seringa 10mL', atual: '184', min: '60', sug: '—', status: 'ok' },
      { item: 'Compressa esterilizada', atual: '38', min: '50', sug: '120', status: 'low' }, { item: 'Álcool 70% 1L', atual: '62', min: '20', sug: '—', status: 'ok' },
      { item: 'Máscara FFP2', atual: '9', min: '30', sug: '100', status: 'critical' },
    ],
    badge: 'Reposição automática ativa · 3 artigos encomendados', info: 'Fornecedor padrão · entrega em 2 dias úteis',
  },
  en: {
    kicker: 'inventory · clinical supplies', title: 'Supply room — by item.', subtitle: 'Red = below minimum. Purchase suggestion computed from the average usage of the last 4 weeks.',
    th: ['Item', 'Current', 'Minimum', 'Suggestion', 'Status'],
    rows: [
      { item: 'Gloves S (box 100)', atual: '22', min: '40', sug: '80', status: 'low' }, { item: 'Syringe 10mL', atual: '184', min: '60', sug: '—', status: 'ok' },
      { item: 'Sterile gauze', atual: '38', min: '50', sug: '120', status: 'low' }, { item: 'Alcohol 70% 1L', atual: '62', min: '20', sug: '—', status: 'ok' },
      { item: 'N95 mask', atual: '9', min: '30', sug: '100', status: 'critical' },
    ],
    badge: 'Auto-restock active · 3 items on order', info: 'Default supplier · delivery in 2 business days',
  },
} satisfies L10n<S15>

/* ───────────────────────── S16 · FARMÁCIA ───────────────────────── */
type S16 = {
  kicker: string; title: string; subtitle: string; th: string[]
  rows: { nome: string; classe: string; lote: string; val: string; saldo: string; warn?: boolean; critical?: boolean }[]
  badgeWarn: string; badgeOk: string
}
export const S16 = {
  'pt-BR': {
    kicker: 'farmácia · medicamentos controlados', title: 'Controle por lote, validade e classe.', subtitle: 'Rastreabilidade completa para ANVISA. Alertas 60 dias antes do vencimento.',
    th: ['Medicamento', 'Classe', 'Lote / Fab.', 'Validade', 'Saldo'],
    rows: [
      { nome: 'Clonazepam 2mg', classe: 'B1', lote: 'CL2026-09 · EMS', val: '15/09/2026', saldo: '48 cp', warn: true },
      { nome: 'Morfina 10mg', classe: 'A1', lote: 'MF2026-11 · Cristália', val: '20/11/2026', saldo: '12 amp' },
      { nome: 'Diazepam 10mg', classe: 'B1', lote: 'DZ2026-07 · Teuto', val: '30/07/2026', saldo: '22 cp', warn: true, critical: true },
      { nome: 'Tramadol 50mg', classe: 'A2', lote: 'TR2027-02 · Aché', val: '10/02/2027', saldo: '60 cp' },
    ],
    badgeWarn: '2 lotes vencendo em < 90 dias', badgeOk: '✓ SNGPC sincronizado',
  },
  'pt-PT': {
    kicker: 'farmácia · medicamentos controlados', title: 'Controlo por lote, validade e classe.', subtitle: 'Rastreabilidade completa para o INFARMED. Alertas 60 dias antes da validade.',
    th: ['Medicamento', 'Classe', 'Lote / Fab.', 'Validade', 'Saldo'],
    rows: [
      { nome: 'Clonazepam 2mg', classe: 'Psicotrópico', lote: 'CL2026-09 · Generis', val: '15/09/2026', saldo: '48 comp.', warn: true },
      { nome: 'Morfina 10mg', classe: 'Estupefaciente', lote: 'MF2026-11 · Labesfal', val: '20/11/2026', saldo: '12 amp' },
      { nome: 'Diazepam 10mg', classe: 'Psicotrópico', lote: 'DZ2026-07 · Bial', val: '30/07/2026', saldo: '22 comp.', warn: true, critical: true },
      { nome: 'Tramadol 50mg', classe: 'Estupefaciente', lote: 'TR2027-02 · Bluepharma', val: '10/02/2027', saldo: '60 comp.' },
    ],
    badgeWarn: '2 lotes a expirar em < 90 dias', badgeOk: '✓ INFARMED sincronizado',
  },
  en: {
    kicker: 'pharmacy · controlled substances', title: 'Tracked by lot, expiration, and schedule.', subtitle: 'Full traceability for the DEA. Alerts 60 days before expiration.',
    th: ['Medication', 'Schedule', 'Lot / Mfr.', 'Expiration', 'On hand'],
    rows: [
      { nome: 'Clonazepam 2mg', classe: 'Schedule IV', lote: 'CL2026-09 · Teva', val: '09/15/2026', saldo: '48 tab', warn: true },
      { nome: 'Morphine 10mg', classe: 'Schedule II', lote: 'MF2026-11 · Pfizer', val: '11/20/2026', saldo: '12 amp' },
      { nome: 'Diazepam 10mg', classe: 'Schedule IV', lote: 'DZ2026-07 · Mylan', val: '07/30/2026', saldo: '22 tab', warn: true, critical: true },
      { nome: 'Tramadol 50mg', classe: 'Schedule IV', lote: 'TR2027-02 · Sandoz', val: '02/10/2027', saldo: '60 tab' },
    ],
    badgeWarn: '2 lots expiring in < 90 days', badgeOk: '✓ DEA reporting synced',
  },
} satisfies L10n<S16>

/* ───────────────────────── S17 · COBRANÇA ───────────────────────── */
type S17 = {
  kicker: string; title: string; subtitle: string; waName: string; waOnline: string
  msg1: string; msg2pre: string; msg2val: string; msg2pos: string
  payTitle: string; payMeta: string; payBtn: string; userMsg: string; okMsg: string
}
export const S17 = {
  'pt-BR': {
    kicker: 'cobrança · automatizada', title: 'WhatsApp com PIX integrado.', subtitle: 'Sequência humanizada: lembrete D-3, D-1, D+0. Quitação em segundos via PIX.',
    waName: 'Discovery Health · Clínica Aurora', waOnline: 'online · responde em segundos',
    msg1: 'Olá, Fernando Sua consulta com Dra. Marina está marcada para amanhã às 14h.',
    msg2pre: 'O valor é ', msg2val: 'R$ 320,00', msg2pos: '. Quer adiantar via PIX? Recibo e NF saem automáticos.',
    payTitle: 'Pagar via PIX · R$ 320,00', payMeta: 'QR Code expira em 10 min · CNPJ 12.345.678/0001-00', payBtn: 'Abrir →',
    userMsg: 'Acabei de pagar', okMsg: '✓ Recebido. Recibo e NFS-e enviados por e-mail. Até amanhã!',
  },
  'pt-PT': {
    kicker: 'cobrança · automatizada', title: 'WhatsApp com MB WAY integrado.', subtitle: 'Sequência humanizada: lembrete D-3, D-1, D+0. Pagamento em segundos via MB WAY.',
    waName: 'Discovery Health · Clínica Aurora', waOnline: 'online · responde em segundos',
    msg1: 'Olá, Fernando A sua consulta com a Dra. Marina está marcada para amanhã às 14h.',
    msg2pre: 'O valor é ', msg2val: '€ 60,00', msg2pos: '. Quer adiantar via MB WAY? Recibo e fatura saem automáticos.',
    payTitle: 'Pagar via MB WAY · € 60,00', payMeta: 'Referência expira em 10 min · NIF 501 234 567', payBtn: 'Abrir →',
    userMsg: 'Acabei de pagar', okMsg: '✓ Recebido. Recibo e fatura enviados por e-mail. Até amanhã!',
  },
  en: {
    kicker: 'billing · automated', title: 'Messaging with instant pay.', subtitle: 'Humanized sequence: reminder D-3, D-1, D+0. Settled in seconds via instant pay.',
    waName: 'Discovery Health · Aurora Clinic', waOnline: 'online · replies in seconds',
    msg1: 'Hi, Fernando Your visit with Dr. Marina is booked for tomorrow at 2 p.m.',
    msg2pre: 'The amount is ', msg2val: '$ 68.00', msg2pos: '. Want to pay now via Zelle? Receipt and invoice go out automatically.',
    payTitle: 'Pay via Zelle · $ 68.00', payMeta: 'QR code expires in 10 min · EIN 12-3456789', payBtn: 'Open →',
    userMsg: 'Just paid', okMsg: '✓ Received. Receipt and invoice emailed. See you tomorrow!',
  },
} satisfies L10n<S17>

/* ───────────────────────── S18 · ANTIFRAUDE ───────────────────────── */
type S18 = {
  kicker: string; title: string; subtitle: string
  docKicker: string; docTitle: string; rEmit: string; emitVal: string; rVal: string; valVal: string; rDate: string; dateVal: string
  scan: string[]; scoreKicker: string; scoreVal: string; scoreUnit: string; scoreLabel: string; scoreCopy: string
  trustKicker: string; trust: string[]; issues: { tone: 'bad' | 'warn'; text: string }[]
}
export const S18 = {
  'pt-BR': {
    kicker: 'antifraude · IA forense', title: 'Recibo recebido. Validando...', subtitle: 'IconsAI Vision compara metadados, fonte, pixels e cruza com transações reais.',
    docKicker: 'DOCUMENTO', docTitle: 'recibo_consulta_2026-05-12.pdf', rEmit: 'Emitente', emitVal: 'Clínica Aurora', rVal: 'Valor', valVal: 'R$ 1.280,00', rDate: 'Data', dateVal: '2026-05-12',
    scan: ['OCR e pixels sincronizados', 'tabela TUSS consultada', 'NFS-e municipal não encontrada'],
    scoreKicker: 'SCORE DE CONFIANÇA', scoreVal: '38', scoreUnit: '/100', scoreLabel: 'Suspeita alta', scoreCopy: 'Reembolso automático bloqueado e revisão humana acionada em menos de 1 minuto.',
    trustKicker: 'por que a confiança caiu', trust: ['metadado divergente', 'valor 4x acima da tabela', 'sem NFS-e correspondente'],
    issues: [
      { tone: 'bad', text: 'Data foi reescrita sobre o PDF original (forense de pixel)' },
      { tone: 'bad', text: 'Valor R$ 1.280 não bate com tabela do procedimento (R$ 320)' },
      { tone: 'warn', text: 'CNPJ confere, mas sem NFS-e correspondente emitida' },
    ],
  },
  'pt-PT': {
    kicker: 'antifraude · IA forense', title: 'Recibo recebido. A validar...', subtitle: 'IconsAI Vision compara metadados, origem, pixéis e cruza com transações reais.',
    docKicker: 'DOCUMENTO', docTitle: 'recibo_consulta_2026-05-12.pdf', rEmit: 'Emitente', emitVal: 'Clínica Aurora', rVal: 'Valor', valVal: '€ 240,00', rDate: 'Data', dateVal: '2026-05-12',
    scan: ['OCR e pixéis sincronizados', 'tabela de preços consultada', 'fatura não encontrada'],
    scoreKicker: 'PONTUAÇÃO DE CONFIANÇA', scoreVal: '38', scoreUnit: '/100', scoreLabel: 'Suspeita elevada', scoreCopy: 'Reembolso automático bloqueado e revisão humana acionada em menos de 1 minuto.',
    trustKicker: 'porque a confiança caiu', trust: ['metadado divergente', 'valor 4x acima da tabela', 'sem fatura correspondente'],
    issues: [
      { tone: 'bad', text: 'Data reescrita sobre o PDF original (forense de pixel)' },
      { tone: 'bad', text: 'Valor € 240 não corresponde à tabela do procedimento (€ 60)' },
      { tone: 'warn', text: 'NIF confere, mas sem fatura correspondente emitida' },
    ],
  },
  en: {
    kicker: 'anti-fraud · forensic AI', title: 'Receipt received. Validating...', subtitle: 'IconsAI Vision compares metadata, source, and pixels, cross-checking real transactions.',
    docKicker: 'DOCUMENT', docTitle: 'visit_receipt_2026-05-12.pdf', rEmit: 'Issuer', emitVal: 'Aurora Clinic', rVal: 'Amount', valVal: '$ 272.00', rDate: 'Date', dateVal: '05/12/2026',
    scan: ['OCR and pixels synced', 'CPT fee schedule checked', 'matching invoice not found'],
    scoreKicker: 'CONFIDENCE SCORE', scoreVal: '38', scoreUnit: '/100', scoreLabel: 'High suspicion', scoreCopy: 'Automatic reimbursement blocked and human review triggered in under 1 minute.',
    trustKicker: 'why confidence dropped', trust: ['mismatched metadata', 'amount 4x above schedule', 'no matching invoice'],
    issues: [
      { tone: 'bad', text: 'Date was rewritten over the original PDF (pixel forensics)' },
      { tone: 'bad', text: 'Amount $272 doesn\'t match the procedure schedule ($68)' },
      { tone: 'warn', text: 'EIN checks out, but no matching invoice was issued' },
    ],
  },
} satisfies L10n<S18>

/* ───────────────────────── S19 · NF ───────────────────────── */
type S19 = {
  kicker: string; title: string; subtitle: string; th: string[]
  rows: { num: string; cliente: string; valor: string; data: string; status: 'ok' | 'pending' }[]
  okLabel: string; pendingLabel: string
  foot: { k: string; v: string; tone?: 'ok' | 'warn' }[]
}
export const S19 = {
  'pt-BR': {
    kicker: 'fiscal · NFS-e municipal', title: 'NF emitida automaticamente.', subtitle: 'Após cada atendimento, o sistema emite a NFS-e no padrão da prefeitura e devolve XML + PDF.',
    th: ['Nº', 'Cliente', 'Valor', 'Emissão', 'SEFAZ'],
    rows: [
      { num: '002.418', cliente: 'Fernando Arbache', valor: 'R$ 320,00', data: '15/05 14:42', status: 'ok' },
      { num: '002.417', cliente: 'M.Silva', valor: 'R$ 280,00', data: '15/05 11:20', status: 'ok' },
      { num: '002.416', cliente: 'R.Souza', valor: 'R$ 450,00', data: '15/05 10:08', status: 'ok' },
      { num: '002.415', cliente: 'A.Costa', valor: 'R$ 320,00', data: '14/05 16:55', status: 'pending' },
      { num: '002.414', cliente: 'P.Lima', valor: 'R$ 380,00', data: '14/05 14:30', status: 'ok' },
    ],
    okLabel: '✓ autorizada', pendingLabel: '… em fila',
    foot: [{ k: 'Emitidas hoje', v: '14' }, { k: 'Aguardando SEFAZ', v: '1', tone: 'warn' }, { k: 'Webhook ABRASF', v: '● live', tone: 'ok' }],
  },
  'pt-PT': {
    kicker: 'fiscal · fatura eletrónica', title: 'Fatura emitida automaticamente.', subtitle: 'Após cada consulta, o sistema emite a fatura e comunica à AT, devolvendo XML + PDF.',
    th: ['N.º', 'Cliente', 'Valor', 'Emissão', 'AT'],
    rows: [
      { num: '002.418', cliente: 'Fernando Arbache', valor: '€ 60,00', data: '15/05 14:42', status: 'ok' },
      { num: '002.417', cliente: 'M.Silva', valor: '€ 53,00', data: '15/05 11:20', status: 'ok' },
      { num: '002.416', cliente: 'R.Sousa', valor: '€ 85,00', data: '15/05 10:08', status: 'ok' },
      { num: '002.415', cliente: 'A.Costa', valor: '€ 60,00', data: '14/05 16:55', status: 'pending' },
      { num: '002.414', cliente: 'P.Lima', valor: '€ 72,00', data: '14/05 14:30', status: 'ok' },
    ],
    okLabel: '✓ autorizada', pendingLabel: '… em fila',
    foot: [{ k: 'Emitidas hoje', v: '14' }, { k: 'A aguardar AT', v: '1', tone: 'warn' }, { k: 'Comunicação e-Fatura', v: '● live', tone: 'ok' }],
  },
  en: {
    kicker: 'tax · e-invoice', title: 'Invoice issued automatically.', subtitle: 'After each visit, the system issues the invoice in the local standard and returns XML + PDF.',
    th: ['No.', 'Client', 'Amount', 'Issued', 'Tax'],
    rows: [
      { num: '002.418', cliente: 'Fernando Arbache', valor: '$ 68.00', data: '05/15 2:42pm', status: 'ok' },
      { num: '002.417', cliente: 'M.Smith', valor: '$ 60.00', data: '05/15 11:20am', status: 'ok' },
      { num: '002.416', cliente: 'R.Jones', valor: '$ 96.00', data: '05/15 10:08am', status: 'ok' },
      { num: '002.415', cliente: 'A.Brown', valor: '$ 68.00', data: '05/14 4:55pm', status: 'pending' },
      { num: '002.414', cliente: 'P.Davis', valor: '$ 80.00', data: '05/14 2:30pm', status: 'ok' },
    ],
    okLabel: '✓ accepted', pendingLabel: '… queued',
    foot: [{ k: 'Issued today', v: '14' }, { k: 'Awaiting tax authority', v: '1', tone: 'warn' }, { k: 'Reporting webhook', v: '● live', tone: 'ok' }],
  },
} satisfies L10n<S19>

/* ───────────────────────── S20 · PREVISÃO RECEITA ───────────────────────── */
type S20 = {
  kicker: string; title: string; subtitle: string; months: string[]; nowLabel: string
  stats: { k: string; v: string; tone?: 'ok' }[]
}
export const S20 = {
  'pt-BR': {
    kicker: 'forecast · receita anual', title: 'Projeção 12 meses · banda de confiança.', subtitle: 'Modelo VAR com sazonalidade e dummy de feriados. IC 80% sombreado.',
    months: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'], nowLabel: 'HOJE',
    stats: [{ k: 'CAGR 12m', v: '+18,4%', tone: 'ok' }, { k: 'Sazonalidade pico', v: 'Mar–Mai' }, { k: 'Projeção 12m', v: 'R$ 3,82M' }, { k: 'IC 80%', v: '±7,2%' }],
  },
  'pt-PT': {
    kicker: 'forecast · receita anual', title: 'Projeção 12 meses · banda de confiança.', subtitle: 'Modelo VAR com sazonalidade e variável de feriados. IC 80% sombreado.',
    months: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'], nowLabel: 'HOJE',
    stats: [{ k: 'CAGR 12m', v: '+18,4%', tone: 'ok' }, { k: 'Pico sazonal', v: 'Mar–Mai' }, { k: 'Projeção 12m', v: '€ 640k' }, { k: 'IC 80%', v: '±7,2%' }],
  },
  en: {
    kicker: 'forecast · annual revenue', title: '12-month projection · confidence band.', subtitle: 'VAR model with seasonality and a holiday dummy. 80% CI shaded.',
    months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'], nowLabel: 'TODAY',
    stats: [{ k: '12m CAGR', v: '+18.4%', tone: 'ok' }, { k: 'Seasonal peak', v: 'Mar–May' }, { k: '12m projection', v: '$ 740k' }, { k: '80% CI', v: '±7.2%' }],
  },
} satisfies L10n<S20>

/* ───────────────────────── S21 · DIAGNÓSTICO ───────────────────────── */
type S21 = {
  kicker: string; title: string; subtitle: string
  nSymptoms: string; symptoms: string[]; nCid: string
  cids: { code: string; prob: string; tone: 'high' | 'mid' | 'low' }[]
  nPlan: string; plan: { text: string; warn?: boolean }[]
}
export const S21 = {
  'pt-BR': {
    kicker: 'diagnóstico assistido · pipeline IA', title: 'Sintomas → CID-10 → Plano.', subtitle: 'Probabilidades calibradas. Decisão clínica final é sempre do médico — IA é apoio.',
    nSymptoms: 'SINTOMAS', symptoms: ['cefaleia pulsátil', 'fotofobia', 'piora vespertina', 'dor 6/10'], nCid: 'CID-10 (PROB.)',
    cids: [{ code: 'G44.2 · Cefaleia tensional', prob: '72%', tone: 'high' }, { code: 'G43.0 · Enxaqueca s/ aura', prob: '19%', tone: 'mid' }, { code: 'H53.5 · Fadiga visual', prob: '6%', tone: 'low' }, { code: 'Outros', prob: '3%', tone: 'low' }],
    nPlan: 'PLANO SUGERIDO', plan: [{ text: 'Higiene visual 20-20-20' }, { text: 'Hidratação + sono regular' }, { text: 'Reavaliar PA em 7 dias' }, { text: 'Encaminhar neuro se > 14 dias', warn: true }],
  },
  'pt-PT': {
    kicker: 'diagnóstico assistido · pipeline IA', title: 'Sintomas → CID-10 → Plano.', subtitle: 'Probabilidades calibradas. A decisão clínica final é sempre do médico — a IA é apoio.',
    nSymptoms: 'SINTOMAS', symptoms: ['cefaleia pulsátil', 'fotofobia', 'agravamento vespertino', 'dor 6/10'], nCid: 'CID-10 (PROB.)',
    cids: [{ code: 'G44.2 · Cefaleia de tensão', prob: '72%', tone: 'high' }, { code: 'G43.0 · Enxaqueca s/ aura', prob: '19%', tone: 'mid' }, { code: 'H53.5 · Fadiga visual', prob: '6%', tone: 'low' }, { code: 'Outros', prob: '3%', tone: 'low' }],
    nPlan: 'PLANO SUGERIDO', plan: [{ text: 'Higiene visual 20-20-20' }, { text: 'Hidratação + sono regular' }, { text: 'Reavaliar TA em 7 dias' }, { text: 'Encaminhar neuro se > 14 dias', warn: true }],
  },
  en: {
    kicker: 'assisted diagnosis · AI pipeline', title: 'Symptoms → ICD-10 → Plan.', subtitle: 'Calibrated probabilities. The final clinical decision is always the physician\'s — AI is support.',
    nSymptoms: 'SYMPTOMS', symptoms: ['pulsating headache', 'photophobia', 'afternoon worsening', 'pain 6/10'], nCid: 'ICD-10 (PROB.)',
    cids: [{ code: 'G44.2 · Tension headache', prob: '72%', tone: 'high' }, { code: 'G43.0 · Migraine w/o aura', prob: '19%', tone: 'mid' }, { code: 'H53.5 · Eye strain', prob: '6%', tone: 'low' }, { code: 'Other', prob: '3%', tone: 'low' }],
    nPlan: 'SUGGESTED PLAN', plan: [{ text: 'Visual hygiene 20-20-20' }, { text: 'Hydration + regular sleep' }, { text: 'Recheck BP in 7 days' }, { text: 'Refer to neuro if > 14 days', warn: true }],
  },
} satisfies L10n<S21>

/* ───────────────────────── S22 · EXPECTATIVA DE VIDA ───────────────────────── */
type S22 = {
  kicker: string; title: string; subtitle: string; th: string[]
  rows: { nome: string; idade: string; comorb: string; adesao: string; score: number; level: 'low' | 'mid' | 'high' }[]
  badgeBad: string; badge: string
}
export const S22 = {
  'pt-BR': {
    kicker: 'risco populacional · longitudinal', title: 'Pacientes em risco de perda.', subtitle: 'Score 0–100 com comorbidades, idade, adesão. Vermelho = intervenção prioritária.',
    th: ['Paciente', 'Idade', 'Comorbid.', 'Adesão', 'Score risco'],
    rows: [
      { nome: 'M.Silva', idade: '68', comorb: 'HAS, DM2, DRC', adesao: '62%', score: 84, level: 'high' },
      { nome: 'R.Souza', idade: '54', comorb: 'HAS, dislipidemia', adesao: '88%', score: 42, level: 'mid' },
      { nome: 'A.Costa', idade: '71', comorb: 'ICC, FA, DM2', adesao: '71%', score: 78, level: 'high' },
      { nome: 'P.Lima', idade: '46', comorb: 'obesidade', adesao: '95%', score: 22, level: 'low' },
      { nome: 'J.Alves', idade: '62', comorb: 'DPOC, HAS', adesao: '58%', score: 71, level: 'high' },
    ],
    badgeBad: '3 pacientes · busca ativa hoje', badge: '⌀ Expectativa ajustada: 78,4 anos · IC 95%: ±2,1',
  },
  'pt-PT': {
    kicker: 'risco populacional · longitudinal', title: 'Doentes em risco de perda.', subtitle: 'Score 0–100 com comorbilidades, idade, adesão. Vermelho = intervenção prioritária.',
    th: ['Doente', 'Idade', 'Comorbilid.', 'Adesão', 'Score de risco'],
    rows: [
      { nome: 'M.Silva', idade: '68', comorb: 'HTA, DM2, DRC', adesao: '62%', score: 84, level: 'high' },
      { nome: 'R.Sousa', idade: '54', comorb: 'HTA, dislipidemia', adesao: '88%', score: 42, level: 'mid' },
      { nome: 'A.Costa', idade: '71', comorb: 'IC, FA, DM2', adesao: '71%', score: 78, level: 'high' },
      { nome: 'P.Lima', idade: '46', comorb: 'obesidade', adesao: '95%', score: 22, level: 'low' },
      { nome: 'J.Alves', idade: '62', comorb: 'DPOC, HTA', adesao: '58%', score: 71, level: 'high' },
    ],
    badgeBad: '3 doentes · busca ativa hoje', badge: '⌀ Esperança de vida ajustada: 78,4 anos · IC 95%: ±2,1',
  },
  en: {
    kicker: 'population risk · longitudinal', title: 'Patients at risk of being lost.', subtitle: 'Score 0–100 with comorbidities, age, adherence. Red = priority intervention.',
    th: ['Patient', 'Age', 'Comorbid.', 'Adherence', 'Risk score'],
    rows: [
      { nome: 'M.Smith', idade: '68', comorb: 'HTN, T2DM, CKD', adesao: '62%', score: 84, level: 'high' },
      { nome: 'R.Jones', idade: '54', comorb: 'HTN, dyslipidemia', adesao: '88%', score: 42, level: 'mid' },
      { nome: 'A.Brown', idade: '71', comorb: 'CHF, AFib, T2DM', adesao: '71%', score: 78, level: 'high' },
      { nome: 'P.Davis', idade: '46', comorb: 'obesity', adesao: '95%', score: 22, level: 'low' },
      { nome: 'J.Wilson', idade: '62', comorb: 'COPD, HTN', adesao: '58%', score: 71, level: 'high' },
    ],
    badgeBad: '3 patients · active outreach today', badge: '⌀ Adjusted life expectancy: 78.4 years · 95% CI: ±2.1',
  },
} satisfies L10n<S22>

/* ───────────────────────── S23 · NAVEGAÇÃO (MARKOV) ───────────────────────── */
type S23 = {
  kicker: string; title: string; subtitle: string
  edgeA: string; edgeB: string; recovery: string
  nTriagem: string; nTriagemSub: string; nTratoA: string; nTratoASub: string; nTratoB: string; nTratoBSub: string; nAlta: string
  legA: string; legB: string
}
export const S23 = {
  'pt-BR': {
    kicker: 'patient journey · markov', title: 'Trajetória prevista — caminho A vs B.', subtitle: 'Cada nó é uma etapa do tratamento. Edges mostram probabilidade de transição.',
    edgeA: 'caminho A · 67%', edgeB: 'caminho B · 89%', recovery: '↗ recovery',
    nTriagem: 'Triagem', nTriagemSub: 'início', nTratoA: 'Trato A', nTratoASub: 'conservador', nTratoB: 'Trato B', nTratoBSub: 'intensivo', nAlta: 'Alta',
    legA: '● Caminho A · conservador · custo R$ 4.2k · 67% recovery', legB: '● Caminho B · intensivo · custo R$ 11.8k · 89% recovery',
  },
  'pt-PT': {
    kicker: 'patient journey · markov', title: 'Trajetória prevista — caminho A vs B.', subtitle: 'Cada nó é uma etapa do tratamento. As ligações mostram a probabilidade de transição.',
    edgeA: 'caminho A · 67%', edgeB: 'caminho B · 89%', recovery: '↗ recuperação',
    nTriagem: 'Triagem', nTriagemSub: 'início', nTratoA: 'Trat. A', nTratoASub: 'conservador', nTratoB: 'Trat. B', nTratoBSub: 'intensivo', nAlta: 'Alta',
    legA: '● Caminho A · conservador · custo € 680 · 67% recuperação', legB: '● Caminho B · intensivo · custo € 1.940 · 89% recuperação',
  },
  en: {
    kicker: 'patient journey · markov', title: 'Predicted trajectory — path A vs B.', subtitle: 'Each node is a treatment step. Edges show the transition probability.',
    edgeA: 'path A · 67%', edgeB: 'path B · 89%', recovery: '↗ recovery',
    nTriagem: 'Triage', nTriagemSub: 'start', nTratoA: 'Tx A', nTratoASub: 'conservative', nTratoB: 'Tx B', nTratoBSub: 'intensive', nAlta: 'Discharge',
    legA: '● Path A · conservative · cost $ 800 · 67% recovery', legB: '● Path B · intensive · cost $ 2,250 · 89% recovery',
  },
} satisfies L10n<S23>

/* ───────────────────────── S24 · COMBINAÇÃO TRATAMENTOS ───────────────────────── */
type Cell = { prob: string; ic: string; tone: 'ok-strong' | 'ok' | 'mid' | 'warn' | 'low' }
type S24 = {
  kicker: string; title: string; subtitle: string
  corner: string; cols: string[]; rows: { tratamento: string; cells: Cell[] }[]
}
export const S24 = {
  'pt-BR': {
    kicker: 'evidence matrix · meta-análise', title: 'Combinações de tratamento × desfecho.', subtitle: 'Cada célula traz probabilidade + intervalo de confiança 95% — valores ilustrativos de demonstração.',
    corner: 'tratamento ↓ / desfecho →', cols: ['Remissão', 'Melhora parcial', 'Sem efeito', 'Eventos adversos'],
    rows: [
      { tratamento: 'A · monoterapia', cells: [{ prob: '62%', ic: '±4,8', tone: 'ok' }, { prob: '24%', ic: '±3,1', tone: 'mid' }, { prob: '12%', ic: '±2,4', tone: 'low' }, { prob: '2%', ic: '±0,9', tone: 'low' }] },
      { tratamento: 'A + B', cells: [{ prob: '78%', ic: '±3,2', tone: 'ok-strong' }, { prob: '14%', ic: '±2,1', tone: 'low' }, { prob: '6%', ic: '±1,4', tone: 'low' }, { prob: '2%', ic: '±0,8', tone: 'low' }] },
      { tratamento: 'B · monoterapia', cells: [{ prob: '48%', ic: '±5,1', tone: 'mid' }, { prob: '32%', ic: '±3,8', tone: 'mid' }, { prob: '16%', ic: '±2,6', tone: 'warn' }, { prob: '4%', ic: '±1,2', tone: 'low' }] },
      { tratamento: 'A + B + C', cells: [{ prob: '84%', ic: '±2,8', tone: 'ok-strong' }, { prob: '9%', ic: '±1,6', tone: 'low' }, { prob: '3%', ic: '±1,0', tone: 'low' }, { prob: '4%', ic: '±1,2', tone: 'warn' }] },
    ],
  },
  'pt-PT': {
    kicker: 'evidence matrix · meta-análise', title: 'Combinações de tratamento × desfecho.', subtitle: 'Cada célula traz probabilidade + intervalo de confiança 95% — valores ilustrativos de demonstração.',
    corner: 'tratamento ↓ / desfecho →', cols: ['Remissão', 'Melhoria parcial', 'Sem efeito', 'Efeitos adversos'],
    rows: [
      { tratamento: 'A · monoterapia', cells: [{ prob: '62%', ic: '±4,8', tone: 'ok' }, { prob: '24%', ic: '±3,1', tone: 'mid' }, { prob: '12%', ic: '±2,4', tone: 'low' }, { prob: '2%', ic: '±0,9', tone: 'low' }] },
      { tratamento: 'A + B', cells: [{ prob: '78%', ic: '±3,2', tone: 'ok-strong' }, { prob: '14%', ic: '±2,1', tone: 'low' }, { prob: '6%', ic: '±1,4', tone: 'low' }, { prob: '2%', ic: '±0,8', tone: 'low' }] },
      { tratamento: 'B · monoterapia', cells: [{ prob: '48%', ic: '±5,1', tone: 'mid' }, { prob: '32%', ic: '±3,8', tone: 'mid' }, { prob: '16%', ic: '±2,6', tone: 'warn' }, { prob: '4%', ic: '±1,2', tone: 'low' }] },
      { tratamento: 'A + B + C', cells: [{ prob: '84%', ic: '±2,8', tone: 'ok-strong' }, { prob: '9%', ic: '±1,6', tone: 'low' }, { prob: '3%', ic: '±1,0', tone: 'low' }, { prob: '4%', ic: '±1,2', tone: 'warn' }] },
    ],
  },
  en: {
    kicker: 'evidence matrix · meta-analysis', title: 'Treatment combinations × outcome.', subtitle: 'Each cell shows probability + 95% confidence interval — illustrative demonstration values.',
    corner: 'treatment ↓ / outcome →', cols: ['Remission', 'Partial improvement', 'No effect', 'Adverse events'],
    rows: [
      { tratamento: 'A · monotherapy', cells: [{ prob: '62%', ic: '±4.8', tone: 'ok' }, { prob: '24%', ic: '±3.1', tone: 'mid' }, { prob: '12%', ic: '±2.4', tone: 'low' }, { prob: '2%', ic: '±0.9', tone: 'low' }] },
      { tratamento: 'A + B', cells: [{ prob: '78%', ic: '±3.2', tone: 'ok-strong' }, { prob: '14%', ic: '±2.1', tone: 'low' }, { prob: '6%', ic: '±1.4', tone: 'low' }, { prob: '2%', ic: '±0.8', tone: 'low' }] },
      { tratamento: 'B · monotherapy', cells: [{ prob: '48%', ic: '±5.1', tone: 'mid' }, { prob: '32%', ic: '±3.8', tone: 'mid' }, { prob: '16%', ic: '±2.6', tone: 'warn' }, { prob: '4%', ic: '±1.2', tone: 'low' }] },
      { tratamento: 'A + B + C', cells: [{ prob: '84%', ic: '±2.8', tone: 'ok-strong' }, { prob: '9%', ic: '±1.6', tone: 'low' }, { prob: '3%', ic: '±1.0', tone: 'low' }, { prob: '4%', ic: '±1.2', tone: 'warn' }] },
    ],
  },
} satisfies L10n<S24>

/* ───────────────────────── EXPLAIN PANELS (slides sem side panel) ───────────────────────── */
export type ExplainSource = { name: string; field: string; icon: 'id' | 'map-pin' | 'mic' | 'zap' | 'database' | 'file' | 'shield' | 'chart' | 'calendar' | 'message' }
export type ExplainMetric = { value: string; label: string }
type ExplainEntry = {
  kicker: string
  lines: string[]
  sourcesLabel?: string
  sources?: ExplainSource[]
  metricsLabel?: string
  metrics?: ExplainMetric[]
}
export type ExplainMap = Record<number, L10n<ExplainEntry>>

export const EXPLAIN: ExplainMap = {
  2: {
    'pt-BR': {
      kicker: 'CADASTRO',
      lines: [
        'CPF cruza com dados públicos da Receita Federal em menos de 2 segundos.',
        'Endereço completado automaticamente via ViaCEP — o paciente só confirma.',
        'Pré-preenchimento reduz erros de digitação e agiliza a recepção.',
        'Dados pessoais ficam criptografados e nunca são compartilhados com terceiros.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Receita Federal', field: 'CPF & RG', icon: 'id' },
        { name: 'ViaCEP', field: 'Endereço', icon: 'map-pin' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '< 2 s', label: 'Validação em tempo real' },
        { value: 'AES-256', label: 'Dados criptografados' },
        { value: 'LGPD', label: 'Em conformidade' },
      ],
    },
    'pt-PT': {
      kicker: 'REGISTO',
      lines: [
        'O NIF cruza com registos públicos em menos de 2 segundos.',
        'A morada é completada automaticamente via CTT — o doente só confirma.',
        'O pré-preenchimento reduz erros de digitação e agiliza a recepção.',
        'Os dados pessoais ficam cifrados e nunca são partilhados com terceiros.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Registos Públicos', field: 'NIF & BI', icon: 'id' },
        { name: 'CTT', field: 'Código Postal', icon: 'map-pin' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '< 2 s', label: 'Validação em tempo real' },
        { value: 'AES-256', label: 'Dados cifrados' },
        { value: 'RGPD', label: 'Em conformidade' },
      ],
    },
    en: {
      kicker: 'REGISTRATION',
      lines: [
        'ID is cross-checked against public records in under 2 seconds.',
        'Address auto-completed via postal lookup — the patient just confirms.',
        'Prefill reduces typos and speeds up front-desk intake.',
        'Personal data is encrypted and never shared with third parties.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'Public Records', field: 'SSN / State ID', icon: 'id' },
        { name: 'USPS API', field: 'ZIP Code', icon: 'map-pin' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '< 2 s', label: 'Real-time validation' },
        { value: 'AES-256', label: 'Encrypted at rest' },
        { value: 'HIPAA', label: 'Compliant' },
      ],
    },
  },
  5: {
    'pt-BR': {
      kicker: 'CONSULTA',
      lines: [
        'Escuta ativa com IA: o paciente fala livremente por até 2 minutos.',
        'Waveform em tempo real dá feedback visual de que o áudio está sendo captado.',
        'Sem termos técnicos — a IA estrutura os sintomas depois.',
        'Gravação processada localmente, sem envio para servidores externos.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'IconsAI TTS', field: 'Transcrição de voz', icon: 'mic' },
        { name: 'IconsAI NLP', field: 'Estruturação clínica', icon: 'zap' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '< 3 s', label: 'Transcrição completa' },
        { value: 'Local', label: 'Processado no device' },
        { value: 'LGPD', label: 'Em conformidade' },
      ],
    },
    'pt-PT': {
      kicker: 'CONSULTA',
      lines: [
        'Escuta ativa com IA: o doente fala livremente durante até 2 minutos.',
        'O waveform em tempo real dá feedback visual de que o áudio está a ser captado.',
        'Sem termos técnicos — a IA estrutura os sintomas depois.',
        'A gravação é processada localmente, sem envio para servidores externos.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'IconsAI TTS', field: 'Transcrição de voz', icon: 'mic' },
        { name: 'IconsAI NLP', field: 'Estruturação clínica', icon: 'zap' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '< 3 s', label: 'Transcrição completa' },
        { value: 'Local', label: 'Processado no dispositivo' },
        { value: 'RGPD', label: 'Em conformidade' },
      ],
    },
    en: {
      kicker: 'CONSULT',
      lines: [
        'Active listening with AI: the patient speaks freely for up to 2 minutes.',
        'Real-time waveform gives visual feedback that audio is being captured.',
        'No medical jargon needed — the AI structures symptoms afterwards.',
        'Recording is processed locally, never sent to external servers.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'IconsAI TTS', field: 'Voice transcription', icon: 'mic' },
        { name: 'IconsAI NLP', field: 'Clinical structuring', icon: 'zap' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '< 3 s', label: 'Full transcription' },
        { value: 'On-device', label: 'Local processing' },
        { value: 'HIPAA', label: 'Compliant' },
      ],
    },
  },
  7: {
    'pt-BR': {
      kicker: 'SINAIS VITAIS',
      lines: [
        'PA, FC, glicemia, IMC e SpO2 digitados ou importados de dispositivos.',
        'Classificação automática com red flags em tempo real.',
        'Escala de dor validada (0–10) integrada à triagem clínica.',
        'Valores fora do normal disparam alertas visuais imediatos.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Entrada Clínica', field: 'Manual ou dispositivo', icon: 'zap' },
        { name: 'CFM · ANS', field: 'Valores de referência', icon: 'shield' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '5 vitais', label: 'Monitorados por sessão' },
        { value: '< 1 s', label: 'Validação automática' },
        { value: 'Red flag', label: 'Alerta imediato' },
      ],
    },
    'pt-PT': {
      kicker: 'SINAIS VITAIS',
      lines: [
        'TA, FC, glicemia, IMC e SpO2 digitados ou importados de dispositivos.',
        'Classificação automática com alertas em tempo real.',
        'Escala de dor validada (0–10) integrada à triagem clínica.',
        'Valores fora do normal disparam alertas visuais imediatos.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Entrada Clínica', field: 'Manual ou dispositivo', icon: 'zap' },
        { name: 'Ordem dos Médicos', field: 'Valores de referência', icon: 'shield' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '5 vitais', label: 'Monitorizados por sessão' },
        { value: '< 1 s', label: 'Validação automática' },
        { value: 'Red flag', label: 'Alerta imediato' },
      ],
    },
    en: {
      kicker: 'VITAL SIGNS',
      lines: [
        'BP, HR, glucose, BMI, and SpO2 typed or imported from devices.',
        'Automatic classification with real-time red flags.',
        'Validated pain scale (0–10) integrated into clinical triage.',
        'Out-of-range values trigger immediate visual alerts.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'Clinical Input', field: 'Manual or device', icon: 'zap' },
        { name: 'AMA · AHA', field: 'Reference ranges', icon: 'shield' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '5 vitals', label: 'Per session' },
        { value: '< 1 s', label: 'Auto-validation' },
        { value: 'Red flag', label: 'Instant alert' },
      ],
    },
  },
  9: {
    'pt-BR': {
      kicker: 'EXAMES',
      lines: [
        'Upload de PDF, JPG ou PNG — até 20 MB por arquivo.',
        'IconsAI Vision extrai valores automaticamente do documento.',
        'Progresso em tempo real: upload, OCR e indexação em paralelo.',
        'Resultados incorporados ao laudo SOAP sem redigitação.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'IconsAI Vision', field: 'OCR de laudos', icon: 'file' },
        { name: 'CBHPM', field: 'Nomenclatura de exames', icon: 'database' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '20 MB', label: 'Por arquivo' },
        { value: '< 5 s', label: 'OCR completo' },
        { value: 'LGPD', label: 'Em conformidade' },
      ],
    },
    'pt-PT': {
      kicker: 'EXAMES',
      lines: [
        'Carregamento de PDF, JPG ou PNG — até 20 MB por ficheiro.',
        'IconsAI Vision extrai valores automaticamente do documento.',
        'Progresso em tempo real: upload, OCR e indexação em paralelo.',
        'Resultados incorporados ao laudo SOAP sem redigitação.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'IconsAI Vision', field: 'OCR de laudos', icon: 'file' },
        { name: 'Nomenclatura Clínica', field: 'Indexação de exames', icon: 'database' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '20 MB', label: 'Por ficheiro' },
        { value: '< 5 s', label: 'OCR completo' },
        { value: 'RGPD', label: 'Em conformidade' },
      ],
    },
    en: {
      kicker: 'LAB RESULTS',
      lines: [
        'Upload PDF, JPG, or PNG — up to 20 MB per file.',
        'IconsAI Vision extracts values automatically from the document.',
        'Real-time progress: upload, OCR, and indexing run in parallel.',
        'Results flow into the SOAP report without re-typing.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'IconsAI Vision', field: 'Lab report OCR', icon: 'file' },
        { name: 'CPT Codes', field: 'Result indexing', icon: 'database' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '20 MB', label: 'Per file' },
        { value: '< 5 s', label: 'OCR complete' },
        { value: 'HIPAA', label: 'Compliant' },
      ],
    },
  },
  10: {
    'pt-BR': {
      kicker: 'MEDICAMENTOS',
      lines: [
        'RAG cruza a transcrição do áudio com o catálogo de medicações.',
        'O paciente marca o que usa — sem precisar lembrar nomes exatos.',
        'Alertas automáticos de interações medicamentosas conhecidas.',
        'Dose e frequência registradas para conferência no laudo final.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'ANVISA', field: 'Catálogo de medicamentos', icon: 'database' },
        { name: 'RAG Engine', field: 'Transcrição cruzada', icon: 'zap' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '12k+', label: 'Medicamentos indexados' },
        { value: 'Tempo real', label: 'Alerta de interações' },
        { value: 'LGPD', label: 'Em conformidade' },
      ],
    },
    'pt-PT': {
      kicker: 'MEDICAMENTOS',
      lines: [
        'RAG cruza a transcrição do áudio com o catálogo de medicamentos.',
        'O doente marca o que toma — sem precisar lembrar nomes exatos.',
        'Alertas automáticos de interações medicamentosas conhecidas.',
        'Dose e frequência registadas para conferência no laudo final.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'INFARMED', field: 'Prontuário Terapêutico', icon: 'database' },
        { name: 'RAG Engine', field: 'Transcrição cruzada', icon: 'zap' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '12k+', label: 'Medicamentos indexados' },
        { value: 'Tempo real', label: 'Alerta de interações' },
        { value: 'RGPD', label: 'Em conformidade' },
      ],
    },
    en: {
      kicker: 'MEDICATIONS',
      lines: [
        'RAG cross-references the audio transcript with the medication catalog.',
        'The patient checks what they take — no need to recall exact names.',
        'Automatic alerts for known drug interactions.',
        'Dose and frequency recorded for verification in the final report.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'FDA Orange Book', field: 'Medication catalog', icon: 'database' },
        { name: 'RAG Engine', field: 'Transcript cross-ref', icon: 'zap' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '12k+', label: 'Indexed medications' },
        { value: 'Real time', label: 'Interaction alerts' },
        { value: 'HIPAA', label: 'Compliant' },
      ],
    },
  },
  13: {
    'pt-BR': {
      kicker: 'AGENDA',
      lines: [
        'Visão semanal com slots por turno — arrastar para agendar.',
        'Confirmação automática via WhatsApp: sem ligação, sem retrabalho.',
        'Ocupação visual imediata: verde (livre), amarelo (pendente), cheio.',
        'Integração com faturamento — consulta marcada já aparece na previsão.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Agenda Interna', field: 'Slots e turnos', icon: 'calendar' },
        { name: 'WhatsApp Business', field: 'Confirmações', icon: 'message' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '< 30 s', label: 'Confirmação enviada' },
        { value: '−40%', label: 'Remarcações' },
        { value: '3 turnos', label: 'Manhã · tarde · noite' },
      ],
    },
    'pt-PT': {
      kicker: 'AGENDA',
      lines: [
        'Visão semanal com horários por turno — arrastar para agendar.',
        'Confirmação automática via WhatsApp: sem telefonema, sem retrabalho.',
        'Ocupação visual imediata: verde (livre), amarelo (pendente), cheio.',
        'Integração com faturação — consulta marcada já aparece na previsão.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Agenda Interna', field: 'Horários e turnos', icon: 'calendar' },
        { name: 'WhatsApp Business', field: 'Confirmações', icon: 'message' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '< 30 s', label: 'Confirmação enviada' },
        { value: '−40%', label: 'Remarcações' },
        { value: '3 turnos', label: 'Manhã · tarde · noite' },
      ],
    },
    en: {
      kicker: 'SCHEDULE',
      lines: [
        'Weekly view with shift-based slots — drag to book.',
        'Automatic confirmation by text: no phone call, no rework.',
        'Instant visual occupancy: green (open), yellow (pending), full.',
        'Billing integration — booked visit already shows in the forecast.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'Internal Schedule', field: 'Shifts & slots', icon: 'calendar' },
        { name: 'WhatsApp Business', field: 'Confirmations', icon: 'message' },
      ],
      metricsLabel: 'KEY METRICS',
      metrics: [
        { value: '< 30 s', label: 'Confirmation sent' },
        { value: '−40%', label: 'Reschedules' },
        { value: '3 shifts', label: 'AM · PM · evening' },
      ],
    },
  },
  14: {
    'pt-BR': {
      kicker: 'FATURAMENTO',
      lines: [
        'Previsto vs realizado nas próximas 4 semanas em barras comparativas.',
        'Ticket médio, cancelamentos e taxa de no-show em destaque.',
        'Curva real cruzada com agenda confirmada identifica gap antecipadamente.',
        'Alertas de desvio disparam antes de fechar o mês.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Agenda Confirmada', field: 'Base de projeção', icon: 'calendar' },
        { name: 'Histórico 12 meses', field: 'Ticket médio e séries', icon: 'chart' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '± 8%', label: 'Desvio típico' },
        { value: '4 sem', label: 'Horizonte de projeção' },
        { value: 'Alerta', label: 'Antes do fechamento' },
      ],
    },
    'pt-PT': {
      kicker: 'FATURAÇÃO',
      lines: [
        'Previsto vs realizado nas próximas 4 semanas em barras comparativas.',
        'Ticket médio, cancelamentos e taxa de no-show em destaque.',
        'Curva real cruzada com agenda confirmada identifica o desvio antecipadamente.',
        'Alertas de desvio disparam antes de fechar o mês.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Agenda Confirmada', field: 'Base de projeção', icon: 'calendar' },
        { name: 'Histórico 12 meses', field: 'Ticket médio e séries', icon: 'chart' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '± 8%', label: 'Desvio típico' },
        { value: '4 sem', label: 'Horizonte de projeção' },
        { value: 'Alerta', label: 'Antes do fechamento' },
      ],
    },
    en: {
      kicker: 'BILLING',
      lines: [
        'Forecast vs actual for the next 4 weeks in comparative bars.',
        'Average ticket, cancellations, and no-show rate highlighted.',
        'Actual curve cross-checked with confirmed schedule spots gaps early.',
        'Variance alerts fire before month-end close.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'Confirmed Schedule', field: 'Projection base', icon: 'calendar' },
        { name: '12-month History', field: 'Avg ticket & series', icon: 'chart' },
      ],
      metricsLabel: 'KEY METRICS',
      metrics: [
        { value: '± 8%', label: 'Typical variance' },
        { value: '4 wk', label: 'Forecast horizon' },
        { value: 'Alert', label: 'Before month-end' },
      ],
    },
  },
  15: {
    'pt-BR': {
      kicker: 'INVENTÁRIO',
      lines: [
        'Visão por item: estoque atual, mínimo, sugestão de compra.',
        'Consumo médio das últimas 4 semanas calcula reposição automática.',
        'Vermelho = abaixo do mínimo, com pedido sugerido ao fornecedor.',
        'Auto-restock para itens críticos dispensa intervenção manual.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Consumo Histórico', field: 'Últimas 4 semanas', icon: 'chart' },
        { name: 'Fornecedores', field: 'Catálogo e preços', icon: 'database' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '−30%', label: 'Ruptura de estoque' },
        { value: 'Auto', label: 'Pedido de reposição' },
        { value: '48h', label: 'Lead time médio' },
      ],
    },
    'pt-PT': {
      kicker: 'INVENTÁRIO',
      lines: [
        'Visão por artigo: stock atual, mínimo, sugestão de compra.',
        'Consumo médio das últimas 4 semanas calcula reposição automática.',
        'Vermelho = abaixo do mínimo, com encomenda sugerida ao fornecedor.',
        'Reposição automática para artigos críticos dispensa intervenção manual.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Consumo Histórico', field: 'Últimas 4 semanas', icon: 'chart' },
        { name: 'Fornecedores', field: 'Catálogo e preços', icon: 'database' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '−30%', label: 'Ruturas de stock' },
        { value: 'Auto', label: 'Encomenda de reposição' },
        { value: '48h', label: 'Lead time médio' },
      ],
    },
    en: {
      kicker: 'INVENTORY',
      lines: [
        'View by item: current stock, minimum, purchase suggestion.',
        'Average usage over the last 4 weeks drives automatic restock.',
        'Red = below minimum, with a suggested order to the supplier.',
        'Auto-restock for critical items requires no manual intervention.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'Usage History', field: 'Last 4 weeks', icon: 'chart' },
        { name: 'Suppliers', field: 'Catalog & pricing', icon: 'database' },
      ],
      metricsLabel: 'KEY METRICS',
      metrics: [
        { value: '−30%', label: 'Stockout reduction' },
        { value: 'Auto', label: 'Restock orders' },
        { value: '48h', label: 'Avg lead time' },
      ],
    },
  },
  16: {
    'pt-BR': {
      kicker: 'CONTROLADOS',
      lines: [
        'Rastreabilidade completa por lote, validade e classe farmacêutica.',
        'Alerta automático 60 dias antes do vencimento de cada lote.',
        'Conformidade com ANVISA/SNGPC integrada ao fluxo da farmácia.',
        'Visualização de saldo por substância — crítico em destaque.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'ANVISA / SNGPC', field: 'Regulação federal', icon: 'shield' },
        { name: 'Rastreio por Lote', field: 'Validade e saldo', icon: 'database' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '60 dias', label: 'Alerta de vencimento' },
        { value: '100%', label: 'Rastreabilidade' },
        { value: 'SNGPC', label: 'Em conformidade' },
      ],
    },
    'pt-PT': {
      kicker: 'CONTROLADOS',
      lines: [
        'Rastreabilidade completa por lote, validade e classe farmacêutica.',
        'Alerta automático 60 dias antes da validade de cada lote.',
        'Conformidade com INFARMED integrada ao fluxo da farmácia.',
        'Visualização de saldo por substância — crítico em destaque.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'INFARMED', field: 'Regulação farmacêutica', icon: 'shield' },
        { name: 'Rastreio por Lote', field: 'Validade e saldo', icon: 'database' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '60 dias', label: 'Alerta de vencimento' },
        { value: '100%', label: 'Rastreabilidade' },
        { value: 'INFARMED', label: 'Em conformidade' },
      ],
    },
    en: {
      kicker: 'CONTROLLED',
      lines: [
        'Full traceability by lot, expiration, and drug schedule.',
        'Automatic alert 60 days before each lot expires.',
        'DEA compliance integrated into the pharmacy workflow.',
        'Balance view by substance — critical items highlighted.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'DEA / FDA', field: 'Drug regulation', icon: 'shield' },
        { name: 'Lot Tracking', field: 'Expiry & balance', icon: 'database' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '60 days', label: 'Expiry alert' },
        { value: '100%', label: 'Lot traceability' },
        { value: 'DEA', label: 'Compliant' },
      ],
    },
  },
  17: {
    'pt-BR': {
      kicker: 'COBRANÇA',
      lines: [
        'Sequência humanizada via WhatsApp: lembrete D-3, D-1, D+0.',
        'Botão PIX integrado — o paciente quita em segundos sem sair do chat.',
        'Confirmação automática de recebimento fecha o ciclo financeiro.',
        'Reduz inadimplência sem constranger o paciente.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'WhatsApp Business', field: 'Canal de cobrança', icon: 'message' },
        { name: 'PIX / Banco Central', field: 'Liquidação instantânea', icon: 'id' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '< 10 s', label: 'Confirmação PIX' },
        { value: '+35%', label: 'Redução inadimplência' },
        { value: 'D-3, D-1, D', label: 'Sequência de lembretes' },
      ],
    },
    'pt-PT': {
      kicker: 'COBRANÇA',
      lines: [
        'Sequência humanizada via WhatsApp: lembrete D-3, D-1, D+0.',
        'Botão MB WAY integrado — o doente paga em segundos sem sair do chat.',
        'Confirmação automática de recebimento fecha o ciclo financeiro.',
        'Reduz incumprimento sem constranger o doente.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'WhatsApp Business', field: 'Canal de cobrança', icon: 'message' },
        { name: 'MB WAY / Banco de Portugal', field: 'Liquidação instantânea', icon: 'id' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '< 10 s', label: 'Confirmação de pagamento' },
        { value: '+35%', label: 'Redução de incumprimento' },
        { value: 'D-3, D-1, D', label: 'Sequência de lembretes' },
      ],
    },
    en: {
      kicker: 'BILLING',
      lines: [
        'Humanized sequence via messaging: reminder D-3, D-1, D+0.',
        'Integrated instant-pay button — patient settles in seconds without leaving chat.',
        'Automatic payment confirmation closes the financial cycle.',
        'Reduces delinquency without embarrassing the patient.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'WhatsApp Business', field: 'Collection channel', icon: 'message' },
        { name: 'ACH / Zelle', field: 'Payment settlement', icon: 'id' },
      ],
      metricsLabel: 'KEY METRICS',
      metrics: [
        { value: '< 10 s', label: 'Payment confirmed' },
        { value: '+35%', label: 'Delinquency reduction' },
        { value: 'D-3, D-1, D', label: 'Reminder sequence' },
      ],
    },
  },
  19: {
    'pt-BR': {
      kicker: 'NOTAS FISCAIS',
      lines: [
        'NFS-e emitida automaticamente após cada atendimento.',
        'XML + PDF devolvidos ao paciente em tempo real.',
        'Status SEFAZ monitorado — rejeições tratadas sem intervenção manual.',
        'Totais mensais consolidados para contabilidade e auditoria.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'SEFAZ Municipal', field: 'Autoridade fiscal', icon: 'shield' },
        { name: 'Cadastro do Paciente', field: 'Dados do tomador', icon: 'id' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '< 5 s', label: 'Emissão automática' },
        { value: 'XML + PDF', label: 'Formatos entregues' },
        { value: '100%', label: 'SEFAZ monitorado' },
      ],
    },
    'pt-PT': {
      kicker: 'FATURAS',
      lines: [
        'Fatura eletrónica emitida automaticamente após cada consulta.',
        'XML + PDF devolvidos ao doente em tempo real.',
        'Comunicação à AT monitorada — rejeições tratadas sem intervenção manual.',
        'Totais mensais consolidados para contabilidade e auditoria.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'AT / e-Fatura', field: 'Autoridade tributária', icon: 'shield' },
        { name: 'Cadastro do Doente', field: 'Dados do tomador', icon: 'id' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '< 5 s', label: 'Emissão automática' },
        { value: 'XML + PDF', label: 'Formatos entregues' },
        { value: '100%', label: 'AT monitorada' },
      ],
    },
    en: {
      kicker: 'INVOICES',
      lines: [
        'E-invoice issued automatically after each visit.',
        'XML + PDF returned to the patient in real time.',
        'Tax authority status monitored — rejections handled without manual intervention.',
        'Monthly totals consolidated for accounting and audit.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'IRS / e-Filing', field: 'Tax authority', icon: 'shield' },
        { name: 'Patient Record', field: 'Billing entity', icon: 'id' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '< 5 s', label: 'Auto-issue' },
        { value: 'XML + PDF', label: 'Delivered formats' },
        { value: '100%', label: 'Status monitored' },
      ],
    },
  },
  20: {
    'pt-BR': {
      kicker: 'RECEITA',
      lines: [
        'Projeção de 12 meses com modelo VAR, sazonalidade e feriados.',
        'Banda de confiança IC 80% sombreada sobre a curva prevista.',
        'CAGR, pico sazonal e projeção total destacados como KPIs.',
        'Linha de corte "hoje" separa realizado de previsto no gráfico.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Modelo VAR', field: 'Série temporal', icon: 'chart' },
        { name: 'Calendário Nacional', field: 'Feriados e sazonalidade', icon: 'calendar' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '12 meses', label: 'Horizonte de projeção' },
        { value: 'IC 80%', label: 'Banda de confiança' },
        { value: 'CAGR', label: 'Crescimento anual' },
      ],
    },
    'pt-PT': {
      kicker: 'RECEITA',
      lines: [
        'Projeção de 12 meses com modelo VAR, sazonalidade e feriados.',
        'Banda de confiança IC 80% sombreada sobre a curva prevista.',
        'CAGR, pico sazonal e projeção total destacados como KPIs.',
        'Linha de corte "hoje" separa realizado de previsto no gráfico.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Modelo VAR', field: 'Série temporal', icon: 'chart' },
        { name: 'Calendário Nacional', field: 'Feriados e sazonalidade', icon: 'calendar' },
      ],
      metricsLabel: 'MÉTRICAS',
      metrics: [
        { value: '12 meses', label: 'Horizonte de projeção' },
        { value: 'IC 80%', label: 'Banda de confiança' },
        { value: 'CAGR', label: 'Crescimento anual' },
      ],
    },
    en: {
      kicker: 'REVENUE',
      lines: [
        '12-month projection using a VAR model with seasonality and holidays.',
        '80% confidence band shaded over the forecast curve.',
        'CAGR, seasonal peak, and total projection highlighted as KPIs.',
        '"Today" cutoff line separates actual from forecast in the chart.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'VAR Model', field: 'Time series', icon: 'chart' },
        { name: 'National Calendar', field: 'Holidays & seasonality', icon: 'calendar' },
      ],
      metricsLabel: 'KEY METRICS',
      metrics: [
        { value: '12 mo', label: 'Forecast horizon' },
        { value: 'IC 80%', label: 'Confidence band' },
        { value: 'CAGR', label: 'Annual growth' },
      ],
    },
  },
  21: {
    'pt-BR': {
      kicker: 'DIAGNÓSTICO',
      lines: [
        'Pipeline: sintomas → CID-10 com probabilidades calibradas → plano.',
        'Probabilidades calibradas — decisão final é sempre do médico.',
        'Plano sugerido inclui conduta imediata e gatilhos de encaminhamento.',
        'Red flag automático quando o quadro indica urgência ou reavaliação.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'CID-10 / OMS', field: 'Classificação padrão', icon: 'database' },
        { name: 'PubMed + Cochrane', field: 'Base de evidências', icon: 'file' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: 'IC 95%', label: 'Probabilidades calibradas' },
        { value: 'Red flag', label: 'Automático' },
        { value: 'CFM · ANS', label: 'Em conformidade' },
      ],
    },
    'pt-PT': {
      kicker: 'DIAGNÓSTICO',
      lines: [
        'Pipeline: sintomas → CID-10 com probabilidades calibradas → plano.',
        'Probabilidades calibradas — a decisão final é sempre do médico.',
        'Plano sugerido inclui conduta imediata e critérios de encaminhamento.',
        'Red flag automático quando o quadro indica urgência ou reavaliação.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'CID-10 / OMS', field: 'Classificação padrão', icon: 'database' },
        { name: 'PubMed + Cochrane', field: 'Base de evidências', icon: 'file' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: 'IC 95%', label: 'Probabilidades calibradas' },
        { value: 'Red flag', label: 'Automático' },
        { value: 'Ordem Médicos', label: 'Em conformidade' },
      ],
    },
    en: {
      kicker: 'DIAGNOSIS',
      lines: [
        'Pipeline: symptoms → ICD-10 with calibrated probabilities → plan.',
        "Calibrated probabilities — the final decision is always the physician\'s.",
        'Suggested plan includes immediate action and referral triggers.',
        'Automatic red flag when the presentation indicates urgency or reassessment.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'ICD-10 / WHO', field: 'Standard classification', icon: 'database' },
        { name: 'PubMed + Cochrane', field: 'Evidence base', icon: 'file' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '95% CI', label: 'Calibrated probabilities' },
        { value: 'Red flag', label: 'Auto-detected' },
        { value: 'AMA · CMS', label: 'Compliant' },
      ],
    },
  },
  22: {
    'pt-BR': {
      kicker: 'RISCO',
      lines: [
        'Score 0–100 combina comorbidades, idade e taxa de adesão.',
        'Pacientes em vermelho entram automaticamente em busca ativa.',
        'Expectativa de vida ajustada com intervalo de confiança 95%.',
        'Priorização objetiva substitui triagem subjetiva de risco.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Prontuário', field: 'Histórico clínico', icon: 'file' },
        { name: 'Tabelas Atuariais', field: 'Expectativa de vida', icon: 'chart' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: 'IC 95%', label: 'Intervalo de confiança' },
        { value: 'Score 0–100', label: 'Normalizado' },
        { value: 'Busca ativa', label: 'Casos críticos' },
      ],
    },
    'pt-PT': {
      kicker: 'RISCO',
      lines: [
        'Score 0–100 combina comorbilidades, idade e taxa de adesão.',
        'Doentes em vermelho entram automaticamente em busca ativa.',
        'Esperança de vida ajustada com intervalo de confiança 95%.',
        'Priorização objetiva substitui triagem subjetiva de risco.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Processo Clínico', field: 'Histórico clínico', icon: 'file' },
        { name: 'Tabelas Atuariais', field: 'Esperança de vida', icon: 'chart' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: 'IC 95%', label: 'Intervalo de confiança' },
        { value: 'Score 0–100', label: 'Normalizado' },
        { value: 'Busca ativa', label: 'Casos críticos' },
      ],
    },
    en: {
      kicker: 'RISK',
      lines: [
        'Score 0–100 combines comorbidities, age, and adherence rate.',
        'Red-flagged patients automatically enter active outreach.',
        'Adjusted life expectancy with 95% confidence interval.',
        'Objective prioritization replaces subjective risk triage.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'Patient Record', field: 'Clinical history', icon: 'file' },
        { name: 'Actuarial Tables', field: 'Life expectancy', icon: 'chart' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '95% CI', label: 'Confidence interval' },
        { value: 'Score 0–100', label: 'Normalized' },
        { value: 'Active outreach', label: 'Critical cases' },
      ],
    },
  },
  23: {
    'pt-BR': {
      kicker: 'TRAJETÓRIAS',
      lines: [
        'Diagrama de fluxo com probabilidades de desfecho por caminho.',
        'Triagem → tratamento A ou B → alta, com percentuais em cada aresta.',
        'Recuperação de cada via visível — compara eficácia dos caminhos.',
        'Visualização tipo Markov para decisão clínica baseada em evidência.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Modelo Markov', field: 'Transições de estado', icon: 'chart' },
        { name: 'Desfechos Históricos', field: 'Base de dados clínica', icon: 'database' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '4 vias', label: 'Caminhos mapeados' },
        { value: 'IC 95%', label: 'Por aresta do fluxo' },
        { value: 'Evidência', label: 'Base em meta-análises' },
      ],
    },
    'pt-PT': {
      kicker: 'TRAJETÓRIAS',
      lines: [
        'Diagrama de fluxo com probabilidades de desfecho por caminho.',
        'Triagem → tratamento A ou B → alta, com percentagens em cada aresta.',
        'Recuperação de cada via visível — compara eficácia dos caminhos.',
        'Visualização tipo Markov para decisão clínica baseada em evidência.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'Modelo Markov', field: 'Transições de estado', icon: 'chart' },
        { name: 'Desfechos Históricos', field: 'Base de dados clínica', icon: 'database' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: '4 vias', label: 'Caminhos mapeados' },
        { value: 'IC 95%', label: 'Por aresta do fluxo' },
        { value: 'Evidência', label: 'Base em meta-análises' },
      ],
    },
    en: {
      kicker: 'TRAJECTORIES',
      lines: [
        'Flow diagram with outcome probabilities per pathway.',
        'Triage → treatment A or B → discharge, with percentages on each edge.',
        'Recovery rate for each pathway visible — compare effectiveness.',
        'Markov-style visualization for evidence-based clinical decisions.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'Markov Model', field: 'State transitions', icon: 'chart' },
        { name: 'Historical Outcomes', field: 'Clinical database', icon: 'database' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '4 paths', label: 'Mapped pathways' },
        { value: '95% CI', label: 'Per flow edge' },
        { value: 'Evidence', label: 'Meta-analysis based' },
      ],
    },
  },
  24: {
    'pt-BR': {
      kicker: 'TRATAMENTO',
      lines: [
        'Matriz de combinações terapêuticas × desfechos clínicos.',
        'Cada célula traz probabilidade + intervalo de confiança 95%.',
        'Destaques visuais para combinações com maior evidência de eficácia.',
        'Base: meta-análises de UpToDate, PubMed e Cochrane — valores ilustrativos.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'UpToDate', field: 'Meta-análises clínicas', icon: 'file' },
        { name: 'PubMed + Cochrane', field: 'Evidências RCT', icon: 'file' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: 'IC 95%', label: 'Por célula da matriz' },
        { value: '4 × 3', label: 'Combinações × desfechos' },
        { value: 'Grau A', label: 'Evidência máxima' },
      ],
    },
    'pt-PT': {
      kicker: 'TRATAMENTO',
      lines: [
        'Matriz de combinações terapêuticas × desfechos clínicos.',
        'Cada célula traz probabilidade + intervalo de confiança 95%.',
        'Destaques visuais para combinações com maior evidência de eficácia.',
        'Base: meta-análises de UpToDate, PubMed e Cochrane — valores ilustrativos.',
      ],
      sourcesLabel: 'FONTES DE DADOS',
      sources: [
        { name: 'UpToDate', field: 'Meta-análises clínicas', icon: 'file' },
        { name: 'PubMed + Cochrane', field: 'Evidências RCT', icon: 'file' },
      ],
      metricsLabel: 'GARANTIAS',
      metrics: [
        { value: 'IC 95%', label: 'Por célula da matriz' },
        { value: '4 × 3', label: 'Combinações × desfechos' },
        { value: 'Grau A', label: 'Evidência máxima' },
      ],
    },
    en: {
      kicker: 'TREATMENT',
      lines: [
        'Matrix of therapeutic combinations × clinical outcomes.',
        'Each cell shows probability + 95% confidence interval.',
        'Visual highlights for combinations with strongest efficacy evidence.',
        'Based on meta-analyses from UpToDate, PubMed, and Cochrane — illustrative values.',
      ],
      sourcesLabel: 'DATA SOURCES',
      sources: [
        { name: 'UpToDate', field: 'Clinical meta-analyses', icon: 'file' },
        { name: 'PubMed + Cochrane', field: 'RCT evidence', icon: 'file' },
      ],
      metricsLabel: 'GUARANTEES',
      metrics: [
        { value: '95% CI', label: 'Per matrix cell' },
        { value: '4 × 3', label: 'Combos × outcomes' },
        { value: 'Grade A', label: 'Top evidence' },
      ],
    },
  },
}

/* ───────────────────────── FECHO (§6.12) ───────────────────────── */
export const FECHO = {
  'pt-BR': { thanks: 'Obrigado.', tagline: 'Inteligência clínica para a saúde moderna.' },
  'pt-PT': { thanks: 'Obrigado.', tagline: 'Inteligência clínica para a saúde moderna.' },
  en: { thanks: 'Thank you.', tagline: 'Clinical intelligence for modern healthcare.' },
} satisfies L10n<{ thanks: string; tagline: string }>

/* ───────────────────────── UI (microtextos de helpers compartilhados) ───────────────────────── */
type UIStrings = {
  dose: string; freq: string; previsto: string
  stockOk: string; stockLow: string; stockCritical: string; ic95: string
  sourcesDemo: string; sourcesMedical: string
}
export const UI = {
  'pt-BR': {
    dose: 'dose', freq: 'freq', previsto: 'previsto',
    stockOk: 'ok', stockLow: 'baixo · pedido', stockCritical: 'crítico · auto-restock', ic95: 'IC 95%',
    sourcesDemo: 'Demonstração interativa · dados ilustrativos de produto',
    sourcesMedical: 'Base de evidências do modelo: UpToDate · PubMed · Cochrane · CFM · ANS · valores ilustrativos',
  },
  'pt-PT': {
    dose: 'dose', freq: 'freq', previsto: 'previsto',
    stockOk: 'ok', stockLow: 'baixo · encomenda', stockCritical: 'crítico · reposição', ic95: 'IC 95%',
    sourcesDemo: 'Demonstração interativa · dados ilustrativos de produto',
    sourcesMedical: 'Base de evidências do modelo: UpToDate · PubMed · Cochrane · Ordem dos Médicos · ERS · valores ilustrativos',
  },
  en: {
    dose: 'dose', freq: 'freq', previsto: 'forecast',
    stockOk: 'ok', stockLow: 'low · ordered', stockCritical: 'critical · auto-restock', ic95: '95% CI',
    sourcesDemo: 'Interactive demo · illustrative product data',
    sourcesMedical: 'Model evidence base: UpToDate · PubMed · Cochrane · AMA · CMS · illustrative values',
  },
} satisfies L10n<UIStrings>
