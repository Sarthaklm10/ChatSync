import React from "react";
import Search from "./Search";
import Users from "./Users";

function Left() {
  return (
    <div className="w-[30%] bg-base-300 text-base-content border-r border-base-200 flex flex-col h-full">
      <div className="p-6 pb-4">
        <h1 className="font-bold text-3xl text-base-content">Chats</h1>
      </div>
      <div className="px-4 pb-4">
        <Search />
      </div>
      <div className="flex-1 overflow-hidden px-2">
        <Users />
      </div>
    </div>
  );
}

export default Left;
