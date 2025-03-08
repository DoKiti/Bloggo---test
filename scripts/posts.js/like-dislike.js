import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";

// default values
import { user } from "../../data/user.js";

export function clickedLikesDislikes() {

  document.querySelectorAll('.liked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.likedContainerPostId;
      let likesCount = document.querySelector(`.js-likes-count-${postId}`).innerHTML;

      const postObj = posts.find((post) => post.postId === postId)

      if(checkLiked(user, postId)) {
        document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/like-button.png'
        likesCount--
        postObj.ratings.likes--
        
        user.likedPostsIds = user.likedPostsIds.filter((likedpostId) => {
          return !(likedpostId === postId)
        })
      } else {
        likeDislikeStuff(user, postObj, 'like')
        document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/clicked-like.png'
        likesCount++
        postObj.ratings.likes++

        user.likedPostsIds.push(postId)
      }

      document.querySelector(`.js-likes-count-${postId}`).innerHTML = likesCount;
      console.log(`liked: ${user.likedPostsIds}`);

      const postIndex = posts.findIndex((post) => post.postId === postObj.postId);

      posts[postIndex] = postObj;

      localStorage.setItem('posts', JSON.stringify(posts));
      localStorage.setItem('user', JSON.stringify(user));
    })
  })

  
  document.querySelectorAll('.disliked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.dislikedContainerPostId;
      let dislikesCount = document.querySelector(`.js-dislikes-count-${postId}`).innerHTML;

      const postObj = posts.find((post) => post.postId === postId)

      if(checkDisliked(user, postId)) {
        document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/dislike-button.png'
        dislikesCount--
        postObj.ratings.dislikes--
        
        user.dislikedPostsIds = user.dislikedPostsIds.filter((dislikedpostId) => {
          return !(dislikedpostId === postId)
        })
      } else {
        likeDislikeStuff(user, postObj, 'dislike')
        document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/clicked-dislike.png'
        dislikesCount++
        postObj.ratings.dislikes++

        user.dislikedPostsIds.push(postId)
      }

      document.querySelector(`.js-dislikes-count-${postId}`).innerHTML = dislikesCount;
      console.log(`disliked: ${user.dislikedPostsIds}`);

      const postIndex = posts.findIndex((post) => post.postId === postObj.postId);

      posts[postIndex] = postObj;

      localStorage.setItem('posts', JSON.stringify(posts));
      localStorage.setItem('user', JSON.stringify(user));
    })
  })
}


export function likeDislikeStuff(user, postObj, likeORdislike) {
  // NOTE: Everything here will get changed immediately since obj are just references
  
  const clickedButton = likeORdislike;
  const nonClickedButton = clickedButton === 'like' ? 'dislike' : 'like'


  if(user[`${nonClickedButton}dPostsIds`].includes(postObj.postId)) {
    document.querySelector(`.js-${nonClickedButton}-image-${postObj.postId}`).src = `images/icons/${nonClickedButton}-button.png`

    postObj.ratings[`${nonClickedButton}s`]--

    document.querySelector(`.js-${nonClickedButton}s-count-${postObj.postId}`).textContent = postObj.ratings[`${nonClickedButton}s`]
    user[`${nonClickedButton}dPostsIds`] = user[`${nonClickedButton}dPostsIds`].filter((nonClickedButtonPostId) => {
      return !(nonClickedButtonPostId === postObj.postId)
    })
  } else {
    console.log('yababadoo')
  }
}


export function checkLiked(user, postId) {
  return user.likedPostsIds.includes(postId) ? true : false
}

export function checkDisliked(user, postId) {
  return user.dislikedPostsIds.includes(postId) ? true : false
}