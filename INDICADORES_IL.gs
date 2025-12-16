// ═══════════════════════════════════════════════════════════════
// 📊 SISTEMA DE INDICADORES - INCLUSIÓN LABORAL
// ═══════════════════════════════════════════════════════════════
//
// Indicadores implementados:
// • IL.P.03: Número de participantes en Formación Técnica
// • IL.P.05: Tasa de retención de Formación Técnica
// • IL.P.06: Distribución porcentual deserciones por motivo
// • IL.R.05E: Tasa de graduación
// • IL.I.03: Porcentaje empleos conservados 3+ meses
// • IL.I.04: Porcentaje empleos conservados 6+ meses
//
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN PRINCIPAL: CREAR/ACTUALIZAR HOJA DE INDICADORES
// ═══════════════════════════════════════════════
function crearHojaIndicadores() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = ss.getSheetByName('📊 Indicadores IL');

  if (!hoja) {
    hoja = ss.insertSheet('📊 Indicadores IL');
  } else {
    hoja.clear();
  }

  configurarFormatoIndicadores(hoja);
  actualizarIndicadores();

  return hoja;
}

// ═══════════════════════════════════════════════
// 🎨 CONFIGURAR FORMATO DE HOJA DE INDICADORES
// ═══════════════════════════════════════════════
function configurarFormatoIndicadores(hoja) {
  // Título principal
  hoja.getRange('A1:F1').merge();
  const titulo = hoja.getRange('A1');
  titulo.setValue('📊 INDICADORES DE INCLUSIÓN LABORAL');
  titulo.setBackground('#1565C0');
  titulo.setFontColor('#FFFFFF');
  titulo.setFontWeight('bold');
  titulo.setFontSize(16);
  titulo.setHorizontalAlignment('center');
  titulo.setVerticalAlignment('middle');

  // Fecha de actualización
  hoja.getRange('A2:F2').merge();
  const fechaActual = hoja.getRange('A2');
  fechaActual.setFormula('="Última actualización: " & TEXT(NOW(), "DD/MM/YYYY HH:MM")');
  fechaActual.setBackground('#E3F2FD');
  fechaActual.setFontSize(10);
  fechaActual.setHorizontalAlignment('center');
  fechaActual.setFontStyle('italic');

  // Encabezados de columnas
  const encabezados = [
    ['Código', 'Indicador', 'Valor', 'Meta', 'Estado', 'Detalle']
  ];

  const rangoEnc = hoja.getRange('A4:F4');
  rangoEnc.setValues(encabezados);
  rangoEnc.setBackground('#1976D2');
  rangoEnc.setFontColor('#FFFFFF');
  rangoEnc.setFontWeight('bold');
  rangoEnc.setFontSize(11);
  rangoEnc.setHorizontalAlignment('center');

  // Ajustar anchos
  hoja.setColumnWidth(1, 100);  // Código
  hoja.setColumnWidth(2, 300);  // Indicador
  hoja.setColumnWidth(3, 120);  // Valor
  hoja.setColumnWidth(4, 100);  // Meta
  hoja.setColumnWidth(5, 100);  // Estado
  hoja.setColumnWidth(6, 350);  // Detalle

  // Congelar filas
  hoja.setFrozenRows(4);

  // Configurar altura de fila del título
  hoja.setRowHeight(1, 40);
  hoja.setRowHeight(4, 35);
}

