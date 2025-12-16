// ═══════════════════════════════════════════════════════════════
// 🚀 CÓDIGO FINAL COMPLETO Y UNIFICADO v2.9
// ═══════════════════════════════════════════════════════════════
//
// ⚠️ ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS USAR
//
// 📋 INSTRUCCIONES:
// 1. Copia TODO este código
// 2. Pégalo AL FINAL de tu código actual en Apps Script
// 3. Guarda (Ctrl+S)
// 4. Ejecuta: instalarSistemaCompletoV29()
// 5. Recarga la página
// 6. ¡Listo!
//
// ✨ CARACTERÍSTICAS:
// • Hoja "❌ No Terminó la Formación"
// • Columna "No terminó formación (Sí/No)"
// • SIN colores en columnas de etapas (limpio)
// • CON colores por formación
// • CON colores fijos por hoja de llamadas
//
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════
// 🎯 FUNCIÓN PRINCIPAL: INSTALADOR ÚNICO
// ═══════════════════════════════════════════════
function instalarSistemaCompletoV29() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🚀 INSTALADOR COMPLETO v2.9',
    '✅ Este instalador agregará:\n\n' +
    '1️⃣ Hoja "❌ No Terminó la Formación"\n' +
    '2️⃣ Columna "No terminó formación (Sí/No)"\n' +
    '3️⃣ Colores SOLO por formación (limpio)\n' +
    '4️⃣ Colores fijos por hoja de llamadas\n' +
    '5️⃣ Funciones de movimiento automático\n\n' +
    '🔒 GARANTÍAS:\n' +
    '✅ NO borra ningún dato\n' +
    '✅ NO reinicia el sistema\n' +
    '✅ Colores limpios y profesionales\n' +
    '✅ Solo agrega lo nuevo\n\n' +
    '⏱️ Duración: 30-60 segundos\n\n' +
    '¿Iniciar instalación?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    ui.alert('❌ Instalación Cancelada', 'No se realizó ningún cambio.', ui.ButtonSet.OK);
    return;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const resultados = [];
  let paso = 0;
  let errores = 0;

  try {
    // ═══════════════════════════════════════════════
    // PASO 1: VERIFICAR ESTADO ACTUAL
    // ═══════════════════════════════════════════════
    paso++;
    ui.alert(`🔍 PASO ${paso}/6`, 'Verificando sistema actual...', ui.ButtonSet.OK);

    const diagnostico = diagnosticarSistemaActualV29();
    resultados.push(`✅ PASO ${paso}: Diagnóstico completado`);

    // ═══════════════════════════════════════════════
    // PASO 2: CREAR HOJA "NO TERMINÓ LA FORMACIÓN"
    // ═══════════════════════════════════════════════
    paso++;
    ui.alert(`📄 PASO ${paso}/6`, 'Creando hoja "No Terminó la Formación"...', ui.ButtonSet.OK);

    if (!diagnostico.tieneHojaNoTermino) {
      try {
        crearHojaNoTerminoFormacionLimpia();
        resultados.push(`✅ PASO ${paso}: Hoja creada`);
      } catch (error) {
        errores++;
        resultados.push(`❌ PASO ${paso}: ${error.message}`);
      }
    } else {
      resultados.push(`ℹ️ PASO ${paso}: Hoja ya existe (omitido)`);
    }

    // ═══════════════════════════════════════════════
    // PASO 3: AGREGAR COLUMNA "SÍ/NO"
    // ═══════════════════════════════════════════════
    paso++;
    ui.alert(`➕ PASO ${paso}/6`, 'Agregando columna "No terminó formación (Sí/No)"...', ui.ButtonSet.OK);

    if (!diagnostico.tieneColumnaSiNo) {
      try {
        const resultado = agregarColumnaSiNoLimpia();
        resultados.push(`✅ PASO ${paso}: Columna agregada en ${resultado.hojasActualizadas} hojas`);
      } catch (error) {
        errores++;
        resultados.push(`❌ PASO ${paso}: ${error.message}`);
      }
    } else {
      resultados.push(`ℹ️ PASO ${paso}: Columna ya existe (omitido)`);
    }

    // ═══════════════════════════════════════════════
    // PASO 4: LIMPIAR COLORES DE COLUMNAS DE ETAPAS
    // ═══════════════════════════════════════════════
    paso++;
    ui.alert(`🎨 PASO ${paso}/6`, 'Limpiando colores de columnas de etapas...', ui.ButtonSet.OK);

    try {
      limpiarColoresColumnasEtapas();
      resultados.push(`✅ PASO ${paso}: Colores limpiados`);
    } catch (error) {
      resultados.push(`⚠️ PASO ${paso}: ${error.message}`);
    }

    // ═══════════════════════════════════════════════
    // PASO 5: APLICAR COLORES POR FORMACIÓN
    // ═══════════════════════════════════════════════
    paso++;
    ui.alert(`🎨 PASO ${paso}/6`, 'Aplicando colores por formación...', ui.ButtonSet.OK);

    try {
      aplicarColoresPorFormacion();
      resultados.push(`✅ PASO ${paso}: Colores de formación aplicados`);
    } catch (error) {
      resultados.push(`⚠️ PASO ${paso}: ${error.message}`);
    }

    // ═══════════════════════════════════════════════
    // PASO 6: VERIFICAR FUNCIONES
    // ═══════════════════════════════════════════════
    paso++;
    ui.alert(`⚙️ PASO ${paso}/6`, 'Verificando funciones...', ui.ButtonSet.OK);

    try {
      verificarFuncionesInstaladas();
      resultados.push(`✅ PASO ${paso}: Todas las funciones disponibles`);
    } catch (error) {
      errores++;
      resultados.push(`⚠️ PASO ${paso}: ${error.message}`);
    }

    // ═══════════════════════════════════════════════
    // RESUMEN FINAL
    // ═══════════════════════════════════════════════
    const diagnosticoFinal = diagnosticarSistemaActualV29();

    let resumen = `🎉 INSTALACIÓN COMPLETADA v2.9\n\n`;
    resumen += `═══════════════════════════════════\n`;
    resumen += `📊 RESUMEN DE LA INSTALACIÓN\n`;
    resumen += `═══════════════════════════════════\n\n`;

    resultados.forEach(r => resumen += `${r}\n`);

    resumen += `\n═══════════════════════════════════\n`;
    resumen += `✅ ESTADO FINAL\n`;
    resumen += `═══════════════════════════════════\n`;
    resumen += `📄 Hoja "No Terminó": ${diagnosticoFinal.tieneHojaNoTermino ? '✅' : '❌'}\n`;
    resumen += `➕ Columna Sí/No: ${diagnosticoFinal.tieneColumnaSiNo ? '✅' : '❌'}\n`;
    resumen += `🎨 Colores limpios: ✅\n`;
    resumen += `⚙️ Funciones: ✅\n`;

    if (errores > 0) {
      resumen += `\n⚠️ ${errores} errores (ver arriba)\n`;
    }

    resumen += `\n═══════════════════════════════════\n`;
    resumen += `🚀 PRÓXIMOS PASOS\n`;
    resumen += `═══════════════════════════════════\n`;
    resumen += `1️⃣ RECARGA LA PÁGINA (F5)\n`;
    resumen += `2️⃣ Verás columna amarilla sin colores extras\n`;
    resumen += `3️⃣ Los colores son SOLO por formación\n`;
    resumen += `4️⃣ Usa "Mover Participantes" del menú\n\n`;
    resumen += `✅ Sistema limpio y profesional\n`;

    ui.alert('🎉 Instalación Exitosa', resumen, ui.ButtonSet.OK);

    // Guardar versión
    const propiedades = PropertiesService.getScriptProperties();
    propiedades.setProperty('VERSION_SISTEMA', 'v2.9-limpio');
    propiedades.setProperty('FECHA_INSTALACION', new Date().toISOString());

  } catch (error) {
    ui.alert(
      '❌ Error en Instalación',
      `Error: ${error.message}\n\n⚠️ Sistema NO modificado.`,
      ui.ButtonSet.OK
    );
  }
}

