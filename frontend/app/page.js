'use client';
import Image from "next/image";
import NavLink from "./components/navigation/NavLink";
import Navigation from "./components/navigation/navigation";
import TestPage from "./pages/ui-test/page";


export default function Home() {
  //Temporary icon import for IconButton
  const iconSrc = (
    <Image src="/icons/plus.svg" alt="Add" width={20} height={20} />
  );

  return (
    <main>

      <h1 className="heading-2">Welcome to Trivium!</h1>
      <NavLink href="/pages/ui-test" label="UI Test" icon="/icons/Services.svg" isActive={false} />
      {/* <TestPage /> */}
    </main>
  );
}
