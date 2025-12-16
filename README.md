# 📊 Sistema de Seguimiento Post-Formación - Inclusión Laboral

## 🎯 Versión 2.9 - Con Sistema de Indicadores

Sistema completo para gestionar el seguimiento de participantes en programas de formación técnica e inclusión laboral.

---

## ✨ NOVEDADES v2.9

### 📊 **NUEVO: Sistema de Indicadores Automáticos**
- **Hoja de Indicadores IL** con actualización automática
- 6 indicadores clave implementados:
  - **IL.P.03**: Número de participantes en Formación Técnica
  - **IL.P.05**: Tasa de retención de Formación Técnica
  - **IL.P.06**: Distribución porcentual deserciones por motivo
  - **IL.R.05E**: Tasa de graduación
  - **IL.I.03**: Porcentaje empleos conservados 3+ meses
  - **IL.I.04**: Porcentaje empleos conservados 6+ meses

### ✅ **Funcionalidad "No Terminó la Formación"**
- Hoja específica para participantes que abandonaron
- Columna con dropdown Sí/No en columna K
- Movimiento automático de participantes
- Análisis de motivos de deserción

---

## 📁 ARCHIVOS DEL SISTEMA

```
📁 Proyecto/
├── AGREGAR_FUNCIONES_NUEVAS.gs  ← Funciones para "No Terminó"
├── INDICADORES_IL.gs             ← NUEVO: Sistema de indicadores
├── README.md                     ← Esta guía
└── [Código principal en Google Apps Script]
```

---

## 🚀 INSTALACIÓN

### Paso 1: Configuración Inicial
1. Abre tu Google Sheet
2. Ve a **Extensiones → Apps Script**
3. Copia tu código actual del sistema v2.8

### Paso 2: Agregar Funciones Nuevas
1. Copia **TODO** el contenido de `AGREGAR_FUNCIONES_NUEVAS.gs`
2. Pégalo **AL FINAL** de tu código en Apps Script
3. Guarda (Ctrl+S)

### Paso 3: Agregar Sistema de Indicadores
1. Copia **TODO** el contenido de `INDICADORES_IL.gs`
2. Pégalo **AL FINAL** de tu código en Apps Script (después de las funciones anteriores)
3. Guarda (Ctrl+S)

### Paso 4: Ejecutar Instaladores
1. Recarga tu Google Sheet (F5)
2. Ve al menú: **🎓 Sistema de Seguimiento**
3. Ejecuta: **agregarFuncionesNuevasV29()** (una sola vez)
4. Ejecuta: **crearHojaIndicadores()** (una sola vez)

---

## 📊 USO DEL SISTEMA DE INDICADORES

### Crear/Ver Indicadores
1. Ejecuta la función: `crearHojaIndicadores()`
2. Se creará una hoja llamada **"📊 Indicadores IL"**
3. Los indicadores se calculan automáticamente

### Actualizar Indicadores
- **Manual**: Ejecuta `actualizarIndicadores()`
- **Automático**: Ejecuta `configurarAutoActualizacion()`
  - Se actualizarán cada hora automáticamente

### Interpretar Indicadores

| Estado | Significado |
|--------|-------------|
| ✅ | Meta cumplida o superada |
| ⚠️ | Cerca de la meta, requiere atención |
| ❌ | Por debajo de la meta, requiere acción |

---

## 🎯 USAR "NO TERMINÓ LA FORMACIÓN"

### Marcar Participantes
1. En **📋 Seguimiento General**, busca la columna K: **"No terminó formación (Sí/No)"**
2. Selecciona **"Sí"** para participantes que abandonaron
3. Ejecuta: `moverParticipantesNoTerminaron()`

### Ver Reporte
- Ejecuta: `verParticipantesNoTerminaron()`
- Muestra los últimos 10 con detalles

---

## 📋 ESTRUCTURA DEL SISTEMA

### Hojas del Sistema

| Hoja | Descripción |
|------|-------------|
| 📋 Seguimiento General | Participantes activos en proceso |
| 📞 Llamada 1-5 | Historial de cada llamada de seguimiento |
| ✅ Finalizados | Participantes que completaron el programa |
| ❌ No Terminó la Formación | Participantes que abandonaron |
| **📊 Indicadores IL** | **NUEVO: Dashboard de indicadores** |

### Columnas Principales

| Columna | Función |
|---------|---------|
| A | Creamos ID |
| B | Nombre Completo |
| C | Teléfono |
| D | Formación |
| E-J | **Columnas de etapas** (Aliados, Plataformas, etc.) |
| **K** | **"No terminó formación (Sí/No)"** |
| L | Etapa Actual |
| M-R | Resultados, Documentos, Fecha, Notas, Total Llamadas |
| S | Procesar (checkbox) |

