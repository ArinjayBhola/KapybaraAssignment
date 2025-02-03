"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import useColorStore from "@/store/useColorStore";
import { Check, PencilIcon, X } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useColorSearch from "@/store/useColorSearch";

interface CardData {
  id: number;
  content: string;
  bgColor: string;
}

const CardContainer = () => {
  const [content, setContent] = useState("");
  const [isContentPosted, setIsContentPosted] = useState(false);
  const [data, setData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedColor = useColorStore((state) => state.selectedColor);
  const setSelectedColor = useColorStore((state) => state.setSelectedColor);
  const intialColor = useColorSearch((state) => state.intialColor);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.post("/api/get-note").then((res) => {
      if (intialColor === "bg-gray-500") {
        setData(res.data.message);
      } else {
        const noteData = res.data.message.filter((item: CardData) => item.bgColor === intialColor);
        setData(noteData);
      }
      setIsLoading(false);
    });
  }, [selectedColor, intialColor, refresh]);

  const handlePostData = async () => {
    if (content === "") {
      toast("Content can't be empty");
      return;
    }
    try {
      await axios.post("/api/create-note", {
        content: content,
        bgColor: selectedColor,
      });
      toast("Notes created successfully");
      setIsContentPosted(true);
      setSelectedColor("bg-white");
    } catch (error) {
      console.log(error);
      toast("Some error occured");
    }
  };

  const handleDeleteData = async (id: number) => {
    try {
      await axios.delete(`/api/delete-note?id=${id}`);
      setRefresh(true);
      console.log(id);
      toast("Notes Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast("Some error occured");
    }
  };

  return (
    <div className="flex flex-row">
      {selectedColor !== "bg-white" && (
        <div
          className={`flex flex-col rounded-lg ${selectedColor} shadow-lg p-4 my-9 ml-9 h-72 w-full mr-4 sm:w-60 relative`}>
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setSelectedColor("bg-white")}>
            <X />
          </div>
          <textarea
            className="font-mono h-52 text-lg line-clamp-6 bg-transparent border-none focus:outline-none"
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center absolute bottom-4 w-full px-4 left-0">
            <p></p>
            {isContentPosted ? (
              <PencilIcon className="cursor-pointer" />
            ) : (
              <Check
                className="cursor-pointer"
                onClick={handlePostData}
              />
            )}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-5 m-5 justify-center">
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="w-full sm:w-64 h-72 rounded-lg bg-gray-200 justify-center"></div>
            ))
          : data.map((item) => (
              <Card
                data={item}
                key={item.id}
                handleDeleteData={handleDeleteData}
              />
            ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CardContainer;
