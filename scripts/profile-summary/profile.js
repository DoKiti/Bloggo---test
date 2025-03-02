export function displayUserDetails(user) {
  document.querySelector(".js-profile-container")
    .innerHTML = `          
          <div class="profile-picture-and-other-information">
            <div class="profile-picture-container">
                <img class="js-profile-picture profile-picture" src="${user.profilePicture}">
            </div>
            <div class="other-information-container">
              <p class="profile-nickname">
                ${user.nickname}
              </p>
              <p class="profile-username">
                @${user.username}
              </p>
              <p class="profile-bio">
                ${user.bio}
              </p>
            </div>
          </div>

          <div class="profile-followers-following-likes-container">
            <a class="user-followers-count" data-user-followers="${user.userId}">
              ${user.checkFollowersLength()} Followers
            </a>
            <a class="user-followings-count" data-user-followings="${user.userId}">
              ${user.checkFollowingsLength()} Followings
            </a>
            <a class="user-likes-count" data-user-likes="${user.userId}">
              ${user.likes} Likes
            </a>
          </div>
          `;
}
