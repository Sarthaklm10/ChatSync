import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers] = useGetAllUsers();
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
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full px-4 py-3 bg-base-200 border border-base-content/20 rounded-xl outline-none text-base-content placeholder:text-base-content/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-circle hover:shadow-lg transition-shadow duration-200"
        >
          <FaSearch className="text-lg" />
        </button>
      </div>
    </form>
  );
}

export default Search;
