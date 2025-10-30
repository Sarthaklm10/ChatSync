import React, { useEffect, useState } from "react";
import Logout from "../navigation/Logout.jsx";
import { MdOutlineGridView } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuSunMedium } from "react-icons/lu";
import { PiMoonLight } from "react-icons/pi";

function Topbar({ onMenuClick }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="w-full bg-base-100 border-b border-base-200 h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-2 md:hidden">
        {/* Professional App Grid Icon */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <MdOutlineGridView className="text-2xl" />
        </button>
        <div className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-2">
          {/* Minimal logo mark instead of text could go here */}
          CS
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <div className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          CS
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/profile"
          className="btn btn-sm btn-neutral"
          aria-label="Profile"
        >
          Profile
        </Link>
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <LuSunMedium className="text-xl" />
          ) : (
            <PiMoonLight className="text-xl" />
          )}
        </button>
        <div className="h-8 w-px bg-base-300" />
        <div className="flex items-center">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
