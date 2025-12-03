import { Plus } from "lucide-react";
import { Button } from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Image from "next/image";

export default function CreateNotes() {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-8">
          <Image
            src="/placeholder-image.png"
            alt="People Icon"
            className="rounded-full border-none"
            width={44}
            height={44}
          />
          <p className="self-center">Name</p>
        </div>
        <div className="self-center">
          <Button variant="primary" size="sm">
            + Add people
          </Button>
        </div>
      </div>
      <div>
        <Button
          variant="secondary"
          icon={<Plus />}
          size="md"
          className="mt-20 mb-20 w-fit border-none lesspadding"
        >
          Add tags
        </Button>
      </div>
      <div>
        <Input placeholder="Write a title"></Input>
      </div>
      <div>
        <Button
          variant="secondary"
          icon={<Plus />}
          size="sm"
          className="mt-20 mb-20 w-fit font-normal"
        >
          Add tags
        </Button>
      </div>
      <div>
        <Input type="textarea" placeholder="Write a description"></Input>
      </div>
    </div>
  );
}
