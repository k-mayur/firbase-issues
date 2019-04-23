import * as actionTypes from "./actionTypes";
import $ from "jquery";

export const loadIssue = data => {
  return {
    type: actionTypes.LOAD_ISSUE,
    data: data
  };
};

export const handleChange = check => {
  return {
    type: actionTypes.CHECK,
    payload: check
  };
};

export const deleteLabelHandler = name => {
  return {
    type: actionTypes.LABEL_DELETE,
    payload: name
  };
};

export const errorPage = err => {
  return {
    type: actionTypes.ERROR,
    err: err
  };
};

export const loadIssueFromServer = id => {
  return (dispatch, getState) => {
    $.ajax({
      url: `https://api.github.com/repos/amrithakrishnan/website/issues/${id}`,
      dataType: "json",
      type: "GET",

      success: data => {
        dispatch(loadIssue(data));
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.error(this.url, status, err.toString()); // eslint-disable-line
        dispatch(errorPage(err));
      }
    });
  };
};
