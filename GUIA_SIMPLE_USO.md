# 🚀 GUÍA SIMPLE - Código Final v2.9

## ⭐ ESTE ES EL ÚNICO ARCHIVO QUE DEBES USAR

**Archivo**: `CODIGO_FINAL_COMPLETO.gs`

---

## 📋 QUÉ HACE ESTE CÓDIGO

### ✅ LO QUE AGREGA:
1. **Hoja "❌ No Terminó la Formación"** (con encabezados rojos)
2. **Columna "No terminó formación (Sí/No)"** (amarilla)
3. **Funciones para mover participantes automáticamente**

### 🎨 LO QUE LIMPIA:
1. **Quita colores de las columnas de etapas** (Aliados, Plataformas, etc.)
2. **Deja SOLO colores por formación** (Barismo azul, Gastronomía amarillo, etc.)
3. **Mantiene colores de hojas de llamadas** (Llamada 1 azul, Llamada 2 morado, etc.)

### 🔒 LO QUE NO TOCA:
- ✅ **NO borra ningún dato**
- ✅ **NO afecta el sistema actual**
- ✅ **NO cambia configuraciones**

---

## 🚀 INSTALACIÓN EN 3 PASOS

### 1️⃣ COPIAR
```
1. Abre el archivo: CODIGO_FINAL_COMPLETO.gs
2. Selecciona TODO (Ctrl+A)
3. Copia (Ctrl+C)
```

### 2️⃣ PEGAR
```
1. Abre tu Google Sheet
2. Extensiones → Apps Script
3. Ve AL FINAL de tu código actual
4. Pega (Ctrl+V)
5. Guarda (Ctrl+S)
```

### 3️⃣ EJECUTAR
```
1. En Apps Script, selecciona función: instalarSistemaCompletoV29
2. Click en ▶️ Ejecutar
3. Acepta permisos (si pide)
4. Sigue los 6 pasos automáticos
5. Recarga tu Google Sheet (F5)
```

---

## 🎨 RESULTADO VISUAL

### ANTES (con colores en columnas de etapas):
```
| Formación      | Aliados 🔵 | Plataformas 🟣 | Conexión 🟢 | ... |
| Barismo        |   texto    |     texto      |    texto    | ... |
| Gastronomía    |   texto    |     texto      |    texto    | ... |
```

### DESPUÉS (solo colores por formación):
```
| Formación      | Aliados    | Plataformas    | Conexión    | ... |
| Barismo        |   texto    |     texto      |    texto    | ... | ← TODA LA FILA AZUL
| Gastronomía    |   texto    |     texto      |    texto    | ... | ← TODA LA FILA AMARILLA
```

---

## 💡 CÓMO USAR

### 🎯 CASO 1: Marcar un participante que no terminó
```
1. Ve a "📋 Seguimiento General"
2. Busca al participante
3. En columna amarilla "No terminó formación (Sí/No)"
4. Selecciona: Sí
```

### 🎯 CASO 2: Mover participantes marcados
```
OPCIÓN A - Desde Apps Script:
1. Ejecuta: moverANoTerminoFormacionManualV29

OPCIÓN B - Agregar al menú (recomendado):
En tu función onOpen(), ANTES de .addToUi(); agrega:

.addSeparator()
.addSubMenu(ui.createMenu('❌ No Terminó Formación')
  .addItem('🔄 Mover Participantes', 'moverANoTerminoFormacionManualV29')
  .addItem('📊 Ver Participantes', 'verParticipantesNoTerminaronV29')
  .addItem('🎨 Aplicar Formato Limpio', 'aplicarFormatoCompletoV29'))
```

### 🎯 CASO 3: Ver reportes
```
1. Ejecuta: verParticipantesNoTerminaronV29
2. O visita la hoja: "❌ No Terminó la Formación"
```

### 🎯 CASO 4: Aplicar formato limpio
```
Si quieres limpiar colores en cualquier momento:
1. Ejecuta: aplicarFormatoCompletoV29
2. Confirma
3. Los colores quedarán limpios (solo por formación)
```

