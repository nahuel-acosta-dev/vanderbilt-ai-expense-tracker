# document-feature

Genera documentación de una nueva funcionalidad en dos niveles:

1. Documentación para desarrolladores (técnica, API, implementación)
2. Documentación para usuarios (paso a paso + marcadores para capturas)

## Uso

document-feature "<feature_name>"

Ejemplos:

- document-feature "Restablecer contraseña"
- document-feature "Exportar reporte PDF"
- document-feature "Nuevo flujo de checkout"

---

## Objetivo

A partir de `<feature_name>`, inspeccionar el repositorio para identificar cambios/archivos relevantes y producir **dos archivos Markdown**:

- `docs/dev/<slug>-implementation.md`
- `docs/user/<slug>-guide.md`

Donde `<slug>` es kebab-case en inglés si el repo está mayormente en inglés, o en español si el repo documenta en español.
Si ya existen convenciones claras en `docs/`, seguirlas.

---

## Instrucciones para el agente

### 0) Reglas generales

- NO inventes APIs o comportamiento: si no está en el código, marca como `TODO` o `Assumption`.
- Respeta el formato existente de `docs/` (títulos, frontmatter si existe, estilo de headings, tono, enlaces relativos).
- Ambos documentos deben incluir enlaces cruzados:
  - Dev doc enlaza a User doc
  - User doc enlaza a Dev doc (en sección “Para desarrolladores” o “Detalles técnicos”)

### 1) Detectar patrones del repositorio

1. Busca documentación existente:
   - `docs/`, `documentation/`, `README.md`, `CONTRIBUTING.md`, `ADR/`, `api/`, `openapi`, `swagger`
2. Detecta si hay templates (ej: `docs/_templates`, `mkdocs.yml`, `docusaurus.config`, `vitepress`, etc.)
3. Decide el idioma predominante y naming conventions.

### 2) Encontrar código relevante de la feature

- Usa el `<feature_name>` para localizar:
  - rutas/endpoints (REST/GraphQL)
  - componentes UI
  - handlers/controllers/services
  - schemas/validations (Zod, Joi, etc.)
  - tests relacionados
  - flags/config/env vars
- Si el repo usa convención por carpetas (ej: `src/app`, `backend`, `packages`), recórrelo.
- Si no se encuentra nada, genera documentación “esqueleto” con TODOs y una sección “Cómo completar”.

### 3) Clasificar la feature (extra, pero recomendado)

Clasifica como:

- Frontend-only
- Backend-only
- Full-stack

Criterio:

- Frontend: cambios en UI, componentes, rutas de frontend sin endpoints nuevos
- Backend: endpoints/DB/servicios sin cambios UI
- Full-stack: ambos

Usa esta clasificación para ajustar secciones (ej: si no hay API, no inventar “API contract”).

### 4) Generación de rutas/nombres

Define:

- `<slug>`: kebab-case derivado de `<feature_name>` siguiendo el idioma del repo.
- Archivos:
  - Dev: `docs/dev/<slug>-implementation.md`
  - User: `docs/user/<slug>-guide.md`
    Si `docs/dev` o `docs/user` no existen, crea carpetas o adapta a la estructura detectada (por ejemplo `docs/developer/` y `docs/user/`).

### 5) Contenido requerido — Dev doc

Crea `docs/dev/<slug>-implementation.md` con estas secciones (ajusta a patrones del repo):

1. **Title + Overview**
   - Qué resuelve la feature, alcance, no-alcance
2. **Architecture / Flow**
   - Diagrama ASCII simple o lista por pasos del flujo
3. **API / Contracts** (si aplica)
   - Endpoints (método, path)
   - Request/Response ejemplo (JSON)
   - Validaciones / errores
   - Autenticación/roles/permissions
4. **Data model / Persistence** (si aplica)
   - Tablas/colecciones, campos nuevos
   - Migraciones
5. **Implementation details**
   - Archivos clave tocados (paths)
   - Decisiones relevantes
   - Feature flags / env vars
6. **Testing**
   - Tests existentes y cómo correrlos
   - Casos clave a cubrir (lista)
7. **Observability / Logs** (si aplica)
   - Logs, métricas, tracing, dashboards
8. **Rollout / Backwards compatibility**
   - Riesgos, migración, plan de despliegue
9. **Link a la doc de usuario**
   - Enlace relativo al archivo en `docs/user/...`

Incluye una sección final **TODOs** si faltan datos.

### 6) Contenido requerido — User doc

Crea `docs/user/<slug>-guide.md` con:

1. **Qué es y para qué sirve**
2. **Requisitos previos**
   - permisos/rol, estar logueado, etc.
3. **Paso a paso**
   - pasos numerados
   - cada paso con placeholder de captura:
     - `![Screenshot: <describe>](./images/<slug>-step-01.png)`
     - o si el repo no usa imágenes en docs: `<!-- SCREENSHOT: <describe> -->`
4. **Casos comunes**
   - ejemplos concretos (inputs típicos)
5. **Problemas frecuentes**
   - errores comunes y cómo resolverlos
6. **FAQ**
7. **Para desarrolladores**
   - link relativo a `docs/dev/<slug>-implementation.md`

### 7) Screenshots (extra)

Si el entorno/agent lo permite:

- Captura screenshots automáticamente (ej: Playwright/Cypress) y guárdalas donde el repo lo haga.
  Si NO es posible:
- Deja placeholders consistentes y numerados.

### 8) Enlaces automáticos (extra)

- Busca docs relacionadas por keywords (`<feature_name>`, endpoints, nombres de módulos)
- Agrega “See also” en ambos docs con enlaces relativos.

---

## Output obligatorio

Al finalizar:

- Asegúrate de que existen estos archivos (o el equivalente según estructura detectada):
  - `docs/dev/<slug>-implementation.md`
  - `docs/user/<slug>-guide.md`
- Verifica links relativos entre ambos
- Mantén Markdown limpio (headings consistentes, code fences correctos)

Si no se encuentra suficiente información en el código:

- Genera igual ambos docs, marcando claramente TODOs y dónde completar.
