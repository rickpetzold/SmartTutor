# SmartTutor — PRD (MVP)

## 0) Executive Summary

Build SmartTutor, a “give-to-get” marketplace for transparent private tutoring prices and performance. Anonymous contributors submit a tutoring session record; in return they unlock aggregated market stats (mean/median/mode/range) and a table of anonymized matches.

**Success criteria (MVP):**

- Users can submit a valid tutoring record anonymously and immediately unlock full data explorer access.
- Users can filter and view correct stats + anonymized rows for their filters.
- RLS ensures only anonymized, aggregate data is visible; no PII stored.
- Deployed on Vercel (FE) + Supabase (DB/Edge) with basic observability.

## 1) Scope (MVP)

### 1.1 In Scope

- Anonymous record submission form with validation.
- “Give-to-get” gate: full explorer access only after ≥1 valid submission by the current anon session.
- Data Explorer with filters (subject, district, mode, student year, SEN) and stats (mean/median/mode/range) + table of matching rows.
- Mobile-first UI, clear anonymity messaging.
- Minimal analytics: access events (unlock, view_stats, view_records).

### 1.2 Out of Scope

- User accounts, pm analyst internal usage, payments, tutor profiles, charts beyond basic stats, semantic search, file uploads.

## 2) Users & Use Cases

- **Anonymous parent/tutor:** contributes one record to unlock pricing transparency for similar context.
- **PM/Analyst (internal):** checks access_events to monitor usage funnel.

**Primary flows:**

- Visit → see blurred stats except for first three rows and the diagrams with lock symbol → “Submit your data” → submit → unlock → explore.
- Return visit with same anon session → already unlocked.

## 3) Requirements

### 3.1 Functional Requirements

- **Form fields:** price_per_hour, currency, subject, location_district, tutor_academic_result (opt), student_condition, parent_satisfaction (opt), tutoring_experience (opt).
- **Validation:** Client-side Zod; server-side Pydantic models in FastAPI.
- **Give-to-get gate:** Anonymous Supabase auth session managed by the frontend, verified by the FastAPI backend.
- **Data explorer:** Filter + stats (mean, median, mode, min, max); anonymized table; empty state.
- **Observability:** Log key access events via a dedicated backend endpoint.
- **i18n:** Use `next-intl` with `en-HK` default and `zh-HK` (Cantonese) as a supported locale. English-only content for MVP, but the structure will be in place.

### 3.2 Non-Functional Requirements

- **Security:** RLS strictly enforces access; no PII; IP not stored; cookies limited to anon id.
- **Performance:** Stats queries P95 < 250ms on 10k rows.
- **Reliability:** Graceful degradation if stats fail; no partial unlocks.
- **Accessibility:** Keyboard-navigable, ARIA labels.
- **Observability:** Minimal logging, query timing metrics.

## 4) Data & Access Model

