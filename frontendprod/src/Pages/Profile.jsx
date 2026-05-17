import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import axios from "axios";
import { FaTruckLoading } from "react-icons/fa";

const Profile = () => {
  const [userdata, setUserData] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8080/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(res.data.user);
  };

  return (
    <>
      {userdata ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
          <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <p className="text-sm text-gray-200">Manage your account</p>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-6 py-8 gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg shadow-md">
                  {/* Placeholder Initial */}
                  {userdata.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition">
                  ✎
                </button>
              </div>

              {/* Name Input */}
              <div className="w-full">
                <label className="block text-gray-300 text-sm mb-2">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userdata.name}
                  onChange={() => {}}
                />
              </div>

              {/* Resume Count */}
              <div className="w-full bg-gray-800 rounded-lg p-4 flex justify-between items-center border border-gray-700">
                <span className="text-gray-300">Resume Count</span>
                <span className="text-lg font-semibold text-white">
                  {userdata.resumeCount || 0}
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => {
                  console.log("USER DELETE");
                }}
                className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center text-blue-400 text-4xl">
          <FaTruckLoading className="animate-spin" />
        </div>
      )}
    </>
  );
};

export default Profile;
