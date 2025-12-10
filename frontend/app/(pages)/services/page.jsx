'use client';
import React, { useEffect, useState } from "react";
import { ListFilter, Search, X } from "lucide-react";
import { Card } from "@/ui/Card/Card"
import { Button } from '@/ui/Button/Button';
import Input from '@/ui/Input/Input';
import { Tag } from '@/ui/Tag/Tag';
import { useNavbar } from "@/utils/navbarContext";
import { useRouter } from "next/navigation";
import { services } from "./serviceData"; // Assume this is an array of service objects

export default function Page() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const router = useRouter();
  const { setConfig } = useNavbar();

  useEffect(() => {
    setConfig({
      type: "services",
      title: null,
      showBack: true,
      showLogo: false,
      actions: ["search", "notifications", "menu"],
      visible: true,
      backgroundColor: "bg-alt",
    });
  }, [setConfig]);
  const handlePageSearch = (query) => {
    console.log("Searching for:", query);
  };

 
  // Unique tag options derived from services
  const uniqueTags = Array.from(new Set(services.map((s) => s.tag)));

  const filterOptions = uniqueTags.map((tag) => ({
    label: services.find((s) => s.tag === tag)?.tagLabel || tag,
    value: tag,
  }));

  // Handle selection of a filter option
  const handleFilterSelect = (option) => {
    console.log("Selected filter:", option);
    setSelectedTag(option.value);
  };

  // Helper if we later want to trigger selection directly by tag
  const filterByTag = (tag) => {
    const option = filterOptions.find((f) => f.value === tag);
    if (option) {
      handleFilterSelect(option);
    }
  };


  // Derived list of visible services based on query + selected tag
  const filteredServices = services.filter((s) => {
    const matchesTag = !selectedTag || s.tag === selectedTag;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.provider.toLowerCase().includes(q) ||
      s.excerpt.toLowerCase().includes(q);
    return matchesTag && matchesQuery;
  });


  return (
    <section className="services flex flex-col px-24 pb-24 bg-alt full-bleed">
      <div className="flex items-center w-full justify-between mb-12 gap-8">
        <div className="items-center w-full" id="searchbar">
          {/* Search Input */}
          <Input
            icon={<Search size={18} stroke="var(--color-base-content)" strokeWidth={2} />}
            type="text"
            placeholder="Search services..."
            className="py-8 bg-muted/30 border-0 placeholder:color-muted/90 w-full!"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search input"
          />
          {query && (
            <Button
              icon={<X />}
              type="icon"
              variant="ghost"
              className="absolute right-8 top-0 text-sm color-muted hover:color-default hover:bg-transparent"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            />

          )}
        </div>
        <div className="w-fit!">
          {/* Filters button */}
          <Button
            icon={<ListFilter />}
            type="dropdown"
            variant="ghost"
            size="icon-md"
            className="rounded-lg! px-8! z-25"
            dropRight={true}
            dropdownClassName="w-[260px]! right-0!"
            dropdownitems={
              <div className="relative w-full h-full">
                {/* Scrollable list area */}
                <ul className="flex flex-col space-y-12 h-full overflow-y-auto pb-40">
                  {filterOptions.map((option) => (
                    <li key={option.value} className="rounded-md h-full w-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-full flex items-center justify-start rounded-md hover:bg-muted/20"
                        onClick={() => handleFilterSelect(option)}
                      >
                        {option.label}
                      </Button>
                    </li>
                  ))}
                </ul>
                {filterOptions.length > 0 && (
                  <div className="absolute mt-12 bottom-0 w-full text-center">
                    <Button
                      variant="ghost"
                      className="w-full flex justify-center items-center rounded-lg px-8 py-6 text-sm color-muted bg-muted/10 hover:bg-muted/30 hover:color-default!"
                      onClick={() => setSelectedTag(null)}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            }>
            Filter
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-24 mt-18">
        {filteredServices.map((s) => (
          <Card
            type="Service"
            key={s.id}
            avatarSrc={s.image_url}
            avatarAlt={s.provider}
            authorName={s.provider}
            tag={s.tag}
            title={s.title}
            imageSrc={s.image_url}
            imageAlt={s.title}
            description={s.excerpt}
            location={s.location}
            timeAgo={s.time}
            imgWidth={250}
            imgHeight={250}
            clickable={true}
            onClick={() => router.push(`/services/${s.id}`)}
          />

        ))}
      </div>
    </section>
  );
}
