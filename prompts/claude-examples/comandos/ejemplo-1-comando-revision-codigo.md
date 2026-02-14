# Example 1 (EN): Code Review Command

Possible real-code location: `.claude/commands/code-review.md`

# Code Review Command

Carefully perform a comprehensive code review of $ARGUMENTS.

## Review Standards
Examples of excellent code that you should match the design/style/conventions of:
- `src/components/UserProfile/UserProfile.tsx` (React components)
- `src/utils/dataValidation.ts` (utility functions)
- `src/hooks/useUserData.ts` (custom hooks)

## Process
1. **First**: Read the example files above to understand our design patterns, naming conventions, and code style
2. **Second**: Analyze $ARGUMENTS against these standards
3. **Third**: Create detailed critique covering:
   - Code structure and organization
   - Adherence to established patterns
   - Performance considerations
   - Security implications
   - Maintainability concerns
   - Test coverage gaps

## Output Requirements
- Save review as `ai-code-reviews/{filename}.review.md` for each file reviewed
- Include specific line references for issues
- Provide concrete suggestions for improvements
- Rate overall quality: Excellent/Good/Needs Improvement/Poor
- Estimate refactoring effort: Low/Medium/High

## Review Checklist
- Follows project naming conventions
- Proper error handling implemented
- No hardcoded values, secrets, or magic numbers
- Appropriate comments and documentation
- Follows existing design principles and consistent with exemplars
- No obvious security vulnerabilities
- Performance optimizations considered

---

# Ejemplo 1 (ES): Comando de Revision de Codigo

Posible ubicacion real en el codigo: `.claude/commands/code-review.md`

# Comando de Revision de Codigo

Realiza una revision de codigo completa y cuidadosa de $ARGUMENTS.

## Estandares de Revision
Ejemplos de codigo excelente que debes igualar en diseno/estilo/convenciones:
- `src/components/UserProfile/UserProfile.tsx` (componentes React)
- `src/utils/dataValidation.ts` (funciones utilitarias)
- `src/hooks/useUserData.ts` (custom hooks)

## Proceso
1. **Primero**: Lee los archivos de ejemplo anteriores para entender patrones de diseno, convenciones de nomenclatura y estilo de codigo
2. **Segundo**: Analiza $ARGUMENTS contra esos estandares
3. **Tercero**: Crea una critica detallada que cubra:
   - Estructura y organizacion del codigo
   - Adherencia a patrones establecidos
   - Consideraciones de performance
   - Implicaciones de seguridad
   - Problemas de mantenibilidad
   - Brechas de cobertura de tests

## Requisitos de Salida
- Guarda la revision como `ai-code-reviews/{filename}.review.md` por cada archivo revisado
- Incluye referencias de lineas especificas para los problemas
- Proporciona sugerencias concretas de mejora
- Califica la calidad general: Excelente/Bueno/Necesita mejora/Pobre
- Estima el esfuerzo de refactor: Bajo/Medio/Alto

## Checklist de Revision
- Sigue las convenciones de nombres del proyecto
- Manejo adecuado de errores
- Sin valores hardcodeados, secretos o numeros magicos
- Comentarios y documentacion apropiados
- Sigue principios de diseno existentes y consistente con los ejemplos
- Sin vulnerabilidades de seguridad obvias
- Considera optimizaciones de performance
