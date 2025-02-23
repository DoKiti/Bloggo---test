// Function to hide or remove the element based on the window width
function checkWindowSize() {
  if (window.innerWidth < 500) {
    document.querySelector(".js-logo").src = "images/icons/logo-square.png"
  } else {
    document.querySelector(".js-logo").src = "images/icons/logo.png";
  }
}

// Run the function on page load
checkWindowSize();

// Run the function on window resize
window.addEventListener("resize", checkWindowSize);
