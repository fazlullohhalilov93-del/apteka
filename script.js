'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const img = (id, alt, w) => `<img src="${U(id, w)}" alt="${alt}" loading="lazy" onerror="this.style.display='none'">`;
const fmt = n => n.toLocaleString('ru-RU').replace(/\u00a0/g, ' ') + ' сум';

/* ---------- Данные (все вымышленные) ---------- */
const I = { shop: '1587854692152-cbe660dbde88', pills: '1631549916768-4119b2e5f926', pills2: '1585435557343-3b092031a831', ph: '1576602976047-174e57a47881',
  med: '1584308666744-24d5c474f2ae', vit: '1550572017-edd951b55104', skin: '1556228720-195a672e8a03', cos: '1607619056574-7b8d3ee536b2', pills3: '1471864190281-a93a3070b6de',
  lab: '1579684385127-1ef15d508118', corr: '1519494026892-80bbd2d6fd0d', team: '1581595220892-b0739db3ba8c' };
const cats = ['Лекарственные препараты', 'Витамины и минералы', 'Товары для иммунитета', 'Уход за кожей', 'Косметика', 'Детские товары', 'Медицинские приборы', 'Первая помощь', 'Гигиена', 'Товары для мам'];
const catImg = [I.pills, I.vit, I.pills3, I.skin, I.cos, I.shop, I.med, I.pills2, I.skin, I.cos];
// [название, категория, описание, цена, в наличии, популярность, по рецепту]
const raw = [
  ['Новалин Демо', 0, 'Демонстрационный безрецептурный товар каталога.', 28000, 1, 80, 0],
  ['Рексавэл Демо Rx', 0, 'Демонстрационная позиция каталога.', 64000, 1, 40, 1],
  ['Лайфтабс Демо', 0, 'Условный товар для примера карточки.', 35000, 0, 55, 0],
  ['Мульти-Вита Демо', 1, 'Демонстрационный витаминный комплекс.', 89000, 1, 95, 0],
  ['Минерал Плюс Демо', 1, 'Условный набор минералов для примера.', 72000, 1, 70, 0],
  ['Омега-Лайн Демо', 1, 'Демонстрационная добавка.', 118000, 1, 60, 0],
  ['Иммуно-Бокс Демо', 2, 'Условный набор для витрины.', 96000, 1, 85, 0],
  ['Чай «Тёплый вечер»', 2, 'Травяной чай, демонстрационный товар.', 31000, 1, 50, 0],
  ['Цитрус-Драйв Демо', 2, 'Шипучие таблетки, демонстрационная позиция.', 42000, 0, 45, 0],
  ['Крем «Мягкий свет»', 3, 'Увлажняющий крем для демонстрации каталога.', 98000, 1, 90, 0],
  ['Гель для умывания Fresh', 3, 'Условное средство для ухода.', 54000, 1, 65, 0],
  ['Солнцезащитный флюид', 3, 'Лёгкая текстура, демонстрационный товар.', 125000, 1, 75, 0],
  ['Помада «Нова Роуз»', 4, 'Демонстрационная декоративная косметика.', 79000, 1, 58, 0],
  ['Тональный крем Silk', 4, 'Условная позиция для каталога.', 134000, 0, 62, 0],
  ['Палетка теней Mint', 4, 'Набор оттенков для примера.', 156000, 1, 48, 0],
  ['Салфетки для малышей', 5, 'Мягкие салфетки, демонстрационный товар.', 24000, 1, 72, 0],
  ['Детский шампунь «Облако»', 5, 'Без слёз, условное описание для витрины.', 38000, 1, 66, 0],
  ['Игрушка-прорезыватель', 5, 'Демонстрационная детская позиция.', 29000, 1, 40, 0],
  ['Тонометр МедНова Pro', 6, 'Электронный прибор, демонстрационный товар.', 389000, 1, 88, 0],
  ['Термометр Quick', 6, 'Бесконтактный, условная позиция каталога.', 149000, 1, 92, 0],
  ['Пульсоксиметр Lite', 6, 'Компактный прибор для демонстрации.', 215000, 0, 54, 0],
  ['Аптечка «Дом»', 7, 'Демонстрационный набор первой помощи.', 112000, 1, 78, 0],
  ['Пластыри Flex (набор)', 7, 'Набор пластырей разных размеров.', 17000, 1, 68, 0],
  ['Бинт эластичный', 7, 'Условный перевязочный материал.', 22000, 1, 46, 0],
  ['Антисептик-спрей 100 мл', 8, 'Для рук, демонстрационный товар.', 26000, 1, 82, 0],
  ['Зубная паста «Белый лист»', 8, 'Ежедневный уход, условная позиция.', 33000, 1, 61, 0],
  ['Маски одноразовые (50 шт.)', 8, 'Демонстрационный гигиенический набор.', 45000, 1, 59, 0],
  ['Крем для груди «Забота»', 9, 'Для мам, демонстрационный товар.', 87000, 1, 52, 0],
  ['Подушка для кормления', 9, 'Условная позиция для витрины.', 198000, 1, 44, 0],
  ['Набор для мамы в роддом', 9, 'Демонстрационный комплект.', 245000, 0, 57, 0]
];
const products = raw.map((r, i) => ({ id: i, name: r[0], cat: r[1], desc: r[2], price: r[3], stock: !!r[4], pop: r[5], rx: !!r[6], img: [catImg[r[1]], I.pills, I.med, I.vit, I.skin][i % 3 ? 0 : (i % 5)] }));

