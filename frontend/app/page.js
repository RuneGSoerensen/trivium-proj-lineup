'use client';
import Image from "next/image";
import NavLink from "@/comps/navigation/NavLink";
import Navigation from "./components/navigation/navigation";
import TestPage from "./(pages)/ui-test/page";

export default function Home() {
  //Temporary icon import for IconButton
  const iconSrc = (
    <Image src="/icons/plus.svg" alt="Add" width={20} height={20} />
  );

  return (
    <>
      <h1 className="heading-2">Welcome to Trivium!</h1>
      <NavLink href="/ui-test" label="UI Test" icon="/icons/Services.svg" isActive={false} />
      <NavLink href="/chat" label="Chat Page" isActive={false} />
      {/* <TestPage /> */}
    </>
  );
}
