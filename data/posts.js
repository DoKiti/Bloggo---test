class Post {
  id;
  postTitle;
  texts;
  ratings;
  authorId;
  authorProfilePicture;
  
  constructor(postDetails) {
    this.id = postDetails.id;
    this.postTitle = postDetails.postTitle;
    this.texts = postDetails.texts;
    this.ratings = postDetails.ratings;
    this.authorId = postDetails.authorId;
    this.authorProfilePicture = postDetails.authorProfilePicture;
  }
}

export let posts = [
  new Post({
    id: "8888881",
    postTitle: "The Glacier is coming down",
    texts: "Cooking is a wonderful blend of creativity and science, where ingredients transform into delicious dishes. It’s not just about preparing meals, but about exploring different cultures and flavors. From simple breakfasts to elaborate dinners, cooking allows us to experiment, learn new techniques, and share experiences with others. Whether it’s baking a cake, grilling a steak, or crafting an intricate dish, the kitchen is a place where we can express ourselves. It’s an opportunity to nourish both our body and soul, creating lasting memories while savoring the joys of cooking together with friends and family.",
    ratings: {
      saves: 81,
      likes: 211,
      dislikes: 1,
      comments: 13
    }, 
    authorId: "1",
    authorProfilePicture: "images/profile-pictures/profile1.jpg",
  }),
  new Post({
    id: "8888882",
    postTitle: "Snow foxes are ugly af",
    texts: "Snow foxes, also known as Arctic foxes, are remarkable creatures perfectly adapted to the harsh, frozen environments of the Arctic. These small mammals have a thick, insulating coat that changes color with the seasons—pure white in winter to blend with the snow and brown or grey during summer to match the tundra’s rocky landscape. This fur not only keeps them warm but also helps them camouflage from predators and prey alike. Arctic foxes are highly resilient hunters, feeding on small mammals, birds, and fish. During the winter, they can survive in extreme cold by burrowing into the snow to keep warm or huddling with family members. They also have an extraordinary ability to find food beneath thick snow, using their keen sense of hearing to locate prey. Socially, these foxes form strong monogamous pairs that raise their pups in dens. Their role in maintaining the health of the Arctic ecosystem is vital, as they help control the populations of smaller animals and even scavenge from larger predators, ensuring the balance of life in the region. Snow foxes are a symbol of the resilience and beauty of the Arctic wilderness.",
    ratings: {
      saves: 13,
      likes: 1,
      dislikes: 117,
      comments: 218
    },
    authorId: "1",
    authorProfilePicture: "images/profile-pictures/profile1.jpg",
  })
];

export function displayAllPosts() {
  let postsHTML = "";

  posts.forEach((postDetails) => {
    postsHTML += `
            <div class="post-container-preview">
                <div class="top-of-post-preview">
                    <a href="others-profile.html">
                        <div class="profile-picture-and-author-name-preview">
                            <img class="author-profile-picture-preview" src="${postDetails.authorProfilePicture}">
                            <p class="author-name">
                                ${postDetails.authorId} 
                            </p>
                        </div>
                    </a>

                    <div class="post-setting">
                        <img class="post-setting-icon" src="images/icons/3-dots.png">
                        <div class="options-menu">
                            <a href="#" id="save-option">Save for later</a>
                            <a href="#" id="hide-option">Hide</a>
                            <a href="#" id="report-option">Report</a>
                        </div>
                    </div>
                </div>
                <a class="direct-to-post" href="post.html">
                    <div class="post-title-container-preview">
                        <p class="post-title-preview">
                            ${postDetails.postTitle}
                        </p>
                    </div>
                    <div class="main-part-of-the-post-preview">
                        <p class="post-preview-text">
                            ${postDetails.texts}
                        </p>
                    </div>
                </a>
                <div class="post-preview-ratings">
                    <a class="direct-to-post" href="post.html">
                        <div class="white-space"></div>
                    </a>
                    <div class="liked-container">
                        <img src="images/icons/like-button.png">
                        <p>
                            ${postDetails.ratings.likes}
                        </p>
                    </div>
                    <div class="disliked-container">
                        <img src="images/icons/dislike-button.png">
                        <p>
                            ${postDetails.ratings.dislikes}
                        </p>
                    </div>
                    <div class="saved-container">
                        <img src="images/icons/saved.png">
                        <p>
                            ${postDetails.ratings.saves} <!-- Fixed to 'saves' instead of 'saved' -->
                        </p>
                    </div>
                    <div class="comments-container">
                      <img src="images/icons/comments.png">
                      <p>
                            ${postDetails.ratings.comments}
                      </p>
                  </div>
                </div>
            </div>`;
  });
  document.querySelector('.js-home-section')
    .innerHTML = postsHTML;
}

displayAllPosts();  // Calling the function to display the posts


export let postss = [];

export function loadPostsFetch() {
  const promise = fetch('[BACKEND]').then((response) => {
    return response.json(); // Returns a promise
  }).then((postData) => {
    posts = postData.map((postDetails) => {
      return new Post(postDetails);
    });

    console.log('load products');
  }).catch((error) => {
    console.log('unexpected error. Please try again later')
  });
  return promise
}