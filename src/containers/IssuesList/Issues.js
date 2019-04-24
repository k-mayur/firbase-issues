import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Issues.css";
import Header from "../../components/Header/Header";
import ListIssue from "../../components/ListIssue/ListIssue";
import IssueHeader from "../../components/IssueHeader/IssueHeader";
import ReactAux from "../../hoc/ReactAux";
import ReactPaginate from "react-paginate";
import * as actionCreators from "../../store/actions/index";
import { Redirect, withRouter } from "react-router-dom";

class IssuesGit extends Component {
  componentDidMount = () => {
    if (sessionStorage.getItem("isUser")) {
      this.props.loadingOn();
      this.loadIssuesHandler(this.props.match.params.page);
      this.props.history.push(`/${this.props.match.params.page}`);
    } else {
      return <Redirect to="/" />;
    }
  };

  handlePageClick = data => {
    this.props.loadingOn();
    this.loadIssuesHandler(data.selected + 1);
    this.props.history.push(`/${data.selected + 1}`);
  };

  loadIssuesHandler = page => {
    this.props.loadIssues(page);
    this.props.loadTotal();
  };

  render() {
    if (sessionStorage.getItem("isUser")) {
      if (this.props.issues.length > 0 || this.props.total !== 0) {
        const { issues, newIssues } = this.props;

        let Issues;
        if (!this.props.loading) {
          if (this.props.newIssues === null) {
            Issues = issues.map((issue, i) => {
              return (
                <ListIssue
                  issue={issue}
                  page={this.props.match.params.page}
                  key={i}
                />
              );
            });
          } else if (this.props.newIssues.length === 0) {
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
            <Header val={this.props.total} />
            <IssueHeader
              issues={this.props.issues}
              click={this.props.sortHandler}
              clear={this.props.clearHandler}
              submit={this.props.searchHandler}
              clickS={this.props.stateHandler}
              clickA={this.props.authorHandler}
              clickL={this.props.labelHandler}
            />
            <ReactAux>
              {Issues}
              <span className={classes.paginate}>
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={".."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(this.props.total / this.props.per_page)}
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
            <h3 className={classes.err}>{this.props.err}</h3>
            <div className={classes.loader}>Loading...</div>
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
    issues: state.issues.issues,
    newIssues: state.issues.newIssues,
    loading: state.issues.loading,
    err: state.issues.err,
    total: state.issues.total,
    per_page: state.issues.per_page
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadIssues: page => dispatch(actionCreators.loadIssuesFromServer(page)),
    loadTotal: () => dispatch(actionCreators.loadTotal()),
    sortHandler: sort => dispatch(actionCreators.sortHandler(sort)),
    clearHandler: () => dispatch(actionCreators.clearHandler()),
    stateHandler: state => dispatch(actionCreators.stateHandler(state)),
    labelHandler: label => dispatch(actionCreators.labelHandler(label)),
    authorHandler: author => dispatch(actionCreators.authorHandler(author)),
    searchHandler: (e, value) =>
      dispatch(actionCreators.searchHandler(e, value)),
    loadingOn: () => dispatch(actionCreators.loadingOn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(IssuesGit));
