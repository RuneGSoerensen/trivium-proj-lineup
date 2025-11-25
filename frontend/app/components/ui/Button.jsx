// app/components/ui/Button.jsx
'use client';
import React from "react";
import clsx from "clsx";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
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

const Button = ({
  variant = "primary",
  size = "md",
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
      {leftIcon && <span className="w-icon h-icon">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="w-icon h-icon">{rightIcon}</span>}
    </button>
  );
};

/* NOTE - iconbutton is a bit janky, needs improvement */
const IconButton = ({ icon, variant = "primary", size = "md", className, ...rest }) => {
  return (
    <button
      className={clsx(
        "trvm-btn-icon",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
};

export { Button, IconButton };