// ====================================
// 🔒 CÓDIGO SEGURO - SOLO AGREGAR AL FINAL DE TU CÓDIGO ACTUAL
// ⚠️ NO BORRES NADA DE TU CÓDIGO EXISTENTE
// ⚠️ SOLO COPIA Y PEGA ESTO AL FINAL
// ====================================

// ✨ PASO 1: ACTUALIZAR CONSTANTE DE COLUMNAS
// Cambia esta línea en tu código actual:
// const TOTAL_COLUMNAS = 18;
// Por esta:
// const TOTAL_COLUMNAS = 19;

// Y agrega esta línea después de "PROCESAR: 18":
// NO_TERMINO_SINO: 18, // ✨ NUEVA COLUMNA
// PROCESAR: 19

// ====================================
// ✨ NUEVA FUNCIÓN 1: CREAR HOJA "NO TERMINÓ LA FORMACIÓN"
// ====================================
function crearHojaNoTerminoFormacion() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Verificar si ya existe
  if (ss.getSheetByName('❌ No Terminó la Formación')) {
    ui.alert('ℹ️ Hoja ya existe',
      'La hoja "❌ No Terminó la Formación" ya está creada.',
      ui.ButtonSet.OK);
    return;
  }

  try {
    // Crear nueva hoja
    const hojaNoTermino = ss.insertSheet('❌ No Terminó la Formación');

    // Configurar encabezados
    const encabezados = [
      'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
      'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
      'No busca trabajar', 'Empleado', 'No terminó la formación',
      'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
      'Fecha Original', 'Motivo/Notas', 'Total Llamadas', 'Fecha Abandono'
    ];

    hojaNoTermino.getRange(1, 1, 1, 18).setValues([encabezados]);

    // Aplicar formato de encabezados (rojo)
    const rangoEncabezado = hojaNoTermino.getRange(1, 1, 1, 18);
    rangoEncabezado.setBackground('#C62828'); // Rojo oscuro
    rangoEncabezado.setFontColor('#FFFFFF');
    rangoEncabezado.setFontWeight('bold');
    rangoEncabezado.setFontSize(11);
    rangoEncabezado.setHorizontalAlignment('center');

    // Ajustar anchos de columnas
    hojaNoTermino.setColumnWidth(1, 100);   // ID
    hojaNoTermino.setColumnWidth(2, 180);   // Nombre
    hojaNoTermino.setColumnWidth(3, 120);   // Teléfono
    hojaNoTermino.setColumnWidth(4, 140);   // Formación
    for (let i = 5; i <= 11; i++) {
      hojaNoTermino.setColumnWidth(i, 150); // Columnas de etapas
    }
    hojaNoTermino.setColumnWidth(12, 120);  // Etapa Actual
    hojaNoTermino.setColumnWidth(13, 140);  // Resultados
    hojaNoTermino.setColumnWidth(14, 150);  // Documentos
    hojaNoTermino.setColumnWidth(15, 140);  // Fecha Original
    hojaNoTermino.setColumnWidth(16, 250);  // Motivo/Notas
    hojaNoTermino.setColumnWidth(17, 100);  // Total Llamadas
    hojaNoTermino.setColumnWidth(18, 140);  // Fecha Abandono

    hojaNoTermino.setFrozenRows(1);

    ui.alert('✅ Hoja Creada',
      '✅ Hoja "❌ No Terminó la Formación" creada exitosamente!\n\n' +
      'Ahora ejecuta: "Agregar Columna Sí/No"',
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error',
      `Error creando hoja: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

// ====================================
// ✨ NUEVA FUNCIÓN 2: AGREGAR COLUMNA "SÍ/NO"
// ====================================
function agregarColumnaSiNo() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const confirmacion = ui.alert(
    '➕ Agregar Columna "No terminó formación (Sí/No)"',
    '⚠️ Esta función agregará UNA columna nueva:\n\n' +
    '📍 Ubicación: Entre "Total Llamadas" y "Procesar"\n' +
    '📋 Nombre: "No terminó formación (Sí/No)"\n' +
    '✅ Opciones: Sí / No\n\n' +
    '⚠️ IMPORTANTE: Esta columna desplazará el checkbox\n' +
    'una columna a la derecha.\n\n' +
    '✅ NO borrará ningún dato\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    const hojasAProcesar = [
      '📋 Seguimiento General',
      '📞 Llamada 1',
      '📞 Llamada 2',
      '📞 Llamada 3',
      '📞 Llamada 4',
      '📞 Llamada 5',
      '✅ Finalizados'
    ];

    let hojasActualizadas = 0;
    const resultados = [];

    hojasAProcesar.forEach(nombreHoja => {
      const hoja = ss.getSheetByName(nombreHoja);
      if (!hoja) {
        resultados.push(`❌ ${nombreHoja}: No encontrada`);
        return;
      }

      const ultimaColumna = hoja.getLastColumn();
      const encabezados = hoja.getRange(1, 1, 1, ultimaColumna).getValues()[0];

      // Verificar si ya tiene la columna
      const yaExiste = encabezados.some(h =>
        h && h.toString().toLowerCase().includes('no terminó formación') &&
        h.toString().toLowerCase().includes('sí')
      );

      if (yaExiste) {
        resultados.push(`ℹ️ ${nombreHoja}: Ya tiene la columna`);
        return;
      }

      // Buscar columna "Total Llamadas"
      let columnaLlamadas = -1;
      for (let i = 0; i < encabezados.length; i++) {
        if (encabezados[i] && encabezados[i].toString().toLowerCase().includes('total llamadas')) {
          columnaLlamadas = i + 1;
          break;
        }
      }

      if (columnaLlamadas === -1) {
        resultados.push(`❌ ${nombreHoja}: No se encontró columna "Total Llamadas"`);
        return;
      }

      // Insertar columna DESPUÉS de "Total Llamadas"
      hoja.insertColumnAfter(columnaLlamadas);
      const nuevaColumna = columnaLlamadas + 1;

      // SOLO en hoja principal: agregar validación Sí/No
      if (nombreHoja === '📋 Seguimiento General') {
        hoja.getRange(1, nuevaColumna).setValue('No terminó formación (Sí/No)');

        // Aplicar color amarillo
        hoja.getRange(1, nuevaColumna)
          .setBackground('#FFF9C4')
          .setFontWeight('bold')
          .setHorizontalAlignment('center');

        // Configurar validación Sí/No
        const ultimaFila = hoja.getLastRow();
        if (ultimaFila > 1) {
          const rangoSiNo = hoja.getRange(2, nuevaColumna, ultimaFila - 1, 1);
          const validacionSiNo = SpreadsheetApp.newDataValidation()
            .requireValueInList(['No', 'Sí'])
            .setAllowInvalid(false)
            .setHelpText('⚠️ Selecciona Sí si el participante NO terminó la formación')
            .build();
          rangoSiNo.setDataValidation(validacionSiNo);
          rangoSiNo.setValue('No'); // Valor por defecto
          rangoSiNo.setBackground('#FFFDE7'); // Amarillo claro
        }

        hoja.setColumnWidth(nuevaColumna, 150);

      } else {
        // En otras hojas: solo texto simple
        hoja.getRange(1, nuevaColumna).setValue('No terminó formación');
        hoja.getRange(1, nuevaColumna)
          .setBackground('#FFF9C4')
          .setFontWeight('bold')
          .setHorizontalAlignment('center');

        const ultimaFila = hoja.getLastRow();
        if (ultimaFila > 1) {
          hoja.getRange(2, nuevaColumna, ultimaFila - 1, 1).setBackground('#FFFDE7');
        }

        hoja.setColumnWidth(nuevaColumna, 140);
      }

      hojasActualizadas++;
      resultados.push(`✅ ${nombreHoja}: Columna agregada`);
    });

    const mensaje = `✅ COLUMNA AGREGADA EXITOSAMENTE\n\n` +
      `📊 Hojas actualizadas: ${hojasActualizadas}/${hojasAProcesar.length}\n\n` +
      `⚠️ IMPORTANTE:\n` +
      `• La columna "Procesar" (checkbox) se movió UNA posición a la derecha\n` +
      `• Todos los datos se conservaron\n` +
      `• El sistema sigue funcionando normalmente\n\n` +
      `🔄 SIGUIENTE PASO:\n` +
      `Ejecuta: "Actualizar Función onEdit"\n\n` +
      `📋 DETALLES:\n${resultados.join('\n')}`;

    ui.alert('✅ Columna Agregada', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error',
      `Error agregando columna: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

// ====================================
// ✨ NUEVA FUNCIÓN 3: PROCESAR "NO TERMINÓ LA FORMACIÓN"
// ====================================
function procesarNoTerminoFormacion_NUEVO(hojaGeneral, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');

    if (!hojaNoTermino) {
      throw new Error('Hoja "❌ No Terminó la Formación" no existe. Créala primero.');
    }

    // Leer TODAS las columnas de la fila
    const ultimaColumna = hojaGeneral.getLastColumn();
    const rangoDatos = hojaGeneral.getRange(fila, 1, 1, ultimaColumna);
    const datos = rangoDatos.getValues()[0];

    // Buscar índice de columnas dinámicamente
    const encabezados = hojaGeneral.getRange(1, 1, 1, ultimaColumna).getValues()[0];

    const indices = {
      id: encabezados.indexOf('Creamos ID'),
      nombre: encabezados.indexOf('Nombre Completo'),
      telefono: encabezados.indexOf('Teléfono'),
      formacion: encabezados.indexOf('Formación'),
      aliados: encabezados.indexOf('Aliados'),
      plataformas: encabezados.indexOf('Plataformas'),
      conexionLaboral: encabezados.indexOf('Conexión laboral'),
      porSuCuenta: encabezados.indexOf('Por su cuenta'),
      noBuscaTrabajo: encabezados.indexOf('No busca trabajar'),
      empleado: encabezados.indexOf('Empleado'),
      noTerminoFormacion: encabezados.indexOf('No terminó la formación'),
      etapaActual: encabezados.indexOf('Etapa Actual'),
      resultados: encabezados.indexOf('Resultados Obtenidos'),
      documentos: encabezados.indexOf('Documentos Faltantes'),
      fecha: encabezados.indexOf('Fecha Original'),
      notas: encabezados.indexOf('Notas/Última Llamada'),
      totalLlamadas: -1
    };

    // Buscar "Total Llamadas" con variaciones
    for (let i = 0; i < encabezados.length; i++) {
      if (encabezados[i] && encabezados[i].toString().toLowerCase().includes('total llamadas')) {
        indices.totalLlamadas = i;
        break;
      }
    }

    const nombreCompleto = indices.nombre >= 0 ? datos[indices.nombre] : '';
    if (!nombreCompleto || nombreCompleto.toString().trim() === '') {
      throw new Error('Nombre vacío o inválido');
    }

    const fechaActual = new Date();
    const motivoNotas = `${indices.notas >= 0 ? datos[indices.notas] : ''} | NO COMPLETÓ LA FORMACIÓN - ${Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')}`.trim();

    // Preparar datos para insertar (18 columnas)
    const datosDestino = [
      indices.id >= 0 ? datos[indices.id] : '',
      nombreCompleto,
      indices.telefono >= 0 ? datos[indices.telefono] : '',
      indices.formacion >= 0 ? datos[indices.formacion] : 'Barismo',
      indices.aliados >= 0 ? datos[indices.aliados] : '',
      indices.plataformas >= 0 ? datos[indices.plataformas] : '',
      indices.conexionLaboral >= 0 ? datos[indices.conexionLaboral] : '',
      indices.porSuCuenta >= 0 ? datos[indices.porSuCuenta] : '',
      indices.noBuscaTrabajo >= 0 ? datos[indices.noBuscaTrabajo] : '',
      indices.empleado >= 0 ? datos[indices.empleado] : '',
      indices.noTerminoFormacion >= 0 ? datos[indices.noTerminoFormacion] : '',
      'No terminó formación',
      indices.resultados >= 0 ? datos[indices.resultados] : '',
      indices.documentos >= 0 ? datos[indices.documentos] : 'Ninguno',
      indices.fecha >= 0 ? datos[indices.fecha] : '',
      motivoNotas,
      indices.totalLlamadas >= 0 ? datos[indices.totalLlamadas] : 0,
      Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')
    ];

    // Insertar en hoja "No Terminó la Formación"
    hojaNoTermino.insertRows(2, 1);
    const rangoDestino = hojaNoTermino.getRange(2, 1, 1, 18);
    rangoDestino.setValues([datosDestino]);

    // Aplicar formato
    rangoDestino.setBackground('#FFCDD2'); // Rojo claro
    rangoDestino.setBorder(true, true, true, true, true, true, '#C62828', SpreadsheetApp.BorderStyle.SOLID);

    // Eliminar de la hoja principal
    hojaGeneral.deleteRow(fila);

    const mensaje = `❌ ${nombreCompleto} movido a "No Terminó la Formación"`;
    SpreadsheetApp.getActiveSpreadsheet().toast(mensaje, 'Movimiento Exitoso', 4);

    console.log(`✅ ${nombreCompleto} procesado como "No terminó formación"`);
    return { exito: true, error: null, movido: true };

  } catch (error) {
    console.error('❌ Error en procesarNoTerminoFormacion_NUEVO:', error);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      `Error: ${error.message}`,
      'Error de Procesamiento',
      6
    );

    return { exito: false, error: error.message, movido: false };
  }
}

