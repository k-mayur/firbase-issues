import * as actionTypes from "./actionTypes";
import $ from "jquery";

export const loadComments = data => {
  return {
    type: actionTypes.LOAD_COMMENTS,
    data: data
  };
};

export const errorPage = err => {
  return {
    type: actionTypes.ERROR,
    err: err
  };
};

export const addComment = data => {
  return {
    type: actionTypes.ADD_COMMENT,
    data: data
  };
};

export const deleteComment = id => {
  return {
    type: actionTypes.DELETE_COMMENT,
    payload: id
  };
};

export const addCommentToServer = (val, id) => {
  return (dispatch, getState) => {
    $.ajax({
      url: `https://api.github.com/repos/amrithakrishnan/website/issues/${id}/comments`,
      data: JSON.stringify({ body: val }),
      dataType: "json",
      type: "POST",

      success: data => {
        dispatch(addComment(data));
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.error(this.url, status, err.toString());
        dispatch(errorPage(err));
      }
    });
  };
};

export const deleteCommentFromServer = id => {
  return (dispatch, getState) => {
    $.ajax({
      url: `https://api.github.com/repos/amrithakrishnan/website/issues/comments/${id}`,
      type: "DELETE",

      success: data => {
        dispatch(deleteComment(id));
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.error(this.url, status, err.toString());
        dispatch(errorPage(err));
      }
    });
  };
};

export const loadCommentsFromServer = id => {
  return (dispatch, getState) => {
    $.ajax({
      url: `https://api.github.com/repos/amrithakrishnan/website/issues/${id}/comments`,
      dataType: "json",
      type: "GET",

      success: data => {
        dispatch(loadComments(data));
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.error(this.url, status, err.toString());
        dispatch(errorPage(err));
      }
    });
  };
};
