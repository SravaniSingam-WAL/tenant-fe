import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Tenant from "./tenant";
import View from "./view";
import WithOutNav from "./withOutNav";
import WithNav from "./withNav";

function App() {
  return (
    <Router>
    <Routes>
    <Route element ={<WithOutNav />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Route>
    <Route element = {<WithNav />}>
      <Route path="/home" element={<Home />} />
      <Route path="/view" element={<View />} />
      <Route path="/tenant" element={<Tenant />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
