import { users } from "./users.js";

export class Post {
  postId;
  postTitle;
  texts;
  ratings;
  author;
  authorProfilePicture;
  
  constructor(postId, postTitle, texts, ratings, authorId) {
    const author = users.find((u) => String(u.userId) === String(authorId));

    this.postId = postId;
    this.postTitle = postTitle;
    this.texts = texts;
    this.ratings = ratings;
    this.author = author;
    this.authorProfilePicture = author.profilePicture;
  }
}

export let posts = [];

async function fetchPosts() {
  try {
    const response = await fetch('http://localhost:3000/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const postsFetched = await response.json();

    console.log(postsFetched)
    
    
    // You can now use `users` to display in your front-end
    postsFetched.forEach(postDetails => {
      postDetails.authorId = String(postDetails.authorId);
      posts.push(new Post(postDetails.postId, postDetails.postTitle, postDetails.texts, postDetails.ratings, postDetails.authorId));
    });

  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Call the function to fetch posts when the page loads
await fetchPosts();



/*
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
    authorId: 1,
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
    authorId: 1,
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
    authorId: 2,
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
*/

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

*/

