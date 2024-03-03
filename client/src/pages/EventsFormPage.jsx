import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import { UserState } from "../Context/UserContext";

const EventsFormPage = () => {
  const { id } = useParams();
  const { user } = UserState();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    pic: "",
    date: "",
    time: "",
    virtualLocation: "",
    status: "active",
    category: "workshop",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/events/${id}`).then((response) => {
      const { data } = response;
      if (data) {
        setEventData({
          title: data.title,
          description: data.description,
          pic: data.pic,
          date: moment(data.date).format("YYYY-MM-DD"),
          time: data.time,
          virtualLocation: data.virtualLocation,
          status: data.status,
          category: data.category,
        });
      }
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!id) {
        await axios.post("api/events/new", eventData);
        alert("Event Created");
      } else {
        await axios.put(`api/events/edit/${id}`, eventData);
        alert("Event Updated");
      }
      navigate("/events");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto px-8 py-8 bg-zinc-100">
      <h1 className="text-3xl mb-4 capitalize">
        {!id ? `Create new event` : `update event`}
      </h1>
      <hr className="w-64 h-1 bg-indigo-500 mb-8 rounded-full" />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="pic"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            id="pic"
            name="pic"
            value={eventData.pic}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="virtualLocation"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Virtual Location
          </label>
          <input
            type="text"
            id="virtualLocation"
            name="virtualLocation"
            value={eventData.virtualLocation}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={eventData.status}
              onChange={handleInputChange}
              className="border py-1 px-2 w-full"
            >
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleInputChange}
              className="border py-1 px-2 w-full"
            >
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
              <option value="concert">Concert</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
          >
            {!id ? `Create Event` : `Update Event`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventsFormPage;