---

## 📈 INDICADORES DETALLADOS

### IL.P.03: Participantes en Formación Técnica
- **Qué mide**: Total de participantes inscritos
- **Meta**: 100+ participantes
- **Cálculo**: En proceso + Finalizados + No terminaron

### IL.P.05: Tasa de Retención
- **Qué mide**: Porcentaje que continúa en el programa
- **Meta**: 85%
- **Cálculo**: (En proceso + Finalizados) / Total inscritos × 100

### IL.P.06: Deserciones por Motivo
- **Qué mide**: Top 3 motivos de abandono
- **Meta**: < 15% de deserción
- **Categorías**: Personales, Empleo, Salud, Económicos, Transporte, Interés

### IL.R.05E: Tasa de Graduación
- **Qué mide**: Porcentaje que completa la formación
- **Meta**: 80%
- **Cálculo**: Finalizados / Total inscritos × 100

### IL.I.03: Empleos 3+ Meses
- **Qué mide**: Empleos conservados al menos 3 meses
- **Meta**: 70%
- **Cálculo**: Empleos 3+ meses / Total empleados × 100

### IL.I.04: Empleos 6+ Meses
- **Qué mide**: Empleos conservados al menos 6 meses
- **Meta**: 60%
- **Cálculo**: Empleos 6+ meses / Total empleados × 100

---

## 💡 CONSEJOS Y BUENAS PRÁCTICAS

### Para Indicadores
✅ Actualiza los indicadores al inicio de cada semana
✅ Configura la auto-actualización si trabajas con el sistema diariamente
✅ Revisa el estado de los indicadores antes de reportes oficiales
✅ Usa los detalles para identificar áreas de mejora

### Para "No Terminó"
✅ Marca como "Sí" solo cuando confirmes el abandono
✅ Agrega notas con el motivo del abandono
✅ Revisa el reporte de deserciones mensualmente

### General
✅ Haz respaldos semanales del sistema
✅ Espera 1-2 segundos entre checkboxes
✅ Limpia bloqueos si detectas procesamiento duplicado

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Los indicadores muestran 0
- Verifica que tengas datos en las hojas correspondientes
- Ejecuta "Actualizar Indicadores" manualmente
- Revisa que los nombres de las hojas sean correctos

### Columna "No terminó" no aparece en K
- Ejecuta nuevamente `agregarFuncionesNuevasV29()`
- Verifica que no haya otras columnas desplazadas
- Revisa el log de la consola para ver errores

### Los colores no se aplican correctamente
- Ejecuta "Aplicar Diseño Profesional"
- Ejecuta `limpiarColoresEtapas()` y luego `aplicarSoloColoresFormacion()`

### Auto-actualización no funciona
- Ve a Extensiones → Apps Script → Activadores
- Verifica que exista el activador para `actualizarIndicadores`
- Si no existe, ejecuta "Configurar Auto-actualización" nuevamente

---

## 🆕 CAMBIOS POR VERSIÓN

### v2.9 (Actual)
- ✨ Sistema completo de indicadores IL
- ✨ Hoja de indicadores con actualización automática
- ✨ 6 indicadores clave implementados
- ✨ Dashboard visual con estado de indicadores
- 🐛 Columna "No terminó" ahora en posición K
- 🐛 Eliminación de columna vieja antes de agregar nueva
- 📝 README completo con documentación detallada

### v2.8
- Columnas de etapas con colores distintivos
- Sistema anti-doble procesamiento
- Nuevas formaciones (Análisis de datos, SAC, Ofimática)
- Actualización de estructura sin pérdida de datos

---

## 📞 FUNCIONES DISPONIBLES

### Instalación
- `agregarFuncionesNuevasV29()` - Instala funcionalidad "No Terminó"
- `crearHojaIndicadores()` - Crea hoja de indicadores

### Indicadores
- `actualizarIndicadores()` - Actualiza todos los indicadores
- `configurarAutoActualizacion()` - Activa actualización horaria
- `desactivarAutoActualizacion()` - Desactiva auto-actualización

### No Terminó
- `moverParticipantesNoTerminaron()` - Mueve participantes marcados
- `verParticipantesNoTerminaron()` - Muestra reporte de abandonos

---

## 🎉 ¡Sistema v2.9 Completo!

**Funcionalidades Principales:**
✅ Seguimiento de 6 llamadas por participante
✅ Procesamiento automático con anti-duplicados
✅ Registro en columnas de etapas
✅ Sistema de "No Terminó la Formación"
✅ **Dashboard de 6 indicadores IL**
✅ Importación inteligente de datos
✅ Reportes y diagnósticos avanzados

**¡Listo para gestionar tu programa de inclusión laboral!** 🚀
