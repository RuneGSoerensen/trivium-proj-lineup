// src/components/ui/Chip.jsx
import React from "react";
import clsx from "clsx";

const Chip = ({ icon, className, children, ...rest }) => {
  return (
    <span className={clsx("trvm-chip", className)} {...rest}>
      {icon && <span className="w-icon h-icon">{icon}</span>}
      {children}
    </span>
  );
};

export { Chip };
