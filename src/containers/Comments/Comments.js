import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Comments.css";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Button from "@material-ui/core/Button";
import * as actionCreators from "../../store/actions/index";

class Comments extends Component {
  componentDidMount() {
    this.props.loadCommentsFromServer(this.props.number);
  }

  deleteCommentHandler = id => {
    this.props.deleteCommentFromServer(id);
  };

  addCommentHandler = (e, val) => {
    if (e.key === "Enter" && val.trim() !== "") {
      this.props.addCommentToServer(val, this.props.number);
      e.target.value = null;
    }
  };

  render() {
    if (this.props.comments === null) {
      if (this.props.err) {
        return (
          <div>
            <h3 className={classes.err}>{this.props.err}</h3>
            <div className={classes.icon} />
          </div>
        );
      } else {
        return <div className={classes.loader}>loading..</div>;
      }
    } else {
      const comment = this.props.comments.map((com, i) => {
        let btnDelete;
        if (com.user.login === sessionStorage.getItem("username")) {
          btnDelete = (
            <Button
              onClick={() => {
                if (window.confirm("Are you sure you wish to delete?"))
                  this.deleteCommentHandler(com.id);
              }}
            >
              Delete Comment
            </Button>
          );
        } else {
          btnDelete = <span />;
        }
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
              <div className={classes.btn}>{btnDelete}</div>
            </div>
          </div>
        );
      });
      if (this.props.comments.length === 0) {
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

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    loading: state.comments.loading,
    err: state.comments.err
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadCommentsFromServer: id =>
      dispatch(actionCreators.loadCommentsFromServer(id)),
    addCommentToServer: (value, id) =>
      dispatch(actionCreators.addCommentToServer(value, id)),
    deleteCommentFromServer: id =>
      dispatch(actionCreators.deleteCommentFromServer(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
