"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Image from "next/image";
import MultiSelectInput from "../ui/MultiSelectButton/MultiSelectButton";
import { Tag } from "../ui/Tag/Tag";
import { useState } from "react";
import { createNote } from "@/utils/api";

export default function CreateNotes({ userName, userImage }) {
  const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [images, setImages] = useState([]);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const handlePost = async () => {
    // Prevent multiple submissions
    if (isLoading) return;

    // Validate input
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    const noteData = {
      title,
      content,
      people_user_ids: [],
      tags,
    };

    // Only include image_url if an image was added
    if (images.length > 0) {
      noteData.image_url = images[0];
    }

    try {
      await createNote(noteData);
      console.log("Note created successfully");
      setTitle("");
      setContent("");
      setTags([]);
      setImages([]);
      setError(null);
    } catch (error) {
      console.error("Failed to create note", error);
      setError(error.message || "Failed to create note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-8">
          <Image
            src={userImage}
            alt={userName}
            className="rounded-full border-none object-cover w-44 h-44"
            width={44}
            height={44}
          />
          <p className="self-center">{userName}</p>
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
              className="bg-alt"
              setValues={setTags}
              placeholder="Add a tag..."
              allowNew={true}
            />
          </div>
        )}
      </div>
      <div>
        <Input
          placeholder="Write a title"
          value={title}
          className="bg-alt"
          onChange={(e) => setTitle(e.target.value)}
        />
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
          <div className="mb-16 flex gap-2 items-center">
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
          className="w-full bg-alt color-default border-muted rounded-lg px-12 py-14 placeholder:color-muted focus:ring-1 focus:ring-brand transition-all duration-100"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="self-end mt-10 mb-[50%]">
        <Button
          variant="primary"
          className="px-30"
          size="sm"
          onClick={handlePost}
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </Button>
        {error && <p className="text-error text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
