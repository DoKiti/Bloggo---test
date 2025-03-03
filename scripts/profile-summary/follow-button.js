import {users} from "../../data/users.js";

export function checkFollowButton(ProfileSummaryUserId) {
  const followButtonElement = document.querySelector('.js-follow-button')
  if(users[0].followingsIds.includes(ProfileSummaryUserId)) {
    followButtonElement.innerHTML = 'Followed'
    followButtonElement.classList.add('followed-button')
  }
}

export function followButton(ProfileSummaryUserId) {
  const followButtonElement = document.querySelector('.js-follow-button')

  followButtonElement.addEventListener('click', (button) => {

    let currentButtonText = followButtonElement.innerHTML.trim()
    
    if (currentButtonText === 'Follow') {
      // User clicks Follow
      followButtonElement.innerHTML = 'Followed';
      followButtonElement.classList.add('followed-button');
      console.log(`Followed ${ProfileSummaryUserId}`);
      
      // Add ProfileSummaryUserId to users[0].followingsIds if it's not already in there
      if (!users[0].followingsIds.includes(ProfileSummaryUserId)) {
        users[0].followingsIds.push(ProfileSummaryUserId);
      }

    } else {
      // User clicks Unfollow
      followButtonElement.innerHTML = 'Follow';
      followButtonElement.classList.remove('followed-button');
      console.log(`Unfollowed ${ProfileSummaryUserId}`);
      
      // Remove ProfileSummaryUserId from users[0].followingsIds
      users[0].followingsIds = users[0].followingsIds.filter(id => id !== ProfileSummaryUserId);
    }

    
    // Save the updated followingsIds to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    })
}