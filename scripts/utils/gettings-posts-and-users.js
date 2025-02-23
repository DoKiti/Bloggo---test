// Function to get the value of a URL parameter
export function getPostIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('postId'); // Get 'postId' parameter value from the URL
}