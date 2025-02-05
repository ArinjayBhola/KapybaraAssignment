"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwt from "jsonwebtoken";
import Image from "next/image";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmitData = async () => {
    setLoading(true);
    if (!data.email || !data.password || !data.name) {
      toast("Please fill in name, email and password", { type: "error" });
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/sign-up", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      const id = response.data.newUser.id;
      const token = jwt.sign({ id }, "Secret");
      localStorage.setItem("token", token);
      router.push("/");
      toast("Create your personalized notes by clicking plus icon");
    } catch (error) {
      console.error(error);
      toast("Some error occured", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <div className="min-h-screen flex justify-center items-center">
            <div className="p-8 rounded w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Create an Account</h1>
                <div className="text-sm text-gray-600">
                  Already have an account?
                  <p
                    className="text-gray-600 underline cursor-pointer"
                    onClick={() => router.push("/sign-in")}>
                    Sign In
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Name</div>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setData({
                        ...data,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Email</div>
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                    placeholder="Email"
                    onChange={(e) => {
                      setData({
                        ...data,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Password</div>
                  <input
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                    placeholder="Password"
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded focus:outline-none flex justify-center items-center"
                  onClick={handleSubmitData}
                  disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="invisible sm:visible flex items-center">
          <Image
            src={"/image.png"}
            alt=""
            width={500}
            height={500}
            className="w-full"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
