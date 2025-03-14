class User {
  userId;
  username;
  nickname;
  profilePicture;
  postsIds;
  followersIds;
  followingsIds;
  karmaPoints;
  savedPostsIds;
  likedPostsIds;
  dislikedPostsIds;

  constructor(userDetails) {
    this.userId = userDetails.userId;
    this.username = userDetails.username;
    this.nickname = userDetails.nickname || this.username;
    this.profilePicture = userDetails.profilePicture || 'images/profile-pictures/default-profile.jpg';
    this.bio = userDetails.bio || '';
    this.postsIds = userDetails.postsIds || [];
    this.followersIds = userDetails.followersIds || [];
    this.followingsIds = userDetails.followingsIds || [];
    this.karmaPoints = userDetails.karmaPoints || 100;
    this.savedPostsIds = userDetails.savedPostsIds || [];
    this.likedPostsIds = userDetails.likedPostsIds || [];
    this.dislikedPostsIds = userDetails.dislikedPostsIds || [];
  }
}

/*
export let users = JSON.parse(localStorage.getItem('users')) || [
  {
    userId: '1',
    profilePicture: 'images/profile-pictures/profile1.jpg',
    username: 'doki_is_the_usn',
    nickname: 'Dokii',
    bio: "Passionate about technology, design, and creativity, as personal growth, and digital innovations. Join me on a journey of exploration and inspiration!",
    postsIds: ["1740217540043-254", "1740217626532-114"],
    followersIds: ['2', '1', '2', '1', '2', '1'],
    followingsIds: ['2', '1'],
    karmaPoints: 30063,
    savedPostsIds: ['1740217626532-114'],
    likedPostsIds: [],
    dislikedPostsIds: ['1740217626532-114']
  },   {
    userId: '2',
    profilePicture: 'images/profile-pictures/profile2.jpg',
    username: 'miraahq',
    nickname: 'MraHQ',
    bio: "Hi lol",
    postsIds: ["1740217672202-142"],
    followersIds: ['1', '3', '8', '9', '17'],
    followingsIds: ['1'],
    karmaPoints: 666,
    savedPostsIds: ['1740217626532-114'],
    likedPostsIds: ['1740217626532-114'],
    dislikedPostsIds: ['1740217626532-114']
  }, {
    userId: '3',
    profilePicture: 'images/profile-pictures/default-profile.jpg',
    username: 'yeri_x',
    nickname: 'yeri',
    bio: "Kim Yeri~",
    postsIds: [],
    followersIds: [],
    followingsIds: ['1', '2'],
    karmaPoints: 0,
    savedPostsIds: [],
    likedPostsIds: [],
    dislikedPostsIds: []
  }
].map((userDetails) => {
  return new User(userDetails)
})
*/

export let users = []

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const usersFetched = await response.json();
    
    // Log the data to verify it's fetched correctly
    console.log(usersFetched);
    
    // You can now use `users` to display in your front-end
    usersFetched.forEach(userDetails => {
      users.push(new User(userDetails));
    });

  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Call the function to fetch users when the page loads
await fetchUsers();


await console.log('users:')
console.log(users)