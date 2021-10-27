import React from "react";
import AppNavigator from "./App/Router/AppNavigator";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <Router>
        <AppNavigator />
      </Router>
  );
}

export default App;
