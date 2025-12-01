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
  glass: "btn-glass",
};

// Made for mobile first design
const sizeClass = {
  sm: "py-6 px-16 text-sm",
  md: "py-8 px-24 text-base",
  lg: "py-12 px-32 text-lg",
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
  thin: "stroke-[1px]",
  medium: "stroke-[2px]",
  thick: "stroke-[2.5px]",
};

const resolveIconSize = (size = "md") => iconSz[size] ?? size;
const resolveStroke = (stroke = "md") => strokeW[stroke] ?? stroke;

export const Button = ({
  type = "default", // default | icon | toggle | dropdown
  variant = "primary",
  size = type === "icon" ? "rounded-md" : "md",
  icon,
  iconPosition = "left", // left | right
  iconSize = "md",
  iconStroke = "medium",
  className,
  children,
  active = false, // toggle button state
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const isDropdown = type === "dropdown";

  const handleClick = (e) => {
    if (isDropdown) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };

  const base = "trvm-btn";

  const typeClass = {
    default: "",
    icon: "trvm-btn-icon",
    toggle: active ? "trvm-toggle-btn-active" : "trvm-toggle-btn",
    dropdown: "trvm-dropdown-btn",
  }[type] || "";

  const showLabel = type !== "icon"; //icon button

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
        {showLabel && children && (
          <span className="btn-label">
            {children}
          </span>
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
        <div className="absolute top-full left-0 mt-4 w-full bg-base-100 border border-muted rounded-lg shadow-lg p-8 z-50">
          {rest.dropdownitems || (
            <p className="text-muted">No items provided</p>
          )}
        </div>
      )}
    </div>
  );
};