import {users} from '../../data/users.js';


export function renderUserFollowings(ProfileSummaryUser) {
  document.querySelector('.js-user-followings-followers-texts-container') 
    .innerHTML = `
      <p class="user-followings-followers-texts">
        ${ProfileSummaryUser.nickname}'s Followings
      </p>
    `

  let followingsHTML = '';

  ProfileSummaryUser.followingsIds.forEach((followingsId) => {
    // Check if the user exists
    const followingsUserObj = users.find((u) => u.userId === followingsId);
    
    if (!followingsUserObj) {
      console.error(`User with userId ${followingsId} not found`);
      return; // Skip to the next iteration if the user doesn't exist
    }

    followingsHTML += `
                  <a href="profile.html?userId=${followingsUserObj.userId}" class="user-following-follower-directory">
                    <div class="user-following-follower-container">
                      <img class="user-following-follower-profile-picture" src="${followingsUserObj.profilePicture}">
                      <div class="user-following-follower-username-nickname-bio-container">
                        <p class="user-following-follower-nickname">
                          ${followingsUserObj.nickname}
                        </p>
                        <p class="user-following-follower-username">
                          @${followingsUserObj.username}
                        </p>
                        <p class="user-following-follower-bio">
                          ${followingsUserObj.bio}
                        </p>
                      </div>
                    </div>
                  </a>
                `  
  });

  document.querySelector(".js-user-followings-followers-container")
    .innerHTML = followingsHTML
}