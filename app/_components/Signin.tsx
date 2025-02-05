"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwt from "jsonwebtoken";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmitData = async () => {
    setLoading(true);
    if (!data.email || !data.password) {
      toast("Please fill in both email and password", { type: "error" });
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/sign-in", {
        email: data.email,
        password: data.password,
      });
      const id = response.data.id;
      const token = jwt.sign({ id }, "Secret");
      localStorage.setItem("token", token);
      toast("Welcome Back");
      router.push("/");
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
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Sign In</h1>
                <div className="text-sm text-gray-600">
                  Don&apos;t have an account?
                  <p
                    className="text-gray-600 underline cursor-pointer"
                    onClick={() => router.push("/sign-up")}>
                    Sign Up
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Email</div>
                  <input
                    type="text"
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
                  {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="invisible lg:visible">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ullam corrupti consequatur molestias
            temporibus deleniti nostrum officiis sapiente! Quo harum quasi tempore asperiores vero eum obcaecati impedit
            aliquid. Provident, cum?
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
