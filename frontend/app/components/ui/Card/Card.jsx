"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "../Button/Button";
import { Bookmark, MessageCircle } from "lucide-react";

export function Card({
  variant = "Full", // Full || Small
  type, // Service || Collab
  // top bar
  avatarSrc,
  avatarAlt = "",
  authorName,
  tag, // fx "offers #art"
  // hovedindhold
  title,
  imageSrc,
  imageAlt = "",
  description,
  imgWidth,
  imgHeight,
  // footer
  ctaLabel = "Read more",
  location,
  timeAgo, // fx "4h ago"
  ctaVariant,
  btnPads = (ctaVariant = "ghost" ? "px-0! font-medium" : ""),
  // interaktion
  onClick = () => {},
  onIconClick = () => {},
  className,
}) {
  const clickable = typeof onClick === "function";
  const isService = type === "Service";
  const isCollab = type === "Collab";
  const isSmall = variant === "Small";
  // const ServiceIcon = isService && !isSmall ? Bookmark : customElements.define;
  // Use a safe default icon; avoid browser-only globals like customElements during SSR.
  const ServiceIcon = Bookmark;

  return (
    <article
      className={clsx(
        `${
          isSmall ? "min-h-193" : "h-fit"
        } rounded-[24px] min-w-333 lg:max-w-[800px] trvm-card bg-default color-default border border-muted/30`,
        clickable && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="card-body space-y-3">
        {/* Top bar: avatar + navn + tag + icon button */}
        <header className="flex items-center justify-between gap-10 pb-15 border-b border-muted/30">
          <div className="flex items-center gap-8 w-full">
            {avatarSrc && (
              <div className="shrink-0">
                <Image
                  src={avatarSrc}
                  alt={avatarAlt}
                  width={25}
                  height={25}
                  className={`${
                    isSmall ? "w-20 h-20" : "w-40 h-40"
                  } object-cover rounded-full`}
                />
              </div>
            )}

            <span className="truncate flex items-center gap-8">
              {authorName && (
                <span className="text-base color-muted/70">{authorName}</span>
              )}
              <div className="text-xs color-muted truncate flex">
                {tag && isCollab ? (
                  <p className="truncate">is looking for a #{tag}</p>
                ) : (
                  tag && isService && <p className="truncate">offers #{tag}</p>
                )}
              </div>
            </span>
          </div>

          {onIconClick && isService && (
            <Button
              type="icon"
              variant="ghost"
              iconSize="lg"
              icon={
                !isSmall ? <ServiceIcon size={24} /> : <ServiceIcon size={24} />
              }
              onClick={(e) => {
                e.stopPropagation();
                onIconClick();
              }}
              aria-label={"Service type icon"}
            />
          )}
        </header>

        {/* Title */}
        {title && (
          <h3 className="text-h3 font-semibold color-default">{title}</h3>
        )}

        {/* Image */}
        {!isSmall && imageSrc && (
          <figure className="rounded-[20px] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imgWidth}
              height={imgHeight}
              className="w-full h-full  object-cover"
            />
          </figure>
        )}

        {/* Description */}
        {description && (
          <div className={`flex items-start ${isSmall ? "min-h-96" : ""}`}>
            <p className="text-base leading-snug color-muted/60 truncate">
              {description}
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="flex items-center justify-between pt-1">
          <Button
            className={clsx("rounded-full", btnPads)}
            variant={ctaVariant}
            onClick={(e) => {
              if (!clickable) return;
              e.stopPropagation();
              onClick?.();
            }}
          >
            {ctaLabel}
          </Button>

          {isService || (isCollab && isSmall) ? (
            (location || timeAgo) && (
              <span className="text-sm color-muted gap-4">
                {location && <span>{location}</span>}
                {location && timeAgo && <span className="mx-4">-</span>}
                {timeAgo && <span>{timeAgo}</span>}
              </span>
            )
          ) : isCollab && !isSmall ? (
            <Button
              variant="primary"
              icon={<MessageCircle />}
              className="w-full! truncate"
            >
              Start a chat
            </Button>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
