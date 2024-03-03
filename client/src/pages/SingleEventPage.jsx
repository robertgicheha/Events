import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { UserState } from "../Context/UserContext";

const SingleEventPage = () => {
  const { id } = useParams();
  const { user } = UserState();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes =
    event?.status === "active"
      ? "bg-green-500 px-3 py-1 ml-3 rounded-md capitalize"
      : "bg-red-500 px-3 py-1 ml-3 rounded-md capitalize";
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const navigate = useNavigate();

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post(`/api/events/participate/${id}`);
      alert("Successfully registered for the event!");
      navigate("/profile");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return loading ? (
    <p>Loading event details</p>
  ) : (
    <div className="mx-auto px-8 py-16 bg-zinc-100">
      <div className="flex items-center justify-center mb-4">
        <img
          src={event.pic}
          alt={event.title}
          className="w-full h-96 object-cover rounded-md"
        />
      </div>
      <div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold">{event.title}</h2>
              <div className="flex gap-3">
                <p className="text-gray-700">
                  <span className="font-bold">Date:</span>{" "}
                  {moment(event.date).format("DD-MM-YYYY")}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Time:</span> {event.time}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Host:</span> {event.host.name}
                </p>
              </div>
              <p className="text-gray-700">
                <span className="font-bold">Link: </span>
                {event.virtualLocation}
              </p>
            </div>
            {user && event.status === "active" && (
              <button
                onClick={handleRegister}
                className="py-2 px-4 rounded-sm shadow-md hover:shadow-lg hover:bg-indigo-900 transition duration-300 bg-indigo-500 text-white"
              >
                Register Now
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex mt-4 gap-3">
        <div className="w-2/4 bg-white h-64 rounded-lg shadow-md p-5">
          <h1 className="text-2xl mb-3 underline">About the event</h1>
          <p className="p-3">{event.description}</p>
        </div>
        <div className="w-2/4 bg-white h-64 rounded-lg shadow-md p-5">
          <h1 className="text-2xl mb-3 underline">Event Overview</h1>
          <p className="p-3">
            Total Registrations: {event.participants.length}
          </p>
          <p className="p-3 flex items-center">
            Event Status: <span className={classes}>{event.status}</span>
          </p>
          <div className="p-3">
            {user?._id === event.host._id && (
              <Link
                className="p-3 rounded-sm hover:bg-indigo-900 bg-indigo-500 text-white"
                to={`/edit/${id}`}
              >
                Edit Event
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
