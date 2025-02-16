class User {
  userId;
  username;
  nickname;
  profilePicture;
  postsIds;

  constructor(userDetails) {
    this.userId = userDetails.userId;
    this.username = userDetails.username;
    this.nickname = userDetails.nickname;
    this.profilePicture = userDetails.profilePicture;
    this.postsIds = userDetails.postsIds
  }
}

export let users = [
  {
    userId: '1',
    username: 'Doki_is_the_usn',
    nickname: 'Dokii',
    profilePicture: '../images/profile-pictures/profile1',
    postsIds: ["8888881", "8888882"]
  }
]