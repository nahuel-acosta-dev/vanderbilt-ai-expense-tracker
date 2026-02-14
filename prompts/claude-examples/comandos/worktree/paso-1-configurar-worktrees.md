# Step 1 (EN): Ask Claude Code to Set Up Worktrees

I want to develop two features in parallel for my expense tracker app using Git worktrees:

1. Data export system (CSV, PDF, JSON exports)
2. Analytics dashboard (charts, insights, trends)

Please help me set up the worktree environment:
1. Create a worktree for the export feature at `../expense-tracker-export` with branch `feature/data-export`
2. Create a worktree for the analytics feature at `../expense-tracker-analytics` with branch `feature/analytics-dashboard`
3. List all worktrees to confirm they were created
4. Explain what each worktree will contain and how they are isolated

I want to be able to work on both features simultaneously without conflicts.

## Your Directory Structure Will Look Like This

/expense-tracker-ai/         # Main worktree (main branch)

/expense-tracker-export/     # Export worktree (feature/data-export)

/expense-tracker-analytics/  # Analytics worktree (feature/analytics-dashboard)

## Starting Claude Code in Each Worktree
Each worktree is a complete, independent development environment. Now open two different terminal windows and start Claude Code in each worktree:

Terminal 1 - Export Feature:

```bash
cd ../expense-tracker-export
claude
```

Terminal 2 - Analytics Feature:

```bash
cd ../expense-tracker-analytics
claude
```

Now you can safely run Claude Code in parallel to develop multiple expense-tracking features simultaneously. Each worktree operates in complete isolation: changes made in one worktree do not affect the others, and you can test each feature independently without conflicts. This means you can have Claude working on your export system in one terminal while you develop the analytics dashboard in another, all without risking breaking existing functionality or interfering with each other's work. The parallel development approach lets you make rapid progress on multiple fronts while keeping code clean and conflict-free.

---

# Paso 1 (ES): Pedir a Claude Code que Configure Worktrees

Quiero desarrollar dos funcionalidades en paralelo para mi app de seguimiento de gastos usando Git worktrees:

1. Sistema de exportacion de datos (CSV, PDF, JSON)
2. Panel de analitica (graficos, insights, tendencias)

Por favor ayúdame a configurar el entorno de worktrees:
1. Crear un worktree para la funcionalidad de exportacion en `../expense-tracker-export` con la rama `feature/data-export`
2. Crear un worktree para la funcionalidad de analitica en `../expense-tracker-analytics` con la rama `feature/analytics-dashboard`
3. Listar todos los worktrees para confirmar que se crearon
4. Explicar que contiene cada worktree y como estan aislados

Quiero poder trabajar en ambas funcionalidades simultaneamente sin conflictos.

## Su Estructura de Directorios Tendra Este Aspecto

/expense-tracker-ai/         # Worktree principal (rama main)

/expense-tracker-export/     # Worktree de exportacion (feature/data-export)

/expense-tracker-analytics/  # Worktree de analitica (feature/analytics-dashboard)

## Iniciando Claude Code en Cada Arbol de Trabajo
Cada arbol de trabajo es un entorno de desarrollo completo e independiente. Ahora, abre dos ventanas de terminal diferentes e inicia Claude Code en cada uno de los arboles de trabajo:

Terminal 1 - Funcion de Exportacion:

```bash
cd ../expense-tracker-export
claude
```

Terminal 2 - Funcion Analitica:

```bash
cd ../expense-tracker-analytics
claude
```

Ahora puedes ejecutar Claude Code de forma segura en paralelo para desarrollar multiples funciones de seguimiento de gastos simultaneamente. Cada arbol de trabajo funciona de forma completamente aislada: los cambios realizados en un arbol de trabajo no afectan a los otros, y puedes probar cada funcionalidad de forma independiente sin ningun conflicto. Esto significa que puedes tener a Claude trabajando en tu sistema de exportacion en un terminal mientras desarrollas simultaneamente el panel de analitica en otro, todo ello sin riesgo de romper la funcionalidad existente o interferir en el trabajo de los demas. El enfoque de desarrollo en paralelo te permite progresar rapidamente en multiples frentes mientras mantienes un codigo limpio y libre de conflictos.
