import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import StoreListing from "./pages/StoreListing";
import SubmitRating from "./pages/SubmitRating";

const App = () => {
  return (
    <Routes>
     
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stores" element={<StoreListing />} />
      <Route path="/submit-rating" element={<SubmitRating />} />
    </Routes>
  );
};

export default App;
