export {
  loadIssuesFromServer,
  errorPage,
  loadTotal,
  sortHandler,
  clearHandler,
  stateHandler,
  labelHandler,
  authorHandler,
  searchHandler,
  loadingOn
} from "./issues";

export { loadIssueFromServer, handleChange, deleteLabelHandler } from "./issue";

export {
  loadCommentsFromServer,
  addCommentToServer,
  deleteCommentFromServer
} from "./comments";
