"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./Button";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
  <motion.nav
  initial={{ y: -60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#647FBC] to-[#91ADDC] text-white shadow-lg z-50 h-18 w-full"
>
  <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between mt-1">
    <Link
      href="/"
      className="text-lg font-bold tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
    >
        Demo App
    </Link>

    {/* Menu */}
    <div className="flex items-center space-x-4 mt-2">
      {user ? (
        <>
        <Link
            href="/dashboard"
            className="px-3 py-1 rounded-md hover:bg-white/20 transition"
        >
        Dashboard
        </Link>
        <Link
        href="/profile"
        className="px-3 py-1 rounded-md hover:bg-white/20 transition"
        >
        Profile
        </Link>

        </>
      ) : (
        /*<Link
          href="/login"
          className="bg-white text-[#647FBC] px-4 py-1 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Login
        </Link>*/
        <div></div>
      )}
    </div>
  </div>
</motion.nav>

  );
}
