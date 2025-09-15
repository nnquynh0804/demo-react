"use client";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-5 py-2.5 rounded-2xl font-medium text-white bg-[#647FBC] hover:bg-[#4f65a0] shadow-md transition ${className}`}
    >
      {children}
    </button>
  );
}
