# Example 5 (EN): DevOps Infrastructure Project

# Project: Multi-Cloud Infrastructure Platform

## Infrastructure as Code Standards
- **Primary Tool**: Terraform with HCL
- **Cloud Providers**: AWS, Azure, GCP
- **Configuration Management**: Ansible playbooks
- **Container Orchestration**: Kubernetes with Helm charts
- **Monitoring**: Prometheus, Grafana, ELK stack

## Workflow Requirements
1. Create infrastructure branch: `infra-[environment]-[component]`
2. Run `terraform plan` and review changes carefully
3. Test in development environment first
4. Update documentation in `/docs/runbooks`
5. Peer review required for production changes
6. Use conventional commits with clear impact description

## Directory Structure
- `/terraform/[provider]/[environment]/`: Environment-specific configurations
- `/ansible/playbooks/`: Configuration management scripts
- `/k8s/[namespace]/`: Kubernetes manifests and Helm charts
- `/scripts/`: Automation and deployment scripts
- `/docs/`: Architecture decisions and runbooks

## Security and Compliance
- All secrets must use external secret management (AWS Secrets Manager, etc.)
- Enable encryption at rest and in transit for all data stores
- Implement least-privilege access policies
- Use service accounts, never personal credentials in automation
- Maintain audit logs for all infrastructure changes

## Deployment Principles
- Use blue-green deployments for zero-downtime updates
- Implement automatic rollback on health check failures
- Tag all resources with environment, owner, and cost-center
- Use infrastructure modules for reusability across environments
- Implement proper backup and disaster recovery procedures

## Monitoring and Alerting
- Set up alerts for resource utilization > 80%
- Monitor certificate expiration dates
- Track deployment success/failure rates
- Implement SLA monitoring for critical services
- Use runbooks for common incident response procedures

## Cost Optimization
- Implement auto-scaling policies for dynamic workloads
- Use spot instances where appropriate for non-critical workloads
- Regular cost reviews with resource rightsizing
- Implement resource lifecycle policies for cleanup

---

# Ejemplo 5 (ES): Proyecto de Infraestructura DevOps

# Proyecto: Plataforma de Infraestructura Multi-Cloud

## Estandares de Infraestructura como Codigo
- **Herramienta Principal**: Terraform con HCL
- **Proveedores de Nube**: AWS, Azure, GCP
- **Gestion de Configuracion**: Playbooks de Ansible
- **Orquestacion de Contenedores**: Kubernetes con Helm charts
- **Monitoreo**: Prometheus, Grafana, ELK stack

## Requisitos de Flujo de Trabajo
1. Crear rama de infraestructura: `infra-[environment]-[component]`
2. Ejecutar `terraform plan` y revisar cambios cuidadosamente
3. Probar primero en entorno de desarrollo
4. Actualizar documentacion en `/docs/runbooks`
5. Peer review requerido para cambios en produccion
6. Usar commits convencionales con descripcion clara del impacto

## Estructura de Directorios
- `/terraform/[provider]/[environment]/`: Configuraciones especificas por entorno
- `/ansible/playbooks/`: Scripts de gestion de configuracion
- `/k8s/[namespace]/`: Manifiestos de Kubernetes y Helm charts
- `/scripts/`: Automatizacion y scripts de despliegue
- `/docs/`: Decisiones de arquitectura y runbooks

## Seguridad y Compliance
- Todos los secretos deben usar gestion externa (AWS Secrets Manager, etc.)
- Habilitar cifrado en reposo y en transito para todos los data stores
- Implementar politicas de menor privilegio
- Usar service accounts, nunca credenciales personales en automatizacion
- Mantener audit logs de todos los cambios de infraestructura

## Principios de Deployment
- Usar despliegues blue-green para cero downtime
- Implementar rollback automatico en fallas de health checks
- Taguear todos los recursos con ambiente, owner, y cost-center
- Usar modulos de infraestructura para reusabilidad entre entornos
- Implementar backups y procedimientos de disaster recovery adecuados

## Monitoreo y Alertas
- Configurar alertas para utilizacion de recursos > 80%
- Monitorear fechas de expiracion de certificados
- Rastrear tasas de exito/fallo de despliegues
- Implementar monitoreo de SLA para servicios criticos
- Usar runbooks para procedimientos comunes de respuesta a incidentes

## Optimizacion de Costos
- Implementar politicas de auto-scaling para workloads dinamicos
- Usar instancias spot cuando sea apropiado para workloads no criticos
- Revisiones de costos regulares con rightsizing de recursos
- Implementar politicas de ciclo de vida de recursos para limpieza
