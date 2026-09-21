import { icon } from '../ui.js'

/* Todas las cifras provienen de PLAN_INVERSION.md, Resumen_Ejecutivo_Temis.md y
   Memo_Temis_David_Marin.md, al 20 de septiembre de 2026. Son rangos de
   planificación: no son cotización y no autorizan ningún pago. */

/* --------------------------------- piezas --------------------------------- */

const figure = ({ label, value, unit, note, accent }) => `
  <div class="figure ${accent ? 'figure--accent' : ''} vi">
    <span class="figure__label">${label}</span>
    <span class="figure__value">${value}${unit ? `<small> ${unit}</small>` : ''}</span>
    <span class="figure__note">${note}</span>
  </div>`

const ledger = ({ head, cols, rows, foot }) => `
  <div class="ledger vi">
    ${head ? `<div class="ledger__head"><b>${head}</b>${cols ? `<span>${cols}</span>` : ''}</div>` : ''}
    ${rows.map(r => `
      <div class="ledger__row ${r.total ? 'is-total' : ''}">
        <span>${r.label}${r.note ? `<small>${r.note}</small>` : ''}</span>
        <b>${r.value}</b>
      </div>`).join('')}
    ${foot ? `<p class="ledger__foot">${foot}</p>` : ''}
  </div>`

const matrix = ({ tone, ico, head, rule, items }) => `
  <div class="matrix__col matrix--${tone} vi">
    <span class="matrix__head">${icon(ico)}${head}</span>
    <p class="matrix__rule">${rule}</p>
    <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
  </div>`

// Barra de mínimo y máximo. Todas las barras de una escena comparten `scale`,
// o la comparación visual mentiría.
const range = ({ label, min, max, scale, unit }) => `
  <div class="range vi">
    <span class="range__head"><span>${label}</span><b>${min} – ${max} ${unit}</b></span>
    <span class="range__bar"><i class="range__fill" style="left:${(min / scale) * 100}%;right:${100 - (max / scale) * 100}%"></i></span>
  </div>`

const track = rows => `
  <div class="track vi">
    ${rows.map(r => `
      <div class="track__row">
        <span class="track__when"><b>${r.when}</b><small>${r.spend}</small></span>
        <span class="track__what">
          <span>${r.what}</span>
          <span class="track__gate">${icon('check')}${r.gate}</span>
        </span>
      </div>`).join('')}
  </div>`

const scenario = ({ tag, clients, rows, read, goal }) => `
  <div class="case ${goal ? 'case--goal' : ''} vi">
    <span class="case__tag">${tag}</span>
    <span class="case__clients">${clients}<small> clientes</small></span>
    <dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <p class="case__read">${read}</p>
  </div>`

const profile = ({ tone, ico, head, traits }) => `
  <div class="profile__col profile--${tone} vi">
    <span class="profile__head">${icon(ico)}${head}</span>
    ${traits.map(t => `<span class="trait">${t}</span>`).join('')}
  </div>`

const risk = ([threat, control]) => `
  <div class="risk vi"><b>${threat}</b><span>${icon('check')}${control}</span></div>`

const model = ({ state, name, what, tag }) => `
  <div class="model model--${state} vi">
    <b>${name}</b><small>${what}</small>
    <span class="model__tag">${tag}</span>
  </div>`

const column = ({ who, initials, open, items }) => `
  <div class="split__col ${open ? 'split--open' : ''} vi">
    <span class="split__who"><i>${initials}</i>${who}</span>
    <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
  </div>`

const plan = ({ name, setup, month, limits }) => `
  <div class="plan vi">
    <span class="plan__name">${name}</span>
    <span class="plan__price">USD ${setup}<small>instalación</small></span>
    <span class="plan__month">+ USD ${month}<small> /mes</small></span>
    <ul>${limits.map(l => `<li>${l}</li>`).join('')}</ul>
  </div>`

const callout = (text, tone = '', ico = 'alert') =>
  `<p class="callout ${tone ? `callout--${tone}` : ''} vi">${icon(ico)}<span>${text}</span></p>`

/* --------------------------------- escenas -------------------------------- */

