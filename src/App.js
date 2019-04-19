import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Issues from "./containers/IssuesList/Issues";
import Issue from "./containers/IssueSingle/Issue";
import Error from "./components/Error/Error";
import Home from "./containers/Home/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Home /> */}
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:page" component={Issues} exact />
          <Route path="/issues/:issueId" component={Issue} exact />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
