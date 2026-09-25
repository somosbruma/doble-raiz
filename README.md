# Doble Raíz — El origen a la vista

Landing institucional realizada con HTML, CSS y JavaScript nativos. Sin dependencias de ejecución, frameworks, instalación ni compilación. Esta es una propuesta navegable en revisión; no es una tienda y no procesa formularios, pedidos ni pagos.

## Archivos

- `index.html`: estructura, contenidos, accesibilidad y metadatos.
- `styles.css`: paleta, diseño responsive, foco y movimiento reducido.
- `app.js`: menú, apariciones discretas y configuración de contactos/puntos de venta.
- `assets/`: recursos locales optimizados.
- `assets/originals/`: copias de los originales seleccionados, sin modificar.

## Abrir

Desde esta carpeta, con Python instalado:

```sh
python3 -m http.server 8000
```

Abrir `http://localhost:8000`. También se puede abrir `index.html` directamente, aunque el servidor es la opción recomendada. No hace falta npm.

## Editar

1. Editar los textos en `index.html`. Buscar `[CONFIRMAR CON LA CLIENTA:` para localizar los pendientes.
2. Editar los colores y tipografías en las variables de `:root` en `styles.css`.
3. Completar `SITE_CONFIG` en `app.js` con WhatsApp (solo dígitos y código internacional), correo, URL oficial de Instagram y comercios confirmados.
4. Cuando haya datos válidos, los contactos se activan automáticamente. Los enlaces actuales llevan a la sección de contacto y no abren números o perfiles ficticios.
5. Revisar también los textos de preguntas frecuentes cuando se incorporen datos. El cambio de configuración no reescribe esas respuestas.
6. Solo al terminar la validación editorial, poner `reviewMode: false`, quitar las notas provisionales y cambiar `robots` a `index, follow`.

## Dirección y decisiones

- “El origen a la vista”: portada expresiva, relato editorial y recorrido gallinas → entorno → producto.
- Paleta oficial: verde #224B29, crema #E7DDC1, amarillo #F0DB73, verde claro #91BD7D, azul #193A59 y celeste #C1E6EE. Se agrega un neutro de lectura #F5F0E3.
- Se conserva el logotipo original. Georgia se utiliza como alternativa de sistema provisional para los textos, sin incrustar Minion Pro ni asumir una licencia web. Arial resuelve controles y lectura funcional. No se simula Single Day con otra fuente manuscrita. Confirmar licencia y archivos tipográficos antes de cambiarlas.
- Inspiración de UI: escala de titulares, cambios de color y protagonismo visual de https://happyegg.com/ y https://handsomebrookfarms.com/. No se copiaron sus activos ni sus afirmaciones productivas.
- Animaciones de entrada suaves, hover discreto, menú accesible y acordeones nativos `details/summary`. Se respeta `prefers-reduced-motion` y el contenido sigue disponible sin JavaScript.
- La imagen aportada se identifica como conceptual; no acredita packaging vigente, presentaciones, instalaciones ni bienestar animal.
- No hay fotografías documentales disponibles verificadas. Los bloques de gallinas y suelo usan identidad y texto de principios, sin fingir evidencia.
- Las imágenes grandes se reservan con dimensiones explícitas; hay variante responsive de portada y carga diferida fuera de ella.
- Metadatos Open Graph y Twitter presentes. El sitio permanece en `noindex` durante revisión.

## Actualización: relato con transiciones curvas

Se tomó como referencia visual la grabación aportada `Grabación de pantalla 2026-09-24 a la(s) 3.11.51 p. m..mov`: ondas amplias entre bloques y elementos superpuestos. No se copiaron textos ni activos de Happy Egg.

- Curvas SVG decorativas entre capítulos, con orientación alternada y alturas adaptadas al móvil.
- Sello circular con la gallina verde que cruza el límite entre producto y puntos de venta. Es identidad, no un sello de certificación.
- Nueva composición en “Una historia que llega a tu mesa”; se conserva la imagen anterior en la portada.
- Desplazamiento y rotación leves de las ilustraciones y foto interior, apariciones progresivas y una línea de avance de lectura. Scroll nativo, sin bloqueos ni librerías.
- `prefers-reduced-motion` desactiva el movimiento decorativo. Sin JavaScript, todo el contenido y las curvas siguen presentes.

## Activos y fuentes

