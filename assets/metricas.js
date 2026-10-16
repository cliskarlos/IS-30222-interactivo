/* Registro anónimo de uso (GoatCounter). Sin cookies ni identificadores.
   Cada evento es un texto con esta forma (no hay datos de la persona):
     <tema>/<página>/<ejercicio>/ok            primera respuesta acertada
     <tema>/<página>/<ejercicio>/ko-<opción>   primera respuesta fallada y opción elegida
     <tema>/<página>/<ejercicio>/reintento/ok|ko   resultado al repetir un fallo
     <tema>/<página>/tiempo/<tramo>/ok|ko      tiempo de respuesta por tramos
     <tema>/<página>/inicio                    primera respuesta de la visita
     <tema>/<página>/fin/<tramo de nota>       ronda completa terminada
     ayuda/<página>/<ayuda>                    se abre una ayuda o la solución
   Solo cuenta la primera vez de cada cosa en cada visita a la página.
   Para activarlo, escribe en CODE el código de tu sitio de GoatCounter
   (si tu panel es https://is30222.goatcounter.com, el código es 'is30222').
   Con CODE vacío no se envía nada. */
(function () {
  var CODE = 'is30222';
  var seen = {}, t0 = null;
  var page = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');

  function send(path, isEvent) {
    if (!CODE) return;
    try {
      var img = new Image();
      img.src = 'https://' + CODE + '.goatcounter.com/count?p=' + encodeURIComponent(path) +
        (isEvent ? '&e=true' : '') + '&rnd=' + Math.random().toString(36).slice(2);
    } catch (e) { /* sin red o bloqueado: no pasa nada */ }
  }
  function once(k) { if (seen[k]) return false; seen[k] = true; return true; }
  function slug(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);
  }
  function tramoTiempo(ms) {
    var s = ms / 1000;
    return s < 10 ? '0-10s' : s < 30 ? '10-30s' : s < 60 ? '30-60s' : 'mas-60s';
  }

  // Marca el momento en que se muestra un ejercicio (para el tiempo de respuesta)
  window.isMark = function () { t0 = Date.now(); };

  // Primera respuesta a un ejercicio. choice = opción elegida cuando es un fallo.
  window.isMetric = function (tema, pagina, item, ok, choice) {
    var key = tema + '/' + pagina + '/' + item;
    if (!once(key)) return;
    if (once('inicio/' + tema + '/' + pagina)) send(tema + '/' + pagina + '/inicio', true);
    send(key + '/' + (ok ? 'ok' : 'ko' + (choice ? '-' + slug(choice) : '')), true);
    if (t0 !== null) {
      send(tema + '/' + pagina + '/tiempo/' + tramoTiempo(Date.now() - t0) + '/' + (ok ? 'ok' : 'ko'), true);
      t0 = null;
    }
  };

  // Respuesta al repetir un ejercicio fallado
  window.isRetry = function (tema, pagina, item, ok) {
    var key = tema + '/' + pagina + '/' + item + '/reintento';
    t0 = null;
    if (!once(key)) return;
    send(key + '/' + (ok ? 'ok' : 'ko'), true);
  };

  // Ronda completa terminada, con la nota por tramos
  window.isEnd = function (tema, pagina, frac) {
    if (!once('fin/' + tema + '/' + pagina)) return;
    var p = Math.round(frac * 100);
    send(tema + '/' + pagina + '/fin/' + (p < 50 ? '0-49' : p < 80 ? '50-79' : '80-100'), true);
  };

  // Ayuda abierta (también se llama a mano, por ejemplo al ver una solución)
  window.isHelp = function (name) {
    var key = 'ayuda/' + page + '/' + slug(name);
    if (once(key)) send(key, true);
  };

  // Cualquier desplegable (<details>) que se abre cuenta como ayuda consultada
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d && d.tagName === 'DETAILS' && d.open) {
      var s = d.querySelector('summary');
      window.isHelp(s ? s.textContent : 'desplegable');
    }
  }, true);

  /* ---------- Avisos de errores al autor ----------
     EMAIL = dirección de contacto. Vacía, no se muestra ningún aviso. */
  var EMAIL = 'lora@unizar.es';
  var NAMES = {
    't2-clasificador-requisitos': 'Clasificador de requisitos',
    't3-relaciones-uml': 'Relaciones UML',
    't3-constructor-clases': 'Constructor de diagramas de clases',
    't3-taller-estados': 'Taller de diagramas de estados',
    't4-principios-patrones': 'Principios y patrones de diseño',
    't5-laboratorio-pruebas': 'Laboratorio de pruebas',
    'proyecto-autorrevision': 'Autorrevisión del dossier',
    'index': 'Portada'
  };
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  // Botón para un ejercicio concreto (cadena HTML; vacía si no hay EMAIL)
  window.isReportLink = function (tema, pagina, item) {
    if (!EMAIL) return '';
    return '<p class="rep-wrap"><button type="button" class="rep" data-t="' + esc(tema) + '" data-p="' + esc(pagina) +
      '" data-i="' + esc(item) + '">¿No estás de acuerdo con la solución? Explícale al autor por qué</button></p>';
  };
  function mailto(item) {
    var title = NAMES[page] || page;
    var subject = 'IS 30222 · Posible error en ' + title + (item ? ' · ejercicio ' + item : '');
    var body = 'Página: ' + title + '\n' + (item ? 'Ejercicio: ' + item + '\n' : '') + '\nQué creo que está mal y por qué:\n\n';
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button.rep');
    if (!b) return;
    var item = b.getAttribute('data-i');
    var key = b.getAttribute('data-t') + '/' + b.getAttribute('data-p') + '/' + item + '/reporte';
    if (once(key)) send(key, true);
    try { window.location.href = mailto(item); } catch (err) {}
    var note = document.createElement('span');
    note.className = 'rep-note';
    note.textContent = 'Gracias. Si no se ha abierto tu correo, escribe a ' + EMAIL + ' indicando la página y el ejercicio ' + item + '.';
    b.replaceWith(note);
  });
  // Enlace general en el pie de cada página
  function footerLink() {
    if (!EMAIL) return;
    var f = document.querySelector('footer.site');
    if (!f || f.querySelector('.rep-foot')) return;
    var pEl = document.createElement('p');
    pEl.className = 'rep-foot';
    pEl.appendChild(document.createTextNode('¿Has visto un error? Escribe al autor: '));
    var a = document.createElement('a');
    a.href = mailto('');
    a.textContent = EMAIL;
    pEl.appendChild(a);
    f.appendChild(pEl);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', footerLink); else footerLink();

  // Visita a la página (sin datos del visitante)
  send('/' + page + '.html', false);
})();
