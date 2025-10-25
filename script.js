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


document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');
  const sections = document.querySelectorAll('.recipes-section');

  // Create "not found" message
  const notFoundMsg = document.createElement('p');
  notFoundMsg.textContent = "Recipe not found 🍽";
  notFoundMsg.style.textAlign = "center";
  notFoundMsg.style.fontSize = "1.5rem";
  notFoundMsg.style.color = "#ff4444";
  notFoundMsg.style.marginTop = "20px";
  notFoundMsg.style.display = "none";
  document.querySelector('.search-bar').insertAdjacentElement('afterend', notFoundMsg);

  const normalize = text => text.toLowerCase().trim();

  function performSearch() {
    const query = normalize(searchInput.value);
    let anyMatch = false;

    sections.forEach(section => {
      const cards = section.querySelectorAll('.card-link');
      let sectionHasMatch = false;

      cards.forEach(cardLink => {
        const title = cardLink.querySelector('h3')?.textContent || '';
        const desc = cardLink.querySelector('p')?.textContent || '';
        const fullText = normalize(title + ' ' + desc);

        if (query === '' || fullText.includes(query)) {
          cardLink.style.display = 'block';
          sectionHasMatch = true;
          anyMatch = true;
        } else {
          cardLink.style.display = 'none';
        }
      });

      //no match
      section.style.display = sectionHasMatch ? 'block' : 'none';
    });

    // show/hide not found message
    notFoundMsg.style.display = (!anyMatch && query !== '') ? 'block' : 'none';

    // reset when empty
    if (query === '') {
      sections.forEach(section => {
        section.style.display = 'block';
        section.querySelectorAll('.card-link').forEach(card => (card.style.display = 'block'));
      });
      notFoundMsg.style.display = 'none';
    }
  }

  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    performSearch();
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });
});



