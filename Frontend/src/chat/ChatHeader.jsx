import React from "react";
import useConversation from "../store/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

function ChatHeader() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const statusColor =
    getOnlineStatus(selectedConversation._id) === "Online"
      ? "text-success"
      : "text-base-content/60";

  return (
    <div className="flex items-center gap-4 p-6 bg-base-100 border-b border-base-300 shadow-sm">
      <div className="avatar online">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center ring-2 ring-offset-2 ring-base-200 shadow-md">
          <span className="font-semibold text-lg">
            {(
              selectedConversation.fullname ||
              selectedConversation.name ||
              selectedConversation.email ||
              "?"
            )
              .charAt(0)
              .toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-base-content">
          {selectedConversation.fullname ||
            selectedConversation.name ||
            selectedConversation.email}
        </h1>
        <span className={`text-sm ${statusColor}`}>
          {getOnlineStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default ChatHeader;
