import Image from "next/image";
import { Button } from "./components/ui/Button";
import { Chip } from "./components/ui/Chip";
import { Tab, TabsList } from "./components/ui/Tabs";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button className="mr-2">Primary</Button>
      <Button className="mr-2" variant="secondary">
        Secondary
      </Button>
      <Button className="mr-2" variant="tertiary">
        Tertiary
      </Button>
      <Chip className="mr-2">Chip</Chip>
      <TabsList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabsList>
    </main>
  );
}
