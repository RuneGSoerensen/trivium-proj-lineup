import Navigation from "./components/navigation/navigation.jsx";
import FlyonuiScript from "./components/FlyonuiScript";
import "./globals.css";
import Image from "next/image.js";

export const metadata = {
  title: "LineUp",
  description: "Music collaboration platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lineup-light">
      <FlyonuiScript />
      <body className="trvm-page min-h-screen">
        <header className="w-full flex flex-col">
          {/* Logo as temporary header*/}
          <div className="w-full flex justify-center py-2">
            <Image
              src="/images/lineup-logo-big.png"
              alt="Lineup Logo"
              width={150}
              height={50}
            />
          </div>

          {/* <Navbar /> */}
        </header>
        {children}
        <footer className="w-full flex justify-center py-4">
          {/* <Navigation /> */}
        </footer>
      </body>
    </html>
  );
}
