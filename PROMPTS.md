# Denorly Web - Claude Code Prompts

## Repository: denorly-web (Next.js 14+)

| Field      | Value                       |
| ---------- | --------------------------- |
| Project    | Denorly Web                 |
| Technology | Next.js 14+ App Router      |
| Styling    | Tailwind CSS (Mobile First) |
| Language   | TypeScript                  |
| i18n       | Spanish (primary), English  |
| Deploy     | Railway                     |
| Phases     | 5                           |

---

## Important Notes

1. **Mobile First is MANDATORY**: All Tailwind classes must be mobile-first
2. **UI text in Spanish**: All user-facing text in Spanish
3. **Code in English**: Variables, functions, types in English
4. **Reference documents**: Check 05-guia-estilos.md for patterns

---

## Pre-requisites Checklist

Before starting, ensure you have:

- [ ] Node.js 20+ installed
- [ ] GitHub repository created: `denorly-web`
- [ ] API running locally at localhost:3000
- [ ] API documentation available

---

# PHASE 1: Project Setup

## PROMPT 1.1 - Next.js Initialization

```
Create a new Next.js 14+ project for Denorly frontend:

PROJECT SETUP:

1. Create Next.js project:
   - Name: denorly-web
   - TypeScript: yes
   - Tailwind CSS: yes
   - ESLint: yes
   - src directory: yes
   - App Router: yes
   - Import alias: @/*

2. Install dependencies:

Core:
- axios
- @tanstack/react-query
- react-hook-form
- zod
- @hookform/resolvers
- zustand
- next-intl
- js-cookie
- clsx
- tailwind-merge
- date-fns

UI:
- @headlessui/react
- lucide-react
- recharts
- react-hot-toast

Dev:
- @types/* for all packages
- prettier
- prettier-plugin-tailwindcss

3. Configure Tailwind (tailwind.config.js):

Refer to document: 05-guia-estilos.md, section 4.1

- Inter font
- Custom primary color palette (sky blue)
- @tailwindcss/forms plugin
- @tailwindcss/typography plugin

4. Configure ESLint:
- Extend Next.js recommended
- Import sorting
- React hooks rules

5. Configure Prettier:
- Tailwind class sorting
- Single quotes
- No semicolons

6. Create directory structure:
```

src/
├── app/
│ └── [locale]/
│ ├── (auth)/
│ ├── (dashboard)/
│ └── admin/
├── components/
│ ├── ui/
│ ├── forms/
│ ├── submissions/
│ ├── layout/
│ └── admin/
├── lib/
│ ├── api/
│ ├── hooks/
│ ├── stores/
│ ├── utils/
│ └── validations/
├── messages/
│ ├── es.json
│ └── en.json
├── types/
└── styles/
└── globals.css

```

7. Create base utility:
src/lib/utils/cn.ts - class merging (clsx + tailwind-merge)

8. Create .env.local.example:
```

NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3001

```

VERIFICATION:
- npm run dev works
- npm run build succeeds
- npm run lint passes
- Tailwind classes work
```

---

## PROMPT 1.2 - i18n Configuration

