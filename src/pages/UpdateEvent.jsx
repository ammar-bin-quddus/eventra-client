import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Nav from "../components/Nav";

const UpdateEvent = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Fetch the event by ID on mount
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axiosSecure.get(`/events/mine`);
        const match = res.data.find((e) => e._id === id);
        if (match) {
          setEventData(match);
          reset(match); // prefill form
        }
      } catch (err) {
        console.error("Failed to fetch event:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/events/${id}`, data);
      navigate("/my-event");
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  if (loading) return <Loading />;

  if (!eventData)
    return (
      <p className="text-center mt-10">Event not found or unauthorized.</p>
    );

  return (
    <div className="w-full">
      <Nav />
      <div className="max-w-2xl mx-auto p-6 my-10 bg-white shadow-xl rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Event Title</label>
            <input
              {...register("title")}
              className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
            />
          </div>
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
            />
          </div>
          <div>
            <label className="block font-medium">Time</label>
            <input
              type="time"
              {...register("time")}
              className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
            />
          </div>
          <div>
            <label className="block font-medium">Location</label>
            <input
              {...register("location")}
              className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#1E2939] text-yellow-400 text-sm hover:bg-[#D08700] hover:text-white active:scale-95 duration-300 cursor-pointer"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
