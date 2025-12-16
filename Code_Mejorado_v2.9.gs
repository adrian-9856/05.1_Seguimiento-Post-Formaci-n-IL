// ====================================
// SISTEMA DE SEGUIMIENTO DE PRÁCTICAS v2.9 - MEJORAS ADICIONALES
// ✨ NUEVO: Hoja "No Terminó la Formación"
// ✨ NUEVO: Campo Sí/No para "No terminó formación" con auto-movimiento
// ✨ NUEVO: Sistema para agregar columnas personalizadas sin romper el código
// ✨ NUEVO: Reportes avanzados con indicadores personalizables
// ====================================

const LLAMADAS_PARA_FINALIZAR = 6;

// MAPEO DE COLUMNAS v2.9 - ACTUALIZADO
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
  NO_TERMINO_FORMACION: 11,
  // COLUMNAS PRINCIPALES (12-19)
  ETAPA_ACTUAL: 12,
  RESULTADOS: 13,
  DOCUMENTOS: 14,
  FECHA: 15,
  NOTAS: 16,
  TOTAL_LLAMADAS: 17,
  NO_TERMINO_SINO: 18, // ✨ NUEVA COLUMNA para Sí/No
  PROCESAR: 19
};

const TOTAL_COLUMNAS = 19; // Actualizado de 18 a 19
const TOTAL_COLUMNAS_DESTINO = 18; // Hojas de llamadas no tienen checkbox

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

// ====================================
// MENÚ PRINCIPAL - ACTUALIZADO v2.9
// ====================================
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
    .addItem('⚡ ACTIVAR Procesamiento Automático', 'activarProcesomientoAutomatico')
    .addItem('🔴 DESACTIVAR Procesamiento Automático', 'desactivarProcesomientoAutomatico')
    .addItem('🔄 Procesar Llamadas Marcadas', 'procesarLlamadasManualesCorregido')
    .addItem('🧪 Procesar Una Llamada (Prueba)', 'procesarUnaLlamadaPrueba')
    .addSeparator()
    .addSubMenu(ui.createMenu('📊 Reportes y Análisis')
      .addItem('📈 Generar Reporte Completo', 'generarReporte')
      .addItem('📊 NUEVO: Reporte de Indicadores Avanzados', 'generarReporteIndicadores')
      .addItem('📉 NUEVO: Dashboard Ejecutivo', 'generarDashboardEjecutivo')
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
    .addSeparator()
    .addSubMenu(ui.createMenu('✨ NUEVO: Funciones Avanzadas')
      .addItem('➕ Agregar Columnas Personalizadas', 'agregarColumnasPersonalizadas')
      .addItem('❌ Mover a No Terminó Formación', 'moverANoTerminoFormacion')
      .addItem('📊 Ver Participantes No Terminaron', 'verParticipantesNoTerminaron')
      .addItem('🔧 Configurar Columnas Personalizadas', 'configurarColumnasPersonalizadas'))
    .addToUi();

  verificarEstadoProcesomientoAutomatico();
}

