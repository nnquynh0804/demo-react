"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center"
      >
        <h1 className="text-2xl font-bold text-[#647FBC] mb-4">User Profile</h1>
        
        <div className="space-y-3 text-left text-gray-700">
          <p><span className="font-semibold ">Username:</span> {user.name}</p>
          {/* Anh có thể bổ sung thêm email, role... nếu muốn */}
        </div>
      </motion.div>
    </div>
  );
}
