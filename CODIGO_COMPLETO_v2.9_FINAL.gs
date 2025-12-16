// ====================================
// SISTEMA DE SEGUIMIENTO DE PRÁCTICAS v2.9 - CÓDIGO COMPLETO
// Incluye TODAS las funciones originales + Mejoras v2.9
// ====================================

const LLAMADAS_PARA_FINALIZAR = 6;

// MAPEO DE COLUMNAS v2.9
const COLUMNAS = {
  ID: 1,
  NOMBRE: 2,
  TELEFONO: 3,
  FORMACION: 4,
  // COLUMNAS DE ETAPAS (5-11)
  ALIADOS: 5,
  PLATAFORMAS: 6,
  CONEXION_LABORAL: 7,
  POR_SU_CUENTA: 8,
  NO_BUSCA_TRABAJAR: 9,
  EMPLEADO: 10,
  NO_TERMINO_FORMACION: 11,  // NUEVA v2.9: Ahora tiene dropdown Sí/No
  // COLUMNAS ORIGINALES (12-18)
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

// COLORES PARA COLUMNAS DE ETAPAS
const COLORES_ETAPAS = {
  ALIADOS: { fondo: '#B3D9FF', texto: '#003366', nombre: 'Azul claro' },
  PLATAFORMAS: { fondo: '#D9C3FF', texto: '#4B0082', nombre: 'Morado claro' },
  CONEXION_LABORAL: { fondo: '#B3FFB3', texto: '#006600', nombre: 'Verde claro' },
  POR_SU_CUENTA: { fondo: '#FFD9B3', texto: '#CC5500', nombre: 'Naranja claro' },
  NO_BUSCA_TRABAJAR: { fondo: '#E0E0E0', texto: '#333333', nombre: 'Gris claro' },
  EMPLEADO: { fondo: '#C5E8C5', texto: '#006600', nombre: 'Verde oscuro claro' },
  NO_TERMINO_FORMACION: { fondo: '#FFCCCC', texto: '#990000', nombre: 'Rojo claro' }
};

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🎓 Sistema de Seguimiento')
    .addItem('📖 Ver Instrucciones', 'mostrarHojaInstrucciones')
    .addSeparator()
    .addSubMenu(ui.createMenu('🔧 Configuración')
      .addItem('⚙️ Configuración Inicial', 'configurarHojasCorregido')
      .addItem('🔄 ACTUALIZAR Estructura de Tabla', 'actualizarEstructuraTabla')
      .addItem('🔗 Configurar Google Sheet Externo', 'configurarSheetExterno')
      .addItem('🎨 Aplicar Diseño Profesional', 'aplicarFormato')
      .addItem('⚙️ Ver Configuración Actual', 'verConfiguracion'))
    .addSeparator()
    .addSubMenu(ui.createMenu('📥 Importación')
      .addItem('📥 Importar Datos 2024', 'importarDatos2024')
      .addItem('📥 Importar Datos 2025', 'importarDatos2025')
      .addItem('📥 Importar Desde Otra Hoja', 'importarDatosPersonalizados')
      .addItem('🧪 Probar Conexión Externa', 'probarConexionSheetExterno')
      .addItem('🎯 Finalizar Participantes por Etapa', 'finalizarParticipantesPorEtapa'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🆕 No Terminó Formación')
      .addItem('✨ INSTALAR Funcionalidad v2.9', 'instalarNoTerminoFormacion')
      .addItem('🔄 Mover Participantes que NO Terminaron', 'moverParticipantesNoTerminaron')
      .addItem('📊 Ver Reporte de Abandonos', 'verParticipantesNoTerminaron'))
    .addSeparator()
    .addItem('⚡ ACTIVAR Procesamiento Automático', 'activarProcesomientoAutomatico')
    .addItem('🔴 DESACTIVAR Procesamiento Automático', 'desactivarProcesomientoAutomatico')
    .addItem('🔄 Procesar Llamadas Marcadas', 'procesarLlamadasManualesCorregido')
    .addItem('🧪 Procesar Una Llamada (Prueba)', 'procesarUnaLlamadaPrueba')
    .addSeparator()
    .addSubMenu(ui.createMenu('📊 Reportes y Análisis')
      .addItem('📈 Generar Reporte Completo', 'generarReporte')
      .addItem('🔍 Diagnosticar Sistema', 'diagnosticarSistema')
      .addItem('🔍 Diagnosticar Doble Procesamiento', 'diagnosticarDobleProcesamiento')
      .addItem('🔍 Verificar Checkboxes', 'verificarCheckboxes'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🛠️ Mantenimiento')
      .addItem('🔧 Reparar Sistema', 'repararSistema')
      .addItem('🧹 Limpiar Datos Vacíos', 'limpiarDatosVacios')
      .addItem('🧹 Limpiar Bloqueos de Procesamiento', 'limpiarBloqueosProcesamiento')
      .addItem('💾 Crear Respaldo', 'crearRespaldo')
      .addItem('🔄 Resetear Sistema Completo', 'resetearSistema'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🎯 Gestión de Etapas')
      .addItem('🔧 Configurar Desplegable Etapas', 'configurarDesplegableEtapaActual')
      .addItem('🔄 Actualizar Etapas por Llamadas', 'actualizarEtapaSegunLlamadas')
      .addItem('📊 Reporte de Etapas', 'generarReporteEtapas')
      .addItem('🔍 Buscar por Etapa', 'buscarPorEtapa'))
    .addToUi();

  verificarEstadoProcesomientoAutomatico();
}

// ====================================
// 🆕 FUNCIONALIDAD v2.9 - NO TERMINÓ LA FORMACIÓN
// ====================================

function instalarNoTerminoFormacion() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🚀 Instalar Funcionalidad v2.9',
    '✅ Se instalará:\n\n' +
    '1. Hoja "❌ No Terminó la Formación"\n' +
    '2. Columna "No terminó formación (Sí/No)" en posición K\n' +
    '3. Eliminar columna vieja sin Sí/No\n' +
    '4. Limpieza de colores de columnas de etapas\n' +
    '5. Solo colores por formación\n\n' +
    '⚠️ NO borra datos existentes\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let pasos = [];

    // PASO 1: Crear hoja "No Terminó la Formación"
    if (!ss.getSheetByName('❌ No Terminó la Formación')) {
      crearHojaNoTerminoFormacion();
      pasos.push('✅ Hoja "No Terminó la Formación" creada');
    } else {
      pasos.push('ℹ️ Hoja "No Terminó" ya existe');
    }

    // PASO 2: Reemplazar columna vieja por nueva con Sí/No en columna K
    const resultado = reemplazarColumnaNoTermino();
    pasos.push(resultado.mensaje);

    // PASO 3: Limpiar colores de columnas de etapas
    limpiarColoresColumnasEtapas();
    pasos.push('✅ Colores de columnas limpiados');

    // PASO 4: Aplicar solo colores por formación
    aplicarSoloColoresFormacion();
    pasos.push('✅ Colores por formación aplicados');

    // RESUMEN
    let mensaje = '🎉 INSTALACIÓN COMPLETADA v2.9\n\n';
    pasos.forEach(p => mensaje += `${p}\n`);
    mensaje += '\n📋 PRÓXIMOS PASOS:\n';
    mensaje += '1. Recarga la página (F5)\n';
    mensaje += '2. Marca "Sí" en columna K para participantes que NO terminaron\n';
    mensaje += '3. Ejecuta: "Mover Participantes que NO Terminaron"\n\n';
    mensaje += '✅ Sistema v2.9 listo!';

    ui.alert('✅ Instalación Exitosa', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', `Error en instalación: ${error.message}`, ui.ButtonSet.OK);
  }
}

function crearHojaNoTerminoFormacion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.insertSheet('❌ No Terminó la Formación');

  const encabezados = [
    'Creamos ID',
    'Nombre Completo',
    'Teléfono',
    'Formación',
    'Aliados',
    'Plataformas',
    'Conexión laboral',
    'Por su cuenta',
    'No busca trabajar',
    'Empleado',
    'No terminó formación',
    'Etapa Actual',
    'Resultados Obtenidos',
    'Documentos Faltantes',
    'Fecha Original',
    'Motivo/Notas',
    'Total Llamadas',
    'Fecha Abandono'
  ];

  hoja.getRange(1, 1, 1, 18).setValues([encabezados]);

  // Formato encabezados (color rojo para hoja de abandonos)
  const rangoEnc = hoja.getRange(1, 1, 1, 18);
  rangoEnc.setBackground('#C62828');
  rangoEnc.setFontColor('#FFFFFF');
  rangoEnc.setFontWeight('bold');
  rangoEnc.setFontSize(11);
  rangoEnc.setHorizontalAlignment('center');

  // Anchos de columna
  hoja.setColumnWidth(1, 100);  // ID
  hoja.setColumnWidth(2, 180);  // Nombre
  hoja.setColumnWidth(3, 120);  // Teléfono
  hoja.setColumnWidth(4, 140);  // Formación
  for (let i = 5; i <= 11; i++) hoja.setColumnWidth(i, 150);  // Etapas
  hoja.setColumnWidth(12, 120);  // Etapa Actual
  hoja.setColumnWidth(13, 140);  // Resultados
  hoja.setColumnWidth(14, 150);  // Documentos
  hoja.setColumnWidth(15, 140);  // Fecha Original
  hoja.setColumnWidth(16, 250);  // Motivo/Notas
  hoja.setColumnWidth(17, 100);  // Total Llamadas
  hoja.setColumnWidth(18, 140);  // Fecha Abandono

  hoja.setFrozenRows(1);
}

function reemplazarColumnaNoTermino() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const COLUMNA_K = 11;
  let hojasActualizadas = 0;

  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  hojas.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const cols = hoja.getLastColumn();
    const encs = hoja.getRange(1, 1, 1, cols).getValues()[0];

    // PASO 1: Buscar y ELIMINAR columna vieja "No terminó la formación" (sin Sí/No)
    for (let i = 0; i < encs.length; i++) {
      const encabezado = encs[i] ? encs[i].toString().toLowerCase() : '';
      // Si encuentra "no terminó" pero NO tiene "sí/no", es la vieja - ELIMINARLA
      if (encabezado.includes('no terminó') &&
          encabezado.includes('formación') &&
          !encabezado.includes('sí') &&
          !encabezado.includes('no)')) {
        hoja.deleteColumn(i + 1);
        SpreadsheetApp.flush();
        break;
      }
    }

    // Refrescar datos después de eliminar
    const colsActual = hoja.getLastColumn();
    const encsActual = hoja.getRange(1, 1, 1, colsActual).getValues()[0];

    // PASO 2: Verificar si ya existe la nueva en columna K
    if (colsActual >= COLUMNA_K) {
      const valorK = hoja.getRange(1, COLUMNA_K).getValue();
      const valorKStr = valorK ? valorK.toString().toLowerCase() : '';
      if (valorKStr.includes('no terminó') && (valorKStr.includes('sí') || valorKStr.includes('no)'))) {
        return; // Ya existe la nueva columna
      }
    }

    // PASO 3: Insertar nueva columna en K
    if (colsActual < COLUMNA_K) {
      // Si hay menos de 11 columnas, agregar hasta llegar a K
      while (hoja.getLastColumn() < COLUMNA_K) {
        hoja.insertColumnAfter(hoja.getLastColumn());
      }
    } else if (colsActual >= COLUMNA_K) {
      // Si ya hay columna K, insertar antes
      hoja.insertColumnBefore(COLUMNA_K);
    }

    const nuevaCol = COLUMNA_K;

    // PASO 4: Configurar nueva columna
    if (nombreHoja === '📋 Seguimiento General') {
      hoja.getRange(1, nuevaCol).setValue('No terminó formación (Sí/No)');
      hoja.getRange(1, nuevaCol)
        .setBackground('#FFF9C4')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');

      const ultFila = hoja.getLastRow();
      if (ultFila > 1) {
        const rango = hoja.getRange(2, nuevaCol, ultFila - 1, 1);
        const validacion = SpreadsheetApp.newDataValidation()
          .requireValueInList(['No', 'Sí'])
          .setAllowInvalid(false)
          .setHelpText('Selecciona Sí si el participante NO terminó la formación')
          .build();
        rango.setDataValidation(validacion);
        rango.setValue('No');
      }

      hoja.setColumnWidth(nuevaCol, 150);
    } else {
      hoja.getRange(1, nuevaCol).setValue('No terminó formación');
      hoja.getRange(1, nuevaCol)
        .setBackground('#FFF9C4')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');
      hoja.setColumnWidth(nuevaCol, 140);
    }

    hojasActualizadas++;
  });

  return {
    mensaje: hojasActualizadas > 0 ?
      `✅ Columna "Sí/No" agregada en ${hojasActualizadas} hojas` :
      'ℹ️ Columna ya existe'
  };
}

