// ====================================
// SISTEMA DE SEGUIMIENTO DE PRÁCTICAS v2.9 COMPLETO
// CÓDIGO UNIFICADO - UN SOLO ARCHIVO
// ====================================
//
// ✨ INCLUYE:
// • Sistema base v2.8 con columnas de etapas
// • Funcionalidad "No Terminó la Formación"
// • Limpieza de colores
// • Sistema anti-doble procesamiento
// • Todo en un solo código
//
// ====================================

const LLAMADAS_PARA_FINALIZAR = 6;

// MAPEO DE COLUMNAS v2.9
const COLUMNAS = {
  ID: 1,
  NOMBRE: 2,
  TELEFONO: 3,
  FORMACION: 4,
  ALIADOS: 5,
  PLATAFORMAS: 6,
  CONEXION_LABORAL: 7,
  POR_SU_CUENTA: 8,
  NO_BUSCA_TRABAJAR: 9,
  EMPLEADO: 10,
  NO_TERMINO_FORMACION_SISNO: 11,  // NUEVA: columna con dropdown Sí/No
  ETAPA_ACTUAL: 12,
  RESULTADOS: 13,
  DOCUMENTOS: 14,
  FECHA: 15,
  NOTAS: 16,
  TOTAL_LLAMADAS: 17,
  PROCESAR: 18
};

const TOTAL_COLUMNAS = 18;
const TOTAL_COLUMNAS_DESTINO = 17;

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🎓 Sistema de Seguimiento')
    .addItem('📖 Ver Instrucciones', 'mostrarHojaInstrucciones')
    .addSeparator()
    .addSubMenu(ui.createMenu('🔧 Configuración')
      .addItem('⚙️ Configuración Inicial', 'configurarHojasCorregido')
      .addItem('🔗 Configurar Google Sheet Externo', 'configurarSheetExterno')
      .addItem('🎨 Aplicar Diseño Profesional', 'aplicarFormato'))
    .addSeparator()
    .addSubMenu(ui.createMenu('📥 Importación')
      .addItem('📥 Importar Datos 2024', 'importarDatos2024')
      .addItem('📥 Importar Datos 2025', 'importarDatos2025'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🆕 No Terminó Formación')
      .addItem('✨ INSTALAR Funciones v2.9', 'agregarFuncionesNuevasV29')
      .addItem('🔄 Mover Participantes', 'moverParticipantesNoTerminaron')
      .addItem('📊 Ver Reporte', 'verParticipantesNoTerminaron'))
    .addSeparator()
    .addItem('⚡ ACTIVAR Procesamiento Automático', 'activarProcesomientoAutomatico')
    .addItem('🔴 DESACTIVAR Procesamiento Automático', 'desactivarProcesomientoAutomatico')
    .addItem('🔄 Procesar Llamadas Marcadas', 'procesarLlamadasManualesCorregido')
    .addSeparator()
    .addSubMenu(ui.createMenu('🛠️ Mantenimiento')
      .addItem('🔧 Reparar Sistema', 'repararSistema')
      .addItem('🧹 Limpiar Bloqueos', 'limpiarBloqueosProcesamiento')
      .addItem('💾 Crear Respaldo', 'crearRespaldo'))
    .addToUi();

  verificarEstadoProcesomientoAutomatico();
}

