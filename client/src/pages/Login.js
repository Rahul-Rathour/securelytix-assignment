import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginSchema } from "../validation_schema/LoginSchema";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          setLoginError("");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-6">
      <div className="w-full max-w-md bg-[#1e1e2f] text-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Securelytix Login
        </h2>

        {loginError && (
          <div className="mb-4 bg-red-600/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg text-center animate-pulse">
            {loginError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-400 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              checked={formik.values.remember}
              onChange={formik.handleChange}
              className="h-4 w-4 text-blue-500 border-gray-600 bg-gray-800 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-400">
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>

          {/* Sign up */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
