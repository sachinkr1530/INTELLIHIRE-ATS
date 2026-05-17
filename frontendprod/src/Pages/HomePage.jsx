import React, { useEffect, useState } from "react";
import { IoMdAddCircle, IoMdMenu, IoMdClose } from "react-icons/io";
import {
  FaPaintBrush,
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaPalette,
  FaMagic,
} from "react-icons/fa";
import { GiSpinningBlades } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import { context } from "../App";
import { useNavigate } from "react-router-dom";
import { MdQuestionMark } from "react-icons/md";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(context);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth");
  };
  const [isActive, setActiveTab] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavItem = ({ to, icon: Icon, children, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
          isActive
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-2xl transform scale-105"
            : "text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-lg"
        }`
      }
    >
      <div
        className={`transition-transform duration-300 ${
          isActive ? "transform scale-110" : "group-hover:scale-110"
        }`}
      >
        <Icon className="text-xl" />
      </div>
      <span className="font-semibold tracking-wide">{children}</span>

      {isActive && (
        <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
      )}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>

        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header
          className={`bg-slate-900/80 backdrop-blur-xl border-b transition-all duration-500 sticky top-0 z-50 ${
            scrolled ? "border-white/10 shadow-2xl" : "border-transparent"
          }`}
        >
          <div className="container mx-auto px-6">
            <nav className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <FaPaintBrush className="text-white text-2xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                    INTELLIHIRE -
                  </h1>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent tracking-tight">
                    ATS
                  </h1>
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-8">
                <div className="flex items-center gap-2">
                
                <NavItem to="/quiz" icon={MdQuestionMark}>
                    Practice Quiz
                  </NavItem>
                  <NavItem to="/" icon={FaHome}>
                    Dashboard
                  </NavItem>
                  <NavItem to="/profile" icon={FaUser}>
                    Profile
                  </NavItem>
                </div>

                <div className="flex items-center gap-6 ml-8 pl-8 border-l border-white/20">
                  {user && (
                    <div className="text-center">
                      <span className="text-sm text-gray-400 block">
                        Welcome back
                      </span>
                      <p className="font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                        {user.name || "User"}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl transition-all duration-300 font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 group"
                  >
                    <FaSignOutAlt className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-300 group"
              >
                {isMobileMenuOpen ? (
                  <IoMdClose className="text-2xl text-white transform group-hover:scale-110 transition-transform" />
                ) : (
                  <IoMdMenu className="text-2xl text-white transform group-hover:scale-110 transition-transform" />
                )}
              </button>
            </nav>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden bg-slate-900/95 backdrop-blur-2xl border-t border-white/10">
              <div className="container mx-auto px-6 py-6">
                <div className="flex flex-col gap-3">
                  <NavItem
                    to="/"
                    icon={FaHome}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavItem>
                  <NavItem
                    to="/profile"
                    icon={FaUser}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </NavItem>

                  {user && (
                    <div className="px-4 py-4 bg-white/5 rounded-2xl mt-4 border border-white/10">
                      <span className="text-sm text-gray-400 block">
                        Welcome back
                      </span>
                      <p className="font-bold text-green-400 text-lg">
                        {user.name || "User"}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl transition-all duration-300 font-semibold shadow-2xl mt-4"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 container mx-auto px-6 py-8">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 min-h-[calc(100vh-12rem)] p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <Outlet />
          </div>
        </main>

        <footer className="bg-slate-900/50 backdrop-blur-xl border-t border-white/10 py-8 mt-8">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaMagic className="text-purple-400 text-xl animate-pulse" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  INTELLIHIRE-ATS
                </span>
                <GiSpinningBlades className="text-cyan-400 text-xl animate-spin" />
              </div>
              <p className="text-gray-400 text-lg">
                Crafting professional resumes with style and innovation
              </p>
              <div className="flex items-center justify-center gap-6 mt-4 text-gray-500">
                <span>✨ Premium Templates</span>
                <span>•</span>
                <span>🎨 Custom Designs</span>
                <span>•</span>
                <span>⚡ Instant Export</span>
              </div>
              <p className="text-gray-500 mt-6">
                &copy; 2026 INTELLIHIRE-ATS. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
