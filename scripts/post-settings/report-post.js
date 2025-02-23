import {ReportedPost, reportedPosts} from "../../data/reports.js";
import { backButtonDirectory } from "../utils/back-button-href.js";
import { getPostIdFromUrl } from "../utils/gettings-posts-and-users.js";


backButtonDirectory();

const accusorId = '1';

const postId = getPostIdFromUrl();

// Get the input elements
const reasoningCategoriesElement = document.getElementById('reasoningCategories');
const optionalReasoningContextElment = document.getElementById('reasoningContexts');
const createPostButton = document.getElementById('reportPostButton');

// Function to enable/disable button
function toggleReportPostButton() {
  const reasoningCategory = reasoningCategoriesElement.value.trim();
  createPostButton.disabled = reasoningCategory === '';
}

// Add event listeners for both title and content
reasoningCategoriesElement.addEventListener('click', toggleReportPostButton);



// Handle post creation
document.getElementById('reportPostButton').addEventListener('click', function() {
  const reasoningCategory = reasoningCategoriesElement.value.trim();
  let optionalReasoningContext = optionalReasoningContextElment.value.trim();
  if(!optionalReasoningContext) {
    optionalReasoningContext = "";
  }

  const reportedPostDetails = {
    accusorId,
    postId,
    reasoningCategory,
    otherInfo: optionalReasoningContext
  };

  reportedPosts.unshift(new ReportedPost(reportedPostDetails));

  localStorage.setItem('reportedPosts', JSON.stringify(reportedPosts));

  window.history.back()
});