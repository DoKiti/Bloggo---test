import { displayError } from "../displayError.js";

export function backButtonDirectory() {
  const backButtonElements = document.querySelectorAll(".js-back-button")
    
// Store the initial location in a variable
let initialLocation = window.location.href;

backButtonElements.forEach((backButtonElement) => {
  backButtonElement.addEventListener('click', async () => {
    await window.history.back();

    setTimeout(() => {
      // Check if the location hasn't changed, and if so, redirect to blog.html
      if (initialLocation === window.location.href) {
        window.location.href = "blog.html";
      }
    }, 100); // Delay 100 milliseconds to give the browser time to process the back navigation

  });
})  
}


// ??? DONT KNOW WHATS WRONG W THIS
export async function whiteSpaceReload() {
  const whiteBackgroundElement = document.querySelector('.js-above-everything');
  
  console.log('add')
  
  setTimeout(() => {
  // Ensure the shadowed background exists before attaching the event listener
  if (whiteBackgroundElement) {
    whiteBackgroundElement.addEventListener('click', () => {
      console.log('clicked');
      window.location.reload();
    });
  } else {
    displayError()
  }
  }, 100)
}



export async function whiteSpaceGoBack() {
  const whiteBackgroundElement = document.querySelector('.js-above-everything');
  
  console.log('add')
  
  setTimeout(() => {
  // Ensure the shadowed background exists before attaching the event listener
  if (whiteBackgroundElement) {
    whiteBackgroundElement.addEventListener('click', () => {
      console.log('clicked');
      goBack();
    });
  } else {
    displayError()
  }
  }, 100)
}

export async function goBack() {
  await window.history.back();

  setTimeout(() => {
    // Check if the location hasn't changed, and if so, redirect to blog.html
    if (initialLocation === window.location.href) {
      window.location.href = "blog.html";
    }
  }, 100); // Delay 100 milliseconds to give the browser time to process the back navigation
}