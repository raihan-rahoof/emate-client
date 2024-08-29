import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashBoard from './Pages/Dasboard/DashBoard';
import OtpPage from './Pages/OtpPage';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-mail" element={<OtpPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App
