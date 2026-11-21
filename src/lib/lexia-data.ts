export interface OfficialSource {
  name: string;
  url: string;
  desc: string;
  uses: string;
}

export const SOURCES: OfficialSource[] = [
  {
    name: "BACN — Leyes Paraguayas",
    url: "https://www.bacn.gov.py/leyes-paraguayas",
    desc: "Base de leyes desde 1869, Constitución Nacional y Códigos. Se consulta texto vigente, historia y concordancias.",
    uses: "Honorarios, Legislación, Contratos, Ejecutivos",
  },
  {
    name: "Poder Judicial",
    url: "https://www.pj.gov.py/",
    desc: "Portal institucional del Poder Judicial del Paraguay. Información, servicios y acceso a sistemas.",
    uses: "Todos los Módulos",
  },
  {
    name: "CSJ Gestión",
    url: "https://www.csj.gov.py/gestion/",
    desc: "Sistema de Gestión Jurisdiccional. Ingreso con usuario y clave para abogados matriculados. Seguimiento de expedientes.",
    uses: "Vigilancia, Litigios, Gestión",
  },
  {
    name: "CSJ Portal",
    url: "https://www.csj.gov.py/portal",
    desc: "Portal Jurisdiccional para consulta pública de casos y actuaciones disponibles.",
    uses: "Vigilancia, Jurisprudencia",
  },
  {
    name: "CSJ Login",
    url: "https://apps.csj.gov.py/login",
    desc: "Acceso a aplicaciones CSJ. Punto de entrada a los sistemas jurisdiccionales.",
    uses: "Vigilancia, Gestión",
  },
  {
    name: "CSJ Ingresos Judiciales",
    url: "https://apps.csj.gov.py/ingresos-judiciales",
    desc: "Mesa de Entrada: ingresos, liquidaciones y presentación de escritos y demandas.",
    uses: "Ejecutivos, Escritos, Gestión",
  },
  {
    name: "CSJ Jurisprudencia",
    url: "https://www.csj.gov.py/jurisprudencia/",
    desc: "Base de Jurisprudencia CSJ desde 1995. Salas Civil, Penal y Constitucional. Acceso libre y gratuito.",
    uses: "Jurisprudencia, Predicción, Revisión",
  },
  {
    name: "CSJ Legislación",
    url: "https://www.csj.gov.py/legislacion/",
    desc: "Base de Legislación Paraguaya. Leyes y decretos desde 1869, con búsqueda por número y materia.",
    uses: "Honorarios, Compliance, Contratos",
  },
];

export function getSource(idx: number): OfficialSource {
  return SOURCES[idx] ?? (SOURCES[0] as OfficialSource);
}

export type ModuleIconKey =
  | "calculator"
  | "gavel"
  | "eye"
  | "file-text"
  | "landmark"
  | "shield-check"
  | "briefcase"
  | "trending-up"
  | "users"
  | "file-check"
  | "folder-search"
  | "lock";

export interface LexModule {
  id: number;
  code: string;
  title: string;
  short: string;
  icon: ModuleIconKey;
  legal: string;
  source: number;
  functions: string[];
}

