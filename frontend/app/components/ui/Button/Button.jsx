// app/components/ui/Button.jsx
'use client';
import React, { useState } from "react";
import clsx from "clsx";

/**
 * Button component with multiple types and variants.
 * Types: default, icon, toggle, dropdown
 * Variants: primary, secondary, glass
 * Sizes: sm, md, lg
 * Props for icons: leftIcon, rightIcon, iconSize, iconStroke
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
};

const iconSz = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
  xxl: "w-40 h-40",
};

const strokeW = {
  sm: "stroke-[1.5px]",
  md: "stroke-[2px]",
  lg: "stroke-[2.5px]",
};

const resolveIconSize = (size = "md") => iconSz[size] ?? size;
const resolveStroke = (stroke = "md") => strokeW[stroke] ?? stroke;

export const Button = ({
  type = "default", // default | icon | toggle | dropdown
  variant = "primary",
  size = "md",
  iconSize = "md",
  iconStroke = "md",
  leftIcon,
  rightIcon,
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
        {leftIcon && (
          <span
            className={clsx(
              resolveIconSize(iconSize),
              resolveStroke(iconStroke)
            )}
          >
            {leftIcon}
          </span>
        )}

        {/* LABEL / TEKST – skjules for icon-type */}
        {showLabel && children && (
          <span>
            {children}
          </span>
        )}

        {/* RIGHT ICON */}
        {rightIcon && (
          <span
            className={clsx(
              resolveIconSize(iconSize),
              resolveStroke(iconStroke)
            )}
          >
            {rightIcon}
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