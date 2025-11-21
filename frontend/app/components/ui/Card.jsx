// app/components/ui/ServiceCard.jsx
'use client';

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "./Button";

export function ServiceCard({
  // top bar
  avatarSrc, avatarAlt = "", authorName, tag, // fx "offers #art"
  // hovedindhold
  title, imageSrc, imageAlt = "", description,
  // footer
  ctaLabel = "Read more", location, timeAgo, // fx "4h ago"
  // interaktion
  onClick = () => {}, onBookmarkClick = () => {}, className,
}) {
  const clickable = typeof onClick === "function";

  return (
    <article
      className={clsx(
        "card trvm-card sm:max-w-sm bg-default text-default border border-muted shadow-sm",
        clickable && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="card-body space-y-3">
        {/* Top bar: avatar + navn + tag + bookmark */}
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {avatarSrc && (
              <div className="avatar">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={avatarSrc}
                    alt={avatarAlt}
                    width={25}
                    height={25}
                    className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="flex flex-col leading-tight">
              {authorName && (
                <span className="text-[13px] font-semibold text-default">
                  {authorName}
                </span>
              )}
              {tag && (
                <span className="text-[12px] text-muted">{tag}</span>
              )}
            </div>
          </div>

          {onBookmarkClick && (
            <Button
              className="btn btn-circle btn-ghost btn-xs bg-inverse text-inverse"
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkClick();
              } }
              aria-label="Save"
            >
              ?
            </Button>
          )}
        </header>

        {/* Title */}
        {title && (
          <h3 className="text-h3 font-semibold text-default">
            {title}
          </h3>
        )}

        {/* Image */}
        {imageSrc && (
          <figure className="rounded-[20px] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={400}
              height={176}
              className="w-full h-44 object-cover" />
          </figure>
        )}

        {/* Description */}
        {description && (
          <p className="text-[13px] leading-snug text-muted">
            {description}
          </p>
        )}

        {/* Footer */}
        <footer className="flex items-center justify-between pt-1">
          <Button
            variant="primary"
            onClick={(e) => {
              if (!clickable) return;
              e.stopPropagation();
              onClick?.();
            } }
          >
            {ctaLabel}
          </Button>

          {(location || timeAgo) && (
            <span className="text-[12px] text-subtle">
              {location && <span>{location}</span>}
              {location && timeAgo && <span className="mx-1">·</span>}
              {timeAgo && <span>{timeAgo}</span>}
            </span>
          )}
        </footer>
      </div>
    </article>
  );
}


// // src/components/ui/Card.jsx
// import React from "react";
// import clsx from "clsx";


// const CardHeader = ({ className, children, ...rest }) => {
//   return (
//     <div className={clsx("card--header", className)} {...rest}>
//       {children}
//     </div>
//   );
// };

// const CardBody = ({ className, children, ...rest }) => {
//   return (
//     <div className={clsx("card--body", className)} {...rest}>
//       {children}
//     </div>
//   );
// };

// const CardFooter = ({ className, children, ...rest }) => {
//   return (
//     <div className={clsx("card--footer", className)} {...rest}>
//       {children}
//     </div>
//   );
// };

// Card.Header = CardHeader;
// Card.Body = CardBody;
// Card.Footer = CardFooter;

// export const Card = ({ className, children, ...rest }) => {
//   return (
//     <div className={clsx("trvm-card", className)} {...rest}>
//       {children}
//     </div>
//   );
// };

