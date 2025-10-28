import React from "react";
import useConversation from "../store/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

function UserItem({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  const handleUserSelect = () => {
    setSelectedConversation(user);
  };

  return (
    <div
      className={`cursor-pointer transition-all duration-200 mx-2 my-1 rounded-lg ${
        isSelected
          ? "bg-primary/15 border-l-4 border-primary shadow-sm"
          : "hover:bg-base-100 hover:shadow-sm"
      }`}
      onClick={handleUserSelect}
    >
      <div className="flex items-center gap-4 p-4">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center ring-2 ring-offset-2 ring-base-200 shadow-sm">
            <span className="font-semibold text-sm">
              {(user.fullname || user.name || user.email || "?")
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base-content truncate">
            {user.fullname || user.name || user.email}
          </h3>
          <p className="text-sm text-base-content/60 truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