```
Configure next-intl for internationalization:

Refer to document: 05-guia-estilos.md, section 3.6

1. Create src/i18n.ts:
- Request config
- Get messages function

2. Create src/middleware.ts:
- Locale detection
- Default locale: es
- Supported: es, en

3. Create src/navigation.ts:
- Typed Link component
- useRouter hook
- usePathname hook

4. Create src/messages/es.json with sections:

{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar",
    "create": "Crear",
    "loading": "Cargando...",
    "error": "Ha ocurrido un error",
    "success": "Operación exitosa",
    "confirm": "Confirmar",
    "back": "Volver",
    "search": "Buscar",
    "filter": "Filtrar",
    "noResults": "No se encontraron resultados"
  },
  "auth": {
    "login": "Iniciar sesión",
    "register": "Crear cuenta",
    "logout": "Cerrar sesión",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "confirmPassword": "Confirmar contraseña",
    "name": "Nombre completo",
    "companyName": "Nombre de empresa",
    "forgotPassword": "¿Olvidaste tu contraseña?",
    "resetPassword": "Restablecer contraseña",
    "noAccount": "¿No tienes cuenta?",
    "hasAccount": "¿Ya tienes cuenta?",
    "invalidCredentials": "Correo o contraseña incorrectos"
  },
  "forms": {
    "title": "Formularios",
    "createForm": "Crear formulario",
    "formName": "Nombre del formulario",
    "description": "Descripción",
    "endpoint": "Endpoint",
    "submissions": "envíos",
    "active": "Activo",
    "inactive": "Inactivo",
    "copy": "Copiar",
    "copied": "¡Copiado!",
    "noForms": "Aún no tienes formularios",
    "createFirst": "Crea tu primer formulario"
  },
  "submissions": {
    "title": "Envíos",
    "empty": "No hay envíos todavía",
    "payload": "Datos",
    "metadata": "Metadata",
    "receivedAt": "Recibido"
  },
  "emails": {
    "title": "Plantillas de email",
    "ownerNotification": "Notificación al propietario",
    "visitorAutoresponse": "Respuesta automática",
    "subject": "Asunto",
    "enabled": "Habilitado"
  },
  "webhooks": {
    "title": "Webhooks",
    "createWebhook": "Crear webhook",
    "name": "Nombre",
    "url": "URL"
  },
  "kommo": {
    "title": "Integración Kommo",
    "connect": "Conectar con Kommo",
    "disconnect": "Desconectar",
    "connected": "Conectado",
    "notConnected": "No conectado"
  },
  "settings": {
    "title": "Configuración",
    "profile": "Perfil",
    "updateProfile": "Actualizar perfil"
  },
  "validation": {
    "required": "Este campo es requerido",
    "email": "Ingresa un correo válido",
    "minLength": "Mínimo {min} caracteres",
    "url": "Ingresa una URL válida"
  },
  "admin": {
    "title": "Administración",
    "dashboard": "Dashboard",
    "tenants": "Tenants",
    "team": "Equipo",
    "activity": "Actividad"
  }
}

5. Create src/messages/en.json (same structure, English)

VERIFICATION:
- /es routes show Spanish
- /en routes show English
- useTranslations hook works
```

---

## PROMPT 1.3 - API Client Setup

```
Create API client infrastructure:

1. src/lib/api/client.ts

Create axios instance:
- Base URL from NEXT_PUBLIC_API_URL
- Request interceptor: add Authorization header, Accept-Language
- Response interceptor: handle 401 (logout), 422 (validation), 500

2. src/lib/utils/token.ts

Token utilities:
- getToken(): string | null
- setToken(token: string): void
- clearToken(): void
- Store in localStorage (or cookie)

3. src/types/api.ts

TypeScript types:
- User
- Form
- Submission
- EmailTemplate
- Webhook
- KommoIntegration
- PaginatedResponse<T>
- ApiError

4. src/lib/api/auth.ts

Functions:
- login(email, password): Promise<LoginResponse>
- register(data): Promise<RegisterResponse>
- logout(): Promise<void>
- forgotPassword(email): Promise<void>
- resetPassword(token, password): Promise<void>
- getMe(): Promise<User>
- updateMe(data): Promise<User>

5. src/lib/api/forms.ts

Functions:
- getForms(params): Promise<PaginatedResponse<Form>>
- getForm(id): Promise<Form>
- createForm(data): Promise<Form>
- updateForm(id, data): Promise<Form>
- deleteForm(id): Promise<void>

6. src/lib/api/submissions.ts

Functions:
- getSubmissions(formId, params): Promise<PaginatedResponse<Submission>>
- getSubmission(formId, id): Promise<Submission>
- deleteSubmission(formId, id): Promise<void>

VERIFICATION:
- TypeScript compiles
- API functions typed correctly
```

