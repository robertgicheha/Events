/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/api/events");
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);
  const currentDate = new Date();
  const upcomingEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate > currentDate;
  });

  useEffect(() => {
    let filtered = [...upcomingEvents];
    if (selectedCategory) {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }
    if (selectedDate) {
      filtered = filtered.filter(
        (event) => new Date(event.date) >= selectedDate
      );
    }
    setFilteredEvents(filtered);
  }, [events, selectedCategory, selectedDate]);
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedDate(null);
  };

  return (
    <div className="mx-auto px-8 py-8 bg-zinc-100 min-h-[90vh]">
      <h1 className="text-3xl mb-4">Upcoming Events</h1>
      <hr className="w-64 h-1 bg-indigo-500 mb-8 rounded-full" />
      <div className="mb-6 flex space-x-4 justify-center">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
          >
            <option value="">All Categories</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
            <option value="concert">Concert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Date
          </label>
          <input
            type="date"
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
          />
        </div>

        <div className="flex items-center mt-5">
          <button
            onClick={clearFilters}
            className="font-medium focus:outline-none flex gap-1 items-center bg-red-700 text-white p-1 hover:bg-red-900 rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <Card key={event._id} event={event} />)
        ) : (
          <p className="text-center w-screen">No Events found</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
