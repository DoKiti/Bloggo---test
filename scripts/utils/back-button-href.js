export function backButtonDirectory() {
  const backButtonElement = document.querySelector(".js-back-button")
    
// Store the initial location in a variable
let initialLocation = window.location.href;

  backButtonElement.addEventListener('click', async () => {
    await window.history.back();

    setTimeout(() => {
      // Check if the location hasn't changed, and if so, redirect to blog.html
      if (initialLocation === window.location.href) {
        window.location.href = "blog.html";
      }
    }, 100); // Delay 100 milliseconds to give the browser time to process the back navigation

  });
  
}