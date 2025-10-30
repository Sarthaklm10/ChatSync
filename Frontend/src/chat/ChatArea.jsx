import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useConversation from "../store/useConversation.js";
import { useAuth } from "../context/AuthProvider.jsx";

function ChatArea() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="bg-base-200 text-base-content flex flex-col h-full w-full px-1 pt-1 md:px-8 md:py-4 overflow-x-hidden">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col h-full min-h-0 w-full">
          <ChatHeader />
          <div className="flex-1 min-h-0 w-full flex flex-col">
            <MessageList />
          </div>
          <div className="sticky bottom-0 left-0 w-full pb-[env(safe-area-inset-bottom)] bg-base-200 z-10">
            <MessageInput />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatArea;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <div className="flex-1 flex items-center justify-center py-6 md:p-8 bg-base-100">
      <div className="text-center max-w-md w-full px-2 py-5 md:p-8 bg-base-200 rounded-lg shadow-lg mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-base-content">
          Welcome,{" "}
          <span className="text-primary">{authUser.user.fullname}</span>!
        </h1>
        <p className="text-base-content/70 text-base md:text-lg mb-4 md:mb-6">
          Select a conversation to start messaging.
        </p>
        <div className="flex justify-center">
          <svg
            className="w-20 h-20 md:w-24 md:h-24 text-primary opacity-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
