export {
  loadIssuesFromServer,
  errorPage,
  loadTotal,
  sortHandler,
  clearHandler,
  stateHandler,
  labelHandler,
  authorHandler,
  searchHandler
} from "./issues";

export { loadIssueFromServer, handleChange, deleteLabelHandler } from "./issue";

export {
  loadCommentsFromServer,
  addCommentToServer,
  deleteCommentFromServer
} from "./comments";
