# Example 1 (EN): Web Application Development Team

# Project: TaskFlow Web Application

## Core Principles
**IMPORTANT**: Whenever you write code, it MUST follow SOLID design principles. Never write code that violates these principles. If you do, you will be asked to refactor it.

## Development Workflow
1. Before making any changes, create and checkout a feature branch named `feature-[brief-description]`
2. Write comprehensive tests for all new functionality
3. Compile code and run all tests before committing
4. Write detailed commit messages explaining the changes and rationale
5. Commit all changes to the feature branch

## Architecture Overview
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **State Management**: Zustand for client state, React Query for server state
- **Backend**: Node.js with Express and Prisma ORM
- **Database**: PostgreSQL
- **Testing**: Jest for unit tests, Playwright for E2E

## Code Standards
- Use TypeScript for all new code with strict type checking
- Follow the existing component structure in `/src/components`
- API routes follow RESTful conventions in `/src/pages/api`
- Use Prisma schema definitions for all database operations
- CSS classes should use Tailwind utilities; custom CSS only when necessary

## Quality Gates
- All code must compile without warnings
- Test coverage must remain above 80%
- All tests must pass before committing
- ESLint and Prettier must pass without errors

## File Organization
- Components: `/src/components/[feature]/[ComponentName].tsx`
- Pages: `/src/pages/[route].tsx`
- Utilities: `/src/lib/[category]/[utility].ts`
- Types: `/src/types/[domain].ts`

---

# Ejemplo 1 (ES): Equipo de Desarrollo de Aplicaciones Web

# Proyecto: Aplicacion Web TaskFlow

## Principios Centrales
**IMPORTANTE**: Cada vez que escribas codigo, DEBE seguir los principios de diseno SOLID. Nunca escribas codigo que viole estos principios. Si lo haces, se te pedira refactorizarlo.

## Flujo de Trabajo de Desarrollo
1. Antes de hacer cambios, crea y haz checkout de una rama feature llamada `feature-[breve-descripcion]`
2. Escribe pruebas completas para toda nueva funcionalidad
3. Compila el codigo y ejecuta todas las pruebas antes de commitear
4. Escribe mensajes de commit detallados explicando los cambios y el razonamiento
5. Commitea todos los cambios en la rama feature

## Arquitectura
- **Frontend**: Next.js 14 con TypeScript y Tailwind CSS
- **Manejo de Estado**: Zustand para estado del cliente, React Query para estado del servidor
- **Backend**: Node.js con Express y Prisma ORM
- **Base de Datos**: PostgreSQL
- **Testing**: Jest para unit tests, Playwright para E2E

## Estandares de Codigo
- Usa TypeScript para todo codigo nuevo con tipado estricto
- Sigue la estructura de componentes existente en `/src/components`
- Las rutas API siguen convenciones REST en `/src/pages/api`
- Usa definiciones del esquema de Prisma para todas las operaciones de base de datos
- Las clases CSS deben usar utilidades de Tailwind; CSS custom solo cuando sea necesario

## Controles de Calidad
- Todo el codigo debe compilar sin warnings
- La cobertura de pruebas debe mantenerse por encima de 80%
- Todas las pruebas deben pasar antes de commitear
- ESLint y Prettier deben pasar sin errores

## Organizacion de Archivos
- Componentes: `/src/components/[feature]/[ComponentName].tsx`
- Paginas: `/src/pages/[route].tsx`
- Utilidades: `/src/lib/[categoria]/[utilidad].ts`
- Tipos: `/src/types/[dominio].ts`
