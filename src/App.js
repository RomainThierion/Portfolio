import React from "react";
import "./index.css";
import OnePage from "./OnePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path='/' exact component={OnePage} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </main>
    </Router>
  );
}
