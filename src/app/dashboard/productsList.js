"use client";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";

export default function ProductsList({ data, isLoading, error, addToCart }) {
  if (isLoading) return <p className="text-gray-500">Loading products...</p>;
  if (error) return <p className="text-red-500">Failed to load products.</p>;
  if (!data?.length) return <p className="text-gray-500">No products found.</p>;

  return (
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
          className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
        >
            <div className="flex justify mb-3">
            <img src={product.thumbnail} alt={product.title} className="w-20 h-18 object-cover rounded-md mb-2" />
          <h3 className="font-bold text-[#647FBC] text-lg mb-1 mt-4 ml-4">
            {product.title}
          </h3>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Category: <span className="italic">{product.category}</span>
          </p>


          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold text-[#2F4B8F]">
              ${product.price}
            </span>
            <span className="text-sm text-yellow-600">
              ⭐ {product.rating}
            </span>
          </div>


          <Button
            onClick={() => addToCart(product)}
            className="w-full bg-[#647FBC] hover:bg-[#4b5f99] text-white rounded-lg"
          >
            Add to Cart
          </Button>
        </motion.li>
      ))}
    </motion.ul>
  );
}
