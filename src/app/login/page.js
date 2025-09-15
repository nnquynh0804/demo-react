"use client";
import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";

function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleLogin = useCallback(() => {
    login("User");
  }, [login]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-[#647FBC] mb-6">Welcome Back</h1>
        <p className="text-gray-500 mb-8">Login to continue</p>
        <Button onClick={handleLogin} className="w-full">Login</Button>
      </div>
    </div>
  );
}

export default React.memo(LoginPage);
