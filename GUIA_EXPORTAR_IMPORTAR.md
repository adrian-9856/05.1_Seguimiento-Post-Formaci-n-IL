# 📤📥 GUÍA: Exportar Datos a Archivo Nuevo

## 🎯 ¿Qué hace esta función?

Te permite **mover TODOS tus datos** (llamadas, participantes, finalizados, etc.) desde tu archivo original a un archivo nuevo limpio.

---

## 📋 PASOS COMPLETOS

### 🔴 PASO 1: En Tu Archivo ORIGINAL (el que tiene los datos)

#### 1.1 Ver Resumen de Tus Datos
```
1. Abre tu archivo original
2. Ve al menú: 🎓 Sistema de Seguimiento
3. Click en: 📥 Importación y Exportación
4. Click en: 📤 VER Resumen para Exportar
```

Esto te mostrará:
- ✅ Cuántos registros tienes en cada hoja
- ✅ Total de datos
- ✅ La URL de tu archivo (¡Cópiala!)

#### 1.2 Copiar URL del Archivo Original
```
1. Haz click en "Compartir" (botón azul, arriba derecha)
2. Click en "Copiar vínculo"
3. ¡Pega esa URL en un Notepad o documento!
```

**Ejemplo de URL:**
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit
```

---

### 🟢 PASO 2: Crear Tu Archivo NUEVO

#### 2.1 Crear Nuevo Google Sheet
```
1. Ve a: https://sheets.google.com
2. Click en: "+ Blank" (hoja en blanco)
3. Nombra tu archivo: "Seguimiento IL 2025 - NUEVO"
```

#### 2.2 Instalar el Código
```
1. En tu archivo nuevo, ve a: Extensiones > Apps Script
2. Borra el código que viene por defecto
3. Copia TODO el código de: Codigo-Principal.gs
4. Pégalo en el editor
5. Guarda (💾 o Ctrl+S)
6. Cierra la ventana de Apps Script
7. Refresca tu Google Sheet (F5)
```

#### 2.3 Instalar Sistema Automáticamente
```
1. Espera 3-5 segundos a que aparezca el menú
2. Ve al menú: 🎓 Sistema de Seguimiento
3. Click en: 🚀 INSTALAR TODO AUTOMÁTICO
4. ¡Espera 1-2 minutos!
5. Se crearán todas las hojas con diseños profesionales
```

---

### 🔵 PASO 3: Importar Tus Datos al Archivo Nuevo

#### 3.1 Importar Desde Archivo Original
```
1. En tu archivo NUEVO
2. Ve al menú: 🎓 Sistema de Seguimiento
3. Click en: 📥 Importación y Exportación
4. Click en: 📥 IMPORTAR desde Archivo Anterior
5. Pega la URL que copiaste en PASO 1.2
6. Click OK
7. ¡Espera 30-60 segundos!
```

#### 3.2 Verificar Importación
```
La ventana te mostrará:
✅ X hojas importadas
✅ X filas totales
```

#### 3.3 Verificar Visualmente
```
Revisa cada hoja:
- 📋 Seguimiento General
- 📞 Llamada 1, 2, 3, 4, 5
- ✅ Finalizados
- ❌ No Terminó la Formación