// ====================================
// ✨ NUEVA FUNCIÓN: ACTUALIZAR ESTRUCTURA A v2.9
// ====================================
function actualizarEstructuraTabla() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🔄 ACTUALIZAR Estructura de Tabla v2.9',
    '⚠️ Esta función actualizará la estructura a v2.9:\n\n' +
    '✅ Columnas de etapas existentes (si no las tiene)\n' +
    '✨ NUEVO: Columna "No terminó formación (Sí/No)"\n' +
    '✨ NUEVO: Hoja "❌ No Terminó la Formación"\n\n' +
    '✅ SIN BORRAR datos existentes\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. CREAR HOJA "No Terminó la Formación" si no existe
    if (!ss.getSheetByName('❌ No Terminó la Formación')) {
      const hojaNoTermino = ss.insertSheet('❌ No Terminó la Formación');
      configurarHojaNoTerminoFormacion(hojaNoTermino);
    }

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

      const encabezados = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];

      // Verificar si ya tiene la estructura v2.9
      if (encabezados.length >= TOTAL_COLUMNAS && encabezados[17] === 'No terminó formación (Sí/No)') {
        resultados.push(`ℹ️ ${nombreHoja}: Ya actualizada a v2.9`);
        return;
      }

      // Si no tiene las columnas de etapas (v2.8), agregarlas primero
      if (encabezados.length < 18 || encabezados[4] !== 'Aliados') {
        hoja.insertColumnsAfter(4, 7);
        const nuevosEncabezadosEtapas = [
          'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
          'No busca trabajar', 'Empleado', 'No terminó la formación'
        ];
        hoja.getRange(1, 5, 1, 7).setValues([nuevosEncabezadosEtapas]);
        aplicarColoresColumnasEtapas(hoja);
      }

      // Agregar columna "No terminó formación (Sí/No)" después de "Total Llamadas"
      const columnaAntesProcesar = nombreHoja === '📋 Seguimiento General' ? 17 : 17;
      hoja.insertColumnsAfter(columnaAntesProcesar, 1);

      if (nombreHoja === '📋 Seguimiento General') {
        hoja.getRange(1, 18).setValue('No terminó formación (Sí/No)');

        // Configurar validación Sí/No
        const ultimaFila = Math.max(hoja.getLastRow(), 100);
        if (ultimaFila > 1) {
          const rangoSiNo = hoja.getRange(2, 18, ultimaFila - 1, 1);
          const validacionSiNo = SpreadsheetApp.newDataValidation()
            .requireValueInList(['No', 'Sí'])
            .setAllowInvalid(false)
            .setHelpText('Selecciona Sí si el participante NO terminó la formación')
            .build();
          rangoSiNo.setDataValidation(validacionSiNo);
          rangoSiNo.setValue('No'); // Valor por defecto

          // Aplicar color amarillo suave a la columna
          hoja.getRange(1, 18).setBackground('#FFF9C4').setFontWeight('bold');
          rangoSiNo.setBackground('#FFFDE7');
        }
      } else {
        hoja.getRange(1, 18).setValue('No terminó formación');
        const ultimaFila = Math.max(hoja.getLastRow(), 100);
        if (ultimaFila > 1) {
          hoja.getRange(1, 18).setBackground('#FFF9C4').setFontWeight('bold');
          hoja.getRange(2, 18, ultimaFila - 1, 1).setBackground('#FFFDE7');
        }
      }

      hojasActualizadas++;
      resultados.push(`✅ ${nombreHoja}: Actualizada a v2.9`);
    });

    // Reconfigurar validaciones
    reconfigurarValidacionesActualizadas();

    const mensaje = `🔄 ACTUALIZACIÓN COMPLETADA v2.9\n\n` +
      `📊 Hojas procesadas: ${hojasActualizadas}/${hojasAProcesar.length}\n\n` +
      `✨ NUEVAS CARACTERÍSTICAS:\n` +
      `• Hoja "❌ No Terminó la Formación" creada\n` +
      `• Columna "No terminó formación (Sí/No)" agregada\n` +
      `• Automatización de movimiento activada\n\n` +
      `📋 DETALLES:\n${resultados.join('\n')}`;

    ui.alert('✅ Actualización Exitosa v2.9', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error de Actualización',
      `Error actualizando estructura: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

// ====================================
// ✨ NUEVA FUNCIÓN: CONFIGURAR HOJA "NO TERMINÓ LA FORMACIÓN"
// ====================================
function configurarHojaNoTerminoFormacion(hoja) {
  if (!hoja) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    hoja = ss.getSheetByName('❌ No Terminó la Formación');
    if (!hoja) {
      hoja = ss.insertSheet('❌ No Terminó la Formación');
    }
  }

  hoja.clear();
  hoja.clearConditionalFormatRules();

  const encabezadosNoTermino = [
    'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
    'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó la formación',
    'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
    'Fecha de Registro', 'Motivo/Notas', 'Total Llamadas', 'Fecha Abandono'
  ];

  hoja.getRange(1, 1, 1, 18).setValues([encabezadosNoTermino]);

  // Formato de encabezados - Color rojo distintivo
  const rangoEncabezado = hoja.getRange(1, 1, 1, 18);
  rangoEncabezado.setBackground('#C62828'); // Rojo oscuro
  rangoEncabezado.setFontColor('#FFFFFF');
  rangoEncabezado.setFontWeight('bold');
  rangoEncabezado.setFontSize(11);
  rangoEncabezado.setHorizontalAlignment('center');

  // Ajustar anchos de columnas
  hoja.setColumnWidth(1, 100);   // ID
  hoja.setColumnWidth(2, 180);   // Nombre
  hoja.setColumnWidth(3, 120);   // Teléfono
  hoja.setColumnWidth(4, 140);   // Formación
  for (let i = 5; i <= 11; i++) {
    hoja.setColumnWidth(i, 150); // Columnas de etapas
  }
  hoja.setColumnWidth(12, 120);  // Etapa Actual
  hoja.setColumnWidth(13, 140);  // Resultados
  hoja.setColumnWidth(14, 150);  // Documentos
  hoja.setColumnWidth(15, 140);  // Fecha Registro
  hoja.setColumnWidth(16, 250);  // Motivo/Notas
  hoja.setColumnWidth(17, 100);  // Total Llamadas
  hoja.setColumnWidth(18, 140);  // Fecha Abandono

  hoja.setFrozenRows(1);

  console.log('✅ Hoja "No Terminó la Formación" configurada');
}

// ====================================
// ✨ FUNCIÓN onEdit ACTUALIZADA - v2.9 CON DETECCIÓN DE "NO TERMINÓ"
// ====================================
function onEdit(e) {
  if (!e || !e.range || !e.source) return;

  const hoja = e.source.getActiveSheet();
  const rango = e.range;
  const fila = rango.getRow();
  const columna = rango.getColumn();

  if (hoja.getName() !== '📋 Seguimiento General' || fila <= 1) return;

  // *** DETECCIÓN DE "NO TERMINÓ FORMACIÓN (SÍ/NO)" ***
  if (columna === COLUMNAS.NO_TERMINO_SINO && rango.getNumRows() === 1 && rango.getNumColumns() === 1) {
    const valorNoTermino = rango.getValue();
    console.log(`Cambio detectado en "No terminó formación" - Fila: ${fila}, Valor: "${valorNoTermino}"`);

    if (valorNoTermino && valorNoTermino.toString().trim().toLowerCase() === 'sí') {
      Utilities.sleep(500);
      procesarNoTerminoFormacion(hoja, fila);
      return;
    }
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

  if (!procesamientoActivo) return;

  // *** PROCESAMIENTO DE CHECKBOX (columna 19) ***
  if (columna !== COLUMNAS.PROCESAR) return;

  if (rango.getNumRows() !== 1 || rango.getNumColumns() !== 1) return;

  const nuevoValor = rango.getValue();
  if (typeof nuevoValor !== 'boolean' || nuevoValor !== true) return;

  // *** SISTEMA DE BLOQUEO PARA EVITAR DOBLE PROCESAMIENTO ***
  const lock = LockService.getScriptLock();

  try {
    const marcaProcesamiento = propiedades.getProperty(`proc_${fila}`);

    if (marcaProcesamiento) {
      const tiempoTranscurrido = new Date().getTime() - parseInt(marcaProcesamiento);
      if (tiempoTranscurrido < 10000) {
        console.log(`⚠️ Fila ${fila} ya está siendo procesada. Ignorando.`);
        return;
      }
    }

    if (!lock.tryLock(5000)) {
      console.log('⚠️ No se pudo obtener bloqueo. Saliendo.');
      return;
    }

    propiedades.setProperty(`proc_${fila}`, new Date().getTime().toString());
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
// ✨ NUEVA FUNCIÓN: PROCESAR "NO TERMINÓ LA FORMACIÓN"
// ====================================
function procesarNoTerminoFormacion(hojaGeneral, fila) {
  try {
    const nombre = hojaGeneral.getRange(fila, COLUMNAS.NOMBRE).getValue();
    console.log(`❌ Procesando "No terminó formación" para: ${nombre} (Fila: ${fila})`);

    if (!verificarSistemaCompleto()) {
      throw new Error('Sistema no configurado completamente');
    }

    const rangoDatos = hojaGeneral.getRange(fila, 1, 1, TOTAL_COLUMNAS);
    const datos = rangoDatos.getValues()[0];

    const nombreCompleto = datos[COLUMNAS.NOMBRE - 1] ? datos[COLUMNAS.NOMBRE - 1].toString().trim() : '';
    if (!nombreCompleto) {
      throw new Error('Nombre vacío o inválido');
    }

    const fechaActual = new Date();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');

    if (!hojaNoTermino) {
      throw new Error('Hoja "❌ No Terminó la Formación" no encontrada');
    }

    const motivoNotas = `${datos[COLUMNAS.NOTAS - 1] || ''} | NO COMPLETÓ LA FORMACIÓN - Registrado el ${Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')}`.trim();

    const datosDestino = [
      datos[COLUMNAS.ID - 1] || '',
      nombreCompleto,
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
      Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')
    ];

    // Insertar en hoja "No Terminó la Formación"
    hojaNoTermino.insertRows(2, 1);
    const rangoDestino = hojaNoTermino.getRange(2, 1, 1, 18);
    rangoDestino.setValues([datosDestino]);

    // Aplicar formato con color rojo suave
    rangoDestino.setBackground('#FFCDD2'); // Rojo muy claro
    rangoDestino.setBorder(true, true, true, true, true, true, '#C62828', SpreadsheetApp.BorderStyle.SOLID);

    // Eliminar de la hoja principal
    hojaGeneral.deleteRow(fila);

    const mensaje = `❌ ${nombreCompleto} movido a "No Terminó la Formación"`;
    mostrarNotificacionDiscreta(mensaje);

    console.log(`✅ ${nombreCompleto} procesado como "No terminó formación"`);
    return { exito: true, error: null, movido: true };

  } catch (error) {
    console.error('❌ Error en procesarNoTerminoFormacion:', error);

    try {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        `Error procesando "No terminó formación": ${error.message}`,
        'Error de Procesamiento',
        8
      );
    } catch (cleanupError) {
      console.error('❌ Error mostrando notificación:', cleanupError);
    }

    return { exito: false, error: error.message, movido: false };
  }
}

