import Navigation from "./components/navigation/navigation.jsx";
import FlyonuiScript from "./components/FlyonuiScript.jsx";
import "./globals.css";
import Image from "next/image.js";

export const metadata = {
  title: "LineUp",
  description: "Music collaboration platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lineup-light">

      <body className="overflow-x-hidden overflow-y-auto">
        <main className="app-main"> {children} </main>
      </body>

    </html>
  );
}
