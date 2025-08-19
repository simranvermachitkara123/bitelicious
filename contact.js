// Autofocus on name field when page loads
window.onload = function () {
    document.getElementById('name').focus();
  };
  
  // Show popup after form submission
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent actual form submit
    document.getElementById('popup').style.display = 'flex';
    this.reset(); // reset the form
  });
  
  // Close popup
  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }