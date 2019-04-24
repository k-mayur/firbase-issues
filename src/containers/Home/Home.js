import React, { Component } from "react";
import { Link } from "react-router-dom";
import { initializeApp, auth } from "firebase";
import Button from "@material-ui/core/Button";
import classes from "./Home.css";

const config = {
  apiKey: "AIzaSyChVHJgUhmlqgPhuQpX7eFuhNCW9869Vd4",
  authDomain: "mayur-github-issues.firebaseapp.com",
  databaseURL: "https://mayur-github-issues.firebaseio.com",
  projectId: "mayur-github-issues",
  storageBucket: "mayur-github-issues.appspot.com",
  messagingSenderId: "1076542732241"
};
initializeApp(config);

const provider = new auth.GithubAuthProvider();
provider.addScope("repo");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isSignedIn: false,
      err: null,
      loading: false
    };
  }

  signOutHandler = () => {
    auth()
      .signOut()
      .then(res => {
        console.log(res);
        this.setState({ isSignedIn: false });

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isUser");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("repo");
      })
      .catch(err => {
        console.error(err.toString());
        this.setState({ err: err.message });
      });
  };

  signInHandler = () => {
    auth()
      .signInWithPopup(provider)
      .then(res => {
        sessionStorage.setItem("token", res.credential.accessToken);
        sessionStorage.setItem("isUser", true);
        sessionStorage.setItem("username", res.additionalUserInfo.username);
        sessionStorage.setItem("repo", "amrithakrishnan/website");
        this.setState({ isSignedIn: true });
      })
      .catch(err => {
        console.error(err.toString());
        this.setState({ err: err.message });
      });
  };

  render() {
    let homePage;
    let errorPage;
    if (this.state.err) {
      errorPage = <div className={classes.err}>{this.state.err}</div>;
    } else {
      errorPage = <div>&nbsp;</div>;
    }
    if (sessionStorage.getItem("isUser")) {
      homePage = (
        <div className={classes.link}>
          <div className={classes.name}>
            Welcome {sessionStorage.getItem("username")}
          </div>
          <Link to={`/${this.state.page}`}>Issues</Link>
          <div className={classes.button}>
            <Button onClick={this.signOutHandler}>Sign Out</Button>
          </div>
        </div>
      );
    } else {
      homePage = (
        <div className={classes.button}>
          <Button onClick={this.signInHandler}>Sign In</Button>
        </div>
      );
    }

    return (
      <div className={classes.home}>
        {errorPage}
        <h1>Github Issues API React Project</h1>
        {homePage}
      </div>
    );
  }
}

export default Home;
