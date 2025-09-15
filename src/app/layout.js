import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ReactQueryProvider } from "../lib/react-query";
import Navbar from "../components/ui/navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Next.js Demo",
  description: "TanStack + Context + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReactQueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="pt-14">{children}</main>
            <Toaster position="top-right"
              toastOptions={{
                style: {  background: "#363636", color: "#fff", marginTop: "60px", height: "48px" },
              }}
             reverseOrder={false} />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
