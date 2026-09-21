import {
  anchor, asset, bars, fileChip, icon, insight, logo,
  outcome, phone, row, source, stat,
} from './ui.js'

const photo = (name, alt, cls = '') =>
  `<img class="photo ${cls}" src="${asset('photos/' + name)}" alt="${alt}" loading="lazy" />`

/* Data sources the deck shows: the two real systems keep their own logos. */
const sources = [
  { name: 'Saint', note: 'Sistema administrativo', logoSrc: 'brand/saint-logo.png' },
  { name: 'PSKloud', note: 'Facturación en la nube', logoSrc: 'brand/pskloud-logo.webp' },
  { name: 'Excel', note: 'Archivos .xlsx', ico: 'doc', tint: 'is-green' },
  { name: 'CSV', note: 'Reportes exportados', ico: 'doc', tint: 'is-teal' },
  { name: 'WhatsApp', note: 'Pedidos y consultas', ico: 'whatsapp', tint: 'is-green' },
  { name: 'Otros sistemas', note: 'ERP, POS, bases de datos', ico: 'db', tint: 'is-violet' },
]

const areas = [
  { ico: 'bars', tint: 'is-green', name: 'Ventas', note: 'Rendimiento y tendencias' },
  { ico: 'box', tint: 'is-blue', name: 'Productos', note: 'Lo más y lo menos vendido' },
  { ico: 'grid', tint: 'is-amber', name: 'Inventario', note: 'Stock, quiebres y reposición' },
  { ico: 'users', tint: 'is-violet', name: 'Clientes', note: 'Segmentación y comportamiento' },
  { ico: 'cart', tint: 'is-blue', name: 'Compras', note: 'Proveedores y costos' },
  { ico: 'truck', tint: 'is-teal', name: 'Proveedores', note: 'Desempeño y oportunidades' },
  { ico: 'trend', tint: 'is-green', name: 'Rentabilidad', note: 'Márgenes y desempeño' },
  { ico: 'cash', tint: 'is-violet', name: 'Flujo de caja', note: 'Entradas y salidas de dinero' },
  { ico: 'doc', tint: 'is-teal', name: 'Cuentas por cobrar', note: 'Clientes y riesgo de mora' },
  { ico: 'wallet', tint: 'is-amber', name: 'Cuentas por pagar', note: 'Compromisos y vencimientos' },
  { ico: 'tag', tint: 'is-violet', name: 'Precios', note: 'Variaciones y oportunidades' },
  { ico: 'gear', tint: 'is-blue', name: 'Operaciones', note: 'Eficiencia y procesos' },
  { ico: 'grid', tint: 'is-green', name: 'Categorías', note: 'Desempeño por categoría' },
  { ico: 'alert', tint: 'is-red', name: 'Anomalías', note: 'Detección de situaciones atípicas' },
]

const questions = [
  '¿Cuánto vendimos hoy?',
  '¿Qué productos se están agotando?',
  '¿Quiénes son nuestros mejores clientes?',
  '¿Por qué cayeron las ventas?',
]

const steps = [
  { n: 1, title: 'Trae tus datos', note: 'Sube tus archivos desde tus sistemas o exportaciones.' },
  { n: 2, title: 'Temis entiende', note: 'La IA analiza y normaliza tu información automáticamente.' },
  { n: 3, title: 'Encuentra lo importante', note: 'Detecta oportunidades, riesgos, anomalías y tendencias.' },
  { n: 4, title: 'Te dice qué hacer', note: 'Convierte los análisis en acciones claras y concretas.' },
]

const restock = [
  ['Papel higiénico', '24 uds.'],
  ['Detergente líquido', '16 uds.'],
  ['Desinfectante', '12 uds.'],
  ['Bolsa de basura', '10 uds.'],
]

/* Insights repeated across the deck, so the same story stays consistent. */
const stockInsight = insight({
  kind: { ico: 'box', label: 'Inventario' }, tone: 'amber',
  title: '8 productos podrían agotarse esta semana.',
  note: 'Podrías dejar de vender unos $680.',
  cta: 'Ver qué comprar',
})

