import Image from "next/image";
import { Button } from "./components/ui/Button";
import { Chip } from "./components/ui/Chip";
import { TabItem, TabsList } from "./components/ui/Tabs";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center ">
      <Button className="mr-2">Primary</Button>
      <Button className="mr-2" variant="outlined">
        Secondary
      </Button>

      <Chip className="mr-2" variant="tag">Chip</Chip>

      <TabsList>
        <TabItem>Overview</TabItem>
        <TabItem>Details</TabItem>
        <TabItem>Settings</TabItem>
      </TabsList>

    </main>
  );
}
