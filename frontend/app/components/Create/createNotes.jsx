"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Image from "next/image";
import MultiSelectInput from "../ui/MultiSelectButton/MultiSelectButton";
import { Tag } from "../ui/Tag/Tag";
import { useState } from "react";

export default function CreateNotes() {
  const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [images, setImages] = useState([]);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl("");
      setShowImageUrlInput(false);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

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
          className="mt-20 mb-20 w-fit border-none lesspadding focus:bg-transparent active:bg-transparent"
          onClick={() => setShowTagInput(!showTagInput)}
        >
          Add tags
        </Button>

        {/* Display selected tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Tag
              key={tag}
              colorScheme="info"
              className="px-8 py-2 flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="ml-2"
              >
                ×
              </button>
            </Tag>
          ))}
        </div>

        {/* Tag input */}
        {showTagInput && (
          <div className="mb-16">
            <MultiSelectInput
              options={[]}
              values={tags}
              setValues={setTags}
              placeholder="Add a tag..."
              allowNew={true}
            />
          </div>
        )}
      </div>
      <div>
        <Input placeholder="Write a title"></Input>
      </div>
      <div>
        <Button
          variant="secondary"
          icon={<Plus />}
          size="sm"
          className="mt-20 mb-20 w-fit font-normal focus:bg-transparent active:bg-transparent"
          onClick={() => setShowImageUrlInput(!showImageUrlInput)}
        >
          Add Media
        </Button>

        {/* Image URL input */}
        {showImageUrlInput && (
          <div className="mb-16 flex gap-2">
            <Input
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddImage()}
            />
            <Button variant="primary" size="sm" onClick={handleAddImage}>
              Add
            </Button>
          </div>
        )}

        {/* Display uploaded images */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Upload ${index + 1}`}
                  width={140}
                  height={140}
                  className="w-140 h-140 object-cover rounded-lg border border-muted"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 hover:bg-error/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <textarea
          placeholder="Write a description"
          cols="30"
          rows="4"
          className="w-full bg-default color-default border-muted rounded-lg px-12 py-14 placeholder:color-muted focus:ring-1 focus:ring-brand transition-all duration-100"
        ></textarea>
      </div>
      <div className="self-end mt-10">
        <Button variant="primary" size="sm">
          Post
        </Button>
      </div>
    </div>
  );
}
