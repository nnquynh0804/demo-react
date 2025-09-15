import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReactQueryProvider } from "@/lib/react-query";

export const metadata = {
  title: "Next.js Demo",
  description: "TanStack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
