export function backButtonDirectory() {
  const backButtonElement = document.querySelector(".js-back-button")

  backButtonElement.addEventListener('click', () => {
    // Check if there is a previous page in history
    if (window.history.length > 1) {
      // If there's a previous page, go back
      window.history.back();
    } else {
      // If there's no previous page, navigate to blog.html
      window.location.href = "blog.html";
    }
  });
  
}