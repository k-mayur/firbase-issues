import React, { Component } from "react";
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

class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      err: null,
      checked: true
    };
    this.url = "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/";
  }

  loadIssueFromServer() {
    $.ajax({
      url: `${this.url}${this.props.match.params.issueId}`,
      dataType: "json",
      type: "GET",

      success: data => {
        this.setState({
          issue: data
        });
      },

      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + sessionStorage.getItem("token")
        );
      },

      error: (xhr, status, err) => {
        console.error(this.url, status, err.toString());
        this.setState({ err: err });
      }
    });
  }

  componentDidMount() {
    if (sessionStorage.getItem("isUser")) {
      this.loadIssueFromServer();
    } else {
      return <Redirect to="/" />;
    }
  }

  handleChange = check => {
    this.setState(prevState => {
      if (check) {
        prevState.issue.state = "open";
        prevState.checked = true;
        return { issue: prevState.issue };
      } else {
        prevState.issue.state = "closed";
        prevState.checked = false;
        return { issue: prevState.issue };
      }
    });
  };

  deleteLabelHandler = name => {
    this.setState(prevState => {
      const newS = prevState.issue.labels.filter(label => label.name !== name);
      prevState.issue.labels = newS;
      return { issue: prevState.issue };
    });
  };

  render() {
    if (sessionStorage.getItem("isUser")) {
      if ($.isEmptyObject(this.state.issue)) {
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
        let styles = { backgroundColor: "green" };
        if (!this.state.checked) {
          styles = {
            backgroundColor: "red"
          };
        }
        const labels = this.state.issue.labels.map(label => {
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
                onClick={() => this.deleteLabelHandler(label.name)}
              >
                <Icon fontSize="small">close</Icon>
              </span>
            </span>
          );
        });
        return (
          <div className={classes.App}>
            <div className={classes.wrap}>
              <Header val="30" />
              <div className={classes.buttons}>
                <div className={classes.statwrap}>
                  <div className={classes.stattext}>Change Status : </div>
                  <Switch
                    change={this.handleChange}
                    checked={this.state.checked}
                  />
                </div>
                <div>{labels}</div>
              </div>
              <div className={classes.head}>
                <h3>
                  {this.state.issue.title}
                  <span className={classes.num}>
                    &nbsp;#{this.state.issue.number}
                  </span>
                </h3>
                <p>
                  <span className={classes.status} style={styles}>
                    <Icon>error_outline</Icon>
                    {this.state.issue.state}
                  </span>
                  &nbsp;
                  <strong>{this.state.issue.user.login}</strong>&nbsp; opened
                  this issue{" "}
                  {moment(new Date(this.state.issue.created_at)).fromNow()} ·
                  &nbsp;{this.state.issue.comments} comment
                </p>
              </div>
              <div className={classes.bodywrap}>
                <div className={classes.pic}>
                  <img src={this.state.issue.user.avatar_url} alt="userpic" />
                </div>
                <div className={classes.body}>
                  <div className={classes.bodyhead}>
                    <strong>{this.state.issue.user.login}</strong>&nbsp; created{" "}
                    {moment(new Date(this.state.issue.created_at)).fromNow()} ·
                    last updated{" "}
                    {moment(new Date(this.state.issue.updated_at)).fromNow()}
                  </div>
                  <div className={classes.bodycontent}>
                    <ReactMarkdown
                      source={this.state.issue.body}
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

export default Issue;
