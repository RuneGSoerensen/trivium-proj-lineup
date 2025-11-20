// app/components/ui/Button.jsx
import React from "react";
import clsx from "clsx";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

const sizeClass = {
  sm: "px-10 py-4 text-[14px]",
  md: "px-16 py-10 text-body",
  lg: "px-20 py-14 text-[18px]",
};

export const Button = ({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "btn",
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
