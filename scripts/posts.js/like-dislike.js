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
      const authorObj = postObj.author;


      if(checkLiked(user, postId)) {
        document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/like-button.png'
        likesCount--
        postObj.ratings.likes--
        authorObj.karmaPoints--
        
        user.likedPostsIds = user.likedPostsIds.filter((likedpostId) => {
          return !(likedpostId === postId)
        })
      } else {
        likeDislikeStuff(authorObj, user, postObj, 'like')
        document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/clicked-like.png'
        likesCount++
        postObj.ratings.likes++

        user.likedPostsIds.push(postId)
      }

      if(likesCount !== postObj.ratings.likes) {
        throw 'wtf';
      }

      document.querySelector(`.js-likes-count-${postId}`).innerHTML = likesCount;
      console.log(`liked: ${user.likedPostsIds}`);

      // Updatings posts data
      const postIndex = posts.findIndex((post) => post.postId === postObj.postId);
      posts[postIndex] = postObj;

      // Updating user's data
      const userIndex = users.findIndex((u) => u.userId === user.userId);
      users[userIndex] = user;

      // Updating author's data
      const authorIndex = users.findIndex((u) => u.userId === authorObj.userId);
      users[authorIndex].karmaPoints = authorObj.karmaPoints;

      // Updating changes to local storage
      localStorage.setItem('posts', JSON.stringify(posts));
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(user));
    })
  })

  
  document.querySelectorAll('.disliked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.dislikedContainerPostId;
      let dislikesCount = document.querySelector(`.js-dislikes-count-${postId}`).innerHTML;

      const postObj = posts.find((post) => post.postId === postId)
      const authorObj = postObj.author;

      if(checkDisliked(user, postId)) {
        document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/dislike-button.png'
        dislikesCount--
        postObj.ratings.dislikes--
        authorObj.karmaPoints++
        
        user.dislikedPostsIds = user.dislikedPostsIds.filter((dislikedpostId) => {
          return !(dislikedpostId === postId)
        })
      } else {
        likeDislikeStuff(authorObj, user, postObj, 'dislike')
        document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/clicked-dislike.png'
        dislikesCount++
        postObj.ratings.dislikes++

        user.dislikedPostsIds.push(postId)
      }

      if(dislikesCount !== postObj.ratings.dislikes) {
        throw 'wtf';
      }

      document.querySelector(`.js-dislikes-count-${postId}`).innerHTML = dislikesCount;
      console.log(`disliked: ${user.dislikedPostsIds}`);

      // Updatings posts data
      const postIndex = posts.findIndex((post) => post.postId === postObj.postId);
      posts[postIndex] = postObj;

      // Updating user's data
      const userIndex = users.findIndex((u) => u.userId === user.userId);
      users[userIndex] = user;

      // Updating author's data
      const authorIndex = users.findIndex((u) => u.userId === authorObj.userId);
      users[authorIndex].karmaPoints = authorObj.karmaPoints;
      
      // Updating changes to local storage
      localStorage.setItem('posts', JSON.stringify(posts));
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(user));
    })
  })
}


export function likeDislikeStuff(authorObj, user, postObj, likeORdislike) {
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

    if(clickedButton === 'like') {
      authorObj.karmaPoints += 2;
    } else {
      authorObj.karmaPoints -= 2;
    }

  } else {

    if(clickedButton === 'like') {
      authorObj.karmaPoints++;
    } else {
      authorObj.karmaPoints--;
    }

    console.log('yababadoo')
  }
}


export function checkLiked(user, postId) {
  return user.likedPostsIds.includes(postId) ? true : false
}

export function checkDisliked(user, postId) {
  return user.dislikedPostsIds.includes(postId) ? true : false
}