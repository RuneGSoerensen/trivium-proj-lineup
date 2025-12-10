// app/components/ui/ServiceCard.jsx
'use client';

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "../Button/Button";
import { Bookmark } from "lucide-react";

export function ServiceCard({
  // top bar
  avatarSrc, avatarAlt = "", authorName, tag, // fx "offers #art"
  // hovedindhold
  title, imageSrc, imageAlt = "", description,
  imgWidth,
  imgHeight,
  // footer
  ctaLabel = "Read more", location, timeAgo, // fx "4h ago"
  btnVariant, btnPads = btnVariant = "ghost" ? "px-0! font-medium" : "",
  // interaktion
  onClick = () => { }, onBookmarkClick = () => { },
  className,
}) {
  const clickable = typeof onClick === "function";

  return (
    <article
      className={clsx(
        "card rounded-[24px] trvm-card sm:max-w-sm bg-default color-default border border-muted shadow-sm",
        clickable && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="card-body space-y-3">
        {/* Top bar: avatar + navn + tag + bookmark */}
        <header className="flex items-center justify-between gap-8 pb-4 border-b border-muted/30">
          <div className="flex items-center gap-4 w-full">
            {avatarSrc && (
              <div className="avatar">
                <Image
                  src={avatarSrc}
                  alt={avatarAlt}
                  width={25}
                  height={25}
                  className="w-28 h-28 object-cover rounded-full overflow-hidden mr-8" />
              </div>
            )}

            <span className="truncate flex items-center gap-8">

              {authorName && (
                <span className="text-base color-muted/70 mr-4">
                  {authorName}
                </span>
              )}
              {tag && (
                <span className="text-sm color-muted">{tag}</span>
              )}
            </span>
          </div>

          {onBookmarkClick && (
            <Button
              type="icon"
              variant="ghost"
              iconSize="lg"
              icon={<Bookmark />}
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkClick();
              }}
              aria-label="Save"
            >
              ?
            </Button>
          )}
        </header>

        {/* Title */}
        {title && (
          <h3 className="text-h3 font-semibold color-default">
            {title}
          </h3>
        )}

        {/* Image */}
        {imageSrc && (
          <figure className="rounded-[20px] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imgWidth}
              height={imgHeight}
              className="w-full h-full object-cover" />
          </figure>
        )}

        {/* Description */}
        {description && (
          <p className="text-base leading-snug color-muted/60">
            {description}
          </p>
        )}

        {/* Footer */}
        <footer className="flex items-center justify-between pt-1">
          <Button
            className={clsx("rounded-full", btnPads)}
            variant={btnVariant}
            onClick={(e) => {
              if (!clickable) return;
              e.stopPropagation();
              onClick?.();
            }}
          >
            {ctaLabel}
          </Button>

          {(location || timeAgo) && (
            <span className="text-sm color-subtle gap-4">
              {location && <span>{location}</span>}
              {location && timeAgo && <span className="mx-4">-</span>}
              {timeAgo && <span>{timeAgo}</span>}
            </span>
          )}
        </footer>
      </div>
    </article>
  );
}