- **Schema:**
  - **`contributors` table:**
    - `id` (uuid, Primary Key, from `auth.users`)
    - `has_contributed` (boolean, default `false`)
    - `tutoring_experience` (integer, optional)
  - **`tutoring_records` table:**
    - `id` (uuid, Primary Key)
    - `contributor_id` (uuid, Foreign Key to `contributors.id`)
    - `created_at` (timestamp with time zone, default `now()`)
    - `price_per_hour` (numeric)
    - `currency` (text, e.g., "HKD")
    - `location_district` (enum, see list below)
    - `subject` (enum, see list below)
    - `tutor_academic_result` (text, optional)
    - `student_condition` (text, e.g., "SEN", "Normal")
    - `parent_satisfaction` (integer, 1-5, optional)
  - **`location_district` enum values:** `REMOTE`, `MID_LEVELS`, `POK_FU_LAM`, `CENTRAL_AND_SHEUNG_WAN`, `SAI_WAN`, `WAN_CHAI`, `CAUSEWAY_BAY`, `HAPPY_VALLEY`, `NORTH_POINT`, `QUARRY_BAY`, `TAI_KOO`, `SHAU_KEI_WAN`, `SAI_WAN_HO`, `CHAI_WAN`, `SIU_SAI_WAN`, `ABERDEEN`, `AP_LEI_CHAU`, `STANLEY`, `MONG_KOK`, `LAM_TIN`, `YAU_TONG`, `SAU_MAU_PING`, `KWUN_TONG`, `NGAU_TAU_KOK`, `KOWLOON_BAY`, `CHOI_HUNG`, `NGAU_CHI_WAN`, `TSZ_WAN_SHAN`, `DIAMOND_HILL`, `SAN_PO_KONG`, `WONG_TAI_SIN`, `LOK_FU`, `KOWLOON_TONG`, `SHEK_KIP_MEI`, `HO_MAN_TIN`, `KOWLOON_CITY`, `TO_KWA_WAN`, `HUNG_HOM`, `YAU_MA_TEI`, `JORDAN`, `TSIM_SHA_TSUI`, `TAI_KOK_TSUI`, `SHAM_SHUI_PO`, `CHEUNG_SHA_WAN`, `LAI_CHI_KOK`, `MEI_FOO`, `TSEUNG_KWAN_O`, `SAI_KUNG`, `TSUEN_WAN`, `KWAI_FONG`, `KWAI_HING`, `KWAI_CHUNG`, `TSING_YI`, `LAI_KING_STATION`, `TAI_WAI`, `SHA_TIN_TOWN_CENTRE`, `SIU_LIK_YUEN`, `FO_TAN`, `MA_ON_SHAN`, `TAI_PO`, `FANLING`, `SHEUNG_SHUI`, `YUEN_LONG`, `TIN_SHUI_WAI`, `TUEN_MUN`, `ISLANDS_DISTRICT`, `TSING_LUNG_TAU`, `SHAM_TSENG`, `MA_WAN`, `TUNG_CHUNG`
  - **`subject` enum values (MVP):** `ENGLISH`, `CHINESE`, `MATHEMATICS`, `PHYSICS`, `CHEMISTRY`, `BIOLOGY`, `ECONOMICS`, `GEOGRAPHY`, `HISTORY`, `CHINESE_HISTORY`, `BAFS`, `LIBERAL_STUDIES`, `GENERAL_SCIENCE`, `MUSIC`, `VISUAL_ARTS`, `OTHER`
- **RLS:** RLS will be used for defense-in-depth, but the primary security boundary will be the FastAPI backend. Policies will ensure the backend service role has full access, while denying direct access to anonymous users.

## 5) Architecture

- **Project Structure:** The project is organized as a monorepo with three distinct top-level directories:

  - **/frontend:** Contains the Next.js application.
  - **/backend:** Contains the FastAPI application.
  - **/supabase:** Contains all database migrations and Supabase-specific configurations.

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind, shadcn/ui, RHF + Zod, TanStack Query, next-intl. **Hosted on Vercel.**
- **Backend:** A dedicated **FastAPI (Python)** application. It will handle all business logic, data validation (Pydantic), and communication with the Supabase database. **Hosted on Google Cloud Run.**
- **Database:** **Supabase Postgres**. It will serve as the data layer, managed via migrations. Supabase Auth will be used for anonymous user JWT generation.
- **Communication:** The Next.js frontend will make authenticated API calls to the FastAPI backend. The backend will verify the Supabase JWT and then connect to the Supabase database using a secure connection string.

## 6) UI/UX

- **Pages:** Home (blurred stats), Submit form, Explorer, Error/Unlock gate.
- **Components:** StatsCard, FilterBar, RecordsTable, PrivacyCallout, UnlockGate, Toasts.
- **Copy:** “We never collect personal info. Submissions are anonymous and only used in aggregate.”

## 7) API / Server Contracts (FastAPI Backend)

- **`POST /records`:** (Auth required) Takes a JSON body with tutoring record data. Validates with Pydantic. Upserts contributor, inserts record, logs unlock event.
- **`GET /stats`:** (Auth required, unlocked users only) Accepts filter query parameters. Returns JSON with aggregated statistics.
- **`GET /records`:** (Auth required, unlocked users only) Accepts filter and pagination query parameters. Returns a paginated list of anonymized records.
- **`POST /log_event`:** (Auth required) Fire-and-forget endpoint to log user access events.