Carpeta de origen: https://drive.google.com/drive/folders/1ASqi0zhmOjbPUAF93Ho8hUkYjSNvzkGU

| Recurso web | Original conservado | Fuente exacta | Uso |
|---|---|---|---|
| `assets/logo-amarillo.webp` | `assets/originals/logo-amarillo.png` | Drive: `Png Elementos/Logo transparente.png`, id `11W--M-c5RAGZnIXLglc8o5WoUtWNHwnM` | Cabecera y pie |
| `assets/gallina-verde.webp` | `assets/originals/gallina-verde.png` | Drive: `Png Elementos/Gallina Verde.png`, id `12XGsT-0miIVTJQvciK1ESCKm9Hfa8aiI` | Puntos de venta y favicon |
| `assets/gallina-amarilla.webp` | `assets/originals/gallina-amarilla.png` | Drive: `Png Elementos/GallinaAmarilla.png`, id `1sXXLayfqIAJOKI6yKRTRFdiajfrztbfV` | Identidad en bloque de gallinas |
| `assets/textura-cuadros.webp` | `assets/originals/textura-cuadros.png` | Drive: `Texturas/Frame 25.png`, id `1RDFT31CdhulU31zmDrXqsGHXofQaMiNw` | Franja decorativa de 16 px |
| `assets/producto-conceptual.webp` y `assets/producto-conceptual-small.webp` | `assets/originals/producto-conceptual.png` | Adjunto del usuario: `Imagen de Codex 24 sept 2026, 10_50_59 a.m..png` | Portada y sección producto |

La actualización incorpora `assets/producto-mesa-conceptual.webp` y su variante `producto-mesa-conceptual-small.webp`, procedentes del adjunto `Imagen de Codex 24 sept 2026, 10_51_09 a.m..png`. El original se conserva en `assets/originals/producto-mesa-conceptual.png`. Su uso es conceptual, no documental.

Solo se copiaron esos cuatro recursos de Drive y los dos adjuntos de imagen. Los originales se conservan byte por byte. Las variantes web ajustan margen transparente, dimensiones y compresión; no modifican el contenido de marca. La textura de cuadros se conserva como recurso de la versión anterior; ya no se muestra como separador.

## Pendientes antes del lanzamiento institucional

- Confirmar que el manual Opción 2 es definitivo y precisar el espacio de protección del logo.
- Identidad e historia de los hermanos, ubicación y etapas de producción.
- Alcance de libre de jaula, alojamiento, acceso al exterior, alimentación y seguimiento de bienestar.
- Prácticas concretas de manejo del suelo y respaldo disponible.
- Fotografías reales con contexto, autoría y permiso de uso.
- Presentaciones, tamaños, envases, conservación y vida útil.
- Evidencia específica antes de declarar un atributo comparativo del producto.
- Puntos de venta, localidades y contactos oficiales.
- Licencias de tipografías y dominio final.

## Verificación y límites

Se comprobó sintaxis JavaScript, existencia de recursos, destinos de anclas, dimensiones de imágenes, ausencia de imágenes enlazadas a Drive y contraste de las combinaciones principales. Se incluyó verificación HTTP temporal de los archivos locales.

La previsualización administrada no pudo iniciar por una dependencia ausente (`live-server`) del entorno. Por esa razón NO se afirma haber completado la inspección visual a 390 y 1440 px, la ejecución de interacciones por teclado en navegador ni la revisión de consola del sitio. Esas comprobaciones siguen pendientes; el análisis estático no las sustituye.

Comprobar a 390 × 844 y 1440 × 900: ausencia de scroll horizontal, legibilidad y recorte de imágenes; abrir/cerrar menú, Escape y Tab; expandir preguntas con Enter/Espacio; probar movimiento reducido; comprobar consola y contactos una vez configurados.

## Publicar

Subir el contenido de esta carpeta al directorio público de cualquier alojamiento estático, preservando las rutas. `index.html` debe quedar en la raíz publicada. No subir la carpeta como un nivel adicional si se desea servir desde `/`.

Antes del lanzamiento definitivo: resolver los pendientes, retirar el aviso de revisión, cambiar `noindex` y sustituir el origen de `og:image` por el dominio definitivo. Agregar URL canónica cuando el dominio esté confirmado. El enlace de revisión de Sites mantiene acceso privado.

Los originales son respaldo de edición y no se solicitan durante la carga de la página. Pueden excluirse del alojamiento final si se conservan en la copia de trabajo.
