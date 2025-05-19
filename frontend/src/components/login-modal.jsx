import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setAge("");
    setMobileNumber("");
    setIdentifier("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const validateForm = () => {
    if (!isLogin) {
      if (!name || !age || !mobileNumber)
        return "All fields are required for registration";
    } else {
      if (!identifier && !password)
        return "Email or Mobile number and Password is required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = isLogin
      ? { identifier, password }
      : {
          name,
          age: Number(age),
          mobile_number: mobileNumber,
          email,
          password,
        };

    try {
      const url = isLogin
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/registration";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        alert(isLogin ? "Logged in successfully!" : "Registered successfully!");
        resetForm();
        onClose();
      }
    } catch (err) {
      setError("Something went wrong");
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
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />

              <input
                type="text"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded"
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
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </>
          )}

          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          )}

          <div className="flex gap-4">
            <button
              className="w-[50%] bg-slate-200 rounded"
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
                setError("");
                resetForm();
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