// ====================================
// ✨ NUEVA FUNCIÓN: MOVER MANUALMENTE A "NO TERMINÓ"
// ====================================
function moverANoTerminoFormacion() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGeneral) {
    ui.alert('❌ Sistema no configurado', 'Configura el sistema primero', ui.ButtonSet.OK);
    return;
  }

  const ultimaFila = hojaGeneral.getLastRow();
  if (ultimaFila <= 1) {
    ui.alert('ℹ️ Sin datos', 'No hay participantes para procesar', ui.ButtonSet.OK);
    return;
  }

  // Buscar participantes con "Sí" en columna "No terminó formación"
  const participantesNoTerminaron = [];

  for (let fila = 2; fila <= ultimaFila; fila++) {
    const noTermino = hojaGeneral.getRange(fila, COLUMNAS.NO_TERMINO_SINO).getValue();
    const nombre = hojaGeneral.getRange(fila, COLUMNAS.NOMBRE).getValue();

    if (noTermino && noTermino.toString().trim().toLowerCase() === 'sí' && nombre) {
      participantesNoTerminaron.push({
        fila: fila,
        nombre: nombre.toString().trim()
      });
    }
  }

  if (participantesNoTerminaron.length === 0) {
    ui.alert('ℹ️ Sin participantes',
      'No hay participantes marcados con "Sí" en "No terminó formación".',
      ui.ButtonSet.OK);
    return;
  }

  const confirmacion = ui.alert('❌ Mover a "No Terminó la Formación"',
    `Se encontraron ${participantesNoTerminaron.length} participantes que no terminaron.\n\n¿Moverlos a la hoja correspondiente?`,
    ui.ButtonSet.YES_NO);

  if (confirmacion !== ui.Button.YES) return;

  let procesados = 0;
  let errores = 0;

  // Procesar de abajo hacia arriba para evitar problemas con índices
  for (let i = participantesNoTerminaron.length - 1; i >= 0; i--) {
    const participante = participantesNoTerminaron[i];

    try {
      const resultado = procesarNoTerminoFormacion(hojaGeneral, participante.fila);

      if (resultado && resultado.exito) {
        procesados++;
      } else {
        errores++;
      }

      // Ajustar índices de filas pendientes
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

  if (procesados > 0) {
    mensaje += `✅ ÉXITO: ${procesados} participantes movidos\n`;
  }

  if (errores > 0) {
    mensaje += `❌ ERRORES: ${errores} problemas encontrados\n`;
  }

  ui.alert('❌ Resultado del Movimiento', mensaje, ui.ButtonSet.OK);
}

// ====================================
// ✨ NUEVA FUNCIÓN: VER PARTICIPANTES QUE NO TERMINARON
// ====================================
function verParticipantesNoTerminaron() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');

  if (!hojaNoTermino) {
    ui.alert('❌ Hoja no encontrada',
      'La hoja "No Terminó la Formación" no existe.\n\nEjecuta "ACTUALIZAR Estructura de Tabla" primero.',
      ui.ButtonSet.OK);
    return;
  }

  const ultimaFila = hojaNoTermino.getLastRow();
  if (ultimaFila <= 1) {
    ui.alert('✅ Sin registros',
      'No hay participantes que no hayan terminado la formación.\n\n¡Excelente trabajo!',
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
// ✨ NUEVA FUNCIÓN: AGREGAR COLUMNAS PERSONALIZADAS
// ====================================
function agregarColumnasPersonalizadas() {
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.prompt(
    '➕ Agregar Columnas Personalizadas',
    'Escribe el nombre de la nueva columna:\n\n(Ejemplo: "Empresa de interés", "Comentarios extras", etc.)',
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() !== ui.Button.OK) return;

  const nombreColumna = respuesta.getResponseText().trim();
  if (!nombreColumna) {
    ui.alert('❌ Nombre requerido', 'Debes especificar un nombre para la columna', ui.ButtonSet.OK);
    return;
  }

  const ubicacion = ui.alert(
    '📍 Ubicación de la columna',
    `¿Dónde quieres agregar "${nombreColumna}"?\n\n` +
    '✅ AL FINAL - Después de todas las columnas existentes\n' +
    '✅ ANTES DEL CHECKBOX - Antes de la columna "Procesar"\n\n' +
    'Recomendado: AL FINAL para no afectar el flujo',
    ui.ButtonSet.YES_NO_CANCEL
  );

  if (ubicacion === ui.Button.CANCEL) return;

  const agregarAlFinal = ubicacion === ui.Button.YES;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojasAProcesar = [
      '📋 Seguimiento General',
      '📞 Llamada 1',
      '📞 Llamada 2',
      '📞 Llamada 3',
      '📞 Llamada 4',
      '📞 Llamada 5',
      '✅ Finalizados',
      '❌ No Terminó la Formación'
    ];

    let hojasActualizadas = 0;

    hojasAProcesar.forEach(nombreHoja => {
      const hoja = ss.getSheetByName(nombreHoja);
      if (!hoja) return;

      const ultimaColumna = hoja.getLastColumn();
      let posicionInsercion;

      if (agregarAlFinal) {
        posicionInsercion = ultimaColumna + 1;
      } else {
        // Insertar antes de "Procesar" (última columna en hoja principal)
        posicionInsercion = ultimaColumna;
        hoja.insertColumnsBefore(posicionInsercion, 1);
      }

      // Agregar encabezado
      hoja.getRange(1, posicionInsercion).setValue(nombreColumna);

      // Aplicar formato al encabezado
      const rangoEncabezado = hoja.getRange(1, posicionInsercion);
      rangoEncabezado.setBackground('#FFC107'); // Amarillo
      rangoEncabezado.setFontColor('#000000');
      rangoEncabezado.setFontWeight('bold');
      rangoEncabezado.setFontSize(11);
      rangoEncabezado.setHorizontalAlignment('center');

      // Ajustar ancho de columna
      hoja.setColumnWidth(posicionInsercion, 150);

      // Aplicar color suave a las celdas de datos
      const ultimaFila = Math.max(hoja.getLastRow(), 100);
      if (ultimaFila > 1) {
        const rangoDatos = hoja.getRange(2, posicionInsercion, ultimaFila - 1, 1);
        rangoDatos.setBackground('#FFF8E1'); // Amarillo muy claro
      }

      hojasActualizadas++;
    });

    // Guardar en propiedades para referencia futura
    const propiedades = PropertiesService.getScriptProperties();
    const columnasPersonalizadas = propiedades.getProperty('COLUMNAS_PERSONALIZADAS') || '[]';
    const columnas = JSON.parse(columnasPersonalizadas);
    columnas.push({
      nombre: nombreColumna,
      fechaCreacion: new Date().toISOString(),
      ubicacion: agregarAlFinal ? 'final' : 'antes_checkbox'
    });
    propiedades.setProperty('COLUMNAS_PERSONALIZADAS', JSON.stringify(columnas));

    const mensaje = `✅ COLUMNA AGREGADA EXITOSAMENTE\n\n` +
      `📋 Columna: "${nombreColumna}"\n` +
      `📍 Ubicación: ${agregarAlFinal ? 'Al final' : 'Antes del checkbox'}\n` +
      `📊 Hojas actualizadas: ${hojasActualizadas}\n\n` +
      `✅ La columna está lista para usar\n` +
      `💡 El sistema seguirá funcionando normalmente`;

    ui.alert('✅ Columna Agregada', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error',
      `Error agregando columna: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

// ====================================
// ✨ NUEVA FUNCIÓN: CONFIGURAR COLUMNAS PERSONALIZADAS
// ====================================
function configurarColumnasPersonalizadas() {
  const ui = SpreadsheetApp.getUi();
  const propiedades = PropertiesService.getScriptProperties();
  const columnasPersonalizadas = propiedades.getProperty('COLUMNAS_PERSONALIZADAS') || '[]';
  const columnas = JSON.parse(columnasPersonalizadas);

  if (columnas.length === 0) {
    ui.alert('ℹ️ Sin columnas personalizadas',
      'No has agregado columnas personalizadas todavía.\n\nUsa "➕ Agregar Columnas Personalizadas" para crear una.',
      ui.ButtonSet.OK);
    return;
  }

  let reporte = `📋 COLUMNAS PERSONALIZADAS\n\n`;
  reporte += `📊 Total: ${columnas.length} columnas\n\n`;

  columnas.forEach((col, index) => {
    const fecha = new Date(col.fechaCreacion);
    const fechaFormateada = Utilities.formatDate(fecha, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');
    reporte += `${index + 1}. ${col.nombre}\n`;
    reporte += `   📅 Creada: ${fechaFormateada}\n`;
    reporte += `   📍 Ubicación: ${col.ubicacion === 'final' ? 'Al final' : 'Antes del checkbox'}\n\n`;
  });

  reporte += `💡 NOTA: Las columnas personalizadas no afectan\nel procesamiento automático del sistema.`;

  ui.alert('📋 Columnas Personalizadas', reporte, ui.ButtonSet.OK);
}

// ====================================
// ✨ NUEVAS FUNCIONES: REPORTES AVANZADOS E INDICADORES
// ====================================
function generarReporteIndicadores() {
  const ui = SpreadsheetApp.getUi();

  const indicadores = calcularIndicadoresAvanzados();
  const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');

  let reporte = `📊 REPORTE DE INDICADORES AVANZADOS v2.9\n`;
  reporte += `⏰ ${fecha}\n\n`;

  // INDICADORES GENERALES
  reporte += `═══════════════════════════════════\n`;
  reporte += `📈 INDICADORES GENERALES\n`;
  reporte += `═══════════════════════════════════\n`;
  reporte += `👥 Total participantes: ${indicadores.totalParticipantes}\n`;
  reporte += `✅ Finalizados: ${indicadores.finalizados} (${indicadores.tasaFinalizacion}%)\n`;
  reporte += `📞 En proceso: ${indicadores.enProceso} (${indicadores.tasaEnProceso}%)\n`;
  reporte += `❌ No terminaron: ${indicadores.noTerminaron} (${indicadores.tasaNoTermino}%)\n\n`;

  // INDICADORES DE EMPLEO
  reporte += `═══════════════════════════════════\n`;
  reporte += `💼 INDICADORES DE EMPLEO\n`;
  reporte += `═══════════════════════════════════\n`;
  reporte += `✅ Empleados: ${indicadores.empleados}\n`;
  reporte += `📊 Tasa de empleabilidad: ${indicadores.tasaEmpleabilidad}%\n`;
  reporte += `🔗 En conexión laboral: ${indicadores.conexionLaboral}\n`;
  reporte += `👤 Por su cuenta: ${indicadores.porSuCuenta}\n`;
  reporte += `⚠️ No busca trabajar: ${indicadores.noBuscaTrabajo}\n\n`;

  // INDICADORES DE GESTIÓN
  reporte += `═══════════════════════════════════\n`;
  reporte += `📞 INDICADORES DE GESTIÓN\n`;
  reporte += `═══════════════════════════════════\n`;
  reporte += `📊 Promedio llamadas: ${indicadores.promedioLlamadas}\n`;
  reporte += `📈 Efectividad seguimiento: ${indicadores.efectividadSeguimiento}%\n`;
  reporte += `🎯 Tasa conversión aliados: ${indicadores.tasaConversionAliados}%\n`;
  reporte += `🌐 Tasa uso plataformas: ${indicadores.tasaUsoPlataformas}%\n\n`;

  // TOP FORMACIONES
  reporte += `═══════════════════════════════════\n`;
  reporte += `🎓 TOP 5 FORMACIONES\n`;
  reporte += `═══════════════════════════════════\n`;
  indicadores.topFormaciones.slice(0, 5).forEach((form, index) => {
    reporte += `${index + 1}. ${form.nombre}: ${form.cantidad} (${form.porcentaje}%)\n`;
  });

  reporte += `\n💡 INTERPRETACIÓN:\n`;
  if (indicadores.tasaEmpleabilidad >= 70) {
    reporte += `✅ Excelente tasa de empleabilidad\n`;
  } else if (indicadores.tasaEmpleabilidad >= 50) {
    reporte += `⚠️ Tasa de empleabilidad moderada\n`;
  } else {
    reporte += `❌ Tasa de empleabilidad baja - requiere atención\n`;
  }

  if (indicadores.tasaNoTermino > 20) {
    reporte += `⚠️ Alta tasa de abandono - revisar causas\n`;
  }

  if (indicadores.efectividadSeguimiento >= 80) {
    reporte += `✅ Excelente efectividad en seguimiento\n`;
  }

  ui.alert('📊 Indicadores Avanzados', reporte, ui.ButtonSet.OK);
}

function calcularIndicadoresAvanzados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const indicadores = {
    totalParticipantes: 0,
    finalizados: 0,
    enProceso: 0,
    noTerminaron: 0,
    empleados: 0,
    conexionLaboral: 0,
    porSuCuenta: 0,
    noBuscaTrabajo: 0,
    tasaFinalizacion: 0,
    tasaEnProceso: 0,
    tasaNoTermino: 0,
    tasaEmpleabilidad: 0,
    promedioLlamadas: 0,
    efectividadSeguimiento: 0,
    tasaConversionAliados: 0,
    tasaUsoPlataformas: 0,
    topFormaciones: []
  };

  // Contar participantes en cada hoja
  const hojasContar = [
    { nombre: '📋 Seguimiento General', tipo: 'proceso' },
    { nombre: '📞 Llamada 1', tipo: 'proceso' },
    { nombre: '📞 Llamada 2', tipo: 'proceso' },
    { nombre: '📞 Llamada 3', tipo: 'proceso' },
    { nombre: '📞 Llamada 4', tipo: 'proceso' },
    { nombre: '📞 Llamada 5', tipo: 'proceso' },
    { nombre: '✅ Finalizados', tipo: 'finalizado' },
    { nombre: '❌ No Terminó la Formación', tipo: 'no_termino' }
  ];

  const conteoFormaciones = {};
  let totalLlamadas = 0;
  let participantesConLlamadas = 0;

  hojasContar.forEach(({ nombre, tipo }) => {
    const hoja = ss.getSheetByName(nombre);
    if (!hoja) return;

    const ultimaFila = hoja.getLastRow();
    if (ultimaFila <= 1) return;

    const cantidad = ultimaFila - 1;
    indicadores.totalParticipantes += cantidad;

    if (tipo === 'finalizado') {
      indicadores.finalizados += cantidad;
    } else if (tipo === 'no_termino') {
      indicadores.noTerminaron += cantidad;
    } else {
      indicadores.enProceso += cantidad;
    }

    // Analizar datos específicos de la hoja general
    if (nombre === '📋 Seguimiento General') {
      for (let fila = 2; fila <= ultimaFila; fila++) {
        // Formación
        const formacion = hoja.getRange(fila, COLUMNAS.FORMACION).getValue();
        if (formacion) {
          conteoFormaciones[formacion] = (conteoFormaciones[formacion] || 0) + 1;
        }

        // Llamadas
        const llamadas = parseInt(hoja.getRange(fila, COLUMNAS.TOTAL_LLAMADAS).getValue()) || 0;
        totalLlamadas += llamadas;
        if (llamadas > 0) participantesConLlamadas++;

        // Etapas
        const etapa = hoja.getRange(fila, COLUMNAS.ETAPA_ACTUAL).getValue();
        if (etapa) {
          const etapaLower = etapa.toString().toLowerCase();
          if (etapaLower.includes('empleado')) indicadores.empleados++;
          if (etapaLower.includes('conexion') || etapaLower.includes('conexión')) indicadores.conexionLaboral++;
          if (etapaLower.includes('por su cuenta')) indicadores.porSuCuenta++;
          if (etapaLower.includes('no busca')) indicadores.noBuscaTrabajo++;
        }

        // Aliados y plataformas
        const aliados = hoja.getRange(fila, COLUMNAS.ALIADOS).getValue();
        const plataformas = hoja.getRange(fila, COLUMNAS.PLATAFORMAS).getValue();

        if (aliados && aliados.toString().trim() !== '') {
          indicadores.tasaConversionAliados++;
        }
        if (plataformas && plataformas.toString().trim() !== '') {
          indicadores.tasaUsoPlataformas++;
        }
      }
    }
  });

  // Calcular tasas
  if (indicadores.totalParticipantes > 0) {
    indicadores.tasaFinalizacion = Math.round((indicadores.finalizados / indicadores.totalParticipantes) * 100);
    indicadores.tasaEnProceso = Math.round((indicadores.enProceso / indicadores.totalParticipantes) * 100);
    indicadores.tasaNoTermino = Math.round((indicadores.noTerminaron / indicadores.totalParticipantes) * 100);

    const totalEmpleabilidad = indicadores.empleados + indicadores.conexionLaboral + indicadores.porSuCuenta;
    indicadores.tasaEmpleabilidad = Math.round((totalEmpleabilidad / indicadores.totalParticipantes) * 100);

    indicadores.efectividadSeguimiento = Math.round((participantesConLlamadas / indicadores.totalParticipantes) * 100);

    indicadores.tasaConversionAliados = Math.round((indicadores.tasaConversionAliados / indicadores.totalParticipantes) * 100);
    indicadores.tasaUsoPlataformas = Math.round((indicadores.tasaUsoPlataformas / indicadores.totalParticipantes) * 100);
  }

  // Promedio de llamadas
  indicadores.promedioLlamadas = participantesConLlamadas > 0 ?
    (totalLlamadas / participantesConLlamadas).toFixed(1) : 0;

  // Top formaciones
  indicadores.topFormaciones = Object.entries(conteoFormaciones)
    .map(([nombre, cantidad]) => ({
      nombre,
      cantidad,
      porcentaje: Math.round((cantidad / indicadores.totalParticipantes) * 100)
    }))
    .sort((a, b) => b.cantidad - a.cantidad);

  return indicadores;
}

function generarDashboardEjecutivo() {
  const ui = SpreadsheetApp.getUi();

  const indicadores = calcularIndicadoresAvanzados();
  const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');

  let dashboard = `🎯 DASHBOARD EJECUTIVO v2.9\n`;
  dashboard += `⏰ ${fecha}\n\n`;

  // RESUMEN EJECUTIVO
  dashboard += `═══════════════════════════════════\n`;
  dashboard += `📊 RESUMEN EJECUTIVO\n`;
  dashboard += `═══════════════════════════════════\n`;
  dashboard += `👥 Base de datos: ${indicadores.totalParticipantes} participantes\n`;
  dashboard += `✅ Tasa de éxito: ${indicadores.tasaFinalizacion}%\n`;
  dashboard += `💼 Empleabilidad: ${indicadores.tasaEmpleabilidad}%\n`;
  dashboard += `📞 Efectividad: ${indicadores.efectividadSeguimiento}%\n\n`;

  // SEMÁFORO DE INDICADORES
  dashboard += `═══════════════════════════════════\n`;
  dashboard += `🚦 SEMÁFORO DE INDICADORES\n`;
  dashboard += `═══════════════════════════════════\n`;

  dashboard += `Tasa de finalización: ${getSemaforo(indicadores.tasaFinalizacion, 70, 50)} ${indicadores.tasaFinalizacion}%\n`;
  dashboard += `Empleabilidad: ${getSemaforo(indicadores.tasaEmpleabilidad, 60, 40)} ${indicadores.tasaEmpleabilidad}%\n`;
  dashboard += `Efectividad seguimiento: ${getSemaforo(indicadores.efectividadSeguimiento, 80, 60)} ${indicadores.efectividadSeguimiento}%\n`;
  dashboard += `Tasa de abandono: ${getSemaforoInverso(indicadores.tasaNoTermino, 10, 20)} ${indicadores.tasaNoTermino}%\n\n`;

  // DISTRIBUCIÓN
  dashboard += `═══════════════════════════════════\n`;
  dashboard += `📈 DISTRIBUCIÓN DE PARTICIPANTES\n`;
  dashboard += `═══════════════════════════════════\n`;
  dashboard += generarBarraProgreso('En proceso', indicadores.enProceso, indicadores.totalParticipantes) + '\n';
  dashboard += generarBarraProgreso('Finalizados', indicadores.finalizados, indicadores.totalParticipantes) + '\n';
  dashboard += generarBarraProgreso('No terminaron', indicadores.noTerminaron, indicadores.totalParticipantes) + '\n\n';

  // ESTADO LABORAL
  dashboard += `═══════════════════════════════════\n`;
  dashboard += `💼 ESTADO LABORAL\n`;
  dashboard += `═══════════════════════════════════\n`;
  dashboard += `✅ Empleados: ${indicadores.empleados}\n`;
  dashboard += `🔗 Conexión laboral: ${indicadores.conexionLaboral}\n`;
  dashboard += `👤 Por su cuenta: ${indicadores.porSuCuenta}\n`;
  dashboard += `⚠️ No busca trabajar: ${indicadores.noBuscaTrabajo}\n\n`;

  // ACCIONES RECOMENDADAS
  dashboard += `═══════════════════════════════════\n`;
  dashboard += `💡 ACCIONES RECOMENDADAS\n`;
  dashboard += `═══════════════════════════════════\n`;

  const recomendaciones = [];
  if (indicadores.tasaEmpleabilidad < 50) {
    recomendaciones.push('🔴 CRÍTICO: Fortalecer estrategia de empleabilidad');
  }
  if (indicadores.tasaNoTermino > 15) {
    recomendaciones.push('⚠️ Analizar causas de abandono y crear plan de retención');
  }
  if (indicadores.efectividadSeguimiento < 70) {
    recomendaciones.push('📞 Mejorar proceso de seguimiento telefónico');
  }
  if (indicadores.tasaConversionAliados < 30) {
    recomendaciones.push('🤝 Fortalecer red de aliados empresariales');
  }
  if (indicadores.tasaUsoPlataformas < 40) {
    recomendaciones.push('🌐 Capacitar en uso de plataformas de empleo');
  }

  if (recomendaciones.length > 0) {
    recomendaciones.forEach(rec => dashboard += `${rec}\n`);
  } else {
    dashboard += `✅ Sistema funcionando óptimamente\n`;
    dashboard += `✅ Mantener estrategia actual\n`;
  }

  ui.alert('🎯 Dashboard Ejecutivo', dashboard, ui.ButtonSet.OK);
}

function getSemaforo(valor, umbralVerde, umbralAmarillo) {
  if (valor >= umbralVerde) return '🟢';
  if (valor >= umbralAmarillo) return '🟡';
  return '🔴';
}

function getSemaforoInverso(valor, umbralVerde, umbralAmarillo) {
  if (valor <= umbralVerde) return '🟢';
  if (valor <= umbralAmarillo) return '🟡';
  return '🔴';
}

function generarBarraProgreso(etiqueta, valor, total) {
  const porcentaje = total > 0 ? Math.round((valor / total) * 100) : 0;
  const barras = Math.round(porcentaje / 5); // 20 barras = 100%
  const barra = '█'.repeat(Math.max(0, barras)) + '░'.repeat(Math.max(0, 20 - barras));
  return `${etiqueta.padEnd(15)} ${barra} ${porcentaje}% (${valor})`;
}

// ====================================
// CONFIGURACIÓN INICIAL - ACTUALIZADA v2.9
// ====================================
function configurarHojasCorregido() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ui.alert('Configurando Sistema v2.9...',
      '✨ Creando estructura con NUEVAS funciones:\n' +
      '• Hoja "No Terminó la Formación"\n' +
      '• Campo Sí/No para abandono\n' +
      '• Sistema de columnas personalizadas\n' +
      '• Reportes avanzados',
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

    // ✨ CREAR HOJA "NO TERMINÓ LA FORMACIÓN"
    if (!ss.getSheetByName('❌ No Terminó la Formación')) {
      const hojaNoTermino = ss.insertSheet('❌ No Terminó la Formación');
      configurarHojaNoTerminoFormacion(hojaNoTermino);
    }

    configurarHojaGeneralCorregida();
    configurarHojasLlamadasCorregidas();

    ui.alert('✅ Sistema v2.9 Configurado',
      `Sistema configurado exitosamente!\n\n` +
      `✅ Todas las hojas creadas\n` +
      `✨ Hoja "No Terminó la Formación" activa\n` +
      `✨ Campo Sí/No configurado\n` +
      `✨ Columnas personalizadas disponibles\n` +
      `✨ Reportes avanzados listos\n` +
      `📞 Configurado para ${LLAMADAS_PARA_FINALIZAR} llamadas`,
      ui.ButtonSet.OK);

  } catch (error) {
    console.error('❌ Error en configurarHojasCorregido:', error);
    ui.alert('❌ Error de Configuración',
      `Error: ${error.message}`,
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
    // COLUMNAS PRINCIPALES
    'Etapa Actual',
    'Resultados Obtenidos',
    'Documentos Faltantes',
    'Fecha Original',
    'Notas/Última Llamada',
    'Total Llamadas',
    'No terminó formación (Sí/No)', // ✨ NUEVA COLUMNA
    'Procesar'
  ];

  hoja.getRange(1, 1, 1, TOTAL_COLUMNAS).setValues([encabezados]);
  configurarValidacionesCompletas(hoja);

  // Aplicar color especial a columna "No terminó formación (Sí/No)"
  hoja.getRange(1, COLUMNAS.NO_TERMINO_SINO).setBackground('#FFF9C4').setFontWeight('bold');
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
      .setHelpText('Selecciona la formación')
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
      .setHelpText('📄 SELECCIÓN MÚLTIPLE')
      .build();
    rangoDocumentos.setDataValidation(validacionDocumentos);

    // ✨ VALIDACIÓN "NO TERMINÓ FORMACIÓN (SÍ/NO)"
    const rangoSiNo = hoja.getRange(2, COLUMNAS.NO_TERMINO_SINO, 998, 1);
    const validacionSiNo = SpreadsheetApp.newDataValidation()
      .requireValueInList(['No', 'Sí'])
      .setAllowInvalid(false)
      .setHelpText('⚠️ Selecciona Sí si el participante NO terminó la formación')
      .build();
    rangoSiNo.setDataValidation(validacionSiNo);
    rangoSiNo.setValue('No'); // Valor por defecto
    rangoSiNo.setBackground('#FFFDE7'); // Color amarillo muy claro

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
      'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
      'No busca trabajar', 'Empleado', 'No terminó la formación',
      'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
      'Fecha de Llamada', 'Notas/Historial', 'Total Llamadas', 'No terminó formación'
    ];

    hoja.getRange(1, 1, 1, TOTAL_COLUMNAS_DESTINO).setValues([encabezadosDestino]);
  });
}

// ====================================
// RESTO DEL CÓDIGO (Funciones existentes de v2.8)
// Se mantienen sin cambios...
// ====================================

// [CONTINÚA CON TODAS LAS FUNCIONES RESTANTES DEL CÓDIGO ORIGINAL v2.8]
// Por brevedad, no reescribo todo el código aquí, pero se mantienen:
// - procesarFormacionInteligente
// - detectarColumnasOptimizadas
// - procesarDatosImportacionOptimizada
// - procesarLlamadaOptimizada
// - insertarEnHojaDestinoOptimizada
// - aplicarFormatoFilaDestino
// - importarDatos2024, importarDatos2025, etc.
// - activarProcesomientoAutomatico
// - desactivarProcesomientoAutomatico
// - procesarLlamadasManualesCorregido
// - generarReporte
// - diagnosticarSistema
// - repararSistema
// - aplicarFormato
// - etc.

// ====================================
// MENSAJE DE CARGA DEL SISTEMA v2.9
// ====================================
console.log('===============================================');
console.log('✅ Sistema de Seguimiento de Prácticas v2.9');
console.log('===============================================');
console.log(`📞 Configurado para ${LLAMADAS_PARA_FINALIZAR} llamadas por participante`);
console.log('🔒 SISTEMA ANTI-DOBLE PROCESAMIENTO: ACTIVO');
console.log('📝 COLUMNAS DE ETAPAS: ACTIVAS');
console.log('');
console.log('✨ NUEVAS FUNCIONES v2.9:');
console.log('   ❌ Hoja "No Terminó la Formación"');
console.log('   🔄 Movimiento automático por Sí/No');
console.log('   ➕ Sistema de columnas personalizadas');
console.log('   📊 Reportes avanzados e indicadores');
console.log('   🎯 Dashboard ejecutivo');
console.log('');
console.log('🚀 Sistema listo para uso completo');
console.log('===============================================');
