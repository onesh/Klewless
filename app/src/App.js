import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as stores from "./stores";
import TestList from "./testlist";
import CreateTest from "./createtest";
import GiveTest from "./giveTest";
import DL from "./dl";

// TODO: use BrowserRouter instead
// TODO: remove routes to a seperate file and iterate it here
class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={TestList} />
            <Route exact path="/createtest/:id?" component={CreateTest} />
            <Route exact path="/test/:id" component={GiveTest} />
            <Route exact path="/dl/:id?" component={DL} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