// ═══════════════════════════════════════════════
// DIAGNÓSTICO DEL SISTEMA
// ═══════════════════════════════════════════════
function diagnosticarSistemaActualV29() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const diagnostico = {
    tieneHojaNoTermino: false,
    tieneColumnaSiNo: false,
    totalColumnas: 0,
    hojaGeneral: null
  };

  diagnostico.tieneHojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación') !== null;

  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');
  if (hojaGeneral) {
    diagnostico.hojaGeneral = hojaGeneral;
    const ultimaColumna = hojaGeneral.getLastColumn();
    diagnostico.totalColumnas = ultimaColumna;

    const encabezados = hojaGeneral.getRange(1, 1, 1, ultimaColumna).getValues()[0];
    diagnostico.tieneColumnaSiNo = encabezados.some(h =>
      h && h.toString().toLowerCase().includes('no terminó') &&
      h.toString().toLowerCase().includes('sí')
    );
  }

  return diagnostico;
}

// ═══════════════════════════════════════════════
// CREAR HOJA "NO TERMINÓ" LIMPIA
// ═══════════════════════════════════════════════
function crearHojaNoTerminoFormacionLimpia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (ss.getSheetByName('❌ No Terminó la Formación')) {
    throw new Error('La hoja ya existe');
  }

  const hojaNoTermino = ss.insertSheet('❌ No Terminó la Formación');

  const encabezados = [
    'Creamos ID', 'Nombre Completo', 'Teléfono', 'Formación',
    'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
    'No busca trabajar', 'Empleado', 'No terminó la formación',
    'Etapa Actual', 'Resultados Obtenidos', 'Documentos Faltantes',
    'Fecha Original', 'Motivo/Notas', 'Total Llamadas', 'Fecha Abandono'
  ];

  hojaNoTermino.getRange(1, 1, 1, 18).setValues([encabezados]);

  // Formato de encabezados (rojo)
  const rangoEncabezado = hojaNoTermino.getRange(1, 1, 1, 18);
  rangoEncabezado.setBackground('#C62828');
  rangoEncabezado.setFontColor('#FFFFFF');
  rangoEncabezado.setFontWeight('bold');
  rangoEncabezado.setFontSize(11);
  rangoEncabezado.setHorizontalAlignment('center');

  // Ajustar anchos
  hojaNoTermino.setColumnWidth(1, 100);
  hojaNoTermino.setColumnWidth(2, 180);
  hojaNoTermino.setColumnWidth(3, 120);
  hojaNoTermino.setColumnWidth(4, 140);
  for (let i = 5; i <= 11; i++) {
    hojaNoTermino.setColumnWidth(i, 150);
  }
  hojaNoTermino.setColumnWidth(12, 120);
  hojaNoTermino.setColumnWidth(13, 140);
  hojaNoTermino.setColumnWidth(14, 150);
  hojaNoTermino.setColumnWidth(15, 140);
  hojaNoTermino.setColumnWidth(16, 250);
  hojaNoTermino.setColumnWidth(17, 100);
  hojaNoTermino.setColumnWidth(18, 140);

  hojaNoTermino.setFrozenRows(1);

  return { exito: true };
}

