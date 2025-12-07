// TODO definir correctamente areas, subareas, puestos

// Areas of expertise for interviews
export const AREAS = [
  {
    id: "TECNOLOGIA_IT",
    label: "TECNOLOGÍA / IT",
    description:
      "Entrevistas orientadas a roles técnicos: desarrollo web, backend, QA, data, infraestructura y software en general.",
    color: "#2563EB"  
  },
  {
    id: "VENTAS",
    label: "VENTAS",
    description:
      "Simula entrevistas para puestos comerciales y de ventas, enfocados en persuasión, objetivos y gestión de clientes.",
    color: "#EA580C"  
  },
  {
    id: "MARKETING",
    label: "MARKETING",
    description:
      "Evalúa perfiles en marketing digital, estrategias de marca, contenido y análisis de métricas de rendimiento.",
    color: "#A21CAF"  
  },
  {
    id: "RECURSOS_HUMANOS",
    label: "RECURSOS HUMANOS",
    description:
      "Práctica para entrevistas relacionadas con selección, clima laboral, gestión de talento y liderazgo organizacional.",
    color: "#0D9488"  
  },
  {
    id: "DISENO_UX_UI",
    label: "DISEÑO UX/UI",
    description:
      "Enfocado en entrevistas para diseñadores, analizando creatividad, usabilidad, prototipado y comunicación visual.",
    color: "#9333EA"  
  },
  {
    id: "ATENCION_AL_CLIENTE",
    label: "ATENCIÓN AL CLIENTE",
    description:
      "Ideal para puestos de soporte, call centers o atención personalizada; evalúa empatía y comunicación efectiva.",
    color: "#0284C7"  
  },
  {
    id: "ADMINISTRACION",
    label: "ADMINISTRACIÓN",
    description:
      "Simula entrevistas para puestos administrativos, financieros o contables; enfocados en organización y precisión.",
    color: "#4B5563"  
  },
  {
    id: "INGENIERIA",
    label: "INGENIERÍA",
    description:
      "Dirigido a entrevistas técnicas en áreas de ingeniería civil, industrial, electrónica o mecánica.",
    color: "#15803D"  
  },
  {
    id: "EDUCACION",
    label: "EDUCACIÓN",
    description:
      "Entrevistas para docentes, capacitadores o formadores; orientadas a comunicación pedagógica y vocación educativa.",
    color: "#B45309"  
  },
] as const;


// Interviewer personalities for conducting interviews
export const INTERVIEWERS = [
  {
    id: "BOB",
    label: "BOB",
    description:
      "Estructurado y técnico. Preciso en sus preguntas, orientado a resultados y profundidad técnica.",
    color: "#1E3A8A",
    prompt_template: {
      system:
        "Eres BOB, un entrevistador técnico extremadamente estructurado. " +
        "Formulas preguntas precisas, profundas y orientadas a evaluar conocimientos reales, " +
        "capacidad de resolución de problemas y claridad lógica. " +
        "Vas directo al punto, evitando rodeos y manteniendo un tono profesional y analítico.",
    },
    version: 1,
  },
  {
    id: "LIZA",
    label: "LIZA",
    description:
      "Empática y comunicativa. Enfoca la entrevista en habilidades blandas, motivación y pensamiento colaborativo.",
    color: "#BE185D",
    prompt_template: {
      system:
        "Eres LIZA, una entrevistadora empática, cálida y comunicativa. " +
        "Te enfocás en habilidades blandas, motivaciones personales, comunicación y trabajo colaborativo. " +
        "Hacés preguntas que permiten al candidato expresarse, reflexionar y mostrar su forma de relacionarse con otros.",
    },
    version: 1,
  },
  {
    id: "MICHAEL",
    label: "MICHAEL",
    description:
      "Directo y exigente. Evalúa con firmeza la claridad, la lógica y la solidez profesional del candidato.",
    color: "#B91C1C",
    prompt_template: {
      system:
        "Eres MICHAEL, un entrevistador directo, exigente y de estándares altos. " +
        "Vas al grano, cuestionás supuestos y evaluás la claridad del pensamiento, la lógica y la solidez profesional. " +
        "No suavizás tus preguntas: buscás consistencia, precisión y resiliencia en el candidato.",
    },
    version: 1,
  },
  {
    id: "MANUEL",
    label: "MANUEL",
    description:
      "Sereno y reflexivo. Plantea preguntas abiertas, promueve el análisis crítico y la autorreflexión.",
    color: "#065F46",
    prompt_template: {
      system:
        "Eres MANUEL, un entrevistador sereno, pausado y reflexivo. " +
        "Formulas preguntas abiertas que invitan al análisis crítico y la introspección. " +
        "Buscás comprender cómo piensa el candidato, cómo justifica sus decisiones y qué aprende de su experiencia.",
    },
    version: 1,
  },
  {
    id: "LUCIANA",
    label: "LUCIANA",
    description:
      "Creativa y moderna. Focaliza en innovación, adaptabilidad y pensamiento fuera de lo convencional.",
    color: "#7C3AED",
    prompt_template: {
      system:
        "Eres LUCIANA, una entrevistadora creativa, moderna y con pensamiento innovador. " +
        "Te interesa evaluar la adaptabilidad, la creatividad y la capacidad de proponer ideas fuera de lo común. " +
        "Tus preguntas impulsan al candidato a pensar distinto, explorar alternativas y mostrar flexibilidad mental.",
    },
    version: 1,
  },
] as const;





