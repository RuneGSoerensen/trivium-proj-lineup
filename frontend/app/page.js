import Image from "next/image";
import { Button } from "./components/ui/Button";
import { Tag } from "./components/ui/Tag";
import { TabItem, TabsList } from "./components/ui/Tabs";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center ">
      <Button className="mr-2">Primary</Button>
      <Button className="mr-2" variant="outlined">
        Secondary
      </Button>

      <Tag className="mr-2" variant="outlined">Tag</Tag>

      <TabsList>
        <TabItem>Overview</TabItem>
        <TabItem>Details</TabItem>
        <TabItem>Settings</TabItem>
      </TabsList>

    </main>
  );
}