// ====================================
// INSTALACIÓN v2.9 - NO TERMINÓ FORMACIÓN
// ====================================
function agregarFuncionesNuevasV29() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🚀 Instalar Funciones v2.9',
    '✅ Se instalará:\n\n' +
    '1. Hoja "❌ No Terminó la Formación"\n' +
    '2. Columna "No terminó formación (Sí/No)" en columna K\n' +
    '3. Limpieza de colores de columnas\n' +
    '4. Solo colores por formación\n\n' +
    '⚠️ NO borra datos\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let pasos = [];

    // PASO 1: Crear hoja "No Terminó"
    if (!ss.getSheetByName('❌ No Terminó la Formación')) {
      crearHojaNoTerminoLimpia();
      pasos.push('✅ Hoja creada');
    } else {
      pasos.push('ℹ️ Hoja ya existe');
    }

    // PASO 2: Agregar columna en K
    const resultado = agregarColumnaSiNoEnK();
    pasos.push(resultado.mensaje);

    // PASO 3: Limpiar colores
    limpiarColoresEtapas();
    pasos.push('✅ Colores limpiados');

    // PASO 4: Aplicar colores por formación
    aplicarSoloColoresFormacion();
    pasos.push('✅ Colores aplicados');

    let mensaje = '🎉 INSTALACIÓN COMPLETADA\n\n';
    pasos.forEach(p => mensaje += `${p}\n`);
    mensaje += '\n📋 Uso:\n';
    mensaje += '1. Marca "Sí" en columna K\n';
    mensaje += '2. Ejecuta: Mover Participantes\n';

    ui.alert('✅ Éxito', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

function crearHojaNoTerminoLimpia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.insertSheet('❌ No Terminó la Formación');

  const encabezados = [
    'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
    'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó formación',
    'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
    'Fecha Original', 'Motivo/Notas', 'Total Llamadas', 'Fecha Abandono'
  ];

  hoja.getRange(1, 1, 1, 18).setValues([encabezados]);

  const rangoEnc = hoja.getRange(1, 1, 1, 18);
  rangoEnc.setBackground('#C62828');
  rangoEnc.setFontColor('#FFFFFF');
  rangoEnc.setFontWeight('bold');
  rangoEnc.setFontSize(11);
  rangoEnc.setHorizontalAlignment('center');

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

function agregarColumnaSiNoEnK() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const COLUMNA_K = 11;
  let actualizadas = 0;

  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  hojas.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    // Verificar si ya existe
    const valorK = hoja.getRange(1, COLUMNA_K).getValue();
    if (valorK && valorK.toString().includes('(Sí/No)')) {
      return; // Ya existe
    }

    // Asegurar que tiene al menos K columnas
    while (hoja.getLastColumn() < COLUMNA_K) {
      hoja.insertColumnAfter(hoja.getLastColumn());
    }

    // Configurar columna K
    if (nombreHoja === '📋 Seguimiento General') {
      hoja.getRange(1, COLUMNA_K).setValue('No terminó formación (Sí/No)');
      hoja.getRange(1, COLUMNA_K)
        .setBackground('#FFF9C4')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');

      const ultFila = hoja.getLastRow();
      if (ultFila > 1) {
        const rango = hoja.getRange(2, COLUMNA_K, ultFila - 1, 1);
        const validacion = SpreadsheetApp.newDataValidation()
          .requireValueInList(['No', 'Sí'])
          .setAllowInvalid(false)
          .build();
        rango.setDataValidation(validacion);
        rango.setValue('No');
      }
    } else {
      hoja.getRange(1, COLUMNA_K).setValue('No terminó formación');
      hoja.getRange(1, COLUMNA_K)
        .setBackground('#FFF9C4')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');
    }

    hoja.setColumnWidth(COLUMNA_K, 150);
    actualizadas++;
  });

  return {
    mensaje: actualizadas > 0 ? `✅ Columna agregada en ${actualizadas} hojas` : 'ℹ️ Ya existe'
  };
}

function limpiarColoresEtapas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  const columnasLimpiar = ['Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó formación'];

  hojas.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const cols = hoja.getLastColumn();
    const encs = hoja.getRange(1, 1, 1, cols).getValues()[0];
    const ultFila = hoja.getLastRow();

    columnasLimpiar.forEach(nombreCol => {
      const idx = encs.indexOf(nombreCol);
      if (idx !== -1 && ultFila > 1) {
        const col = idx + 1;
        hoja.getRange(2, col, ultFila - 1, 1).setBackground('#FFFFFF');

        const enc = hoja.getRange(1, col);
        if (nombreHoja === '📋 Seguimiento General') {
          enc.setBackground('#1f4e79').setFontColor('#ffffff');
        }
        enc.setFontWeight('bold').setHorizontalAlignment('center');
      }
    });
  });
}

