import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { useAuth } from "../context/AuthProvider";

function Landing() {
  const [authUser] = useAuth();

  return (
    <div
      className="min-h-screen w-full relative overflow-auto"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark tint overlay for strong contrast while preserving background */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4">
        <header className="w-full max-w-6xl flex items-center justify-between py-5 md:py-6">
          <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ChatSync
          </div>
          <div className="flex items-center gap-2">
            {authUser ? (
              <Link to="/chat" className="btn btn-primary">
                Enter App
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </header>

        <main className="w-full max-w-5xl text-center mt-8 md:mt-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-base-content">
            Simple. Fast. Real‑time Chat.
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-base-content/90 max-w-3xl mx-auto">
            ChatSync is a lightweight MERN + Socket.IO messenger built for
            clarity and speed. Secure auth, responsive design, and seamless
            real‑time messaging—no clutter.
          </p>
          <div className="mt-8 md:mt-10 flex items-center justify-center gap-3 md:gap-4">
            {authUser ? (
              <Link to="/chat" className="btn btn-primary btn-lg">
                Open Chat
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Create Account
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Feature cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <FeatureCard
              title="Real‑time"
              desc="Instant delivery via Socket.IO with sleek notifications."
            />
            <FeatureCard
              title="Secure"
              desc="JWT httpOnly cookies and modern CORS configuration."
            />
            <FeatureCard
              title="Responsive"
              desc="Polished UI for mobile and desktop with Tailwind + DaisyUI."
            />
          </div>

          {/* Additional section to create natural scroll and provide report-friendly copy */}
          <section className="mt-12 md:mt-16 text-left max-w-4xl mx-auto">
            <div className="bg-base-100/90 border border-base-200 rounded-2xl shadow-sm p-5 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-base-content">
                Built for Demos and Real Use
              </h2>
              <p className="mt-3 text-base-content/80">
                The app uses a clean MERN architecture with Socket.IO for
                realtime messaging. Authentication is handled with secure
                httpOnly cookies, and the UI is designed to be responsive and
                simple to explain in a report or live demo.
              </p>
            </div>
          </section>
        </main>

        <footer className="w-full max-w-6xl mt-14 md:mt-20 pb-8 text-center text-sm text-base-content/80">
          Built with MERN • Socket.IO • Tailwind • DaisyUI
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-base-100/95 backdrop-blur rounded-2xl p-5 md:p-6 border border-base-200 shadow-sm text-left">
      <h3 className="text-lg font-semibold text-base-content">{title}</h3>
      <p className="mt-2 text-sm text-base-content/80">{desc}</p>
    </div>
  );
}

export default Landing;
