'use client';

import NavLink from "@/comps/navigation/NavLink";
import Navbar from "@/comps/Navbar/Navbar";
import { NavbarProvider } from "./utils/navbarContext";

export default function Home() {

  return (
    <>
<Navbar/>
      <h1 className="heading-2">Welcome to Trivium!</h1>
      <NavLink href="/ui-test" label="UI Test" isActive={false} />
      <NavLink href="/chat" label="Chat Page" isActive={false} />
    </>
  );
}
