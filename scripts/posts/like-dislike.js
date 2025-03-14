import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";
import { displayingRatingsText } from "../utils/display-ratings-text.js";
import { updatePostAndUser } from "./clickedUpdate.js";

// default values
import { user } from "../../data/user.js";

export function clickedLikesDislikes() {
  document.querySelectorAll('.liked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.likedContainerPostId; 
      likePost(postId)
      console.log(`liked: ${postId}`)
    })
  })
  
  document.querySelectorAll('.disliked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.dislikedContainerPostId;
      dislikePost(postId)
      console.log(`disliked: ${postId}`)
    })
  })
}

export function checkLiked(user, postId) {
  return user.likedPostsIds.includes(postId) ? true : false
}

export function checkDisliked(user, postId) {
  return user.dislikedPostsIds.includes(postId) ? true : false
}

export async function likePost(postId) {
  const likeCountElement = document.querySelector(`.js-likes-count-${postId}`);
  let likesCount = likeCountElement.dataset.likes;

  const postObj = posts.find((post) => post.postId === postId);
  const authorObj = postObj.author;

  if (checkLiked(user, postId)) {
    // User has already liked the post, so un-like
    document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/like-button.png';
    likesCount--;
    postObj.ratings.likes--;
    authorObj.karmaPoints--;

    user.likedPostsIds = user.likedPostsIds.filter((likedPostId) => likedPostId !== postId);
  } else {
    // User likes the post
    authorObj.karmaPoints = checkDoubleLikesDislike(authorObj, user, postObj, 'like');
    document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/clicked-like.png';
    likesCount++;
    postObj.ratings.likes++;

    user.likedPostsIds.push(postId);
  }

  likeCountElement.dataset.likes = likesCount;
  likeCountElement.innerHTML = displayingRatingsText(likesCount);

  // Update post and user in the backend
  await updatePostAndUser(postObj, authorObj, user);
}

export async function dislikePost(postId) {
  const dislikeCountElement = document.querySelector(`.js-dislikes-count-${postId}`);
  let dislikesCount = dislikeCountElement.dataset.dislikes;

  const postObj = posts.find((post) => post.postId === postId);
  const authorObj = postObj.author;

  if (checkDisliked(user, postId)) {
    // User has already disliked the post, so remove dislike
    document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/dislike-button.png';
    dislikesCount--;
    postObj.ratings.dislikes--;
    authorObj.karmaPoints++;

    user.dislikedPostsIds = user.dislikedPostsIds.filter((dislikedPostId) => dislikedPostId !== postId);
  } else {
    // User dislikes the post
    authorObj.karmaPoints = checkDoubleLikesDislike(authorObj, user, postObj, 'dislike');
    document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/clicked-dislike.png';
    dislikesCount++;
    postObj.ratings.dislikes++;

    user.dislikedPostsIds.push(postId);
  }

  dislikeCountElement.dataset.dislikes = dislikesCount;
  dislikeCountElement.innerHTML = displayingRatingsText(dislikesCount);

  // Update post and user in the backend
  await updatePostAndUser(postObj, authorObj, user);
}

export function checkDoubleLikesDislike(authorObj, user, postObj, likeORdislike) {
  // NOTE: Everything here will get changed immediately since obj are just references
  
  const clickedButton = likeORdislike;
  const nonClickedButton = clickedButton === 'like' ? 'dislike' : 'like'
  const nonClickedButtonCountElement = document.querySelector(`.js-${nonClickedButton}s-count-${postObj.postId}`)


  if(user[`${nonClickedButton}dPostsIds`].includes(postObj.postId)) {
    document.querySelector(`.js-${nonClickedButton}-image-${postObj.postId}`).src = `images/icons/${nonClickedButton}-button.png`

    postObj.ratings[`${nonClickedButton}s`]--

    nonClickedButtonCountElement.dataset[`${nonClickedButton}s`] = postObj.ratings[`${nonClickedButton}s`]
    nonClickedButtonCountElement.innerHTML = displayingRatingsText(postObj.ratings[`${nonClickedButton}s`])
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
  }

  return authorObj.karmaPoints;
}
