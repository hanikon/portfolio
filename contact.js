// Кнопки связи открывают WhatsApp, Telegram и почту с готовым текстом.
// Текст зависит от страницы: <body data-contact="construction"> и т.п.
(function () {
  var MESSAGES = {
    main:
      'Здравствуйте, Адай! Пишу с вашего сайта, хочу обсудить проект.\n' +
      'Что нужно: сайт / приложение / бот / автоматизация / ИИ\n' +
      'Коротко о задаче: ',
    construction:
      'Здравствуйте, Адай! Пишу со страницы для проектных компаний.\n' +
      'Интересует: цифровизация данных / аналитика и сроки / ИИ по АГСК / контроль на объекте\n' +
      'Коротко о задаче: '
  };
  var SUBJECT = 'Проект с сайта tumarbayev.vercel.app';

  var key = document.body.getAttribute('data-contact') || 'main';
  var text = MESSAGES[key] || MESSAGES.main;
  var enc = encodeURIComponent(text);

  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href.indexOf('https://wa.me/') === 0) {
      a.href = href.split('?')[0] + '?text=' + enc;
      a.target = '_blank';
      a.rel = 'noopener';
    } else if (href.indexOf('https://t.me/') === 0) {
      a.href = href.split('?')[0] + '?text=' + enc;
      a.target = '_blank';
      a.rel = 'noopener';
      // Telegram подставляет текст не во всех приложениях — копируем его на всякий случай
      a.addEventListener('click', function () { copy(text, 'Текст скопирован — вставьте его в чат Telegram'); });
    } else if (href.indexOf('mailto:') === 0) {
      a.href = href.split('?')[0] + '?subject=' + encodeURIComponent(SUBJECT) + '&body=' + enc;
    }
  });

  function copy(value, note) {
    var done = function () { toast(note); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(done, function () {});
    }
  }

  function toast(msg) {
    var el = document.createElement('div');
    el.textContent = msg;
    el.setAttribute('role', 'status');
    el.style.cssText =
      'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:100;' +
      'max-width:calc(100% - 32px);padding:12px 18px;border-radius:12px;' +
      'background:#ffffff;color:#111;font:500 15px/1.4 Inter,system-ui,sans-serif;' +
      'box-shadow:0 10px 30px rgba(0,0,0,.35);text-align:center;transition:opacity .3s ease';
    document.body.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; }, 3200);
    setTimeout(function () { el.remove(); }, 3600);
  }
})();
