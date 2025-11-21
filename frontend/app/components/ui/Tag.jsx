// src/components/ui/Chip.jsx
import React from "react";
import clsx from "clsx";

const variantClass = {
  default: "tag--default",
  outlined: "tag--outlined",
  filled: "tag--filled",
};

const Tag = ({ icon, variant = "default", className, children, ...rest }) => {
  return (
    <span className={clsx("trvm-tag", variantClass[variant], className)} {...rest}>
      {icon && <span className="w-icon h-icon">{icon}</span>}
      {children}
    </span>
  );
};

export { Tag };
