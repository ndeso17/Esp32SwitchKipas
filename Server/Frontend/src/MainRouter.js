// MainRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./MainRouter.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import LoginForm from "./Components/Login/loginForm";
import Home from "./Components/Home/Home";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}
      </Routes>
    </Router>
  );
};

export default MainRouter;
