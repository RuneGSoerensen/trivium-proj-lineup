// app/components/ui/Button.jsx
'use client';
import React from "react";
import clsx from "clsx";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  glass: "btn-glass",
};

// Made for mobile first design
const sizeClass = {
  sm: "px-8 py-4 text-[14px]",
  md: "px-10 py-8 text-body",
  lg: "px-20 py-16 text-[18px]",
};

const widthClass = {
  full: "w-full justify-center",
  fit: "w-fit sm:max-w-fit",
};

const iconSz = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

const strokeW = {
  sm: "stroke-[1.5px]",
  md: "stroke-[2px]",
  lg: "stroke-[2.5px]",
};

const resolveIconSize = (size = "md") => iconSz[size] ?? size;
const resolveStroke = (stroke = "md") => strokeW[stroke] ?? stroke;

const Button = ({
  variant = "primary",
  size = "md",
  iconSize = "md",
  iconStroke = "md",
  leftIconSize,
  rightIconSize,
  leftIconStroke,
  rightIconStroke,
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  children,
  widthClass = "full",
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "trvm-btn",
        variantClass[variant],
        sizeClass[size],
        fullWidth && "w-full justify-center",
        className,
      )}
      {...rest}
    >
      {leftIcon && (
        <span className={clsx(resolveIconSize(leftIconSize ?? iconSize), resolveStroke(leftIconStroke ?? iconStroke))}>
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className={clsx(resolveIconSize(rightIconSize ?? iconSize), resolveStroke(rightIconStroke ?? iconStroke))}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

/* NOTE - iconbutton is a bit janky, needs improvement */
const IconButton = ({ icon, className, variant, size = "md", stroke = "sm", ...rest }) => {
  return (
    <button
      className={clsx(
        "trvm-btn-icon",
        className,
        icon,
        iconSz[size],
        strokeW[stroke],
        // variantClass[variant],
      )}
      {...rest}
    >
      <span>
        {icon}
      </span>
    </button>
  );
};

const DropdownButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={clsx(
        "trvm-dropdown-btn",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button, IconButton };
