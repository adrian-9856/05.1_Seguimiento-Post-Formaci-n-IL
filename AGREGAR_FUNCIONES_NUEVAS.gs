// ═══════════════════════════════════════════════════════════════
// 🚀 FUNCIONES NUEVAS PARA AGREGAR - v2.9
// ═══════════════════════════════════════════════════════════════
//
// ⚠️ INSTRUCCIONES:
// 1. Copia TODO este código
// 2. Pégalo AL FINAL de tu código actual en Apps Script
// 3. Guarda (Ctrl+S)
// 4. Recarga tu Google Sheet (F5)
// 5. Ejecuta: agregarFuncionesNuevasV29()
// 6. ¡Listo!
//
// ✨ QUÉ AGREGA:
// • Hoja "❌ No Terminó la Formación"
// • Columna "No terminó formación (Sí/No)"
// • Limpia colores de columnas de etapas
// • Mantiene solo colores por formación
// • Funciones para mover participantes
//
// 🔒 GARANTÍA: NO borra ningún dato
//
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 1: INSTALAR TODO (EJECUTA ESTA PRIMERO)
// ═══════════════════════════════════════════════
function agregarFuncionesNuevasV29() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🚀 Agregar Funciones Nuevas v2.9',
    '✅ Se agregará:\n\n' +
    '1. Hoja "❌ No Terminó la Formación"\n' +
    '2. Columna "No terminó formación (Sí/No)"\n' +
    '3. Limpiar colores de columnas de etapas\n' +
    '4. Funciones de movimiento\n\n' +
    '⚠️ NO borra datos\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let pasos = [];

    // PASO 1: Crear hoja
    if (!ss.getSheetByName('❌ No Terminó la Formación')) {
      crearHojaNoTerminoLimpia();
      pasos.push('✅ Hoja "No Terminó la Formación" creada');
    } else {
      pasos.push('ℹ️ Hoja ya existe');
    }

    // PASO 2: Agregar columna Sí/No
    const resultado = agregarColumnaSiNoSoloNueva();
    if (resultado.hojasActualizadas > 0) {
      pasos.push(`✅ Columna Sí/No agregada en ${resultado.hojasActualizadas} hojas`);
    } else {
      pasos.push('ℹ️ Columna ya existe');
    }

    // PASO 3: Limpiar colores
    limpiarColoresEtapas();
    pasos.push('✅ Colores de columnas limpiados');

    // PASO 4: Aplicar colores por formación
    aplicarSoloColoresFormacion();
    pasos.push('✅ Colores por formación aplicados');

    // RESUMEN
    let mensaje = '🎉 INSTALACIÓN COMPLETADA\n\n';
    pasos.forEach(p => mensaje += `${p}\n`);
    mensaje += '\n🚀 PRÓXIMOS PASOS:\n';
    mensaje += '1. Recarga la página (F5)\n';
    mensaje += '2. Marca participantes con "Sí"\n';
    mensaje += '3. Ejecuta: moverParticipantesNoTerminaron()\n\n';
    mensaje += '✅ Todo listo!';

    ui.alert('✅ Éxito', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 2: CREAR HOJA "NO TERMINÓ"
// ═══════════════════════════════════════════════
function crearHojaNoTerminoLimpia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.insertSheet('❌ No Terminó la Formación');

  const encabezados = [
    'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
    'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó la formación',
    'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
    'Fecha Original', 'Motivo/Notas', 'Total Llamadas', 'Fecha Abandono'
  ];

  hoja.getRange(1, 1, 1, 18).setValues([encabezados]);

  // Formato encabezados (rojo)
  const rangoEnc = hoja.getRange(1, 1, 1, 18);
  rangoEnc.setBackground('#C62828');
  rangoEnc.setFontColor('#FFFFFF');
  rangoEnc.setFontWeight('bold');
  rangoEnc.setFontSize(11);
  rangoEnc.setHorizontalAlignment('center');

  // Anchos
  hoja.setColumnWidth(1, 100);
  hoja.setColumnWidth(2, 180);
  hoja.setColumnWidth(3, 120);
  hoja.setColumnWidth(4, 140);
  for (let i = 5; i <= 11; i++) hoja.setColumnWidth(i, 150);
  hoja.setColumnWidth(12, 120);
  hoja.setColumnWidth(13, 140);
  hoja.setColumnWidth(14, 150);
  hoja.setColumnWidth(15, 140);
  hoja.setColumnWidth(16, 250);
  hoja.setColumnWidth(17, 100);
  hoja.setColumnWidth(18, 140);

  hoja.setFrozenRows(1);
}

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 3: AGREGAR COLUMNA "SÍ/NO" EN COLUMNA K
// ═══════════════════════════════════════════════
function agregarColumnaSiNoSoloNueva() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  const COLUMNA_K = 11; // Posición K
  let hojasActualizadas = 0;

  hojas.forEach(nombre => {
    const hoja = ss.getSheetByName(nombre);
    if (!hoja) return;

    const cols = hoja.getLastColumn();
    const encs = hoja.getRange(1, 1, 1, cols).getValues()[0];

    // Verificar si ya existe en columna K
    if (cols >= COLUMNA_K) {
      const valorK = hoja.getRange(1, COLUMNA_K).getValue();
      if (valorK && valorK.toString().toLowerCase().includes('no terminó') && valorK.toString().toLowerCase().includes('sí')) {
        return; // Ya existe
      }
    }

    // Insertar columna en posición K (después de la columna J)
    if (cols < COLUMNA_K) {
      // Si hay menos columnas, agregar hasta llegar a K
      while (hoja.getLastColumn() < COLUMNA_K) {
        hoja.insertColumnAfter(hoja.getLastColumn());
      }
    } else {
      // Si ya hay columna K o más, insertar antes de K
      hoja.insertColumnBefore(COLUMNA_K);
    }

    const nuevaCol = COLUMNA_K;

    if (nombre === '📋 Seguimiento General') {
      hoja.getRange(1, nuevaCol).setValue('No terminó formación (Sí/No)');
      hoja.getRange(1, nuevaCol).setBackground('#FFF9C4').setFontWeight('bold').setHorizontalAlignment('center');

      const ultFila = hoja.getLastRow();
      if (ultFila > 1) {
        const rango = hoja.getRange(2, nuevaCol, ultFila - 1, 1);
        const validacion = SpreadsheetApp.newDataValidation()
          .requireValueInList(['No', 'Sí'])
          .setAllowInvalid(false)
          .setHelpText('Selecciona Sí si NO terminó')
          .build();
        rango.setDataValidation(validacion);
        rango.setValue('No');
      }

      hoja.setColumnWidth(nuevaCol, 150);
    } else {
      hoja.getRange(1, nuevaCol).setValue('No terminó formación');
      hoja.getRange(1, nuevaCol).setBackground('#FFF9C4').setFontWeight('bold').setHorizontalAlignment('center');
      hoja.setColumnWidth(nuevaCol, 140);
    }

    hojasActualizadas++;
  });

  return { hojasActualizadas: hojasActualizadas };
}

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 4: LIMPIAR COLORES DE COLUMNAS
// ═══════════════════════════════════════════════
function limpiarColoresEtapas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  const columnasEtapas = [
    'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó la formación'
  ];

  hojas.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const cols = hoja.getLastColumn();
    const encs = hoja.getRange(1, 1, 1, cols).getValues()[0];

    columnasEtapas.forEach(nombreCol => {
      const idx = encs.indexOf(nombreCol);
      if (idx !== -1) {
        const col = idx + 1;
        const ultFila = hoja.getLastRow();

        // Limpiar datos (blanco)
        if (ultFila > 1) {
          hoja.getRange(2, col, ultFila - 1, 1).setBackground('#FFFFFF');
        }

        // Encabezado
        const enc = hoja.getRange(1, col);
        if (nombreHoja === '📋 Seguimiento General') {
          enc.setBackground('#1f4e79').setFontColor('#ffffff');
        }
        enc.setFontWeight('bold').setHorizontalAlignment('center');
      }
    });
  });
}

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 5: APLICAR COLORES POR FORMACIÓN
// ═══════════════════════════════════════════════
function aplicarSoloColoresFormacion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  const colores = {
    'Barista I': '#E3F2FD', 'Barista II': '#BBDEFB', 'Barista III': '#90CAF9', 'Barista IV': '#64B5F6',
    'Barismo': '#BBDEFB', 'Barismo 1': '#BBDEFB', 'Barismo 2': '#BBDEFB', 'Barismo 3': '#BBDEFB',
    'Barismo 4': '#BBDEFB', 'Barismo 5': '#BBDEFB', 'Barismo 6': '#BBDEFB', 'Barismo 7': '#BBDEFB',
    'Barismo 8': '#BBDEFB', 'Barismo 9': '#BBDEFB', 'Barismo 10': '#BBDEFB',
    'Gastronomía': '#FFECB3', 'Gastronomía I': '#FFF3E0', 'Gastronomía II': '#FFE0B2',
    'Gastronomía III': '#FFCC80', 'Gastronomía IV': '#FFB74D', 'Gastronomía V': '#FFA726',
    'Gastronomía 1': '#FFF3E0', 'Gastronomía 2': '#FFE0B2', 'Gastronomía 3': '#FFCC80',
    'Gastronomía 4': '#FFB74D', 'Gastronomía 5': '#FFA726',
    'Food Manager': '#E8F5E8', 'Panadería': '#F3E5AB', 'Repostería': '#F8BBD9',
    'Sommelier': '#E1BEE7', 'Análisis de datos E-commerce': '#B2EBF2',
    'SAC': '#C5E1A5', 'Ofimática': '#D1C4E9', 'Otra': '#E0E0E0'
  };

  hojas.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const ultFila = hoja.getLastRow();
    if (ultFila <= 1) return;

    const cols = hoja.getLastColumn();
    const encs = hoja.getRange(1, 1, 1, cols).getValues()[0];
    const idxForm = encs.indexOf('Formación');
    if (idxForm === -1) return;

    const colForm = idxForm + 1;
    const valores = hoja.getRange(2, colForm, ultFila - 1, 1).getValues();

    const coloresAplicar = valores.map(fila => {
      let color = '#FFFFFF';
      const form = fila[0];

      if (form) {
        const formStr = form.toString().trim();
        if (colores[formStr]) {
          color = colores[formStr];
        } else if (formStr.toLowerCase().includes('análisis') || formStr.toLowerCase().includes('datos')) {
          color = colores['Análisis de datos E-commerce'];
        } else if (formStr.toLowerCase() === 'sac') {
          color = colores['SAC'];
        } else if (formStr.toLowerCase().includes('ofimatica')) {
          color = colores['Ofimática'];
        } else if (formStr.toLowerCase().includes('food') && formStr.toLowerCase().includes('manager')) {
          color = colores['Food Manager'];
        } else if (formStr.toLowerCase().includes('barista') || formStr.toLowerCase().includes('barismo')) {
          color = colores['Barismo'];
        } else if (formStr.toLowerCase().includes('gastronomía') || formStr.toLowerCase().includes('gastronom')) {
          color = colores['Gastronomía'];
        } else if (formStr.toLowerCase().includes('panadería')) {
          color = colores['Panadería'];
        } else if (formStr.toLowerCase().includes('repostería')) {
          color = colores['Repostería'];
        } else if (formStr.toLowerCase().includes('sommelier')) {
          color = colores['Sommelier'];
        }
      }

      return new Array(cols).fill(color);
    });

    if (coloresAplicar.length > 0) {
      hoja.getRange(2, 1, ultFila - 1, cols).setBackgrounds(coloresAplicar);
    }
  });
}

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 6: MOVER PARTICIPANTES (USA ESTA)
// ═══════════════════════════════════════════════
function moverParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGen = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGen) {
    ui.alert('❌ Error', 'Hoja no encontrada', ui.ButtonSet.OK);
    return;
  }

  if (!ss.getSheetByName('❌ No Terminó la Formación')) {
    ui.alert('❌ Error', 'Ejecuta primero: agregarFuncionesNuevasV29', ui.ButtonSet.OK);
    return;
  }

  const ultFila = hojaGen.getLastRow();
  if (ultFila <= 1) {
    ui.alert('ℹ️ Sin datos', 'No hay participantes', ui.ButtonSet.OK);
    return;
  }

  const cols = hojaGen.getLastColumn();
  const encs = hojaGen.getRange(1, 1, 1, cols).getValues()[0];

  let colSiNo = -1, colNombre = -1;
  for (let i = 0; i < encs.length; i++) {
    const enc = encs[i].toString().toLowerCase();
    if (enc.includes('no terminó') && enc.includes('sí')) colSiNo = i + 1;
    if (enc.includes('nombre') && enc.includes('completo')) colNombre = i + 1;
  }

  if (colSiNo === -1) {
    ui.alert('❌ Error', 'Columna Sí/No no encontrada', ui.ButtonSet.OK);
    return;
  }

  const participantes = [];
  for (let fila = 2; fila <= ultFila; fila++) {
    const noTerm = hojaGen.getRange(fila, colSiNo).getValue();
    const nombre = hojaGen.getRange(fila, colNombre).getValue();
    if (noTerm && noTerm.toString().trim().toLowerCase() === 'sí' && nombre) {
      participantes.push({ fila: fila, nombre: nombre.toString().trim() });
    }
  }

  if (participantes.length === 0) {
    ui.alert('ℹ️ Sin participantes', 'No hay marcados con "Sí"', ui.ButtonSet.OK);
    return;
  }

  const conf = ui.alert(
    '❌ Mover Participantes',
    `Encontrados: ${participantes.length}\n\n¿Mover?`,
    ui.ButtonSet.YES_NO
  );

  if (conf !== ui.Button.YES) return;

  let procesados = 0, errores = 0;

  for (let i = participantes.length - 1; i >= 0; i--) {
    const part = participantes[i];
    try {
      const res = procesarNoTermino(hojaGen, part.fila);
      if (res && res.exito) procesados++;
      else errores++;

      for (let j = 0; j < i; j++) {
        if (participantes[j].fila > part.fila) participantes[j].fila--;
      }
    } catch (error) {
      errores++;
    }
  }

  let msg = '❌ COMPLETADO\n\n';
  if (procesados > 0) msg += `✅ ${procesados} movidos\n`;
  if (errores > 0) msg += `❌ ${errores} errores\n`;

  ui.alert('✅ Resultado', msg, ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 7: PROCESAR NO TERMINÓ (INTERNA)
// ═══════════════════════════════════════════════
function procesarNoTermino(hojaGen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaNoTerm = ss.getSheetByName('❌ No Terminó la Formación');

    if (!hojaNoTerm) throw new Error('Hoja no existe');

    const cols = hojaGen.getLastColumn();
    const datos = hojaGen.getRange(fila, 1, 1, cols).getValues()[0];
    const encs = hojaGen.getRange(1, 1, 1, cols).getValues()[0];

    const idx = {
      id: encs.indexOf('Creamos ID'),
      nombre: encs.indexOf('Nombre Completo'),
      telefono: encs.indexOf('Teléfono'),
      formacion: encs.indexOf('Formación'),
      aliados: encs.indexOf('Aliados'),
      plataformas: encs.indexOf('Plataformas'),
      conexionLaboral: encs.indexOf('Conexión laboral'),
      porSuCuenta: encs.indexOf('Por su cuenta'),
      noBuscaTrabajo: encs.indexOf('No busca trabajar'),
      empleado: encs.indexOf('Empleado'),
      noTerminoFormacion: encs.indexOf('No terminó la formación'),
      etapaActual: encs.indexOf('Etapa Actual'),
      resultados: encs.indexOf('Resultados Obtenidos'),
      documentos: encs.indexOf('Documentos Faltantes'),
      fecha: -1, notas: -1, totalLlamadas: -1
    };

    for (let i = 0; i < encs.length; i++) {
      const enc = encs[i].toString().toLowerCase();
      if (enc.includes('fecha') && enc.includes('original')) idx.fecha = i;
      if (enc.includes('notas') || enc.includes('última llamada')) idx.notas = i;
      if (enc.includes('total') && enc.includes('llamadas')) idx.totalLlamadas = i;
    }

    const nombre = idx.nombre >= 0 ? datos[idx.nombre] : '';
    if (!nombre || nombre.toString().trim() === '') throw new Error('Nombre vacío');

    const fechaAct = new Date();
    const motivoNotas = `${idx.notas >= 0 ? datos[idx.notas] : ''} | NO COMPLETÓ - ${Utilities.formatDate(fechaAct, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')}`.trim();

    const datosDestino = [
      idx.id >= 0 ? datos[idx.id] : '',
      nombre,
      idx.telefono >= 0 ? datos[idx.telefono] : '',
      idx.formacion >= 0 ? datos[idx.formacion] : 'Barismo',
      idx.aliados >= 0 ? datos[idx.aliados] : '',
      idx.plataformas >= 0 ? datos[idx.plataformas] : '',
      idx.conexionLaboral >= 0 ? datos[idx.conexionLaboral] : '',
      idx.porSuCuenta >= 0 ? datos[idx.porSuCuenta] : '',
      idx.noBuscaTrabajo >= 0 ? datos[idx.noBuscaTrabajo] : '',
      idx.empleado >= 0 ? datos[idx.empleado] : '',
      idx.noTerminoFormacion >= 0 ? datos[idx.noTerminoFormacion] : '',
      'No terminó formación',
      idx.resultados >= 0 ? datos[idx.resultados] : '',
      idx.documentos >= 0 ? datos[idx.documentos] : 'Ninguno',
      idx.fecha >= 0 ? datos[idx.fecha] : '',
      motivoNotas,
      idx.totalLlamadas >= 0 ? datos[idx.totalLlamadas] : 0,
      Utilities.formatDate(fechaAct, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')
    ];

    hojaNoTerm.insertRows(2, 1);
    const rango = hojaNoTerm.getRange(2, 1, 1, 18);
    rango.setValues([datosDestino]);
    rango.setBackground('#FFCDD2');
    rango.setBorder(true, true, true, true, true, true, '#C62828', SpreadsheetApp.BorderStyle.SOLID);

    hojaGen.deleteRow(fila);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      `❌ ${nombre} movido a "No Terminó la Formación"`,
      'Éxito',
      3
    );

    return { exito: true };

  } catch (error) {
    console.error('Error:', error);
    return { exito: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN 8: VER PARTICIPANTES
// ═══════════════════════════════════════════════
function verParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('❌ No Terminó la Formación');

  if (!hoja) {
    ui.alert('❌ Error', 'Hoja no existe. Ejecuta: agregarFuncionesNuevasV29', ui.ButtonSet.OK);
    return;
  }

  const ultFila = hoja.getLastRow();
  if (ultFila <= 1) {
    ui.alert('✅ Sin registros', '¡No hay abandonos!', ui.ButtonSet.OK);
    return;
  }

  const total = ultFila - 1;
  const parts = [];

  for (let fila = 2; fila <= Math.min(ultFila, 11); fila++) {
    const nombre = hoja.getRange(fila, 2).getValue();
    const formacion = hoja.getRange(fila, 4).getValue();
    const fechaAband = hoja.getRange(fila, 18).getValue();
    const llamadas = hoja.getRange(fila, 17).getValue() || 0;

    parts.push({ nombre, formacion, fechaAband, llamadas });
  }

  let rep = `❌ NO TERMINARON\n\n📊 Total: ${total}\n\n`;

  if (parts.length > 0) {
    rep += '👥 ÚLTIMOS:\n';
    parts.forEach((p, i) => {
      const fecha = p.fechaAband ?
        Utilities.formatDate(new Date(p.fechaAband), Session.getScriptTimeZone(), 'dd/MM/yyyy') :
        'Sin fecha';
      rep += `${i + 1}. ${p.nombre}\n   📚 ${p.formacion} | 📞 ${p.llamadas} | 📅 ${fecha}\n\n`;
    });

    if (total > 10) rep += `... y ${total - 10} más\n`;
  }

  ui.alert('❌ Reporte', rep, ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════
// 📋 MENSAJE INICIAL
// ═══════════════════════════════════════════════
console.log('═══════════════════════════════════');
console.log('✅ FUNCIONES NUEVAS v2.9 CARGADAS');
console.log('═══════════════════════════════════');
console.log('🚀 Para instalar TODO:');
console.log('   agregarFuncionesNuevasV29()');
console.log('');
console.log('📋 Para usar después:');
console.log('   moverParticipantesNoTerminaron()');
console.log('   verParticipantesNoTerminaron()');
console.log('═══════════════════════════════════');