// ====================================
// ✨ NUEVA FUNCIÓN 4: MOVER MANUALMENTE A "NO TERMINÓ"
// ====================================
function moverANoTerminoFormacionManual() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGeneral) {
    ui.alert('❌ Error', 'Hoja "Seguimiento General" no encontrada', ui.ButtonSet.OK);
    return;
  }

  if (!ss.getSheetByName('❌ No Terminó la Formación')) {
    ui.alert('❌ Error',
      'Primero ejecuta: "Crear Hoja No Terminó Formación"',
      ui.ButtonSet.OK);
    return;
  }

  const ultimaFila = hojaGeneral.getLastRow();
  if (ultimaFila <= 1) {
    ui.alert('ℹ️ Sin datos', 'No hay participantes', ui.ButtonSet.OK);
    return;
  }

  // Buscar columna "No terminó formación (Sí/No)"
  const ultimaColumna = hojaGeneral.getLastColumn();
  const encabezados = hojaGeneral.getRange(1, 1, 1, ultimaColumna).getValues()[0];

  let columnaSiNo = -1;
  for (let i = 0; i < encabezados.length; i++) {
    const encabezado = encabezados[i].toString().toLowerCase();
    if (encabezado.includes('no terminó') && encabezado.includes('sí')) {
      columnaSiNo = i + 1;
      break;
    }
  }

  if (columnaSiNo === -1) {
    ui.alert('❌ Error',
      'No se encontró la columna "No terminó formación (Sí/No)".\n\n' +
      'Primero ejecuta: "Agregar Columna Sí/No"',
      ui.ButtonSet.OK);
    return;
  }

  // Buscar participantes con "Sí"
  const participantesNoTerminaron = [];
  const columnaNo mbre = encabezados.indexOf('Nombre Completo') + 1;

  for (let fila = 2; fila <= ultimaFila; fila++) {
    const noTermino = hojaGeneral.getRange(fila, columnaSiNo).getValue();
    const nombre = hojaGeneral.getRange(fila, columnaNombre).getValue();

    if (noTermino && noTermino.toString().trim().toLowerCase() === 'sí' && nombre) {
      participantesNoTerminaron.push({
        fila: fila,
        nombre: nombre.toString().trim()
      });
    }
  }

  if (participantesNoTerminaron.length === 0) {
    ui.alert('ℹ️ Sin participantes',
      'No hay participantes marcados con "Sí"',
      ui.ButtonSet.OK);
    return;
  }

  const confirmacion = ui.alert(
    '❌ Mover a "No Terminó la Formación"',
    `Se encontraron ${participantesNoTerminaron.length} participantes.\n\n` +
    `¿Moverlos a "No Terminó la Formación"?`,
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  let procesados = 0;
  let errores = 0;

  // Procesar de abajo hacia arriba
  for (let i = participantesNoTerminaron.length - 1; i >= 0; i--) {
    const participante = participantesNoTerminaron[i];

    try {
      const resultado = procesarNoTerminoFormacion_NUEVO(hojaGeneral, participante.fila);

      if (resultado && resultado.exito) {
        procesados++;
      } else {
        errores++;
      }

      // Ajustar índices
      for (let j = 0; j < i; j++) {
        if (participantesNoTerminaron[j].fila > participante.fila) {
          participantesNoTerminaron[j].fila--;
        }
      }

    } catch (error) {
      errores++;
      console.error(`Error procesando ${participante.nombre}:`, error);
    }
  }

  let mensaje = `❌ MOVIMIENTO COMPLETADO\n\n`;
  if (procesados > 0) mensaje += `✅ ${procesados} participantes movidos\n`;
  if (errores > 0) mensaje += `❌ ${errores} errores\n`;

  ui.alert('✅ Resultado', mensaje, ui.ButtonSet.OK);
}

