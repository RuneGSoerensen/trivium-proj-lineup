// app/components/ui/Button.jsx
'use client';
import React, { useState } from "react";
import clsx from "clsx";

/**
 * Button component with multiple types and variants.
 * Types: default, icon, toggle, dropdown
 * Variants: primary, secondary, glass
 * Sizes: sm, md, lg
 * Props for icons: icon, iconSize, iconStroke
 * fullWidth: boolean
 * className: additional classes
 */

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  glass: "trvm-glass-dark",
  ghost: "btn-ghost",
};

// Made for mobile first design
const sizeClass = {
  sm: "py-2 px-8",
  md: "py-6 px-20",
  lg: "py-8 px-24",
  xl: "py-12 px-32",
  'icon-sm': "p-8",
  'icon-md': "p-10",
  'icon-lg': "p-12",
  'rounded': "p-10",
};

const iconSz = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
  xxl: "w-40 h-40",
};

const strokeW = {
  thin: 1,
  medium: 2,
  thick: 2.5,
};

const resolveIconSize = (size = "md") => iconSz[size] ?? size;
const resolveStroke = (strokeWidth = 2) => strokeW[strokeWidth] ?? strokeWidth;

export const Button = ({
  type = "default", // default | icon | toggle | dropdown
  variant = "primary",
  size = type === "icon" ? "icon-md" : "md",
  icon,
  iconPosition = "left", // left | right
  iconSize = type === "icon" ? "xxl" : "md",
  iconStroke = "thin",
  className,
  children,
  dropdownClassName,
  dropLeft = false,
  dropRight = false,
  active = false, // toggle button state
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const isDropdown = type === "dropdown";
  const base = "trvm-btn";
  // const showLabel = type !== "icon"; //icon button

  const handleClick = (e) => {
    if (isDropdown) {
      e.preventDefault();
      setOpen((prev) => !prev);

      const outsideClickListener = (event) => {
        if (!event.target.closest('.trvm-btn')){
          setOpen(false);
          document.removeEventListener('click', outsideClickListener);
        }
      };

      if (!open) {
        document.addEventListener('click', outsideClickListener);
      }
      return;
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };

  const typeClass = {
    default: "",
    icon: "trvm-btn-icon",
    toggle: active ? "trvm-toggle-btn-active" : "trvm-toggle-btn",
    dropdown: "trvm-dropdown-btn",
  }[type] || "";

  return (
    <div className={clsx(isDropdown && "relative inline-block w-full")}>
      <button
        aria-expanded={isDropdown ? open : undefined}
        onClick={handleClick}
        className={clsx(
          base,
          typeClass,
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        aria-pressed={type === "toggle" ? active : undefined}
        {...rest}
      >
        {/* LEFT ICON */}
        {icon && iconPosition === "left" && (
          <span
            className={clsx(
              resolveIconSize(iconSize),
              resolveStroke(iconStroke)
            )}
          >
            {icon}
          </span>
        )}

        {/* LABEL / TEKST – skjules for icon-type */}
        {children && (
          <>
            {children}
          </>

        )}

        {/* RIGHT ICON */}
        {icon && iconPosition === "right" && (
          <span
            className={clsx(
              resolveIconSize(iconSize),
              resolveStroke(iconStroke)
            )}
          >
            {icon}
          </span>
        )}
      </button>
      {/* DROPDOWN CONTENT */}
      {isDropdown && open && (
        <div
          className={clsx(
            "trvm-dropdown-content absolute overflow-y-auto top-full wrap truncate mt-4 w-full bg-base-100 border border-muted rounded-lg shadow-lg p-8 z-25",
            dropdownClassName,
            dropLeft && "left-0",
            dropRight && "right-0",
          )}
        >
          {rest.dropdownitems || (
            <p className="color-muted">No items provided</p>
          )}
        </div>
      )}
    </div>
  );
};