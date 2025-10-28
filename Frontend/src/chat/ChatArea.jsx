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
    <div className="w-full bg-base-200 text-base-content flex flex-col h-full overflow-hidden">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <ChatHeader />
          <MessageList />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default ChatArea;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-base-content">
          Welcome <span className="text-primary">{authUser.user.fullname}</span>
        </h1>
        <p className="text-base-content/70 text-lg">
          No chat selected. Please start a conversation by selecting a contact
          from your list.
        </p>
      </div>
    </div>
  );
};
