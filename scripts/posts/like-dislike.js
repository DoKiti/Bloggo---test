import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";

// default values
import { user } from "../../data/user.js";
import { displayingRatingsText } from "../utils/display-ratings-text.js";


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


export function likePost(postId) {
  const likeCountElement = document.querySelector(`.js-likes-count-${postId}`)
  let likesCount = likeCountElement.dataset.likes;

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
    authorObj.karmaPoints = checkDoubleLikesDislike(authorObj, user, postObj, 'like')
    document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/clicked-like.png'
    likesCount++
    postObj.ratings.likes++

    user.likedPostsIds.push(postId)
  }

  if(likesCount !== postObj.ratings.likes) {
    throw `${likesCount} and ${postObj.ratings.likes}`;
  }

  likeCountElement.dataset.likes = likesCount;
  likeCountElement.innerHTML = displayingRatingsText(likesCount);

  // Updatings posts data
  const postIndex = posts.findIndex((post) => post.postId === postObj.postId);
  posts[postIndex] = postObj;

  // Updating user's data
  const userIndex = users.findIndex((u) => u.userId === user.userId);
  users[userIndex] = user;

  // Updating author's data
  const authorIndex = users.findIndex((u) => u.userId === authorObj.userId);
  users[authorIndex].karmaPoints = authorObj.karmaPoints;

  
  console.log(`Updated karma points for ${authorObj.userId}: ${authorObj.karmaPoints}`);

  // Updating changes to local storage
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(user));
}



export function dislikePost(postId) {
  const dislikeCountElement = document.querySelector(`.js-dislikes-count-${postId}`);
  let dislikesCount = dislikeCountElement.dataset.dislikes;

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
    authorObj.karmaPoints = checkDoubleLikesDislike(authorObj, user, postObj, 'dislike')
    document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/clicked-dislike.png'
    dislikesCount++
    postObj.ratings.dislikes++

    user.dislikedPostsIds.push(postId)
  }

  if(dislikesCount !== postObj.ratings.dislikes) {
    throw 'wtf';
  }

  dislikeCountElement.dataset.dislikes = dislikesCount;
  dislikeCountElement.innerHTML = displayingRatingsText(dislikesCount);

  // Updatings posts data
  const postIndex = posts.findIndex((post) => post.postId === postObj.postId);
  posts[postIndex] = postObj;

  // Updating user's data
  const userIndex = users.findIndex((u) => u.userId === user.userId);
  users[userIndex] = user;

  // Updating author's data
  const authorIndex = users.findIndex((u) => u.userId === authorObj.userId);
  users[authorIndex].karmaPoints = authorObj.karmaPoints;

  console.log(`Updated karma points for ${authorObj.userId}: ${authorObj.karmaPoints}`);
  
  // Updating changes to local storage
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(user));
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






/*
export function clickedLikesDislikes() {
  document.querySelectorAll('.liked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.likedContainerPostId; 
      likeDislikeStuff('like', postId)
    })
  })

  document.querySelectorAll('.disliked-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.dislikedContainerPostId; 
      likeDislikeStuff('dislike', postId)
    })
  })
}
*/

/*
export function likeDislikeStuff(likeORdislike, postId) {
  const clickedButton = likeORdislike;
  const clickedButtonCountElement = document.querySelector(`.js-${clickedButton}s-count-${postId}`);
  let clickedButtonCount = parseInt(clickedButtonCountElement.dataset[`${clickedButton}s`]);

  const postObj = posts.find((post) => post.postId === postId);
  const authorObj = postObj.author;

  const clickedButtonImageElement = document.querySelector(`.js-${clickedButton}s-image-${postId}`);

  console.log('Processing like/dislike');

  // Check if the user already liked or disliked the post
  if (checkDisliked(user, postId) && clickedButton === 'like') {
    // User disliked, now liking
    console.log("Switching from dislike to like");

    // Remove dislike
    document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/dislike-button.png';
    postObj.ratings.dislikes--;
    authorObj.karmaPoints--; // Karma for removing dislike

    user.dislikedPostsIds = user.dislikedPostsIds.filter((dislikedPostId) => dislikedPostId !== postId);

    // Add like
    document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/clicked-like.png';
    postObj.ratings.likes++;
    authorObj.karmaPoints++; // Karma for adding like

    user.likedPostsIds.push(postId);
  } else if (checkLiked(user, postId) && clickedButton === 'dislike') {
    // User liked, now disliking
    console.log("Switching from like to dislike");

    // Remove like
    document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/like-button.png';
    postObj.ratings.likes--;
    authorObj.karmaPoints--; // Karma for removing like

    user.likedPostsIds = user.likedPostsIds.filter((likedPostId) => likedPostId !== postId);

    // Add dislike
    document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/clicked-dislike.png';
    postObj.ratings.dislikes++;
    authorObj.karmaPoints--; // Karma for adding dislike

    user.dislikedPostsIds.push(postId);
  } else {
    // New like or dislike (not switching)
    if (clickedButton === 'like') {
      console.log("User is liking the post");

      // Add like
      document.querySelector(`.js-like-image-${postId}`).src = 'images/icons/clicked-like.png';
      postObj.ratings.likes++;
      authorObj.karmaPoints++; // Karma for adding like

      user.likedPostsIds.push(postId);
    } else {
      console.log("User is disliking the post");

      // Add dislike
      document.querySelector(`.js-dislike-image-${postId}`).src = 'images/icons/clicked-dislike.png';
      postObj.ratings.dislikes++;
      authorObj.karmaPoints--; // Karma for adding dislike

      user.dislikedPostsIds.push(postId);
    }
  }

  // Update the displayed like/dislike count
  clickedButtonCountElement.dataset[`${clickedButton}s`] = postObj.ratings[`${clickedButton}s`];
  clickedButtonCountElement.innerHTML = displayingRatingsText(postObj.ratings[`${clickedButton}s`]);

  // Update the posts and user data
  const postIndex = posts.findIndex((post) => post.postId === postId);
  posts[postIndex] = postObj;

  const userIndex = users.findIndex((u) => u.userId === user.userId);
  users[userIndex] = user;

  // Update the author's data
  const authorIndex = users.findIndex((u) => u.userId === authorObj.userId);
  users[authorIndex].karmaPoints = authorObj.karmaPoints;

  console.log(`Updated karma points for author ${authorObj.userId}: ${authorObj.karmaPoints}`);

  // Save the changes to local storage
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(user));
}
*/