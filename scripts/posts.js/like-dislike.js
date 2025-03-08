import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";

// default values
import { user } from "../../data/user.js";

export function clickedLikesDislikes() {
  document.querySelectorAll('.liked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.likedContainerPostId;

      if(checkLiked(user, postId)) {
        document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/like-button.png'
        user.likedPostsIds = user.likedPostsIds.filter((likedpostId) => {
          return !(likedpostId === postId)
        })
      } else {
        document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/clicked-like.png'
        user.likedPostsIds.push(postId)
      }

      console.log(user.likedPostsIds)
      localStorage.setItem('user', JSON.stringify(user))
    })
  })
}

export function checkLiked(user, postId) {
  return user.likedPostsIds.includes(postId) ? true : false
}