import * as actionTypes from "./actionTypes";
import $ from "jquery";

export const loadIssues = data => {
  return {
    type: actionTypes.LOAD_ISSUES,
    data: data
  };
};
export const loadT = data => {
  return {
    type: actionTypes.LOAD_COUNT,
    total: data
  };
};
export const errorPage = err => {
  return {
    type: actionTypes.ERROR,
    err: err
  };
};
export const sortHandler = sort => {
  return {
    type: actionTypes.SORT,
    payload: sort
  };
};
export const clearHandler = () => {
  return {
    type: actionTypes.CLEAR
  };
};
export const stateHandler = state => {
  return {
    type: actionTypes.STATE,
    payload: state
  };
};
export const labelHandler = label => {
  return {
    type: actionTypes.LABEL,
    payload: label
  };
};
export const searchHandler = (e, val) => {
  return {
    type: actionTypes.SEARCH,
    payload: { event: e, value: val }
  };
};
export const authorHandler = author => {
  return {
    type: actionTypes.AUTHOR,
    payload: author
  };
};
export const loadTotal = () => {
  return (dispatch, getState) => {
    const oldState = getState().issues.issues;
    console.log(oldState);
    $.ajax({
      url: `https://api.github.com/repos/freeCodeCamp/freeCodeCamp`,
      dataType: "json",
      type: "GET",

      success: data => {
        dispatch(loadT(data.open_issues_count));
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

export const loadIssuesFromServer = page => {
  return (dispatch, getState) => {
    const oldState = getState().issues.issues;
    console.log(oldState);

    $.ajax({
      url: `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?page=${page}&per_page=${
        getState().issues.per_page
      }`,
      dataType: "json",
      type: "GET",

      success: data => {
        dispatch(loadIssues(data));
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
