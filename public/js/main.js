// Get the button element
const myButton = document.getElementById("addAlbumBtn");

// Add a click event listener to the button
myButton.addEventListener("click", function() {
  // Redirect to another route
  window.location.href = "/api/albums";
});