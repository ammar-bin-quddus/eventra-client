import { useState } from "react";
import useEvents from "../hooks/useEvents";
import dayjs from "dayjs";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const { events, isLoading, refetch } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");

  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");
  const startOfLastWeek = today.subtract(1, "week").startOf("week");
  const endOfLastWeek = today.subtract(1, "week").endOf("week");
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const startOfLastMonth = today.subtract(1, "month").startOf("month");
  const endOfLastMonth = today.subtract(1, "month").endOf("month");

  const handleJoin = async (id) => {
    try {
      await axiosSecure.put(`/events/join/${id}`);
      refetch();
    } catch (err) {
      if (err.response?.data?.error === "You've already joined this event.") {
        alert("You already joined this event.");
      } else {
        console.error("Join failed:", err.message);
      }
    }
  };

  const matchesFilter = (eventDate) => {
    const date = dayjs(eventDate);
    switch (filter) {
      case "today":
        return date.isSame(today, "day");
      case "thisWeek":
        return date.isAfter(startOfWeek) && date.isBefore(endOfWeek);
      case "lastWeek":
        return date.isAfter(startOfLastWeek) && date.isBefore(endOfLastWeek);
      case "thisMonth":
        return date.isAfter(startOfMonth) && date.isBefore(endOfMonth);
      case "lastMonth":
        return date.isAfter(startOfLastMonth) && date.isBefore(endOfLastMonth);
      default:
        return true;
    }
  };

  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((event) => matchesFilter(event.date))
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Events</h2>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-full md:w-52"
        >
          <option value="all">All Events</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="p-5 border rounded shadow-sm">
              <h3 className="text-xl font-bold mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Hosted by: {event.name}
              </p>
              <p className="text-sm mb-1">
                {event.date} at {event.time}
              </p>
              <p className="text-sm mb-1">📍 {event.location}</p>
              <p className="text-sm mb-2">{event.description}</p>
              <p className="text-sm mb-2">
                👥 Attendees: {event.attendeeCount}
              </p>
              <button
                onClick={() => handleJoin(event._id)}
                className="text-black bg-white px-8 py-1 rounded-md text-sm border border-yellow-600 hover:bg-yellow-600 hover:text-white duration-300 active:scale-95 cursor-pointer"
              >
                Join Event
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