// ═══════════════════════════════════════════════
// 🔄 ACTUALIZAR TODOS LOS INDICADORES
// ═══════════════════════════════════════════════
function actualizarIndicadores() {
  const ui = SpreadsheetApp.getUi();

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let hoja = ss.getSheetByName('📊 Indicadores IL');

    if (!hoja) {
      hoja = crearHojaIndicadores();
    }

    // Calcular indicadores
    const ilp03 = calcularILP03();
    const ilp05 = calcularILP05();
    const ilp06 = calcularILP06();
    const ilr05e = calcularILR05E();
    const ili03 = calcularILI03();
    const ili04 = calcularILI04();

    // Preparar datos para la tabla
    const datos = [
      ['IL.P.03', 'Participantes en Formación Técnica', ilp03.valor, ilp03.meta, ilp03.estado, ilp03.detalle],
      ['IL.P.05', 'Tasa de retención', ilp05.valor, ilp05.meta, ilp05.estado, ilp05.detalle],
      ['IL.P.06', 'Deserciones por motivo', ilp06.valor, ilp06.meta, ilp06.estado, ilp06.detalle],
      ['IL.R.05E', 'Tasa de graduación', ilr05e.valor, ilr05e.meta, ilr05e.estado, ilr05e.detalle],
      ['IL.I.03', 'Empleos 3+ meses', ili03.valor, ili03.meta, ili03.estado, ili03.detalle],
      ['IL.I.04', 'Empleos 6+ meses', ili04.valor, ili04.meta, ili04.estado, ili04.detalle]
    ];

    // Escribir datos
    const rangoDatos = hoja.getRange(5, 1, datos.length, 6);
    rangoDatos.setValues(datos);

    // Aplicar formato
    aplicarFormatoIndicadores(hoja, 5, datos.length);

    // Actualizar gráficos si existen
    actualizarGraficos(hoja);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Indicadores actualizados exitosamente',
      '✅ Actualización Completa',
      3
    );

  } catch (error) {
    ui.alert('❌ Error', `Error actualizando indicadores: ${error.message}`, ui.ButtonSet.OK);
  }
}

// ═══════════════════════════════════════════════
// 📊 IL.P.03: PARTICIPANTES EN FORMACIÓN TÉCNICA
// ═══════════════════════════════════════════════
function calcularILP03() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');

  let total = 0;

  if (hojaGeneral) {
    const ultFila = hojaGeneral.getLastRow();
    total = Math.max(0, ultFila - 1);
  }

  // Sumar finalizados
  const hojaFinalizados = ss.getSheetByName('✅ Finalizados');
  if (hojaFinalizados) {
    const ultFila = hojaFinalizados.getLastRow();
    total += Math.max(0, ultFila - 1);
  }

  // Sumar los que no terminaron
  const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');
  if (hojaNoTermino) {
    const ultFila = hojaNoTermino.getLastRow();
    total += Math.max(0, ultFila - 1);
  }

  return {
    valor: total,
    meta: '100+',
    estado: total >= 100 ? '✅' : total >= 50 ? '⚠️' : '❌',
    detalle: `Total de participantes en todos los estados del programa`
  };
}

// ═══════════════════════════════════════════════
// 📊 IL.P.05: TASA DE RETENCIÓN
// ═══════════════════════════════════════════════
function calcularILP05() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Total inscritos = en proceso + finalizados + no terminaron
  let totalInscritos = 0;
  let enProceso = 0;
  let finalizados = 0;
  let noTerminaron = 0;

  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');
  if (hojaGeneral) {
    enProceso = Math.max(0, hojaGeneral.getLastRow() - 1);
  }

  const hojaFinalizados = ss.getSheetByName('✅ Finalizados');
  if (hojaFinalizados) {
    finalizados = Math.max(0, hojaFinalizados.getLastRow() - 1);
  }

  const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');
  if (hojaNoTermino) {
    noTerminaron = Math.max(0, hojaNoTermino.getLastRow() - 1);
  }

  totalInscritos = enProceso + finalizados + noTerminaron;

  // Retenidos = en proceso + finalizados
  const retenidos = enProceso + finalizados;

  const tasaRetencion = totalInscritos > 0 ? ((retenidos / totalInscritos) * 100).toFixed(1) : 0;

  return {
    valor: `${tasaRetencion}%`,
    meta: '85%',
    estado: tasaRetencion >= 85 ? '✅' : tasaRetencion >= 70 ? '⚠️' : '❌',
    detalle: `Retenidos: ${retenidos} de ${totalInscritos} inscritos | Deserción: ${noTerminaron}`
  };
}