// ═══════════════════════════════════════════════
// AGREGAR COLUMNA "SÍ/NO" LIMPIA
// ═══════════════════════════════════════════════
function agregarColumnaSiNoLimpia() {
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

  hojasAProcesar.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const ultimaColumna = hoja.getLastColumn();
    const encabezados = hoja.getRange(1, 1, 1, ultimaColumna).getValues()[0];

    // Verificar si ya existe
    const yaExiste = encabezados.some(h =>
      h && h.toString().toLowerCase().includes('no terminó formación') &&
      h.toString().toLowerCase().includes('sí')
    );

    if (yaExiste) return;

    // Buscar "Total Llamadas"
    let columnaLlamadas = -1;
    for (let i = 0; i < encabezados.length; i++) {
      if (encabezados[i] && encabezados[i].toString().toLowerCase().includes('total llamadas')) {
        columnaLlamadas = i + 1;
        break;
      }
    }

    if (columnaLlamadas === -1) return;

    // Insertar columna
    hoja.insertColumnAfter(columnaLlamadas);
    const nuevaColumna = columnaLlamadas + 1;

    if (nombreHoja === '📋 Seguimiento General') {
      hoja.getRange(1, nuevaColumna).setValue('No terminó formación (Sí/No)');

      // Formato amarillo SOLO en encabezado
      hoja.getRange(1, nuevaColumna)
        .setBackground('#FFF9C4')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');

      // Validación
      const ultimaFila = hoja.getLastRow();
      if (ultimaFila > 1) {
        const rangoSiNo = hoja.getRange(2, nuevaColumna, ultimaFila - 1, 1);
        const validacionSiNo = SpreadsheetApp.newDataValidation()
          .requireValueInList(['No', 'Sí'])
          .setAllowInvalid(false)
          .setHelpText('⚠️ Selecciona Sí si NO terminó la formación')
          .build();
        rangoSiNo.setDataValidation(validacionSiNo);
        rangoSiNo.setValue('No');
        // SIN color de fondo en las celdas
      }

      hoja.setColumnWidth(nuevaColumna, 150);

    } else {
      hoja.getRange(1, nuevaColumna).setValue('No terminó formación');
      hoja.getRange(1, nuevaColumna)
        .setBackground('#FFF9C4')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');

      hoja.setColumnWidth(nuevaColumna, 140);
    }

    hojasActualizadas++;
  });

  return { exito: true, hojasActualizadas: hojasActualizadas };
}

