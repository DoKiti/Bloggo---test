/*
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

*//*
import { users } from "./users.js";

export class Post {
  postId;
  postTitle;
  texts;
  ratings;
  author;
  authorProfilePicture;
  
  constructor(postId, postTitle, texts, ratings, authorId) {
    const author = users.find((u) => u.userId === authorId); 

    this.postId = postId;
    this.postTitle = postTitle;
    this.texts = texts;
    this.ratings = ratings;
    this.author = author;
    this.authorProfilePicture = author.ProfilePicture;
  }
}

export let posts = JSON.parse(localStorage.getItem('posts')) || [
  {
    postId: "1740217540043-254",
    postTitle: "The Glacier is coming down",
    texts: "Cooking is a wonderful blend of creativity and science, where ingredients transform into delicious dishes. It’s not just about preparing meals, but about exploring different cultures and flavors. From simple breakfasts to elaborate dinners, cooking allows us to experiment, learn new techniques, and share experiences with others. Whether it’s baking a cake, grilling a steak, or crafting an intricate dish, the kitchen is a place where we can express ourselves. It’s an opportunity to nourish both our body and soul, creating lasting memories while savoring the joys of cooking together with friends and family.",
    ratings: {
      saves: 321,
      likes: 27801,
      dislikes: 1,
      comments: 13
    }, 
    authorId: '1',
  },
  {
    postId: "1740217626532-114",
    postTitle: "Snow foxes are ugly af",
    texts: "Snow foxes, also known as Arctic foxes, are remarkable creatures perfectly adapted to the harsh, frozen environments of the Arctic. These small mammals have a thick, insulating coat that changes color with the seasons—pure white in winter to blend with the snow and brown or grey during summer to match the tundra’s rocky landscape. This fur not only keeps them warm but also helps them camouflage from predators and prey alike. Arctic foxes are highly resilient hunters, feeding on small mammals, birds, and fish. During the winter, they can survive in extreme cold by burrowing into the snow to keep warm or huddling with family members. They also have an extraordinary ability to find food beneath thick snow, using their keen sense of hearing to locate prey. Socially, these foxes form strong monogamous pairs that raise their pups in dens. Their role in maintaining the health of the Arctic ecosystem is vital, as they help control the populations of smaller animals and even scavenge from larger predators, ensuring the balance of life in the region. Snow foxes are a symbol of the resilience and beauty of the Arctic wilderness.",
    ratings: {
      saves: 13,
      likes: 2279,
      dislikes: 116,
      comments: 218
    },
    authorId: '1',
  },  {
    postId: "1740217672202-142",
    postTitle: "wtv",
    texts: "Im crying rn",
    ratings: {
      saves: 23,
      likes: 1797,
      dislikes: 1231,
      comments: 1526
    },
    authorId: '2',
  }
].map((postDetails) => {
  return new Post(
    postDetails.postId,
    postDetails.postTitle,
    postDetails.texts,
    postDetails.ratings,
    postDetails.authorId,
  );
});


/*
export let postss = [];

export function loadPostsFetch() {
  const promise = fetch('[BACKEND]').then((response) => {
    return response.json(); // Returns a promise
  }).then((postData) => {
    posts = postData.map((postDetails) => {
      return new Post(postDetails);
    });
  }).catch((error) => {
    console.log('unexpected error. Please try again later')
  });
  return promise
}

*//*
export class ReportedPost {
  accusorId;
  postId;
  reasoningCategory;
  otherInfo;
  constructor(reportedPostDetails) {
    this.accusorId = reportedPostDetails.accusorId;
    this.postId = reportedPostDetails.postId;
    this.reasoningCategory = reportedPostDetails.reasoningCategory;
    this.otherInfo = reportedPostDetails.otherInfo;
  }
}


export let reportedPosts = JSON.parse(localStorage.getItem('reportedPosts')) || [
  {
    accusorId: "2",
    postId: "1740217626532-114",
    reasoningCategory: "discrimination",
    otherInfo: ""
  },  {
    accusorId: "2",
    postId: "1740217626532-114",
    reasoningCategory: "hatefullContent",
    otherInfo: "just a yucky person she said that the cute little foxy dersevr to die like??? how could she"
  }
].map((reportedPostDetails) => {
  return new ReportedPost(reportedPostDetails)
})

*/