// ====================================
// ✨ NUEVA FUNCIÓN 5: VER PARTICIPANTES QUE NO TERMINARON
// ====================================
function verParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');

  if (!hojaNoTermino) {
    ui.alert('❌ Hoja no encontrada',
      'Primero ejecuta: "Crear Hoja No Terminó Formación"',
      ui.ButtonSet.OK);
    return;
  }

  const ultimaFila = hojaNoTermino.getLastRow();
  if (ultimaFila <= 1) {
    ui.alert('✅ Sin registros',
      'No hay participantes que no hayan terminado.\n\n¡Excelente!',
      ui.ButtonSet.OK);
    return;
  }

  const totalNoTerminaron = ultimaFila - 1;
  const participantes = [];

  for (let fila = 2; fila <= Math.min(ultimaFila, 11); fila++) {
    const nombre = hojaNoTermino.getRange(fila, 2).getValue();
    const formacion = hojaNoTermino.getRange(fila, 4).getValue();
    const fechaAbandono = hojaNoTermino.getRange(fila, 18).getValue();
    const llamadas = hojaNoTermino.getRange(fila, 17).getValue() || 0;

    participantes.push({
      nombre: nombre,
      formacion: formacion,
      fechaAbandono: fechaAbandono,
      llamadas: llamadas
    });
  }

  const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');

  let reporte = `❌ PARTICIPANTES QUE NO TERMINARON\n`;
  reporte += `⏰ ${fecha}\n\n`;
  reporte += `📊 Total: ${totalNoTerminaron} participantes\n\n`;

  if (participantes.length > 0) {
    reporte += `👥 ÚLTIMOS REGISTROS:\n`;
    participantes.forEach((p, index) => {
      const fechaFormateada = p.fechaAbandono ?
        Utilities.formatDate(new Date(p.fechaAbandono), Session.getScriptTimeZone(), 'dd/MM/yyyy') :
        'Sin fecha';
      reporte += `${index + 1}. ${p.nombre}\n`;
      reporte += `   📚 ${p.formacion} | 📞 ${p.llamadas} llamadas | 📅 ${fechaFormateada}\n\n`;
    });

    if (totalNoTerminaron > 10) {
      reporte += `... y ${totalNoTerminaron - 10} participantes más\n`;
    }
  }

  ui.alert('❌ Reporte: No Terminaron', reporte, ui.ButtonSet.OK);
}

