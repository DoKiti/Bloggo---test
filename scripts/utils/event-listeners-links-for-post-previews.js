export function addEventListenerForPostPreviewLinks() {
  document.querySelectorAll('.js-post-directory').forEach((button) => {
    button.addEventListener('click', () => {
      const postId = button.dataset.postDirectoryId;
      window.location.href = `post.html?postId=${postId}`;
    });
  });

  document.querySelectorAll('.js-user-directory').forEach((button) => {
    button.addEventListener('click', () => {
      const userId = button.dataset.userDirectoryId;
      window.location.href = `profile.html?userId=${userId}`;
    });
  });
}