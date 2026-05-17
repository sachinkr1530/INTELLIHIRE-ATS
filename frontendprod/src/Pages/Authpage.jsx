import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaPaintBrush } from "react-icons/fa";
import { IoIosKey } from "react-icons/io";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import { context } from "../App";
import { useNavigate } from "react-router-dom";

const Authpage = () => {
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaPaintBrush className="text-4xl text-white mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              INTELLIHIRE-ATS
            </h1>
          </div>
          <p className="text-slate-300 text-lg">
            Craft Your Professional Story
          </p>
        </div>

        {/* Auth Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 flex items-center justify-center gap-2 p-4 font-semibold transition-all duration-300 border-b-2 ${
                activeTab === "login"
                  ? "text-white border-purple-400 bg-white/10"
                  : "text-slate-300 border-transparent hover:text-white hover:border-purple-400"
              }`}
            >
              <IoIosKey className="text-lg" />
              LOGIN
            </button>

            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 flex items-center justify-center gap-2 p-4 font-semibold transition-all duration-300 border-b-2 ${
                activeTab === "signup"
                  ? "text-white border-purple-400 bg-white/10"
                  : "text-slate-300 border-transparent hover:text-white hover:border-purple-400"
              }`}
            >
              <FaUser className="text-lg" />
              SIGN UP
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-6">
            {/* Login Tab */}
            <div
              className={`transition-all duration-300 ${
                activeTab === "login" ? "block animate-fade-in" : "hidden"
              }`}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-slate-300">
                  Sign in to continue crafting your story
                </p>
              </div>
              <Login />
            </div>

            {/* SignUp Tab */}
            <div
              className={`transition-all duration-300 ${
                activeTab === "signup" ? "block animate-fade-in" : "hidden"
              }`}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Join Us</h2>
                <p className="text-slate-300">
                  Start your professional journey today
                </p>
              </div>
              <SignUp />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            Create beautiful resumes that stand out
          </p>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Authpage;
