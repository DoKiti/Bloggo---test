export function displayError() {
  document.querySelector('.js-main-section') 
    .innerHTML = 
    `
    <div class="error-div">
      <p class="error-text">
        Sorry but it seems like an Error has occured!
      </p>
      <a class="error-button-href" href="blog.html">
        <button class="error-button">Restart by clicking this button!</button>
      </a>
    </div>
    `
}