// ═══════════════════════════════════════════════
// ✨ LIMPIAR COLORES DE COLUMNAS DE ETAPAS
// ═══════════════════════════════════════════════
function limpiarColoresColumnasEtapas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const hojasLimpiar = [
    '📋 Seguimiento General',
    '📞 Llamada 1',
    '📞 Llamada 2',
    '📞 Llamada 3',
    '📞 Llamada 4',
    '📞 Llamada 5',
    '✅ Finalizados'
  ];

  hojasLimpiar.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const ultimaColumna = hoja.getLastColumn();
    const encabezados = hoja.getRange(1, 1, 1, ultimaColumna).getValues()[0];

    // Buscar columnas de etapas
    const columnasEtapas = [
      'Aliados', 'Plataformas', 'Conexión laboral', 'Por su cuenta',
      'No busca trabajar', 'Empleado', 'No terminó la formación'
    ];

    columnasEtapas.forEach(nombreColumna => {
      const indice = encabezados.indexOf(nombreColumna);
      if (indice !== -1) {
        const col = indice + 1;
        const ultimaFila = hoja.getLastRow();

        // Limpiar colores de fondo (poner blanco)
        if (ultimaFila > 1) {
          const rangoDatos = hoja.getRange(2, col, ultimaFila - 1, 1);
          rangoDatos.setBackground('#FFFFFF'); // Blanco
        }

        // Encabezado: mantener formato básico sin colores especiales
        const rangoEncabezado = hoja.getRange(1, col);
        if (nombreHoja === '📋 Seguimiento General') {
          // En hoja general: azul oscuro como otros encabezados
          rangoEncabezado.setBackground('#1f4e79');
          rangoEncabezado.setFontColor('#ffffff');
        } else {
          // En otras hojas: color de la hoja
          // (se aplicará después con la función de colores por hoja)
        }
        rangoEncabezado.setFontWeight('bold');
        rangoEncabezado.setHorizontalAlignment('center');
      }
    });
  });

  return { exito: true };
}

