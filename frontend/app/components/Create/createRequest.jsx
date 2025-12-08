"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Image from "next/image";
import MultiSelectInput from "../ui/MultiSelectButton/MultiSelectButton";
import { Tag } from "../ui/Tag/Tag";
import { useState, useRef, useEffect } from "react";
import { createRequest } from "@/utils/api";

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

  const titleRef = useRef("");
  const contentRef = useRef("");
  const locationRef = useRef("");

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/genres`
        );
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

    if (!titleRef.current.value.trim() || !contentRef.current.value.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    const requestData = {
      title: titleRef.current.value,
      description: contentRef.current.value,
      location: locationRef.current.value,
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
      titleRef.current.value = "";
      contentRef.current.value = "";
      locationRef.current.value = "";
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
            className="rounded-full border-none"
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
        <Input className="mt-15" ref={titleRef} placeholder="Write a title" />
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
          ref={contentRef}
          placeholder="Write a description"
          cols="30"
          rows="4"
          className="w-full bg-default color-default border-muted rounded-lg px-12 py-14 placeholder:color-muted focus:ring-1 focus:ring-brand transition-all duration-100"
        />
      </div>

      <div>
        <Button
          variant="secondary"
          icon={<Plus />}
          size="md"
          className="mb-20 w-fit border-none lesspadding focus:bg-transparent active:bg-transparent"
          onClick={() => setShowGenreInput(!showGenreInput)}
        >
          Add genres
        </Button>

        {/* Display selected genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre) => (
            <Tag
              key={genre}
              colorScheme="info"
              className="px-8 py-2 flex items-center gap-1"
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
          <div className="mb-16">
            <MultiSelectInput
              options={allGenres}
              values={genres}
              setValues={setGenres}
              placeholder="Add a genre..."
              allowNew={true}
            />
          </div>
        )}
      </div>

      <div>
        <Input className="mt-15" ref={locationRef} placeholder="Location.." />
      </div>

      <div className="flex items-center gap-1 mt-15">
        <input
          type="checkbox"
          className="switch switch-outline switch-secondary rounded-full"
          id="switchSecondary2"
          checked={isPaid}
          onChange={(e) => setIsPaid(e.target.checked)}
        />
        <label
          className="label-text text-base rounded-full"
          htmlFor="switchSecondary2"
        >
          {isPaid ? "Paid opportunity" : "Not paid"}
        </label>
      </div>

      <div className="self-end mt-10">
        <Button
          variant="primary"
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
