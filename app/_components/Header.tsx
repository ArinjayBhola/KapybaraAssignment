"use client";

import useColorSearch from "@/store/useColorSearch";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [activeColor, setActiveColor] = useState("bg-gray-500");
  const router = useRouter();

  const selectedIntialColor = useColorSearch((state) => state.selectedIntialColor);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
      toast("Please login to access your notes", { type: "error" });
    }
  }, [router]);

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
    <div className="flex flex-wrap p-4 gap-4 mx-8 justify-between md:justify-start md:flex-row items-center">
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
      <button
        className="px-6 py-2 rounded-lg cursor-pointer text-white hover:bg-red-500 bg-red-400 transition duration-500"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/sign-in");
        }}
        type="button">
        Logout
      </button>
    </div>
  );
};

export default Header;
