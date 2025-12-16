# 🚀 GUÍA RÁPIDA DE INSTALACIÓN v2.9
## ✨ Hoja "No Terminó la Formación" + Columna Sí/No

---

## 📋 PASOS PARA INSTALAR (5 minutos)

### ✅ PASO 1: ABRIR EL EDITOR DE CÓDIGO
1. Abre tu Google Sheet
2. Ve a: **Extensiones → Apps Script**
3. Se abrirá el editor de código

---

### ✅ PASO 2: COPIAR EL CÓDIGO NUEVO
1. Abre el archivo: **`CODIGO_COMPLETO_PARA_COPIAR.gs`**
2. **Selecciona TODO el código** (Ctrl+A)
3. **Copia** (Ctrl+C)
4. En Apps Script, ve **AL FINAL** de tu código actual
5. **Pega** el código copiado (Ctrl+V)
6. **Guarda** (Ctrl+S o ícono de diskette)

⚠️ **IMPORTANTE**: NO borres tu código actual, SOLO agrega al final

---

### ✅ PASO 3: EJECUTAR EL INSTALADOR
1. En Apps Script, busca la función: `instalarNuevasFuncionesSeguro`
2. Selecciónala en el menú desplegable de funciones (arriba)
3. Click en ▶️ **Ejecutar**
4. Si pide permisos:
   - Click en **"Revisar permisos"**
   - Selecciona tu cuenta
   - Click en **"Avanzado"** (abajo)
   - Click en **"Ir a [nombre del proyecto]"**
   - Click en **"Permitir"**

---

### ✅ PASO 4: SEGUIR EL ASISTENTE
El instalador te mostrará 5 pasos:

1. **🔍 PASO 1/5**: Verificando sistema (Click OK)
2. **📄 PASO 2/5**: Creando hoja "No Terminó la Formación" (Click OK)
3. **➕ PASO 3/5**: Agregando columna Sí/No (Click OK)
4. **⚙️ PASO 4/5**: Instalando funciones (Click OK)
5. **🎯 PASO 5/5**: Actualizando menú (Click OK)

Al final verás: **"🎉 INSTALACIÓN COMPLETADA"**

---

### ✅ PASO 5: RECARGAR LA PÁGINA
1. Cierra el editor de Apps Script
2. **Recarga** tu Google Sheet (F5 o Ctrl+R)
3. ¡Listo! Ya verás los cambios

---

## 🎯 QUÉ SE INSTALÓ

### ✅ 1. NUEVA HOJA
- **Nombre**: `❌ No Terminó la Formación`
- **Color**: Encabezados rojos
- **Ubicación**: Nueva pestaña al final

### ✅ 2. NUEVA COLUMNA
- **Nombre**: `No terminó formación (Sí/No)`
- **Color**: Amarillo
- **Ubicación**: Entre "Total Llamadas" y "Procesar"
- **Opciones**: Sí / No (desplegable)
- **Valor por defecto**: No

### ✅ 3. NUEVAS FUNCIONES
- `moverANoTerminoFormacionManual()` - Mover participantes marcados
- `verParticipantesNoTerminaron()` - Ver reporte de abandonos
- `procesarNoTerminoFormacion_NUEVO()` - Función automática

---

## 📖 CÓMO USAR EL SISTEMA

### 🎯 CASO DE USO 1: Marcar participante que NO terminó

1. Ve a la hoja: **`📋 Seguimiento General`**
2. Busca la columna amarilla: **`No terminó formación (Sí/No)`**
3. Para el participante que NO terminó, selecciona: **`Sí`**
4. El participante queda marcado

### 🎯 CASO DE USO 2: Mover participantes a "No Terminó"

**OPCIÓN A: Desde Apps Script**
1. Ve a: **Extensiones → Apps Script**
2. Selecciona función: `moverANoTerminoFormacionManual`
3. Click en ▶️ **Ejecutar**
4. Confirma el movimiento

**OPCIÓN B: Agregar al menú (recomendado)**
1. En Apps Script, busca la función `onOpen()`
2. ANTES de `.addToUi();` agrega:

```javascript
.addSeparator()
.addSubMenu(ui.createMenu('❌ No Terminó Formación')
  .addItem('🔄 Mover Participantes Marcados', 'moverANoTerminoFormacionManual')
  .addItem('📊 Ver Participantes', 'verParticipantesNoTerminaron'))
```

3. Guarda y recarga
4. Verás nuevo menú: **`❌ No Terminó Formación`**

### 🎯 CASO DE USO 3: Ver reporte de abandonos

**OPCIÓN A: Desde Apps Script**
1. Ejecuta: `verParticipantesNoTerminaron`
2. Verás reporte con todos los participantes

**OPCIÓN B: Ver la hoja directamente**
1. Click en pestaña: **`❌ No Terminó la Formación`**
2. Verás todos los abandonos con fondo rojo

---

## ⚠️ PREGUNTAS FRECUENTES

### ❓ ¿Se borraron mis datos?
**NO**. El instalador SOLO agrega, NO borra nada.

### ❓ ¿Dónde quedó el checkbox "Procesar"?
Se movió **UNA columna a la derecha**. Sigue funcionando igual.

### ❓ ¿Funciona el procesamiento automático?
**SÍ**. Todo sigue funcionando normalmente.

### ❓ ¿Qué pasa si marco "Sí" por error?
Puedes cambiar de nuevo a "No" ANTES de moverlo.

### ❓ ¿Puedo recuperar un participante movido?
Sí, copia la fila desde "No Terminó la Formación" y pégala en "Seguimiento General".

### ❓ ¿Cómo sé si se instaló correctamente?
Verifica:
- ✅ Nueva pestaña "❌ No Terminó la Formación" (roja)
- ✅ Nueva columna amarilla "No terminó formación (Sí/No)"
- ✅ Columna con opciones Sí/No en desplegable

---

## 🛠️ SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Función no encontrada"
**Solución**: Asegúrate de copiar TODO el código al final

### ❌ Error: "Permisos denegados"
**Solución**: Ejecuta de nuevo y acepta los permisos

### ❌ No veo la columna amarilla
**Solución**:
1. Recarga la página (F5)
2. Verifica que el instalador terminó exitosamente
3. Ejecuta de nuevo el instalador

### ❌ La hoja no se creó
**Solución**: Ejecuta manualmente:
```
crearHojaNoTerminoFormacionSegura()
```

---

## 📊 EJEMPLO VISUAL

### ANTES:
```
| ID | Nombre | ... | Total Llamadas | Procesar |
```

### DESPUÉS:
```
| ID | Nombre | ... | Total Llamadas | No terminó (Sí/No) 🟨 | Procesar |
```

---

## 🎉 ¡LISTO!

Ahora tu sistema tiene:
- ✅ Hoja para participantes que NO terminaron
- ✅ Columna Sí/No para marcarlos fácilmente
- ✅ Funciones para moverlos automáticamente
- ✅ Reportes de abandonos
- ✅ **SIN PERDER NINGÚN DATO**

---

## 📞 SOPORTE

Si tienes problemas:
1. Verifica que copiaste TODO el código
2. Revisa que el instalador terminó exitosamente
3. Recarga la página
4. Si persiste, ejecuta: `diagnosticarSistemaActual()`

---

**Versión**: 2.9
**Fecha**: Diciembre 2024
**Compatibilidad**: Google Sheets + Apps Script