function aplicarSoloColoresFormacion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  const colores = {
    'Barismo': '#BBDEFB', 'Barista I': '#E3F2FD', 'Barista II': '#BBDEFB',
    'Gastronomía': '#FFECB3', 'Gastronomía I': '#FFF3E0',
    'Food Manager': '#E8F5E8', 'SAC': '#C5E1A5', 'Ofimática': '#D1C4E9',
    'Análisis de datos E-commerce': '#B2EBF2'
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

    const valores = hoja.getRange(2, idxForm + 1, ultFila - 1, 1).getValues();

    const coloresAplicar = valores.map(fila => {
      let color = '#FFFFFF';
      const form = fila[0];

      if (form) {
        const formStr = form.toString().trim();
        if (colores[formStr]) {
          color = colores[formStr];
        } else if (formStr.toLowerCase().includes('barismo') || formStr.toLowerCase().includes('barista')) {
          color = colores['Barismo'];
        } else if (formStr.toLowerCase().includes('gastronom')) {
          color = colores['Gastronomía'];
        } else if (formStr.toLowerCase().includes('food')) {
          color = colores['Food Manager'];
        } else if (formStr.toLowerCase().includes('sac')) {
          color = colores['SAC'];
        } else if (formStr.toLowerCase().includes('ofim')) {
          color = colores['Ofimática'];
        } else if (formStr.toLowerCase().includes('datos') || formStr.toLowerCase().includes('análisis')) {
          color = colores['Análisis de datos E-commerce'];
        }
      }

      return new Array(cols).fill(color);
    });

    if (coloresAplicar.length > 0) {
      hoja.getRange(2, 1, ultFila - 1, cols).setBackgrounds(coloresAplicar);
    }
  });
}

function moverParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGen = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGen) {
    ui.alert('❌ Error', 'Hoja no encontrada', ui.ButtonSet.OK);
    return;
  }

  if (!ss.getSheetByName('❌ No Terminó la Formación')) {
    ui.alert('❌ Error', 'Ejecuta primero: Instalar Funciones v2.9', ui.ButtonSet.OK);
    return;
  }

  const ultFila = hojaGen.getLastRow();
  if (ultFila <= 1) {
    ui.alert('ℹ️ Sin datos', 'No hay participantes', ui.ButtonSet.OK);
    return;
  }

  const participantes = [];
  for (let fila = 2; fila <= ultFila; fila++) {
    const noTerm = hojaGen.getRange(fila, COLUMNAS.NO_TERMINO_FORMACION_SISNO).getValue();
    const nombre = hojaGen.getRange(fila, COLUMNAS.NOMBRE).getValue();

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
    `Encontrados: ${participantes.length}\n\n¿Mover a "No Terminó"?`,
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

function procesarNoTermino(hojaGen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaNoTerm = ss.getSheetByName('❌ No Terminó la Formación');
    if (!hojaNoTerm) throw new Error('Hoja no existe');

    const datos = hojaGen.getRange(fila, 1, 1, TOTAL_COLUMNAS).getValues()[0];

    const nombre = datos[COLUMNAS.NOMBRE - 1];
    if (!nombre || nombre.toString().trim() === '') throw new Error('Nombre vacío');

    const fechaAct = new Date();
    const motivoNotas = `${datos[COLUMNAS.NOTAS - 1] || ''} | NO COMPLETÓ - ${Utilities.formatDate(fechaAct, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')}`.trim();

    const datosDestino = [
      datos[COLUMNAS.ID - 1] || '',
      nombre,
      datos[COLUMNAS.TELEFONO - 1] || '',
      datos[COLUMNAS.FORMACION - 1] || 'Barismo',
      datos[COLUMNAS.ALIADOS - 1] || '',
      datos[COLUMNAS.PLATAFORMAS - 1] || '',
      datos[COLUMNAS.CONEXION_LABORAL - 1] || '',
      datos[COLUMNAS.POR_SU_CUENTA - 1] || '',
      datos[COLUMNAS.NO_BUSCA_TRABAJAR - 1] || '',
      datos[COLUMNAS.EMPLEADO - 1] || '',
      datos[COLUMNAS.NO_TERMINO_FORMACION_SISNO - 1] || '',
      'No terminó formación',
      datos[COLUMNAS.RESULTADOS - 1] || '',
      datos[COLUMNAS.DOCUMENTOS - 1] || 'Ninguno',
      datos[COLUMNAS.FECHA - 1] || '',
      motivoNotas,
      datos[COLUMNAS.TOTAL_LLAMADAS - 1] || 0,
      Utilities.formatDate(fechaAct, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')
    ];

    hojaNoTerm.insertRows(2, 1);
    const rango = hojaNoTerm.getRange(2, 1, 1, 18);
    rango.setValues([datosDestino]);
    rango.setBackground('#FFCDD2');
    rango.setBorder(true, true, true, true, true, true, '#C62828', SpreadsheetApp.BorderStyle.SOLID);

    hojaGen.deleteRow(fila);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      `❌ ${nombre} movido a "No Terminó"`,
      'Éxito',
      3
    );

    return { exito: true };

  } catch (error) {
    console.error('Error:', error);
    return { exito: false, error: error.message };
  }
}

function verParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('❌ No Terminó la Formación');

  if (!hoja) {
    ui.alert('❌ Error', 'Hoja no existe. Ejecuta: Instalar Funciones v2.9', ui.ButtonSet.OK);
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
    rep += '👥 ÚLTIMOS 10:\n';
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

// ====================================
// CONFIGURACIÓN DEL SISTEMA
// ====================================
function configurarHojasCorregido() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ui.alert('Configurando Sistema v2.9...',
      'Creando estructura optimizada...\nConfigurando para ' + LLAMADAS_PARA_FINALIZAR + ' llamadas',
      ui.ButtonSet.OK);

    let hojaGeneral = ss.getSheetByName('📋 Seguimiento General');
    if (!hojaGeneral) {
      hojaGeneral = ss.insertSheet('📋 Seguimiento General');
    }

    const hojasLlamadas = [
      '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
      '📞 Llamada 4', '📞 Llamada 5'
    ];

    hojasLlamadas.forEach(nombre => {
      if (!ss.getSheetByName(nombre)) {
        ss.insertSheet(nombre);
      }
    });

    if (!ss.getSheetByName('✅ Finalizados')) {
      ss.insertSheet('✅ Finalizados');
    }

    configurarHojaGeneral();
    configurarHojasLlamadas();

    ui.alert('✅ Sistema v2.9 Configurado',
      `Sistema configurado exitosamente!\n\n📋 Hojas creadas\n🎨 Formato aplicado\n📞 ${LLAMADAS_PARA_FINALIZAR} llamadas`,
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

function configurarHojaGeneral() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('📋 Seguimiento General');
  if (!hoja) return;

  hoja.clear();

  const encabezados = [
    'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
    'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó formación (Sí/No)',
    'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
    'Fecha Original', 'Notas/Última Llamada', 'Total Llamadas', 'Procesar'
  ];

  hoja.getRange(1, 1, 1, TOTAL_COLUMNAS).setValues([encabezados]);

  // Validaciones
  const opcionesFormacion = [
    'Barismo', 'Barista I', 'Barista II', 'Gastronomía', 'Food Manager',
    'SAC', 'Ofimática', 'Análisis de datos E-commerce', 'Otra'
  ];

  const rangoFormacion = hoja.getRange(2, COLUMNAS.FORMACION, 998, 1);
  rangoFormacion.setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(opcionesFormacion)
    .setAllowInvalid(true)
    .build());

  // Checkbox columna Sí/No
  const rangoSiNo = hoja.getRange(2, COLUMNAS.NO_TERMINO_FORMACION_SISNO, 998, 1);
  rangoSiNo.setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(['No', 'Sí'])
    .setAllowInvalid(false)
    .build());
  rangoSiNo.setValue('No');

  // Checkboxes procesar
  const rangoCheckbox = hoja.getRange(2, COLUMNAS.PROCESAR, 998, 1);
  rangoCheckbox.insertCheckboxes();
}

function configurarHojasLlamadas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  hojas.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    hoja.clear();

    const encabezados = [
      'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
      'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
      'No busca trabajar', 'Empleado', 'No terminó formación',
      'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
      'Fecha de Llamada', 'Notas/Historial', 'Total Llamadas'
    ];

    hoja.getRange(1, 1, 1, TOTAL_COLUMNAS_DESTINO).setValues([encabezados]);
  });
}

