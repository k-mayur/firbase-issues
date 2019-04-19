import React, { Component } from "react";
import classes from "./Issues.css";
import Header from "../../components/Header/Header";
import ListIssue from "../../components/ListIssue/ListIssue";
import IssueHeader from "../../components/IssueHeader/IssueHeader";
import ReactAux from "../../hoc/ReactAux";
import ReactPaginate from "react-paginate";
import $ from "jquery";
import { Redirect, withRouter } from "react-router-dom";

class IssuesGit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      newIssues: null,
      err: "",
      loading: false,
      total: 0,
      page: 1,
      token: null
    };
    this.url =
      "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?page=";
  }

  loadIssuesFromServer(page) {
    $.ajax({
      url: `${this.url}${page}&per_page=5`,
      dataType: "json",
      type: "GET",

      success: data => {
        this.setState(
          prevState => {
            return {
              issues: data,
              loading: false
            };
          },
          () => {
            this.props.history.push(`/${page}`);
          }
        );
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
  getIssuesCountFromServer() {
    $.ajax({
      url: `https://api.github.com/repos/freeCodeCamp/freeCodeCamp`,
      dataType: "json",
      type: "GET",

      success: data => {
        this.setState({
          total: data.open_issues_count,
          loading: false
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

  componentDidMount() {
    if (sessionStorage.getItem("isUser")) {
      this.setState({ token: this.props.location.state });
      this.loadIssuesFromServer(this.props.match.params.page);
      this.getIssuesCountFromServer();
    } else {
      return <Redirect to="/" />;
    }
  }

  handlePageClick = data => {
    this.setState(
      prevState => {
        return { page: data.selected + 1, loading: true };
      },
      () => {
        this.loadIssuesFromServer(this.state.page);
      }
    );
  };

  clearHandler = () => {
    this.setState({ newIssues: null });
  };

  sortClickHandler = sort => {
    this.setState(prevState => {
      let newTemp = [];
      if (sort === "newest") {
        newTemp = prevState.issues.sort((b, a) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });
      } else if (sort === "oldest") {
        newTemp = prevState.issues.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });
      } else if (sort === "recently updated") {
        newTemp = prevState.issues.sort((b, a) => {
          return (
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
          );
        });
      } else if (sort === "least recently updated") {
        newTemp = prevState.issues.sort((a, b) => {
          return (
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
          );
        });
      }
      return { newIssues: newTemp };
    });
  };

  searchHandler = (e, value) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      this.setState(prevState => {
        const newTemp = prevState.issues.filter(
          issue =>
            issue.title.toLowerCase().includes(value.toLowerCase()) === true
        );
        return { newIssues: newTemp };
      });
      e.target.value = null;
    }
  };

  authorHandler = author => {
    this.setState(prevState => {
      const newTemp = prevState.issues.filter(
        issue => issue.user.login === author
      );
      return { newIssues: newTemp };
    });
  };

  labelHandler = label => {
    this.setState(prevState => {
      const newTemp = prevState.issues.filter(issue => {
        let newIssue = issue.labels.filter(lab => lab.name === label);
        if (newIssue.length > 0) {
          return true;
        } else {
          return false;
        }
      });
      return { newIssues: newTemp };
    });
  };

  stateHandler = state => {
    this.setState(prevState => {
      const newTemp = prevState.issues.filter(issue => issue.state === state);
      return { newIssues: newTemp };
    });
  };

  render() {
    if (sessionStorage.getItem("isUser")) {
      if (this.state.issues.length > 0 || this.state.total !== 0) {
        const { issues, newIssues } = this.state;

        let Issues;
        if (!this.state.loading) {
          if (this.state.newIssues === null) {
            Issues = issues.map((issue, i) => {
              return (
                <ListIssue
                  issue={issue}
                  page={this.props.match.params.page}
                  key={i}
                />
              );
            });
          } else if (this.state.newIssues.length === 0) {
            Issues = (
              <div className={classes.empty} key="0">
                <h3>Nothing to Show</h3>
              </div>
            );
          } else {
            Issues = newIssues.map((issue, i) => {
              return (
                <ListIssue
                  issue={issue}
                  page={this.props.match.params.page}
                  key={i}
                />
              );
            });
          }
        } else {
          Issues = <div className={classes.loader}>Loading...</div>;
        }

        return (
          <div className={classes.App}>
            <Header val={this.state.total} />
            <IssueHeader
              issues={this.state.issues}
              click={this.sortClickHandler}
              clear={this.clearHandler}
              submit={this.searchHandler}
              clickS={this.stateHandler}
              clickA={this.authorHandler}
              clickL={this.labelHandler}
            />
            <ReactAux>
              {Issues}
              <span className={classes.paginate}>
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={".."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(this.state.total / 5)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </span>
            </ReactAux>
          </div>
        );
      } else {
        return (
          <div>
            <h3 className={classes.err}>{this.state.err}</h3>
            <div className={classes.loader}>Loading...</div>
          </div>
        );
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default withRouter(IssuesGit);