function limpiarColoresColumnasEtapas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📋 Seguimiento General',
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  const columnasLimpiar = [
    'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó formación'
  ];

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
        // Limpiar color de las celdas de datos (dejar blanco)
        hoja.getRange(2, col, ultFila - 1, 1).setBackground('#FFFFFF');

        // Encabezado con color estándar
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
    'Barista I': '#E3F2FD',
    'Barista II': '#BBDEFB',
    'Barista III': '#90CAF9',
    'Barista IV': '#64B5F6',
    'Barismo': '#BBDEFB',
    'Barismo 1': '#BBDEFB',
    'Barismo 2': '#BBDEFB',
    'Barismo 3': '#BBDEFB',
    'Barismo 4': '#BBDEFB',
    'Barismo 5': '#BBDEFB',
    'Barismo 6': '#BBDEFB',
    'Barismo 7': '#BBDEFB',
    'Barismo 8': '#BBDEFB',
    'Barismo 9': '#BBDEFB',
    'Barismo 10': '#BBDEFB',
    'Gastronomía': '#FFECB3',
    'Gastronomía I': '#FFF3E0',
    'Gastronomía II': '#FFE0B2',
    'Gastronomía III': '#FFCC80',
    'Gastronomía IV': '#FFB74D',
    'Gastronomía V': '#FFA726',
    'Gastronomía 1': '#FFF3E0',
    'Gastronomía 2': '#FFE0B2',
    'Gastronomía 3': '#FFCC80',
    'Gastronomía 4': '#FFB74D',
    'Gastronomía 5': '#FFA726',
    'Food Manager': '#E8F5E8',
    'Panadería': '#F3E5AB',
    'Repostería': '#F8BBD9',
    'Sommelier': '#E1BEE7',
    'Análisis de datos E-commerce': '#B2EBF2',
    'SAC': '#C5E1A5',
    'Ofimática': '#D1C4E9',
    'Otra': '#E0E0E0'
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

        // Buscar coincidencia exacta primero
        if (colores[formStr]) {
          color = colores[formStr];
        }
        // Buscar patrones
        else if (formStr.toLowerCase().includes('análisis') || formStr.toLowerCase().includes('datos')) {
          color = colores['Análisis de datos E-commerce'];
        }
        else if (formStr.toLowerCase() === 'sac') {
          color = colores['SAC'];
        }
        else if (formStr.toLowerCase().includes('ofimatica')) {
          color = colores['Ofimática'];
        }
        else if (formStr.toLowerCase().includes('food') && formStr.toLowerCase().includes('manager')) {
          color = colores['Food Manager'];
        }
        else if (formStr.toLowerCase().includes('barista') || formStr.toLowerCase().includes('barismo')) {
          color = colores['Barismo'];
        }
        else if (formStr.toLowerCase().includes('gastronomía') || formStr.toLowerCase().includes('gastronom')) {
          color = colores['Gastronomía'];
        }
        else if (formStr.toLowerCase().includes('panadería')) {
          color = colores['Panadería'];
        }
        else if (formStr.toLowerCase().includes('repostería')) {
          color = colores['Repostería'];
        }
        else if (formStr.toLowerCase().includes('sommelier')) {
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

function moverParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGen = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGen) {
    ui.alert('❌ Error', 'Hoja "Seguimiento General" no encontrada', ui.ButtonSet.OK);
    return;
  }

  if (!ss.getSheetByName('❌ No Terminó la Formación')) {
    ui.alert('❌ Error',
      'Primero debes ejecutar:\n\nNo Terminó Formación → INSTALAR Funcionalidad v2.9',
      ui.ButtonSet.OK);
    return;
  }

  const ultFila = hojaGen.getLastRow();
  if (ultFila <= 1) {
    ui.alert('ℹ️ Sin datos', 'No hay participantes en Seguimiento General', ui.ButtonSet.OK);
    return;
  }

  // Buscar participantes con "Sí" en columna K
  const participantes = [];
  for (let fila = 2; fila <= ultFila; fila++) {
    const noTerm = hojaGen.getRange(fila, COLUMNAS.NO_TERMINO_FORMACION).getValue();
    const nombre = hojaGen.getRange(fila, COLUMNAS.NOMBRE).getValue();

    if (noTerm && noTerm.toString().trim().toLowerCase() === 'sí' && nombre) {
      participantes.push({
        fila: fila,
        nombre: nombre.toString().trim()
      });
    }
  }

  if (participantes.length === 0) {
    ui.alert('ℹ️ Sin participantes marcados',
      'No hay participantes con "Sí" en la columna K.\n\nMarca "Sí" en la columna "No terminó formación (Sí/No)" para los participantes que NO completaron la formación.',
      ui.ButtonSet.OK);
    return;
  }

  const conf = ui.alert(
    '❌ Mover Participantes que NO Terminaron',
    `Encontrados: ${participantes.length} participantes marcados con "Sí"\n\n` +
    `¿Mover a la hoja "No Terminó la Formación"?\n\n` +
    `⚠️ Esta acción moverá los participantes definitivamente.`,
    ui.ButtonSet.YES_NO
  );

  if (conf !== ui.Button.YES) return;

  let procesados = 0, errores = 0;

  // Procesar de abajo hacia arriba para evitar problemas con índices
  for (let i = participantes.length - 1; i >= 0; i--) {
    const part = participantes[i];
    try {
      const res = procesarParticipanteNoTermino(hojaGen, part.fila);
      if (res && res.exito) {
        procesados++;
      } else {
        errores++;
      }

      // Ajustar índices de filas pendientes
      for (let j = 0; j < i; j++) {
        if (participantes[j].fila > part.fila) {
          participantes[j].fila--;
        }
      }
    } catch (error) {
      console.error(`Error procesando ${part.nombre}:`, error);
      errores++;
    }
  }

  let msg = '❌ PROCESAMIENTO COMPLETADO\n\n';
  if (procesados > 0) msg += `✅ ${procesados} participantes movidos a "No Terminó"\n`;
  if (errores > 0) msg += `❌ ${errores} errores encontrados\n`;

  ui.alert('✅ Resultado', msg, ui.ButtonSet.OK);
}

