import React from "react";
import clsx from "clsx";

const variantClass = (variant) => {
  switch (variant) {
    case "active":
      return "tab-active";
    case "disabled":
      return "tab-disabled";
    default:
      return "tab-default";
  }
};

export const Tab = ({ children, variant, className, ...rest }) => {
  return (
    <div
      className={clsx("tab", variantClass(variant), className, rest.className)}
    >
      {children}
    </div>
  );
};

export const TabsList = ({ children, variant, className, ...rest }) => {
  return (
    <div
      className={clsx(
        "tabs-list",
        children.length > 1 && "tabs--multiple",
        variantClass(variant),
        className,
        rest.className,
      )}
    >
      {children.map((child, index) => (
        <Tab key={index} variant={variant}>
          {child}
        </Tab>
      ))}
    </div>
  );
};
