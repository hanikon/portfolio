// Фильтр работ по направлению
(function () {
  var chips = document.querySelectorAll('.chip');
  var projects = document.querySelectorAll('.proj');
  var empty = document.getElementById('emptyNote');

  function apply(filter) {
    var shown = 0;
    projects.forEach(function (p) {
      var tags = (p.dataset.tags || '').split(' ');
      var ok = filter === 'all' || tags.indexOf(filter) !== -1;
      p.hidden = !ok;
      if (ok) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-on'); });
      chip.classList.add('is-on');
      apply(chip.dataset.filter);
    });
  });
})();

// Подстановка ниши под конкретного клиента: ?niche=dental
(function () {
  var NICHES = {
    dental:    { who: 'стоматологий',          what: 'Сайты, запись и автоматизация для стоматологий' },
    beauty:    { who: 'салонов красоты',       what: 'Сайты, онлайн-запись и чат-боты для салонов красоты' },
    shop:      { who: 'интернет-магазинов',    what: 'Интернет-магазины, которые продают, а не просто висят' },
    auto:      { who: 'автобизнеса',           what: 'Сайты и автоматизация для автосервисов и автосалонов' },
    medical:   { who: 'клиник',                what: 'Сайты, запись и автоматизация для клиник' },
    food:      { who: 'кафе и ресторанов',     what: 'Сайты, меню и приём заказов для кафе и ресторанов' },
    fitness:   { who: 'фитнес-клубов',         what: 'Сайты, абонементы и боты для фитнес-клубов' },
    edu:       { who: 'учебных центров',       what: 'Сайты, запись и автоматизация для учебных центров' },
    law:       { who: 'юридических компаний',  what: 'Сайты и автоматизация для юридических компаний' },
    realty:    { who: 'агентств недвижимости', what: 'Сайты и каталоги для агентств недвижимости' }
  };

  var key = new URLSearchParams(location.search).get('niche');
  var n = key && NICHES[key.toLowerCase()];
  if (!n) return;

  var eyebrow = document.querySelector('[data-niche-eyebrow]');
  var title = document.querySelector('[data-niche-title]');
  var sub = document.querySelector('[data-niche-sub]');

  if (eyebrow) eyebrow.textContent = 'Разработка для ' + n.who + ' · Астана';
  if (title) title.textContent = n.what;
  if (sub) {
    sub.textContent = 'Беру проект целиком — от требований до поддержки. ' +
      'Сайт, мобильное приложение, чат-бот и продвижение в поиске: одним подрядчиком, без стыковки между исполнителями.';
  }
  document.title = n.what + ' — Адай Тумарбаев';
})();
