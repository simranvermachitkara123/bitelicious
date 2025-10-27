// // Autofocus on name field when page loads
// window.onload = function () {
//     document.getElementById('name').focus();
//   };
  
//   // Show popup after form submission
//   document.getElementById('contactForm').addEventListener('submit', function (e) {
//     e.preventDefault(); // prevent actual form submit
//     document.getElementById('popup').style.display = 'flex';
//     this.reset(); // reset the form
//   });
  
//   // Close popup
//   function closePopup() {
//     document.getElementById('popup').style.display = 'none';
//   }


// Select the form and popup
const contactForm = document.getElementById("contactForm");
const popup = document.getElementById("popup");

// Handle form submission
contactForm.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent default form submission

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple validation
  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields!");
    return;
  }

  // Optional: further validation can be added here

  // Show popup
  popup.style.display = "flex";

  // Clear form
  contactForm.reset();
});

// Close popup function
function closePopup() {
  popup.style.display = "none";
}