const history = [['2014', 'Первая аптека', 'Молодые фармацевты открывают первую аптеку MedNova в Ташкенте.', I.shop], ['2017', 'Распределительный центр', 'Запущен собственный распределительный центр.', I.corr],
  ['2020', 'Онлайн-каталог', 'Появились онлайн-каталог и предварительный заказ товаров.', I.team], ['2023', 'MedNova Club', 'Сеть запускает программу лояльности и цифровые сервисы.', I.cos],
  ['2026', 'Развитие сети', 'MedNova Pharmacy представлена в нескольких районах Ташкента.', I.shop]];
const promos = [['Скидки на витамины', 'Выберите комплекс из витринной линейки.', 20, 'до 31 декабря', 1, I.vit], ['Сезонные товары', 'Тёплые чаи, наборы и аксессуары к сезону.', 15, 'до 15 января', 2, I.pills3],
  ['Уход за кожей', 'Кремы и средства для ежедневного ухода.', 25, 'до 20 декабря', 3, I.skin], ['Наборы первой помощи', 'Аптечки для дома, офиса и поездок.', 10, 'до 31 января', 7, I.pills2],
  ['Для мам и детей', 'Подборка товаров для малышей и мам.', 18, 'до 28 февраля', 5, I.shop]];
const team = [['Александр Миронов', 'Консультации', 'Главный фармацевт', 18, 'Руководит фармацевтической командой и стандартами обслуживания в сети.', '1612349317150-e413f6a5b16d'],
  ['Елена Волкова', 'Консультации', 'Специалист по фармацевтической консультации', 14, 'Помогает покупателям разобраться в ассортименте и выбрать товары для ежедневного ухода.', '1559839734-2b71ea197ec2'],
  ['Тимур Рахимов', 'Управление', 'Заведующий аптечным отделением', 16, 'Отвечает за работу отделения, выкладку и сервис.', '1622253692010-333f2da6031d'],
  ['София Каримова', 'Консультации', 'Фармацевт-консультант', 11, 'Консультирует по товарам для мам и детей, ведёт программу MedNova Club.', '1594824476967-48c8b964273f'],
  ['Даниэль Хасанов', 'Медтовары', 'Специалист по медицинским товарам', 13, 'Подбирает и тестирует приборы и товары первой помощи для ассортимента.', '1537368910025-700350fe46c7'],
  ['Малика Юсупова', 'Фармацевты', 'Фармацевт', 10, 'Работает с покупателями в зале и помогает с оформлением заказов.', '1651008376811-b90baee60c1f']];
const gal = [['Главный фасад аптеки', I.shop], ['Главный вход', I.shop], ['Интерьер аптеки', I.pills], ['Полки с товарами', I.vit], ['Зона консультации', I.ph], ['Кассовая зона', I.cos],
  ['Складской центр', I.corr], ['Лаборатория контроля качества', I.lab], ['Рабочее место фармацевта', I.ph], ['Зона детских товаров', I.pills2]];
