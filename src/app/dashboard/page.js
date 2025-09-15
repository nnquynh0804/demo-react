"use client";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import ProductsList from "./productsList";
import Cart from "./cart";

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

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const postCount = useMemo(() => data.length, [data]);
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

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
  const addToCart = (product) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
  toast.success(`${product.title} added to cart!`);
};


const removeFromCart = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id));
  toast.success("Removed from cart");
};
const increaseQty = (id) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQty = (id) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0) // xóa nếu qty = 0
  );
};


  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-2xl font-bold text-[#647FBC]">
            Welcome, {user.name}
          </h1>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-[#647FBC] mb-4">
            Products (count: {postCount})
          </h2>
          <ProductsList
            data={data}
            isLoading={isLoading}
            error={error}
            addToCart={addToCart}
          />
        </div>
      </div>

        <button
        onClick={() => setShowCart((prev) => !prev)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#647FBC] text-white text-2xl flex items-center justify-center shadow-xl hover:bg-[#4b5f99] transition-all duration-200 z-[100] mt-20"
        >
        🛒
        {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
            </span>
        )}
        </button>


      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-4"
          >
            <Cart
              cart={cart}
              totalPrice={totalPrice}
              removeFromCart={removeFromCart}
               increaseQty={increaseQty}
                decreaseQty={decreaseQty}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
