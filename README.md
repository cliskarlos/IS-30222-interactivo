# Ingeniería del Software: material interactivo

Recurso educativo abierto de la asignatura Ingeniería del Software (30222), Grado en
Ingeniería Informática, EUPT, Universidad de Zaragoza. Web estática: todo funciona
abriendo `index.html`, sin servidor, sin dependencias externas salvo el contador anónimo de aciertos
(ver la sección de métricas).

| Página | Tema |
|---|---|
| `t2-clasificador-requisitos.html` | T2 · Requisitos |
| `t3-relaciones-uml.html` | T3 · Análisis |
| `t3-constructor-clases.html` | T3 · Análisis |
| `t3-taller-estados.html` | T3 · Análisis |
| `t4-principios-patrones.html` | T4 · Diseño |
| `t5-laboratorio-pruebas.html` | T5 · Pruebas |
| `proyecto-autorrevision.html` | Proyecto |

Licencia: CC BY-NC-SA 4.0 (ver `LICENSE.md`).

---

## Cómo publicarlo (para el autor)

### 0. Antes de nada

- Revisa los enunciados y las soluciones de cada página.
- Si tienes ORCID, añádelo en `CITATION.cff` (campo `orcid: "https://orcid.org/…"` bajo el autor)
  y en `.zenodo.json` (campo `"orcid": "…"` dentro de `creators`).

### 1. GitHub

1. Crea un repositorio **público** (por ejemplo `is30222-interactivo`).
2. Sube **todo** el contenido de esta carpeta, incluidos los ficheros ocultos
   `.zenodo.json` y `.nojekyll`.

### 2. GitHub Pages (la web en línea)

1. En el repositorio: *Settings → Pages*.
2. Origen: *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. En un par de minutos la web queda en `https://<usuario>.github.io/is30222-interactivo/`.

### 3. Zenodo (el DOI)

1. Entra en https://zenodo.org con tu cuenta de GitHub.
2. En la integración con GitHub de Zenodo, activa el repositorio.
   **Hay que hacerlo antes de crear la versión**, si no Zenodo no la archiva.
3. En GitHub, crea una *release* con la etiqueta `v1.0.0`.
4. Zenodo archiva esa versión y asigna dos DOI: uno de la versión y otro
   *concept DOI* que apunta siempre a la última. Para citar en general, usa el concept DOI.
5. Comprueba en Zenodo que el registro tiene tipo *Lesson*, licencia CC BY-NC-SA 4.0
   y tu afiliación (se toman de `.zenodo.json`).

### 4. Añadir el DOI a la web

- En `index.html`, sección *Créditos y cómo citar*, sustituye el comentario marcado por la
  línea del DOI y añade el DOI al final de la cita.
- En `CITATION.cff`, añade `doi: 10.5281/zenodo.XXXXXXX`.
- Haz commit. No hace falta otra *release*: el DOI ya existe.

### 5. Zaguán (depósito institucional)

El material de la biblioteca no cubre el depósito de recursos docentes fuera de las
convocatorias, así que hay que preguntar. Texto propuesto para zaguan@unizar.es:

> Asunto: Depósito en Zaguán de un recurso educativo abierto
>
> Buenos días:
>
> Soy profesor de la EUPT y he publicado un recurso educativo abierto para la asignatura
> Ingeniería del Software (30222): una web de ejercicios interactivos con licencia
> CC BY-NC-SA 4.0, archivada en Zenodo con DOI [DOI].
>
> Me gustaría depositarla también en Zaguán. ¿Es posible fuera de las convocatorias de
> innovación docente? En ese caso, ¿en qué colección y en qué formato (fichero comprimido
> con la web, PDF descriptivo o enlace al DOI)?
>
> Gracias.
>
> Carlos Marín Lora

### 6. Para el CV

- CVN: regístralo como material docente o recurso educativo con su DOI, la licencia y la URL.
- Para innovación docente: la convocatoria de proyectos de la Universidad de Zaragoza
  (programa PRAUZ, recursos educativos abiertos) se abrió el 1 de marzo en 2024.
  Previsiblemente la siguiente será en marzo de 2027.

### 7. Métricas anónimas de aciertos (GoatCounter)

Sin cookies ni identificadores. Solo cuenta la primera vez de cada cosa en cada visita.

| Evento | Para qué sirve |
|---|---|
| `t3/relaciones/07/ok` | Porcentaje de aciertos por tema y ejercicio |
| `t3/relaciones/07/ko-ext` | Qué opción errónea se elige (análisis de errores conceptuales) |
| `t3/relaciones/07/reintento/ok` | Si al repetir un fallo se acierta |
| `t3/relaciones/tiempo/10-30s/ko` | Tiempo de respuesta por tramos (pensado o al azar) |
| `t3/relaciones/inicio` y `t3/relaciones/fin/50-79` | Rondas empezadas y terminadas, con la nota por tramos |
| `ayuda/t3-relaciones-uml/chuleta-de-notacion` | Qué ayudas y soluciones se consultan |
| `t3/relaciones/07/reporte` | Ejercicios que algún alumno cree que están mal |

La lista completa está comentada al principio de `assets/metricas.js`. La fecha la añade
GoatCounter al recibir cada evento.

1. Crea una cuenta gratuita en https://www.goatcounter.com con un código, por ejemplo `is30222`.
2. Escribe ese código en `assets/metricas.js` (`var CODE = 'is30222';`). Vacío, no se envía nada.
3. En los ajustes del sitio de GoatCounter, desactiva los datos que no necesitas
   (ubicación, tamaño de pantalla, navegador): solo hacen falta los recuentos.
4. Para el análisis: exporta los datos a CSV desde GoatCounter. El porcentaje por tema y
   semana sale de sumar los eventos `…/ok` y `…/ko*` por tema (`t2`, `t3`, `t4`, `t5`).

Limitación a tener en cuenta: un mismo alumno que recarga la página vuelve a contar.
Los porcentajes dicen cómo va el grupo, no cuántos alumnos distintos hay detrás.

### 8. Avisos de errores

Cada ejercicio, tras corregirse, muestra el enlace "¿No estás de acuerdo con la solución? Explícale
al autor por qué". Al pulsarlo se envía el evento anónimo `…/reporte` y se abre un correo con la página
y el ejercicio ya indicados. El pie de cada página lleva además un enlace general.

Para activarlo, escribe tu dirección en `assets/metricas.js` (`var EMAIL = '…';`). Vacía, no se
muestra nada. La dirección queda visible en la web.

### Versiones posteriores

Añade una fila al registro de cambios de `index.html` (qué se corrigió y, si vino de un aviso,
de qué ejercicio). Cambia la versión en `index.html` (créditos), `CITATION.cff` y `.zenodo.json`, y crea una
nueva *release* (`v1.1.0`, etc.). Zenodo le da un DOI nuevo y el concept DOI sigue
apuntando a la última.
