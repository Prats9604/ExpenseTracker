import axios from "axios";
import React, { useState } from "react";
import { setAuthentication, isLogin } from "../../../utils/auth";

const RegLoginForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );
        const { token, userId } = response.data;
        console.log("response====", response.data);
        setAuthentication(token);
        console.log("token");
        localStorage.setItem("userId", userId);
        location.reload();
        onClose();
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
          confirmPassword,
        });
      }

      console.log("registration done");
      clearFields();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleClose = () => {
    clearFields();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-[#fff] p-10 rounded-lg shadow-lg w-full max-w-sm mx-4 sm:mx-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div className="flex flex-col gap-6">
          <h2 className="text-[#C67F54] text-2xl font-bold mb-4 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {isLogin ? (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              />
              <button
                type="submit"
                className="bg-[#1C3F43] text-white p-2 rounded-md hover:bg-[#375F63]"
              >
                Login
              </button>
              <button
                className="text-md text-center text-[#1C3F43] -mt-2"
                type="button"
                onClick={() => setIsLogin(false)}
              >
                Want to be a contributor?
                <span className="font-semibold">Register</span>
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              />
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              />
              <button
                type="submit"
                className="bg-[#1C3F43] text-white p-2 rounded-md hover:bg-[#375F63]"
              >
                Register
              </button>
              <button
                className="text-md text-center text-[#1C3F43] -mt-2"
                type="button"
                onClick={() => setIsLogin(true)}
              >
                Already a Contributor?
                <span className="font-semibold">Login</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegLoginForm;