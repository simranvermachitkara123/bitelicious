document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  if (!contactForm || !popup || !closePopupBtn) {
    console.error("❌ Missing elements in the DOM. Check your HTML IDs.");
    return;
  }

  // Handle form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields!");
      return;
    }

    // Store data locally
    const contactData = { name, email, message, date: new Date().toLocaleString() };
    let storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    storedContacts.push(contactData);
    localStorage.setItem("contacts", JSON.stringify(storedContacts));

    // Show popup
    popup.style.display = "flex";
    contactForm.reset();
  });

  // Close popup
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
