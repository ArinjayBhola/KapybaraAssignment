"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import useColorStore from "@/store/useColorStore";
import { Calendar, Check, Loader2, X } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useColorSearch from "@/store/useColorSearch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jwt from "jsonwebtoken";

interface CardData {
  id: number;
  content: string;
  bgColor: string;
  dueDate?: Date | null;
}

const CardContainer = () => {
  const [content, setContent] = useState("");
  const [data, setData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedColor = useColorStore((state) => state.selectedColor);
  const setSelectedColor = useColorStore((state) => state.setSelectedColor);
  const intialColor = useColorSearch((state) => state.intialColor);
  const [refresh, setRefresh] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [postingData, setPostingData] = useState(false);
  const [isToken, setIsToken] = useState<string | null>(null);

  useEffect(() => {
    const decode = isToken ? jwt.decode(isToken) : null;
    axios
      .post("/api/get-note", {
        userId: decode,
      })
      .then((res) => {
        if (intialColor === "bg-gray-500") {
          setData(res.data.message);
        } else {
          const noteData = res.data.message.filter((item: CardData) => item.bgColor === intialColor);
          setData(noteData);
        }

        const firstNote = res.data.message[0];
        setDueDate(firstNote?.dueDate ? new Date(firstNote.dueDate) : new Date());

        setIsLoading(false);
      });
  }, [selectedColor, intialColor, refresh, isToken]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsToken(token);
  }, []);

  const handlePostData = async () => {
    setPostingData(true);
    if (content === "") {
      toast("Content can't be empty");
      return;
    }
    const decode = isToken ? jwt.decode(isToken) : null;
    try {
      await axios.post("/api/create-note", {
        content: content,
        bgColor: selectedColor,
        userId: decode,
        dueDate: dueDate,
      });
      toast("Notes created successfully");

      setSelectedColor("bg-white");
    } catch (error) {
      console.log(error);
      toast("Some error occured");
    } finally {
      setPostingData(false);
    }
  };

  const handleDeleteData = async (id: number) => {
    try {
      await axios.delete(`/api/delete-note?id=${id}`);
      setRefresh(true);
      toast("Notes Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast("Some error occured");
    }
  };

  return (
    <div className="relative w-full">
      {selectedColor !== "bg-white" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className={`flex flex-col rounded-lg ${selectedColor} shadow-lg p-6 h-auto w-[80%] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] bg-opacity-90 transition-opacity duration-300 ease-in-out relative`}>
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setSelectedColor("bg-white")}>
              <X />
            </div>
            <textarea
              className="font-mono h-96 text-lg line-clamp-6 bg-transparent border-none focus:outline-none w-full"
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-between items-center absolute bottom-4 w-full px-4 left-0">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Calendar className="w-5 h-5 text-gray-600 hidden md:inline-block" />
                <p className="flex flex-col sm:flex-row gap-2 sm:items-center font-mono">Due Date:</p>
                <DatePicker
                  selected={dueDate || new Date()}
                  onChange={(date) => setDueDate(date)}
                  className="p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                  placeholderText="Select Date"
                />
              </div>
              {postingData ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Check
                  className="cursor-pointer"
                  onClick={handlePostData}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5 m-5 justify-center">
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="w-full sm:w-64 md:w-72 lg:w-80 h-72 rounded-lg bg-gray-200 justify-center"></div>
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
