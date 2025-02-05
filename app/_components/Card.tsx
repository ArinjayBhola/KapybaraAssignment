"use client";

import axios from "axios";
import { Calendar, Check, Loader2, PencilIcon, Trash, X } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";

interface CardData {
  id: number;
  content: string;
  bgColor: string;
  dueDate?: Date | null;
}

interface FunctionType {
  (id: number): void;
}

const Card = ({ data, handleDeleteData }: { data: CardData; handleDeleteData: FunctionType }) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(data.content);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDueDate, setIsDueDate] = useState<Date | null>(null);

  const handleEditData = async () => {
    if (content === data.content) {
      toast("No changes detected");
      setEdit(false);
      return;
    }
    setIsLoading(true);
    try {
      await axios.put("/api/edit-note", {
        id: data.id,
        content: content,
        dueDate: isDueDate,
      });

      toast("Content updated successfully");
    } catch (error) {
      console.log(error);
      toast("Some error occurred");
    } finally {
      setIsLoading(false);
      setEdit(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    handleDeleteData(id);
  };

  return (
    <>
      <div
        className={`flex flex-col rounded-lg ${data.bgColor} shadow-lg p-4 m-4 h-72 w-full sm:w-60 md:w-72 lg:w-80 relative`}>
        <div
          className="font-mono text-lg line-clamp-6 cursor-pointer"
          onClick={() => setIsModalOpen(true)}>
          {content}
        </div>

        <div className="flex justify-between items-center absolute bottom-4 w-full px-4 left-0">
          <p>
            {isDeleting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash
                className={`cursor-pointer ${isDeleting ? "text-gray-400" : "text-black"}`}
                onClick={() => !isDeleting && handleDelete(data.id)}
              />
            )}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className={`flex flex-col rounded-lg ${data.bgColor} shadow-lg p-6 h-auto w-[80%] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] bg-opacity-90 transition-opacity duration-300 ease-in-out relative`}>
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsModalOpen(false)}>
              <X />
            </div>

            {edit ? (
              <textarea
                className="font-mono h-96 text-lg line-clamp-6 bg-transparent border-none focus:outline-none w-full"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            ) : (
              <div className="font-mono h-96 text-lg line-clamp-6 bg-transparent border-none focus:outline-none w-full">
                {content}
              </div>
            )}

            <div className="flex justify-between items-center absolute bottom-4 w-full px-4 left-0">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5 text-gray-600 hidden md:inline-block" />
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <p className="font-mono font-semibold sm:mr-2">Due Date:</p>
                  <DatePicker
                    selected={data.dueDate || new Date()}
                    onChange={(date) => setIsDueDate(date)}
                    className="p-2 border border-gray-300 rounded-md text-gray-700 w-full sm:w-60 focus:outline-none"
                    placeholderText="Select Date"
                  />
                </div>
              </div>

              <Trash
                className={`hidden md:inline cursor-pointer ${isDeleting ? "text-gray-400" : "text-black"}`}
                onClick={() => !isDeleting && handleDelete(data.id)}
              />
              {edit ? (
                isLoading ? (
                  <Loader2 className="animate-spin text-black" />
                ) : (
                  <Check
                    className="cursor-pointer text-black"
                    onClick={() => !isLoading && handleEditData()}
                  />
                )
              ) : (
                <PencilIcon
                  className="cursor-pointer"
                  onClick={() => setEdit(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Card;
