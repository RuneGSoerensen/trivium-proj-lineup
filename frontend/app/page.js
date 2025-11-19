import Image from "next/image";
import { Button } from "./components/ui/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
        <Button size="sm">Hej</Button>
        <Button size="md" variant="secondary">Hej</Button>
        <Button size="lg" variant="tertiary">Hej</Button>
    </main>
  );
}
