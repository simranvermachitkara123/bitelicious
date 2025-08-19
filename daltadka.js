// Smooth scroll for navbar links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Sweet welcome message (instead of alert)
  window.addEventListener('load', () => {
    const welcome = document.createElement('div');
    welcome.className = 'welcome-popup';
    welcome.innerHTML = '🌿 Welcome to Bitelicious!<br>Enjoy your flavorful journey with Dal Tadka!';
    document.body.appendChild(welcome);
  
    // Animate in
    setTimeout(() => {
      welcome.style.opacity = '1';
      welcome.style.transform = 'translateY(0)';
    }, 400);
  
    // Animate out
    setTimeout(() => {
      welcome.style.opacity = '0';
      welcome.style.transform = 'translateY(-50px)';
      setTimeout(() => welcome.remove(), 1000);
    }, 4000);
  });
  
  // Back-to-top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '⬆';
  backToTopBtn.className = 'back-to-top';
  document.body.appendChild(backToTopBtn);
  
  Object.assign(backToTopBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    padding: '10px 15px',
    borderRadius: '50%',
    backgroundColor: '#ff99cc',
    color: '#000',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'none',
    animation: 'bounce 2s infinite',
    zIndex: '999'
  });
  
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
   // Animate elements on scroll
  const sections = document.querySelectorAll('section, h2, ul, ol, article');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15
  });
  
  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
  
  // Basic FAQ toggle
  const faqs = document.querySelectorAll('section p strong');
  
  faqs.forEach(strong => {
    const parent = strong.closest('p');
    if (parent && parent.nextElementSibling) {
      parent.style.cursor = 'pointer';
      parent.addEventListener('click', () => {
        parent.classList.toggle('active-faq');
        parent.nextElementSibling.classList.toggle('show-answer');
      });
    }
  });