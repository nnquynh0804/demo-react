"use client";
import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { toast } from "react-hot-toast";

function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleLogin = useCallback(() => {
    if (username === "quynh" && password === "1") {
      login({ name: username });
      toast.success("Đăng nhập thành công!");
    } else {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  }, [username, password, login]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-2 text-[#647FBC]">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Login to continue</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-[#647FBC] outline-none text-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-[#647FBC] outline-none text-gray-700"
        />

        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
}

export default React.memo(LoginPage);