export const scenes = [
  {
    id: 'portada',
    tone: 'dark',
    kicker: 'Propuesta de sociedad',
    lockup: 'Propuesta de sociedad',
    title: 'Lo que ya está construido, <em>y lo que falta por probar.</em>',
    lede: 'Para David Marín. De Anyelo Petit. Septiembre de 2026.',
    foot: 'Documento de trabajo. Las cifras son propuestas de partida expresadas como rangos de planificación: no son una cotización y ninguna autoriza un pago.',
    visual: () => `
      <div class="stack">
        ${ledger({
          head: 'De un vistazo', cols: 'Piloto de 90 días',
          rows: [
            { label: 'Producto', note: 'Catálogo web + solicitudes por WhatsApp + panel', value: 'Construido' },
            { label: 'Mercado inicial', note: 'Máximo cinco durante la validación', value: 'Renta de autos' },
            { label: 'Caja necesaria', note: 'Sólo después de cobrar la primera instalación', value: 'USD 100 – 230' },
            { label: 'Trabajo necesario', note: 'Entre los dos, 13 semanas', value: '130 – 290 h' },
            { label: 'Lo que te pido', note: 'Aprobar el piloto y elegir el modelo de cobro', value: 'Una decisión', total: true },
          ],
        })}
        ${callout('Lo que este documento financia no es construir la plataforma —ya está pagada con horas previas— sino <b>comprobar que alguien paga por ella</b>.', 'violet', 'bulb')}
      </div>`,
  },

  {
    id: 'decision',
    tone: 'light',
    num: '02',
    kicker: 'La decisión',
    wide: true,
    title: 'Poco dinero. <em>Mucho tiempo.</em>',
    lede: 'Ese es el trato real y conviene que quede claro desde el primer día: este proyecto arriesga muy poco capital y una cantidad seria de horas.',
    points: [
      { ico: 'shield', title: 'El dinero está protegido', note: 'No se gasta nada hasta haber cobrado la primera instalación.' },
      { ico: 'clock', title: 'El tiempo no se recupera', note: 'Las horas son la inversión de verdad, y son irreversibles.' },
    ],
    visual: () => `
      <div class="stack">
        <div class="figures">
          ${figure({ label: 'Caja antes de vender', value: 'USD 0', note: 'La demo corre en infraestructura gratuita. No se contrata nada.' })}
          ${figure({ label: 'Caja después del primer cobro', value: '100 – 230', unit: 'USD', note: 'Despliegue y reserva de contingencia, financiados por la instalación cobrada.', accent: true })}
          ${figure({ label: 'Trabajo en 13 semanas', value: '130 – 290', unit: 'horas', note: 'Entre 9 y 20 horas por semana sostenidas, entre los dos.' })}
        </div>
        ${callout('A USD 30/hora de referencia, esas horas valen <b>USD 3.420 a 7.740</b>. El coste de oportunidad es diez veces el capital en riesgo: por eso la conversación importante no es sobre dinero.', 'violet', 'clock')}
      </div>`,
  },

  {
    id: 'producto',
    tone: 'light',
    num: '03',
    kicker: 'El producto',
    title: 'Un catálogo que cotiza, <em>y un WhatsApp ordenado.</em>',
    lede: 'La empresa publica su inventario con precios y condiciones. Su cliente elige, define fechas y envía una solicitud ya cotizada que continúa en el WhatsApp del propio negocio.',
    points: [
      { ico: 'check', title: 'Lo que cambia para el cliente', note: 'Deja de improvisar: el precio sale del catálogo y la solicitud llega completa y registrada.' },
      { ico: 'alert', title: 'Lo que no prometemos', note: 'No hemos medido que venda más. El beneficio demostrable hoy es el orden, no el volumen.' },
    ],
    visual: () => `
      <div class="stack">
        ${ledger({
          head: 'El recorrido completo', cols: 'Cuatro pasos',
          rows: [
            { label: '1 · La empresa publica', note: 'Vehículos, fotos, precios en USD con referencia BCV', value: 'Catálogo' },
            { label: '2 · El cliente final cotiza', note: 'Elige unidad, fecha y hora de retiro y devolución', value: 'Solicitud' },
            { label: '3 · La conversación sigue', note: 'En el número de WhatsApp de la propia empresa, con los datos ya escritos', value: 'WhatsApp' },
            { label: '4 · Una persona confirma', note: 'Verifica pago y disponibilidad desde el panel', value: 'Reserva' },
          ],
          foot: 'La solicitud que nadie atiende vence sola. El plazo se configura por empresa y arranca en diez minutos.',
        })}
        ${callout('Detrás hay una segunda mitad que <b>todavía no vendemos</b>: un motor que lee ventas e inventario y detecta caídas, quiebres de stock y clientes inactivos. Está construido, sin probar con datos reales de nadie.', 'violet', 'bulb')}
      </div>`,
  },

  {
    id: 'estado',
    tone: 'light',
    num: '04',
    kicker: 'Estado real',
    wide: true,
    title: 'Qué puedes prometer <em>y qué no.</em>',
    lede: 'De esta tabla depende tu credibilidad en una reunión. La regla es simple: sólo la primera columna se vende.',
    foot: 'El repositorio mantiene 39 pruebas automatizadas. Es una red de seguridad razonable para esta etapa, no una garantía de calidad de cara a un cliente.',
    visual: () => `
      <div class="stack">
        <div class="matrix">
          ${matrix({
            tone: 'go', ico: 'check', head: 'Se vende',
            rule: 'Demostrable en vivo y comprometible en una propuesta.',
            items: [
              'Catálogo público por empresa',
              'Solicitud con fecha, hora y duración',
              'Cotización en USD con referencia BCV',
              'Panel, reservas, calendario y evidencia de pago',
              'Vencimiento configurable de solicitudes',
              'Aislamiento de datos entre empresas',
            ],
          })}
          ${matrix({
            tone: 'wait', ico: 'alert', head: 'Se demuestra, advirtiendo',
            rule: 'Existe en código y puede probarse. No se cotiza como producto terminado.',
            items: [
              'WhatsApp Cloud API: construido, nunca activado con una cuenta real',
              'Bot de consultas de catálogo y horarios',
              'Importación de datos desde Excel',
              'Motor de hallazgos con ocho detectores',
              'Onboarding guiado',
            ],
          })}
          ${matrix({
            tone: 'stop', ico: 'alert', head: 'No se menciona',
            rule: 'Decisión deliberada. No se promete, no se estima, no entra en ninguna propuesta.',
            items: [
              'Pagos en línea, depósitos y garantías',
              'Contratos y firma digital',
              'Sincronización en vivo con Saint o PSKloud',
              'Multisucursal, flotas compartidas y delivery',
              'Inmobiliarias y supermercados',
            ],
          })}
        </div>
        ${callout('Falta además la <b>puesta en producción</b>: certificado de seguridad, respaldos automáticos, monitoreo, correo de sistema y alta de clientes sin tocar el servidor. Son <b>16 a 32 horas</b>. No es producto nuevo; es dejarlo listo para tocar datos de alguien real.')}
      </div>`,
  },

  {
    id: 'enfoque',
    tone: 'light',
    num: '05',
    kicker: 'El enfoque',
    title: 'Tres reglas que explican <em>casi todas las decisiones.</em>',
    lede: 'Si entiendes estas tres, entiendes por qué el proyecto está armado como está.',
    points: [
      { ico: 'target', title: 'Un solo tipo de cliente', note: 'Renta de autos y nada más, hasta que el proceso se repita.' },
      { ico: 'users', title: 'Una persona confirma, siempre', note: 'El bot informa; no compromete pagos, reservas ni inventario.' },
      { ico: 'wallet', title: 'No se gasta antes de cobrar', note: 'La infraestructura se contrata después de la primera instalación.' },
    ],
    visual: () => `
      <div class="stack">
        ${ledger({
          head: 'Por qué cada regla', cols: 'Consecuencia',
          rows: [
            { label: 'Un solo vertical', note: 'Cada sector nuevo exige adaptar pantallas y reglas', value: 'Desarrollo que nadie paga' },
            { label: 'Confirmación humana', note: 'Un bot que promete un carro ya alquilado nos cuesta el cliente', value: 'Más lento, a propósito' },
            { label: 'Gasto posterior al cobro', note: 'La demo no necesita infraestructura pagada', value: 'Caja en riesgo mínima' },
            { label: 'Coste variable trasladado', note: 'Mensajería, dominio y almacenamiento extra', value: 'Los paga el cliente' },
          ],
        })}
        ${callout('El riesgo económico central es <b>absorber coste variable ajeno</b>. Todo consumo debe tener titular, tope acordado y traslado al cliente. Si no, el crecimiento nos cuesta dinero en lugar de darlo.')}
      </div>`,
  },

  {
    id: 'oferta',
    tone: 'light',
    num: '06',
    kicker: 'Qué le ofrecemos',
    title: 'Instalación, mensualidad <em>y nada de sorpresas.</em>',
    lede: 'Tres conceptos: instalación inicial, mensualidad y servicios variables. Ambas se cobran por adelantado.',
    foot: 'Los precios son mi propuesta de partida. Cerrarlos es una de las decisiones que te toca tomar conmigo antes de vender.',
    visual: () => `
      <div class="stack">
        <div class="plans">
          ${plan({ name: 'Piloto', setup: '300', month: '89', limits: ['Hasta 50 vehículos, una sucursal', 'Dirección dentro de Temis', 'Carga inicial de datos', 'Catálogo, solicitudes y panel', 'Capacitación'] })}
          ${plan({ name: 'Operación', setup: '500', month: '129', limits: ['Hasta 150 vehículos', 'Calendario y evidencia de pago', 'Configuración del bot', 'Dos cambios de catálogo al mes'] })}
        </div>
        ${ledger({
          head: 'Se cobra aparte', cols: 'Referencia',
          rows: [
            { label: 'Dominio propio y su configuración', note: 'No incluye la compra ni la renovación', value: 'USD 60' },
            { label: 'Carga adicional de hasta 50 vehículos', value: 'USD 50' },
            { label: 'Diseño fuera de la plantilla', value: 'Desde USD 150' },
            { label: 'Soporte o cambios fuera de alcance', note: 'Aprobados por escrito antes de empezar', value: 'USD 30/h' },
            { label: 'WhatsApp, almacenamiento, uso excepcional', note: 'Con tope acordado', value: 'A coste' },
          ],
        })}
        ${callout('Dilo en la primera reunión, no en la tercera: la mensualidad <b>no incluye operar el negocio del cliente</b>. No respondemos a sus clientes, no actualizamos su inventario ni aprobamos sus solicitudes. Nosotros mantenemos la plataforma funcionando.')}
      </div>`,
  },

  {
    id: 'clientes',
    tone: 'light',
    num: '07',
    kicker: 'A quién le vendemos',
    wide: true,
    title: 'El cliente rentable <em>no es el más grande.</em>',
    lede: 'Con la instalación a precio fijo, la rentabilidad de cada cliente la decide una sola variable: cuántas horas cuesta ponerlo en marcha.',
    foot: 'Criterios derivados de los límites de alcance y de la estructura de costes del plan. Se confirman midiendo las horas reales de los primeros clientes.',
    visual: () => `
      <div class="stack">
        <div class="profile">
          ${profile({
            tone: 'yes', ico: 'check', head: 'Busca esto',
            traits: [
              'Renta de autos, entre 20 y 150 unidades, una sucursal',
              'Inventario ya en Excel y razonablemente ordenado',
              'Precios estables: tarifas por día y por semana, no cambios diarios',
              'Una persona asignada a WhatsApp con horario definido',
              'Un decisor único que aprueba precios y políticas por escrito',
              'Cuenta de WhatsApp Business verificable a su nombre',
              'Acepta pagar instalación y mensualidad por adelantado',
            ],
          })}
          ${profile({
            tone: 'no', ico: 'alert', head: 'Evita esto por ahora',
            traits: [
              'Inventario en papel, en fotos o disperso entre personas',
              'Varias sucursales o flota compartida entre socios',
              'Exige integración en vivo con Saint o PSKloud',
              'Exige pagos en línea, contratos o firma digital',
              'Precios que cambian todos los días',
              'Nadie disponible para atender las conversaciones',
              'Decisión por comité o aprobaciones que nadie firma',
            ],
          })}
        </div>
        ${callout('Regla de cartera: al cerrar el piloto, <b>ningún cliente debe superar el 40% del ingreso recurrente</b>. Un solo impago no puede hundir el negocio.')}
      </div>`,
  },

  {
    id: 'inversion',
    tone: 'light',
    num: '08',
    kicker: 'La inversión',
    title: 'Tres etapas, <em>y sólo una cuesta dinero.</em>',
    lede: 'El orden importa más que el monto: cada etapa se financia con lo cobrado en la anterior.',
    points: [
      { ico: 'shield', title: 'Nada se contrata por adelantado', note: 'La demo comercial no necesita infraestructura pagada.' },
      { ico: 'db', title: 'El servidor llega con el primer cliente', note: 'Y su primera mensualidad ya lo cubre completo.' },
    ],
    visual: () => `
      <div class="stack">
        ${ledger({
          head: 'Etapa A · Demo comercial', cols: 'Para vender',
          rows: [
            { label: 'Hosting de prueba y datos ficticios', note: 'Sin promesa de disponibilidad, sin datos reales', value: 'USD 0' },
            { label: 'Número de prueba de Meta', value: 'USD 0' },
            { label: 'Caja comprometida', value: 'USD 0', total: true },
          ],
        })}
        ${ledger({
          head: 'Etapa B · Primer cliente pago', cols: 'Tras cobrar',
          rows: [
            { label: 'Infraestructura persistente y respaldos', note: 'Servidor con web, procesos, base de datos y cola', value: 'USD 20 – 35/mes' },
            { label: 'Despliegue inicial y dominio', value: 'USD 0 – 30' },
            { label: 'Reserva de contingencia', note: 'Se constituye después del primer cobro', value: 'USD 100 – 200' },
            { label: 'Caja comprometida', value: 'USD 100 – 230', total: true },
          ],
          foot: 'Con una mensualidad de USD 89 y una infraestructura de USD 20 a 35, <b>un solo cliente cubre el coste técnico base</b>.',
        })}
        ${ledger({
          head: 'Etapa C · Crecer', cols: 'Coste mensual',
          rows: [
            { label: '1 a 5 clientes', note: 'Un servidor con todos los procesos', value: 'USD 20 – 35' },
            { label: '6 a 20 clientes', note: 'Exige importación autoservicio y alta sin intervención técnica', value: 'USD 60 – 120' },
            { label: 'Más de 20 clientes', note: 'Plataforma administrada y almacenamiento externo', value: 'USD 150 – 300' },
          ],
          foot: 'El límite no es técnico sino operativo: con 12 a 30 horas de implementación manual por cliente, el proceso deja de sostenerse alrededor del sexto.',
        })}
      </div>`,
  },

  {
    id: 'trabajo',
    tone: 'light',
    num: '09',
    kicker: 'El trabajo real',
    wide: true,
    title: 'Aquí es donde está <em>la inversión de verdad.</em>',
    lede: 'Estos son los frentes que hay que cubrir antes y durante el piloto, con sus rangos de esfuerzo.',
    foot: 'Rangos de trabajo estimado, no horas facturables garantizadas. Si el onboarding real supera el límite, se ajusta el precio o el alcance antes del siguiente cliente.',
    visual: () => `
      <div class="stack">
        ${ledger({
          head: 'Antes de vender el primer piloto', cols: 'Esfuerzo',
          rows: [
            { label: 'Demo y calidad', note: 'Probar el flujo completo y corregir errores demostrables', value: '12 – 24 h' },
            { label: 'Despliegue de la demo', note: 'Variables, base de datos, tareas programadas, HTTPS', value: '6 – 12 h' },
            { label: 'Proceso comercial', note: 'Cotización, checklist de onboarding, formato Excel, guion de demo', value: '8 – 16 h' },
            { label: 'WhatsApp técnico', note: 'Cuenta de prueba, webhook y prueba entrante y saliente', value: '8 – 16 h' },
            { label: 'Puesta en producción', note: 'Certificado, respaldos, monitoreo, correo, alta sin reinicio', value: '16 – 32 h' },
          ],
        })}
        ${ledger({
          head: 'Por cada cliente', cols: 'Esfuerzo',
          rows: [
            { label: 'Implementación', note: 'Levantar datos, depurarlos, cargarlos, configurar y probar', value: '12 – 30 h' },
            { label: 'Operación inicial', note: 'Capacitar, revisar solicitudes y registrar incidencias la primera semana', value: '4 – 8 h' },
            { label: 'Total con cinco clientes', value: '130 – 290 h', total: true },
          ],
          foot: 'Son 9 a 20 horas por semana sostenidas durante trece semanas. <b>Ese es el compromiso que este plan pide aprobar</b>; la cifra en dólares es la parte fácil.',
        })}
      </div>`,
  },

  {
    id: 'roi',
    tone: 'light',
    num: '10',
    kicker: 'El retorno',
    wide: true,
    title: 'Qué significa que esto <em>funcione.</em>',
    lede: 'Tres escenarios a noventa días. Conviene leerlos sabiendo qué demuestra cada uno, porque ninguno paga un sueldo.',
    visual: () => `
      <div class="stack">
        <div class="cases">
          ${scenario({
            tag: 'Pesimista', clients: '1',
            rows: [['Instalaciones', 'USD 300'], ['Recurrente', 'USD 89/mes'], ['Margen técnico', 'USD 54 – 69']],
            read: 'Cubre la infraestructura y nada más. No paga trabajo.',
          })}
          ${scenario({
            tag: 'Base', clients: '3',
            rows: [['Instalaciones', 'USD 900'], ['Recurrente', 'USD 267/mes'], ['Margen técnico', 'USD 232 – 247']],
            read: 'Sostiene la operación técnica; el trabajo sigue subsidiado.',
          })}
          ${scenario({
            tag: 'Objetivo', clients: '5', goal: true,
            rows: [['Instalaciones', 'USD 1.500'], ['Recurrente', 'USD 445/mes'], ['Margen técnico', 'USD 410 – 425']],
            read: 'Cumple el criterio de avance y permite decidir si se escala.',
          })}
        </div>
        ${ledger({
          head: 'Los dos puntos de equilibrio', cols: 'Cómo se mide',
          rows: [
            { label: 'Infraestructura', note: 'Mensualidad de USD 89 contra un coste de USD 20 a 35', value: '1 cliente' },
            { label: 'Onboarding', note: 'Si instalar cuesta 20 horas, USD 300 son USD 15/hora brutos', value: 'Se mide en horas' },
            { label: 'Recuperación de la caja expuesta', note: 'La primera instalación cobrada devuelve los USD 100 a 230', value: 'Primer cliente' },
          ],
        })}
        ${callout('El escenario objetivo <b>no demuestra que Temis sea rentable</b>. Demuestra que la hipótesis merece una segunda fase, esa sí con datos reales de horas y de soporte en la mano. Ese margen no es utilidad repartible: de ahí salen soporte, tu tiempo de venta, impuestos, mejoras y una reserva de tres meses de servidor.')}
      </div>`,
  },

  {
    id: 'tiempos',
    tone: 'light',
    num: '11',
    kicker: 'Los tiempos',
    wide: true,
    title: 'Trece semanas <em>con puertas de control.</em>',
    lede: 'Cada tramo tiene un resultado que justifica pasar al siguiente. Si no se cumple, no se sigue por inercia.',
    visual: () => `
      <div class="stack">
        ${track([
          { when: 'Semanas 1 – 2', spend: 'USD 0', what: 'Dejar la demo estable, preparar la URL de prueba, la cotización, el formato Excel y el guion de demo.', gate: 'Cinco reuniones con prospectos' },
          { when: 'Semanas 3 – 4', spend: 'USD 0', what: 'Probar la integración con Meta usando un número de prueba y cerrar el primer piloto.', gate: 'Instalación pagada por adelantado' },
          { when: 'Mes 2', spend: 'Hasta USD 230', what: 'Desplegar la infraestructura persistente, implementar el primer cliente y medir las horas reales.', gate: 'Cliente usando el catálogo' },
          { when: 'Mes 3', spend: 'Sólo con ingreso', what: 'Repetir con hasta cuatro clientes adicionales si el proceso resulta repetible.', gate: 'Cinco clientes o decisión documentada' },
        ])}
        <div class="stack stack--tight">
          ${range({ label: 'Operación inicial por cliente', min: 4, max: 8, scale: 80, unit: 'h' })}
          ${range({ label: 'Implementar un cliente', min: 12, max: 30, scale: 80, unit: 'h' })}
          ${range({ label: 'Puesta en producción', min: 16, max: 32, scale: 80, unit: 'h' })}
          ${range({ label: 'Adaptar un vertical nuevo, sin validar', min: 40, max: 80, scale: 80, unit: 'h' })}
        </div>
        ${callout('La dependencia externa más lenta no depende de nosotros: <b>Meta exige que el cliente aporte cuenta empresarial verificada, número propio, nombre aprobado y método de pago</b>. Conviene arrancar ese trámite el día que se firma.')}
      </div>`,
  },

  {
    id: 'modalidades',
    tone: 'light',
    num: '12',
    kicker: 'Modelos de cobro',
    wide: true,
    title: 'Diez formas de cobrar. <em>Hoy sólo sirven tres.</em>',
    lede: 'Las demás exigen construir algo antes. Ofrecerlas ahora sería vender trabajo que todavía no existe.',
    foot: 'El autoservicio, la comisión por reserva y la marca blanca requieren desarrollo adicional y no deben ofrecerse en esta fase.',
    visual: () => `
      <div class="models">
        ${model({ state: 'now', name: 'Implementación y suscripción', what: 'Instalación más mensualidad fija. Es el modelo vigente y no exige construir nada.', tag: 'Empezar aquí' })}
        ${model({ state: 'next', name: 'Suscripción por niveles', what: 'Mensualidad según unidades, sucursales o usuarios. Exige contadores de uso.', tag: 'Al llegar a 3 clientes' })}
        ${model({ state: 'next', name: 'Módulo de inteligencia', what: 'Complemento mensual sobre el plan base. Se apoya en capacidad ya construida.', tag: 'Primera ampliación' })}
        ${model({ state: 'later', name: 'Cobro por consumo', what: 'Mensajes, solicitudes o importaciones procesadas. Exige medición, tope y facturación por uso.', tag: 'Más adelante' })}
        ${model({ state: 'later', name: 'Licencia anual', what: 'Pago anticipado con descuento. Exige contrato y política de renovación.', tag: 'Más adelante' })}
        ${model({ state: 'later', name: 'Servicios profesionales', what: 'Integraciones y desarrollos a medida, con estimación formal y mantenimiento incluido.', tag: 'Más adelante' })}
        ${model({ state: 'later', name: 'Paquetes sectoriales', what: 'Un plan por sector con flujos propios. Exige repetir el piloto en el sector base.', tag: 'Más adelante' })}
        ${model({ state: 'later', name: 'Autoservicio', what: 'Registro y configuración sin intervención nuestra. Exige alta autónoma y pasarela de cobro.', tag: 'No ofrecer aún' })}
        ${model({ state: 'later', name: 'Comisión por reserva', what: 'Porcentaje sobre operaciones cerradas. Exige confirmación verificable y conciliación.', tag: 'No ofrecer aún' })}
        ${model({ state: 'later', name: 'Marca blanca o canal', what: 'Tarifa por instancia a un tercero que revende. Exige aislamiento reforzado y soporte de segundo nivel.', tag: 'No ofrecer aún' })}
      </div>`,
  },

  {
    id: 'adaptaciones',
    tone: 'light',
    num: '13',
    kicker: 'Hacia dónde crece',
    title: 'La plataforma aguanta más. <em>El calendario no.</em>',
    lede: 'La arquitectura se diseñó para no reescribirse por sector: entidades neutras, atributos sectoriales en JSONB y formulario de solicitud configurable como datos, no como código.',
    points: [
      { ico: 'link', title: 'El segundo vertical debería costar menos', note: 'Adaptar interfaz, textos y reglas de disponibilidad, no rehacer la plataforma.' },
      { ico: 'alert', title: 'Pero es una hipótesis', note: '40 a 80 horas por vertical, sin validar. No sirve para cotizar ni para proyectar ingresos.' },
    ],
    visual: () => `
      <div class="stack">
        ${ledger({
          head: 'Orden de exploración', cols: 'No es orden de venta',
          rows: [
            { label: '1 · Renta de autos', note: 'El único vertical vendible hoy', value: 'En curso' },
            { label: '2 · Inmobiliaria', note: 'Catálogo de inmuebles con visitas y solicitudes', value: 'Tras el piloto' },
            { label: '3 · Supermercado y retail', note: 'Requiere resolver volumen de ítems y rotación de precios', value: 'Después' },
            { label: '4 · Motor de hallazgos como producto', note: 'Requiere usarlo con datos reales de al menos tres clientes', value: 'Después' },
          ],
          foot: 'Este orden <b>no autoriza vender, cotizar ni prometer plazos</b> de ningún vertical distinto de renta de autos. Abrir uno antes de tiempo es exactamente el riesgo de desarrollo no financiado.',
        })}
        ${callout('El motor de hallazgos es <b>el activo menos visible del proyecto y el que no estamos cobrando</b>. Ocho detectores, cada hallazgo clasificado por tipo, categoría y severidad, con un ciclo que termina midiendo si la recomendación produjo resultado. Convertirlo en ingreso es la ampliación más barata que tenemos.', 'violet', 'bulb')}
      </div>`,
  },

  {
    id: 'riesgos',
    tone: 'light',
    num: '14',
    kicker: 'Los riesgos',
    wide: true,
    title: 'Lo que puede salir mal, <em>y qué lo contiene.</em>',
    lede: 'Ningún riesgo de esta lista es hipotético: cada uno tiene un control que ya está decidido.',
    visual: () => `
      <div class="risks">
        ${[
          ['Contratar infraestructura antes de vender', 'Demo gratuita hasta tener una instalación cobrada.'],
          ['Onboarding manual sin límite', 'Límite de ítems, formato Excel obligatorio y extras cotizados aparte.'],
          ['Factura inesperada de Meta o de IA', 'Cuenta del cliente, tope mensual y alertas. Sin marketing masivo en el piloto.'],
          ['El bot promete una reserva que no existe', 'El bot deriva a una persona todo pago, reserva y disponibilidad no verificada.'],
          ['Un cliente deja de pagar la mensualidad', 'Cobro adelantado y suspensión controlada, sin borrar sus datos.'],
          ['Concentración en un cliente ancla', 'Ningún cliente por encima del 40% del ingreso recurrente al cerrar el piloto.'],
          ['Dependencia de una sola persona técnica', 'Despliegue, accesos y credenciales documentados en un gestor compartido entre socios.'],
          ['Tipo de cambio y cobranza en Venezuela', 'Precio y cobro en USD. La referencia BCV es informativa, nunca base de facturación.'],
          ['Abrir otro vertical demasiado pronto', 'Vender sólo renta de autos hasta que el piloto se repita.'],
        ].map(risk).join('')}
      </div>`,
  },

  {
    id: 'parada',
    tone: 'light',
    num: '15',
    kicker: 'Si no funciona',
    wide: true,
    title: 'Qué perdemos <em>si paramos en el mes tres.</em>',
    lede: 'Un plan que sólo describe el éxito no permite decidir. Esto es lo que cuesta detenerse, y lo que queda en pie si nos detenemos.',
    visual: () => `
      <div class="stack">
        <div class="figures">
          ${figure({ label: 'Caja en riesgo', value: '140 – 300', unit: 'USD', note: 'Y sólo se compromete después de haber cobrado la primera instalación.' })}
          ${figure({ label: 'Horas no recuperables', value: '130 – 290', unit: 'h', note: 'Ésta es la pérdida real. El dinero es la parte menor.', accent: true })}
          ${figure({ label: 'Coste de oportunidad', value: '3.4k – 7.7k', unit: 'USD', note: 'Las mismas horas valoradas a USD 30 de referencia.' })}
        </div>
        ${ledger({
          head: 'Qué se conserva', cols: 'Aunque se pare',
          rows: [
            { label: 'La plataforma y su arquitectura multiempresa', value: 'Intacta' },
            { label: 'El motor de hallazgos con sus ocho detectores', value: 'Intacto' },
            { label: 'La integración con Meta, ya construida y probada', value: 'Intacta' },
            { label: 'El proceso comercial repetible y los tenants demo', value: 'Intacto' },
            { label: 'El dato que hoy falta: horas reales de onboarding', value: 'Ganado', total: true },
          ],
          foot: 'Parar no destruye el activo técnico: invalida <b>una hipótesis comercial concreta</b> —que las empresas de renta de autos en Venezuela pagan por este catálogo— y deja la base disponible para otra.',
        })}
        ${callout('<b>Regla de parada.</b> Si al final del mes 3 no hay al menos un cliente pago que use el catálogo y genere solicitudes, se detiene el gasto recurrente, se conserva el código y se documenta la causa. No se financia un segundo intento con la misma oferta sin cambiar algo verificable.')}
      </div>`,
  },

  {
    id: 'medicion',
    tone: 'light',
    num: '16',
    kicker: 'Cómo lo medimos',
    title: 'Para que la decisión del mes tres <em>no sea una opinión.</em>',
    lede: 'Si medimos estas cosas cada semana, al final del piloto la decisión de seguir o parar se toma sola.',
    points: [
      { ico: 'bars', title: 'Embudo comercial', note: 'Prospectos contactados, reuniones, demos, propuestas y cobros.' },
      { ico: 'clock', title: 'Horas reales', note: 'De onboarding y de soporte, por cliente. Es el dato que hoy no tenemos.' },
      { ico: 'wallet', title: 'Caja', note: 'Cobrado, por cobrar, gasto, reserva y saldo, en una hoja semanal.' },
    ],
    visual: () => `
      <div class="stack">
        ${ledger({
          head: 'Criterio de avance', cols: 'Las cinco condiciones',
          rows: [
            { label: '1 · Demanda', note: 'Cinco clientes pagos o evidencia equivalente de demanda recurrente', value: 'Obligatorio' },
            { label: '2 · Repetibilidad', note: 'El onboarding se repite con datos estructurados y duración aceptable', value: 'Obligatorio' },
            { label: '3 · Uso real', note: 'Las solicitudes llegan y se convierten en conversaciones útiles', value: 'Obligatorio' },
            { label: '4 · Sostenibilidad', note: 'La mensualidad cubre infraestructura, soporte básico y reserva', value: 'Obligatorio' },
            { label: '5 · Sin incidentes graves', note: 'Ni privacidad, ni pérdida de datos, ni promesas incorrectas del bot', value: 'Obligatorio' },
          ],
          foot: 'Se pasa de piloto a escala <b>sólo si se cumplen las cinco</b>.',
        })}
        ${callout('También hay que vigilar el consumo de Meta, el almacenamiento y la IA <b>antes</b> de que generen sobrecoste, no después de la factura.', 'violet', 'alert')}
      </div>`,
  },

  {
    id: 'sociedad',
    tone: 'dark',
    num: '17',
    kicker: 'La sociedad',
    wide: true,
    title: 'Lo que pone cada uno, <em>y lo que falta acordar.</em>',
    lede: 'La repartición no la decido yo en una diapositiva. Esto es lo que propongo aportar y lo que te propongo que aportes; el resto lo cerramos juntos.',
    foot: 'Próximo paso: una demo en vivo de veinte minutos con Rentados. Entras como cliente final, mandas una solicitud y la vemos llegar al panel. Con eso entiendes en un rato lo que este documento tarda diecisiete escenas en contar.',
    visual: () => `
      <div class="stack">
        <div class="split">
          ${column({
            who: 'Yo pongo', initials: 'AP',
            items: [
              'La plataforma, ya construida y pagada con horas previas',
              'La puesta en producción',
              'El alta y la configuración de cada cliente',
              'El soporte técnico',
              'Las decisiones de producto',
            ],
          })}
          ${column({
            who: 'Tú pondrías', initials: 'DM',
            items: [
              'Prospección y demos',
              'Propuesta y cierre',
              'Relación con el cliente',
              'Cobranza',
              'Criterio comercial sobre precio y alcance',
            ],
          })}
          ${column({
            who: 'A acordar', initials: '?', open: true,
            items: [
              'Participación de cada uno y aportes',
              'Qué decisiones exigen acuerdo de ambos',
              'Precio final de instalación y mensualidad',
              'Tabla de descuentos por duración',
              'Quién atiende en cada cliente y en qué horario',
              'Cómo facturamos, en qué moneda y qué pasa ante un atraso',
              'Quién aprueba el contenido del cliente por escrito',
            ],
          })}
        </div>
        ${callout('La meta de los primeros noventa días es <b>cerrar y atender bien a cinco clientes pagos, midiendo cuántas horas cuesta cada uno de verdad</b>. Si al tercer mes no hay ni un cliente pagando, paramos el gasto, documentamos por qué y decidimos si cambiamos la oferta o el sector.', 'ok', 'check')}
      </div>`,
  },
]
