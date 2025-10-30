import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import ChatArea from "./chat/ChatArea";
import Topbar from "./components/Topbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [authUser] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/chat"
          element={
            authUser ? (
              <div className="flex flex-col h-screen bg-base-200 max-h-screen w-full overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <div className="flex-1 flex w-full max-h-[calc(100vh-3.5rem)] overflow-hidden flex-col md:flex-row">
                  <Sidebar
                    mobileOpen={sidebarOpen}
                    setMobileOpen={setSidebarOpen}
                  />
                  {/* Overlay for mobile drawer */}
                  {sidebarOpen && (
                    <div
                      className="fixed inset-0 z-40 bg-black/40 md:hidden"
                      onClick={() => setSidebarOpen(false)}
                    ></div>
                  )}
                  <main className="flex-1 flex flex-col min-w-0 max-w-full relative z-0">
                    <ChatArea />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/chat" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
