import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const event = {
      ...data,
      name: user.displayName,
      email: user.email,
      attendeeCount: 0,
    };

    try {
      await axiosSecure.post("/events", event);
      reset();
      navigate("/my-event");
    } catch (error) {
      console.error("Failed to add event:", error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-10 bg-white shadow-xl rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Event Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
          />
        </div>

        <div>
          <label className="block font-medium">Time</label>
          <input
            type="time"
            {...register("time", { required: "Time is required" })}
            className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border-2 border-[#D08700] outline-[#D08700]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-[#1E2939] text-yellow-400 text-sm hover:bg-[#D08700] hover:text-white active:scale-95 duration-300 cursor-pointer"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvents;
