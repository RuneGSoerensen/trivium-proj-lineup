import "./globals.css";
import Image from "next/image.js";
import { NavbarProvider, NavigationBottom } from "@/utils/navbarContext.js";
import Navbar from "@/comps/Navbar/Navbar.jsx";
import Navigation from "@/comps/navigation/navigation";
import { AuthGuard } from "./components/AuthGuard";

export const metadata = {
  title: "LineUp",
  description: "Music collaboration platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lineup-light">
      <body className="overflow-x-hidden overflow-y-auto hide-scrollbar">
        <AuthGuard>
          <NavbarProvider>
            <NavigationBottom>
              <Navbar />
              <main className="app-main">{children}</main>
              <Navigation />
            </NavigationBottom>
          </NavbarProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
