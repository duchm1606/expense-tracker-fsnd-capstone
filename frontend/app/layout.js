import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker by Duc HoangMinh",
  description: "FSND Capstone project - Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
