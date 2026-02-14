# Example 2 (EN): Python Data Science Project

# Project: Customer Analytics Pipeline

## Development Standards
- **Language**: Python 3.11+
- **Code Style**: Follow PEP 8 strictly, use Black for formatting
- **Type Hints**: Required for all function signatures and class definitions
- **Documentation**: Docstrings required for all public functions and classes

## Workflow Requirements
1. Create feature branch: `analysis-[description]` or `model-[description]`
2. Write unit tests for all data processing functions
3. Run `pytest` and ensure all tests pass
4. Run `black .` and `flake8` before committing
5. Update relevant documentation in `/docs` if adding new features

## Project Structure
- `/src/data`: Data ingestion and preprocessing modules
- `/src/models`: ML model definitions and training scripts
- `/src/analysis`: Exploratory analysis notebooks and scripts
- `/src/utils`: Shared utility functions
- `/tests`: Comprehensive test suite
- `/configs`: Configuration files for different environments

## Data Handling Standards
- Use Pandas for data manipulation, prefer vectorized operations
- All data files must be documented in `/data/README.md`
- Use Pydantic models for data validation and serialization
- Never commit raw data files to version control
- Use environment variables for database connections and API keys

## ML/Analysis Guidelines
- Use scikit-learn for standard ML algorithms
- Notebook naming: `YYYY-MM-DD-[initials]-[description].ipynb`
- Save all trained models with versioning in `/models/trained`
- Use MLflow for experiment tracking
- Include model performance metrics in commit messages

## Dependencies
- Core: pandas, numpy, scikit-learn, matplotlib, seaborn
- ML: xgboost, lightgbm, optuna
- Data: sqlalchemy, pydantic, requests
- Testing: pytest, pytest-cov

---

# Ejemplo 2 (ES): Proyecto de Ciencia de Datos en Python

# Proyecto: Pipeline de Analitica de Clientes

## Estandares de Desarrollo
- **Lenguaje**: Python 3.11+
- **Estilo de Codigo**: Seguir PEP 8 estrictamente, usar Black para formateo
- **Type Hints**: Requeridos en todas las firmas de funciones y definiciones de clases
- **Documentacion**: Docstrings requeridos para todas las funciones y clases publicas

## Requisitos de Flujo de Trabajo
1. Crear rama feature: `analysis-[descripcion]` o `model-[descripcion]`
2. Escribir unit tests para todas las funciones de procesamiento de datos
3. Ejecutar `pytest` y asegurarse de que todas las pruebas pasen
4. Ejecutar `black .` y `flake8` antes de commitear
5. Actualizar documentacion relevante en `/docs` si se agregan nuevas features

## Estructura del Proyecto
- `/src/data`: Modulos de ingestion y preprocesamiento de datos
- `/src/models`: Definiciones de modelos ML y scripts de entrenamiento
- `/src/analysis`: Notebooks y scripts de analisis exploratorio
- `/src/utils`: Funciones utilitarias compartidas
- `/tests`: Suite de pruebas completa
- `/configs`: Archivos de configuracion para distintos entornos

## Estandares de Manejo de Datos
- Usar Pandas para manipulacion de datos, preferir operaciones vectorizadas
- Todos los archivos de datos deben estar documentados en `/data/README.md`
- Usar modelos de Pydantic para validacion y serializacion de datos
- Nunca commitear archivos de datos crudos al control de versiones
- Usar variables de entorno para conexiones a bases de datos y API keys

## Lineamientos de ML/Analisis
- Usar scikit-learn para algoritmos ML estandar
- Nombre de notebooks: `YYYY-MM-DD-[initials]-[description].ipynb`
- Guardar todos los modelos entrenados con versionado en `/models/trained`
- Usar MLflow para tracking de experimentos
- Incluir metricas de performance del modelo en los mensajes de commit

## Dependencias
- Core: pandas, numpy, scikit-learn, matplotlib, seaborn
- ML: xgboost, lightgbm, optuna
- Data: sqlalchemy, pydantic, requests
- Testing: pytest, pytest-cov
