import React from "react";
import { useAuth } from "../context/AuthProvider";

function MessageBubble({ message }) {
  const [authUser] = useAuth();
  const isOwnMessage = message.senderId === authUser.user._id;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const messageClasses = isOwnMessage ? "chat-end" : "chat-start";

  const bubbleClasses = isOwnMessage
    ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg"
    : "bg-base-300 text-base-content shadow-md";

  return (
    <div className="py-1 md:py-2 animate-fade-in-up">
      <div className={`chat ${messageClasses}`}>
        <div
          className={`chat-bubble ${bubbleClasses} hover:shadow-xl transition-shadow duration-200 rounded-2xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base max-w-full sm:max-w-md md:max-w-lg break-words`}
        >
          {message.message}
        </div>
        <div className="chat-footer opacity-70 text-xs mt-1">
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
