"use client";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const fetchPosts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=10");
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.products;
};

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: !loading && !!user,
  });

  const postCount = useMemo(() => data.length, [data]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Redirecting...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-2xl font-bold text-[#647FBC]">
            Welcome, {user.name}
          </h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleLogout}>Logout</Button>
          </motion.div>
        </motion.div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-[#647FBC] mb-4">
            Products (count: {postCount})
          </h2>

          {isLoading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load products.</p>
          ) : data.length > 0 ? (
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="space-y-3"
            >
              {data.map((product) => (
                <motion.li
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="p-4 bg-[#647FBC]/10 rounded-xl border border-[#647FBC]/20"
                >
                  <h3 className="font-bold text-[#647FBC]">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    {product.description}
                    <br />
                    Category: {product.category}
                    {" - $" + product.price}
                    <br />
                    Rating: {product.rating} ⭐
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
