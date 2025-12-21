# 📐 AscendIA — Diagramas de Arquitectura (v2025-11)

Diagramas técnicos oficiales que documentan la arquitectura, flujos, modelo de datos y estructura interna de AscendIA.  
Todos los diagramas están construidos con **Mermaid** y listos para ser renderizados por GitHub.

> Archivo de trabajo (Excalidraw / bocetos): `/mnt/data/InterviewApp_worktable.excalidraw`  
> (el archivo ya fue subido al repositorio de trabajo; se incluye enlace local para referencia y exportaciones visuales).

---

<br></br>

## Índice

1. Arquitectura General — Server-First Platform
2. Flujo de Autenticación Clerk ↔ Neon (Sequence)
3. Webhook Clerk — Arquitectura Idempotente y Auditada
4. Modelo de Datos — Drizzle + Neon (ERD, espaciamiento aumentado)
5. Flujo de Creación de Entrevista (Server Action)
6. Flujo del Dashboard — Server Components
7. Arquitectura del Módulo Interviews
8. Flujo Interno de `getInternalUser()`
9. Flujo de Validaciones — Zod Client + Server
10. Integración con Vapi AI (Sesiones / Guardado)
11. Flujo detallado de Server Actions y observabilidad (Sentry / métricas)
12. Migraciones y enums (nota visual)

<br></br>
<br></br>

# 1. Arquitectura General — Server-First Platform

```mermaid
flowchart TB
    subgraph Client["Client (Browser)"]
        UI["Next.js App Router (RSC + Islands)"]
    end

    subgraph Server["Next.js Server Runtime (Vercel)"]
        SC["Server Components"]
        SA["Server Actions"]
        AUTH["Clerk Auth Middleware"]
        VAL["Zod Validation"]
    end

    subgraph DB["Neon PostgreSQL"]
        USERS["users"]
        PROFILES["user_profiles"]
        INTERVIEWS["interviews"]
        METRICS["metrics"]
        WEBHOOKS["webhook_logs"]
    end

    subgraph External["External Services"]
        ClerkAPI["Clerk API"]
        Svix["Svix (signature verifier)"]
        Vapi["Vapi AI Agents"]
        Sentry["Sentry Observability"]
    end

    UI -->|Requests + Rendering| SC
    SC --> SA
    SA --> DB
    SA --> Vapi
    SA --> Sentry

    AUTH --> ClerkAPI
    ClerkAPI -->|Events| Svix -->|Verified| WEBHOOKS
```

- Mapa de componentes principales: cliente (RSC + islands), server runtime (Server Components / Actions), DB en Neon y servicios externos (Clerk, Svix, Vapi, Sentry).

<br></br>
<br></br>

# 2. Arquitectura General — Server-First Platform

```mermaid

sequenceDiagram
    participant C as Cliente (Browser)
    participant Clerk as Clerk Auth
    participant Next as Next.js Server
    participant DB as Neon DB
    participant WK as Webhook Handler

    C->>Clerk: Iniciar sesión / Registrarse (email / OTP / OAuth)
    Clerk->>Next: Devuelve session + userId (clerkId)
    Next->>Next: auth()
    Next->>DB: getInternalUser(clerkId)
    DB-->>Next: { internalId } OR null

    alt No existe internal user
        Next->>DB: Crear internal user (syncUserWithDatabase)
    end

    Note over Clerk,WK: Evento asíncrono: Clerk -> Svix -> Webhook
    Clerk->>WK: webhook user.created / user.updated / user.deleted
    WK->>DB: syncUserWithDatabase() (idempotente)

```

- Muestra tanto el flujo de login inmediato como el evento asíncrono por webhook para mantener la DB sincronizada.

<br></br>
<br></br>

# 3. Webhook Clerk — Arquitectura Idempotente y Auditada

```mermaid
flowchart LR
    Clerk["Clerk (eventos)"]
    Svix["Svix: firma"]
    Webhook["/api/webhooks/clerk"]
    Validator["Svix.verify(payload, headers)"]
    Logger["Inserta en webhook_logs"]
    Sync["syncUserWithDatabase()"]
    DB["Neon: users"]

    Clerk --> Svix --> Webhook --> Validator --> Logger --> Sync --> DB

```

