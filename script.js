const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const blurBg = document.querySelector('.menu-blur');
const menuItems = document.querySelectorAll('.menu-item');

function openMenu() { menu.classList.add('open'); blurBg.classList.add('active'); document.body.classList.add('menu-open'); }
function closeMenu() { menu.classList.remove('open'); blurBg.classList.remove('active'); document.body.classList.remove('menu-open'); }
burger.addEventListener('click', openMenu);
blurBg.addEventListener('click', closeMenu);
menuItems.forEach(item => {
    item.addEventListener('click', e => {
        const t = item.dataset.target; if (!t) { closeMenu(); return; }
        e.preventDefault();
        menuItems.forEach(i => i.classList.remove('active-link')); item.classList.add('active-link');
        if (t === 'projects') document.body.classList.add('show-projects'); else document.body.classList.remove('show-projects');
        document.getElementById('articlePage').classList.remove('show');
        document.getElementById('mainGroup').style.display = 'block';
        closeMenu();
    });
});

// ТВОИ ВОПРОСЫ
const FAQ = [
    {
        q: "Как использовать LumiTranslate", html: `
    <h2>Как использовать LumiTranslate</h2>
    <div class="info-box"><b>Нужна помощь с переводом?</b><br>Откройте LumiTranslate и начните переводить мгновенно.<br>
    <a class="blue-btn" href="https://maksimsuhomlinov37-hue.github.io/LumiTranslate/" target="_blank">Открыть LumiTranslate</a></div>
    <p>Если вы забыли как пользоваться, вот инструкция:</p>
    <p><b>Примечания:</b></p>
    <ul><li>Вставьте текст в поле слева</li><li>Выберите языки вверху</li><li>Перевод появится автоматически справа</li></ul>
    <p>Можно использовать на телефоне, компьютере и планшете. Работает быстро и без регистрации.</p>` },
    {
        q: "Как сменить тему в LumiTranslate", html: `
    <h2>Как сменить тему в LumiTranslate</h2>
    <div class="info-box">Хотите темную тему?<br>Тема меняется в один клик.</div>
    <p><b>Если вы хотите сменить тему:</b></p>
    <ol><li>Откройте <a href="https://maksimsuhomlinov37-hue.github.io/LumiTranslate/" target="_blank">LumiTranslate</a></li>
    <li>В правом верхнем углу найдите иконку 🌙 / ☀️</li>
    <li>Нажмите — тема сменится на темную или светлую автоматически</li>
    <li>Выбор сохраняется, при следующем заходе тема останется той же</li></ol>` },
    {
        q: "Что такое LumiTranslate", html: `
    <h2>Что такое LumiTranslate</h2>
    <div class="info-box"><b>LumiTranslate — продукт Company Classic</b><br>Быстрый и красивый онлайн-переводчик.</div>
    <p>LumiTranslate — это проект от Company Classic для быстрого перевода текста между языками. Сделан в стиле Google, работает быстро, без рекламы и лишних кнопок.</p>
    <ul><li>Поддержка множества языков</li><li>Мгновенный перевод</li><li>Адаптивный дизайн</li><li>Полностью бесплатно</li></ul>
    <p>Попробуйте: <a href="https://maksimsuhomlinov37-hue.github.io/LumiTranslate/" target="_blank">maksimsuhomlinov37-hue.github.io/LumiTranslate/</a></p>` },
    {
        q: "Как получить поддержку для LumiTranslate", html: `
    <h2>Как получить поддержку для LumiTranslate</h2>
    <div class="info-box"><b>Нужна помощь?</b><br>Мы отвечаем быстро в WhatsApp.<br>
    <a class="blue-btn" href="https://wa.me/77753539530" target="_blank">Написать в поддержку</a></div>
    <p>Если вы нашли баг или не можете перевести текст:</p>
    <ol><li>Напишите нам в WhatsApp: <b>+7 775 353 95 30</b></li>
    <li>Опишите проблему и приложите скриншот</li>
    <li>Мы отвечаем обычно в течение часа</li></ol>
    <p>Поддержка отвечает только по проектам Company Classic.</p>` },
];

const input = document.getElementById('searchInput');
const list = document.getElementById('suggestList');
const articlePage = document.getElementById('articlePage');
const mainGroup = document.getElementById('mainGroup');

function renderSuggests(arr) {
    list.innerHTML = arr.map(f => `
    <div class="suggest-item" data-q="${f.q}">
      <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#5f6368" stroke-width="1.5"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#5f6368" stroke-width="1.5" stroke-linecap="round"/></svg>
      <span>${f.q}</span>
    </div>
  `).join('');
    list.classList.add('show');
    document.getElementById('searchBox').classList.add('active');
    list.querySelectorAll('.suggest-item').forEach(el => {
        el.addEventListener('click', () => openArticle(el.dataset.q));
    });
}

function openArticle(q) {
    const found = FAQ.find(f => f.q === q);
    if (!found) return;
    articlePage.innerHTML = found.html + `<br><br><a href="#" id="backBtn" style="color:#1a73e8;text-decoration:none;font-weight:600">← Назад</a>`;
    articlePage.classList.add('show');
    mainGroup.style.display = 'none';
    list.classList.remove('show');
    document.getElementById('searchBox').classList.remove('active');
    document.getElementById('backBtn').addEventListener('click', e => { e.preventDefault(); articlePage.classList.remove('show'); mainGroup.style.display = 'block'; });
}

input.addEventListener('input', () => {
    const v = input.value.toLowerCase().trim();
    if (!v) { list.classList.remove('show'); document.getElementById('searchBox').classList.remove('active'); return; }
    const filtered = FAQ.filter(f => f.q.toLowerCase().includes(v));
    if (filtered.length) renderSuggests(filtered);
    else list.classList.remove('show');
});
document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) { list.classList.remove('show'); document.getElementById('searchBox').classList.remove('active'); } });