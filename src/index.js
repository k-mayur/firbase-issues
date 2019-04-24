import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import thunk from "redux-thunk";
import issueReducer from "./store/reducers/issue";
import issuesReducer from "./store/reducers/issues";
import commentsReducer from "./store/reducers/comments";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  issues: issuesReducer,
  issue: issueReducer,
  comments: commentsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
