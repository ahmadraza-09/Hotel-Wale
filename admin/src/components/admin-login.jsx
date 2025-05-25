import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const loginNotify = () => toast.success("Admin Logged in successfully!");

  const emailOrPhoneRegex =
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^\d{10}$/;
  const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!identifier) {
      setFormError("Enter your Mobile Number/Email");
      return;
    } else if (!identifier.match(emailOrPhoneRegex)) {
      setFormError("Enter a valid Email or 10-digit Mobile Number");
      return;
    } else if (!password) {
      setFormError("Enter your Password");
      return;
    } else if (!password.match(passwordRegex)) {
      setFormError("Password must be at least 8 characters");
      return;
    }

    const userData = { identifier, password };

    axios
      .post("http://localhost:5000/admin/adminlogin", userData)
      .then((response) => {
        const { token, user, message } = response.data;

        if (
          message === "Mobile number/email and password are required" ||
          message === "Invalid mobile number/email or password"
        ) {
          setFormError(message);
        } else {
          if (user.role == "hoteladmin") {
            setFormError("");

            localStorage.setItem("token", token);
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("full_name", user.full_name);
            localStorage.setItem("phone", user.phone);
            localStorage.setItem("email", user.email);
            //   localStorage.setItem("profile_image", user.profile_image);

            loginNotify();
            navigate("/");
          } else if (user.role == "superadmin") {
            setFormError("");

            localStorage.setItem("token", token);
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("full_name", user.full_name);
            localStorage.setItem("phone", user.phone);
            localStorage.setItem("email", user.email);
            //   localStorage.setItem("profile_image", user.profile_image);

            loginNotify();
            navigate("/super-dashboard");
          }
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setFormError("Login failed. Try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <img src={logo} alt="" className="w-16" />
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>

        {formError && (
          <p className="text-red-600 text-sm mb-2 text-center">{formError}</p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Mobile Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
