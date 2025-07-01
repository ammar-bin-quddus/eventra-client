import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShow, setIsShow] = useState(false);

  const { handleRegister, setLoading, updateUser } =
    useAuth();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const sendUserDataToDb = async (user) => {
    try {
      // Save user in the backend
      await axios.post("http://localhost:5000/api/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password, // fallback for OAuth
        photoURL: user.photoUrl,
      });
    } catch (err) {
      console.error("Failed to save user or fetch token:", err.message || err);
    }
  };

  const onSubmit = async ({ name, email, password, photoUrl }) => {
    try {
      setLoading(true);

      // create user with firebase
      await handleRegister(email, password);

      // update user name
      await updateUser({ displayName: name, photoURL: photoUrl });
      
      // save user to server
      await sendUserDataToDb({ name, email, password, photoUrl });
      navigate("/");
    } catch (error) {
      console.error("registration failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-5 rounded-md shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold mb-4">
          Registration Form
        </h1>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type={isShow ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
            })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Must have an Uppercase letter and Lowercase letter in the password
              also length must be at least 6 character
            </p>
          )}
          <div
            onClick={handleShowPassword}
            className="absolute text-xl right-3 top-[42px]"
          >
            {isShow ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Photo URL</label>
          <input
            type="text"
            {...register("photoUrl", { required: "Photo URL is required" })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.photoUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.photoUrl.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="font-semibold text-center mt-2">
          Already Have An Account ?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
