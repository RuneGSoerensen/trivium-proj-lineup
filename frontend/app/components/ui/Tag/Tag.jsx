'use client';

import React, { useId, useState } from "react";
import clsx from "clsx";
import Input from '@/ui/Input/Input';

const variantClass = (variant) => {
  switch (variant) {
    case "default":
      return "tag--default";
    case "filled":
      return "tag--filled";
    case "outlined":
      return "tag--outlined";
    case "checkable":
      return "tag--checkable";
    default:
      return "tag--default";
  }
};

const colorSchemeClass = (colorScheme) => {
  switch (colorScheme) {
    case "info":
      return "info-style";
    case "red":
      return "error-style";
    case "green":
      return "success-style";
    case "yellow":
      return "warning-style";
    default:
      return "background-color: var(--color-secondary); color: var(--color-secondary-content);";
  }
};

const Tag = ({
  icon,
  variant = "default",
  className,
  children,
  checkable = false,
  checked,
  defaultChecked = false,
  onCheckChange,
  onCheckableChange,
  checkboxProps = {},
  colorScheme = "default",
  label,
  htmlForLabel,
  ...rest
}) => {
  const generatedCheckboxId = useId();
  const {
    className: checkboxClassName,
    onChange: checkboxOnChange,
    id: checkboxIdProp,
    ...restCheckboxProps
  } = checkboxProps;
  const checkboxId = checkboxIdProp ?? generatedCheckboxId;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = typeof checked === "boolean";
  const isChecked = checkable ? (isControlled ? checked : internalChecked) : false;

  const handleCheckboxChange = (event) => {
    if (!checkable) return;

    const nextChecked = event.target.checked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    if (typeof onCheckChange === "function") {
      onCheckChange(nextChecked);
    }

    if (typeof onCheckableChange === "function") {
      onCheckableChange(nextChecked);
    }

    if (typeof checkboxOnChange === "function") {
      checkboxOnChange(event);
    }
  };

  const TagElement = checkable ? "label" : "span";

  return (
    <TagElement
      className={clsx(
        "trvm-tag",
        variantClass(variant) ,
        checkable && "tag--checkable group",
        className,
        colorSchemeClass(colorScheme)
      )}
      htmlFor={checkable ? checkboxId : htmlForLabel}
      {...rest}
    >
      {checkable ? (
        <>
          <Input
            id={checkboxId}
            type="checkbox"
            className={clsx("checkbox peer", checkboxClassName)}
            checked={isChecked}
            onChange={handleCheckboxChange}
            {...restCheckboxProps}
          />
          <span className="text-label text-body flex items-center gap-2">
            {icon && <span className="w-icon h-icon">{icon}</span>}
            {children || label}
          </span>
        </>
      ) : (
        <div className="w-fit">
          {icon && <span className="w-icon h-icon">{icon}</span>}
          {children}
        </div>
      )}
    </TagElement>
  );
};

export { Tag };
