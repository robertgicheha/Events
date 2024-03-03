import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../Context/UserContext";
import axios from "axios";

const Header = () => {
  const { user, setUser } = UserState();
  const navigate = useNavigate();
  const logoutHandle = async () => {
    try {
      await axios.post("/api/users/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar py-4 flex justify-between items-center p-7 h-[10vh]">
      <Link to="/" className="text-3xl hover:text-indigo-500 duration-300">
        {`< Invite />`}
      </Link>
      <div className="md:flex space-x-4">
        <Link to="/events" className="hover:text-indigo-500 text-xl">
          Events
        </Link>

        {user ? (
          <>
            <Link to="/create" className="hover:text-indigo-500 text-xl">
              Create
            </Link>
            <Link to="/profile" className="hover:text-indigo-500 text-xl">
              Profile
            </Link>
            <button
              onClick={logoutHandle}
              className="hover:text-indigo-500 text-xl"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-indigo-500 text-xl">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
