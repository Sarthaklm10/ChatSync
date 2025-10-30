import React, { useEffect, useState } from "react";
import useConversation from "../store/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

function ChatHeader() {
  const { selectedConversation } = useConversation();
  const { onlineUsers, socket } = useSocketContext();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!socket || !selectedConversation?._id) return;
    const handleTyping = ({ from }) => {
      if (from === selectedConversation._id) setIsTyping(true);
    };
    const handleStopTyping = ({ from }) => {
      if (from === selectedConversation._id) setIsTyping(false);
    };
    const timeoutClear = () => setIsTyping(false);

    socket.on("userTyping", handleTyping);
    socket.on("userStopTyping", handleStopTyping);
    // Safety auto-clear after 2s
    let timer;
    if (isTyping) {
      clearTimeout(timer);
      timer = setTimeout(timeoutClear, 2000);
    }
    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStopTyping", handleStopTyping);
      if (timer) clearTimeout(timer);
    };
  }, [socket, selectedConversation, isTyping]);

  const getOnlineStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const statusColor =
    getOnlineStatus(selectedConversation._id) === "Online"
      ? "text-success"
      : "text-base-content/60";

  return (
    <div className="flex items-center gap-2 md:gap-4 p-3 md:p-6 bg-base-100 border-b border-base-300 shadow-sm w-full min-w-0">
      {/* Avatar */}
      <div
        className={`avatar${
          getOnlineStatus(selectedConversation._id) === "Online"
            ? " online"
            : ""
        }`}
      >
        {selectedConversation.avatar ? (
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full ring-2 ring-offset-2 ring-base-200 shadow-md overflow-hidden">
            <img
              src={selectedConversation.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center ring-2 ring-offset-2 ring-base-200 shadow-md">
            <span className="font-semibold text-base md:text-lg">
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
        )}
      </div>
      {/* Name/status */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base md:text-xl font-semibold text-base-content truncate">
          {selectedConversation.fullname ||
            selectedConversation.name ||
            selectedConversation.email}
        </h1>
        <span className={`text-xs md:text-sm ${statusColor}`}>
          {isTyping ? "Typing…" : getOnlineStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default ChatHeader;
