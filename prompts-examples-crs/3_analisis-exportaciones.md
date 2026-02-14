# Prompt de análisis de exportaciones (ES/EN)

## Español

Quiero evaluar tres implementaciones distintas de exportación de datos en mi aplicación de control de gastos. Tengo estas ramas:

- feature-data-export-v1: Exportación simple a CSV (un solo botón)
- feature-data-export-v2: Exportación avanzada con múltiples formatos y filtros
- feature-data-export-v3: Integración en la nube con compartir y colaboración

Necesito que analices sistemáticamente cada implementación cambiando entre ramas y revisando código, arquitectura y detalles.

Proceso de análisis (para cada rama v1, v2, v3):
1. Cambia a la rama
2. Revisa todos los archivos creados o modificados
3. Analiza la arquitectura y los patrones de implementación
4. Revisa la estructura y organización de componentes
5. Evalúa la implementación de la interfaz de usuario
6. Verifica el manejo de errores y casos límite
7. Evalúa el enfoque técnico y librerías utilizadas

Entrega:
Crea un archivo llamado "code-analysis.md" con hallazgos detallados para cada versión.

Para cada versión, documenta:
- Archivos creados/modificados (listarlos)
- Visión general de la arquitectura (cómo está organizado)
- Componentes clave y sus responsabilidades
- Librerías y dependencias usadas
- Patrones y enfoques de implementación
- Evaluación de complejidad del código
- Enfoque de manejo de errores
- Consideraciones de seguridad
- Implicaciones de rendimiento
- Factores de extensibilidad y mantenibilidad

Deep dive técnico:
- ¿Cómo funciona técnicamente la exportación?
- ¿Qué enfoque de generación de archivos se usa?
- ¿Cómo se maneja la interacción del usuario?
- ¿Qué patrón de estado se utiliza?
- ¿Cómo se manejan los casos límite?

Sé detallado y técnico: este análisis definirá qué enfoque adoptamos o cómo combinarlos.

---

## English

I need to evaluate three different data export implementations in my expense tracker app across three branches:

- feature-data-export-v1: Simple CSV export (single button)
- feature-data-export-v2: Advanced export with multiple formats and filters
- feature-data-export-v3: Cloud integration with sharing and collaboration

Please analyze each implementation systematically by switching branches and examining the code, architecture, and details.

Analysis process (for each branch v1, v2, v3):
1. Switch to the branch
2. Review all files created or modified
3. Analyze architecture and implementation patterns
4. Review component structure and organization
5. Evaluate the UI implementation
6. Check error handling and edge cases
7. Assess technical approach and libraries used

Deliverable:
Create a file called "code-analysis.md" with detailed findings for each version.

For each version, document:
- Files created/modified (list them)
- Architecture overview (how it is organized)
- Key components and responsibilities
- Libraries and dependencies used
- Implementation patterns and approaches
- Code complexity assessment
- Error handling approach
- Security considerations
- Performance implications
- Extensibility and maintainability factors

Technical deep dive:
- How does the export functionality work technically?
- What file generation approach is used?
- How is user interaction handled?
- What state management patterns are used?
- How are edge cases handled?

Be thorough and technical: this analysis will inform which approach we adopt or how to combine them.
