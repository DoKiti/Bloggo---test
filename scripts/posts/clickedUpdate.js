export async function updatePostAndUser(postObj, authorObj, user) {
  try {
    // Update the post ratings on the backend
    const postResponse = await fetch(`http://localhost:3000/posts/${postObj.postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ratings: postObj.ratings, content: postObj.texts, authorId: authorObj.userId }),
    });

    if (!postResponse.ok) {
      throw new Error('Failed to update post on the backend');
    }

    // Update the user data on the backend
    const userResponse = await fetch(`http://localhost:3000/users/${user.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        karmaPoints: authorObj.karmaPoints,
        likedPostsIds: user.likedPostsIds,
        dislikedPostsIds: user.dislikedPostsIds,
        savedPostsIds: user.savedPostsIds,
      }),
    });

    if (!userResponse.ok) {
      throw new Error('Failed to update user on the backend');
    }

    console.log('Post and user updated successfully!');
  } catch (error) {
    console.error('Error updating post and user:', error);
  }
}
