// Lightweight client-side favorites module
// Usage: include <script src="js/favorites.js"></script> on pages that need favorites UI
// Stores favorites per user in localStorage under key `favorites:<email>`
(function () {
  const FAVORITES_PREFIX = 'favorites:';

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch (e) {
      return null;
    }
  }

  function getFavoritesKey(email) {
    return FAVORITES_PREFIX + email;
  }

  function getFavorites() {
    const user = getCurrentUser();
    if (!user) return [];
    try {
      return JSON.parse(localStorage.getItem(getFavoritesKey(user.email))) || [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(list) {
    const user = getCurrentUser();
    if (!user) return;
    localStorage.setItem(getFavoritesKey(user.email), JSON.stringify(list));
  }

  function isFavorited(id) {
    const fav = getFavorites();
    return fav.some(item => item.id === id);
  }

  function toggleFavorite(item) {
    // item: { id, name, category, ingredients? }
    if (!item || !item.id) return false;
    const list = getFavorites();
    const idx = list.findIndex(i => i.id === item.id);
    if (idx === -1) {
      list.push(item);
      saveFavorites(list);
      return true; // now favorited
    } else {
      list.splice(idx, 1);
      saveFavorites(list);
      return false; // removed
    }
  }

  function ensureAuthOrRedirect(redirectTo = 'login.html') {
    if (!getCurrentUser()) {
      // quick redirect if not logged in
      window.location.href = redirectTo;
      return false;
    }
    return true;
  }

  // Render favorite buttons beside each `.menu-item` element
  function renderFavoriteButtons() {
    // Only run if user is logged in
    const user = getCurrentUser();
    if (!user) return; // silently do nothing on public pages

    document.querySelectorAll('.menu-item').forEach(itemEl => {
      // Determine a stable id for the dish
      let id = itemEl.getAttribute('data-id') ||
               slugify(itemEl.getAttribute('data-name') || itemEl.querySelector('h3')?.textContent || '') ||
               null;
      if (!id) return;

      // skip if already has a fav button
      if (itemEl.querySelector('.fav-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fav-btn';
      btn.setAttribute('aria-pressed', isFavorited(id) ? 'true' : 'false');
      btn.title = isFavorited(id) ? 'Remove from favorites' : 'Add to favorites';
      btn.innerHTML = isFavorited(id) ? '❤️' : '🤍';

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const meta = {
          id,
          name: itemEl.getAttribute('data-name') || itemEl.querySelector('h3')?.textContent || '',
          category: itemEl.getAttribute('data-category') || '',
          ingredients: itemEl.getAttribute('data-ingredients') || ''
        };
        const nowFav = toggleFavorite(meta);
        btn.innerHTML = nowFav ? '❤️' : '🤍';
        btn.setAttribute('aria-pressed', nowFav ? 'true' : 'false');
        btn.title = nowFav ? 'Remove from favorites' : 'Add to favorites';
      });

      // place button visually (append to itemEl header or to the element)
      // Try to insert into a header area if present
      const header = itemEl.querySelector('.menu-item-header') || itemEl.querySelector('h3');
      if (header) header.insertAdjacentElement('afterend', btn);
      else itemEl.appendChild(btn);

      // basic styles (inlined so pages without CSS still see it)
      btn.style.marginLeft = '8px';
      btn.style.fontSize = '1.1rem';
      btn.style.border = 'none';
      btn.style.background = 'transparent';
      btn.style.cursor = 'pointer';
    });
  }

  function renderFavoritesList(containerSelector = '#favoritesList') {
    if (!ensureAuthOrRedirect('login.html')) return;
    const list = getFavorites();
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
      container.innerHTML = '<p>No favorites yet — add some dishes ❤️</p>';
      return;
    }
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    list.forEach(item => {
      const li = document.createElement('li');
      li.style.padding = '8px 0';
      li.innerHTML = `<strong>${escapeHtml(item.name)}</strong> <small style="color:#666">${escapeHtml(item.category||'')}</small>`;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  // small helpers
  function slugify(text) {
    return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
  function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // Auto-run: if menu items exist on the page, try to render fav buttons after DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    try { renderFavoriteButtons(); } catch (e) { /* ignore */ }
  });

  // Expose some helpers to global scope for manual use
  window.BiteliciousFavorites = {
    getFavorites,
    toggleFavorite,
    isFavorited,
    renderFavoritesList,
    ensureAuthOrRedirect,
    getCurrentUser
  };

})();