const stores = [['Центр', 'ул. Демонстрационная, 1', '+998 71 000 00 01', '08:00–23:00', 46, 44, I.shop], ['Чиланзар', 'кв. Демо-5, д. 12', '+998 71 000 00 02', '08:00–23:00', 25, 62, I.pills],
  ['Юнусабад', 'пр. Примерный, 24', '+998 71 000 00 03', '08:00–23:00', 62, 22, I.cos], ['Мирзо-Улугбек', 'ул. Условная, 8', '+998 71 000 00 04', '08:00–23:00', 78, 40, I.vit],
  ['Сергели', 'ул. Тестовая, 30', '+998 71 000 00 05', '08:00–23:00', 52, 78, I.pills3]];
const del = [['🏪', 'Самовывоз из аптеки', 'Заберите заказ в удобное время.'], ['🛵', 'Курьерская доставка', 'Доставка по городу и выбор времени (демо-описание).'], ['📅', 'Предварительный заказ', 'Резервирование товаров заранее.'],
  ['📍', 'Выбранный филиал', 'Получение в любой аптеке сети.'], ['📦', 'Отслеживание статуса', 'Статусы заказа на каждом этапе.'], ['🔔', 'Уведомления', 'Сообщение о готовности заказа.']];
const tech = [['Цифровой каталог', 'Быстрый поиск товаров и наличия по филиалам.', I.team], ['Автоматизированный склад', 'Ускоряет комплектацию и снижает ошибки.', I.corr], ['Контроль качества', 'Проверка партий и документации.', I.lab],
  ['Электронная лояльность', 'Бонусы и предложения в одном месте.', I.cos], ['Условия хранения', 'Контроль температуры и влажности.', I.med], ['Цифровой учёт', 'Точная информация о остатках.', I.pills2]];
const reviews = [['Дильноза А.', 5, 'Чистая аптека, вежливый персонал и удобная выкладка товаров.', '12.11.2026'], ['Сергей П.', 5, 'Быстро нашёл нужный товар через каталог на сайте.', '03.11.2026'],
  ['Азиз Р.', 4, 'Удобная программа бонусов и приятный сервис.', '21.10.2026'], ['Наталья К.', 5, 'Понравилась детская зона и аккуратная упаковка заказа.', '09.10.2026']];

/* ---------- Утилиты ---------- */
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(t.h); t.h = setTimeout(() => t.classList.remove('show'), 4500); }
const modal = html => { $('#mbody').innerHTML = html; $('#modal').classList.add('open'); };
const closeAll = () => { $$('.ov').forEach(o => o.classList.remove('open')); $('#drawer').classList.remove('open'); };
document.addEventListener('click', e => { if (e.target.matches('[data-close]') || e.target.classList.contains('ov')) closeAll(); });
document.addEventListener('keydown', e => e.key === 'Escape' && closeAll());
function validate(form, rules) {
  let ok = true;
  Object.entries(rules).forEach(([k, fn]) => { const el = form[k], r = fn(el.value), l = el.parentElement; l.classList.toggle('err', r !== true); $('em', l).textContent = r === true ? '' : r; if (r !== true) ok = false; });
  return ok;
}
const vName = v => v.trim().length >= 2 || 'Введите имя', vPhone = v => /^\+?[\d\s()-]{9,}$/.test(v.trim()) || 'Введите корректный телефон', vMail = v => /^\S+@\S+\.\S+$/.test(v) || 'Введите корректный email';

