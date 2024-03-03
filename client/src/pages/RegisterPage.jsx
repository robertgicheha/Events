import { useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../Context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = UserState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("Please enter all details!");
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      alert("Registered Successfully!");
      setUser(data);
      navigate("/");
    } catch (error) {
      alert("Registration failed! Try again later.");
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
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
            Already have an account?
            <Link to="/login" className="text-indigo-500">
              {" "}
              Login
            </Link>
          </p>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