¿Ves todos tus datos? ¡Perfecto!
```

---

## ✅ QUÉ SE IMPORTA

La función importa **TODOS** los datos de estas hojas:

| Hoja | Qué Incluye |
|------|------------|
| 📋 Seguimiento General | Todos los participantes activos |
| 📞 Llamada 1-5 | Todas las llamadas registradas |
| ✅ Finalizados | Participantes que completaron |
| ❌ No Terminó | Participantes que no terminaron |

### Datos que se copian:
- ✅ Nombres completos
- ✅ Formaciones
- ✅ Fechas de todas las llamadas
- ✅ Notas y comentarios
- ✅ Etapas actuales
- ✅ Documentos faltantes
- ✅ Resultados
- ✅ ¡TODO!

---

## 🛡️ SEGURIDAD

### ⚠️ El Archivo Original NO Se Modifica

La importación es de **SOLO LECTURA**:
- ✅ Lee los datos del archivo original
- ✅ Los copia al archivo nuevo
- ✅ NO borra nada del original
- ✅ NO modifica nada del original

**Tu archivo original queda intacto.**

---

## 🔧 DESPUÉS DE IMPORTAR

### Pasos Recomendados:

#### 1. Activar Procesamiento Automático
```
Menú → ⚡ ACTIVAR Procesamiento Automático
```

#### 2. Aplicar Colores
```
Menú → 🛠️ Mantenimiento → 🎨 Aplicar Temas y Diseños
```

#### 3. Generar Reporte
```
Menú → 📊 Reportes y Análisis → 📊 GENERAR Reporte Profesional
```

---

## ❓ PREGUNTAS FRECUENTES

### ¿Puedo importar varias veces?
Sí, pero **agregará datos duplicados**. Solo importa una vez.

### ¿Se importan los colores?
No. Los colores se aplican automáticamente después con:
- `Aplicar Temas y Diseños`

### ¿Qué pasa si hay errores?
La función te dirá:
- ❌ Qué hojas no se encontraron
- ❌ Qué datos no se pudieron copiar
- ✅ Qué sí se importó correctamente

### ¿Puedo seguir usando el archivo original?
Sí, pero es mejor:
1. Usar el archivo NUEVO para trabajo diario
2. Mantener el original como respaldo

---

## 📊 EJEMPLO COMPLETO

### Archivo Original:
```
📋 Seguimiento General: 245 registros
📞 Llamada 1: 189 registros
📞 Llamada 2: 134 registros
📞 Llamada 3: 98 registros
📞 Llamada 4: 67 registros
📞 Llamada 5: 45 registros
✅ Finalizados: 123 registros
❌ No Terminó: 34 registros
━━━━━━━━━━━━━━━━━━━━
📈 TOTAL: 935 registros
```

### Después de Importar en Archivo Nuevo:
```
✅ 8 hojas importadas
✅ 935 filas totales
✅ Sistema listo para usar
```

---

## 🚨 ERRORES COMUNES

### Error: "No se puede acceder al archivo"

**Solución:**
1. Verifica que la URL sea correcta
2. Asegúrate de tener permisos de lectura
3. Si el archivo es de otra cuenta, pide acceso

### Error: "Hoja no encontrada"

**Solución:**
1. Verifica que las hojas tengan los nombres exactos:
   - `📋 Seguimiento General`
   - `📞 Llamada 1`
   - etc.
2. Si tienen otros nombres, cámbialos primero

### Importación muy lenta (>2 minutos)

**Normal si:**
- Tienes más de 500 registros
- Archivo tiene muchos datos

**Qué hacer:**
- ¡Ten paciencia! No cierres la ventana
- Puede tardar hasta 3-5 minutos con muchos datos

---

## 💡 CONSEJOS PRO

### 1. Haz una Copia de Seguridad Primero
```
Archivo Original → File → Make a copy
```

### 2. Limpia Antes de Exportar
```
En archivo original:
Menú → 🛠️ Mantenimiento → 🧹 LIMPIAR Y ORGANIZAR TODO
```

### 3. Verifica el Conteo
```
Antes: Menú → 📤 VER Resumen para Exportar
Después: Cuenta manualmente en archivo nuevo
¿Coinciden? ¡Perfecto!
```

---

## 🎯 RESUMEN RÁPIDO

```
ARCHIVO ORIGINAL:
1. Menú → Importación y Exportación → VER Resumen
2. Copiar URL del archivo

ARCHIVO NUEVO:
1. Crear Google Sheet nuevo
2. Copiar código en Apps Script
3. Menú → INSTALAR TODO AUTOMÁTICO
4. Menú → IMPORTAR desde Archivo Anterior
5. Pegar URL
6. ¡Esperar!

✅ ¡LISTO!
```

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Verifica que seguiste todos los pasos
2. Revisa que los nombres de las hojas sean correctos
3. Asegúrate de tener permisos en ambos archivos
4. Intenta de nuevo con una copia del archivo

---

**¡Tus datos están seguros y listos para usar en el archivo nuevo!** 🎉