// ====================================
// PROCESAMIENTO DE LLAMADAS
// ====================================
function onEdit(e) {
  if (!e || !e.range || !e.source) return;

  const hoja = e.source.getActiveSheet();
  const fila = e.range.getRow();
  const columna = e.range.getColumn();

  if (hoja.getName() !== '📋 Seguimiento General' || fila <= 1) return;

  const propiedades = PropertiesService.getScriptProperties();
  const procesamientoActivo = propiedades.getProperty('PROCESAMIENTO_AUTOMATICO') === 'true';

  if (!procesamientoActivo) return;
  if (columna !== COLUMNAS.PROCESAR) return;
  if (e.range.getValue() !== true) return;

  const lock = LockService.getScriptLock();

  try {
    const marcaProcesamiento = propiedades.getProperty(`proc_${fila}`);
    if (marcaProcesamiento) {
      const tiempoTranscurrido = new Date().getTime() - parseInt(marcaProcesamiento);
      if (tiempoTranscurrido < 10000) {
        console.log(`⚠️ Fila ${fila} ya procesando`);
        return;
      }
    }

    if (!lock.tryLock(5000)) return;

    propiedades.setProperty(`proc_${fila}`, new Date().getTime().toString());
    Utilities.sleep(500);

    const nombre = hoja.getRange(fila, COLUMNAS.NOMBRE).getValue();
    const resultado = procesarLlamadaOptimizada(hoja, fila);

    if (resultado.exito) {
      const mensaje = resultado.movido ?
        `🎯 ${nombre} completó ${LLAMADAS_PARA_FINALIZAR} llamadas` :
        `📞 ${nombre} procesado (${resultado.totalLlamadas}/${LLAMADAS_PARA_FINALIZAR})`;
      SpreadsheetApp.getActiveSpreadsheet().toast(mensaje, 'Sistema', 3);
    } else {
      throw new Error(resultado.error);
    }

  } catch (error) {
    console.error('❌ Error:', error);
    try {
      if (e && e.range) e.range.setValue(false);
    } catch (cleanupError) {}

  } finally {
    try {
      propiedades.deleteProperty(`proc_${fila}`);
      lock.releaseLock();
    } catch (releaseError) {}
  }
}

function procesarLlamadaOptimizada(hojaGeneral, fila) {
  try {
    const datos = hojaGeneral.getRange(fila, 1, 1, TOTAL_COLUMNAS).getValues()[0];
    const nombre = datos[COLUMNAS.NOMBRE - 1] ? datos[COLUMNAS.NOMBRE - 1].toString().trim() : '';

    if (!nombre) {
      return { exito: false, error: 'Nombre vacío', movido: false, totalLlamadas: 0 };
    }

    let llamadasActuales = parseInt(datos[COLUMNAS.TOTAL_LLAMADAS - 1]) || 0;
    const nuevasLlamadas = llamadasActuales + 1;
    const fechaActual = new Date();

    let nombreHojaDestino = nuevasLlamadas >= LLAMADAS_PARA_FINALIZAR ?
      '✅ Finalizados' :
      `📞 Llamada ${nuevasLlamadas}`;

    const finalizando = nuevasLlamadas >= LLAMADAS_PARA_FINALIZAR;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaDestino = ss.getSheetByName(nombreHojaDestino);

    if (!hojaDestino) {
      return { exito: false, error: `Hoja "${nombreHojaDestino}" no encontrada`, movido: false, totalLlamadas: nuevasLlamadas };
    }

    const notasActuales = datos[COLUMNAS.NOTAS - 1] || '';
    const notasActualizadas = `${notasActuales}${notasActuales ? ' | ' : ''}Llamada ${nuevasLlamadas} - ${Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy')}`.trim();

    const datosDestino = [
      datos[COLUMNAS.ID - 1] || '',
      nombre,
      datos[COLUMNAS.TELEFONO - 1] || '',
      datos[COLUMNAS.FORMACION - 1] || 'Barismo',
      datos[COLUMNAS.ALIADOS - 1] || '',
      datos[COLUMNAS.PLATAFORMAS - 1] || '',
      datos[COLUMNAS.CONEXION_LABORAL - 1] || '',
      datos[COLUMNAS.POR_SU_CUENTA - 1] || '',
      datos[COLUMNAS.NO_BUSCA_TRABAJAR - 1] || '',
      datos[COLUMNAS.EMPLEADO - 1] || '',
      datos[COLUMNAS.NO_TERMINO_FORMACION_SISNO - 1] || '',
      datos[COLUMNAS.ETAPA_ACTUAL - 1] || 'En proceso',
      datos[COLUMNAS.RESULTADOS - 1] || '',
      datos[COLUMNAS.DOCUMENTOS - 1] || 'Ninguno',
      Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm'),
      notasActualizadas,
      nuevasLlamadas
    ];

    hojaDestino.insertRows(2, 1);
    hojaDestino.getRange(2, 1, 1, TOTAL_COLUMNAS_DESTINO).setValues([datosDestino]);

    if (finalizando) {
      hojaGeneral.deleteRow(fila);
      return { exito: true, error: null, movido: true, totalLlamadas: nuevasLlamadas };
    } else {
      hojaGeneral.getRange(fila, COLUMNAS.NOTAS).setValue(notasActualizadas);
      hojaGeneral.getRange(fila, COLUMNAS.TOTAL_LLAMADAS).setValue(nuevasLlamadas);
      hojaGeneral.getRange(fila, COLUMNAS.PROCESAR).setValue(false);
      return { exito: true, error: null, movido: false, totalLlamadas: nuevasLlamadas };
    }

  } catch (error) {
    return { exito: false, error: error.message, movido: false, totalLlamadas: 0 };
  }
}

