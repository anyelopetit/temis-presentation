import { gsap } from 'gsap'
import { icon, logo, mark } from './ui.js'

// The scene engine, shared by both decks. It owns transitions, navigation and the
// travelling isotipo; each deck only supplies its scenes and its header line.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
const pad = n => String(n).padStart(2, '0')
const AUTOPLAY_MS = 11000

const pointList = points => !points ? '' : `
  <ul class="points">
    ${points.map(p => `
      <li class="point">
        <span class="point__ico">${icon(p.ico)}</span>
        <span class="point__text"><b>${p.title}</b><small>${p.note}</small></span>
      </li>`).join('')}
  </ul>`

export function createDeck({ scenes, claim, mount = '#app' }) {
  const total = scenes.length

  const sceneMarkup = (scene, i) => `
    <section
      class="scene scene--${scene.id}"
      id="escena-${i + 1}"
      data-scene="${scene.id}"
      data-tone="${scene.tone}"
      role="group"
      aria-roledescription="escena"
      aria-label="${i + 1} de ${total}: ${scene.kicker}"
    >
      <div class="scene__inner${scene.wide ? ' scene__inner--wide' : ''}">
        <div class="copy">
          ${scene.lockup
            ? `<div class="lockup">${logo('logo--lg', true)}<span class="lockup__claim">${scene.lockup}</span></div>`
            : `<p class="eyebrow"><b>${scene.num}</b><span>${scene.kicker}</span></p>`}
          <h2 class="title">${scene.title}</h2>
          ${scene.lede ? `<p class="lede">${scene.lede}</p>` : ''}
          ${pointList(scene.points)}
          ${scene.foot ? `<p class="footnote">${scene.foot}</p>` : ''}
          ${scene.cta ? `<div class="copy__cta"><a class="btn btn--lg" href="${scene.cta.href}"${scene.cta.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${scene.cta.label} <i>&rarr;</i></a><small>${scene.cta.foot}</small></div>` : ''}
        </div>
        <div class="visual visual--${scene.id}">${scene.visual()}</div>
      </div>
    </section>`

  document.querySelector(mount).innerHTML = `
    <div class="bg" aria-hidden="true"><i class="bg__glow bg__glow--a"></i><i class="bg__glow bg__glow--b"></i><i class="bg__grid"></i></div>

    <header class="topbar">
      <a class="topbar__brand" href="#/1" aria-label="Temis, ir al inicio">${logo('logo--sm')}</a>
      <p class="topbar__claim">${claim}</p>
      <span class="topbar__counter"><b id="counter">01</b> / ${pad(total)}</span>
    </header>

    <main class="deck" id="deck">${scenes.map(sceneMarkup).join('')}</main>

    <div class="spark" id="spark" aria-hidden="true">${mark('spark__mark')}</div>

    <footer class="bottombar">
      <button class="ctrl" id="prev" type="button" aria-label="Escena anterior">${icon('arrow', 'ico--flip')}</button>
      <nav class="dots" id="dots" aria-label="Escenas">
        ${scenes.map((s, i) => `<button class="dot" type="button" data-go="${i}" aria-label="${i + 1}. ${s.kicker}"><span>${s.kicker}</span></button>`).join('')}
      </nav>
      <button class="ctrl" id="next" type="button" aria-label="Siguiente escena">${icon('arrow')}</button>
      <button class="ctrl ctrl--play" id="play" type="button" aria-pressed="false" aria-label="Reproducir automáticamente">${icon('bolt')}</button>
    </footer>

    <div class="progress" aria-hidden="true"><i id="progressBar"></i></div>
    <p class="hint" id="hint">Desliza o usa las flechas &larr; &rarr;</p>`

  const deckEl = document.querySelector('#deck')
  const sections = [...deckEl.querySelectorAll('.scene')]
  const dots = [...document.querySelectorAll('.dot')]
  const counterEl = document.querySelector('#counter')
  const progressEl = document.querySelector('#progressBar')
  const sparkEl = document.querySelector('#spark')
  const playEl = document.querySelector('#play')
  const hintEl = document.querySelector('#hint')

  let index = -1
  // Where the story is headed: during a transition `index` still points at the scene
  // on its way out, so every relative move is measured from `target` instead.
  let target = -1
  let busy = false
  let timeline
  let pending = null
  let autoplay = null

  document.body.classList.add('spark-ready')

  /* ---------------------------------- spark -------------------------------- */

  function moveSpark(section, animate) {
    const slot = section.querySelector('.spark-anchor')
    if (!slot) {
      gsap.to(sparkEl, { autoAlpha: 0, duration: 0.35, ease: 'power2.out', overwrite: true })
      return
    }
    const box = slot.getBoundingClientRect()
    sparkEl.dataset.tone = slot.dataset.tone || 'plain'
    sparkEl.dataset.scheme = section.dataset.tone
    const to = { x: box.left, y: box.top, width: box.width, height: box.height, autoAlpha: 1 }
    if (animate && !reduced.matches) gsap.to(sparkEl, { ...to, duration: 0.85, ease: 'power3.inOut', overwrite: true })
    else gsap.set(sparkEl, to)
  }

  const reparkSpark = () => { if (index >= 0) moveSpark(sections[index], false) }
  window.addEventListener('resize', reparkSpark)
  window.addEventListener('orientationchange', reparkSpark)

  /* ------------------------------- transitions ----------------------------- */

  const copyItems = section => section.querySelectorAll('.copy > *')
  const visualItems = section => section.querySelectorAll('.visual .vi')

  function paint(i) {
    counterEl.textContent = pad(i + 1)
    progressEl.style.transform = `scaleX(${(i + 1) / total})`
    document.body.dataset.tone = scenes[i].tone
    document.body.dataset.scene = scenes[i].id
    dots.forEach((dot, d) => {
      dot.classList.toggle('is-active', d === i)
      dot.setAttribute('aria-current', d === i ? 'true' : 'false')
    })
    if (history.replaceState) history.replaceState(null, '', `#/${i + 1}`)
    else location.hash = `#/${i + 1}`
  }

  function enter(i, direction) {
    const section = sections[i]
    index = i
    section.classList.add('is-active')
    section.removeAttribute('inert')
    paint(i)
    section.scrollTop = 0

    const copy = copyItems(section)
    const items = visualItems(section)
    const visual = section.querySelector('.visual')
    gsap.set([...copy, ...items, visual], { clearProps: 'opacity,visibility,transform' })

    timeline?.kill()
    timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        busy = false
        const queued = pending
        pending = null
        if (queued !== null && queued !== index) run(queued)
      },
    })
      .from(copy, { autoAlpha: 0, y: 30 * direction, duration: 0.6, stagger: 0.07 }, 0)
      .from(visual, { autoAlpha: 0, scale: 0.97, duration: 0.65 }, 0.1)

    if (items.length) {
      timeline.from(items, { autoAlpha: 0, y: 24, scale: 0.97, duration: 0.55, stagger: 0.055 }, 0.25)
    }
    scenes[i].enter?.(timeline, section)
    moveSpark(section, index >= 0 && direction !== 0)

    if (reduced.matches) timeline.progress(1)
  }

  function leave(i, direction, done) {
    const section = sections[i]
    timeline?.kill()
    timeline = gsap.timeline({ defaults: { ease: 'power2.in' }, onComplete: done })
      .to(copyItems(section), { autoAlpha: 0, y: -24 * direction, duration: 0.3, stagger: 0.03 }, 0)

    const items = visualItems(section)
    if (items.length) timeline.to(items, { autoAlpha: 0, y: -18 * direction, duration: 0.28, stagger: 0.02 }, 0)
    timeline.to(section.querySelector('.visual'), { autoAlpha: 0, scale: 0.98, duration: 0.3 }, 0.08)

    if (reduced.matches) timeline.progress(1)
  }

  function go(to, { silent = false } = {}) {
    const next = Math.max(0, Math.min(total - 1, to))
    if (next === target) return
    target = next
    if (!silent) stopAutoplay()
    // Presses during a transition are remembered rather than dropped: the deck
    // finishes the scene it is on and then jumps straight to the latest target.
    if (busy) { pending = next; return }
    pending = null
    run(next)
  }

  function run(next) {
    const direction = next > index ? 1 : -1
    if (index < 0) { enter(next, 1); return }

    busy = true
    const from = index
    leave(from, direction, () => {
      sections[from].classList.remove('is-active')
      sections[from].setAttribute('inert', '')
      enter(next, direction)
    })
  }

  const step = delta => go((target < 0 ? index : target) + delta)

  /* --------------------------------- autoplay ------------------------------ */

  function stopAutoplay() {
    if (!autoplay) return
    clearInterval(autoplay)
    autoplay = null
    playEl.setAttribute('aria-pressed', 'false')
    document.body.classList.remove('is-playing')
  }

  function toggleAutoplay() {
    if (autoplay) { stopAutoplay(); return }
    autoplay = setInterval(() => {
      if (target >= total - 1) { stopAutoplay(); return }
      go(target + 1, { silent: true })
    }, AUTOPLAY_MS)
    playEl.setAttribute('aria-pressed', 'true')
    document.body.classList.add('is-playing')
    go(target + 1, { silent: true })
  }

  /* --------------------------------- controls ------------------------------ */

  document.querySelector('#next').addEventListener('click', () => step(1))
  document.querySelector('#prev').addEventListener('click', () => step(-1))
  playEl.addEventListener('click', toggleAutoplay)
  dots.forEach(dot => dot.addEventListener('click', () => go(Number(dot.dataset.go))))

  window.addEventListener('keydown', event => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const key = event.key
    if (key === 'ArrowRight' || key === 'PageDown' || key === ' ') { event.preventDefault(); step(1) }
    else if (key === 'ArrowLeft' || key === 'PageUp') { event.preventDefault(); step(-1) }
    else if (key === 'Home') { event.preventDefault(); go(0) }
    else if (key === 'End') { event.preventDefault(); go(total - 1) }
  })

  // On a mouse, clicking the stage advances; links, buttons and text selection keep working.
  deckEl.addEventListener('click', event => {
    if (!finePointer.matches) return
    if (event.target.closest('a, button, input, [data-no-advance]')) return
    if (window.getSelection()?.toString()) return
    step(1)
  })

  // On touch, a horizontal swipe moves the story while vertical scrolling stays free.
  let touch = null
  deckEl.addEventListener('touchstart', event => {
    touch = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
  }, { passive: true })

  deckEl.addEventListener('touchend', event => {
    if (!touch) return
    const dx = event.changedTouches[0].clientX - touch.x
    const dy = event.changedTouches[0].clientY - touch.y
    touch = null
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.4) return
    step(dx < 0 ? 1 : -1)
  })

  const fromHash = () => {
    const raw = location.hash.replace(/^#\/?/, '')
    const byNumber = Number(raw)
    if (Number.isFinite(byNumber) && byNumber >= 1 && byNumber <= total) return byNumber - 1
    const bySlug = scenes.findIndex(s => s.id === raw)
    return bySlug >= 0 ? bySlug : 0
  }

  window.addEventListener('hashchange', () => go(fromHash()))

  sections.forEach((section, i) => { if (i !== 0) section.setAttribute('inert', '') })
  go(fromHash())

  // The swipe hint has done its job once the visitor moves on their own.
  const hideHint = () => hintEl.classList.add('is-gone')
  setTimeout(hideHint, 6000)
  window.addEventListener('keydown', hideHint, { once: true })
  deckEl.addEventListener('touchstart', hideHint, { once: true, passive: true })

  if (import.meta.env.DEV) {
    window.deck = { get state() { return { index, target, busy, pending } }, go, scenes }
  }

  return { go, step }
}
