import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useUsers from "../context/useUsers";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers] = useUsers();
  const { setSelectedConversation } = useConversation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const foundUser = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundUser) {
      setSelectedConversation(foundUser);
      setSearchTerm("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2 bg-base-100 border border-base-200 rounded-2xl shadow-md px-4 py-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-base-100 text-base-content placeholder:text-base-content/50 outline-none rounded-xl"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary btn-circle btn-sm self-center shadow-none"
          title="Search"
        >
          <FaSearch className="text-base" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
