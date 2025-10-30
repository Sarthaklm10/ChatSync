import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import avatar1 from "../assets/userspfp/user1.png";
import avatar2 from "../assets/userspfp/user2.png";
import avatar3 from "../assets/userspfp/user3.png";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";

function Profile() {
  const [authUser, setAuthUser] = useAuth();
  const [fullname, setFullname] = useState(authUser?.user?.fullname || "");
  const [email, setEmail] = useState(authUser?.user?.email || "");
  const [avatar, setAvatar] = useState(authUser?.user?.avatar || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleAvatarUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.patch("/api/user/profile", {
        fullname,
        avatar,
        email,
      });
      const updated = res.data;
      const newAuth = { ...(authUser || {}), user: updated.user };
      setAuthUser(newAuth);
      localStorage.setItem("ChatApp", JSON.stringify(newAuth));
      toast.success("Profile updated");
      navigate("/chat");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-sky-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-base-100 border border-base-200 rounded-2xl shadow-md px-6 py-6 md:px-8 md:py-8 space-y-4"
      >
        <div className="flex items-center justify-center mb-2">
          <HiOutlineUserCircle className="text-4xl text-primary" />
        </div>
        <p className="text-center text-sm text-base-content/70">
          Edit your profile
        </p>

        {/* Avatar selector */}
        <div>
          <p className="text-sm mb-2">Avatar</p>
          <div className="flex items-center gap-3 flex-wrap">
            {[avatar1, avatar2, avatar3].map((av) => (
              <button
                type="button"
                key={av}
                onClick={() => setAvatar(av)}
                className={`rounded-full p-1 border ${
                  avatar === av ? "border-primary" : "border-base-300"
                }`}
              >
                <img
                  src={av}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </button>
            ))}
            <label className="rounded-full p-1 border border-base-300 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <div className="w-14 h-14 rounded-full bg-base-200 flex items-center justify-center text-xs">
                Upload
              </div>
            </label>
            {avatar && (
              <div className="rounded-full p-1 border border-primary ml-1">
                <img
                  src={avatar}
                  alt="selected avatar preview"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Fullname */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </label>

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className={`btn btn-primary w-full ${saving ? "opacity-60" : ""}`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
