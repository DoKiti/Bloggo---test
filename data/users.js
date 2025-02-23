class User {
  userId;
  username;
  nickname;
  profilePicture;
  postsIds;

  constructor(userDetails) {
    this.userId = userDetails.userId;
    this.profilePicture = userDetails.profilePicture;
    this.username = userDetails.username;
    this.nickname = userDetails.nickname;
    this.bio = userDetails.bio
    this.postsIds = userDetails.postsIds
  }
}

export let users = JSON.parse(localStorage.getItem('users')) || [
  {
    userId: '1',
    profilePicture: 'images/profile-pictures/profile1.jpg',
    username: 'doki_is_the_usn',
    nickname: 'Dokii',
    bio: "Passionate about technology, design, and creativity, I share insights on the latest trends, personal growth, and digital innovations. Join me on a journey of exploration and inspiration!",
    postsIds: ["1740217540043-254", "1740217626532-114"]
  },   {
    userId: '2',
    profilePicture: 'images/profile-pictures/profile2.jpg',
    username: 'miraahq',
    nickname: 'MraHQ',
    bio: "Hi lol",
    postsIds: ["1740217672202-142"]
  }
].map((userDetails) => {
  return new User(userDetails)
})
