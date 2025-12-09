import CreateTabs from "@/components/Create/createTabs";

export default function CreateLayout({ children }) {
  return (
    <div className="flex flex-col w-full h-full">
      <CreateTabs />
      {children}
    </div>
  );
}
