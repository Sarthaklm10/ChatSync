import React from "react";
import useConversation from "../store/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

function UserProfileSheet() {
  const { profileUser, setProfileUser, setSelectedConversation } =
    useConversation();
  const { onlineUsers } = useSocketContext();

  if (!profileUser) return null;

  const isOnline = onlineUsers.includes(profileUser._id);

  const startChat = () => {
    setSelectedConversation(profileUser);
    setProfileUser(null);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-start md:items-center justify-center p-3 md:p-6">
      {/* backdrop only on right area; still overlays chat column */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setProfileUser(null)}
      />
      <div className="relative bg-base-100 border border-base-200 rounded-2xl shadow-xl w-full max-w-md mx-auto overflow-hidden">
        <div className="p-5 md:p-6 flex items-center gap-4 border-b border-base-200">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            {profileUser.avatar ? (
              <div className="w-16 h-16 rounded-full ring-2 ring-offset-2 ring-base-200 overflow-hidden">
                <img
                  src={profileUser.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center ring-2 ring-offset-2 ring-base-200">
                <span className="font-semibold text-lg">
                  {(profileUser.fullname || profileUser.email || "?")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-base-content truncate">
              {profileUser.fullname || profileUser.name || profileUser.email}
            </h3>
            <p className="text-sm text-base-content/70 truncate">
              {profileUser.email}
            </p>
            <p
              className={`text-xs ${
                isOnline ? "text-success" : "text-base-content/60"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="p-5 md:p-6 space-y-3">
          <button className="btn btn-primary w-full" onClick={startChat}>
            Message
          </button>
          <button className="btn w-full" onClick={() => setProfileUser(null)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSheet;