function procesarParticipanteNoTermino(hojaGen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaNoTerm = ss.getSheetByName('❌ No Terminó la Formación');

    if (!hojaNoTerm) {
      throw new Error('Hoja "No Terminó la Formación" no existe');
    }

    // Leer datos de la fila
    const datos = hojaGen.getRange(fila, 1, 1, TOTAL_COLUMNAS).getValues()[0];

    const nombre = datos[COLUMNAS.NOMBRE - 1];
    if (!nombre || nombre.toString().trim() === '') {
      throw new Error('Nombre vacío o inválido');
    }

    const fechaAct = new Date();
    const motivoNotas = `${datos[COLUMNAS.NOTAS - 1] || ''} | NO COMPLETÓ LA FORMACIÓN - ${Utilities.formatDate(fechaAct, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')}`.trim();

    // Preparar datos para hoja destino
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
      datos[COLUMNAS.NO_TERMINO_FORMACION - 1] || '',
      'No terminó formación',
      datos[COLUMNAS.RESULTADOS - 1] || '',
      datos[COLUMNAS.DOCUMENTOS - 1] || 'Ninguno',
      datos[COLUMNAS.FECHA - 1] || '',
      motivoNotas,
      datos[COLUMNAS.TOTAL_LLAMADAS - 1] || 0,
      Utilities.formatDate(fechaAct, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')
    ];

    // Insertar en hoja "No Terminó"
    hojaNoTerm.insertRows(2, 1);
    const rango = hojaNoTerm.getRange(2, 1, 1, 18);
    rango.setValues([datosDestino]);

    // Aplicar formato de fila (color rojo claro)
    rango.setBackground('#FFCDD2');
    rango.setBorder(true, true, true, true, true, true, '#C62828', SpreadsheetApp.BorderStyle.SOLID);

    // Eliminar de hoja original
    hojaGen.deleteRow(fila);

    // Notificación
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `❌ ${nombre} movido a "No Terminó la Formación"`,
      'Participante Movido',
      3
    );

    return { exito: true };

  } catch (error) {
    console.error('Error en procesarParticipanteNoTermino:', error);
    return { exito: false, error: error.message };
  }
}

function verParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('❌ No Terminó la Formación');

  if (!hoja) {
    ui.alert('❌ Error',
      'Hoja no existe.\n\nEjecuta primero: No Terminó Formación → INSTALAR Funcionalidad v2.9',
      ui.ButtonSet.OK);
    return;
  }

  const ultFila = hoja.getLastRow();
  if (ultFila <= 1) {
    ui.alert('✅ Sin abandonos registrados',
      '¡Excelente! No hay participantes que hayan abandonado la formación.',
      ui.ButtonSet.OK);
    return;
  }

  const total = ultFila - 1;
  const parts = [];

  // Leer últimos 10 participantes
  for (let fila = 2; fila <= Math.min(ultFila, 11); fila++) {
    const nombre = hoja.getRange(fila, 2).getValue();
    const formacion = hoja.getRange(fila, 4).getValue();
    const fechaAband = hoja.getRange(fila, 18).getValue();
    const llamadas = hoja.getRange(fila, 17).getValue() || 0;

    parts.push({ nombre, formacion, fechaAband, llamadas });
  }

  let rep = `❌ REPORTE DE ABANDONOS\n\n📊 Total: ${total} participantes\n\n`;

  if (parts.length > 0) {
    rep += '👥 ÚLTIMOS 10 REGISTRADOS:\n\n';
    parts.forEach((p, i) => {
      const fecha = p.fechaAband ?
        Utilities.formatDate(new Date(p.fechaAband), Session.getScriptTimeZone(), 'dd/MM/yyyy') :
        'Sin fecha';
      rep += `${i + 1}. ${p.nombre}\n`;
      rep += `   📚 ${p.formacion} | 📞 ${p.llamadas} llamadas | 📅 ${fecha}\n\n`;
    });

    if (total > 10) {
      rep += `... y ${total - 10} participantes más\n`;
    }
  }

  ui.alert('❌ Reporte de Abandonos', rep, ui.ButtonSet.OK);
}

