import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [messageText, setMessageText] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    await sendMessages(messageText.trim());
    setMessageText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-base-100 border-t border-base-300"
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full px-4 py-3 bg-base-200 border border-base-content/20 rounded-xl outline-none text-base-content placeholder:text-base-content/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={!messageText.trim() || loading}
          className={`btn btn-primary btn-circle ${
            !messageText.trim() || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg"
          } transition-all duration-200`}
        >
          <IoSend className="text-xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
