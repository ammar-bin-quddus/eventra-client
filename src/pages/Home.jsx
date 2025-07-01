import { Link } from "react-router-dom";
import useEvents from "../hooks/useEvents";

const Home = () => {
  const { events = [] } = useEvents();
  const upcoming = events
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
    .slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e293b] to-[#334155] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Eventra</h1>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Discover, host, and join amazing events. Your hub for smart event management and community building.
        </p>
        <Link to="/events" className="btn btn-primary px-8 py-2 rounded-md text-lg">Explore Events</Link>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((event) => (
            <div key={event._id} className="p-5 border rounded shadow">
              <h3 className="text-xl font-bold mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-1">📅 {event.date} • ⏰ {event.time}</p>
              <p className="text-sm text-gray-700 mb-2">📍 {event.location}</p>
              <p className="text-sm text-gray-600">{event.description.slice(0, 80)}...</p>
              <Link to="/events" className="text-blue-600 hover:underline mt-2 inline-block">View More</Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-100 py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="text-xl font-semibold mb-2">1. Create Events</h4>
              <p>Create and share your own events with our simple form.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">2. Join Events</h4>
              <p>Browse events by category, date, or popularity and join in seconds.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">3. Manage Easily</h4>
              <p>Track your created or joined events from your personal dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 border rounded shadow">
            <p>"Eventra made it super easy to manage our hackathon. We’ll use it again!"</p>
            <h4 className="mt-3 font-semibold">— Alex H.</h4>
          </div>
          <div className="bg-white p-4 border rounded shadow">
            <p>"I love how quick it is to find events relevant to me. Clean and fast!"</p>
            <h4 className="mt-3 font-semibold">— Fatima K.</h4>
          </div>
          <div className="bg-white p-4 border rounded shadow">
            <p>"No more messy spreadsheets. Eventra handles everything!"</p>
            <h4 className="mt-3 font-semibold">— Rafiul I.</h4>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e293b] text-white py-16 px-6 text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Host or Join an Event?</h2>
        <p className="mb-6">Get started by exploring current events or creating your own.</p>
        <Link to="/events" className="btn btn-secondary px-8 py-2 rounded-md text-lg">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;
