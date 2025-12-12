import "./globals.css";
import { NavbarProvider, NavigationBottom } from "@/utils/navbarContext.js";
import Navbar from "@/comps/Navbar/Navbar.jsx";
import Navigation from "@/comps/navigation/navigation";
import DesktopSidebar from "@/comps/navigation/DesktopSidebar";
import RightSideMenu from "@/comps/navigation/RightSideMenu";
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
              {/* Desktop Sidebar - Hidden on mobile/tablet */}

              {/* Right Side Menu - Hidden on mobile/tablet */}

              {/* Top Navbar - Visible on mobile/tablet, hidden on desktop */}
              <Navbar />
              <div className="flex  lg:pt-0">
                <DesktopSidebar />
                {/* Main Content */}
                <main className="app-main">{children}</main>
                <RightSideMenu />
                {/* Bottom Navigation - Hidden on desktop */}
              </div>
              <Navigation />
            </NavigationBottom>
          </NavbarProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
