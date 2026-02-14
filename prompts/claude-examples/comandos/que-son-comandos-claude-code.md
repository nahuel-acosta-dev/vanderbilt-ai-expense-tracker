# What Are Claude Code Commands? (EN)

While `claude.md` provides global context for each interaction, commands provide specific context and a process for concrete, repeatable tasks. Think of commands as specialized instruction sets that give Claude Code exactly what it needs to know for certain workflows, without overwhelming it with irrelevant information.

## The TARGETED Framework for Command Design
Use this acronym to create effective commands:

- Task-Specific Instructions
- Arguments and placeholders
- Reusable process steps
- Guided examples and references
- Explicit output requirements
- Template-based naming
- Error handling and edge cases
- Documentation and context

## Core Principles
1. Right context at the right time
Commands solve the "400-page manual" problem by providing only the relevant context needed for a specific task, avoiding information overload.

2. Reusable consistency
Commands ensure the same high-quality process is followed each time a task is performed, scaling your best practices through AI-assisted work.

3. Template-driven automation
Use placeholders and templates to keep commands flexible while preserving structure and naming conventions.

## Command Structure and Location
Commands are stored as markdown files in the `.claude/commands/` directory:

- Project-specific: `.claude/commands/` (versioned with your project)
- Global commands: `~/.claude/commands/` (available across projects)

## Command Management Tips
### Organization strategies
- By function: `plan-feature.md`, `impl-api.md`, `test-unit.md`, `deploy-prod.md`, ...
- By domain: `auth-login.md`, `user-profile.md`, `payment-process.md`, `order-create.md`, ...
- By role: `dev-review.md`, `qa-automation.md`, `ops-deploy.md`, `pm-requirements.md`, ...

### Version control
- Store project commands in `.claude/commands/` to share across the team
- Use descriptive commit messages when updating commands
- Review command changes as part of the code review process

### Command evolution
- Review and update commands regularly based on team feedback
- Archive obsolete commands instead of deleting them
- Document command changes in the project changelog

Commands transform Claude Code from a general assistant into a specialized team member with deep knowledge of your specific workflows. They ensure consistent, high-quality execution of repetitive tasks while providing the specific context needed for complex operations.

## Command Examples
These commands should not be used "as is." You should adapt them to your project. The goal is to inspire what a command could look like, not to dictate how it must be. The best commands will be tailored to your specific project.

---

# Que Son los Comandos de Claude Code? (ES)

Mientras que `claude.md` proporciona un contexto global para cada interaccion, los comandos proporcionan un contexto y un proceso especificos para tareas concretas y repetibles. Piense en los comandos como conjuntos de instrucciones especializadas que proporcionan a Claude Code exactamente lo que necesita saber para determinados flujos de trabajo, sin abrumarlo con informacion irrelevante.

## El Marco TARGETED para el Diseno de Comandos
Utilice este acronimo para crear comandos eficaces:

- Instrucciones especificas de tarea
- Argumentos y marcadores de posicion
- Pasos de proceso reutilizables
- Ejemplos guiados y referencias
- Requisitos de salida explicitos
- Nomenclatura basada en plantillas
- Tratamiento de errores y casos extremos
- Documentacion y contexto

## Principios Basicos
1. Contexto adecuado en el momento adecuado
Los comandos resuelven el problema del "manual de 400 paginas" proporcionando solo el contexto relevante necesario para una tarea especifica, evitando la sobrecarga de informacion.

2. Coherencia reutilizable
Los comandos garantizan que se siga el mismo proceso de alta calidad cada vez que se realiza una tarea, escalando sus mejores practicas a traves de su trabajo de IA.

3. Automatizacion basada en plantillas
Utilice marcadores de posicion y plantillas para flexibilizar los comandos al tiempo que mantiene la estructura y las convenciones de nomenclatura.

## Estructura y Ubicacion de Comandos
Los comandos se almacenan como archivos markdown en el directorio `.claude/commands/`:

- Especificos del proyecto: `.claude/commands/` (versionados con su proyecto)
- Comandos globales: `~/.claude/commands/` (disponibles en todos los proyectos)

## Consejos para la Gestion de Comandos
### Estrategias de organizacion
- Por funcion: `plan-feature.md`, `impl-api.md`, `test-unit.md`, `deploy-prod.md`, ...
- Por dominio: `auth-login.md`, `user-profile.md`, `payment-process.md`, `order-create.md`, ...
- Por rol: `dev-review.md`, `qa-automation.md`, `ops-deploy.md`, `pm-requirements.md`, ...

### Control de version
- Almacene los comandos del proyecto en `.claude/commands/` para compartirlos en equipo
- Utilice mensajes de commit descriptivos al actualizar los comandos
- Revise los cambios en los comandos como parte del proceso de revision del codigo

### Evolucion de comandos
- Revise y actualice periodicamente los comandos basandose en los comentarios del equipo
- Archivar los comandos obsoletos en lugar de eliminarlos
- Documentar los cambios de comandos en el registro de cambios del proyecto

Los comandos transforman a Claude Code de un asistente general en un miembro especializado del equipo con un profundo conocimiento de sus flujos de trabajo especificos. Garantizan la ejecucion coherente y de alta calidad de tareas repetitivas, al tiempo que proporcionan el contexto especifico necesario para operaciones complejas.

## Ejemplos de comandos
Estos comandos no deben utilizarse "tal cual". Debe tomarlos y adaptarlos a su proyecto. El objetivo es servir de inspiracion sobre el aspecto que podria tener un comando, no sobre como deberia ser. Los mejores comandos se adaptaran a su proyecto especifico.
