import Navigation from "./components/navigation/navigation.jsx";
import FlyonuiScript from "./components/FlyonuiScript";
import "./globals.css";

export const metadata = {
  title: "LineUp",
  description: "Music collaboration platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
