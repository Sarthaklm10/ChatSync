import React from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";

function Sidebar({ mobileOpen, setMobileOpen }) {
  // Sidebar is a drawer on mobile (<md:), fixed column on desktop (md:up)
  // Hidden on mobile unless open
  return (
    <aside
      className={[
        "transition-transform duration-300 bg-base-300 text-base-content flex flex-col h-full z-50 md:relative md:translate-x-0 md:w-80 w-11/12 max-w-xs",
        mobileOpen
          ? "fixed inset-0 left-0 top-0 shadow-xl translate-x-0"
          : "-translate-x-full fixed md:relative",
        "md:border-r border-base-200",
      ].join(" ")}
      style={{ minWidth: 0 }}
      // On mobile, aria/role/props for screen readers, closeable
      tabIndex={-1}
      aria-modal={!!mobileOpen}
      role="dialog"
      onClick={(e) => e.stopPropagation()}
    >
      {/* SearchBar always at top, sticky on desktop, flushed on mobile */}
      <div className="sticky top-0 z-20 bg-base-300 px-4 pt-6 pb-4 border-b border-base-200 shadow-sm">
        <SearchBar />
      </div>
      <div
        className="flex-1 overflow-y-auto px-2 pt-2"
        style={{ minHeight: 0 }}
      >
        <UserList setMobileOpen={setMobileOpen} />
      </div>
    </aside>
  );
}

export default Sidebar;
