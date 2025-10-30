import React from "react";
import useConversation from "../store/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

function UserItem({ user, setMobileOpen }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  const handleUserSelect = () => {
    setSelectedConversation(user);
    if (setMobileOpen) setMobileOpen(false); // Auto-close sidebar on mobile after selection
  };

  return (
    <div
      className={`cursor-pointer transition-all duration-200 mx-2 my-1 rounded-lg ${
        isSelected
          ? "bg-primary/20 border-l-4 border-primary shadow-md"
          : "hover:bg-base-200/60 hover:shadow-sm"
      }`}
      onClick={handleUserSelect}
    >
      <div className="flex items-center gap-4 p-3">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          {user.avatar ? (
            <div className="w-12 h-12 rounded-full ring-2 ring-offset-2 ring-base-200 shadow-sm overflow-hidden">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center ring-2 ring-offset-2 ring-base-200 shadow-sm">
              <span className="font-semibold text-sm">
                {(user.fullname || user.name || user.email || "?")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
          )}
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
