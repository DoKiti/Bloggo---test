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