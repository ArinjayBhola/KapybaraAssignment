"use client";

import axios from "axios";
import { Check, PencilIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface CardData {
  id: number;
  content: string;
  bgColor: string;
}

interface FunctionType {
  (id: number): void;
}

const Card = ({ data, handleDeleteData }: { data: CardData; handleDeleteData: FunctionType }) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(data.content);

  const handleEditData = async () => {
    if (content === data.content) {
      toast("No changes detected");
      setEdit(false);
      return;
    }
    try {
      await axios.put("/api/edit-note", {
        id: data.id,
        content: content,
      });

      toast("Content updated successfully");
    } catch (error) {
      console.log(error);
      toast("Some error occured");
    } finally {
      setEdit(false);
    }
  };

  return (
    <div className={`flex flex-col rounded-lg ${data.bgColor} shadow-lg p-4 m-4 h-72 w-full sm:w-60 relative`}>
      {edit ? (
        <textarea
          className="font-mono h-56 text-lg line-clamp-6 bg-transparent border-none focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className="font-mono text-lg line-clamp-6">{content}</div>
      )}

      <div className="flex justify-between items-center absolute bottom-4 w-full px-4 left-0">
        <p>
          <Trash
            className="cursor-pointer"
            onClick={() => handleDeleteData(data.id)}
          />
        </p>
        {edit ? (
          <Check
            className="cursor-pointer"
            onClick={handleEditData}
          />
        ) : (
          <PencilIcon
            className="cursor-pointer"
            onClick={() => setEdit(true)}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
