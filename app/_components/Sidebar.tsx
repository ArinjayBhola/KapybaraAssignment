"use client";

import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import useColorStore from "@/store/useColorStore";

const Sidebar = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const setSelectedColor = useColorStore((state) => state.setSelectedColor);

  const colorCircles = ["bg-yellow-400", "bg-orange-400", "bg-violet-400", "bg-blue-400", "bg-green-400"];

  const handleAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-5 border-r border-gray-200 h-screen w-28 sticky top-0 left-0 bg-white">
      <div className="font-mono font-bold text-2xl m-3 text-center">Dockit</div>
      <div
        onClick={() => setShowIcon(!showIcon)}
        className="bg-black text-white h-10 w-10 mx-auto mt-2 mb-4 flex justify-center items-center rounded-full hover:scale-125 cursor-pointer transition-transform duration-500 ease-in-out">
        <PlusIcon
          className={`${showAnimation ? "animate-spin" : ""}`}
          onClick={handleAnimation}
        />
      </div>
      {showIcon && (
        <div className="flex flex-col gap-2">
          {colorCircles.map((color, index) => (
            <div
              key={index}
              className={`h-8 w-8 rounded-full ${color} mx-auto my-1 hover:scale-110 cursor-pointer transition-transform duration-300 ease-in-out`}
              onClick={() => setSelectedColor(color)}></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
