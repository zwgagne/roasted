import React from "react";
import AppNavigator from "./App/Router/AppNavigator";
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
      <Router history={history}>
        <AppNavigator />
      </Router>
  );
}

export default App;
