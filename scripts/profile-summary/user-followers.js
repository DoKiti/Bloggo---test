import {users} from '../../data/users.js';


export function renderUserFollowers(ProfileSummaryUser) {
  document.querySelector('.js-user-followings-followers-texts-container') 
    .innerHTML = `
      <p class="user-followings-followers-texts">
        ${ProfileSummaryUser.nickname}'s Followers
      </p>
    `

  let followersHTML = '';

  ProfileSummaryUser.followersIds.forEach((followersId) => {
    // Check if the user exists
    const followerUserObj = users.find((u) => u.userId === followersId);
    
    if (!followerUserObj) {
      console.error(`User with userId ${followersId} not found`);
      return; // Skip to the next iteration if the user doesn't exist
    }

    followersHTML += `
                  <a href="profile.html?userId=${followerUserObj.userId}" class="user-following-follower-directory">
                    <div class="user-following-follower-container">
                      <img class="user-following-follower-profile-picture" src="${followerUserObj.profilePicture}">
                      <div class="user-following-follower-username-nickname-bio-container">
                        <p class="user-following-follower-nickname">
                          ${followerUserObj.nickname}
                        </p>
                        <p class="user-following-follower-username">
                          @${followerUserObj.username}
                        </p>
                        <p class="user-following-follower-bio">
                          ${followerUserObj.bio}
                        </p>
                      </div>
                    </div>
                  </a>
                `  
  });

  document.querySelector(".js-user-followings-followers-container")
    .innerHTML = followersHTML
}