- El webhook verifica firma (Svix), registra el evento, y ejecuta la sincronización idempotente garantizando trazabilidad y reintentos seguros.

<br></br>
<br></br>

# 4.Modelo de Datos — Drizzle + Neon (Versión oficial)

```mermaid
erDiagram


    %% ============================================================
    %% USERS
    %% ============================================================
    users {
        uuid id PK
        varchar clerkId
        text email
        varchar firstName
        varchar lastName
        text imgUrl
        role_enum role
        timestamp createdAt
        timestamp updatedAt
        timestamp lastActivityDate
    }


    %% ============================================================
    %% USER PROFILES
    %% ============================================================
    user_profiles {
        uuid id PK
        uuid userId FK
        text bio
        varchar location
        jsonb skills
        jsonb preferences
    }


    %% ============================================================
    %% USER SESSIONS
    %% ============================================================
    user_sessions {
        uuid id PK
        uuid userId FK
        text sessionToken
        timestamp expiresAt
        timestamp loginAt
        timestamp logoutAt
        jsonb deviceInfo
    }


    %% ============================================================
    %% USER SKILLS
    %% ============================================================
    user_skills {
        uuid id PK
        uuid userId FK
        varchar skill
    }


    %% ============================================================
    %% METRICS
    %% ============================================================
    metrics {
        uuid id PK
        uuid userId FK
        int totalInterviews
        int avgScore
        timestamp lastImprovement
    }

    %% ============================================================
    %% INTERVIEWS
    %% ============================================================
    interviews {
        uuid id PK
        uuid userId FK
        area_enum area
        interviewer_enum interviewer
        varchar position
        text feedback
        int score
        timestamp createdAt
    }

    %% ============================================================
    %% WEBHOOK LOGS
    %% ============================================================
    webhook_logs {
        uuid id PK
        varchar eventId
        varchar eventType
        varchar userId
        status_enum status
        text errorMessage
        jsonb payload
        timestamp processedAt
        varchar attempId
        timestamp createdAt
    }

    %% ============================================================
    %% RELATIONSHIPS
    %% ============================================================
    users ||--|| user_profiles : "1 to 1"
    users ||--|{ user_sessions : "1 to many"
    users ||--|{ user_skills : "1 to many"
    users ||--|{ metrics : "1 to many (en tu caso 1:1 lógico)"
    users ||--|{ interviews : "1 to many"

    interviews ||--|{ user_sessions : "many sessions per interview (lógica futura opcional)"
```

<br></br>
<br></br>

# 5. Flujo de Creación de Entrevista (Server Action)

```mermaid
sequenceDiagram
    participant UI as NewInterviewForm (Client)
    participant SA as createNewInterview() (Server Action)
    participant Z as Zod Schema
    participant GET as getInternalUser()
    participant DB as Neon / interviews

    UI->>SA: Submit(data)
    SA->>Z: Validación (server-side)
    Z-->>SA: data validado
    SA->>GET: getInternalUser()
    GET-->>SA: { internalId }
    SA->>DB: INSERT entrevista (typed)
    DB-->>SA: { interviewId }
    SA-->>UI: { success, interviewId }
    UI-->>UI: redirect(/dashboard/my-interviews)

```

- Muestra validación y obtención del usuario interno dentro de la Server Action antes de insertar.

<br></br>
<br></br>

# 6. Flujo del Dashboard — Server Components

```mermaid
flowchart TB
    Page["/dashboard (Server Component)"]
    Internal["getInternalUser()"]
    FetchInter["getInterviews(internalId)"]
    Render["Render UI / Badges / Stats"]

    Page --> Internal --> FetchInter --> Render
```

- Patrón server-first: la página server llama utilidades server y renderiza sin depender de hooks cliente.

<br></br>
<br></br>

# 7. Arquitectura del Módulo Interviews

```mermaid
flowchart LR
    Form["Formulario de Nueva Entrevista (Client Island)"]
    SA1["createNewInterview()"]
    SA2["getInterviews()"]
    List["Listado de Entrevistas (Server Component)"]
    Vapi["Agente Vapi (Simulación IA)"]
    Session["sessions (DB)"]

    Form --> SA1 --> List
    List --> Vapi --> Session
```

