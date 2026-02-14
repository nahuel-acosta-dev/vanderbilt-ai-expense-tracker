# Example 6 (EN): Open Source Library Development

# Project: DataValidator - Python Data Validation Library

## Library Design Principles
- **API Design**: Simple, intuitive, and Pythonic
- **Dependencies**: Minimal external dependencies
- **Compatibility**: Python 3.8+ support
- **Performance**: Optimize for speed and memory efficiency
- **Documentation**: Comprehensive with examples

## Development Workflow
1. Create feature branch: `feature-[functionality]` or `fix-[issue-number]`
2. Write tests first (TDD approach)
3. Ensure 100% test coverage for new code
4. Update documentation and examples
5. Run full test suite across Python versions: `tox`
6. Update CHANGELOG.md with clear user-facing description

## Code Quality Standards
- Follow PEP 8 with line length limit of 88 characters
- Use type hints for all public APIs
- Docstrings required for all public functions/classes (Google style)
- Use dataclasses or Pydantic for structured data
- Implement proper error handling with custom exceptions

## Project Structure
- `/src/datavalidator/`: Main library code
- `/tests/`: Comprehensive test suite
- `/docs/`: Sphinx documentation
- `/examples/`: Usage examples and tutorials
- `/benchmarks/`: Performance testing scripts

## Testing Requirements
- Unit tests with pytest for all functionality
- Property-based testing with Hypothesis for edge cases
- Performance benchmarks for critical paths
- Integration tests with popular data libraries (pandas, numpy)
- Test matrix: Python 3.8, 3.9, 3.10, 3.11, 3.12

## Documentation Standards
- README with quick start guide and installation
- API documentation generated from docstrings
- Tutorial notebooks for common use cases
- Performance guidelines and best practices
- Migration guides for major version changes

## Release Process
- Semantic versioning (MAJOR.MINOR.PATCH)
- Automated testing on multiple Python versions
- Code coverage reports and quality metrics
- Security scanning for vulnerabilities
- Automated PyPI releases via GitHub Actions

## Community Guidelines
- Welcome contributions with clear CONTRIBUTING.md
- Issue templates for bugs and feature requests
- Code of conduct for inclusive community
- Regular maintenance and dependency updates
- Responsive to community feedback and issues

---

# Ejemplo 6 (ES): Desarrollo de Librerias de Codigo Abierto

# Proyecto: DataValidator - Libreria de Validacion de Datos en Python

## Principios de Diseno de la Libreria
- **Diseno de API**: Simple, intuitiva y Pythonic
- **Dependencias**: Minimas dependencias externas
- **Compatibilidad**: Soporte para Python 3.8+
- **Performance**: Optimizar velocidad y eficiencia de memoria
- **Documentacion**: Completa con ejemplos

## Flujo de Desarrollo
1. Crear rama feature: `feature-[functionality]` o `fix-[issue-number]`
2. Escribir pruebas primero (enfoque TDD)
3. Asegurar 100% de cobertura de pruebas para codigo nuevo
4. Actualizar documentacion y ejemplos
5. Ejecutar suite completa de pruebas en multiples versiones de Python: `tox`
6. Actualizar CHANGELOG.md con descripcion clara para usuarios

## Estandares de Calidad de Codigo
- Seguir PEP 8 con limite de linea de 88 caracteres
- Usar type hints para todas las APIs publicas
- Docstrings requeridos para todas las funciones/clases publicas (estilo Google)
- Usar dataclasses o Pydantic para datos estructurados
- Implementar manejo de errores adecuado con excepciones custom

## Estructura del Proyecto
- `/src/datavalidator/`: Codigo principal de la libreria
- `/tests/`: Suite de pruebas completa
- `/docs/`: Documentacion Sphinx
- `/examples/`: Ejemplos de uso y tutoriales
- `/benchmarks/`: Scripts de pruebas de performance

## Requisitos de Testing
- Unit tests con pytest para toda la funcionalidad
- Testing basado en propiedades con Hypothesis para edge cases
- Benchmarks de performance para rutas criticas
- Tests de integracion con librerias de datos populares (pandas, numpy)
- Matriz de pruebas: Python 3.8, 3.9, 3.10, 3.11, 3.12

## Estandares de Documentacion
- README con guia rapida e instalacion
- Documentacion de API generada desde docstrings
- Notebooks tutoriales para casos de uso comunes
- Lineamientos de performance y mejores practicas
- Guias de migracion para cambios de version mayor

## Proceso de Release
- Versionado semantico (MAJOR.MINOR.PATCH)
- Testing automatizado en multiples versiones de Python
- Reportes de cobertura y metricas de calidad
- Escaneo de seguridad para vulnerabilidades
- Releases automaticos en PyPI via GitHub Actions

## Lineamientos de Comunidad
- Contribuciones bienvenidas con CONTRIBUTING.md claro
- Templates de issues para bugs y feature requests
- Codigo de conducta para comunidad inclusiva
- Mantenimiento regular y actualizaciones de dependencias
- Responder a feedback e issues de la comunidad
