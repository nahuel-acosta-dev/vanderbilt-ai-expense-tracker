# Parallel Agents Command (EN)

Possible real-code location: `.claude/commands/parallel-agents.md`

I want to develop features in parallel using Git worktrees and subagents: $ARGUMENTS

You are in the parent folder of the main repo. You will need to change to the main repo
folder to create the worktrees.

Please execute this complete workflow:

PHASE 1 - SETUP WORKTREES:
For each feature mentioned:
1. Create a worktree at `../expense-tracker-[feature-name]` with branch `feature/[feature-name]`
2. Set up the development environment in each worktree (if needed)
3. List all worktrees created

PHASE 2 - SPAWN SUBAGENTS:
For each feature, run a subagent in parallel with these instructions:
- You are working in the `expense-tracker-[feature-name]` worktree directory
- This is a completely isolated development environment
- Implement the `[feature-name]` feature with full functionality
- Include proper testing and error handling
- Compile and run tests, but don't attempt to run the application (e.g., don't do `npm run` or `npm run dev &`, etc.)
- When complete, write a detailed summary in `[feature-name].work.txt` in the main `expense-tracker-ai` directory
- The summary should include: what was implemented, files created/modified, dependencies added, testing approach, and integration notes

PHASE 3 - COORDINATION:
- Monitor all subagents working in parallel
- Ensure each subagent completes their feature implementation
- Verify each subagent creates their work summary file

PHASE 4 - FINAL SUMMARY:
After all subagents complete:
1. Read all the `.work.txt` files created by subagents
2. Provide a comprehensive summary of what was accomplished
3. List all features implemented and their status
4. Provide next steps for integration

Execute this complete parallel development workflow.

---

# Comando de Agentes Paralelos (ES)

Posible ubicacion real en el codigo: `.claude/commands/parallel-agents.md`

Quiero desarrollar funcionalidades en paralelo usando Git worktrees y subagentes: $ARGUMENTS

Estas en la carpeta padre del repo principal. Necesitaras cambiar a la carpeta del
repo principal para crear los worktrees.

Por favor ejecuta este flujo de trabajo completo:

FASE 1 - CONFIGURAR WORKTREES:
Para cada funcionalidad mencionada:
1. Crear un worktree en `../expense-tracker-[feature-name]` con la rama `feature/[feature-name]`
2. Configurar el entorno de desarrollo en cada worktree (si es necesario)
3. Listar todos los worktrees creados

FASE 2 - LANZAR SUBAGENTES:
Para cada funcionalidad, ejecuta un subagente en paralelo con estas instrucciones:
- Estas trabajando en el directorio `expense-tracker-[feature-name]`
- Este es un entorno de desarrollo completamente aislado
- Implementa la funcionalidad `[feature-name]` con funcionalidad completa
- Incluye testing y manejo de errores adecuados
- Compila y ejecuta los tests, pero no intentes ejecutar la aplicacion (por ejemplo, no hagas `npm run` o `npm run dev &`, etc.)
- Al finalizar, escribe un resumen detallado en `[feature-name].work.txt` en el directorio principal `expense-tracker-ai`
- El resumen debe incluir: que se implemento, archivos creados/modificados, dependencias agregadas, enfoque de testing y notas de integracion

FASE 3 - COORDINACION:
- Monitorea todos los subagentes trabajando en paralelo
- Asegura que cada subagente complete la implementacion de su funcionalidad
- Verifica que cada subagente cree su archivo de resumen

FASE 4 - RESUMEN FINAL:
Despues de que todos los subagentes completen:
1. Lee todos los archivos `.work.txt` creados por los subagentes
2. Proporciona un resumen completo de lo logrado
3. Lista todas las funcionalidades implementadas y su estado
4. Proporciona los siguientes pasos para la integracion

Ejecuta este flujo de desarrollo en paralelo completo.
