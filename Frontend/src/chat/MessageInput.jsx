import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../context/useSendMessage.js";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../store/useConversation.js";

function MessageInput() {
  const [messageText, setMessageText] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const typingTimeoutRef = useRef(null);

  const notifyTyping = () => {
    if (!socket || !selectedConversation?._id) return;
    socket.emit("typing", {
      to: selectedConversation._id,
      from: JSON.parse(localStorage.getItem("ChatApp")).user._id,
    });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        to: selectedConversation._id,
        from: JSON.parse(localStorage.getItem("ChatApp")).user._id,
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    await sendMessages(messageText.trim());
    setMessageText("");
    if (socket && selectedConversation?._id) {
      socket.emit("stopTyping", {
        to: selectedConversation._id,
        from: JSON.parse(localStorage.getItem("ChatApp")).user._id,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-2 py-2 md:px-4 md:py-3 bg-base-100 border-t border-base-300"
      style={{ position: "relative" }}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
              notifyTyping();
            }}
            className="w-full px-3 py-2 md:px-4 md:py-3 bg-base-200 border border-base-content/20 rounded-xl outline-none text-base-content placeholder:text-base-content/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-base md:text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={!messageText.trim() || loading}
          className={`btn btn-primary btn-circle min-h-[2.5rem] min-w-[2.5rem] md:min-h-[3rem] md:min-w-[3rem] ${
            !messageText.trim() || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg"
          } transition-all duration-200`}
          aria-label="Send"
        >
          <IoSend className="text-xl md:text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
