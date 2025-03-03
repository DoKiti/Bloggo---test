class User {
  userId;
  username;
  nickname;
  profilePicture;
  postsIds;
  followersIds;
  followingsIds;
  likes;
  savedPostsIds;

  constructor(userDetails) {
    this.userId = userDetails.userId;
    this.username = userDetails.username;
    this.nickname = userDetails.nickname || this.username;
    this.profilePicture = userDetails.profilePicture || 'images/profile-pictures/default-profile.jpg';
    this.bio = userDetails.bio || '';
    this.postsIds = userDetails.postsIds || [];
    this.followersIds = userDetails.followersIds || [];
    this.followingsIds = userDetails.followingsIds || [];
    this.likes = userDetails.likes || 0;
    this.savedPostsIds = userDetails.savedPostsIds
  }
}

export let users = JSON.parse(localStorage.getItem('users')) || [
  {
    userId: '1',
    profilePicture: 'images/profile-pictures/profile1.jpg',
    username: 'doki_is_the_usn',
    nickname: 'Dokii',
    bio: "Passionate about technology, design, and creativity, as personal growth, and digital innovations. Join me on a journey of exploration and inspiration!",
    postsIds: ["1740217540043-254", "1740217626532-114"],
    followersIds: ['2', '8'],
    followingsIds: ['2'],
    likes: 37,
    savedPostsIds: ['1740217626532-114']
  },   {
    userId: '2',
    profilePicture: 'images/profile-pictures/profile2.jpg',
    username: 'miraahq',
    nickname: 'MraHQ',
    bio: "Hi lol",
    postsIds: ["1740217672202-142"],
    followersIds: ['1', '3', '8', '9', '17'],
    followingsIds: ['1'],
    likes: 12,
    savedPostsIds: ['1740217626532-114']
  }
].map((userDetails) => {
  return new User(userDetails)
})

