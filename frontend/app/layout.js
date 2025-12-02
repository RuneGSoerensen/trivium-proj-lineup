import "./globals.css";
import Image from "next/image.js";
import { NavbarProvider } from "@/utils/navbarContext.js";
import Navbar from "@/comps/Navbar/Navbar.jsx";

export const metadata = {
  title: "LineUp",
  description: "Music collaboration platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lineup-light">
      <body className="overflow-x-hidden overflow-y-auto">
        <NavbarProvider>
          <Navbar />
          <main className="app-main">{children}</main>
        </NavbarProvider>
      </body>
    </html>
  );
}
