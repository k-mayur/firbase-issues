import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  issues: [],
  newIssues: null,
  err: "",
  loading: false,
  total: 0,
  page: 1,
  token: null,
  per_page: 50
};

const sortHandle = (sort, state) => {
  let newTemp = [];
  let issues = [...state.issues];
  if (sort === "newest") {
    newTemp = issues.sort((b, a) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  } else if (sort === "oldest") {
    newTemp = issues.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  } else if (sort === "recently updated") {
    newTemp = issues.sort((b, a) => {
      return (
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
    });
  } else if (sort === "least recently updated") {
    newTemp = issues.sort((a, b) => {
      return (
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
    });
  }
  return { ...state, newIssues: newTemp };
};

const stateHandle = (st, state) => {
  const issues = [...state.issues];
  const newTemp = issues.filter(issue => issue.state === st);
  return { ...state, newIssues: newTemp };
};

const labelHandle = (label, state) => {
  const issues = [...state.issues];
  const newTemp = issues.filter(issue => {
    let newIssue = issue.labels.filter(lab => lab.name === label);
    if (newIssue.length > 0) {
      return true;
    } else {
      return false;
    }
  });
  return { ...state, newIssues: newTemp };
};

const authorHandle = (author, state) => {
  const issues = [...state.issues];
  const newTemp = issues.filter(issue => issue.user.login === author);
  return { ...state, newIssues: newTemp };
};

const searchHandle = (payload, state) => {
  if (
    payload.event.key === "Enter" &&
    payload.event.target.value.trim() !== ""
  ) {
    const issues = [...state.issues];
    const newTemp = issues.filter(
      issue =>
        issue.title.toLowerCase().includes(payload.value.toLowerCase()) === true
    );
    payload.event.target.value = null;
    return { ...state, newIssues: newTemp };
  } else {
    return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ISSUES:
      return updateObject(state, { issues: action.data });
    case actionTypes.LOAD_COUNT:
      return updateObject(state, { total: action.total });
    case actionTypes.SORT:
      return sortHandle(action.payload, state);
    case actionTypes.STATE:
      return stateHandle(action.payload, state);
    case actionTypes.CLEAR:
      return updateObject(state, { newIssues: null });
    case actionTypes.LABEL:
      return labelHandle(action.payload, state);
    case actionTypes.AUTHOR:
      return authorHandle(action.payload, state);
    case actionTypes.SEARCH:
      return searchHandle(action.payload, state);
    case actionTypes.ERROR:
      return updateObject(state, { err: action.err });
    default:
      return state;
  }
};

export default reducer;
