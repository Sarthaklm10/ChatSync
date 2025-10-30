import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setAuthUser(undefined); // Clear auth context immediately
      setLoading(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in Logout", error);
      setLoading(false);
      toast.error("Error in logging out");
    }
  };
  return (
    <button
      title="Logout"
      onClick={handleLogout}
      className="btn btn-sm"
      disabled={loading}
    >
      <TbLogout2 className="text-xl" />
    </button>
  );
}
export default Logout;
