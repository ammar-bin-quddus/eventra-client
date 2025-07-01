import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useMyEvents from "../hooks/useMyEvents";

const MyEvents = () => {
  const axiosSecure = useAxiosSecure();

  const { myEvents, isLoading, refetch } = useMyEvents();

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/events/${id}`);
      refetch();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Events</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : myEvents.length === 0 ? (
        <p className="text-center text-gray-500">You have not added any events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myEvents.map((event) => (
            <div key={event._id} className="p-5 border rounded shadow-sm">
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
              <p className="text-sm mb-2">📍 {event.location}</p>
              <p className="text-sm mb-2">👥 Attendees: {event.attendeeCount}</p>
              <div className="flex gap-2">
                <Link
                  to={`/update-event/${event._id}`}
                  className="btn btn-sm btn-outline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
