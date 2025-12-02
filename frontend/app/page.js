'use client';

import NavLink from "@/comps/navigation/NavLink";

export default function Home() {

  return (
    <>
      <h1 className="heading-2">Welcome to Trivium!</h1>
      <NavLink href="/ui-test" label="UI Test" isActive={false} />
      <NavLink href="/chat" label="Chat Page" isActive={false} />
    </>
  );
}
