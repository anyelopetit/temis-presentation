# Temis — presentación interactiva

Landing por escenas que cuenta la propuesta de Temis: la capa de inteligencia que convierte
los datos operativos de una pyme en decisiones concretas.

Doce escenas animadas, una sola página, pensada tanto para proyectar en una reunión como
para abrirla desde el teléfono y deslizar.

## Cómo correrlo

```bash
npm install
npm run dev
```

`npm run build` genera `dist/`. El deploy a GitHub Pages es automático con cada push a `main`
(ver `.github/workflows/deploy-pages.yml`).

## Cómo se navega

| Acción | Gesto |
| --- | --- |
| Avanzar | flecha derecha, espacio, clic en la escena (mouse), deslizar a la izquierda |
| Retroceder | flecha izquierda, deslizar a la derecha |
| Ir a una escena | los puntos de la barra inferior, o el hash `#/7` |
| Primera / última | `Inicio` / `Fin` |
| Reproducción automática | el botón del rayo (11 s por escena) |

Cada escena tiene su propia URL (`#/1` … `#/12`), así que se puede compartir un enlace
directo a cualquier momento de la historia.

## Las doce escenas

| # | Escena | Idea |
| --- | --- | --- |
| 01 | Portada | Convierte los datos de tu negocio en decisiones. |
| 02 | El problema | La información existe, el tiempo para entenderla no. |
| 03 | La oportunidad | Temis se apoya sobre los sistemas que ya usas. |
| 04 | Cómo funciona | Cuatro pasos: traer, entender, priorizar, accionar. |
| 05 | El producto | Inicio, Analizar y Clientes en una sola app. |
| 06 | Todo lo que entiende | Catorce áreas de análisis conectadas. |
| 07 | De dato a decisión | Un caso concreto de punta a punta. |
| 08 | Un paso adelante | El mismo tablero en escritorio y en el bolsillo. |
| 09 | Hecho para pymes | Inteligencia de grandes empresas, a escala pyme. |
| 10 | Un futuro más grande | El beneficio real es tiempo y tranquilidad. |
| 11 | El futuro contigo | La visión de largo plazo. |
| 12 | Pymes que avanzan | Llamado a la acción. |

## Cómo está armado

```
src/
  main.js     motor de escenas: transiciones GSAP, teclado, swipe, hash, autoplay
  scenes.js   las doce escenas: copy, puntos y el mock-up de cada una
  ui.js       piezas compartidas: marcas, íconos, tarjetas, teléfonos, tablero
  style.css   tokens de marca, layout fluido y responsive
public/
  brand/      isotipo de Temis (navy y blanco) y logos de las fuentes de datos
  photos/     fotos recortadas del deck original
```

Tres decisiones que explican el resto del código:

- **Sin escalado fijo.** No hay un lienzo de 1920×1080 encogido: el layout es una grilla
  fluida que se reordena en una columna por debajo de 900px, y las escenas largas hacen
  scroll vertical mientras el gesto horizontal sigue cambiando de escena.
- **Mock-ups en `em`.** Cada tablero y cada teléfono se dimensiona en `em` sobre un
  `font-size` fluido en `.visual`, así un solo número escala toda la maqueta.
- **Un isotipo que viaja.** El isotipo vive fuera de las escenas y vuela hasta el hueco que
  cada escena le deja (`.spark-anchor`), midiendo su posición en tiempo real; por eso sigue
  cayendo en su lugar en cualquier tamaño de pantalla.

Respeta `prefers-reduced-motion`: con la preferencia activada las escenas aparecen ya
resueltas, sin recorrido.
