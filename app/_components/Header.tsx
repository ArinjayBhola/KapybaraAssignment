"use client";

import useColorSearch from "@/store/useColorSearch";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [activeColor, setActiveColor] = useState("bg-gray-500");

  const selectedIntialColor = useColorSearch((state) => state.selectedIntialColor);

  useEffect(() => {
    selectedIntialColor(activeColor);
  }, [activeColor, selectedIntialColor]);

  const colors = [
    { id: "1", name: "All", bgColor: "bg-gray-500" },
    { id: "2", name: "Yellow", bgColor: "bg-yellow-400" },
    { id: "3", name: "Orange", bgColor: "bg-orange-400" },
    { id: "4", name: "Voilet", bgColor: "bg-violet-400" },
    { id: "5", name: "Green", bgColor: "bg-green-400" },
    { id: "6", name: "Blue", bgColor: "bg-blue-400" },
  ];

  return (
    <div className="flex p-4 gap-4 mx-8">
      {colors.map((color) => {
        return (
          <p
            className={`px-6 py-2 rounded-lg cursor-pointer transition duration-300 ease-in-out ${
              activeColor === color.bgColor
                ? `${color.bgColor} text-white scale-105`
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            key={color.id}
            onClick={() => setActiveColor(color.bgColor)}>
            {color.name}
          </p>
        );
      })}
    </div>
  );
};

export default Header;