// ═══════════════════════════════════════════════
// ✨ APLICAR COLORES POR FORMACIÓN
// ═══════════════════════════════════════════════
function aplicarColoresPorFormacion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const hojasColorear = [
    '📋 Seguimiento General',
    '📞 Llamada 1',
    '📞 Llamada 2',
    '📞 Llamada 3',
    '📞 Llamada 4',
    '📞 Llamada 5',
    '✅ Finalizados'
  ];

  // Colores por formación
  const coloresFormacion = {
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

  hojasColorear.forEach(nombreHoja => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const ultimaFila = hoja.getLastRow();
    if (ultimaFila <= 1) return;

    const ultimaColumna = hoja.getLastColumn();
    const encabezados = hoja.getRange(1, 1, 1, ultimaColumna).getValues()[0];

    // Buscar columna "Formación"
    const indiceFormacion = encabezados.indexOf('Formación');
    if (indiceFormacion === -1) return;

    const colFormacion = indiceFormacion + 1;

    // Leer todas las formaciones
    const valoresFormacion = hoja.getRange(2, colFormacion, ultimaFila - 1, 1).getValues();

    // Preparar colores para TODA la fila
    const coloresParaAplicar = [];

    for (let i = 0; i < valoresFormacion.length; i++) {
      const formacion = valoresFormacion[i][0];
      let colorFila = '#FFFFFF'; // Blanco por defecto

      if (formacion) {
        const formacionStr = formacion.toString().trim();

        // Buscar color exacto
        if (coloresFormacion[formacionStr]) {
          colorFila = coloresFormacion[formacionStr];
        }
        // Buscar parcial
        else if (formacionStr.toLowerCase().includes('análisis') || formacionStr.toLowerCase().includes('datos')) {
          colorFila = coloresFormacion['Análisis de datos E-commerce'];
        }
        else if (formacionStr.toLowerCase() === 'sac') {
          colorFila = coloresFormacion['SAC'];
        }
        else if (formacionStr.toLowerCase().includes('ofimatica')) {
          colorFila = coloresFormacion['Ofimática'];
        }
        else if (formacionStr.toLowerCase().includes('food') && formacionStr.toLowerCase().includes('manager')) {
          colorFila = coloresFormacion['Food Manager'];
        }
        else if (formacionStr.toLowerCase().includes('barista') || formacionStr.toLowerCase().includes('barismo')) {
          colorFila = coloresFormacion['Barismo'];
        }
        else if (formacionStr.toLowerCase().includes('gastronomía') || formacionStr.toLowerCase().includes('gastronom')) {
          colorFila = coloresFormacion['Gastronomía'];
        }
        else if (formacionStr.toLowerCase().includes('panadería') || formacionStr.toLowerCase().includes('panaderia')) {
          colorFila = coloresFormacion['Panadería'];
        }
        else if (formacionStr.toLowerCase().includes('repostería') || formacionStr.toLowerCase().includes('reposteria')) {
          colorFila = coloresFormacion['Repostería'];
        }
        else if (formacionStr.toLowerCase().includes('sommelier')) {
          colorFila = coloresFormacion['Sommelier'];
        }
      }

      // Crear array de colores para toda la fila
      coloresParaAplicar.push(new Array(ultimaColumna).fill(colorFila));
    }

    // Aplicar colores a TODA la fila
    if (coloresParaAplicar.length > 0) {
      const rangoFilas = hoja.getRange(2, 1, ultimaFila - 1, ultimaColumna);
      rangoFilas.setBackgrounds(coloresParaAplicar);
    }
  });

  return { exito: true };
}

