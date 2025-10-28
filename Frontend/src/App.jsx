import React from "react";
import Sidebar from "./sidebar/Sidebar";
import ChatArea from "./chat/ChatArea";
import Topbar from "./components/Topbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Logout from "./navigation/Logout";

import { Navigate, Route, Routes } from "react-router-dom";
function App() {
  const [authUser] = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex flex-col h-screen">
                <Topbar />
                <div className="flex flex-1">
                  <Sidebar />
                  <ChatArea />
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