// ═══════════════════════════════════════════════
// 📊 IL.P.06: DISTRIBUCIÓN DESERCIONES POR MOTIVO
// ═══════════════════════════════════════════════
function calcularILP06() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');

  if (!hojaNoTermino) {
    return {
      valor: '0',
      meta: 'N/A',
      estado: '✅',
      detalle: 'Sin deserciones registradas'
    };
  }

  const ultFila = hojaNoTermino.getLastRow();
  if (ultFila <= 1) {
    return {
      valor: '0',
      meta: 'N/A',
      estado: '✅',
      detalle: 'Sin deserciones registradas'
    };
  }

  const total = ultFila - 1;

  // Analizar motivos en columna de Notas/Motivo (columna 16)
  const motivos = {};

  for (let fila = 2; fila <= ultFila; fila++) {
    const motivo = hojaNoTermino.getRange(fila, 16).getValue();
    const motivoStr = motivo ? motivo.toString().toLowerCase() : 'sin especificar';

    // Categorizar motivos
    let categoria = 'Otros';
    if (motivoStr.includes('personal') || motivoStr.includes('familia')) categoria = 'Motivos personales';
    else if (motivoStr.includes('trabajo') || motivoStr.includes('empleo') || motivoStr.includes('laboral')) categoria = 'Encontró empleo';
    else if (motivoStr.includes('salud')) categoria = 'Problemas de salud';
    else if (motivoStr.includes('económico') || motivoStr.includes('dinero')) categoria = 'Motivos económicos';
    else if (motivoStr.includes('distancia') || motivoStr.includes('transporte')) categoria = 'Problemas de transporte';
    else if (motivoStr.includes('interés') || motivoStr.includes('desmotiv')) categoria = 'Falta de interés';

    motivos[categoria] = (motivos[categoria] || 0) + 1;
  }

  // Obtener top 3 motivos
  const top3 = Object.entries(motivos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([motivo, cant]) => `${motivo}: ${((cant/total)*100).toFixed(1)}%`)
    .join(' | ');

  return {
    valor: total,
    meta: '<15%',
    estado: total < (total * 0.15) ? '✅' : '⚠️',
    detalle: `Top 3: ${top3}`
  };
}

// ═══════════════════════════════════════════════
// 📊 IL.R.05E: TASA DE GRADUACIÓN
// ═══════════════════════════════════════════════
function calcularILR05E() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let totalInscritos = 0;
  let graduados = 0;

  // Contar inscritos
  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');
  if (hojaGeneral) {
    totalInscritos += Math.max(0, hojaGeneral.getLastRow() - 1);
  }

  const hojaFinalizados = ss.getSheetByName('✅ Finalizados');
  if (hojaFinalizados) {
    const finalizados = Math.max(0, hojaFinalizados.getLastRow() - 1);
    graduados = finalizados;
    totalInscritos += finalizados;
  }

  const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');
  if (hojaNoTermino) {
    totalInscritos += Math.max(0, hojaNoTermino.getLastRow() - 1);
  }

  const tasaGraduacion = totalInscritos > 0 ? ((graduados / totalInscritos) * 100).toFixed(1) : 0;

  return {
    valor: `${tasaGraduacion}%`,
    meta: '80%',
    estado: tasaGraduacion >= 80 ? '✅' : tasaGraduacion >= 60 ? '⚠️' : '❌',
    detalle: `Graduados: ${graduados} de ${totalInscritos} inscritos`
  };
}

// ═══════════════════════════════════════════════
// 📊 IL.I.03: EMPLEOS CONSERVADOS 3+ MESES
// ═══════════════════════════════════════════════
function calcularILI03() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaFinalizados = ss.getSheetByName('✅ Finalizados');

  if (!hojaFinalizados) {
    return {
      valor: '0%',
      meta: '70%',
      estado: '❌',
      detalle: 'Sin datos de empleos'
    };
  }

  const ultFila = hojaFinalizados.getLastRow();
  if (ultFila <= 1) {
    return {
      valor: '0%',
      meta: '70%',
      estado: '❌',
      detalle: 'Sin graduados registrados'
    };
  }

  let totalEmpleados = 0;
  let empleos3Meses = 0;
  const fechaActual = new Date();

  // Buscar columna "Empleado"
  const encs = hojaFinalizados.getRange(1, 1, 1, hojaFinalizados.getLastColumn()).getValues()[0];
  const colEmpleado = encs.indexOf('Empleado') + 1;
  const colFecha = encs.indexOf('Fecha de Llamada') + 1;

  if (colEmpleado === 0) {
    return {
      valor: 'N/A',
      meta: '70%',
      estado: '⚠️',
      detalle: 'Columna "Empleado" no encontrada'
    };
  }

  for (let fila = 2; fila <= ultFila; fila++) {
    const empleado = hojaFinalizados.getRange(fila, colEmpleado).getValue();
    const empleadoStr = empleado ? empleado.toString().toLowerCase() : '';

    if (empleadoStr.includes('sí') || empleadoStr.includes('si') || empleadoStr.includes('empleado')) {
      totalEmpleados++;

      // Verificar si tiene más de 3 meses
      if (colFecha > 0) {
        const fecha = hojaFinalizados.getRange(fila, colFecha).getValue();
        if (fecha) {
          const fechaEmpleo = new Date(fecha);
          const mesesTranscurridos = (fechaActual - fechaEmpleo) / (1000 * 60 * 60 * 24 * 30);

          if (mesesTranscurridos >= 3) {
            empleos3Meses++;
          }
        }
      }
    }
  }

  const porcentaje = totalEmpleados > 0 ? ((empleos3Meses / totalEmpleados) * 100).toFixed(1) : 0;

  return {
    valor: `${porcentaje}%`,
    meta: '70%',
    estado: porcentaje >= 70 ? '✅' : porcentaje >= 50 ? '⚠️' : '❌',
    detalle: `${empleos3Meses} de ${totalEmpleados} empleados conservan empleo 3+ meses`
  };
}