---

## PROMPT 1.4 - Authentication State

```
Create authentication state management:

1. src/lib/stores/auth-store.ts

Using Zustand:

State:
- user: User | null
- token: string | null
- isLoading: boolean
- isAuthenticated (computed from user)

Actions:
- setUser(user)
- setToken(token)
- logout()
- hydrate() - load from storage

2. src/lib/hooks/use-auth.ts

Hook returns:
- user
- isAuthenticated
- isLoading
- login(email, password)
- register(data)
- logout()
- updateProfile(data)

Uses auth store internally.
Shows toast on errors.

3. src/lib/hooks/use-require-auth.ts

For protected routes:
- Check if authenticated
- Redirect to login if not
- Return user when authenticated

4. src/components/providers/auth-provider.tsx

Provider that:
- Hydrates auth on mount
- Listens for storage events (multi-tab)

5. src/components/providers/query-provider.tsx

React Query provider with default config.

6. src/app/[locale]/providers.tsx

Combine all providers.

VERIFICATION:
- Auth persists on refresh
- Logout clears state
- Multi-tab sync works
```

---

## PROMPT 1.5 - Base UI Components

```
Create base UI components with mobile-first design:

Refer to document: 05-guia-estilos.md, section 4

CRITICAL: All components must use mobile-first Tailwind.
Base styles (no prefix) = mobile.
Add md:, lg: for larger screens.

1. src/components/ui/button.tsx

Props:
- variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
- size: 'sm' | 'md' | 'lg'
- isLoading: boolean
- disabled: boolean

Mobile: min-height 44px (touch friendly)
Desktop (md:): can be smaller

2. src/components/ui/input.tsx

Props:
- label: string
- error: string
- All standard input props

Mobile: min-height 48px
Include label and error display.

3. src/components/ui/textarea.tsx

Same as input with rows support.

4. src/components/ui/select.tsx

Native select with custom styling.
Mobile-friendly touch targets.

5. src/components/ui/checkbox.tsx

With label support.
Touch-friendly size.

6. src/components/ui/card.tsx

Simple container:
- Header (optional)
- Body
- Footer (optional)

7. src/components/ui/badge.tsx

Variants: default, success, warning, error
Sizes: sm, md

8. src/components/ui/modal.tsx

Using @headlessui/react Dialog.

Mobile: Bottom sheet style (inset-x-0 bottom-0, rounded-t)
Desktop (md:): Centered modal

Refer to 05-guia-estilos.md, section 4.4 for pattern.

9. src/components/ui/dropdown-menu.tsx

Using @headlessui/react Menu.
Touch-friendly items.

10. src/components/ui/spinner.tsx

Loading spinner, sizes: sm, md, lg

11. src/components/ui/empty-state.tsx

For empty lists:
- Icon
- Title
- Description
- Action button

12. src/components/ui/pagination.tsx

Mobile: prev/next only
Desktop: full pagination with numbers

VERIFICATION:
- All components render
- Mobile-first verified (check classes)
- Touch targets adequate
```

---

## PROMPT 1.6 - Layout Components