/* ---------- Рендер статичных секций ---------- */
$('#timeline').innerHTML = history.map(([y, t, d, i]) => `<div class="tl reveal"><div class="card"><div class="ph">${img(i, t, 600)}</div><div class="cb"><h3>${y}</h3><b>${t}</b><p>${d}</p></div></div></div>`).join('');
$('#promoGrid').innerHTML = promos.map(([t, d, p, e, c, i]) => `<article class="card reveal"><div class="ph"><span class="badge">−${p}%</span>${img(i, t, 600)}</div><div class="cb"><h3>${t}</h3><p>${d}</p><div class="exp">Демо-акция · ${e}</div><div class="btns"><button class="pri" data-promo="${c}">Посмотреть товары</button></div></div></article>`).join('');
$('#galGrid').innerHTML = gal.map(([t, i], n) => `<figure class="gi reveal" data-full="${U(i, 1600)}">${img(i, t, 700 + n)}<span>${t}</span></figure>`).join('');
$('#delGrid').innerHTML = del.map(([i, t, d]) => `<div class="card reveal"><div class="ic">${i}</div><h3>${t}</h3><p>${d}</p></div>`).join('');
$('#techGrid').innerHTML = tech.map(([t, d, i]) => `<article class="card reveal"><div class="ph">${img(i, t, 600)}</div><div class="cb"><h3>${t}</h3><p>${d}</p></div></article>`).join('');

/* Фармацевты */
const specs = ['Все', ...new Set(team.map(t => t[1]))];
$('#filters').innerHTML = specs.map((s, i) => `<button class="${i ? '' : 'on'}" data-f="${s}">${s}</button>`).join('');
function renderTeam(f = 'Все') {
  $('#teamGrid').innerHTML = team.map((t, n) => ({ t, n })).filter(({ t }) => f === 'Все' || t[1] === f).map(({ t, n }) => `<article class="card reveal in"><div class="ph" style="height:260px">${img(t[5], t[0], 600)}</div><div class="cb"><span class="tag">Стаж ${t[3]} лет</span><h3>${t[0]}</h3><p><b>${t[2]}</b></p><div class="btns"><button class="pri" data-team="${n}">Подробнее</button></div></div></article>`).join('');
}
renderTeam();
$('#filters').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#filters button').forEach(x => x.classList.toggle('on', x === b)); renderTeam(b.dataset.f); });

/* ---------- Каталог ---------- */
let state = { cat: -1, q: '', sort: 'pop', avail: false };
$('#cats').innerHTML = `<button class="on" data-c="-1">Все</button>` + cats.map((c, i) => `<button data-c="${i}">${c}</button>`).join('');
function renderCatalog() {
  let list = products.filter(p => (state.cat < 0 || p.cat === state.cat) && p.name.toLowerCase().includes(state.q.toLowerCase()) && (!state.avail || p.stock));
  list.sort((a, b) => state.sort === 'asc' ? a.price - b.price : state.sort === 'desc' ? b.price - a.price : b.pop - a.pop);
  $('#products').innerHTML = list.map(p => `<article class="card"><div class="ph">${img(p.img, p.name, 500)}</div><div class="cb"><span class="tag ${p.rx ? 'rx' : ''}">${p.rx ? 'Отпускается по рецепту' : cats[p.cat]}</span><h3>${p.name}</h3><p>${p.desc}</p>
    <div class="row"><span class="price">${fmt(p.price)}</span><span class="stock ${p.stock ? 'ok' : 'no'}">${p.stock ? '● В наличии' : '● Нет в наличии'}</span></div>
    <div class="btns"><button data-info="${p.id}">Подробнее</button><button class="pri" data-add="${p.id}" ${!p.stock ? 'disabled' : ''}>${p.rx ? 'По рецепту' : 'В корзину'}</button></div></div></article>`).join('');
  $('#empty').hidden = list.length > 0; $('#found').textContent = `Найдено товаров: ${list.length}`;
}
$('#cats').onclick = e => { const b = e.target.closest('button'); if (!b) return; state.cat = +b.dataset.c; $$('#cats button').forEach(x => x.classList.toggle('on', x === b)); renderCatalog(); };
$('#q').oninput = e => { state.q = e.target.value; renderCatalog(); };
$('#sort').onchange = e => { state.sort = e.target.value; renderCatalog(); };
$('#avail').onchange = e => { state.avail = e.target.checked; renderCatalog(); };
$('#reset').onclick = () => { state = { cat: -1, q: '', sort: 'pop', avail: false }; $('#q').value = ''; $('#sort').value = 'pop'; $('#avail').checked = false; $$('#cats button').forEach((x, i) => x.classList.toggle('on', !i)); renderCatalog(); };
renderCatalog();

