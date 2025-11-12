document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('review-form');
  const reviewsContainer = document.getElementById("reviews-container") || document.getElementById("all-reviews");

  // Load reviews from localStorage
  const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  savedReviews.forEach(review => addReviewToDOM(review));

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const recipe = document.getElementById("recipe").value.trim();
    const rating = parseInt(document.getElementById("rating").value);
    const reviewText = document.getElementById("review").value.trim();

    // ✅ VALIDATIONS

    // 1️⃣ Empty field check
    if (name.trim() === "" || recipe.trim() === "" || reviewText.trim() === "") {
  alert('⚠ Please fill in all fields before submitting.');
  return;
}

    // 2️⃣ Alphabet check for name and recipe
    const alphaRegex = /^[A-Za-z\s]+$/;
    if (!alphaRegex.test(name)) {
      alert('❌ Name should contain only alphabets.');
      return;
    }
    if (!alphaRegex.test(recipe)) {
      alert('❌ Recipe name should contain only alphabets.');
      return;
    }

    // 3️⃣ Rating range validation
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert('⭐ Rating must be a number between 1 and 5.');
      return;
    }

    // ✅ If all validations pass
    const reviewData = { name, recipe, rating, reviewText };

    // Add to DOM
    addReviewToDOM(reviewData);

    // Save to localStorage
    savedReviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(savedReviews));

    alert('🎉 Thank you for your review! It has been saved.');
    form.reset();
  });

  // Function to display review in DOM
  function addReviewToDOM({ name, recipe, rating, reviewText }) {
    const newReview = document.createElement("div");
    newReview.classList.add("review");
    newReview.innerHTML = `
      <p>"${reviewText}"</p>
      <p>${recipe}</p>
      <p><strong>– ${name}</strong></p>
      <p>${"⭐".repeat(rating)}${"☆".repeat(5 - rating)}</p>
    `;
    reviewsContainer.appendChild(newReview);
  }

  // Smooth scrolling
  document.querySelectorAll('nav a, .back-to-top').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(targetId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Fade-in animation observer
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => fadeInObserver.observe(el));
});