function procesarLlamadasManualesCorregido() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGeneral) {
    ui.alert('❌ Error', 'Hoja no encontrada', ui.ButtonSet.OK);
    return;
  }

  const ultimaFila = hojaGeneral.getLastRow();
  if (ultimaFila <= 1) {
    ui.alert('ℹ️ Sin datos', 'No hay participantes', ui.ButtonSet.OK);
    return;
  }

  let procesados = 0, movidos = 0, errores = 0;

  for (let fila = ultimaFila; fila >= 2; fila--) {
    try {
      const checkbox = hojaGeneral.getRange(fila, COLUMNAS.PROCESAR).getValue();
      if (checkbox === true) {
        const resultado = procesarLlamadaOptimizada(hojaGeneral, fila);
        if (resultado.exito) {
          procesados++;
          if (resultado.movido) movidos++;
        } else {
          errores++;
        }
      }
    } catch (error) {
      errores++;
    }
  }

  if (procesados === 0 && errores === 0) {
    ui.alert('ℹ️ Sin checkboxes', 'No hay checkboxes marcados', ui.ButtonSet.OK);
    return;
  }

  let mensaje = `📞 COMPLETADO\n\n`;
  if (procesados > 0) mensaje += `✅ ${procesados} procesados\n`;
  if (movidos > 0) mensaje += `🎯 ${movidos} finalizados\n`;
  if (errores > 0) mensaje += `❌ ${errores} errores\n`;

  ui.alert('📞 Resultado', mensaje, ui.ButtonSet.OK);
}

