# Example 3 (EN): Mobile App Development (React Native)

# Project: FitnessTracker Mobile App

## Platform Requirements
- **Framework**: React Native 0.72+ with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Navigation**: React Navigation v6
- **UI Library**: Native Base for consistent design
- **Platform Support**: iOS 14+ and Android API 24+

## Branch Strategy
1. Create feature branches: `mobile-[feature-name]`
2. Use conventional commits: `feat:`, `fix:`, `refactor:`, etc.
3. Test on both iOS and Android before committing
4. Run `npm run lint` and `npm run type-check` before commits

## Code Organization
- **Screens**: `/src/screens/[FeatureName]/[ScreenName]Screen.tsx`
- **Components**: `/src/components/[ComponentName]/index.tsx`
- **Navigation**: `/src/navigation/[NavigatorName]Navigator.tsx`
- **Services**: `/src/services/[serviceName].ts`
- **Store**: `/src/store/slices/[featureName]Slice.ts`

## Mobile-Specific Standards
- Use React Native's built-in components before third-party libraries
- Implement proper error boundaries for crash prevention
- Use AsyncStorage for local data persistence
- Follow platform-specific design guidelines (iOS Human Interface, Material Design)
- Optimize images and use vector graphics when possible

## Testing Requirements
- Unit tests with Jest and React Native Testing Library
- E2E tests with Detox for critical user flows
- Test on physical devices before major releases
- Performance testing with Flipper profiling

## Performance Guidelines
- Use FlatList for large datasets, never ScrollView
- Implement proper memoization with React.memo and useMemo
- Lazy load heavy components and screens
- Monitor bundle size and use code splitting when necessary

---

# Ejemplo 3 (ES): Desarrollo de App para Dispositivos Moviles (React Native)

# Proyecto: App Movil FitnessTracker

## Requisitos de Plataforma
- **Framework**: React Native 0.72+ con TypeScript
- **Manejo de Estado**: Redux Toolkit con RTK Query
- **Navegacion**: React Navigation v6
- **UI Library**: Native Base para un diseno consistente
- **Soporte de Plataforma**: iOS 14+ y Android API 24+

## Estrategia de Ramas
1. Crear ramas feature: `mobile-[feature-name]`
2. Usar commits convencionales: `feat:`, `fix:`, `refactor:`, etc.
3. Probar en iOS y Android antes de commitear
4. Ejecutar `npm run lint` y `npm run type-check` antes de commitear

## Organizacion de Codigo
- **Screens**: `/src/screens/[FeatureName]/[ScreenName]Screen.tsx`
- **Componentes**: `/src/components/[ComponentName]/index.tsx`
- **Navegacion**: `/src/navigation/[NavigatorName]Navigator.tsx`
- **Servicios**: `/src/services/[serviceName].ts`
- **Store**: `/src/store/slices/[featureName]Slice.ts`

## Estandares Especificos Mobile
- Usar componentes nativos de React Native antes de librerias de terceros
- Implementar error boundaries adecuados para prevenir crashes
- Usar AsyncStorage para persistencia local de datos
- Seguir guias de diseno especificas por plataforma (iOS Human Interface, Material Design)
- Optimizar imagenes y usar graficos vectoriales cuando sea posible

## Requisitos de Testing
- Unit tests con Jest y React Native Testing Library
- E2E tests con Detox para flujos criticos
- Probar en dispositivos fisicos antes de releases importantes
- Testing de performance con Flipper profiling

## Lineamientos de Performance
- Usar FlatList para datasets grandes, nunca ScrollView
- Implementar memoizacion adecuada con React.memo y useMemo
- Lazy load de componentes y pantallas pesadas
- Monitorear tamano de bundle y usar code splitting cuando sea necesario
