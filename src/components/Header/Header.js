import React from "react";
import classes from "./Header.css";
import Icon from "@material-ui/core/Icon";
import { auth } from "firebase";
import Button from "@material-ui/core/Button";
import { Redirect, withRouter } from "react-router-dom";

class Header extends React.Component {
  state = {
    err: null,
    isSignedIn: true
  };
  signOutHandler = () => {
    auth()
      .signOut()
      .then(res => {
        console.log(res);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isUser");
        this.setState({ isSignedIn: false });
      })
      .catch(err => {
        console.error(err.toString());
        this.setState({ err: err.message });
      });
  };

  render() {
    if (this.state.isSignedIn) {
      return (
        <div className={classes.header}>
          <Button onClick={this.signOutHandler}>Sign Out</Button>
          <h5>
            freeCodeCamp<span>&nbsp;/&nbsp;</span>
            <strong>freeCodeCamp</strong>
          </h5>
          <div className={classes.issue}>
            <Icon className={classes.exclamation}>error_outline</Icon>Issues{" "}
            <span className={classes.val}>{this.props.val}</span>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default withRouter(Header);
