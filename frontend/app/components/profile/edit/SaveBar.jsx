"use client";
import { Button } from "@/ui/Button/Button.jsx";
import { useRouter } from "next/navigation";

export default function SaveBar({ handleSave, saving }) {
  const router = useRouter();
  return (
    <div className="flex justify-center p-16 gap-16">
      <Button
        onClick={() => router.back()}
        disabled={saving}
        variant="outline"
        className="border-muted"
      >
        cancel
      </Button>
      <Button onClick={handleSave} disabled={saving} className="">
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
