import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/Auth/LoginSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const dispatch = useDispatch();
  const { status, error, accessToken } = useSelector(
    (state) => state.authLogin
  );
  const navigate = useNavigate();

   useEffect(() => {
     if (status === "succeeded") {
       navigate("/dashboard");
     }
     if (status === "failed" && error) {
       toast.error(error);
     }
   }, [status,  error, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#0f0f10]">
      <div className="max-w-md w-full p-8 bg-[#18181b] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#ffff]">Login</h2>
        <p className="text-[#ffff]">
          Welcome back! Please enter your credentials to login.
        </p>
        <form className="mt-8" onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              name="username"
              type="email"
              value={formData.username}
              onChange={handleChange}
              className="block w-full p-2 bg-[#0f0f10] text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="your email"
            />
          </div>
          <div className="mb-4">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full bg-[#0f0f10] text-white p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="your password"
            />
          </div>
          <Button
            color="success"
            type="submit"
            className={`w-full font-semibold p-2 text-dark mt-3 rounded-lg focus:outline-none focus:ring focus:border-blue-500 ${
              status === "loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </Button>
          <p className="text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-white">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
