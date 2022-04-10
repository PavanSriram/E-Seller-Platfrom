import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/user/userDashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' component={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
