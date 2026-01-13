# 🆕 GUÍA: INSTALACIÓN LIMPIA Y MIGRACIÓN DE DATOS

## ¿Por qué usar esta funcionalidad?

Usa la **INSTALACIÓN LIMPIA** cuando:
- ✅ Tu archivo actual se ve desordenado o mal organizado
- ✅ Quieres empezar desde cero con un diseño profesional
- ✅ Tienes problemas que no se resuelven fácilmente
- ✅ Quieres un sistema completamente nuevo pero conservando tus datos
- ✅ Necesitas separar datos antiguos de nuevos

---

## 🎯 PROCESO COMPLETO (2 PASOS SIMPLES)

### PASO 1: CREAR SISTEMA NUEVO LIMPIO

1. **Abre tu archivo actual** (el que tiene los datos)

2. **Menú** → `🎓 Sistema de Seguimiento`

3. **Click en** → `🆕 Instalación Limpia y Migración`

4. **Selecciona** → `✨ CREAR Sistema Nuevo Limpio`

5. **Confirma** la creación

6. **Espera 30-60 segundos** mientras el sistema crea:
   - ✅ Archivo Google Sheets nuevo
   - ✅ 8 hojas bien configuradas
   - ✅ Diseño profesional y limpio
   - ✅ Estructura v2.9 completa

7. **GUARDA LA URL** que aparece en el mensaje

---

### PASO 2: COPIAR CÓDIGO Y MIGRAR DATOS

#### 2.1 Copiar el Código

**En el archivo ACTUAL (el viejo):**

1. **Extensiones** → **Apps Script**
2. Abre el archivo `Codigo-Principal.gs`
3. **Selecciona TODO** el código (Ctrl+A)
4. **Copia** (Ctrl+C)

**En el archivo NUEVO (el limpio):**

5. **Abre la URL** del nuevo archivo (que guardaste)
6. **Extensiones** → **Apps Script**
7. Verás un archivo `Code.gs` vacío
8. **Pega** el código (Ctrl+V)
9. **Guarda** (Ctrl+S)
10. **Cierra** Apps Script
11. **Refresca** el archivo nuevo (F5)

Ya verás el menú `🎓 Sistema de Seguimiento` en el archivo nuevo.

---

#### 2.2 Importar los Datos

**En el archivo NUEVO:**

1. **Menú** → `🎓 Sistema de Seguimiento`

2. **Click en** → `🆕 Instalación Limpia y Migración`

3. **Selecciona** → `📥 IMPORTAR Datos Desde Archivo Anterior`

4. **Pega la URL del archivo ANTERIOR** (el que tiene tus datos)
   - Ejemplo: `https://docs.google.com/spreadsheets/d/ABC123...`

5. **Click OK** y **espera 30-60 segundos**

6. El sistema importará:
   - ✅ Todos los datos de todas las hojas
   - ✅ Sin duplicar encabezados
   - ✅ Aplicando colores automáticamente

---

## 🎉 ¡LISTO!

Ahora tienes:
- ✅ Sistema nuevo limpio y profesional
- ✅ Todos tus datos migrados
- ✅ Diseño organizado
- ✅ Funcionalidad v2.9 completa

---

## 📋 ¿QUÉ HOJAS SE CREAN?

El sistema nuevo incluye **8 hojas**:

1. **📋 Seguimiento General** - Hoja principal de seguimiento
2. **📞 Llamada 1** - Primera llamada de seguimiento
3. **📞 Llamada 2** - Segunda llamada
4. **📞 Llamada 3** - Tercera llamada
5. **📞 Llamada 4** - Cuarta llamada
6. **📞 Llamada 5** - Quinta llamada
7. **✅ Finalizados** - Participantes que completaron
8. **❌ No Terminó la Formación** - Participantes que no completaron

Todas con:
- ✅ 18 columnas estándar
- ✅ Encabezados con colores distintivos
- ✅ Anchos de columna optimizados
- ✅ Primera fila congelada
- ✅ Bordes profesionales

---

## 🎨 DISEÑO PROFESIONAL

### Colores de Encabezados:

- **Hojas de Seguimiento/Llamadas**: Azul (`#4A90E2`)
- **Finalizados**: Verde (`#28A745`)
- **No Terminó Formación**: Rojo (`#DC3545`)

### Colores por Formación (se aplican automáticamente):

- **Cuidado Infantil**: Azul claro
- **Desarrollo de Aplicaciones**: Morado claro
- **Comunicación Asertiva**: Amarillo
- **Atención al Cliente**: Naranja claro
- **Excel**: Verde claro

---

## ⚙️ DESPUÉS DE MIGRAR

### Recomendaciones:

1. ✅ **Activar procesamiento automático**
   - Menú → `⚡ ACTIVAR Procesamiento Automático`

2. ✅ **Verificar la importación**
   - Revisa cada hoja
   - Confirma que todos los datos están

3. ✅ **Aplicar colores** (si no se aplicaron automáticamente)
   - Menú → No Terminó Formación → `🎨 Aplicar Solo Colores Formación`

4. ✅ **Crear respaldo** (del archivo nuevo)
   - Menú → Mantenimiento → `💾 Crear Respaldo Completo v2.9`

