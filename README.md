<div align="center">

# AscendIA es una plataforma modular que simula entrevistas laborales impulsadas por IA.  
## Construida con Next.js 15, Clerk, Drizzle ORM y Vapi, combina autenticación híbrida, lógica server-first y agentes conversacionales.


##  AscendIA — Roadmap Técnico MVP  
**Noviembre 2025**

 *Ingeniería de producto con IA — Next.js 15 · Clerk · Drizzle ORM · Neon · Vapi · Sentry*

![Status](https://img.shields.io/badge/Estado-En%20Desarrollo-blue)
![MVP](https://img.shields.io/badge/Meta-MVP%20Funcional-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Clerk](https://img.shields.io/badge/Auth-Clerk-orange)
![AgentIA](https://img.shields.io/badge/AI-Vapi-green) 
![Database](https://img.shields.io/badge/DB-Neon%20%2B%20Drizzle-00c7b7)
![Observability](https://img.shields.io/badge/Monitoring-Sentry-red)

</div>

---

##  Objetivo General

> Completar el **flujo principal de AscendIA**:  
> **Crear → Ejecutar → Guardar → Visualizar** una entrevista impulsada por IA.  
>  
> Al finalizar Noviembre, AscendIA debe estar en estado **MVP funcional, observable y presentable** como producto SaaS técnico.

---

##  Semana 1 — *Creación de entrevistas y flujo base*
 **10 al 16 de noviembre**  
 *Objetivo:* Permitir crear entrevistas, enviar datos al agente IA (Vapi) y registrar el evento en base de datos.

###  Tareas
- [x] Actualizar schema `interviews` con enums `AREA_ENUM` e `INTERVIEWER_ENUM`.
- [x] Crear formulario `NewInterviewForm` con validaciones (`zod` o `react-hook-form`).
- [ ] Implementar `createInterviewAction`:
  - [x] Recibe datos del form.
  - [ ] Llama al agente IA (Vapi).
  - [ ] Persiste registro inicial (`status: pending`).
- [ ] Añadir estados visuales (`loading`, `error`, `success`).
- [ ] Registrar logs básicos en Sentry.

 **Resultado esperado:**  
El usuario puede iniciar una entrevista, disparar el proceso IA y registrar el evento en la DB.

---

##  Semana 2 — *Interacción IA + persistencia inteligente*
 **17 al 23 de noviembre**  
 *Objetivo:* Integrar conversación con el entrevistador IA y guardar resultados.

###  Tareas
- [ ] Handler de respuestas del agente (stream o callback).
- [ ] Guardar transcripción, `score` y `feedback` en la DB.
- [ ] Ajustar el schema `interviews` con campos `conversation`, `score`, `feedback`.
- [ ] Implementar `syncInterviewResultAction` (server action o webhook).
- [ ] Añadir métricas mínimas (duración, tokens, IA cost).

 **Resultado esperado:**  
Las entrevistas se ejecutan con IA, y los resultados se almacenan con consistencia.

---

##  Semana 3 — *Visualización + Cierre del MVP*
 **24 al 30 de noviembre**  
 *Objetivo:* Mostrar entrevistas pasadas, resultados y estadísticas de desempeño.

###  Tareas
- [x] Crear página `MyInterviews` (listado con Drizzle + Neon).
- [ ] Añadir vista `InterviewDetails` (feedback, score, transcript).
- [ ] Implementar `DashboardStats` con métricas base.
- [ ] Revisar UX general (header, rutas, loading states, colores).
- [ ] Pruebas manuales + logs en Sentry.
- [ ] Actualizar dossier técnico con bloque **“Consolidación del MVP y circuito IA”**.

 **Resultado esperado:**  
El usuario puede crear entrevistas, completarlas con IA, y visualizar resultados y métricas.

---

##  Entregables finales (21 al 31 de diciembre)

| Tipo | Descripción |
|------|--------------|
|  **Feature completa** | Flujo de entrevistas IA: crear → ejecutar → guardar → visualizar. |
|  **Dashboard funcional** | Páginas `new-interview`, `my-interviews`, `profile`, `stats`. |
|  **Base de datos consolidada** | Schema final sincronizado con Neon y documentado. |
|  **Observabilidad mínima** | Logs en Sentry y registro de eventos clave. |
|  **Dossier técnico actualizado** | Bloque “Consolidación del MVP y circuito IA”. |

---

##  Bonus (opcional)
- [ ] Añadir carga de **CV en PDF** y parsing básico.
- [ ] Agregar modo práctica gratuito (sin persistencia).
- [ ] Crear **demo en video** corta para publicación en LinkedIn.

---

##  Resultado Final — *Noviembre 2025*
>  **AscendIA MVP listo.**  
> Flujo de entrevistas IA funcional, base de datos robusta, UX coherente, trazabilidad mínima y documentación técnica consolidada.  
>  
>  *AscendIA se convierte en una vitrina de ingeniería de producto y arquitectura IA moderna.*

---

<div align="center">
  
 *Construido con visión de producto, precisión técnica y enfoque en experiencia real de usuario.*  
 **Marcelo Melogno — Ingeniero de Producto**

</div>