// ====================================
// ACTUALIZAR ESTRUCTURA DE TABLA (CONSERVA DATOS)
// ====================================
function actualizarEstructuraTabla() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🔄 ACTUALIZAR Estructura de Tabla v2.9',
    '⚠️ Esta función agregará/actualizará columnas:\n\n' +
    '• Aliados\n' +
    '• Plataformas\n' +
    '• Conexión laboral\n' +
    '• Por su cuenta\n' +
    '• No busca trabajar\n' +
    '• Empleado\n' +
    '• No terminó la formación\n\n' +
    '✅ SIN BORRAR datos existentes\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
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

      // Verificar si ya tiene las columnas nuevas
      const encabezados = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
      if (encabezados[4] === 'Aliados' || encabezados.length >= 18) {
        resultados.push(`ℹ️ ${nombreHoja}: Ya actualizada`);
        return;
      }

      // Insertar 7 columnas después de la columna 4 (Formación)
      hoja.insertColumnsAfter(4, 7);

      // Agregar encabezados de las nuevas columnas
      const nuevosEncabezados = [
        'Aliados',
        'Plataformas',
        'Conexión laboral',
        'Por su cuenta',
        'No busca trabajar',
        'Empleado',
        'No terminó la formación'
      ];

      hoja.getRange(1, 5, 1, 7).setValues([nuevosEncabezados]);

      // Aplicar formato a encabezados
      for (let i = 0; i < 7; i++) {
        const col = 5 + i;
        const rangoEncabezado = hoja.getRange(1, col);
        rangoEncabezado.setBackground('#1f4e79');
        rangoEncabezado.setFontColor('#ffffff');
        rangoEncabezado.setFontWeight('bold');
        rangoEncabezado.setFontSize(11);
        rangoEncabezado.setHorizontalAlignment('center');
        rangoEncabezado.setVerticalAlignment('middle');
        rangoEncabezado.setWrap(true);

        // Ajustar ancho de columna
        hoja.setColumnWidth(col, 150);
      }

      hojasActualizadas++;
      resultados.push(`✅ ${nombreHoja}: Actualizada exitosamente`);
    });

    // Reconfigurar validaciones
    reconfigurarValidacionesActualizadas();

    const mensaje = `🔄 ACTUALIZACIÓN COMPLETADA v2.9\n\n` +
      `📊 Hojas procesadas: ${hojasActualizadas}/${hojasAProcesar.length}\n\n` +
      `📋 DETALLES:\n${resultados.join('\n')}\n\n` +
      `✅ Estructura actualizada sin pérdida de datos`;

    ui.alert('✅ Actualización Exitosa', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error de Actualización',
      `Error actualizando estructura: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

function reconfigurarValidacionesActualizadas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGeneral) return;

  const ultimaFila = Math.max(hojaGeneral.getLastRow(), 100);

  try {
    // FORMACIÓN - columna 4
    const opcionesFormacion = [
      'Barista I', 'Barista II', 'Barista III', 'Barista IV',
      'Barismo', 'Barismo 1', 'Barismo 2', 'Barismo 3', 'Barismo 4', 'Barismo 5',
      'Barismo 6', 'Barismo 7', 'Barismo 8', 'Barismo 9', 'Barismo 10',
      'Gastronomía', 'Gastronomía I', 'Gastronomía II', 'Gastronomía III',
      'Gastronomía IV', 'Gastronomía V',
      'Gastronomía 1', 'Gastronomía 2', 'Gastronomía 3', 'Gastronomía 4', 'Gastronomía 5',
      'Panadería', 'Repostería', 'Sommelier', 'Food Manager',
      'Análisis de datos E-commerce', 'SAC', 'Ofimática',
      'Otra'
    ];

    const rangoFormacion = hojaGeneral.getRange(2, COLUMNAS.FORMACION, ultimaFila - 1, 1);
    const validacionFormacion = SpreadsheetApp.newDataValidation()
      .requireValueInList(opcionesFormacion)
      .setAllowInvalid(true)
      .setHelpText('Selecciona la formación\n🆕 Nuevas: Análisis de datos, SAC, Ofimática')
      .build();
    rangoFormacion.setDataValidation(validacionFormacion);

    // ETAPA ACTUAL - ahora columna 12
    const opcionesEtapa = [
      'Inicial', 'Aliados', 'Plataformas', 'Conexión Laboral',
      'Por su cuenta', 'No busca trabajar', 'Empleado',
      'No termino la formación', 'Finalizado'
    ];

    const rangoEtapa = hojaGeneral.getRange(2, COLUMNAS.ETAPA_ACTUAL, ultimaFila - 1, 1);
    const validacionEtapa = SpreadsheetApp.newDataValidation()
      .requireValueInList(opcionesEtapa)
      .setAllowInvalid(true)
      .build();
    rangoEtapa.setDataValidation(validacionEtapa);

    // DOCUMENTOS FALTANTES - ahora columna 14
    const opcionesDocumentos = [
      'Salud', 'Manipulación', 'Pulmones', 'Policiacos',
      'Penales', 'Ninguno', 'CV', 'NIT', 'Fotografía', 'DPI'
    ];

    const rangoDocumentos = hojaGeneral.getRange(2, COLUMNAS.DOCUMENTOS, ultimaFila - 1, 1);
    const validacionDocumentos = SpreadsheetApp.newDataValidation()
      .requireValueInList(opcionesDocumentos)
      .setAllowInvalid(true)
      .setHelpText('📄 SELECCIÓN MÚLTIPLE:\n1. Selecciona documento\n2. Se agrega automáticamente\n3. Para remover: selecciona el mismo\n4. "Ninguno" borra todo')
      .build();
    rangoDocumentos.setDataValidation(validacionDocumentos);

    // CHECKBOXES - ahora columna 18
    const rangoCheckbox = hojaGeneral.getRange(2, COLUMNAS.PROCESAR, ultimaFila - 1, 1);
    rangoCheckbox.insertCheckboxes();

    console.log('✅ Validaciones reconfiguradas con nueva estructura');

  } catch (error) {
    console.error('Error reconfigurando validaciones:', error);
  }
}

// ====================================
// FUNCIÓN onEdit ACTUALIZADA - v2.9
// ====================================
function onEdit(e) {
  // Validaciones iniciales
  if (!e || !e.range || !e.source) {
    return;
  }

  const hoja = e.source.getActiveSheet();
  const rango = e.range;
  const fila = rango.getRow();
  const columna = rango.getColumn();

  // Verificar que estamos en la hoja correcta
  if (hoja.getName() !== '📋 Seguimiento General' || fila <= 1) {
    return;
  }

  // *** DOCUMENTOS FALTANTES (columna 14) ***
  if (columna === COLUMNAS.DOCUMENTOS && rango.getNumRows() === 1 && rango.getNumColumns() === 1) {
    console.log(`Cambio detectado en Documentos Faltantes - Fila: ${fila}`);
    procesarSeleccionDocumentos(hoja, fila, e.value, e.oldValue);
    return;
  }

  // *** ETAPA ACTUAL (columna 12) ***
  if (columna === COLUMNAS.ETAPA_ACTUAL && rango.getNumRows() === 1 && rango.getNumColumns() === 1) {
    const nuevaEtapa = rango.getValue();
    if (nuevaEtapa && nuevaEtapa.toString().toLowerCase().includes('finalizado')) {
      Utilities.sleep(1000);
      procesarFinalizacionPorEtapa(hoja, fila);
      return;
    }
  }

  // Verificar procesamiento automático
  const propiedades = PropertiesService.getScriptProperties();
  const procesamientoActivo = propiedades.getProperty('PROCESAMIENTO_AUTOMATICO') === 'true';

  if (!procesamientoActivo) {
    return;
  }

  // *** PROCESAMIENTO DE CHECKBOX (columna 18) ***
  if (columna !== COLUMNAS.PROCESAR) {
    return;
  }

  if (rango.getNumRows() !== 1 || rango.getNumColumns() !== 1) {
    return;
  }

  const nuevoValor = rango.getValue();
  if (typeof nuevoValor !== 'boolean' || nuevoValor !== true) {
    return;
  }

  // *** SISTEMA DE BLOQUEO PARA EVITAR DOBLE PROCESAMIENTO ***
  const lock = LockService.getScriptLock();

  try {
    // Verificar si ya está procesando
    const marcaProcesamiento = propiedades.getProperty(`proc_${fila}`);

    if (marcaProcesamiento) {
      const tiempoTranscurrido = new Date().getTime() - parseInt(marcaProcesamiento);
      if (tiempoTranscurrido < 10000) { // Menos de 10 segundos
        console.log(`⚠️ Fila ${fila} ya está siendo procesada. Ignorando.`);
        return;
      }
    }

    // Intentar adquirir bloqueo
    if (!lock.tryLock(5000)) {
      console.log('⚠️ No se pudo obtener bloqueo. Saliendo.');
      return;
    }

    // Marcar inicio de procesamiento
    propiedades.setProperty(`proc_${fila}`, new Date().getTime().toString());

    // Pequeña pausa para asegurar
    Utilities.sleep(500);

    const nombre = hoja.getRange(fila, COLUMNAS.NOMBRE).getValue();
    console.log(`🔄 Procesando fila ${fila}: ${nombre}`);

    const resultado = procesarLlamadaOptimizada(hoja, fila);

    if (resultado.exito) {
      let mensaje;
      if (resultado.movido) {
        mensaje = `🎯 ${nombre} completó ${LLAMADAS_PARA_FINALIZAR} llamadas y fue movido a Finalizados`;
      } else {
        mensaje = `📞 ${nombre} procesado correctamente (${resultado.totalLlamadas}/${LLAMADAS_PARA_FINALIZAR} llamadas)`;
      }
      mostrarNotificacionDiscreta(mensaje);
      console.log(`✅ Procesamiento exitoso: ${nombre}`);
    } else {
      throw new Error(resultado.error);
    }

  } catch (error) {
    console.error('❌ Error en onEdit:', error);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      `Error en procesamiento: ${error.message}`,
      'Error del Sistema',
      5
    );

    try {
      if (e && e.range) {
        e.range.setValue(false);
      }
    } catch (cleanupError) {
      console.error('Error limpiando checkbox:', cleanupError);
    }

  } finally {
    // Limpiar marca de procesamiento
    try {
      propiedades.deleteProperty(`proc_${fila}`);
      lock.releaseLock();
      console.log(`🔓 Bloqueo liberado para fila ${fila}`);
    } catch (releaseError) {
      console.error('Error liberando bloqueo:', releaseError);
    }
  }
}

// ====================================
// CONFIGURACIÓN DEL SISTEMA
// ====================================
function configurarHojasCorregido() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ui.alert('Configurando Sistema v2.9...',
      'Creando estructura optimizada...\nConfigurando para ' + LLAMADAS_PARA_FINALIZAR + ' llamadas\nNUEVAS FORMACIONES: Análisis de datos E-commerce, SAC, Ofimática\nNUEVAS COLUMNAS: Aliados, Plataformas, Conexión laboral, etc.\nFIX: Sistema anti-doble procesamiento',
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

    configurarHojaGeneralCorregida();
    configurarHojasLlamadasCorregidas();

    ui.alert('✅ Sistema v2.9 Configurado',
      `Sistema configurado exitosamente!\n\n📋 Hojas creadas correctamente\n🎨 Formato aplicado\n✅ Validaciones configuradas\n⚡ Sistema anti-doble procesamiento activado\n📞 Configurado para ${LLAMADAS_PARA_FINALIZAR} llamadas\n🆕 Formaciones: Análisis de datos E-commerce, SAC, Ofimática\n🆕 Columnas de etapas agregadas`,
      ui.ButtonSet.OK);

  } catch (error) {
    console.error('❌ Error en configurarHojasCorregido:', error);
    ui.alert('❌ Error de Configuración',
      `Error: ${error.message}\n\n🔧 Intenta nuevamente`,
      ui.ButtonSet.OK);
  }
}

function configurarHojaGeneralCorregida() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('📋 Seguimiento General');

  if (!hoja) return;

  hoja.clear();
  hoja.clearConditionalFormatRules();

  try {
    const rangeCompleto = hoja.getRange(1, 1, hoja.getMaxRows(), hoja.getMaxColumns());
    rangeCompleto.clearDataValidations();
  } catch (error) {
    limpiarValidacionesPorRangos(hoja);
  }

  configurarEncabezadosYValidacionesCorregidos(hoja);
}

function configurarEncabezadosYValidacionesCorregidos(hoja) {
  const encabezados = [
    'Creamos ID',
    'Nombre Completo',
    'Teléfono',
    'Formación',
    // COLUMNAS DE ETAPAS
    'Aliados',
    'Plataformas',
    'Conexión laboral',
    'Por su cuenta',
    'No busca trabajar',
    'Empleado',
    'No terminó la formación',
    // COLUMNAS ORIGINALES
    'Etapa Actual',
    'Resultados Obtenidos',
    'Documentos Faltantes',
    'Fecha Original',
    'Notas/Última Llamada',
    'Total Llamadas',
    'Procesar'
  ];

  hoja.getRange(1, 1, 1, TOTAL_COLUMNAS).setValues([encabezados]);
  configurarValidacionesCompletas(hoja);
}

function configurarValidacionesCompletas(hoja) {
  try {
    // FORMACIÓN
    const opcionesFormacion = [
      'Barista I', 'Barista II', 'Barista III', 'Barista IV',
      'Barismo', 'Barismo 1', 'Barismo 2', 'Barismo 3', 'Barismo 4', 'Barismo 5',
      'Barismo 6', 'Barismo 7', 'Barismo 8', 'Barismo 9', 'Barismo 10',
      'Gastronomía', 'Gastronomía I', 'Gastronomía II', 'Gastronomía III',
      'Gastronomía IV', 'Gastronomía V',
      'Gastronomía 1', 'Gastronomía 2', 'Gastronomía 3', 'Gastronomía 4', 'Gastronomía 5',
      'Panadería', 'Repostería', 'Sommelier', 'Food Manager',
      'Análisis de datos E-commerce', 'SAC', 'Ofimática',
      'Otra'
    ];

    const rangoFormacion = hoja.getRange(2, COLUMNAS.FORMACION, 998, 1);
    const validacionFormacion = SpreadsheetApp.newDataValidation()
      .requireValueInList(opcionesFormacion)
      .setAllowInvalid(true)
      .setHelpText('Selecciona la formación\n🆕 Nuevas: Análisis de datos, SAC, Ofimática')
      .build();
    rangoFormacion.setDataValidation(validacionFormacion);

    // ETAPA ACTUAL
    const opcionesEtapa = [
      'Inicial', 'Aliados', 'Plataformas', 'Conexión Laboral',
      'Por su cuenta', 'No busca trabajar', 'Empleado',
      'No termino la formación', 'Finalizado'
    ];

    const rangoEtapa = hoja.getRange(2, COLUMNAS.ETAPA_ACTUAL, 998, 1);
    const validacionEtapa = SpreadsheetApp.newDataValidation()
      .requireValueInList(opcionesEtapa)
      .setAllowInvalid(true)
      .build();
    rangoEtapa.setDataValidation(validacionEtapa);

    // DOCUMENTOS FALTANTES
    const opcionesDocumentos = [
      'Salud', 'Manipulación', 'Pulmones', 'Policiacos',
      'Penales', 'Ninguno', 'CV', 'NIT', 'Fotografía', 'DPI'
    ];

    const rangoDocumentos = hoja.getRange(2, COLUMNAS.DOCUMENTOS, 998, 1);
    const validacionDocumentos = SpreadsheetApp.newDataValidation()
      .requireValueInList(opcionesDocumentos)
      .setAllowInvalid(true)
      .setHelpText('📄 SELECCIÓN MÚLTIPLE:\n1. Selecciona documento\n2. Se agrega automáticamente\n3. Para remover: selecciona el mismo\n4. "Ninguno" borra todo')
      .build();
    rangoDocumentos.setDataValidation(validacionDocumentos);

    // CHECKBOXES
    const rangoCheckbox = hoja.getRange(2, COLUMNAS.PROCESAR, 998, 1);
    rangoCheckbox.insertCheckboxes();

  } catch (error) {
    console.error('Error configurando validaciones:', error);
  }
}

function configurarHojasLlamadasCorregidas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = [
    '📞 Llamada 1', '📞 Llamada 2', '📞 Llamada 3',
    '📞 Llamada 4', '📞 Llamada 5', '✅ Finalizados'
  ];

  hojas.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    hoja.clear();
    hoja.clearConditionalFormatRules();

    const encabezadosDestino = [
      'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
      // COLUMNAS DE ETAPAS
      'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
      'No busca trabajar', 'Empleado', 'No terminó la formación',
      // COLUMNAS ORIGINALES
      'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
      'Fecha de Llamada', 'Notas/Historial', 'Total Llamadas'
    ];

    hoja.getRange(1, 1, 1, TOTAL_COLUMNAS_DESTINO).setValues([encabezadosDestino]);
  });
}

// ====================================
// PROCESAMIENTO DE LLAMADAS v2.9
// ====================================
function procesarLlamadaOptimizada(hojaGeneral, fila) {
  const timestamp = new Date().getTime();
  console.log(`[${timestamp}] 🔄 Iniciando procesamiento de fila ${fila}`);

  try {
    const rangoDatos = hojaGeneral.getRange(fila, 1, 1, TOTAL_COLUMNAS);
    const datos = rangoDatos.getValues()[0];

    const nombre = datos[COLUMNAS.NOMBRE - 1] ? datos[COLUMNAS.NOMBRE - 1].toString().trim() : '';
    if (!nombre) {
      return { exito: false, error: 'Nombre vacío o inválido', movido: false, totalLlamadas: 0 };
    }

    let llamadasActuales = parseInt(datos[COLUMNAS.TOTAL_LLAMADAS - 1]) || 0;
    const nuevasLlamadas = llamadasActuales + 1;
    const fechaActual = new Date();

    console.log(`📊 ${nombre}: ${llamadasActuales} → ${nuevasLlamadas} llamadas`);

    let nombreHojaDestino;
    let finalizando = false;

    if (nuevasLlamadas >= LLAMADAS_PARA_FINALIZAR) {
      nombreHojaDestino = '✅ Finalizados';
      finalizando = true;
    } else {
      nombreHojaDestino = `📞 Llamada ${nuevasLlamadas}`;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaDestino = ss.getSheetByName(nombreHojaDestino);

    if (!hojaDestino) {
      return { exito: false, error: `Hoja "${nombreHojaDestino}" no encontrada`, movido: false, totalLlamadas: nuevasLlamadas };
    }

    const notasActuales = datos[COLUMNAS.NOTAS - 1] || '';
    const etapaActual = datos[COLUMNAS.ETAPA_ACTUAL - 1] || 'En proceso';
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
      datos[COLUMNAS.NO_TERMINO_FORMACION - 1] || '',
      etapaActual,
      datos[COLUMNAS.RESULTADOS - 1] || '',
      datos[COLUMNAS.DOCUMENTOS - 1] || 'Ninguno',
      Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm'),
      notasActualizadas,
      nuevasLlamadas
    ];

    const resultadoInsercion = insertarEnHojaDestinoOptimizada(hojaDestino, datosDestino, nombreHojaDestino);

    if (!resultadoInsercion.exito) {
      return { exito: false, error: resultadoInsercion.error, movido: false, totalLlamadas: nuevasLlamadas };
    }

    if (finalizando) {
      hojaGeneral.deleteRow(fila);
      console.log(`✅ ${nombre} movido a Finalizados`);
      return { exito: true, error: null, movido: true, totalLlamadas: nuevasLlamadas };
    } else {
      hojaGeneral.getRange(fila, COLUMNAS.NOTAS).setValue(notasActualizadas);
      hojaGeneral.getRange(fila, COLUMNAS.TOTAL_LLAMADAS).setValue(nuevasLlamadas);
      hojaGeneral.getRange(fila, COLUMNAS.PROCESAR).setValue(false);

      console.log(`✅ ${nombre} procesado - Llamada ${nuevasLlamadas}`);
      return { exito: true, error: null, movido: false, totalLlamadas: nuevasLlamadas };
    }

  } catch (error) {
    console.error(`❌ Error procesando fila ${fila}:`, error);
    return { exito: false, error: error.message, movido: false, totalLlamadas: 0 };
  }
}

function insertarEnHojaDestinoOptimizada(hojaDestino, datosDestino, nombreHoja) {
  try {
    if (!Array.isArray(datosDestino) || datosDestino.length !== TOTAL_COLUMNAS_DESTINO) {
      return { exito: false, error: `Datos inválidos: ${datosDestino.length} columnas, se requieren ${TOTAL_COLUMNAS_DESTINO}` };
    }

    hojaDestino.insertRows(2, 1);
    const rangoDestino = hojaDestino.getRange(2, 1, 1, TOTAL_COLUMNAS_DESTINO);
    rangoDestino.setValues([datosDestino]);

    aplicarFormatoFilaDestino(hojaDestino, 2, nombreHoja);

    return { exito: true, error: null };

  } catch (error) {
    return { exito: false, error: error.message };
  }
}

function aplicarFormatoFilaDestino(hoja, fila, nombreHoja) {
  try {
    const configuracionFormato = {
      '📞 Llamada 1': { fondo: '#e3f2fd', borde: '#1976d2' },
      '📞 Llamada 2': { fondo: '#f3e5f5', borde: '#7b1fa2' },
      '📞 Llamada 3': { fondo: '#fff3e0', borde: '#f57c00' },
      '📞 Llamada 4': { fondo: '#ffecb3', borde: '#ff8f00' },
      '📞 Llamada 5': { fondo: '#fce4ec', borde: '#c2185b' },
      '✅ Finalizados': { fondo: '#e8f5e8', borde: '#388e3c' }
    };

    const config = configuracionFormato[nombreHoja] || { fondo: '#ffffff', borde: '#dee2e6' };

    const rangoFila = hoja.getRange(fila, 1, 1, TOTAL_COLUMNAS_DESTINO);
    rangoFila.setBackground(config.fondo);
    rangoFila.setBorder(true, true, true, true, true, true, config.borde, SpreadsheetApp.BorderStyle.SOLID);

  } catch (error) {
    console.warn('Error aplicando formato:', error.message);
  }
}

// Continúa en la siguiente parte...
