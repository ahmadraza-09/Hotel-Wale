import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const user_id = params.user_id;

  const loginNotify = () => toast.success("Logged in successfully!");
  const registerNotify = () => toast.success("Registered successfully!");

  const [isLogin, setIsLogin] = useState(true);

  const [full_name, setFull_Name] = useState("");
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, getFormerror] = useState("");
  const nameRegex = /^[a-z A-Z]{2,15}$/;
  const mobileNumberRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-z A-Z 0-9]+@[a-z]+\.[a-z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;

  // Sync dark mode with sidebar/global theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const syncTheme = () => {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    syncTheme();
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  useEffect(() => {
    if (isLogin) {
      setFull_Name("Ahmad");
      setPhone("2222222232");
      setIdentifier("");
      setEmail("ahmadraza123@gmail.com");
    }
    if (!isLogin) {
      setIdentifier("8877878788");
      resetForm();
    }
  }, [isLogin]);

  const resetForm = () => {
    setFull_Name("");
    setPhone("");
    setIdentifier("");
    setEmail("");
    setPassword("");
    getFormerror("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    {
      if (full_name === "") {
        getFormerror("Enter your Name");
        return false;
      } else if (!full_name.match(nameRegex)) {
        getFormerror("Enter Name in Letters");
        return false;
      } else if (email === "") {
        getFormerror("Enter your Email");
        return false;
      } else if (!email.match(emailRegex)) {
        getFormerror("Enter Valid Email");
        return false;
      } else if (phone === "") {
        getFormerror("Enter your Mobile Number");
        return false;
      } else if (!phone.match(mobileNumberRegex)) {
        getFormerror("Invalid Number! Please write only numbers");
        return false;
      } else if (isLogin && identifier === "") {
        getFormerror("Enter your Mobile Number/Email");
        return false;
      } else if (password === "") {
        getFormerror("Enter your Password");
        return false;
      } else if (!password.match(passwordRegex)) {
        getFormerror("Password must be at least 8 characters");
        return false;
      } else {
        if (isLogin) {
          let userData = { identifier, password };
          axios
            .post("http://localhost:5000/auth/login", userData)
            .then((response) => {
              console.log(response.data);
              const message = response.data.message;
              if (
                message === "Mobile number/email and password are required" ||
                message === "Invalid mobile number/email or password"
              ) {
                getFormerror(message);
                return false;
              } else {
                getFormerror("");

                const { token, user } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user_id", user.user_id);
                localStorage.setItem("full_name", user.full_name);
                localStorage.setItem("phone", user.phone);
                localStorage.setItem("email", user.email);
                localStorage.setItem("profile_image", user.profile_image);

                onClose();
                navigate("/hotels");
                loginNotify();

                console.log(
                  "User logged in successfully with ID:",
                  response.data.user.user_id
                );
              }
            })
            .catch((error) => {
              console.error("Error logging in:", error);
            });
        } else {
          const userData = {
            full_name,
            phone,
            email,
            password,
          };
          axios
            .post("http://localhost:5000/auth/registration", userData)
            .then((response) => {
              const responseData = response.data;
              console.log(response.data);
              console.log("Response data:", responseData);
              const message = responseData.message;
              console.log("Message:", message);
              if (message === "Email already exists") {
                getFormerror("Email already exists");
              } else if (message === "Mobile Number already exists") {
                getFormerror("Mobile Number already exists");
              } else {
                console.log("Registration successful");
                getFormerror("");
                const { token, user } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user_id", user.user_id);
                localStorage.setItem("full_name", user.full_name);
                localStorage.setItem("phone", user.phone);
                localStorage.setItem("email", user.email);
                localStorage.setItem("profile_image", user.profile_image);

                onClose();
                navigate("/hotels");
                registerNotify();

                console.log(
                  "User Registration successfully with ID:",
                  response.data.user.user_id
                );
              }
            })
            .catch((error) => {
              console.error("Error registering user:", error);
              getFormerror("Registration failed");
            });
        }
      }
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal"
      onClick={handleOutsideClick}
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4`}
    >
      <div className={`bg-white dark:bg-gray-900 sm:p-6 p-4 rounded-xl w-full max-w-md shadow-lg text-black dark:text-white transition-colors`}>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Welcome Back 👋" : "Register Now"}
        </h2>
        {formError && (
          <p className="text-red-600 text-sm mb-2 text-center">{formError}</p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={full_name}
                onChange={(e) => setFull_Name(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </>
          )}

          {isLogin && (
            <>
              <input
                type="text"
                placeholder="Email or Mobile Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2 bg-white dark:bg-gray-800 text-black dark:text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </>
          )}

          {!isLogin && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </>
          )}

          <div className="flex gap-4">
            <button
              className="w-[50%] bg-slate-200 dark:bg-gray-700 text-black dark:text-white rounded"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[50%] bg-myColor text-white py-2 rounded hover:bg-myColor transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            {isLogin ? "Not registered yet?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                getFormerror("");
              }}
              className="text-blue-600 ml-2 hover:underline"
              type="button"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
