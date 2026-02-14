# Example 2 (EN): API Testing Command

Possible real-code location: `.claude/commands/api-test`

# API Testing Command

Create comprehensive API tests for: $ARGUMENTS

## Testing Strategy
Test the following API endpoints and scenarios based on $ARGUMENTS:

1. **Happy Path Testing**:
   - Valid request formats
   - Expected response structures
   - Proper HTTP status codes

2. **Error Handling Testing**:
   - Invalid request payloads
   - Authentication failures
   - Authorization edge cases
   - Rate limiting scenarios

3. **Edge Cases**:
   - Boundary value testing
   - Large payload handling
   - Concurrent request handling
   - Network timeout scenarios

## Test Structure Template
Create tests in `/tests/api/{endpoint-name}.test.ts`:

```typescript
describe('{Endpoint Name} API', () => {
  describe('POST /{endpoint}', () => {
    it('should create {resource} with valid data', async () => {
      // Test implementation
    });
    
    it('should return 400 for invalid data', async () => {
      // Test implementation
    });
    
    it('should require authentication', async () => {
      // Test implementation
    });
  });
  
  describe('GET /{endpoint}', () => {
    // Additional test cases
  });
});
```

---

# Ejemplo 2 (ES): Comando de Prueba de API

Posible ubicacion real en el codigo: `.claude/commands/api-test`

# Comando de Pruebas de API

Crea pruebas de API completas para: $ARGUMENTS

## Estrategia de Testing
Prueba los siguientes endpoints y escenarios de API segun $ARGUMENTS:

1. **Happy Path Testing**:
   - Formatos de request validos
   - Estructuras de respuesta esperadas
   - Codigos de estado HTTP correctos

2. **Testing de Manejo de Errores**:
   - Payloads de request invalidos
   - Fallos de autenticacion
   - Casos limite de autorizacion
   - Escenarios de rate limiting

3. **Casos Limite**:
   - Pruebas de valores frontera
   - Manejo de payloads grandes
   - Manejo de requests concurrentes
   - Escenarios de timeout de red

## Template de Estructura de Tests
Crea los tests en `/tests/api/{endpoint-name}.test.ts`:

```typescript
describe('{Endpoint Name} API', () => {
  describe('POST /{endpoint}', () => {
    it('should create {resource} with valid data', async () => {
      // Test implementation
    });
    
    it('should return 400 for invalid data', async () => {
      // Test implementation
    });
    
    it('should require authentication', async () => {
      // Test implementation
    });
  });
  
  describe('GET /{endpoint}', () => {
    // Additional test cases
  });
});
```
