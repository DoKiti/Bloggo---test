export class SavedPostId {
  userId;
  postId;

  constructor(savedPostsDetails) {
    this.userId = savedPostsDetails.userId
    this.postId = savedPostsDetails.postId
  }
}


export const savedPostsIds = JSON.parse(localStorage.getItem('savedPosts')) || [
  {
    userId: '1',
    postId: '1740217626532-114'
  }
].map((savedPostsDetails) => {
  return new SavedPostId(savedPostsDetails);
});