```
Create layout components:

Refer to document: 05-guia-estilos.md, section 4.4

1. src/components/layout/dashboard-layout.tsx

Mobile:
- Fixed header with hamburger menu
- Slide-out sidebar overlay
- Main content with padding

Desktop (md:):
- Fixed sidebar (w-64)
- Sticky header
- Main content with pl-64

Include:
- Mobile menu toggle state
- Sidebar navigation items
- User menu dropdown

2. src/components/layout/sidebar.tsx

Navigation items for tenants:
- Formularios (icon: FileText)
- Integraciones (icon: Plug)
- Configuración (icon: Settings)

3. src/components/layout/header.tsx

Desktop header:
- Breadcrumbs (optional)
- User menu

4. src/components/layout/mobile-menu.tsx

Overlay with navigation.
Close on navigation or backdrop click.

5. src/components/layout/user-menu.tsx

Dropdown with:
- User email
- Settings link
- Logout button

6. src/components/layout/auth-layout.tsx

For auth pages:
- Centered card
- Logo at top
- Mobile: full width
- Desktop: max-w-md

7. src/components/layout/page-header.tsx

Reusable:
- Title
- Description (optional)
- Actions (buttons)
- Mobile: stack
- Desktop: flex row

8. src/app/[locale]/(dashboard)/layout.tsx

Dashboard route group:
- Requires auth (use useRequireAuth)
- Uses DashboardLayout
- Loading state

9. src/app/[locale]/(auth)/layout.tsx

Auth route group:
- Uses AuthLayout
- Redirect if already authenticated

VERIFICATION:
- Mobile layout works (375px)
- Desktop layout works (1280px)
- Navigation accessible
```

---

# PHASE 2: Authentication Pages

## PROMPT 2.1 - Login Page

```
Create login page:

src/app/[locale]/(auth)/login/page.tsx

Features:
- Email input
- Password input
- "Iniciar sesión" button (loading state)
- "¿Olvidaste tu contraseña?" link
- "¿No tienes cuenta? Crear cuenta" link

Use react-hook-form with zod validation.

Validation (src/lib/validations/auth.ts):
- email: required, email format
- password: required, min 8 chars

Error handling:
- Show toast for API errors
- Show inline validation errors

On success:
- Store token
- Redirect to /forms

Mobile design:
- Full width inputs
- Large button
- Stacked layout

VERIFICATION:
- Form validation works
- Login flow works
- Mobile layout correct
```

---

## PROMPT 2.2 - Registration Page

```
Create registration page:

src/app/[locale]/(auth)/register/page.tsx

Fields:
- Name (required)
- Email (required)
- Company name (optional)
- Password (required, min 8)
- Confirm password (must match)

Use react-hook-form with zod.

On success:
- Show message about confirmation email
- Do NOT auto-login
- Link to login page

Mobile design:
- Stacked fields
- Full width

VERIFICATION:
- Validation works
- Registration creates user
- Confirmation message shows
```

---

## PROMPT 2.3 - Password Reset Pages

```
Create password reset pages:

1. src/app/[locale]/(auth)/forgot-password/page.tsx

- Email input
- "Enviar instrucciones" button
- Show success message (always, for security)
- Link back to login

2. src/app/[locale]/(auth)/reset-password/page.tsx

- Read token from URL: ?token=xxx
- New password input
- Confirm password input
- "Restablecer contraseña" button
- Handle invalid/expired token
- Redirect to login on success

VERIFICATION:
- Forgot password works
- Reset with valid token works
- Error handling works
```

---

## PROMPT 2.4 - Email Confirmation Page

```
Create confirmation result page:

src/app/[locale]/(auth)/confirm/page.tsx

Read from URL params:
- success=true → Show success message, link to login
- error=invalid_token → Show error, link to resend

Simple page with message and action.

VERIFICATION:
- Success state works
- Error state works
```

---

# PHASE 3: Dashboard Pages

## PROMPT 3.1 - Forms List Page

```
Create forms list page:

src/app/[locale]/(dashboard)/forms/page.tsx

Features:
- Page header: "Formularios" + "Crear formulario" button
- Empty state when no forms
- Grid of form cards

Grid layout:
- Mobile: 1 column
- Tablet (sm): 2 columns
- Desktop (lg): 3 columns

Create src/components/forms/form-card.tsx:
- Form name
- Endpoint URL (truncated) with copy button
- Submissions count
- Active/Inactive badge
- Actions dropdown (Edit, Delete)

Create src/lib/hooks/use-forms.ts:
- useForms(params): React Query for list
- useForm(id): React Query for single
- useCreateForm(): mutation
- useUpdateForm(): mutation
- useDeleteForm(): mutation

Loading: Show skeleton cards
Error: Show error state

VERIFICATION:
- List renders
- Copy endpoint works
- Empty state shows
- Mobile grid works
```

