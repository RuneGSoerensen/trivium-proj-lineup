import Navigation from "./components/navigation/navigation.jsx";
import FlyonuiScript from "./components/FlyonuiScript";
import "./globals.css";

export const metadata = {
  title: "LineUp",
  description: "Music collaboration platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lineup-light">
      <body>
        <FlyonuiScript />
        {/* NOTE - mockup-phone css class can be removed once the layout is finalized */}
        <main className="trvm-page mockup-phone">
          {children}
          {/* <Navigation /> */}
        </main>
      </body>
    </html>
  );
}
