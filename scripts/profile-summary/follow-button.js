export function followButton(userId) {
  const followButtonElement = document.querySelector('.js-follow-button')

  followButtonElement.addEventListener('click', () => {
    let currentButtonText = followButtonElement.innerHTML.trim()
    if(currentButtonText === 'Follow') {
      followButtonElement.innerHTML = 'Followed'
      followButtonElement.classList.add('followed-button')
      console.log(`Followed ${userId}`)
    } else {
      followButtonElement.innerHTML = 'Follow'
      followButtonElement.classList.remove('followed-button')
      console.log(`Unfollow ${userId}`)
    }
    })
}