---

## PROMPT 3.2 - Create Form Page

```
Create form creation page:

src/app/[locale]/(dashboard)/forms/new/page.tsx

Fields:
- Nombre (required)
- Descripción (optional, textarea)
- Dominios permitidos (optional, help text)
- URL de redirección (optional)
- Mensaje de éxito (optional, shown if no redirect)

Form with react-hook-form.

On success:
- Redirect to form detail page
- Show success toast

Cancel:
- Go back to forms list

Mobile:
- Full width fields
- Stacked buttons

VERIFICATION:
- Create works
- Redirects correctly
- Validation works
```

---

## PROMPT 3.3 - Form Detail Page

```
Create form detail page with tabs:

src/app/[locale]/(dashboard)/forms/[id]/page.tsx

Header:
- Form name
- Endpoint URL with copy
- Active/Inactive badge
- Actions dropdown

Tabs (horizontal scroll on mobile):
1. Envíos
2. Emails
3. Webhooks
4. Configuración

URL: /forms/[id]?tab=submissions|emails|webhooks|settings

Create tab components:

1. src/components/forms/submissions-tab.tsx
   - Mobile: card view
   - Desktop: table view
   - Search
   - Pagination
   - Click for detail modal

2. src/components/forms/emails-tab.tsx
   - Two cards (owner, visitor)
   - Enabled toggle
   - Click to edit

3. src/components/forms/webhooks-tab.tsx
   - List of webhooks
   - Add button
   - Edit/Delete

4. src/components/forms/settings-tab.tsx
   - Form settings form
   - Save button

VERIFICATION:
- Tabs work
- URL updates with tab
- Mobile scroll works
```

---

## PROMPT 3.4 - Submission Detail

```
Create submission detail views:

1. src/components/submissions/submission-modal.tsx

Quick view modal:
- Payload (key-value pairs)
- Metadata (collapsible)
- Received date
- IP address
- "Ver detalles completos" link
- Delete button

Mobile: bottom sheet style

2. src/app/[locale]/(dashboard)/forms/[id]/submissions/[submissionId]/page.tsx

Full detail page:
- All payload fields
- All metadata
- Files (if any)
- IP, user agent, referer

Logs section:
- Email logs with status
- Kommo sync status
- Webhook deliveries

Delete with confirmation.

VERIFICATION:
- Modal opens
- Detail page shows logs
- Delete works
```

---

## PROMPT 3.5 - Email Templates Editor

```
Create email template editor:

src/components/emails/email-template-editor.tsx

Can be modal or inline panel.

Fields:
- Enable/Disable toggle
- Subject input
- Body HTML (textarea or rich editor)
- Plain text (optional, collapsible)
- From name
- Reply-to

Variables helper:
- Show available variables
- Click to insert

Preview:
- Button to show rendered preview
- Uses sample data

Create src/lib/hooks/use-email-templates.ts:
- useEmailTemplates(formId)
- useUpdateEmailTemplate(formId, templateId)

Mobile:
- Full screen editor
- Variables as modal

VERIFICATION:
- Edit works
- Variables insert
- Preview renders
```

---

## PROMPT 3.6 - Webhooks Management

```
Create webhooks UI:

1. src/components/webhooks/webhook-list.tsx

List with:
- Cards for each webhook
- Name, URL, method badge, enabled toggle
- Edit/Delete actions
- Add button

2. src/components/webhooks/webhook-form.tsx

Modal form:
- Name
- URL
- HTTP method (POST, PUT, PATCH)
- Headers (key-value editor)
- Payload template (optional)
- Enabled toggle

Headers editor:
- List of key-value inputs
- Add/remove rows

Create src/lib/hooks/use-webhooks.ts

VERIFICATION:
- CRUD works
- Headers editor works
```

---

## PROMPT 3.7 - Kommo Integration Page