### 7.1 Pydantic Validation Models

Below are the Pydantic models that will be used for request and response validation for each endpoint.

---

**Endpoint: `POST /records`**

- **Request Body (`TutoringRecordCreate`):**
  ```python
  class TutoringRecordCreate(BaseModel):
      price_per_hour: float
      currency: str
      subject: SubjectEnum
      location_district: LocationDistrictEnum
      tutor_academic_result: Optional[str] = None
      student_condition: str
      parent_satisfaction: Optional[int] = Field(None, ge=1, le=5)
      tutoring_experience: Optional[int] = Field(None, ge=0)
  ```
- **Response Model (`RecordCreateResponse`):**
  ```python
  class RecordCreateResponse(BaseModel):
      success: bool
      record_id: UUID
      message: str
  ```

---

**Endpoint: `GET /stats`**

- **Request Query Parameters (`StatsFilters`):**
  ```python
  # Handled directly in endpoint signature with Depends
  # Example: subject: Optional[SubjectEnum] = None, location_district: Optional[LocationDistrictEnum] = None, ...
  ```
- **Response Model (`StatsResponse`):**
  ```python
  class StatsResponse(BaseModel):
      mean: float
      median: float
      mode: float
      min_price: float
      max_price: float
      total_records: int
  ```

---

**Endpoint: `GET /records`**

- **Request Query Parameters (`RecordsFilters`):**
  ```python
  # Same as StatsFilters, plus pagination
  # Example: page: int = 1, size: int = 20
  ```
- **Response Model (`PaginatedRecordsResponse`):**

  ```python
  class AnonymizedRecord(BaseModel):
      id: UUID
      created_at: datetime
      price_per_hour: float
      currency: str
      location_district: LocationDistrictEnum
      subject: SubjectEnum
      tutor_academic_result: Optional[str] = None
      student_condition: str
      parent_satisfaction: Optional[int] = None

  class PaginatedRecordsResponse(BaseModel):
      items: List[AnonymizedRecord]
      total_items: int
      total_pages: int
      current_page: int
  ```

---

**Endpoint: `POST /log_event`**

- **Request Body (`LogEventCreate`):**
  ```python
  class LogEventCreate(BaseModel):
      event_name: str
      metadata: Optional[Dict[str, Any]] = None
  ```
- **Response Model (`LogEventResponse`):**
  ```python
  class LogEventResponse(BaseModel):
      success: bool
  ```

## 8) Acceptance Criteria (AC-1…AC-12)

(This section will need to be regenerated into a new task list based on the new architecture.)

## 9) Frontend Best Practices (Security, Performance, UX, SEO)

- **Security:** Sanitize/escape input; enforce CSP, secure cookies (SameSite), anti-CSRF; minimize dependencies.
- **Performance:** Optimize Core Web Vitals; lazy load media (WebP/AVIF); minify & bundle assets; use caching/CDN; efficient CSS; mobile-first & cross-device tested.
- **SEO & Accessibility:** Semantic HTML with alt text/ARIA; optimized metadata & URLs; responsive mobile-first rendering.
- **UI/UX:** Minimal dependencies; consistent, intuitive design; progressive/SSG for speed; hardware-accelerated transitions.
- **Testing:** Lint in CI; unit/integration/UI regression tests; Lighthouse performance checks pre-release.

## 10) Risks & Mitigations

- **Data degradation** - use strict data validation
- **Median/mode correctness** — test with skewed data.
- **Currency mixing** — block or segment queries by currency.
- **RLS leakage** — enforce via SECURITY DEFINER RPCs.
- **Low data volume** — friendly empty state messaging.

## 11) Definition of Done

- All AC-1…AC-12 pass locally and in production.
- RLS tests pass; privacy QA complete.
- Lighthouse perf/a11y ≥ 85 mobile.
- No PII collected anywhere.