/* ---------- Корзина (localStorage) ---------- */
let cart = []; try { cart = JSON.parse(localStorage.getItem('mn_cart')) || []; } catch (e) { cart = []; }
const save = () => { try { localStorage.setItem('mn_cart', JSON.stringify(cart)); } catch (e) { } };
function renderCart() {
  const n = cart.reduce((s, c) => s + c.q, 0), sum = cart.reduce((s, c) => s + c.q * products[c.id].price, 0);
  $('#cartCount').textContent = n; $('#total').textContent = fmt(sum); $('#checkout').disabled = !n;
  $('#items').innerHTML = n ? cart.map(c => { const p = products[c.id]; return `<div class="ci"><div class="ph">${img(p.img, p.name, 200)}</div><div><h4>${p.name}</h4><b>${fmt(p.price)}</b><div class="qty"><button data-q="${c.id}" data-d="-1">−</button>${c.q}<button data-q="${c.id}" data-d="1">+</button></div></div><button class="rm" data-rm="${c.id}" aria-label="Удалить">🗑️</button></div>`; }).join('') : '<p class="note c" style="padding:40px 0">Корзина пуста. Добавьте товары из каталога.</p>';
  save();
}
function add(id) {
  const p = products[id];
  if (p.rx) return toast('Рецептурный товар нельзя купить без проверки рецепта. Обратитесь в аптеку.');
  const c = cart.find(x => x.id === id); c ? c.q++ : cart.push({ id, q: 1 }); renderCart();
  const b = $('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); toast(`«${p.name}» добавлен в корзину`);
}
$('#cartBtn').onclick = () => $('#drawer').classList.add('open'); $('#dclose').onclick = () => $('#drawer').classList.remove('open');
$('#items').onclick = e => {
  const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
  if (q) { const c = cart.find(x => x.id == q.dataset.q); c.q += +q.dataset.d; if (c.q < 1) cart = cart.filter(x => x !== c); }
  if (r) cart = cart.filter(x => x.id != r.dataset.rm); renderCart();
};
renderCart();
$('#checkout').onclick = () => {
  $('#drawer').classList.remove('open');
  modal(`<form class="mform form" id="order" novalidate><h2>Оформление заказа</h2>
    <label>Имя покупателя<input name="name"><em></em></label><label>Номер телефона<input name="phone" placeholder="+998 90 000 00 00"><em></em></label>
    <label>Адрес доставки<input name="addr"><em></em></label>
    <label>Способ получения<select name="way"><option>Самовывоз из аптеки</option><option>Курьерская доставка</option><option>Предварительный заказ</option><option>Получение в выбранном филиале</option></select><em></em></label>
    <label>Комментарий<textarea name="msg" rows="2"></textarea></label>
    <p class="note">Демонстрационный заказ: данные никуда не отправляются.</p><button class="btn" type="submit">Подтвердить заказ</button></form>`);
  $('#order').onsubmit = e => {
    e.preventDefault(); const f = e.target;
    if (!validate(f, { name: vName, phone: vPhone, addr: v => v.trim().length >= 3 || 'Введите адрес' })) return;
    cart = []; renderCart(); closeAll();
    toast('Спасибо! Ваш демонстрационный заказ оформлен. Для реального заказа необходимо подключить серверную систему');
  };
};

/* Карточка товара, сотрудников, филиала */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-add]'); if (a) add(+a.dataset.add);
  const i = e.target.closest('[data-info]'); if (i) {
    const p = products[+i.dataset.info];
    modal(`<div class="pd"><div class="ph">${img(p.img, p.name, 700)}</div><div class="cb"><span class="tag ${p.rx ? 'rx' : ''}">${p.rx ? 'Отпускается по рецепту' : cats[p.cat]}</span><h2>${p.name}</h2><p>${p.desc} Это вымышленный демонстрационный товар: страница не содержит медицинских рекомендаций.</p>
      <div class="row"><span class="price">${fmt(p.price)}</span><span class="stock ${p.stock ? 'ok' : 'no'}">${p.stock ? '● В наличии' : '● Нет в наличии'}</span></div>
      <div class="btns"><button class="pri" data-add="${p.id}" ${!p.stock ? 'disabled' : ''}>${p.rx ? 'Требуется проверка рецепта' : 'В корзину'}</button></div></div></div>`);
  }
  const t = e.target.closest('[data-team]'); if (t) { const m = team[+t.dataset.team]; modal(`<div class="pd"><div class="ph">${img(m[5], m[0], 700)}</div><div class="cb"><span class="tag">Стаж ${m[3]} лет</span><h2>${m[0]}</h2><p><b>${m[2]}</b></p><p>${m[4]}</p><p class="note">Вымышленный персонаж демонстрационного сайта.</p></div></div>`); }
  const pr = e.target.closest('[data-promo]'); if (pr) { $('#cats button[data-c="' + pr.dataset.promo + '"]').click(); $('#catalog').scrollIntoView({ behavior: 'smooth' }); }
  const s = e.target.closest('[data-soc]'); if (s) { e.preventDefault(); toast(`${s.dataset.soc}: демонстрационная ссылка, страницы не существует`); }
});

