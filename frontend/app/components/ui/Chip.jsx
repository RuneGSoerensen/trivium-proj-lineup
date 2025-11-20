// src/components/ui/Chip.jsx
import React from "react";
import clsx from "clsx";

const variantClass = {
  default: "chip--default",
  outlined: "chip--outlined",
  filled: "chip--filled",
  tag: "chip--tag",
};

const Chip = ({ icon, variant = "default", className, children, ...rest }) => {
  return (
    <span className={clsx("trvm-chip", variantClass[variant], className)} {...rest}>
      {icon && <span className="w-icon h-icon">{icon}</span>}
      {children}
    </span>
  );
};

export { Chip };
