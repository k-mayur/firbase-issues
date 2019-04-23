import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  comments: null,
  err: null,
  loading: false
};

const addComment = (comment, state) => {
  const comments = [...state.comments];
  const newComments = comments.concat(comment);
  return { ...state, comments: newComments };
};

const deleteComment = (id, state) => {
  const comments = [...state.comments];
  const newS = comments.filter(com => com.id !== id);
  return { ...state, comments: newS };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_COMMENTS:
      return updateObject(state, { comments: action.data });
    case actionTypes.ADD_COMMENT:
      return addComment(action.data, state);
    case actionTypes.DELETE_COMMENT:
      return deleteComment(action.payload, state);
    case actionTypes.ERROR:
      return updateObject(state, { err: action.err });
    default:
      return state;
  }
};

export default reducer;