/* ---------- Аптеки / карта ---------- */
$('#map').insertAdjacentHTML('beforeend', stores.map((s, i) => `<button class="mk" style="left:${s[4]}%;top:${s[5]}%" data-s="${i}" aria-label="${s[0]}"></button>`).join(''));
function showStore(i) {
  const s = stores[i]; $$('.mk').forEach((m, n) => m.classList.toggle('on', n === i));
  $('#sinfo').innerHTML = `<div class="ph">${img(s[6], s[0], 700)}</div><div class="cb"><span class="tag">Демо-филиал</span><h3>MedNova Pharmacy — ${s[0]}</h3><p>📍 ${s[1]}, Ташкент</p><p>📞 ${s[2]}</p><p>🕒 ${s[3]}</p><div class="btns"><button class="pri" data-sd="${i}">Подробнее</button></div></div>`;
}
$('#map').onclick = e => { const m = e.target.closest('.mk'); if (m) showStore(+m.dataset.s); };
$('#sinfo').onclick = e => { const b = e.target.closest('[data-sd]'); if (b) { const s = stores[+b.dataset.sd]; modal(`<div class="mform"><h2>MedNova Pharmacy — ${s[0]}</h2><p>📍 ${s[1]}, Ташкент<br>📞 ${s[2]}<br>🕒 ${s[3]}</p><p class="note" style="margin-top:12px">Адрес, телефон и график вымышлены и приведены в демонстрационных целях.</p></div>`); } };
showStore(0);

/* ---------- MedNova Club ---------- */
$('#joinBtn').onclick = () => {
  modal(`<form class="mform form" id="club" novalidate><h2>Стать участником MedNova Club</h2><label>Имя<input name="name"><em></em></label><label>Номер телефона<input name="phone"><em></em></label><label>Email<input name="email"><em></em></label>
    <p class="note">Демо-регистрация: данные не сохраняются и не передаются.</p><button class="btn" type="submit">Зарегистрироваться</button></form>`);
  $('#club').onsubmit = e => { e.preventDefault(); if (!validate(e.target, { name: vName, phone: vPhone, email: vMail })) return; closeAll(); toast('Спасибо! Демонстрационная регистрация в MedNova Club выполнена.'); };
};

/* Обратная связь */
$('#fb').onsubmit = e => { e.preventDefault(); const f = e.target; if (!validate(f, { name: vName, email: vMail, msg: v => v.trim().length >= 5 || 'Введите сообщение' })) return; f.reset(); toast('Спасибо! Демонстрационное сообщение принято (никуда не отправлено).'); };

/* Отзывы */
let cur = 0, timer;
$('#dots').innerHTML = reviews.map((_, i) => `<i data-i="${i}"></i>`).join('');
function show(i) {
  cur = (i + reviews.length) % reviews.length; const s = $('#slide'); s.style.opacity = 0;
  setTimeout(() => { const r = reviews[cur]; s.innerHTML = `<div class="av">${r[0][0]}</div><div class="stars">${'★'.repeat(r[1])}${'☆'.repeat(5 - r[1])}</div>“${r[2]}”<small>— ${r[0]} · ${r[3]} · демонстрационный отзыв</small>`; s.style.opacity = 1; }, 250);
  $$('#dots i').forEach((d, n) => d.classList.toggle('on', n === cur));
}
const auto = () => { clearInterval(timer); timer = setInterval(() => show(cur + 1), 6000); };
$('#prev').onclick = () => { show(cur - 1); auto(); }; $('#next').onclick = () => { show(cur + 1); auto(); };
$('#dots').onclick = e => { if (e.target.dataset.i) { show(+e.target.dataset.i); auto(); } };
show(0); auto();

