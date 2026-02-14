# Example 4 (EN): Enterprise Backend Service

# Project: Payment Processing Microservice

## Service Architecture
- **Framework**: Spring Boot 3.1 with Java 17
- **Database**: PostgreSQL with JPA/Hibernate
- **Security**: OAuth 2.0 with JWT tokens
- **Documentation**: OpenAPI 3.0 specifications
- **Deployment**: Docker containers with Kubernetes

## Development Workflow
1. Create feature branch: `backend-[ticket-number]-[description]`
2. Write integration tests for all new endpoints
3. Update OpenAPI documentation for API changes
4. Run full test suite: `./gradlew test integrationTest`
5. Ensure Docker build succeeds: `docker build -t payment-service .`
6. Commit with ticket reference: `feat: [TICKET-123] Add payment validation`

## Code Standards
- Follow Google Java Style Guide
- Use Spring Boot conventions for package structure
- All REST endpoints must have comprehensive validation
- Use DTOs for all external API contracts
- Implement proper exception handling with @ControllerAdvice

## Package Structure
- `controller`: REST endpoints and request/response handling
- `service`: Business logic and transaction management
- `repository`: Data access layer with JPA repositories
- `config`: Configuration classes and beans
- `dto`: Data Transfer Objects for API contracts
- `entity`: JPA entities for database mapping
- `exception`: Custom exceptions and error handling

## Security Requirements
- All endpoints require authentication except health checks
- Validate all inputs with Bean Validation annotations
- Use parameterized queries to prevent SQL injection
- Log security events for audit trail
- Never expose internal entity models in API responses

## Quality Gates
- Minimum 85% test coverage (unit + integration)
- All dependencies must be up-to-date and vulnerability-free
- SonarQube quality gate must pass
- All database migrations must be reversible
- Performance tests must complete under 200ms for standard operations

## Monitoring and Logging
- Use structured logging with JSON format
- Include correlation IDs for request tracing
- Monitor key metrics: response time, error rate, throughput
- Implement health checks for Kubernetes readiness/liveness probes

---

# Ejemplo 4 (ES): Servicio de Backend Empresarial

# Proyecto: Microservicio de Procesamiento de Pagos

## Arquitectura del Servicio
- **Framework**: Spring Boot 3.1 con Java 17
- **Base de Datos**: PostgreSQL con JPA/Hibernate
- **Seguridad**: OAuth 2.0 con tokens JWT
- **Documentacion**: Especificaciones OpenAPI 3.0
- **Deployment**: Contenedores Docker con Kubernetes

## Flujo de Desarrollo
1. Crear rama feature: `backend-[ticket-number]-[description]`
2. Escribir pruebas de integracion para todos los endpoints nuevos
3. Actualizar la documentacion OpenAPI para cambios en la API
4. Ejecutar suite completa de tests: `./gradlew test integrationTest`
5. Asegurar que el build de Docker funciona: `docker build -t payment-service .`
6. Commitear con referencia al ticket: `feat: [TICKET-123] Add payment validation`

## Estandares de Codigo
- Seguir la guia de estilo de Google Java
- Usar convenciones de Spring Boot para estructura de paquetes
- Todos los endpoints REST deben tener validacion completa
- Usar DTOs para todos los contratos de API externos
- Implementar manejo correcto de excepciones con @ControllerAdvice

## Estructura de Paquetes
- `controller`: Endpoints REST y manejo de requests/responses
- `service`: Logica de negocio y manejo de transacciones
- `repository`: Capa de acceso a datos con repositorios JPA
- `config`: Clases y beans de configuracion
- `dto`: Data Transfer Objects para contratos de API
- `entity`: Entidades JPA para mapeo de base de datos
- `exception`: Excepciones custom y manejo de errores

## Requisitos de Seguridad
- Todos los endpoints requieren autenticacion excepto health checks
- Validar todos los inputs con anotaciones Bean Validation
- Usar queries parametrizadas para prevenir SQL injection
- Loggear eventos de seguridad para auditoria
- Nunca exponer modelos de entidad internos en respuestas de API

## Controles de Calidad
- Minimo 85% de cobertura de tests (unit + integration)
- Todas las dependencias deben estar actualizadas y sin vulnerabilidades
- El quality gate de SonarQube debe pasar
- Todas las migraciones de base de datos deben ser reversibles
- Tests de performance deben completar en menos de 200ms para operaciones estandar

## Monitoreo y Logging
- Usar logging estructurado en formato JSON
- Incluir correlation IDs para trazabilidad de requests
- Monitorear metricas clave: tiempo de respuesta, tasa de errores, throughput
- Implementar health checks para readiness/liveness de Kubernetes