const salesInsight = insight({
  kind: { ico: 'bars', label: 'Ventas' }, tone: 'green',
  title: 'Ventas +12% vs. la semana pasada.',
  note: '$2.480 → $11.120 en ventas.',
  cta: 'Ver detalles',
})

/* ---------------------------------- scenes -------------------------------- */

export const scenes = [
  {
    id: 'portada',
    tone: 'dark',
    kicker: 'Más datos. Mejores decisiones. Negocios más fuertes.',
    lockup: 'See what matters.',
    title: 'Convierte los datos de tu negocio <em>en decisiones.</em>',
    lede: 'Inteligencia operacional para pequeñas y medianas empresas.',
    note: 'Temis es la capa de inteligencia que se apoya sobre los sistemas que la pyme ya usa.',
    visual: () => `
      <div class="dash dash--hero vi">
        <div class="dash__head">
          <div><strong>Buenas tardes, Anyelo.</strong><small>Esto es lo más importante hoy.</small></div>
          <span class="pill">Últimos 30 días</span>
        </div>
        <span class="dash__label">Insights destacados</span>
        <div class="dash__insights">${stockInsight}${salesInsight}</div>
        <span class="dash__label">Análisis</span>
        <div class="dash__stats">
          ${stat({ label: 'Ventas', value: '$1.842', delta: '+12% vs. ayer', ico: 'bars', tone: 'is-green' })}
          ${stat({ label: 'Inventario', value: '8', delta: 'en stock bajo', ico: 'box', tone: 'is-amber' })}
          ${stat({ label: 'Productos', value: '124', delta: 'total', ico: 'grid', tone: 'is-blue' })}
          ${stat({ label: 'Clientes', value: '317', delta: '17 inactivos', ico: 'users', tone: 'is-violet' })}
        </div>
      </div>
      <span class="tagline vi">De información a oportunidades.</span>`,
  },

  {
    id: 'problema',
    tone: 'light',
    num: '02',
    kicker: 'El problema',
    title: 'Tu negocio genera información todos los días. <em>Pero casi nadie tiene tiempo para entenderla.</em>',
    points: [
      { ico: 'db', title: 'Información fragmentada', note: 'Cada sistema sabe una parte.' },
      { ico: 'doc', title: 'Reportes, no respuestas', note: 'El software muestra qué ocurrió, pero no qué importa.' },
      { ico: 'users', title: 'Decisiones por intuición', note: 'El dueño termina dependiendo de experiencia, memoria y Excel.' },
    ],
    note: 'La pyme no tiene un problema de datos: tiene un problema de tiempo y de contexto.',
    visual: () => `
      <div class="chaos">
        <div class="chaos__sources">${sources.slice(0, 4).map(source).join('')}</div>
        <div class="chaos__questions">
          ${questions.map((q, i) => `<span class="bubble vi" style="--i:${i}">${q}</span>`).join('')}
        </div>
        <div class="chaos__now vi">${icon('bars', 'ico--badge')}<strong>¿Y ahora qué hago?</strong></div>
      </div>`,
  },

  {
    id: 'oportunidad',
    tone: 'light',
    num: '03',
    kicker: 'La oportunidad',
    title: 'No tienes que cambiar tu negocio <em>para usar Temis.</em>',
    lede: 'Temis se conecta a las herramientas que ya utilizas, entiende tu información y la convierte en insights accionables.',
    points: [
      { ico: 'link', title: 'Sin migraciones', note: 'Funciona con tus sistemas actuales.' },
      { ico: 'clock', title: 'Implementación rápida', note: 'Empieza a ver valor en días.' },
      { ico: 'bars', title: 'Escalable', note: 'Acompaña el crecimiento de tu negocio.' },
    ],
    note: 'Misma información, más claridad: Temis no reemplaza sistemas, los conecta.',
    visual: () => `
      <div class="flow">
        <div class="flow__col">
          <span class="flow__label">Tus fuentes de datos</span>
          ${sources.map(source).join('')}
        </div>
        <div class="flow__core vi">
          <div class="core">${anchor('tile')}</div>
          <span class="core__caption">Tu capa de inteligencia</span>
        </div>
        <div class="flow__col">
          <span class="flow__label">Insights y acciones</span>
          ${outcome({ ico: 'bars', tint: 'is-violet', title: 'Análisis inteligentes', note: 'Descubre oportunidades y riesgos.' })}
          ${outcome({ ico: 'bulb', tint: 'is-blue', title: 'Recomendaciones', note: 'Qué hacer y por qué.' })}
          ${outcome({ ico: 'users', tint: 'is-green', title: 'Clientes', note: 'Conoce y entiende a tus clientes.' })}
          ${outcome({ ico: 'box', tint: 'is-amber', title: 'Inventario', note: 'Evita quiebres y sobrestock.' })}
          ${outcome({ ico: 'trend', tint: 'is-teal', title: 'Rentabilidad', note: 'Identifica qué te deja más margen.' })}
        </div>
      </div>
      <p class="flow__foot vi">Misma información. <em>Más claridad.</em> Mejores decisiones.</p>`,
  },

  {
    id: 'como-funciona',
    tone: 'light',
    num: '04',
    kicker: 'Cómo funciona',
    title: 'De tus datos a decisiones <em>reales.</em>',
    lede: 'Un proceso simple, pensado para que obtengas valor desde el primer análisis.',
    points: [
      { ico: 'bolt', title: 'Simple', note: 'Sin configuraciones complejas.' },
      { ico: 'shield', title: 'Seguro', note: 'Tus datos siempre protegidos.' },
      { ico: 'bars', title: 'Enfocado en resultados', note: 'Insights que se convierten en acciones.' },
    ],
    note: 'Cuatro pasos: traer los datos, entenderlos, encontrar lo importante y decir qué hacer.',
    visual: () => `
      <ol class="steps">
        ${steps.map(s => `
          <li class="step vi">
            <span class="step__n">${s.n}</span>
            <strong>${s.title}</strong>
            <small>${s.note}</small>
          </li>`).join('')}
      </ol>
      <div class="handoff vi">
        <div class="handoff__done">${icon('check', 'ico--badge')}<span><b>Análisis completado</b><small>3 archivos · 12.482 registros</small></span></div>
        ${insight({
          kind: { ico: 'bulb', label: 'Recomendación' }, tone: 'violet',
          title: '8 productos podrían agotarse esta semana.',
          note: 'Podrías dejar de vender unos $680.',
          cta: 'Ver detalles',
        })}
      </div>`,
  },

  {
    id: 'producto',
    tone: 'light',
    num: '05',
    kicker: 'El producto',
    title: 'Inteligencia para tu negocio, <em>en una sola app.</em>',
    lede: 'Temis te muestra lo más importante, te ayuda a profundizar en los datos y te lleva de los insights a la acción.',
    points: [
      { ico: 'home', title: 'Todo en un solo lugar', note: 'Ventas, inventario, clientes y compras, desde el celular o la computadora.' },
      { ico: 'bolt', title: 'Insights que importan', note: 'Detecta oportunidades, riesgos y tendencias de forma automática.' },
      { ico: 'users', title: 'Acciones concretas', note: 'Recomendaciones claras para que tomes mejores decisiones.' },
    ],
    note: 'Tres pantallas cuentan el producto: Inicio resume, Analizar profundiza, Clientes acciona.',
    visual: () => `
      <div class="phones">
        ${phone({
          cls: 'phone--side phone--inicio vi', title: 'Buenas tardes, Anyelo.', sub: 'Esto es lo más importante hoy.',
          body: `${stockInsight}
            <div class="rows">
              ${row({ ico: 'bars', tint: 'is-green', name: 'Ventas', note: '+12% vs. ayer', value: '$1.842' })}
              ${row({ ico: 'box', tint: 'is-amber', name: 'Inventario', note: '8 con stock bajo' })}
              ${row({ ico: 'users', tint: 'is-violet', name: 'Clientes', note: '17 inactivos', value: '317' })}
            </div>`,
        })}
        ${phone({
          cls: 'phone--main phone--analizar vi', title: 'Analizar', sub: 'Insights de tus datos, en un solo lugar.',
          chips: `<div class="chips">${['Ventas', 'Productos', 'Inventario', 'Clientes', 'Cobros', 'Anomalías'].map((c, i) => `<span class="chip${i === 0 ? ' is-active' : ''}">${c}</span>`).join('')}</div>`,
          body: `<div class="phone__pair">${stockInsight}${salesInsight}</div>
            <div class="rows">
              ${row({ ico: 'box', tint: 'is-amber', name: 'Inventario', note: '8 productos en riesgo', value: 'Hoy' })}
              ${row({ ico: 'bars', tint: 'is-green', name: 'Ventas', note: 'Crecimiento del 12%', value: 'Hoy' })}
              ${row({ ico: 'doc', tint: 'is-red', name: 'Cobros', note: '5 facturas vencidas', value: '12 Sep' })}
            </div>`,
        })}
        ${phone({
          cls: 'phone--side phone--clientes vi', title: 'Clientes', sub: 'Gestiona y entiende a tus clientes.',
          chips: `<div class="chips">${[['Todos', '317'], ['Activos', '300'], ['Inactivos', '17']].map(([c, n], i) => `<span class="chip${i === 0 ? ' is-active' : ''}">${c} <b>${n}</b></span>`).join('')}</div>`,
          body: `<div class="rows">
              ${row({ ico: 'users', tint: 'is-violet', name: 'Comercial del Sur', note: 'Cliente frecuente', value: '$12.480' })}
              ${row({ ico: 'users', tint: 'is-blue', name: 'Industrias Nova', note: 'Cliente clave', value: '$8.230' })}
              ${row({ ico: 'users', tint: 'is-green', name: 'La Casa Creativa', note: 'Activo recientemente', value: '$5.620' })}
              ${row({ ico: 'users', tint: 'is-amber', name: 'Distribuidora Mendoza', note: 'Cliente frecuente', value: '$4.890' })}
            </div>`,
        })}
      </div>`,
  },

  {
    id: 'areas',
    tone: 'light',
    num: '06',
    kicker: 'Todo lo que entiende',
    title: 'Una sola inteligencia. <em>Todo tu negocio.</em>',
    lede: 'Temis analiza y conecta todas las áreas clave de tu negocio para darte una visión completa y accionable.',
    points: [
      { ico: 'db', title: 'Más contexto', note: 'Cada fuente de información enriquece el análisis.' },
      { ico: 'spark', title: 'Más claridad', note: 'Encuentra lo importante sin perderte en los datos.' },
      { ico: 'bars', title: 'Más resultados', note: 'Convierte información en acciones concretas.' },
    ],
    note: 'Catorce áreas de análisis: de lo operativo hasta la rentabilidad.',
    visual: () => `
      <div class="areas">
        ${areas.map(a => `
          <div class="area vi">
            <span class="area__ico tint ${a.tint}">${icon(a.ico)}</span>
            <b>${a.name}</b><small>${a.note}</small>
          </div>`).join('')}
      </div>
      <div class="areas__count vi"><strong>14</strong><span>áreas de análisis en un solo lugar.</span></div>`,
  },

  {
    id: 'dato-decision',
    tone: 'light',
    num: '07',
    kicker: 'De dato a decisión',
    title: 'Información en contexto. <em>Decisiones en la práctica.</em>',
    lede: 'Temis convierte tus datos en insights claros y acciones concretas que generan resultados reales.',
    points: [
      { ico: 'bolt', title: 'Detecta oportunidades', note: 'Antes de que se conviertan en problemas.' },
      { ico: 'target', title: 'Prioriza lo importante', note: 'Te muestra lo que realmente impacta tu negocio.' },
      { ico: 'check', title: 'Te dice qué hacer', note: 'Recomendaciones claras y accionables.' },
    ],
    note: 'Un caso real: reponer 4 productos esta semana evita perder $680 en ventas.',
    visual: () => `
      <div class="pipeline">
        <div class="pipe">
          <span class="pipe__label">1 · Tus datos</span>
          ${fileChip({ name: 'ventas_2024.xlsx', meta: '2,4 MB · Ventas', kind: 'xls' })}
          ${fileChip({ name: 'inventario.xlsx', meta: '1,8 MB · Inventario', kind: 'xls' })}
          ${fileChip({ name: 'clientes.csv', meta: '950 KB · Clientes', kind: 'csv' })}
          <div class="drop vi">${icon('upload')}<span>Arrastra tus archivos aquí</span></div>
        </div>
        <div class="pipe pipe--core">
          <span class="pipe__label">2 · Temis analiza</span>
          <div class="core core--sm vi">${anchor('tile')}</div>
          <span class="core__caption">IA que entiende tu negocio</span>
        </div>
        <div class="pipe">
          <span class="pipe__label">3 · Insights claros</span>
          ${stockInsight}
          ${salesInsight}
        </div>
        <div class="pipe">
          <span class="pipe__label">4 · Acciones concretas</span>
          <div class="reco vi">
            <span class="reco__head">${icon('check', 'ico--badge')}<b>Recomendación prioritaria</b></span>
            <small>Reponer estos productos esta semana:</small>
            <ul>${restock.map(([n, q]) => `<li><span>${n}</span><b>${q}</b></li>`).join('')}</ul>
            <span class="btn btn--sm">Generar orden de compra <i>&rarr;</i></span>
          </div>
          <p class="reco__gain vi">${icon('bars')}<span>Esta acción podría evitar una pérdida de <b>$680</b> en ventas.</span></p>
        </div>
      </div>`,
  },

  {
    id: 'paso-adelante',
    tone: 'light',
    num: '08',
    kicker: 'Tu negocio, un paso adelante',
    title: 'Decisiones hoy para un mejor <em>mañana.</em>',
    lede: 'Temis te da la claridad que necesitas para crecer, optimizar tus operaciones y enfocarte en lo que realmente importa: tu negocio.',
    points: [
      { ico: 'bars', title: 'Crece con datos', note: 'Identifica oportunidades y mejora tus resultados.' },
      { ico: 'clock', title: 'Ahorra tiempo', note: 'Menos trabajo manual, más decisiones.' },
      { ico: 'spark', title: 'Compite con ventaja', note: 'Conoce tu negocio como nunca antes.' },
    ],
    note: 'El mismo tablero en escritorio y en el bolsillo.',
    visual: () => `
      <div class="desk vi">
        <aside class="desk__nav">
          ${logo('logo--xs')}
          ${['Inicio', 'Analizar', 'Ventas', 'Productos', 'Inventario', 'Clientes', 'Compras'].map((n, i) =>
            `<span class="desk__link${i === 0 ? ' is-active' : ''}">${n}</span>`).join('')}
        </aside>
        <div class="desk__main">
          <div class="dash__head">
            <div><strong>Buenas tardes, Anyelo.</strong><small>Aquí está el resumen de tu negocio.</small></div>
            <span class="pill">Últimos 30 días</span>
          </div>
          <div class="desk__stats">
            ${stat({ label: 'Ventas', value: '$2.480', delta: '↑ 12%', ico: 'bars', tone: 'is-green' })}
            ${stat({ label: 'Clientes', value: '317', delta: '↑ 8%', ico: 'users', tone: 'is-violet' })}
            ${stat({ label: 'Productos', value: '124', delta: '↑ 5%', ico: 'box', tone: 'is-blue' })}
            ${stat({ label: 'Margen', value: '28%', delta: '↑ 4%', ico: 'trend', tone: 'is-teal' })}
          </div>
          <div class="desk__chart">
            <div class="desk__chart-head"><b>Ventas</b><span class="link">Ver detalles &rarr;</span></div>
            ${bars([34, 41, 38, 52, 60, 55, 78, 66, 84], ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'])}
          </div>
          <div class="desk__cards">
            ${insight({ kind: { ico: 'bulb', label: 'Oportunidades' }, tone: 'violet', title: '8 productos con alto potencial de crecimiento.', cta: 'Ver oportunidades' })}
            ${insight({ kind: { ico: 'alert', label: 'Alertas' }, tone: 'amber', title: '3 productos con bajo stock.', cta: 'Ver detalles' })}
          </div>
        </div>
      </div>
      <div class="mini vi">
        <strong>Hola, Anyelo.</strong><small>Tu negocio en tus manos.</small>
        ${row({ ico: 'bars', tint: 'is-green', name: 'Ventas', note: '↑ 12%', value: '$2.480' })}
        ${row({ ico: 'users', tint: 'is-violet', name: 'Clientes', note: '↑ 8%', value: '317' })}
        ${row({ ico: 'trend', tint: 'is-teal', name: 'Margen', note: '↑ 4%', value: '28%' })}
      </div>
      <span class="tagline tagline--dark vi">Mismos datos. <em>Un futuro más grande.</em></span>`,
    enter(tl, el) {
      tl.from(el.querySelectorAll('.chart__bar'), {
        scaleY: 0, transformOrigin: 'bottom', duration: 0.7, stagger: 0.05, ease: 'power2.out',
      }, 0.45)
    },
  },

  {
    id: 'pymes',
    tone: 'light',
    num: '09',
    kicker: 'Hecho para pymes',
    title: 'La inteligencia de grandes empresas, <em>ahora para ti.</em>',
    lede: 'Temis está diseñado para pymes que quieren crecer, con una herramienta simple, poderosa y accesible.',
    points: [
      { ico: 'store', title: 'Fácil de usar', note: 'Sin conocimientos técnicos.' },
      { ico: 'wallet', title: 'Precio accesible', note: 'Pensado para pymes reales.' },
      { ico: 'headset', title: 'Soporte en tu idioma', note: 'Te acompañamos en cada paso.' },
    ],
    note: 'La misma inteligencia que usan las grandes cadenas, al alcance de un minimarket.',
    visual: () => `
      <div class="story">
        ${photo('pyme.webp', 'Dueña de un minimarket revisando su negocio en Temis')}
        <div class="float float--a vi">${stat({ label: 'Ventas de hoy', value: '$2.480', delta: '↑ 12% vs. ayer', ico: 'bars', tone: 'is-violet' })}</div>
        <div class="float float--b vi">
          <div class="quote">
            <p>“Ahora entiendo mejor qué productos me dejan más ganancia y en cuáles debo mejorar.”</p>
            <span class="quote__who"><i>MG</i><span><b>María G.</b><small>Dueña de minimarket</small></span></span>
          </div>
        </div>
        <div class="float float--c vi">
          <div class="top">
            <span class="top__head"><b>Productos más vendidos</b></span>
            ${[['Papel higiénico', 124, 100], ['Detergente líquido', 96, 77], ['Galletas', 78, 63], ['Refresco', 64, 52]]
              .map(([n, v, w], i) => `<span class="top__row"><i>${i + 1}</i><b>${n}</b><span class="top__bar"><u style="width:${w}%"></u></span><small>${v} uds.</small></span>`).join('')}
          </div>
        </div>
      </div>
      <span class="tagline tagline--violet vi">Pymes más fuertes. <em>Comunidades más prósperas.</em></span>`,
    enter(tl, el) {
      tl.from(el.querySelectorAll('.top__bar u'), {
        scaleX: 0, transformOrigin: 'left', duration: 0.8, stagger: 0.08, ease: 'power2.out',
      }, 0.6)
    },
  },

  {
    id: 'futuro-grande',
    tone: 'light',
    num: '10',
    kicker: 'Un futuro más grande',
    title: 'Más tiempo para lo que <em>realmente importa.</em>',
    lede: 'Temis se encarga de los datos para que tú puedas enfocarte en hacer crecer tu negocio y disfrutar lo que te apasiona.',
    points: [
      { ico: 'clock', title: 'Ahorra tiempo', note: 'Menos reportes, más acción.' },
      { ico: 'bars', title: 'Toma mejores decisiones', note: 'Con información clara y confiable.' },
      { ico: 'heart', title: 'Haz crecer tu negocio', note: 'Con el respaldo de la inteligencia artificial.' },
    ],
    note: 'El beneficio final no es el dato: es el tiempo y la tranquilidad del dueño.',
    visual: () => `
      <div class="story story--owner">
        ${photo('owner.webp', 'Dueño de un negocio mirando hacia adelante con confianza')}
        <div class="float float--a vi">${stat({ label: 'Ventas', value: '$2.480', delta: '↑ 12% vs. semana pasada', ico: 'bars', tone: 'is-violet' })}</div>
        <div class="float float--d vi">${stat({ label: 'Clientes nuevos', value: '17', delta: '↑ 41% vs. mes pasado', ico: 'users', tone: 'is-violet' })}</div>
        <div class="float float--b vi">
          <div class="quote">
            <p>“Temis me da la claridad que necesito para seguir creciendo.”</p>
            <span class="quote__who"><i>CM</i><span><b>Carlos M.</b><small>Dueño de restaurante</small></span></span>
          </div>
        </div>
        <div class="float float--e vi"><span class="tagline tagline--violet">Negocios más fuertes. <em>Personas más libres.</em></span></div>
      </div>`,
  },

  {
    id: 'futuro-contigo',
    tone: 'dawn',
    num: '11',
    kicker: 'El futuro contigo',
    title: 'Hoy más inteligencia. <em>Mañana más oportunidades.</em>',
    lede: 'Temis te acompaña en cada etapa de tu negocio, con la inteligencia que necesitas para tomar mejores decisiones y llegar más lejos.',
    points: [
      { ico: 'bars', title: 'Datos que impulsan', note: 'Convierte información en crecimiento.' },
      { ico: 'users', title: 'Negocios más fuertes', note: 'Decisiones con confianza.' },
      { ico: 'rocket', title: 'Un futuro real', note: 'Más tiempo para lo que realmente importa.' },
    ],
    note: 'Cierre emocional: la visión de largo plazo de Temis junto a la pyme.',
    visual: () => `
      <div class="story story--dawn">
        ${photo('sunrise.webp', 'Dueño de negocio mirando el amanecer sobre la ciudad con una taza de Temis')}
        <div class="float float--a vi">${stat({ label: 'Ventas', value: '$2.480', delta: '↑ 12% vs. semana pasada', ico: 'bars', tone: 'is-violet' })}</div>
        <div class="float float--d vi">${stat({ label: 'Clientes', value: '317', delta: '↑ 8% vs. mes pasado', ico: 'users', tone: 'is-violet' })}</div>
        <div class="float float--f vi">${stat({ label: 'Oportunidades', value: '8', delta: '3 nuevas esta semana', ico: 'bulb', tone: 'is-amber' })}</div>
        <div class="float float--g vi">
          <a class="btn" href="#/12">Comienza hoy <i>&rarr;</i></a>
          <small>Tu negocio, con más posibilidades.</small>
        </div>
      </div>`,
  },

  {
    id: 'cta',
    tone: 'dark',
    num: '12',
    kicker: 'Pymes que avanzan',
    title: 'Datos hoy. <em>Decisiones más grandes mañana.</em>',
    lede: 'Temis convierte la información de tu negocio en claridad, para que puedas enfocarte en lo que realmente importa: hacerlo crecer.',
    points: [
      { ico: 'bars', title: 'Entiende tu negocio', note: 'Visualiza ventas, productos y clientes en un solo lugar.' },
      { ico: 'bulb', title: 'Detecta oportunidades', note: 'La IA encuentra patrones y te da recomendaciones.' },
      { ico: 'rocket', title: 'Toma acción', note: 'Convierte insights en decisiones que generan resultados.' },
    ],
    cta: { label: 'Quiero analizar mi negocio', href: 'https://temis.app', foot: 'Sin instalaciones. Sin complicaciones. Solo resultados.' },
    note: 'Cierre: el llamado a la acción y la promesa de marca.',
    visual: () => `
      <div class="close">
        <div class="close__logo vi">${logo('logo--xl', true)}</div>
        <p class="close__claim vi">Tu aliado en el crecimiento de tu negocio.</p>
        <div class="close__stats">
          ${stat({ label: 'Ventas de hoy', value: '$2.480', delta: '↑ 12% vs. semana pasada', ico: 'bars', tone: 'is-green' })}
          ${stat({ label: 'Clientes', value: '317', delta: '↑ 8% vs. mes pasado', ico: 'users', tone: 'is-violet' })}
          ${stat({ label: 'Productos', value: '124', delta: '↑ 5% vs. mes pasado', ico: 'box', tone: 'is-blue' })}
        </div>
        <div class="close__ai vi">${icon('spark', 'ico--badge')}<span>La IA encuentra oportunidades para ti.</span></div>
      </div>`,
    enter(tl, el) {
      tl.from(el.querySelectorAll('.close__stats .stat'), {
        autoAlpha: 0, y: 26, duration: 0.6, stagger: 0.09, ease: 'power3.out',
      }, 0.5)
    },
  },
]

export const total = scenes.length