```
Create Kommo integration page:

src/app/[locale]/(dashboard)/integrations/kommo/page.tsx

States:

Not Connected:
- Benefits explanation
- "Conectar con Kommo" button

Connected:
- Status badge
- Subdomain
- Last sync
- Pipeline selector
- Status selector
- Field mapping UI
- "Desconectar" button

Create src/components/kommo/field-mapping.tsx:
- Form field → Kommo field mapping
- Support custom fields

OAuth flow:
- Click connect → popup/redirect
- Callback → refresh page

Create src/lib/hooks/use-kommo.ts:
- useKommoIntegration()
- useKommoAuthUrl()
- useUpdateKommoIntegration()
- useDisconnectKommo()

VERIFICATION:
- OAuth flow works
- Field mapping saves
- Disconnect works
```

---

## PROMPT 3.8 - Settings Page

```
Create settings page:

src/app/[locale]/(dashboard)/settings/page.tsx

Sections:

1. Profile
   - Name input
   - Company name input
   - Email (read-only)
   - Save button

2. Preferences
   - Language selector
   - Timezone selector
   - Save button

3. Account
   - Current plan badge
   - Usage (progress bar)
   - Reset date

Mobile:
- Sections as cards
- Full width inputs

VERIFICATION:
- Profile update works
- Language change updates UI
```

---

# PHASE 4: Admin Panel

## PROMPT 4.1 - Admin Authentication

```
Create admin authentication (SEPARATE from tenant):

1. src/app/[locale]/admin/login/page.tsx

Admin login:
- Different styling
- Email/password
- No register link

2. src/lib/api/admin-client.ts

Separate API client:
- Different token storage key (admin_token)
- Same patterns

3. src/lib/stores/admin-auth-store.ts

Separate store:
- adminUser
- adminToken

4. src/lib/hooks/use-admin-auth.ts

Admin auth hook.

Admin and tenant auth are COMPLETELY separate.

VERIFICATION:
- Admin login works
- Separate from tenant auth
```

---

## PROMPT 4.2 - Admin Layout

```
Create admin layout:

Refer to document: 06-modulo-administracion.md, section 9.7

1. src/components/admin/admin-layout.tsx

Similar to tenant but:
- "ADMIN" indicator
- Different nav items
- Different color scheme (optional)

Navigation:
- Dashboard
- Tenants
- Equipo (super_admin only)
- Actividad

2. src/components/admin/impersonation-banner.tsx

When impersonating:
- Fixed banner at top
- "Impersonando a [email]"
- "Salir" button

3. src/app/[locale]/admin/(dashboard)/layout.tsx

Requires admin auth.

VERIFICATION:
- Admin layout works
- Impersonation banner shows
```

---

## PROMPT 4.3 - Admin Dashboard

```
Create admin dashboard:

Refer to document: 06-modulo-administracion.md, section 3

src/app/[locale]/admin/(dashboard)/page.tsx

Layout:

1. Stats cards (2x2 mobile, 4 col desktop)
   - Total Tenants
   - Activos (7d)
   - Submissions
   - Este Mes

2. More stats row

3. Charts
   - Submissions por Día (line chart)
   - Period selector: 7d, 30d, 90d

4. Side by side
   - Tenants por Plan (pie)
   - Top Tenants (bar)

Create:
- src/components/admin/stat-card.tsx
- src/components/admin/submissions-chart.tsx (recharts)
- src/components/admin/plan-distribution-chart.tsx
- src/components/admin/top-tenants-chart.tsx

Create src/lib/hooks/use-admin-dashboard.ts

VERIFICATION:
- Stats load
- Charts render
- Mobile layout works
```

---

## PROMPT 4.4 - Admin Tenants Page

