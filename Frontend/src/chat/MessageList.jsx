import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import useMessages from "../context/useMessages.js";
import Loading from "../components/Loading.jsx";
import useSocketMessages from "../context/useSocketMessages.js";
function MessageList() {
  const { loading, messages } = useMessages();
  useSocketMessages(); // listing incoming messages

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2">
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <MessageBubble message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-base-content/60 text-lg">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default MessageList;
