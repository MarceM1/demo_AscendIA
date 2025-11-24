<div align="center">

# 🚀 AscendIA  
### Plataforma modular de entrevistas laborales simuladas con IA  
**Next.js 15 · Clerk · Drizzle ORM · Neon · Vapi · Sentry**

AscendIA combina **arquitectura server-first**, autenticación híbrida y agentes conversacionales para ofrecer un flujo completo de entrevistas profesionales impulsadas por IA.

![Status](https://img.shields.io/badge/Estado-En%20Desarrollo-blue)
![MVP](https://img.shields.io/badge/Meta-MVP%20Funcional-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Clerk](https://img.shields.io/badge/Auth-Clerk-orange)
![AgentIA](https://img.shields.io/badge/AI-Vapi-green)
![Database](https://img.shields.io/badge/DB-Neon%20%2B%20Drizzle-00c7b7)
![Observability](https://img.shields.io/badge/Monitoring-Sentry-red)

</div>

---

<br></br>

# 🎯 Objetivo General

> Completar el **flujo principal de AscendIA**:  
> **Crear → Ejecutar → Guardar → Visualizar** una entrevista impulsada por IA.  
>
> Al cierre de noviembre, el sistema debe estar en estado **MVP funcional, observable y presentable**, listo para demo pública y portfolio técnico.

---
<br></br>

# 📆 Roadmap Técnico MVP (Noviembre 2025)

## **Semana 1 — Creación de entrevistas y flujo base**  
📅 *10 al 16 de noviembre*  
🎯 *Meta:* habilitar creación de entrevistas + envío inicial al agente IA.

### Tareas
- [x] Actualizar schema `interviews` con `AREA_ENUM` e `INTERVIEWER_ENUM`.
- [x] Crear `NewInterviewForm` con validaciones (`zod`).
- [ ] Implementar `createInterviewAction`:
  - [x] Recibir datos del form.
  - [ ] Disparar sesión inicial en Vapi.
  - [ ] Persistir registro con estado `pending`.
- [ ] Agregar estados de UI (`loading`, `error`, `success`).
- [ ] Registrar logs básicos en Sentry.

**Resultado esperado:**  
El usuario puede iniciar una entrevista y registrar el evento en la DB.

---
<br></br>


## **Semana 2 — Interacción IA + persistencia inteligente**  
📅 *17 al 23 de noviembre*  
🎯 *Meta:* integrar el flujo conversacional del agente IA y guardado de resultados.

### Tareas
- [ ] Manejo de stream o callbacks del agente IA.
- [ ] Guardar transcripción, `score` y `feedback`.
- [ ] Ajustar schema `interviews` (fields de resultado).
- [ ] Implementar `syncInterviewResultAction` o webhook.
- [ ] Añadir métricas básicas (duración, tokens, costo IA).

**Resultado esperado:**  
Las entrevistas se ejecutan con IA y quedan almacenadas correctamente.

---
<br></br>

## **Semana 3 — Visualización y cierre del MVP**  
📅 *24 al 30 de noviembre*  
🎯 *Meta:* mostrar entrevistas pasadas, resultados y estadísticas.

### Tareas
- [x] Crear `MyInterviews` (Server Component + Drizzle).
- [ ] Añadir `InterviewDetails` (score, feedback, transcript).
- [ ] Crear `DashboardStats` con métricas base.
- [ ] Refinar UX del dashboard (header, loading, colores).
- [ ] Pruebas manuales + logs Sentry.
- [ ] Actualizar dossier técnico: **Consolidación del MVP y circuito IA**.

**Resultado esperado:**  
El usuario puede revisar entrevistas pasadas, resultados y métricas personales.

---
<br></br>

# 🎁 Entregables Finales (21 al 31 de diciembre)

| Entregable | Descripción |
|-----------|-------------|
| **Feature completa** | Flujo IA: crear → ejecutar → guardar → visualizar. |
| **Dashboard funcional** | `new-interview`, `my-interviews`, `profile`, `stats`. |
| **Base de datos consolidada** | Schema final Drizzle + Neon. |
| **Observabilidad mínima** | Logs en Sentry + eventos clave. |
| **Dossier técnico** | Bloque “Consolidación del MVP y circuito IA”. |

---
<br></br>

# ⭐ Bonus (Opcional)
- [ ] Carga de CV PDF + parsing inicial.
- [ ] Modo práctica (sin persistencia en DB).
- [ ] Demo en video para LinkedIn.

---
<br></br>

# 🧩 Resultado Final — *Noviembre 2025*

> **AscendIA MVP listo para presentación profesional.**  
> Flujo de entrevistas IA funcional, arquitectura server-first madura, trazabilidad mínima y documentación completa.  
>
> AscendIA se convierte en una **vitrina real de ingeniería de producto con IA**.

---
<br></br>

# 📊 Diagramas del Sistema

Los diagramas completos de arquitectura (server-first), autenticación híbrida, modelo de datos y flujos IA están disponibles en:

➡️ **[ARCHITECTURE_DIAGRAMS.md](./ARCHITECTURE_DIAGRAMS.md)**

Incluye:
- Arquitectura completa.
- Flujo Clerk ↔ DB.
- Modelo de datos Drizzle + Neon.
- Flujos del módulo Interviews.
- Diagramas de secuencia IA.

---
<br></br>

<div align="center">

### *Construido con visión de producto, solidez técnica y foco en experiencia real.*  
**Marcelo Melogno — Ingeniero de Producto**

</div>
