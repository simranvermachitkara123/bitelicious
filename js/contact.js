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


  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields!");
    return;
  }
  popup.style.display = "flex";
  contactForm.reset();
});


function closePopup() {
  popup.style.display = "none";
}
