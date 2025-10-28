import React, { useEffect, useState } from "react";
import Logout from "../home/left1/Logout.jsx";

function Topbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="w-full bg-base-100 border-b border-base-200 h-14 flex items-center justify-between px-4">
      <div className="text-lg font-semibold">ChatApp</div>
      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="btn btn-sm">
          {theme === "dark" ? "Light" : "Dark"}
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
