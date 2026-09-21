// Building blocks shared by the scenes: brand marks, icons and the product mock-ups.
// Every mock-up is plain HTML sized in `em`, so a single font-size on `.visual`
// scales a whole dashboard or phone from desktop down to a 360px screen.

export const asset = path => import.meta.env.BASE_URL + path

const svg = (path, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${path}</svg>`

export const icons = {
  bars: svg('<path d="M5 19V11"/><path d="M12 19V5"/><path d="M19 19v-6"/>'),
  box: svg('<path d="M12 3.5l7.5 4v9l-7.5 4-7.5-4v-9z"/><path d="M4.5 7.5L12 11.5l7.5-4"/><path d="M12 11.5V20"/>'),
  users: svg('<circle cx="9.5" cy="9" r="3.2"/><path d="M3.5 19.5c.8-3.2 3-4.8 6-4.8s5.2 1.6 6 4.8"/><circle cx="17.5" cy="10" r="2.3"/><path d="M17 15c2.1.2 3.5 1.7 4 4"/>'),
  cart: svg('<path d="M3.5 4.5h2.2l2.1 9.5h9l2.2-7H7"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>'),
  doc: svg('<path d="M6.5 3.5h7l4.5 4.5v12h-11.5z"/><path d="M13 3.5V8h4.5"/><path d="M9.5 13h6M9.5 16.5h4"/>'),
  spark: svg('<path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1z"/>'),
  link: svg('<path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 1 0-5.7-5.7l-1.3 1.3"/><path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 1 0 5.7 5.7l1.3-1.3"/>'),
  clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.3 2"/>'),
  bolt: svg('<path d="M13.5 3L6 13.5h5L10.5 21 18 10.5h-5z"/>'),
  shield: svg('<path d="M12 3.5l7 2.6v5.4c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6.1z"/><path d="M9 12.2l2.2 2.2 4-4.2"/>'),
  home: svg('<path d="M4 10.5L12 4l8 6.5V20h-5.5v-5h-5v5H4z"/>'),
  target: svg('<circle cx="12" cy="12" r="8.3"/><circle cx="12" cy="12" r="4.3"/><circle cx="12" cy="12" r="1"/>'),
  trend: svg('<path d="M4 17l5.3-5.3 3.4 3.4L20 8"/><path d="M15 8h5v5"/>'),
  alert: svg('<path d="M12 4.5L21 19.5H3z"/><path d="M12 10v4"/><path d="M12 17h.01"/>'),
  bulb: svg('<path d="M9.5 17.5h5"/><path d="M10 20.5h4"/><path d="M12 3.5a5.5 5.5 0 0 1 3.3 9.9c-.5.4-.8 1-.8 1.6h-5c0-.6-.3-1.2-.8-1.6A5.5 5.5 0 0 1 12 3.5z"/>'),
  check: svg('<circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.4l2.6 2.6 4.8-5"/>'),
  db: svg('<ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'),
  truck: svg('<path d="M3.5 6.5h10v9h-10z"/><path d="M13.5 10h3.5l3 3v2.5h-6.5z"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/>'),
  cash: svg('<rect x="3" y="6.5" width="18" height="11" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M7 12h.01M17 12h.01"/>'),
  tag: svg('<path d="M4 11.5V4.5h7l8.5 8.5-7 7z"/><circle cx="8" cy="8" r="1.4"/>'),
  gear: svg('<circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4L6 18M18 18l-1.6-1.6M7.6 7.6L6 6"/>'),
  grid: svg('<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>'),
  wallet: svg('<rect x="3.5" y="6" width="17" height="13" rx="2.6"/><path d="M15.5 12.5h5"/><path d="M6 6l9-3 1.6 3"/>'),
  store: svg('<path d="M4 9.5V20h16V9.5"/><path d="M3 9.5L5 4h14l2 5.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/>'),
  headset: svg('<path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="3" y="13.5" width="3.6" height="5.5" rx="1.6"/><rect x="17.4" y="13.5" width="3.6" height="5.5" rx="1.6"/><path d="M19.5 19v.5a2.5 2.5 0 0 1-2.5 2.5h-2"/>'),
  heart: svg('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>'),
  rocket: svg('<path d="M12.5 3.5c3.5 1.5 5.5 5 5.5 9l-3.5 3.5h-5L6 12.5c0-4 2-7.5 6.5-9z"/><circle cx="12.2" cy="10" r="1.8"/><path d="M9.5 16.5C8 18 7.5 19.5 7.5 21c1.5 0 3-.5 4.5-2"/>'),
  upload: svg('<path d="M12 16V5"/><path d="M8 9l4-4 4 4"/><path d="M4.5 15v3.5c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V15"/>'),
  whatsapp: svg('<path d="M4.5 19.5l1.2-3.9A8 8 0 1 1 8.6 18.5z"/><path d="M9.2 8.6c.3 2.8 2.4 5 5.3 5.6l1-1.3-1.8-.9-.8.8c-1-.4-1.8-1.3-2.2-2.3l.8-.8-.9-1.8z"/>'),
  arrow: svg('<path d="M5 12h13"/><path d="M13 6.5l5.5 5.5-5.5 5.5"/>'),
}

export const icon = (name, cls = '') => `<span class="ico ${cls}">${icons[name] || ''}</span>`

// Brand marks. Two files (navy + white) cross-fade so the same element can travel
// from a light card onto a dark background without re-rendering.
export const mark = (cls = '') => `
  <span class="mark ${cls}">
    <img class="mark__img mark__img--navy" src="${asset('brand/temis-isotipo.svg')}" alt="" />
    <img class="mark__img mark__img--white" src="${asset('brand/temis-white.svg')}" alt="" />
  </span>`

export const logo = (cls = '', slot = false) => `
  <span class="logo ${cls}">${slot ? anchor('plain') : mark('logo__mark')}<span class="logo__word">temis</span></span>`

// Where the travelling isotipo lands in a scene. main.js measures it at runtime,
// so it stays correct at every breakpoint.
export const anchor = (tone = 'tile') => `<i class="spark-anchor" data-tone="${tone}">${mark('')}</i>`

/* ---------------------------------- atoms --------------------------------- */

export const stat = ({ label, value, delta, tone = '', ico = 'bars' }) => `
  <div class="stat ${tone}">
    ${icon(ico, 'ico--chip')}
    <div class="stat__body">
      <span class="stat__label">${label}</span>
      <strong class="stat__value">${value}</strong>
      ${delta ? `<span class="stat__delta${/^[↑+]/.test(delta) ? ' is-up' : ''}">${delta}</span>` : ''}
    </div>
  </div>`

export const insight = ({ kind, tone, title, note, cta }) => `
  <div class="insight insight--${tone}">
    <span class="insight__kind">${icon(kind.ico, 'ico--badge')}${kind.label}</span>
    <p class="insight__title">${title}</p>
    ${note ? `<p class="insight__note">${note}</p>` : ''}
    ${cta ? `<span class="insight__cta">${cta} <i>&rarr;</i></span>` : ''}
  </div>`

export const source = ({ name, note, logoSrc, ico, tint = '' }) => `
  <div class="source vi">
    <span class="source__logo tint ${tint}">${logoSrc ? `<img src="${asset(logoSrc)}" alt="${name}" loading="lazy" />` : icon(ico)}</span>
    <span class="source__text"><b>${name}</b><small>${note}</small></span>
  </div>`

export const fileChip = ({ name, meta, kind }) => `
  <div class="file vi">
    <span class="file__badge file__badge--${kind}">${kind.toUpperCase()}</span>
    <span class="file__text"><b>${name}</b><small>${meta}</small></span>
  </div>`

export const outcome = ({ ico, tint, title, note }) => `
  <div class="outcome vi">
    <span class="outcome__ico tint ${tint}">${icon(ico)}</span>
    <span class="outcome__text"><b>${title}</b><small>${note}</small></span>
  </div>`

/* -------------------------------- mock-ups -------------------------------- */

const navItem = (name, ico, active = false) =>
  `<span class="nav__item${active ? ' is-active' : ''}">${icon(ico)}${name}</span>`

export const phone = ({ cls = '', title, sub, chips = '', body }) => `
  <div class="phone ${cls}">
    <div class="phone__screen">
      <div class="phone__bar"><span>9:41</span><span class="phone__sig"></span></div>
      <div class="phone__top">${logo('logo--xs')}<span class="phone__avatar">AP</span></div>
      <div class="phone__head"><strong>${title}</strong><small>${sub}</small></div>
      ${chips}
      <div class="phone__body">${body}</div>
      <div class="phone__tabs">
        ${navItem('Inicio', 'home', cls.includes('inicio'))}
        ${navItem('Analizar', 'bars', cls.includes('analizar'))}
        ${navItem('Clientes', 'users', cls.includes('clientes'))}
        ${navItem('Más', 'grid')}
      </div>
    </div>
  </div>`

export const row = ({ ico, tint = '', name, note, value, delta }) => `
  <div class="row">
    <span class="row__ico tint ${tint}">${icon(ico)}</span>
    <span class="row__text"><b>${name}</b><small>${note}</small></span>
    ${value ? `<span class="row__value"><b>${value}</b>${delta ? `<small>${delta}</small>` : ''}</span>` : ''}
  </div>`

export const bars = (values, labels) => `
  <div class="chart" role="img" aria-label="Ventas por mes, tendencia creciente">
    ${values.map((v, i) => `<span class="chart__col"><i class="chart__bar" style="height:${v}%"></i><small>${labels[i]}</small></span>`).join('')}
  </div>`