5. ✅ **Archivar el archivo anterior**
   - Muévelo a una carpeta de respaldo
   - NO lo elimines, guárdalo por seguridad

---

## 🔄 COMPARACIÓN: Instalación Limpia vs Reinstalación

### 🆕 INSTALACIÓN LIMPIA
- ✅ Crea archivo NUEVO separado
- ✅ Archivo anterior NO se toca
- ✅ Diseño completamente profesional
- ✅ Empiezas desde cero (estructura)
- ✅ Importas datos manualmente
- ✅ Ideal para reorganizar todo

### 🔄 REINSTALACIÓN SEGURA
- ✅ Trabaja en el archivo ACTUAL
- ✅ Limpia y reconfigura en el mismo archivo
- ✅ Automática (todo en un paso)
- ✅ Mantiene historial del archivo
- ✅ Ideal para limpiar problemas

---

## 📋 ESTRUCTURA DE COLUMNAS (18 total)

1. **ID** - Identificador único
2. **Nombre** - Nombre completo
3. **Teléfono** - Número de contacto
4. **Formación** - Tipo de formación
5. **Aliados** - Etapa Aliados
6. **Plataformas** - Etapa Plataformas
7. **Conexión laboral** - Etapa Conexión laboral
8. **Por su cuenta** - Etapa Por su cuenta
9. **No busca trabajar** - Etapa No busca trabajar
10. **Empleado** - Etapa Empleado
11. **No terminó formación** - Sí/No dropdown
12. **Etapa Actual** - Etapa actual del participante
13. **Resultados** - Resultados de llamadas
14. **Documentos** - Documentos entregados
15. **Fecha** - Fecha de registro
16. **Notas** - Notas adicionales
17. **Total Llamadas** - Contador automático
18. **Procesar** - Checkbox para procesamiento

---

## ❓ PREGUNTAS FRECUENTES

### ¿Perderé mis datos?
**NO.** El archivo anterior NO se modifica. Tú copias los datos manualmente al nuevo archivo.

### ¿Puedo seguir usando el archivo anterior?
**SÍ.** El archivo anterior sigue existiendo. Puedes usarlo como respaldo.

### ¿Qué pasa si algo sale mal?
Tu archivo anterior está intacto. Simplemente crea otro archivo nuevo y vuelve a intentar.

### ¿Debo eliminar el archivo anterior?
**NO INMEDIATAMENTE.** Guárdalo por 1-2 semanas como respaldo antes de eliminarlo.

### ¿El código se copia automáticamente?
**NO.** Debes copiar el código manualmente (pasos 2.1). Esto es una limitación de Google.

### ¿Puedo importar solo algunas hojas?
La función importa todas las hojas principales. Si quieres selectivo, usa la importación manual.

---

## 💡 CONSEJOS ADICIONALES

### Para mejor organización:

1. **Renombra el archivo nuevo** con un nombre claro
   - Ejemplo: "Sistema Seguimiento IL 2025 - OFICIAL"

2. **Comparte con tu equipo** el nuevo archivo
   - Todos deben usar el nuevo

3. **Actualiza tus marcadores/favoritos**
   - Guarda la URL del nuevo archivo

4. **Documenta el cambio**
   - Anota la fecha de migración
   - Guarda URL del archivo anterior

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "No se puede acceder al archivo"
**Causa:** URL incorrecta o sin permisos.
**Solución:** Verifica la URL y que tengas acceso al archivo anterior.

### Error: "Hoja no encontrada"
**Causa:** El archivo anterior no tiene las hojas esperadas.
**Solución:** Verifica que el archivo anterior tenga las hojas con nombres correctos.

### Los datos no se importan
**Causa:** Hojas vacías en archivo anterior.
**Solución:** Normal si las hojas estaban vacías. Solo importa hojas con datos.

### No veo el menú en el archivo nuevo
**Causa:** No copiaste el código o no refrescaste.
**Solución:** Copia el código, guarda, y refresca (F5) el archivo.

---

## ✅ CHECKLIST COMPLETO

**Antes de empezar:**
- [ ] Tengo acceso al archivo actual con datos
- [ ] Tengo tiempo (5-10 minutos)
- [ ] Tengo donde guardar la URL nueva

**Durante el proceso:**
- [ ] Creé el sistema nuevo limpio
- [ ] Guardé la URL del archivo nuevo
- [ ] Copié el código al archivo nuevo
- [ ] Guardé el código (Ctrl+S)
- [ ] Refresqué el archivo nuevo (F5)
- [ ] Veo el menú en el archivo nuevo
- [ ] Importé los datos del archivo anterior
- [ ] Verifiqué que los datos se importaron

**Después de migrar:**
- [ ] Activé procesamiento automático
- [ ] Apliqué colores si es necesario
- [ ] Creé respaldo del archivo nuevo
- [ ] Archivé el archivo anterior (no eliminé)
- [ ] Actualicé mis marcadores/favoritos
- [ ] Compartí el nuevo archivo con mi equipo

---

## 🎯 RESULTADO FINAL

Tendrás un sistema:
- ✨ Completamente limpio y organizado
- ✨ Con diseño profesional
- ✨ Todos tus datos migrados
- ✨ Funcionalidad v2.9 completa
- ✨ Listo para trabajar inmediatamente

---

¡Disfruta tu nuevo sistema limpio y profesional! 🚀