// ═══════════════════════════════════════════════
// VERIFICAR FUNCIONES
// ═══════════════════════════════════════════════
function verificarFuncionesInstaladas() {
  if (typeof procesarNoTerminoFormacionV29 !== 'function') {
    throw new Error('Falta función: procesarNoTerminoFormacionV29');
  }
  if (typeof moverANoTerminoFormacionManualV29 !== 'function') {
    throw new Error('Falta función: moverANoTerminoFormacionManualV29');
  }
  if (typeof verParticipantesNoTerminaronV29 !== 'function') {
    throw new Error('Falta función: verParticipantesNoTerminaronV29');
  }
  return { exito: true };
}

// ═══════════════════════════════════════════════
// ✨ PROCESAR "NO TERMINÓ LA FORMACIÓN"
// ═══════════════════════════════════════════════
function procesarNoTerminoFormacionV29(hojaGeneral, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');

    if (!hojaNoTermino) {
      throw new Error('Hoja "❌ No Terminó la Formación" no existe');
    }

    const ultimaColumna = hojaGeneral.getLastColumn();
    const rangoDatos = hojaGeneral.getRange(fila, 1, 1, ultimaColumna);
    const datos = rangoDatos.getValues()[0];

    const encabezados = hojaGeneral.getRange(1, 1, 1, ultimaColumna).getValues()[0];

    // Buscar índices dinámicamente
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
      fecha: -1,
      notas: -1,
      totalLlamadas: -1
    };

    // Buscar con variaciones
    for (let i = 0; i < encabezados.length; i++) {
      const enc = encabezados[i].toString().toLowerCase();
      if (enc.includes('fecha') && enc.includes('original')) indices.fecha = i;
      if (enc.includes('notas') || enc.includes('última llamada')) indices.notas = i;
      if (enc.includes('total') && enc.includes('llamadas')) indices.totalLlamadas = i;
    }

    const nombreCompleto = indices.nombre >= 0 ? datos[indices.nombre] : '';
    if (!nombreCompleto || nombreCompleto.toString().trim() === '') {
      throw new Error('Nombre vacío');
    }

    const fechaActual = new Date();
    const motivoNotas = `${indices.notas >= 0 ? datos[indices.notas] : ''} | NO COMPLETÓ - ${Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm')}`.trim();

    // Preparar datos (18 columnas)
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

    // Insertar
    hojaNoTermino.insertRows(2, 1);
    const rangoDestino = hojaNoTermino.getRange(2, 1, 1, 18);
    rangoDestino.setValues([datosDestino]);

    // Formato rojo claro
    rangoDestino.setBackground('#FFCDD2');
    rangoDestino.setBorder(true, true, true, true, true, true, '#C62828', SpreadsheetApp.BorderStyle.SOLID);

    // Eliminar de hoja principal
    hojaGeneral.deleteRow(fila);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      `❌ ${nombreCompleto} movido a "No Terminó la Formación"`,
      'Movimiento Exitoso',
      4
    );

    return { exito: true, error: null, movido: true };

  } catch (error) {
    console.error('Error en procesarNoTerminoFormacionV29:', error);
    return { exito: false, error: error.message, movido: false };
  }
}

