export class SavedPostId {
  postId;

  constructor(savedPostsDetails) {
    this.postId = savedPostsDetails.postId
  }
}


export const savedPostsIds = JSON.parse(localStorage.getItem('savedPosts')) || [
  {
    postId: '1740217626532-114'
  }
].map((savedPostsDetails) => {
  return new SavedPostId(savedPostsDetails);
});