```
Create admin tenants management:

Refer to document: 06-modulo-administracion.md, section 4

src/app/[locale]/admin/(dashboard)/tenants/page.tsx

Features:
- Filters (plan, status, kommo)
- Search
- Mobile: filter modal
- Desktop: inline filters

List:
- Mobile: cards
- Desktop: table

Actions dropdown:
- Ver detalles
- Editar
- Cambiar plan
- Cambiar límites
- Impersonar
- Reset contraseña
- Enviar email
- Suspender/Reactivar
- Eliminar (super_admin)

Create action modals in src/components/admin/tenant-actions/:
- change-plan-modal.tsx
- change-limits-modal.tsx
- suspend-modal.tsx (requires reason)
- send-email-modal.tsx
- delete-modal.tsx

Create src/lib/hooks/use-admin-tenants.ts

VERIFICATION:
- List works
- Filters work
- Actions work
```

---

## PROMPT 4.5 - Admin Tenant Detail

```
Create admin tenant detail:

src/app/[locale]/admin/(dashboard)/tenants/[id]/page.tsx

Sections:
- Header with actions
- Info card
- Usage card
- Integrations card

Tabs:
- Formularios (list forms)
- Envíos (recent submissions)
- Actividad (logs for this tenant)

Impersonate:
- Opens tenant dashboard with impersonation token

VERIFICATION:
- Detail loads
- Tabs work
- Impersonation works
```

---

## PROMPT 4.6 - Admin Team Page

```
Create admin team management (super_admin only):

src/app/[locale]/admin/(dashboard)/team/page.tsx

Access control:
- Check if super_admin
- Redirect if not

Features:
- List admin users
- Create new admin
- Edit admin
- Delete admin

Restrictions:
- Cannot delete self
- Cannot delete last super_admin

Create src/lib/hooks/use-admin-users.ts

VERIFICATION:
- Only super_admin access
- CRUD works
- Safety guards work
```

---

## PROMPT 4.7 - Admin Activity Logs

```
Create activity logs page:

src/app/[locale]/admin/(dashboard)/activity/page.tsx

Features:
- Chronological list
- Filters: admin, action, date range
- Expandable details

Action labels (readable Spanish):
- admin.login → "Inicio de sesión"
- tenant.suspend → "Suspendió tenant"
- etc.

Mobile:
- Cards
- Filters in modal

VERIFICATION:
- Logs display
- Filters work
```

---

# PHASE 5: Production Configuration

## PROMPT 5.1 - Production Setup

```
Configure Next.js for production:

1. next.config.js:
   - Image domains if needed
   - output: 'standalone' for Railway

2. Error pages:
   - Custom 404 (Spanish)
   - Custom 500 (Spanish)

3. SEO basics:
   - robots.txt
   - Default metadata

4. Security headers in middleware

5. Environment variables:
   - NEXT_PUBLIC_API_URL=https://api.denorly.com/api/v1
   - NEXT_PUBLIC_APP_URL=https://denorly.com

VERIFICATION:
- npm run build succeeds
- No errors
```

---

## Environment Variables Reference

```
# API
NEXT_PUBLIC_API_URL=https://api.denorly.com/api/v1

# App
NEXT_PUBLIC_APP_URL=https://denorly.com
```

---

## Summary

| Phase | Description       | Est. Hours |
| ----- | ----------------- | ---------- |
| 1     | Project Setup     | 4-5        |
| 2     | Auth Pages        | 2-3        |
| 3     | Dashboard Pages   | 8-10       |
| 4     | Admin Panel       | 5-6        |
| 5     | Production Config | 1-2        |

**Total: ~20-26 hours**

---

## Mobile First Checklist

Before each commit, verify:

- [ ] Base classes (no prefix) are for mobile
- [ ] Breakpoints (md:, lg:) ADD styles, not remove
- [ ] Touch targets minimum 44px
- [ ] Text minimum 16px on mobile
- [ ] Tables converted to cards on mobile
- [ ] Modals are bottom sheets on mobile
- [ ] Tested at 375px viewport
- [ ] Tested at 768px viewport
- [ ] Tested at 1280px viewport
