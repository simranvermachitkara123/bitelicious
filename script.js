document.addEventListener('DOMContentLoaded', function () {
  // // Navbar scroll effect
  // const navbar = document.querySelector('.navbar');
  // if (navbar) {
  //   window.addEventListener('scroll', function () {
  //     if (window.scrollY > 100) {
  //       navbar.style.padding = '10px 30px';
  //       navbar.style.transition = 'all 0.3s ease';
  //       navbar.style.background = '#ffe4ec'; // lighter on scroll
  //       navbar.style.boxShadow = '0 2px 12px #ffd1ec';
  //     } else {
  //       navbar.style.padding = '15px 30px';
  //       navbar.style.background = '#fff0f5'; // original light pink
  //       navbar.style.boxShadow = '0 0 10px #ffd1ec';
  //     }
  //   });
  // }

  // Search functionality
  const searchBar = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const recipeCards = document.querySelectorAll('.recipe-card');

  function performSearch() {
    const searchTerm = searchBar.value.toLowerCase();

    recipeCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'block';
        card.style.boxShadow = '0 0 20px #ffd1ec'; // pastel pink shadow
        setTimeout(() => {
          card.style.boxShadow = '0 0 15px #ffe4ec';
        }, 2000);
      } else {
        card.style.display = 'none';
      }
    });

    if (searchTerm === '') {
      recipeCards.forEach(card => {
        card.style.display = 'block';
      });
    }
  }

  if (searchButton && searchBar) {
    searchButton.addEventListener('click', performSearch);
    searchBar.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  // Recipe card hover and click animations
  // recipeCards.forEach(card => {
  //   card.addEventListener('mouseenter', function () {
  //     this.style.transform = 'scale(1.05)';
  //     this.style.boxShadow = '0 0 20px #ffd1ec'; // pastel pink
  //     this.style.background = '#ffe4ec'; // lighter background on hover
  //   });

  //   card.addEventListener('mouseleave', function () {
  //     this.style.transform = 'scale(1)';
  //     this.style.boxShadow = '0 0 15px #fff0f5'; // lighter shadow
  //     this.style.background = '#fff0f5'; // original background
  //   });
  //   card.addEventListener('click', function (e) {
  //     // Prevent alert if the card is wrapped in a link
  //     if (this.closest('a')) return;

  //     const recipeName = this.querySelector('h3')?.textContent || 'recipe';
  //     alert(`Recipe details for ${recipeName} coming soon!`);
  //   });

  // });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        if (targetId === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Lazy load images
  const lazyImages = document.querySelectorAll('.recipe-card img');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Animate section titles on scroll
  const animateSections = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-title').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    animateSections.observe(section);
  });

  // Neon logo effect (optional: soften for light theme)
  // const logo = document.querySelector('.logo');
  // if (logo) {
  //   setInterval(() => {
  //     logo.style.textShadow = '0 0 10px #ffd1ec, 0 0 20px #ffd1ec, 0 0 30px #ffd1ec';
  //     setTimeout(() => {
  //       logo.style.textShadow = '0 0 5px #ffd1ec';
  //     }, 500);
  //   }, 3000);
  // }

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