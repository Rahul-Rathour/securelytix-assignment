import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginSchema } from "../validation_schema/LoginSchema";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Formik setup for handling form state and validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/login`, {
          email: values.email,
          password: values.password,
          remember: values.remember, 
        });  

        if (res.data.success) {
          setLoginError(""); // Clear any errors
          navigate("/dashboard");
        } else {
          setLoginError(res.data.message || "Invalid credentials");
        }
      } catch (err) {
        setLoginError("Server error or invalid login");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
        noValidate
      >
        {/* Form title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900">
          Securelytix Login
        </h2>

        {/* Error message */}
        {loginError && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {loginError}
          </p>
        )}

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm font-medium"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Remember Me checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            checked={formik.values.remember}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            aria-label="Remember me"
          />
          <label htmlFor="remember" className="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Log in"
        >
          Login
        </button>

        {/* Signup link */}
        <div className="text-center">
          <p className="text-sm text-gray-700">
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline font-medium"
              onClick={() => navigate("/signup")}
              aria-label="Go to signup page"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}; 

export default Login;