// ====================================
// ✨ NUEVA FUNCIÓN 6: ACTUALIZAR MENÚ
// ====================================
function actualizarMenuConNuevasFunciones() {
  const ui = SpreadsheetApp.getUi();

  const mensaje = `✅ CÓMO ACTUALIZAR EL MENÚ\n\n` +
    `Para agregar las nuevas funciones al menú:\n\n` +
    `1️⃣ Busca la función "onOpen()" en tu código\n\n` +
    `2️⃣ ANTES de ".addToUi();" agrega esto:\n\n` +
    `.addSeparator()\n` +
    `.addSubMenu(ui.createMenu('❌ No Terminó Formación')\n` +
    `  .addItem('➕ Crear Hoja', 'crearHojaNoTerminoFormacion')\n` +
    `  .addItem('➕ Agregar Columna Sí/No', 'agregarColumnaSiNo')\n` +
    `  .addItem('🔄 Mover Participantes Marcados', 'moverANoTerminoFormacionManual')\n` +
    `  .addItem('📊 Ver Participantes', 'verParticipantesNoTerminaron'))\n\n` +
    `3️⃣ Guarda el código\n\n` +
    `4️⃣ Recarga la hoja de Google Sheets\n\n` +
    `✅ Aparecerá el nuevo menú!`;

  ui.alert('📋 Actualizar Menú', mensaje, ui.ButtonSet.OK);
}

