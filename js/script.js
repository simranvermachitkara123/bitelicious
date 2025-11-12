document.addEventListener('DOMContentLoaded', function () {
  // Back to Top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '⬆';
  Object.assign(backToTopBtn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 15px',
    background:  '#a87753', // light pastel pink
    border: 'none',
    borderRadius: '50%',
    color: '#14060686',
    cursor: 'pointer',
    display: 'none',
    zIndex: '999',
    fontWeight: 'bold',
    fontSize: '1.3rem'
  });
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', function () {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


(function () {
  // find input by id (preferred) or fallback to search-bar input used on index.html
  let searchInput = document.getElementById('menuSearch');
  if (!searchInput) searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return; // nothing to do if there's no search field

  // determine items to search: prefer .menu-item (app-wide data-driven items), else use .card-link
  let items = Array.from(document.querySelectorAll('.menu-item'));
  let useCardLinks = false;
  if (items.length === 0) {
    items = Array.from(document.querySelectorAll('.card-link'));
    useCardLinks = true;
  }

  function normalize(s) {
    return String(s || '').trim().toLowerCase();
  }

  function filter() {
    const raw = normalize(searchInput.value);
    const tokens = raw.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      items.forEach(it => { it.style.display = ''; });
      const noEl = document.getElementById('noResults'); if (noEl) noEl.style.display = 'none';
      return;
    }

    const matched = [];
    items.forEach(it => {
      let text = '';
      if (!useCardLinks) {
        text = normalize([
          it.dataset.name,
          it.dataset.ingredients,
          it.dataset.category,
          it.textContent
        ].join(' '));
      } else {
        // card-link layout: search the title and description inside the card
        const title = it.querySelector('h3')?.textContent || '';
        const desc = it.querySelector('p')?.textContent || '';
        text = normalize((title + ' ' + desc + ' ' + (it.dataset.name || '')));
      }

      const ok = tokens.every(t => text.includes(t));
      it.style.display = ok ? '' : 'none';
      if (ok) matched.push(it);
    });

    const noEl = document.getElementById('noResults');
    if (noEl) noEl.style.display = (matched.length === 0) ? 'block' : 'none';
  }

  let timer = null;
  function debounce(fn, delay = 150) {
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  searchInput.addEventListener('input', debounce(filter, 150));
  // allow Enter to focus first matched item (accessibility)
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = items.find(it => it.style.display !== 'none');
      if (first) first.focus && first.focus();
    }
  });
})();