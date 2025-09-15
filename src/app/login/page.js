"use client";
import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { toast } from "react-hot-toast";

function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleLogin = useCallback(() => {
    login("User");
    toast.success("Đăng nhập thành công!");
  }, [login]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-2 text-[#647FBC]">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Login to continue</p>
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
}

export default React.memo(LoginPage);