// ====================================
// 🎯 INSTRUCCIONES DE USO
// ====================================
function mostrarInstruccionesNuevasFunciones() {
  const ui = SpreadsheetApp.getUi();

  const instrucciones = `🎯 INSTRUCCIONES PASO A PASO\n` +
    `═══════════════════════════════════\n\n` +
    `✅ PASO 1: CREAR HOJA\n` +
    `🎯 Sistema → ❌ No Terminó Formación → ➕ Crear Hoja\n` +
    `• Crea la hoja con formato rojo\n` +
    `• 18 columnas automáticas\n\n` +
    `✅ PASO 2: AGREGAR COLUMNA SÍ/NO\n` +
    `🎯 Sistema → ❌ No Terminó Formación → ➕ Agregar Columna Sí/No\n` +
    `• Agrega columna entre "Total Llamadas" y "Procesar"\n` +
    `• Con opciones: Sí / No\n` +
    `• Valor por defecto: No\n\n` +
    `✅ PASO 3: USAR EL SISTEMA\n` +
    `📋 En hoja "Seguimiento General":\n` +
    `• Selecciona "Sí" si el participante NO terminó\n` +
    `• Usa "Mover Participantes Marcados" para moverlos\n\n` +
    `✅ PASO 4: VER REPORTES\n` +
    `🎯 Sistema → ❌ No Terminó Formación → 📊 Ver Participantes\n\n` +
    `⚠️ IMPORTANTE:\n` +
    `• NO borres ningún código existente\n` +
    `• SOLO agrega estas funciones al final\n` +
    `• Los datos existentes NO se afectan\n` +
    `• El sistema actual sigue funcionando\n\n` +
    `💡 La columna "Procesar" (checkbox) se mueve\n` +
    `   UNA posición a la derecha automáticamente`;

  ui.alert('📋 Instrucciones', instrucciones, ui.ButtonSet.OK);
}