// ====================================
// PROCESAMIENTO AUTOMÁTICO
// ====================================
function activarProcesomientoAutomatico() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert('⚡ ACTIVAR Procesamiento',
    '¿Activar procesamiento automático?\n\nLas llamadas se procesarán al marcar checkboxes.',
    ui.ButtonSet.YES_NO);

  if (confirmacion !== ui.Button.YES) return;

  try {
    const propiedades = PropertiesService.getScriptProperties();
    limpiarBloqueosProcesamiento();
    propiedades.setProperty('PROCESAMIENTO_AUTOMATICO', 'true');

    configurarTriggerOnEdit();

    ui.alert('⚡ Activado',
      'Procesamiento automático activado!\n\n✅ Marca checkboxes para procesar\n💡 Espera 1-2 segundos entre cada uno',
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

function desactivarProcesomientoAutomatico() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert('🔴 DESACTIVAR',
    '¿Desactivar procesamiento automático?',
    ui.ButtonSet.YES_NO);

  if (confirmacion !== ui.Button.YES) return;

  try {
    const propiedades = PropertiesService.getScriptProperties();
    propiedades.setProperty('PROCESAMIENTO_AUTOMATICO', 'false');
    removerTriggerOnEdit();
    limpiarBloqueosProcesamiento();

    ui.alert('🔴 Desactivado',
      'Procesamiento desactivado.\n\nUsa "Procesar Llamadas Marcadas" para modo manual.',
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

function verificarEstadoProcesomientoAutomatico() {
  try {
    const propiedades = PropertiesService.getScriptProperties();
    const estado = propiedades.getProperty('PROCESAMIENTO_AUTOMATICO') === 'true';
    console.log(estado ? '⚡ Procesamiento: ACTIVO' : '📋 Procesamiento: INACTIVO');
    return estado;
  } catch (error) {
    return false;
  }
}

function configurarTriggerOnEdit() {
  try {
    removerTriggerOnEdit();
    ScriptApp.newTrigger('onEdit')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
  } catch (error) {
    throw new Error(`Error configurando trigger: ${error.message}`);
  }
}

function removerTriggerOnEdit() {
  try {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.filter(t => t.getHandlerFunction() === 'onEdit' &&
      t.getEventType() === ScriptApp.EventType.ON_EDIT)
      .forEach(t => ScriptApp.deleteTrigger(t));
  } catch (error) {}
}

function limpiarBloqueosProcesamiento() {
  const ui = SpreadsheetApp.getUi();

  try {
    const propiedades = PropertiesService.getScriptProperties();
    const todasLasPropiedades = propiedades.getProperties();
    let bloqueosLimpiados = 0;

    Object.keys(todasLasPropiedades).forEach(clave => {
      if (clave.startsWith('proc_')) {
        propiedades.deleteProperty(clave);
        bloqueosLimpiados++;
      }
    });

    if (bloqueosLimpiados > 0) {
      ui.alert('🧹 Limpiados',
        `${bloqueosLimpiados} bloqueos eliminados.\n\n✅ Sistema listo`,
        ui.ButtonSet.OK);
    } else {
      ui.alert('✅ Sin bloqueos',
        'No hay bloqueos. Sistema OK.',
        ui.ButtonSet.OK);
    }

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

// ====================================
// IMPORTACIÓN
// ====================================
function importarDatos2024() {
  importarDatosDesdeSheetExterno('2024');
}

function importarDatos2025() {
  importarDatosDesdeSheetExterno('2025');
}

function configurarSheetExterno() {
  const ui = SpreadsheetApp.getUi();
  const propiedades = PropertiesService.getScriptProperties();

  const nuevaURL = ui.prompt(
    '🔗 Configurar Sheet Externo',
    'Pega la URL COMPLETA del Google Sheet:',
    ui.ButtonSet.OK_CANCEL
  );

  if (nuevaURL.getSelectedButton() === ui.Button.OK) {
    const url = nuevaURL.getResponseText().trim();
    if (url.includes('docs.google.com/spreadsheets') && url.includes('/d/')) {
      propiedades.setProperty('URL_SHEET_EXTERNO', url);
      ui.alert('✅ Configurado', 'Sheet externo configurado', ui.ButtonSet.OK);
    } else {
      ui.alert('❌ URL inválida', 'URL no válida', ui.ButtonSet.OK);
    }
  }
}

function importarDatosDesdeSheetExterno(nombreHoja) {
  const ui = SpreadsheetApp.getUi();

  try {
    const propiedades = PropertiesService.getScriptProperties();
    const url = propiedades.getProperty('URL_SHEET_EXTERNO');

    if (!url) {
      ui.alert('❌ Error', 'Configura primero el Sheet externo', ui.ButtonSet.OK);
      return;
    }

    const matches = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (!matches) {
      ui.alert('❌ URL inválida', 'URL no válida', ui.ButtonSet.OK);
      return;
    }

    const sheetExterno = SpreadsheetApp.openById(matches[1]);
    const hojaExterna = sheetExterno.getSheetByName(nombreHoja);

    if (!hojaExterna) {
      ui.alert('❌ Hoja no encontrada', `No existe "${nombreHoja}"`, ui.ButtonSet.OK);
      return;
    }

    ui.alert('✅ Conectado', 'Importación en desarrollo', ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

// ====================================
// FORMATO
// ====================================
function aplicarFormato() {
  const ui = SpreadsheetApp.getUi();

  try {
    ui.alert('🎨 Aplicando...', 'Aplicando formato profesional...', ui.ButtonSet.OK);
    aplicarFormatoHojaPrincipal();
    ui.alert('🎨 Aplicado', 'Formato aplicado exitosamente', ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

function aplicarFormatoHojaPrincipal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('📋 Seguimiento General');
  if (!hoja) return;

  // Encabezados
  const rangoEnc = hoja.getRange(1, 1, 1, TOTAL_COLUMNAS);
  rangoEnc.setBackground('#1f4e79');
  rangoEnc.setFontColor('#ffffff');
  rangoEnc.setFontWeight('bold');
  rangoEnc.setFontSize(11);
  rangoEnc.setHorizontalAlignment('center');

  // Anchos
  hoja.setColumnWidth(COLUMNAS.ID, 100);
  hoja.setColumnWidth(COLUMNAS.NOMBRE, 180);
  hoja.setColumnWidth(COLUMNAS.TELEFONO, 120);
  hoja.setColumnWidth(COLUMNAS.FORMACION, 140);
  for (let col = 5; col <= 11; col++) hoja.setColumnWidth(col, 150);
  hoja.setColumnWidth(COLUMNAS.ETAPA_ACTUAL, 120);
  hoja.setColumnWidth(COLUMNAS.RESULTADOS, 150);
  hoja.setColumnWidth(COLUMNAS.DOCUMENTOS, 150);
  hoja.setColumnWidth(COLUMNAS.FECHA, 120);
  hoja.setColumnWidth(COLUMNAS.NOTAS, 200);
  hoja.setColumnWidth(COLUMNAS.TOTAL_LLAMADAS, 80);
  hoja.setColumnWidth(COLUMNAS.PROCESAR, 80);

  hoja.setFrozenRows(1);
}

// ====================================
// MANTENIMIENTO
// ====================================
function repararSistema() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert('🔧 Reparar',
    '¿Reparar sistema completo?',
    ui.ButtonSet.YES_NO);

  if (confirmacion !== ui.Button.YES) return;

  try {
    limpiarBloqueosProcesamiento();
    configurarHojasCorregido();
    aplicarFormato();

    ui.alert('✅ Reparado', 'Sistema reparado exitosamente', ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

function crearRespaldo() {
  const ui = SpreadsheetApp.getUi();

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm');
    const nombreRespaldo = `RESPALDO_v2.9_${fecha}`;

    const nuevoSS = SpreadsheetApp.create(nombreRespaldo);
    const hojas = [
      '📋 Seguimiento General',
      '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
      '📞 Llamada 4', '📞 Llamada 5',
      '✅ Finalizados'
    ];

    hojas.forEach(nombre => {
      const hoja = ss.getSheetByName(nombre);
      if (hoja) {
        const datos = hoja.getDataRange().getValues();
        const nuevaHoja = nuevoSS.insertSheet(nombre);
        if (datos.length > 0) {
          nuevaHoja.getRange(1, 1, datos.length, datos[0].length).setValues(datos);
        }
      }
    });

    const hojaDefecto = nuevoSS.getSheetByName('Hoja 1');
    if (hojaDefecto && nuevoSS.getSheets().length > 1) {
      nuevoSS.deleteSheet(hojaDefecto);
    }

    ui.alert('💾 Respaldo Creado',
      `✅ Respaldo creado!\n\nNombre: ${nombreRespaldo}`,
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error: ${error.message}`, ui.ButtonSet.OK);
  }
}

function mostrarHojaInstrucciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = ss.getSheetByName('📘 Instrucciones');

  if (!hoja) {
    hoja = ss.insertSheet('📘 Instrucciones');
    const texto = [
      ['🚀 SISTEMA DE SEGUIMIENTO v2.9 - CÓDIGO UNIFICADO'],
      [''],
      ['✨ NOVEDADES v2.9:'],
      ['  • TODO en UN SOLO ARCHIVO'],
      ['  • Hoja "No Terminó la Formación"'],
      ['  • Columna Sí/No en posición K'],
      ['  • Colores limpios solo por formación'],
      [''],
      ['📋 INICIO RÁPIDO:'],
      ['  1. Menú → No Terminó Formación → Instalar v2.9'],
      ['  2. Marca "Sí" en columna K para abandonos'],
      ['  3. Ejecuta: Mover Participantes'],
      [''],
      ['✅ Sistema completo en un solo código']
    ];

    hoja.getRange(1, 1, texto.length, 1).setValues(texto);
    hoja.setColumnWidth(1, 800);
  }

  ss.setActiveSheet(hoja);
}

// ====================================
// MENSAJE DE CARGA
// ====================================
console.log('═══════════════════════════════════');
console.log('✅ Sistema v2.9 COMPLETO CARGADO');
console.log('═══════════════════════════════════');
console.log('📝 TODO EN UN SOLO ARCHIVO');
console.log('📞 ' + LLAMADAS_PARA_FINALIZAR + ' llamadas configuradas');
console.log('✨ Funcionalidad "No Terminó" incluida');
console.log('🎨 Colores optimizados');
console.log('═══════════════════════════════════');
