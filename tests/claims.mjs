import { readFile } from 'node:fs/promises'

const files = {
  product: await readFile(new URL('../src/scenes.js', import.meta.url), 'utf8'),
  partner: await readFile(new URL('../src/socio/scenes.js', import.meta.url), 'utf8'),
}

const requireText = (text, expected, file) => {
  if (!text.includes(expected)) throw new Error(`${file}: falta «${expected}»`)
}

const forbidText = (text, forbidden, file) => {
  if (text.includes(forbidden)) throw new Error(`${file}: afirmación retirada «${forbidden}»`)
}

;[
  '¿Cómo vamos este mes?',
  '¿Qué productos generan más ingresos?',
  '¿Qué clientes llevan 90 días sin comprar?',
  'Acceso por empresa',
  'Ocho áreas reales del MVP',
  "href: '#/1'",
].forEach(text => requireText(files.product, text, 'src/scenes.js'))

;[
  '¿Por qué cayeron las ventas?',
  'Tus datos siempre protegidos.',
  'Generar orden de compra',
  'https://temis.app',
  'María G.',
  'Carlos M.',
].forEach(text => forbidText(files.product, text, 'src/scenes.js'))

;[
  'La ruta /socio/ es pública aunque lleve noindex',
  'seis reglas deterministas',
  'No hay facturación automática.',
].forEach(text => requireText(files.partner, text, 'src/socio/scenes.js'))

;['39 pruebas automatizadas', 'ocho detectores'].forEach(text => forbidText(files.partner, text, 'src/socio/scenes.js'))