export const MODULES: LexModule[] = [
  {
    id: 1,
    code: "LEX IA Honorarios",
    title: "Honorarios",
    short: "Verificador, cotizador y calculadora judicial con Ley 1376/88.",
    icon: "calculator",
    legal:
      "Ley N° 1376/88, mod. Ley N° 4590/12 — Arts. 25, 32, 33, 44 y sgtes. Jornal Gs. 117.077, Res. MTESS N° 670/2026.",
    source: 0,
    functions: [
      "1.1 Verificador extrajudicial",
      "1.2 Cotizador para abogados",
      "1.3 Calculadora judicial — 88+ actuaciones",
      "1.4 Tres modalidades: porcentaje Art. 32, jornales Arts. 44+, mixta",
      "1.5 Cálculo por instancia con reducciones: 1ª 5–20%; 2ª/3ª 25–35% de la 1ª",
      "1.6 Jornal visible Gs. 117.077 — Res. 670/2026",
      "1.7 PDF con citas legales",
      "1.8 Enlace compartible Pro",
      "1.9 Liquidación laboral",
      "1.10 Horas extras",
      "1.11 Cálculo sin datos identificatorios",
      "1.12 Historial de cálculos",
      "1.13 Planes Gratis / Pro / Miembro Fundador",
    ],
  },
  {
    id: 2,
    code: "LEX IA Jurisprudencia",
    title: "Jurisprudencia",
    short: "Búsqueda semántica y exacta sobre fallos de la CSJ, con fuente trazable.",
    icon: "gavel",
    legal: "CSJ Jurisprudencia desde 1995. Salas Civil, Penal y Constitucional.",
    source: 6,
    functions: [
      "2.1 Búsqueda semántica",
      "2.2 Búsqueda híbrida",
      "2.3 Búsqueda exacta",
      "2.4 Búsqueda por N° de A. y S.",
      "2.5 Filtros: materia, tribunal, sala, año, magistrado",
      "2.6 Visor PDF del fallo",
      "2.7 Chat Lexia — investigación oficial",
      "2.8 Contar el caso en lenguaje claro",
      "2.9 Respuesta con fuente trazable",
      "2.10 Distinción criterio vs. argumentos",
      "2.11 Preferencia “no encontré”",
      "2.12 Legislación con concordancias — Código del Trabajo",
      "2.13 Guía para pedir sin datos identificatorios",
      "2.14 Planes Explorar / Profesional",
    ],
  },
  {
    id: 3,
    code: "LEX IA Vigilancia",
    title: "Vigilancia",
    short: "Monitoreo de expedientes CSJ con alertas, resumen IA y descarga de providencias.",
    icon: "eye",
    legal: "Acordada CSJ N° 1798/25 — usuario único. Ley N° 7593/2025.",
    source: 2,
    functions: [
      "3.1 Vinculación de credenciales CSJ con cifrado AES-256",
      "3.2 Importación masiva por matrícula CSJ",
      "3.3 Alta manual de expedientes",
      "3.4 Monitoreo periódico vía API directa — 7:01 / 9:30 / 13:01",
      "3.5 Detección de nuevas actuaciones",
      "3.6 Descarga de providencias en PDF",
      "3.7 Resumen IA de cada actuación",
      "3.8 Alertas por WhatsApp y correo",
      "3.9 Centro de notificaciones",
      "3.10 Organización: activos y archivados",
      "3.11 Espacio de trabajo y roles",
      "3.12 Seguridad: la contraseña nunca queda en registros",
      "3.13 Límites: 12 consultas por minuto",
      "3.14 Prueba 14 días — hasta 10 expedientes",
    ],
  },
  {
    id: 4,
    code: "LEX IA Contratos",
    title: "Contratos",
    short: "Wizards laborales y de servicios con 92 cláusulas y validación vigente.",
    icon: "file-text",
    legal: "Ley N° 213/93 Código del Trabajo. Ley N° 1183/85 Código Civil Paraguayo.",
    source: 7,
    functions: [
      "4.1 Wizard laboral — 7 pasos",
      "4.2 Wizard de servicios — 5 pasos",
      "4.3 10 tipos de contrato",
      "4.4 Laborales: indefinido, plazo fijo, obra determinada — Ley 213/93",
      "4.5 Servicios: profesionales, consultoría, gestión comercial, gerencia, técnicos, entrega, outsourcing — Código Civil",
      "4.6 Sistema de 92 cláusulas",
      "4.7 Cláusulas en texto completo",
      "4.8 Asistente IA sugiere cláusulas",
      "4.9 Validación con legislación vigente",
      "4.10 Generación DOCX / PDF",
      "4.11 Personalización del estudio",
      "4.12 Auto-guardado del borrador",
    ],
  },
  {
    id: 5,
    code: "LEX IA Ejecutivos",
    title: "Ejecutivos",
    short: "Juicio ejecutivo completo, del título a la liquidación y el embargo.",
    icon: "landmark",
    legal: "Código Procesal Civil — Arts. 439 a 466 (juicio ejecutivo).",
    source: 5,
    functions: [
      "5.1 Títulos ejecutivos Art. 439: cheque, pagaré, factura conformada, crédito documentario",
      "5.2 Preparación de vía ejecutiva Art. 442",
      "5.3 Excepciones Art. 448: incompetencia, personería, falsedad, prescripción, pago, compensación, quita, espera, remisión, cosa juzgada",
      "5.4 Embargo Art. 451",
      "5.5 Sentencia de remate Art. 453",
      "5.6 Liquidación Arts. 459–466",
      "5.7 Motor de plazos procesales",
      "5.8 Control de embargos",
      "5.9 Cálculo de intereses",
    ],
  },
  {
    id: 6,
    code: "LEX IA Compliance",
    title: "Compliance",
    short: "Auditoría MTESS, checklists digitales y multas con Decreto 1989/24.",
    icon: "shield-check",
    legal: "Decreto N° 1989/24 — multas MTESS. Ley N° 213/93.",
    source: 7,
    functions: [
      "6.1 Auditoría MTESS",
      "6.2 Checklists digitales por área",
      "6.3 Clasificación IA de documentos",
      "6.4 Calculadora de multas — Decreto 1989/24",
      "6.5 Reportes en PDF",
      "6.6 Plan de acción con responsables y plazos",
      "6.7 Seguimiento de correcciones y evidencias",
    ],
  },
  {
    id: 7,
    code: "LEX IA Litigios Laborales",
    title: "Litigios Laborales",
    short: "Gestión integral de juicios laborales, conectada con liquidación y horas extras.",
    icon: "briefcase",
    legal: "Ley N° 213/93, mod. Ley N° 496/94 — Arts. 84, 205–207, 218, 219.",
    source: 2,
    functions: [
      "7.1 Gestión integral de juicios laborales",
      "7.2 Vínculo con Honorarios Laboral: liquidación + horas extras como insumo",
      "7.3 Estado: En funcionamiento — etapas, plazos y responsables",
    ],
  },
  {
    id: 8,
    code: "LEX IA Predicción",
    title: "Predicción",
    short: "Probabilidad de éxito con intervalo de confianza y simulación de escenarios.",
    icon: "trending-up",
    legal: "Sobre jurisprudencia real de 2ª instancia. La decisión final siempre es humana.",
    source: 6,
    functions: [
      "8.1 Probabilidad de éxito con intervalo de confianza, perfilado de magistrados, simulación de escenarios, sobre jurisprudencia real de 2ª instancia",
    ],
  },
  {
    id: 9,
    code: "LEX IA Gestión",
    title: "Gestión",
    short: "CRM legal: clientes, casos, agenda, facturación y seguimiento.",
    icon: "users",
    legal: "Ley N° 7593/2025 — Protección de Datos Personales.",
    source: 1,
    functions: [
      "9.1 CRM legal",
      "9.2 Clientes y contactos",
      "9.3 Casos y expedientes",
      "9.4 Agenda y plazos",
      "9.5 Facturación",
      "9.6 Seguimiento y notas por caso",
    ],
  },
  {
    id: 10,
    code: "LEX IA Escritos",
    title: "Escritos",
    short: "Escritos, dictámenes y resoluciones automatizados desde los datos del caso.",
    icon: "file-check",
    legal:
      "Ley N° 1337/88 Código Procesal Civil. Ley N° 1183/85 Código Civil. Ley N° 6380/19 para asuntos tributarios.",
    source: 5,
    functions: [
      "9.4 Escritos automatizados",
      "9.5 Dictámenes",
      "9.6 Resoluciones — plantillas revisables con supervisión humana",
    ],
  },
  {
    id: 11,
    code: "LEX IA Revisión",
    title: "Revisión",
    short: "Revisión masiva E-Discovery: clasificación, búsqueda y relevancia.",
    icon: "folder-search",
    legal: "Ley N° 7593/2025. Revisión con trazabilidad y control humano.",
    source: 6,
    functions: [
      "9.7 Revisión masiva E-Discovery",
      "9.8 Clasificación y búsqueda por tema, fecha y relevancia",
    ],
  },
  {
    id: 12,
    code: "LEX IA Privacidad",
    title: "Privacidad",
    short: "Anonimización local antes de enviar a un modelo externo y re-identificación.",
    icon: "lock",
    legal: "Ley N° 7593/2025 — Protección de Datos Personales.",
    source: 1,
    functions: [
      "9.9 Anonimización local antes de ChatGPT / Claude",
      "9.10 Re-identificación controlada en el estudio — solo con autorización",
    ],
  },
];

