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
        <header className="w-full flex justify-center py-4">
          <Image
            src="/images/lineup-logo-big.png"
            alt="Lineup Logo"
            width={150}
            height={50}
          />
        </header>
      <body className="trvm-page mockup-phone bg-muted flex flex-col min-h-screen">
          {children}
      </body>
        <footer className="w-full flex justify-center py-4">
          {/* <Navigation /> */}
        </footer>
    </html>
  );
}
