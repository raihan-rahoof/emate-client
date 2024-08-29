import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { registerUser } from "../features/Auth/Authslice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordTwo: "",
  });
  const dispatch = useDispatch();
  const { user,loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!form.first_name.trim()) errors.firstName = "First name is required";
    if (!form.last_name.trim()) errors.lastName = "Last name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.password.trim()) errors.password = "Password is required";
    if (!form.passwordTwo.trim())
      errors.passwordTwo = "Please confirm your password";

    if (form.password && !passwordRegex.test(form.password)) {
      errors.password =
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (form.password !== form.passwordTwo) {
      errors.passwordTwo = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser(form));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.email)
    }
  }, [error]);

  useEffect(() => {
    if (user) {
     navigate('/verify-mail')
      
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f0f10] text-card-foreground">
        <div className="mx-auto bg-[#18181b] w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl text-white font-bold">Register</h1>
            <p className="text-muted-foreground text-white">
              Create a new account to get started.
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <input
                  name="first_name"
                  type="text"
                  value={form.first_name}
                  onChange={handleChange}
                  className="block w-full bg-[#0f0f10] text-white p-2   rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="enter your first name"
                />
              </div>
              <div className="space-y-2">
                <input
                  name="last_name"
                  type="text"
                  value={form.last_name}
                  onChange={handleChange}
                  className="block w-full bg-[#0f0f10] text-white p-2   rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="enter your last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="block w-full bg-[#0f0f10] text-white p-2   rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="enter your email"
              />
            </div>
            <div className="space-y-2">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="block w-full bg-[#0f0f10] text-white p-2   rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="enter your password"
              />
            </div>
            <div className="space-y-2">
              <input
                name="passwordTwo"
                type="password"
                value={form.passwordTwo}
                onChange={handleChange}
                className="block w-full bg-[#0f0f10] text-white p-2   rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="confirm your password"
              />
            </div>
            <Button color="success" type="submit" className="w-full">
              Register
            </Button>
          </form>
          <p className="text-center text-white text-sm text-muted-foreground">
            Already have an account? Then{" "}
            <Link
              to="/login"
              className="font-medium underline underline-offset-4"
            >
              login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
