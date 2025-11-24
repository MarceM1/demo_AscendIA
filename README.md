# 🚀 AscendIA — Plataforma de Simulación de Entrevistas Impulsada por IA  
### *Ingeniería de Producto · Next.js 15 · Clerk · Drizzle ORM · Neon · Vapi · Sentry*

AscendIA es una plataforma diseñada para **practicar entrevistas laborales con agentes de IA realistas**, construida con un enfoque **server-first**, arquitectura moderna y calidad de ingeniería orientada a producto.

Su objetivo es brindar una experiencia completa y profesional:  
**crear → simular → analizar → mejorar** el desempeño del usuario en entrevistas técnicas y no técnicas.

<div align="center">

![Next](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Clerk](https://img.shields.io/badge/Auth-Clerk-orange)
![Database](https://img.shields.io/badge/DB-Neon%20%2B%20Drizzle-00c7b7)
![AI](https://img.shields.io/badge/AI-Vapi-green)
![Sentry](https://img.shields.io/badge/Monitoring-Sentry-red)
![Status](https://img.shields.io/badge/Estado-En%20Desarrollo-blue)

</div>

<br></br>
<br></br>

# 🌟 ¿Qué es AscendIA?

AscendIA es un **simulador de entrevistas impulsado por agentes de IA**, capaz de ajustar tono, área profesional, dificultad y estilo de interacción según las preferencias del usuario.

Conecta tu **perfil**, tus **habilidades**, tu **experiencia** y tu **CV** (en próximos módulos), generando entrevistas vivas y realistas con entrevistadores virtuales como *Luciana, Michael, Bob, Liza*, entre otros.

Cada sesión genera:

- ✔ **Preguntas dinámicas y contextuales**
- ✔ **Puntaje cuantitativo**
- ✔ **Feedback profesional**
- ✔ **Transcripción completa**
- ✔ **Historial y mejoras en el tiempo**

<br></br>

# 🧩 Características Principales

### 🔐 Autenticación híbrida con Clerk + Neon
- Clerk para identidad y sesiones  
- Sincronización interna automatizada  
- Webhooks verificados con Svix  
- Auditorías completas en `webhook_logs`

### 🤖 Simulación IA con entrevistadores virtuales (Vapi)
- Personalidades configurables  
- Diferentes áreas profesionales  
- Escenarios dinámicos  
- Integración server-first  
- Próximo: soporte para CV en PDF

### 🏗️ Arquitectura moderna con Next.js 15
- Server Components  
- Server Actions para lógica crítica  
- Reducido uso de Client Components  
- Rutas optimizadas y UI islands controladas

### 📊 Métricas y seguimiento del progreso
- `score`, `feedback`, `duración`  
- Seguimiento histórico del desempeño  
- Base sólida para un dashboard avanzado

### 🗄️ Persistencia robusta con Drizzle + Neon
- Relaciones tipadas  
- Migraciones seguras  
- Normalización por módulos  
- Auditoría de sesiones

<br></br>

# 🏛 Arquitectura Técnica (Vista General)

El stack sigue principios modernos:

- **Server-first**
- **Sin APIs REST innecesarias**
- **Tipado end-to-end con TypeScript + Drizzle**
- **Webhooks auditados**
- **Integración IA declarativa**

Todos los diagramas técnicos están disponibles acá:

➡️ **[ARCHITECTURE_DIAGRAMS.md](./docs/ARCHITECTURE_DIAGRAMS.md)**

Incluye diagramas de:
- Arquitectura general
- Modelo de datos
- Flujo de autenticación
- Módulo Interviews
- Integración Vapi
- Lógica server-first

<br></br>

# 🧪 Módulos del MVP (v2025-11)

### ✔ Autenticación y Usuarios
- Clerk (auth + sessions)
- `syncUserWithDatabase()`
- Webhooks consistentes e idempotentes
- Perfiles, sesiones y skills en tablas separadas

### ✔ Módulo de Entrevistas
- Formulario dinámico
- Zod en cliente + servidor
- Server Actions seguras
- Listado de entrevistas por usuario
- Integración con Vapi en desarrollo

### ✔ Métricas
- Total de entrevistas
- Score promedio
- Última mejora
- Capacidad para dashboards avanzados

<br></br>

# 🧭 Roadmap (Próximos 30 días)

| Prioridad | Feature |
|----------|---------|
| ⭐⭐⭐⭐⭐ | Integración completa con Vapi (streaming, scoring adaptativo) |
| ⭐⭐⭐⭐ | Carga y análisis de CV en PDF |
| ⭐⭐⭐ | Dashboard de estadísticas |
| ⭐⭐ | Mejora de UX (loading, steps, feedback visual) |
| ⭐ | Modo libre de práctica |

<br></br>

# 📸 Capturas (próximamente)

- Dashboard  
- Formulario New Interview  
- Entrevista en tiempo real  
- Resultados y feedback  

<br></br>

# 📖 Dossier Técnico

El dossier oficial incluye:

- Arquitectura completa  
- Decisiones de ingeniería  
- Server actions críticas  
- Modelo de datos Drizzle  
- Integración Clerk ↔ Neon  
- Desarrollo del módulo Interviews  
- Evaluación técnica y narrativa profesional  

➡️  **[AscendIA_Dossier_v2025-11.md](./docs/AscendIA_Dossier_v2025-11.md)**

<br></br>
---

# 👨‍💻 Autor — *Marcelo Melogno*  
### *Ingeniero de Producto — IA Aplicada · Arquitectura Server-First · Experiencias Interactivas*

AscendIA forma parte de mi proceso de consolidación profesional como **Ingeniero de Producto**, integrando:

- Arquitectura moderna  
- Diseño orientado a experiencia  
- Soluciones con IA aplicada  
- Pensamiento sistémico  
- Obsesión por la calidad técnica y narrativa del producto  


<br></br>

<div align="center">

### *AscendIA combina ingeniería sólida, visión de producto y una experiencia diseñada para mejorar la empleabilidad real en el mercado laboral moderno.*  
**v2025-11**

</div>