- Desde la creación hasta la ejecución de la simulación IA y persistencia de sesiones/transcripciones.

<br></br>
<br></br>

# 8. Flujo Interno de getInternalUser()

```mermaid
flowchart LR
    auth["Clerk.auth()"]
    DB["Neon: users"]
    Found["internal user found?"]
    Out["{ clerkId, internalId }"]

    auth --> DB --> Found
    Found --> Out

```

- Centraliza la lógica de recuperación/creación de usuario interno.

<br></br>
<br></br>

# 9. Flujo de Validaciones — Zod Client + Server

```mermaid
flowchart LR
    Client["Zod (Client)"]
    Server["Zod (Server)"]
    Action["Server Action"]
    DB["DB"]

    Client --> Action --> Server --> DB
```

- Defensa en profundidad: validación en cliente para UX y validación en servidor para seguridad/consistencia.

<br></br>
<br></br>

# 10. Integración con Vapi AI

```mermaid
flowchart TB
    Interview["Interview Session"]
    Vapi["Vapi AI Agent"]
    SA["Server Action: saveSession()"]
    DB["sessions (DB)"]
    Scores["Feedback / score"]

    Interview --> Vapi --> SA --> DB
    SA --> Scores

```

- Muestra la ruta de la conversación IA hacia la persistencia y generación de feedback/score.

<br></br>
<br></br>

# 11. Flujo detallado de Server Actions y Observabilidad

```mermaid
sequenceDiagram
    participant UI as Client
    participant SA as Server Action
    participant DB as Neon
    participant S as Sentry

    UI->>SA: invoke action
    SA->>DB: query / insert
    DB-->>SA: result
    SA->>S: captureMetric / captureException
    S-->>SA: ack
    SA-->>UI: response

```

- Cada Server Action reporta métricas/errores a Sentry para trazabilidad y alerting.
  <br></br>

<br></br>
<br></br>

# 12. Migraciones y enums (visual note)

```mermaid



flowchart LR
    LocalSchema["/lib/constants.ts (AREAS, INTERVIEWERS)"]
    Migration["drizzle migrations (versioned)"]
    DBEnum["Neon: pgEnum definitions"]
    Repo["Repo (docs + migration files)"]

    LocalSchema --> Migration --> DBEnum
    Repo --> Migration




```

- Las constantes front reflejan enums en DB; los cambios en enums se realizan mediante migraciones versionadas — la DB es la fuente de verdad.

<br></br>
<br></br>

#  13. Diagrama De Aplicación SSG / ISR / PPR

```mermaid

    flowchart TD

%% SECCIÓN: PÁGINAS PÚBLICAS
subgraph Public["Páginas Públicas - SSG / ISR"]
    A[Landing /] -->|SSG| B[HTML Estático]
    C[Pricing] -->|SSG| B
    D[Features] -->|SSG| B
    E[Blog] -->|ISR 1h| F[Regeneración Programada]
end

%% SECCIÓN: DASHBOARD
subgraph Dashboard["Dashboard - PPR"]
    G[Layout Estático] -->|Prerender| H[HTML Base]
    I[User Data] -->|Dynamic RSC| J[Hydration]
    H --> J
end

%% SECCIÓN: ENTREVISTAS
subgraph Interviews["Entrevistas - PPR + RSC Dinámico"]
    K[Intro UI Estática] -->|Prerender| L[HTML Base]
    M[Fetch Entrevistas Server Action] --> N[Render Dinámico]
    L --> N
end

%% SECCIÓN: SIMULACIÓN
subgraph Simulation["Simulación - PPR + Streaming"]
    O[Instructions Estáticas] -->|Prerender| P[HTML Base]
    Q[Agente VAPI] -->|Streaming Dinámico| R[Simulación en Tiempo Real]
    P --> R
end

%% SECCIÓN: RESULTADOS
subgraph Results["Resultados - PPR"]
    S[Layout Estático] -->|Prerender| T[HTML Base]
    U[Consulta DB] --> V[Render Dinámico Resultados]
    T --> V
end

%% RELACIONES
Public --> Dashboard
Dashboard --> Interviews
Interviews --> Simulation
Simulation --> Results


```
