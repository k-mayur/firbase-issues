import React, { Component } from "react";
import $ from "jquery";
import classes from "./Comments.css";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Button from "@material-ui/core/Button";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      err: null,
      loading: false
    };
    this.url = "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/";
  }

  loadCommentsFromServer() {
    $.ajax({
      url: `${this.url}${this.props.number}/comments`,
      dataType: "json",
      type: "GET",

      success: data => {
        this.setState({
          comments: data
        });
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.error(this.url, status, err.toString()); // eslint-disable-line
        this.setState({ err: err });
      }
    });
  }

  addCommentToServer(val) {
    $.ajax({
      url: `${this.url}${this.props.number}/comments`,
      data: JSON.stringify({ body: val }),
      dataType: "json",
      type: "POST",

      success: data => {
        this.setState(prevState => {
          prevState.comments.push(data);
          return { comments: prevState.comments };
        });
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.log("error");
        console.error(this.url, status, err.toString());
        this.setState({ err: err });
      }
    });
  }

  deleteCommentFromServer(val) {
    $.ajax({
      url: `${this.url}comments/${val}`,
      type: "DELETE",

      success: data => {
        this.setState(prevState => {
          const newS = prevState.comments.filter(com => com.id !== val);
          return { comments: newS };
        });
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.log("error");
        console.error(this.url, status, err.toString());
        this.setState({ err: err });
      }
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  deleteCommentHandler = id => {
    this.deleteCommentFromServer(id);
  };

  addCommentHandler = (e, val) => {
    if (e.key === "Enter" && val.trim() !== "") {
      this.addCommentToServer(val);
      e.target.value = null;
    }
  };

  render() {
    if (this.state.comments === null) {
      if (this.state.err) {
        return (
          <div>
            <h3 className={classes.err}>{this.state.err}</h3>
            <div className={classes.icon} />
          </div>
        );
      } else {
        return <div className={classes.loader}>loading..</div>;
      }
    } else {
      const comment = this.state.comments.map((com, i) => {
        return (
          <div className={classes.bodywrap} key={i}>
            <div className={classes.pic}>
              <img src={com.user.avatar_url} alt="userpic" />
            </div>
            <div className={classes.body}>
              <div className={classes.bodyhead}>
                <strong>{com.user.login}</strong>&nbsp; commented{" "}
                {moment(new Date(com.created_at)).fromNow()} · last updated{" "}
                {moment(new Date(com.updated_at)).fromNow()}
              </div>
              <div className={classes.bodycontent}>
                <ReactMarkdown
                  source={com.body}
                  escapeHtml={false}
                  skipHtml={false}
                />
              </div>
              <div className={classes.btn}>
                <Button
                  onClick={() => {
                    if (window.confirm("Are you sure you wish to delete?"))
                      this.deleteCommentHandler(com.id);
                  }}
                >
                  Delete Comment
                </Button>
              </div>
            </div>
          </div>
        );
      });
      if (this.state.comments.length === 0) {
        return (
          <div className={classes.bodywrap1}>
            <div className={classes.none}>NO COMMENTS</div>
            <div className={classes.add}>
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={e => this.addCommentHandler(e, e.target.value)}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className={classes.wrap}>
            {comment}
            <div className={classes.add}>
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={e => this.addCommentHandler(e, e.target.value)}
              />
            </div>
          </div>
        );
      }
    }
  }
}

export default Comments;
