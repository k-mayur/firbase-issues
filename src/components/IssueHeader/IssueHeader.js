import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import classes from "./IssueHeader.css";
import Button from "@material-ui/core/Button";
import SearchInput from "../SearchInput/SearchInput";

const issueHeader = props => {
  const sortArray = [
    "newest",
    "oldest",
    "recently updated",
    "least recently updated"
  ];
  const stateArr = ["open", "close"];
  const authorArr = props.issues.map(issue => issue.user.login);
  const uniqueAuthorArr = Array.from(new Set(authorArr));
  const labelsArr = props.issues.map(issue => {
    return issue.labels.map(label => label.name);
  });
  const merged = [].concat.apply([], labelsArr);
  const uniqueLabelsArr = Array.from(new Set(merged));
  return (
    <div className={classes.wrap}>
      <SearchInput submit={props.submit} />
      <Dropdown name="Sort" arr={sortArray} clicked={props.click} />
      <Dropdown name="State" arr={stateArr} clicked={props.clickS} />
      <Dropdown name="Author" arr={uniqueAuthorArr} clicked={props.clickA} />
      <Dropdown name="Label" arr={uniqueLabelsArr} clicked={props.clickL} />
      <Button onClick={props.clear}>Clear Filters</Button>
    </div>
  );
};

export default issueHeader;
