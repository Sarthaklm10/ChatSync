import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
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
    ? "bg-primary text-white shadow-lg"
    : "bg-base-300 text-base-content shadow-md";

  return (
    <div className="p-4">
      <div className={`chat ${messageClasses}`}>
        <div
          className={`chat-bubble ${bubbleClasses} hover:shadow-xl transition-shadow duration-200 rounded-2xl`}
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

export default Message;