---

## 🎨 COLORES POR FORMACIÓN

El sistema aplicará estos colores AUTOMÁTICAMENTE:

| Formación | Color |
|-----------|-------|
| Barismo (todas) | 🔵 Azul claro |
| Gastronomía (todas) | 🟡 Amarillo |
| Food Manager | 🟢 Verde claro |
| Panadería | 🟡 Amarillo claro |
| Repostería | 🌸 Rosa |
| Sommelier | 🟣 Morado claro |
| Análisis de datos | 🔷 Cyan |
| SAC | 🌿 Verde lima |
| Ofimática | 🟣 Lila |
| Otra | ⚪ Gris |

---

## 🔧 FUNCIONES DISPONIBLES

### 📌 Principales:
- **`instalarSistemaCompletoV29()`** → Instalador automático (USA ESTE PRIMERO)
- **`moverANoTerminoFormacionManualV29()`** → Mover participantes marcados
- **`verParticipantesNoTerminaronV29()`** → Ver reporte de abandonos
- **`aplicarFormatoCompletoV29()`** → Limpiar colores

### 📌 Diagnóstico:
- **`diagnosticarSistemaActualV29()`** → Ver estado del sistema

---

## ⚠️ PREGUNTAS FRECUENTES

### ❓ ¿Se borrarán mis datos?
**NO**. El código SOLO agrega, NO borra nada.

### ❓ ¿Qué pasa con los colores de las columnas de etapas?
Se **limpiarán** (pondrán en blanco). Solo quedarán los colores por formación.

### ❓ ¿Los colores de las hojas de llamadas se mantienen?
**SÍ**. Llamada 1 (azul), Llamada 2 (morado), etc. se mantienen.

### ❓ ¿Puedo deshacer los cambios?
Sí, pero es más fácil simplemente **no ejecutar** el instalador si no estás seguro.

### ❓ ¿Afecta el procesamiento automático?
**NO**. Todo sigue funcionando igual.

### ❓ ¿Dónde quedó el checkbox "Procesar"?
Se movió **UNA columna a la derecha** (porque agregamos la columna Sí/No).

---

## 🛠️ SOLUCIÓN DE PROBLEMAS

### ❌ "Función no encontrada"
**Solución**: Copia TODO el código de `CODIGO_FINAL_COMPLETO.gs`

### ❌ "Permisos denegados"
**Solución**:
1. "Revisar permisos"
2. Selecciona tu cuenta
3. "Avanzado" → "Ir a..."
4. "Permitir"

### ❌ No veo los cambios
**Solución**: Recarga la página (F5 o Ctrl+R)

### ❌ Los colores no se limpiaron
**Solución**: Ejecuta: `aplicarFormatoCompletoV29()`

---

## 📝 CHECKLIST DE INSTALACIÓN

- [ ] Abrí `CODIGO_FINAL_COMPLETO.gs`
- [ ] Copié TODO el código
- [ ] Abrí Apps Script en mi Google Sheet
- [ ] Pegué AL FINAL del código actual
- [ ] Guardé (Ctrl+S)
- [ ] Ejecuté `instalarSistemaCompletoV29`
- [ ] Acepté los permisos
- [ ] Seguí los 6 pasos
- [ ] Recaré la página (F5)
- [ ] Veo la columna amarilla
- [ ] Los colores de etapas están limpios
- [ ] Los colores por formación funcionan
- [ ] Probé mover un participante

---

## 🎉 ¡LISTO!

Tu sistema ahora tiene:
- ✅ Hoja para participantes que no terminaron
- ✅ Columna Sí/No para marcarlos
- ✅ Colores limpios (solo por formación)
- ✅ Colores de hojas de llamadas intactos
- ✅ Funciones de movimiento automático

**¿TODO CLARO?** 🚀

Si tienes dudas, ejecuta: `diagnosticarSistemaActualV29()`
