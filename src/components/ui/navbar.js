"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./Button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công!");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#647FBC] to-[#91ADDC] text-white shadow-lg z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
        >
          Demo App
        </Link>

        <div className="flex items-center space-x-4">
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
              <Button
                onClick={handleLogout}
                className="bg-[#647FBC] text-white px-4 py-1 rounded-lg shadow hover:bg-gray-100 transition"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-[#647FBC] text-white px-4 py-1 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
