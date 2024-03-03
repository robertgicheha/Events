/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../Context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUser } = UserState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successful");
      navigate("/");
    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <p className="mb-2">
            Dont have an account?{" "}
            <Link to="/register" className="text-indigo-500">
              Register
            </Link>
          </p>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