// ═══════════════════════════════════════════════
// 📊 IL.I.04: EMPLEOS CONSERVADOS 6+ MESES
// ═══════════════════════════════════════════════
function calcularILI04() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaFinalizados = ss.getSheetByName('✅ Finalizados');

  if (!hojaFinalizados) {
    return {
      valor: '0%',
      meta: '60%',
      estado: '❌',
      detalle: 'Sin datos de empleos'
    };
  }

  const ultFila = hojaFinalizados.getLastRow();
  if (ultFila <= 1) {
    return {
      valor: '0%',
      meta: '60%',
      estado: '❌',
      detalle: 'Sin graduados registrados'
    };
  }

  let totalEmpleados = 0;
  let empleos6Meses = 0;
  const fechaActual = new Date();

  // Buscar columna "Empleado"
  const encs = hojaFinalizados.getRange(1, 1, 1, hojaFinalizados.getLastColumn()).getValues()[0];
  const colEmpleado = encs.indexOf('Empleado') + 1;
  const colFecha = encs.indexOf('Fecha de Llamada') + 1;

  if (colEmpleado === 0) {
    return {
      valor: 'N/A',
      meta: '60%',
      estado: '⚠️',
      detalle: 'Columna "Empleado" no encontrada'
    };
  }

  for (let fila = 2; fila <= ultFila; fila++) {
    const empleado = hojaFinalizados.getRange(fila, colEmpleado).getValue();
    const empleadoStr = empleado ? empleado.toString().toLowerCase() : '';

    if (empleadoStr.includes('sí') || empleadoStr.includes('si') || empleadoStr.includes('empleado')) {
      totalEmpleados++;

      // Verificar si tiene más de 6 meses
      if (colFecha > 0) {
        const fecha = hojaFinalizados.getRange(fila, colFecha).getValue();
        if (fecha) {
          const fechaEmpleo = new Date(fecha);
          const mesesTranscurridos = (fechaActual - fechaEmpleo) / (1000 * 60 * 60 * 24 * 30);

          if (mesesTranscurridos >= 6) {
            empleos6Meses++;
          }
        }
      }
    }
  }

  const porcentaje = totalEmpleados > 0 ? ((empleos6Meses / totalEmpleados) * 100).toFixed(1) : 0;

  return {
    valor: `${porcentaje}%`,
    meta: '60%',
    estado: porcentaje >= 60 ? '✅' : porcentaje >= 40 ? '⚠️' : '❌',
    detalle: `${empleos6Meses} de ${totalEmpleados} empleados conservan empleo 6+ meses`
  };
}

