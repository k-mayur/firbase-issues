import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import classes from "./Issue.css";
import Comments from "../Comments/Comments";
import Header from "../../components/Header/Header";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Icon from "@material-ui/core/Icon";
import Switch from "../../components/Switch/Switch";
import tinycolor from "tinycolor2";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";

class Issue extends Component {
  componentDidMount() {
    if (sessionStorage.getItem("isUser")) {
      this.props.loadingOn();
      this.loadIssueHandler(this.props.match.params.issueId);
    } else {
      return <Redirect to="/" />;
    }
  }

  loadIssueHandler = id => {
    this.props.loadIssue(id);
  };

  render() {
    if (sessionStorage.getItem("isUser")) {
      if ($.isEmptyObject(this.props.issue)) {
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
        let styles = { backgroundColor: "green" };
        if (!this.props.checked) {
          styles = {
            backgroundColor: "red"
          };
        }
        const labels = this.props.issue.labels.map(label => {
          let color = `#${label.color}`;
          let colorText;
          if (tinycolor(color).isLight()) {
            colorText = "black";
          } else {
            colorText = "white";
          }
          let styles = { backgroundColor: color, color: colorText };
          return (
            <span className={classes.label} key={label.id} style={styles}>
              {label.name} &nbsp;
              <span
                className={classes.close}
                onClick={() => this.props.deleteLabelHandler(label.name)}
              >
                <Icon fontSize="small">close</Icon>
              </span>
            </span>
          );
        });
        return (
          <div className={classes.App}>
            <div className={classes.wrap}>
              <Header val={this.props.total} />
              <div className={classes.buttons}>
                <div className={classes.statwrap}>
                  <div className={classes.stattext}>Change Status : </div>
                  <Switch
                    change={this.props.handleChange}
                    checked={this.props.checked}
                  />
                </div>
                <div>{labels}</div>
              </div>
              <div className={classes.head}>
                <h3>
                  {this.props.issue.title}
                  <span className={classes.num}>
                    &nbsp;#{this.props.issue.number}
                  </span>
                </h3>
                <p>
                  <span className={classes.status} style={styles}>
                    <Icon>error_outline</Icon>
                    {this.props.issue.state}
                  </span>
                  &nbsp;
                  <strong>{this.props.issue.user.login}</strong>&nbsp; opened
                  this issue{" "}
                  {moment(new Date(this.props.issue.created_at)).fromNow()} ·
                  &nbsp;{this.props.issue.comments} comment
                </p>
              </div>
              <div className={classes.bodywrap}>
                <div className={classes.pic}>
                  <img src={this.props.issue.user.avatar_url} alt="userpic" />
                </div>
                <div className={classes.body}>
                  <div className={classes.bodyhead}>
                    <strong>{this.props.issue.user.login}</strong>&nbsp; created{" "}
                    {moment(new Date(this.props.issue.created_at)).fromNow()} ·
                    last updated{" "}
                    {moment(new Date(this.props.issue.updated_at)).fromNow()}
                  </div>
                  <div className={classes.bodycontent}>
                    <ReactMarkdown
                      source={this.props.issue.body}
                      escapeHtml={false}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Comments number={this.props.match.params.issueId} />
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    issue: state.issue.issue,
    loading: state.issue.loading,
    err: state.issue.err,
    checked: state.issue.checked,
    total: state.issues.total
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadIssue: id => dispatch(actionCreators.loadIssueFromServer(id)),
    handleChange: check => dispatch(actionCreators.handleChange(check)),
    deleteLabelHandler: name =>
      dispatch(actionCreators.deleteLabelHandler(name)),
    loadingOn: () => dispatch(actionCreators.loadingOn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue);
