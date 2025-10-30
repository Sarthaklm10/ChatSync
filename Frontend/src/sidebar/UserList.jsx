import React from "react";
import UserItem from "./UserItem";
import useUsers from "../context/useUsers";

function UserList({ setMobileOpen }) {
  const [allUsers, loading] = useUsers();

  return (
    <div className="flex flex-col gap-2 pb-2">
      {allUsers.length > 0 ? (
        allUsers.map((user, index) => (
          <UserItem
            key={user._id || index}
            user={user}
            setMobileOpen={setMobileOpen}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full p-6">
          <p className="text-base-content/60 text-center">
            No conversations yet
          </p>
        </div>
      )}
    </div>
  );
}

export default UserList;