// ═══════════════════════════════════════════════
// 🎨 APLICAR FORMATO A INDICADORES
// ═══════════════════════════════════════════════
function aplicarFormatoIndicadores(hoja, filaInicio, cantFilas) {
  const rangoDatos = hoja.getRange(filaInicio, 1, cantFilas, 6);

  // Bordes
  rangoDatos.setBorder(true, true, true, true, true, true, '#BDBDBD', SpreadsheetApp.BorderStyle.SOLID);

  // Alineación
  hoja.getRange(filaInicio, 1, cantFilas, 1).setHorizontalAlignment('center'); // Código
  hoja.getRange(filaInicio, 2, cantFilas, 1).setHorizontalAlignment('left');   // Indicador
  hoja.getRange(filaInicio, 3, cantFilas, 1).setHorizontalAlignment('center'); // Valor
  hoja.getRange(filaInicio, 4, cantFilas, 1).setHorizontalAlignment('center'); // Meta
  hoja.getRange(filaInicio, 5, cantFilas, 1).setHorizontalAlignment('center'); // Estado
  hoja.getRange(filaInicio, 6, cantFilas, 1).setHorizontalAlignment('left');   // Detalle

  // Tamaño de fuente
  rangoDatos.setFontSize(10);

  // Wrap text en columna de detalle
  hoja.getRange(filaInicio, 6, cantFilas, 1).setWrap(true);

  // Colores alternos
  for (let i = 0; i < cantFilas; i++) {
    const fila = filaInicio + i;
    const color = i % 2 === 0 ? '#F5F5F5' : '#FFFFFF';
    hoja.getRange(fila, 1, 1, 6).setBackground(color);
  }

  // Color según estado
  for (let i = 0; i < cantFilas; i++) {
    const fila = filaInicio + i;
    const estado = hoja.getRange(fila, 5).getValue();
    let colorEstado = '#FFFFFF';

    if (estado === '✅') colorEstado = '#C8E6C9';
    else if (estado === '⚠️') colorEstado = '#FFF9C4';
    else if (estado === '❌') colorEstado = '#FFCDD2';

    hoja.getRange(fila, 5).setBackground(colorEstado);
  }
}

// ═══════════════════════════════════════════════
// 📈 ACTUALIZAR GRÁFICOS
// ═══════════════════════════════════════════════
function actualizarGraficos(hoja) {
  // Por ahora solo preparamos el espacio
  // Los gráficos se pueden agregar manualmente o en una versión futura

  hoja.getRange('A15').setValue('📈 Visualización de Indicadores');
  hoja.getRange('A15').setFontWeight('bold').setFontSize(12);
  hoja.getRange('A16').setValue('Los gráficos se pueden agregar usando Insertar > Gráfico');
  hoja.getRange('A16').setFontStyle('italic').setFontSize(9);
}

// ═══════════════════════════════════════════════
// 🔄 AUTO-ACTUALIZACIÓN (OPCIONAL)
// ═══════════════════════════════════════════════
function configurarAutoActualizacion() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🔄 Auto-actualización de Indicadores',
    '¿Deseas configurar actualización automática cada hora?\n\n' +
    'Los indicadores se actualizarán automáticamente.',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    // Eliminar triggers existentes
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'actualizarIndicadores') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Crear nuevo trigger cada hora
    ScriptApp.newTrigger('actualizarIndicadores')
      .timeBased()
      .everyHours(1)
      .create();

    ui.alert('✅ Configurado',
      'Los indicadores se actualizarán automáticamente cada hora.',
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error',
      `Error configurando auto-actualización: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

function desactivarAutoActualizacion() {
  const ui = SpreadsheetApp.getUi();

  try {
    const triggers = ScriptApp.getProjectTriggers();
    let removidos = 0;

    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'actualizarIndicadores') {
        ScriptApp.deleteTrigger(trigger);
        removidos++;
      }
    });

    ui.alert('✅ Desactivado',
      `Auto-actualización desactivada. (${removidos} triggers removidos)`,
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error',
      `Error desactivando: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

// ═══════════════════════════════════════════════
// 📋 MENSAJE DE CARGA
// ═══════════════════════════════════════════════
console.log('═══════════════════════════════════');
console.log('✅ SISTEMA DE INDICADORES IL CARGADO');
console.log('═══════════════════════════════════');
console.log('📊 Indicadores disponibles:');
console.log('   • IL.P.03: Participantes');
console.log('   • IL.P.05: Tasa de retención');
console.log('   • IL.P.06: Deserciones');
console.log('   • IL.R.05E: Tasa de graduación');
console.log('   • IL.I.03: Empleos 3+ meses');
console.log('   • IL.I.04: Empleos 6+ meses');
console.log('');
console.log('🚀 Funciones principales:');
console.log('   • crearHojaIndicadores()');
console.log('   • actualizarIndicadores()');
console.log('═══════════════════════════════════');
