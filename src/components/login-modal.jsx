import React, { useState } from "react";
// import axios from "axios";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setDob("");
    setGender("");
    setMobile("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const validateForm = () => {
    if (!isLogin) {
      if (!name || !dob || !gender || !mobile)
        return "All fields are required for registration";
    }
    if (!email || !password) return "Email and Password are required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // try {
    //   if (isLogin) {
    //     // const res = await axios.post("/api/login", { email, password, role });
    //     alert("Logged in!");
    //   } else {
    //     // const res = await axios.post("/api/register", {
    //     name,
    //       gender,
    //       mobile,
    //       email,
    //       password,
    //       // });
    //       alert("Registered!");
    //   }
    //   resetForm();
    //   onClose();
    // } catch (err) {
    //   setError("Something went wrong");
    // }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    >
      <div className="bg-white sm:p-6 p-4 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Welcome Back 👋" : "Register Now"}
        </h2>
        {error && (
          <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />

              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          <div className="flex gap-4">
            <button className="w-[50%] bg-slate-200 rounded" onClick={onClose}>
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
                setError("");
              }}
              className="text-blue-600 ml-2 hover:underline"
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