/*
USE bloggo;

-- Creating the Users table with JSON columns
CREATE TABLE IF NOT EXISTS users (
    userId INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    nickname VARCHAR(50),
    profilePicture VARCHAR(255),
    bio TEXT,
    postsIds JSON,          -- Store post IDs as a JSON array
    followersIds JSON,      -- Store follower IDs as a JSON array
    followingsIds JSON,     -- Store following IDs as a JSON array
    karmaPoints INT,
    savedPostsIds JSON,     -- Store saved post IDs as a JSON array
    likedPostsIds JSON,     -- Store liked post IDs as a JSON array
    dislikedPostsIds JSON   -- Store disliked post IDs as a JSON array
);

-- Inserting some sample users into the Users table
INSERT INTO users (userId, username, nickname, profilePicture, bio, postsIds, followersIds, followingsIds, karmaPoints, savedPostsIds, likedPostsIds, dislikedPostsIds)
VALUES 
(1, 'doki_is_the_usn', 'Dokii', 'images/profile-pictures/profile1.jpg', 'Passionate about technology, design, and creativity, as personal growth, and digital innovations. Join me on a journey of exploration and inspiration!',
 '["1740217540043-254", "1740217626532-114"]', '["2", "1", "2", "1", "2", "1"]', '["2", "1"]', 30063, '["1740217626532-114"]', '[]', '["1740217626532-114"]'),
(2, 'miraahq', 'MraHQ', 'images/profile-pictures/profile2.jpg', 'Hi lol', 
 '["1740217672202-142"]', '["1", "3", "8", "9", "17"]', '["1"]', 666, '["1740217626532-114"]', '["1740217626532-114"]', '["1740217626532-114"]'),
(3, 'yeri_x', 'yeri', 'images/profile-pictures/default-profile.jpg', 'Kim Yeri~', 
 '[]', '[]', '["1", "2"]', 0, '[]', '[]', '[]');

-- Creating the Posts table with JSON column
CREATE TABLE IF NOT EXISTS posts (
    postId VARCHAR(255) PRIMARY KEY,
    postTitle VARCHAR(255),
    texts TEXT,
    ratings JSON,           -- Store ratings as a JSON object
    authorId INT,           -- Foreign key to users
    FOREIGN KEY (authorId) REFERENCES users(userId)
);

-- Inserting some sample posts into the Posts table
INSERT INTO posts (postId, postTitle, texts, ratings, authorId)
VALUES 
("1740217540043-254", "The Glacier is coming down", 
 "Cooking is a wonderful blend of creativity and science, where ingredients transform into delicious dishes. It’s not just about preparing meals, but about exploring different cultures and flavors. From simple breakfasts to elaborate dinners, cooking allows us to experiment, learn new techniques, and share experiences with others. Whether it’s baking a cake, grilling a steak, or crafting an intricate dish, the kitchen is a place where we can express ourselves. It’s an opportunity to nourish both our body and soul, creating lasting memories while savoring the joys of cooking together with friends and family.", 
 '{"saves": 321, "likes": 27801, "dislikes": 1, "comments": 13}', 1),
("1740217626532-114", "Snow foxes are ugly af", 
 "Snow foxes, also known as Arctic foxes, are remarkable creatures perfectly adapted to the harsh, frozen environments of the Arctic. These small mammals have a thick, insulating coat that changes color with the seasons—pure white in winter to blend with the snow and brown or grey during summer to match the tundra’s rocky landscape. This fur not only keeps them warm but also helps them camouflage from predators and prey alike. Arctic foxes are highly resilient hunters, feeding on small mammals, birds, and fish. During the winter, they can survive in extreme cold by burrowing into the snow to keep warm or huddling with family members. They also have an extraordinary ability to find food beneath thick snow, using their keen sense of hearing to locate prey. Socially, these foxes form strong monogamous pairs that raise their pups in dens. Their role in maintaining the health of the Arctic ecosystem is vital, as they help control the populations of smaller animals and even scavenge from larger predators, ensuring the balance of life in the region. Snow foxes are a symbol of the resilience and beauty of the Arctic wilderness.", 
 '{"saves": 13, "likes": 2279, "dislikes": 116, "comments": 218}', 1),
("1740217672202-142", "wtv", 
 "Im crying rn", 
 '{"saves": 23, "likes": 1797, "dislikes": 1231, "comments": 1526}', 2);

-- Creating the Reported Posts table with JSON column
CREATE TABLE IF NOT EXISTS reported_posts (
    accusorId INT,
    postId VARCHAR(255),
    reasoningCategory VARCHAR(255),
    otherInfo TEXT,
    FOREIGN KEY (accusorId) REFERENCES users(userId),
    FOREIGN KEY (postId) REFERENCES posts(postId)
);

-- Inserting some sample reported posts
INSERT INTO reported_posts (accusorId, postId, reasoningCategory, otherInfo)
VALUES
(2, "1740217626532-114", "discrimination", ""),
(2, "1740217626532-114", "hatefullContent", "just a yucky person she said that the cute little foxy dersevr to die like??? how could she");


*/