import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Tenant from "./tenant";
import View from "./view";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/view" element={<View />} />
      <Route path="/tenant" element={<Tenant />} />
    </Routes>
  </Router>
  );
}

export default App;
