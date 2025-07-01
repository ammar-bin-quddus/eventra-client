import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-screen text-yellow-600 h-screen overflow-hidden animate-spin duration-300 flex items-center justify-center text-center font-bold text-4xl">
      <AiOutlineLoading3Quarters />
    </div>
  );
};

export default Loading;