export function getModule(id: number | undefined): LexModule {
  return MODULES.find((x) => x.id === id) ?? (MODULES[0] as LexModule);
}

export interface Fallo {
  n: string;
  fecha: string;
  sala: string;
  magistrado: string;
  materia: string;
  extracto: string;
}

// Case results are retrieved from the official CSJ search, never synthesized.
export const FALLOS: Fallo[] = [];

export const DOCUMENTOS = [
  {
    t: "Contrato de servicios — Consultoría 2024",
    tema: "Contratos",
    rel: 94,
    fecha: "12/02/2024",
  },
  { t: "Demanda laboral — Despido y liquidación", tema: "Laboral", rel: 91, fecha: "03/03/2024" },
  { t: "Pagaré y reconocimiento de deuda", tema: "Ejecutivo", rel: 88, fecha: "19/04/2024" },
  {
    t: "Acta de inspección MTESS — Sucursal Central",
    tema: "Compliance",
    rel: 82,
    fecha: "22/05/2024",
  },
  {
    t: "A. y S. sobre prescripción — extracto",
    tema: "Jurisprudencia",
    rel: 78,
    fecha: "08/06/2024",
  },
  { t: "Poder general para juicios — Estudio", tema: "Gestión", rel: 66, fecha: "15/07/2024" },
];