/* Lightbox */
$('#galGrid').addEventListener('click', e => { const f = e.target.closest('.gi'); if (f) { $('#lb img').src = f.dataset.full; $('#lb').classList.add('open'); } });

/* ---------- Анимации ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
function count(el) {
  const n = +el.dataset.n, plus = el.dataset.plus ? '+' : '';
  if (reduce) { el.textContent = n + plus; return; }
  let t0; const step = t => { t0 ??= t; const p = Math.min((t - t0) / 1600, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + (p === 1 ? plus : ''); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $$('[data-n]', e.target).forEach(count); cio.disconnect(); } }), { threshold: .4 });
cio.observe($('.stats'));
addEventListener('scroll', () => {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.width = (y / h * 100) + '%'; $('#nav').classList.toggle('solid', y > 60); $('#top').classList.toggle('show', y > 600);
  if (!reduce && y < innerHeight) $('#heroBg').style.transform = `translateY(${y * .3}px)`;
}, { passive: true });
$('#top').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
const menu = $('#menu'); $('#burger').onclick = () => menu.classList.toggle('open'); menu.onclick = e => e.target.tagName === 'A' && menu.classList.remove('open');

/* ---------- Языки ---------- */
const i18n = {
  en: { nav_about: 'About', nav_cat: 'Catalog', nav_promo: 'Offers', nav_club: 'MedNova Club', nav_stores: 'Pharmacies', nav_con: 'Contacts', h1: 'Health begins with care',
    sub: 'MedNova Pharmacy — modern pharmaceutical solutions, quality health products and professional care for every customer.', b_cat: 'Go to catalog', b_near: 'Find nearest pharmacy',
    s1: 'years in business', s2: 'pharmacies', s3: 'products', s4: 'specialists', t_about: 'MedNova Pharmacy story', t_cat: 'Product catalog', t_promo: 'Offers and promotions', t_team: 'Our pharmacists',
    t_gal: 'Pharmacy gallery', t_club: 'MedNova Club', t_stores: 'Our pharmacies', t_del: 'Delivery and pickup', t_tech: 'Pharmacy of the future', t_rev: 'Customer reviews', t_con: 'Contacts' },
  uz: { nav_about: 'Biz haqimizda', nav_cat: 'Katalog', nav_promo: 'Aksiyalar', nav_club: 'MedNova Club', nav_stores: 'Dorixonalar', nav_con: 'Aloqa', h1: "Salomatlik g'amxo'rlikdan boshlanadi",
    sub: "MedNova Pharmacy — zamonaviy farmatsevtik yechimlar, sifatli salomatlik mahsulotlari va har bir mijozga professional g'amxo'rlik.", b_cat: "Katalogga o'tish", b_near: 'Eng yaqin dorixonani topish',
    s1: 'yillik faoliyat', s2: 'dorixona', s3: 'mahsulot', s4: 'mutaxassis', t_about: 'MedNova Pharmacy tarixi', t_cat: 'Mahsulotlar katalogi', t_promo: 'Aksiyalar va takliflar', t_team: 'Bizning farmatsevtlar',
    t_gal: 'Dorixonalar galereyasi', t_club: 'MedNova Club', t_stores: 'Bizning dorixonalar', t_del: 'Yetkazib berish va olish', t_tech: 'Kelajak dorixonasi', t_rev: 'Mijozlar fikri', t_con: 'Aloqa' }
};
const base = {}; $$('[data-i18n]').forEach(el => base[el.dataset.i18n] = el.textContent);
$('#lang').onchange = e => { const l = e.target.value; document.documentElement.lang = l; $$('[data-i18n]').forEach(el => el.textContent = (i18n[l] && i18n[l][el.dataset.i18n]) || base[el.dataset.i18n]); };
