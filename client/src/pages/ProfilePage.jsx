import { useEffect, useState } from "react";
import { UserState } from "../Context/UserContext";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, ready } = UserState(null);
  const [rsvps, setRsvps] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && ready) {
      navigate("/login");
    }
  }, [user, ready, navigate]);

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        if (user) {
          const { data } = await axios.get("/api/users/rsvps");
          setRsvps(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRsvps();
  }, [user]);

  if (!ready) {
    return "Loading...";
  }

  return (
    <div className="mx-auto px-10 py-8 bg-zinc-100 min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700">Name:</p>
            <span className="text-lg font-semibold">{user?.name}</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700">Email:</p>
            <span className="text-lg font-semibold">{user?.email}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Registered Events</h2>
        {rsvps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rsvps?.map((event) => (
              <Card key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            {`You haven't registered for any events yet.`}
          </p>
        )}
      </section>
    </div>
  );
};

export default Profile;