export const CLAUSULAS = [
  "Confidencialidad",
  "Plazo y renovación",
  "Honorarios y forma de pago",
  "Responsabilidad y límites",
  "Propiedad intelectual",
  "Protección de datos — Ley 7593/2025",
  "Resolución y rescisión",
  "Jurisdicción en Asunción",
];

export const PASOS_EJECUTIVO = [
  "Título ejecutivo válido — Art. 439",
  "Deuda líquida y exigible",
  "Preparación de vía — Art. 442",
  "Notificación al demandado",
  "Excepciones dentro del plazo — Art. 448",
  "Embargo solicitado — Art. 451",
  "Sentencia de remate — Art. 453",
  "Liquidación — Arts. 459–466",
];

export const TIPOS_CONTRATO = [
  "Laboral indefinido",
  "Laboral plazo fijo",
  "Obra determinada",
  "Servicios profesionales",
  "Consultoría",
  "Gestión comercial",
  "Gerencia",
  "Servicios técnicos",
  "Entrega",
  "Outsourcing",
];

export const LEGISLACION_CITADA =
  "Constitución Nacional • Ley N° 1376/88, mod. Ley N° 4590/12, Arts. 25, 32, 33, 44 y sgtes. • Ley N° 213/93, mod. Ley N° 496/94, Arts. 84, 205–207, 218, 219 • Ley N° 1183/85 Código Civil • Ley N° 6380/19 tributaria • Ley N° 1337/88 Código Procesal Civil, Arts. 439 a 466 • Decreto N° 1989/24 • Res. MTESS N° 670/2026 • Ley N° 7593/2025 • Acordada CSJ N° 1798/25 • Ley N° 1160/97 Código Penal.";

export const FAQ: [string, string][] = [
  [
    "¿Qué es LEX IA PY?",
    "Una plataforma legal para Paraguay con 12 Módulos en funcionamiento: honorarios, jurisprudencia, vigilancia, contratos, ejecutivos, compliance, litigios laborales, predicción, gestión, escritos, revisión y privacidad.",
  ],
  [
    "¿Reemplaza al abogado?",
    "No. La supervisión humana va primero. LEX IA PY prepara, calcula, busca y resume; la decisión y la firma son del profesional.",
  ],
  [
    "¿Cómo verifico un resultado?",
    "Cada módulo muestra su fundamento legal y un enlace “Verificar en fuente oficial” a BACN, Poder Judicial o CSJ.",
  ],
  [
    "¿Qué datos se usan para entrenar?",
    "Los datos del cliente nunca se usan para entrenar modelos. Hay aislamiento por tenant, cifrado y control bajo la Ley N° 7593/2025.",
  ],
  [
    "¿Puedo probar antes de pagar?",
    "Sí: hay planes gratuitos para explorar y la Vigilancia incluye prueba de 14 días hasta 10 expedientes.",
  ],
];
