import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  issue: {},
  err: null,
  checked: true,
  loading: false
};

const changeStatus = (check, state) => {
  if (check) {
    const issue = { ...state.issue };
    issue.state = "open";
    return { ...state, issue: issue, checked: true };
  } else {
    const issue = { ...state.issue };
    issue.state = "closed";
    return { ...state, issue: issue, checked: false };
  }
};

const deleteLabel = (name, state) => {
  const issue = { ...state.issue };
  const newS = issue.labels.filter(label => label.name !== name);
  issue.labels = newS;
  return { ...state, issue: issue };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ISSUE:
      return updateObject(state, { issue: action.data });
    case actionTypes.CHECK:
      return changeStatus(action.payload, state);
    case actionTypes.LABEL_DELETE:
      return deleteLabel(action.payload, state);
    case actionTypes.ERROR:
      return updateObject(state, { err: action.err });
    default:
      return state;
  }
};

export default reducer;
