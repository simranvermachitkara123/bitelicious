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








// Live menu search/filter
(function () {
  const searchInput = document.getElementById('menuSearch');
  if (!searchInput) return; // nothing to do on pages without the input

  const items = Array.from(document.querySelectorAll('.menu-item'));
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
      const text = normalize([
        it.dataset.name,
        it.dataset.ingredients,
        it.dataset.category,
        it.textContent
      ].join(' '));

      // require all tokens to be present (AND logic) so searches like "paneer masala" work
      const ok = tokens.every(t => text.includes(t));
      it.style.display = ok ? '' : 'none';
      if (ok) matched.push(it);
    });

    // debug: log how many matched (useful while troubleshooting)
    if (window.console && console.debug) {
      console.debug('menuSearch:', { query: raw, tokens, total: items.length, matched: matched.length, matchedNames: matched.map(m => m.dataset.name) });
    }

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


// Theme toggle (dark / light) — injects a toggle into the navbar and applies site overrides
(function () {
  const THEME_KEY = 'bitelicious-theme';
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // CSS overrides for dark mode to cover common elements across pages
  const themeCSS = `
  /* Theme overrides injected by script.js */
  html.dark, html.dark body { background: #0f1113 !important; color: #e6e6e6 !important; }
  html.dark .navbar { background: #1b1b1b !important; box-shadow: none !important; }
  html.dark .logo { color: #ffd9a6 !important; }
  html.dark .nav-links a { background: transparent !important; color: #f0e6da !important; border-color: rgba(255,255,255,0.04) !important; }
  html.dark .hero, html.dark .hero-text, html.dark .hero-image { background: transparent !important; }
  html.dark .search-bar { background: #222425 !important; color: #fff !important; border: 1px solid #2b2b2b !important; }
  html.dark .menu-section, html.dark .menu-item { background: #0f1113 !important; border-color: rgba(255,255,255,0.04) !important; color: #e6e6e6 !important; }
  html.dark .menu-item p, html.dark .menu-item h3 { color: #dcdcdc !important; }
  html.dark .footer, html.dark .footer-bottom { background: #121212 !important; color: #cfcfcf !important; border-color: rgba(255,255,255,0.03) !important; }
  html.dark a { color: #ffd59a !important; }
  html.dark .menu-hint { color: #bca089 !important; }
  html.dark #noResults { background: #2b1414 !important; border-color: #4a2222 !important; color: #ffcfcf !important; }
  /* Smooth transition */
  html, body, .menu-item, .navbar, .footer { transition: background-color 220ms ease, color 220ms ease, border-color 220ms ease; }
  `;

  // inject style once
  function ensureThemeStyle() {
    if (document.getElementById('bitelicious-theme-style')) return;
    const s = document.createElement('style');
    s.id = 'bitelicious-theme-style';
    s.appendChild(document.createTextNode(themeCSS));
    document.head.appendChild(s);
  }

  function applyTheme(theme) {
    ensureThemeStyle();
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
  }

  // initial theme: stored setting -> system -> light
  const stored = (() => { try { return localStorage.getItem(THEME_KEY); } catch { return null; } })();
  const initial = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  // create toggle button and insert into navbar (if found)
  function createToggle() {
    const btn = document.createElement('button');
    btn.id = 'themeToggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.title = 'Toggle dark / light mode';
    btn.style.cssText = 'margin-left:0.5rem;padding:0.45rem 0.7rem;border-radius:8px;border:none;cursor:pointer;background:#fffaf5;color:#543a28;font-weight:600;';
    btn.innerText = document.documentElement.classList.contains('dark') ? '🌙 Dark' : '☀️ Light';
    btn.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      btn.innerText = next === 'dark' ? '🌙 Dark' : '☀️ Light';
    });
    return btn;
  }

  // Insert into .navbar if present
  function mountToggle() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    // place at end of nav (after links)
    const existing = document.getElementById('themeToggle');
    if (existing) return;
    const toggle = createToggle();
    // try to add into nav right side
    nav.appendChild(toggle);
  }

  // Wait for DOM ready to mount toggle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountToggle);
  } else mountToggle();

})();