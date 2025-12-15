"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Image from "next/image";
import MultiSelectInput from "../ui/MultiSelectButton/MultiSelectButton";
import { Tag } from "../ui/Tag/Tag";
import { useState, useEffect } from "react";
import { createRequest } from "@/utils/api";
import { authenticatedFetch } from "@/utils/auth";

export default function CreateNotes({ userName, userImage }) {
  const [genres, setGenres] = useState([]);
  const [showGenreInput, setShowGenreInput] = useState(false);
  const [allGenres, setAllGenres] = useState([]);
  const [images, setImages] = useState([]);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3300";
        const res = await authenticatedFetch(`${baseUrl}/genres`);
        if (res.ok) {
          const data = await res.json();
          setAllGenres(data.genres.map((g) => g.name));
        }
      } catch (error) {
        console.error("Failed to load genres", error);
      }
    };

    loadGenres();
  }, []);

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
    if (isLoading) return;

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    const requestData = {
      title,
      description: content,
      location,
      people_user_ids: [],
      genres,
      paid_opportunity: isPaid,
    };

    if (images.length > 0) {
      requestData.image_url = images[0];
    }

    try {
      await createRequest(requestData);
      console.log("Request created successfully");
      setTitle("");
      setContent("");
      setLocation("");
      setGenres([]);
      setImages([]);
      setError(null);
    } catch (error) {
      console.error("Failed to create request", error);
      setError(error.message || "Failed to create request. Please try again.");
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
        <Input
          className="mt-15 bg-alt"
          placeholder="Write a title"
          value={title}
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
              className="bg-alt"
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

      <div>
        <Button
          variant="secondary"
          icon={<Plus />}
          size="md"
          className="w-fit border-none lesspadding focus:bg-transparent active:bg-transparent"
          onClick={() => setShowGenreInput(!showGenreInput)}
        >
          Add genres
        </Button>

        {/* Display selected genres */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Tag
              key={genre}
              colorScheme="info"
              className="px-8 py-2 flex items-center gap-1 mb-5"
            >
              {genre}
              <button
                type="button"
                onClick={() => setGenres(genres.filter((g) => g !== genre))}
                className="ml-2"
              >
                ×
              </button>
            </Tag>
          ))}
        </div>

        {/* Genre input */}
        {showGenreInput && (
          <div className="mb-4">
            <MultiSelectInput
              options={allGenres}
              className="bg-alt"
              values={genres}
              setValues={setGenres}
              placeholder="Add a genre..."
              allowNew={true}
            />
          </div>
        )}
      </div>

      <div>
        <Input
          className="bg-alt"
          placeholder="Location.."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="flex items-center mt-15 gap-4">
        <div className="self-start flex flex-row items-center gap-4 bg-none ">
          <input
            type="checkbox"
            className="switch switch-outline rounded-full bg-none border-grey-400"
            id="switchSecondary2"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
          />
          <label
            className="label-text text-base rounded-full bg-none"
            htmlFor="switchSecondary2"
          >
            {isPaid ? "Paid opportunity" : "Not paid"}
          </label>
        </div>
      </div>
      <div className="self-end ">
        <Button
          variant="primary"
          className="px-30 mb-[50%]"
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
