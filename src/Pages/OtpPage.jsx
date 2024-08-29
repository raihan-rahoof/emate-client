  import React, { useState } from "react";

  import axios from "axios";
  import toast from "react-hot-toast";
  import {  useNavigate } from "react-router-dom";

  const OtpPage = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    
    const handleOtpChange = (e) => {
      const value = e.target.value;
      if (value.length <= 6 && !isNaN(Number(value))) {
        setOtp(value);
        setError(false);
      }
    };

    const handleVerify = async () => {
      if (otp.length !== 6) {
        setError(true);
      } else {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/verify-email/",
            { otp }
          );
          if (response.status === 200) {
            toast.success("Email Verification Successful");
            navigate("/login");
          }
        } catch (error) {
          if (error.response) {
            
            toast.error(error.response.data.error || "An error occurred");
          } else if (error.request) {
            
            toast.error("No response from server");
          } else {
            toast.error("Error: " + error.message);
          }
        }
      }
    };


    return (
      <div className="bg-gray-900 h-screen flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-white text-2xl font-bold mb-2">Verify OTP</h2>
          <p className="text-gray-400 text-sm mb-4">
            Enter OTP that has been received in your mail
          </p>
          <div className="flex items-center mb-4">
            
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              className={`w-full p-2 pl-10 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${
                error ? "border-red-500" : "border-gray-600"
              }`}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">
              Invalid OTP. Please enter 6 digits.
            </p>
          )}
          <button
            onClick={handleVerify}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            Verify
          </button>
        </div>
      </div>
    );
  };

  export default OtpPage;