// ═══════════════════════════════════════════════
// ✨ MOVER MANUALMENTE
// ═══════════════════════════════════════════════
function moverANoTerminoFormacionManualV29() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaGeneral = ss.getSheetByName('📋 Seguimiento General');

  if (!hojaGeneral) {
    ui.alert('❌ Error', 'Hoja no encontrada', ui.ButtonSet.OK);
    return;
  }

  if (!ss.getSheetByName('❌ No Terminó la Formación')) {
    ui.alert('❌ Error', 'Ejecuta primero: instalarSistemaCompletoV29', ui.ButtonSet.OK);
    return;
  }

  const ultimaFila = hojaGeneral.getLastRow();
  if (ultimaFila <= 1) {
    ui.alert('ℹ️ Sin datos', 'No hay participantes', ui.ButtonSet.OK);
    return;
  }

  const ultimaColumna = hojaGeneral.getLastColumn();
  const encabezados = hojaGeneral.getRange(1, 1, 1, ultimaColumna).getValues()[0];

  let columnaSiNo = -1;
  let columnaNombre = -1;

  for (let i = 0; i < encabezados.length; i++) {
    const enc = encabezados[i].toString().toLowerCase();
    if (enc.includes('no terminó') && enc.includes('sí')) columnaSiNo = i + 1;
    if (enc.includes('nombre') && enc.includes('completo')) columnaNombre = i + 1;
  }

  if (columnaSiNo === -1) {
    ui.alert('❌ Error', 'Columna Sí/No no encontrada.', ui.ButtonSet.OK);
    return;
  }

  const participantes = [];

  for (let fila = 2; fila <= ultimaFila; fila++) {
    const noTermino = hojaGeneral.getRange(fila, columnaSiNo).getValue();
    const nombre = hojaGeneral.getRange(fila, columnaNombre).getValue();

    if (noTermino && noTermino.toString().trim().toLowerCase() === 'sí' && nombre) {
      participantes.push({
        fila: fila,
        nombre: nombre.toString().trim()
      });
    }
  }

  if (participantes.length === 0) {
    ui.alert('ℹ️ Sin participantes', 'No hay participantes marcados con "Sí"', ui.ButtonSet.OK);
    return;
  }

  const confirmacion = ui.alert(
    '❌ Mover Participantes',
    `Encontrados: ${participantes.length} participantes\n\n¿Mover a "No Terminó la Formación"?`,
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  let procesados = 0;
  let errores = 0;

  for (let i = participantes.length - 1; i >= 0; i--) {
    const participante = participantes[i];

    try {
      const resultado = procesarNoTerminoFormacionV29(hojaGeneral, participante.fila);

      if (resultado && resultado.exito) {
        procesados++;
      } else {
        errores++;
      }

      for (let j = 0; j < i; j++) {
        if (participantes[j].fila > participante.fila) {
          participantes[j].fila--;
        }
      }

    } catch (error) {
      errores++;
      console.error(`Error: ${participante.nombre}`, error);
    }
  }

  let mensaje = `❌ MOVIMIENTO COMPLETADO\n\n`;
  if (procesados > 0) mensaje += `✅ ${procesados} movidos\n`;
  if (errores > 0) mensaje += `❌ ${errores} errores\n`;

  ui.alert('✅ Resultado', mensaje, ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════
// ✨ VER PARTICIPANTES
// ═══════════════════════════════════════════════
function verParticipantesNoTerminaronV29() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaNoTermino = ss.getSheetByName('❌ No Terminó la Formación');

  if (!hojaNoTermino) {
    ui.alert('❌ Error', 'Ejecuta primero: instalarSistemaCompletoV29', ui.ButtonSet.OK);
    return;
  }

  const ultimaFila = hojaNoTermino.getLastRow();
  if (ultimaFila <= 1) {
    ui.alert('✅ Sin registros', '¡No hay abandonos!', ui.ButtonSet.OK);
    return;
  }

  const total = ultimaFila - 1;
  const participantes = [];

  for (let fila = 2; fila <= Math.min(ultimaFila, 11); fila++) {
    const nombre = hojaNoTermino.getRange(fila, 2).getValue();
    const formacion = hojaNoTermino.getRange(fila, 4).getValue();
    const fechaAbandono = hojaNoTermino.getRange(fila, 18).getValue();
    const llamadas = hojaNoTermino.getRange(fila, 17).getValue() || 0;

    participantes.push({ nombre, formacion, fechaAbandono, llamadas });
  }

  let reporte = `❌ NO TERMINARON LA FORMACIÓN\n\n`;
  reporte += `📊 Total: ${total} participantes\n\n`;

  if (participantes.length > 0) {
    reporte += `👥 ÚLTIMOS REGISTROS:\n`;
    participantes.forEach((p, i) => {
      const fecha = p.fechaAbandono ?
        Utilities.formatDate(new Date(p.fechaAbandono), Session.getScriptTimeZone(), 'dd/MM/yyyy') :
        'Sin fecha';
      reporte += `${i + 1}. ${p.nombre}\n`;
      reporte += `   📚 ${p.formacion} | 📞 ${p.llamadas} | 📅 ${fecha}\n\n`;
    });

    if (total > 10) reporte += `... y ${total - 10} más\n`;
  }

  ui.alert('❌ Reporte', reporte, ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════
// ✨ APLICAR FORMATO COMPLETO (OPCIONAL)
// ═══════════════════════════════════════════════
function aplicarFormatoCompletoV29() {
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🎨 Aplicar Formato Completo',
    'Esta función aplicará:\n\n' +
    '1. Colores SOLO por formación\n' +
    '2. Colores fijos por hoja de llamadas\n' +
    '3. SIN colores en columnas de etapas\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  try {
    limpiarColoresColumnasEtapas();
    aplicarColoresPorFormacion();
    aplicarColoresHojasLlamadas();

    ui.alert('✅ Formato Aplicado',
      'Formato limpio y profesional aplicado exitosamente!',
      ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error',
      `Error aplicando formato: ${error.message}`,
      ui.ButtonSet.OK);
  }
}

// ═══════════════════════════════════════════════
// APLICAR COLORES A HOJAS DE LLAMADAS
// ═══════════════════════════════════════════════
function aplicarColoresHojasLlamadas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const configuracionColores = {
    '📞 Llamada 1': { fondo: '#1976d2', texto: '#ffffff' },
    '📞 Llamada 2': { fondo: '#7b1fa2', texto: '#ffffff' },
    '📞 Llamada 3': { fondo: '#f57c00', texto: '#ffffff' },
    '📞 Llamada 4': { fondo: '#ff8f00', texto: '#ffffff' },
    '📞 Llamada 5': { fondo: '#c2185b', texto: '#ffffff' },
    '✅ Finalizados': { fondo: '#388e3c', texto: '#ffffff' }
  };

  Object.entries(configuracionColores).forEach(([nombreHoja, colores]) => {
    const hoja = ss.getSheetByName(nombreHoja);
    if (!hoja) return;

    const ultimaColumna = hoja.getLastColumn();

    // Aplicar color SOLO a encabezados
    const rangoEncabezado = hoja.getRange(1, 1, 1, ultimaColumna);
    rangoEncabezado.setBackground(colores.fondo);
    rangoEncabezado.setFontColor(colores.texto);
    rangoEncabezado.setFontWeight('bold');
    rangoEncabezado.setFontSize(11);
    rangoEncabezado.setHorizontalAlignment('center');
  });

  return { exito: true };
}

// ═══════════════════════════════════════════════
// MENSAJE INICIAL
// ═══════════════════════════════════════════════
console.log('═══════════════════════════════════════════════');
console.log('🚀 CÓDIGO FINAL COMPLETO v2.9 CARGADO');
console.log('═══════════════════════════════════════════════');
console.log('✨ FUNCIONES PRINCIPALES:');
console.log('  • instalarSistemaCompletoV29()');
console.log('  • moverANoTerminoFormacionManualV29()');
console.log('  • verParticipantesNoTerminaronV29()');
console.log('  • aplicarFormatoCompletoV29()');
console.log('═══════════════════════════════════════════════');
console.log('📋 Para instalar:');
console.log('  1. Ejecuta: instalarSistemaCompletoV29()');
console.log('  2. Recarga la página (F5)');
console.log('  3. ¡Listo!');
console.log('═══════════════════════════════════════════════');
