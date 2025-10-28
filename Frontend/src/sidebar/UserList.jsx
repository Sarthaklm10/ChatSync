import React from "react";
import UserItem from "./UserItem";
import useUsers from "../context/useUsers";

function UserList() {
  const [allUsers, loading] = useUsers();

  return (
    <div className="h-full flex flex-col bg-base-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 bg-base-300 border-b border-base-content/10">
        <h2 className="text-lg font-semibold text-base-content">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {allUsers.length > 0 ? (
          allUsers.map((user, index) => (
            <UserItem key={user._id || index} user={user} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full p-6">
            <p className="text-base-content/60 text-center">
              No conversations yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
