import React from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";

function Sidebar() {
  return (
    <div className="w-[30%] bg-base-300 text-base-content border-r border-base-200 flex flex-col h-full">
      <div className="p-6 pb-4">
        <h1 className="font-bold text-3xl text-base-content">Chats</h1>
      </div>
      <div className="px-4 pb-4">
        <SearchBar />
      </div>
      <div className="flex-1 overflow-hidden px-2">
        <UserList />
      </div>
    </div>
  );
}

export default Sidebar;
