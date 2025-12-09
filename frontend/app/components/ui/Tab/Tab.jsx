"use client";
import React, { createContext, Fragment, useContext, useState } from "react";
import clsx from "clsx";

const TabsContext = createContext(null);

const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs components must be used inside <Tabs>.");
  }
  return ctx;
};

const variantClass = (variant) => {
  switch (variant) {
    case "active":
      return "tab--active";
    case "disabled":
      return "tab--disabled";
    case "default":
      return "tab--default";
    default:
      return "trvm-tab";
  }
};

const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabItem = ({
  children,
  disabled = false,
  onClick,
  className,
  index,
  activeClassName,
  ...rest
}) => {
  const { activeIndex, setActiveIndex } = useTabsContext();
  const isActive = index === activeIndex;
  const variant = disabled ? "disabled" : isActive ? "active" : "default";

  return (
    <button
      type="button"
      className={clsx(
        "trvm-tab",
        variantClass(variant),
        className,
        variant,
        isActive && activeClassName
      )}
      onClick={
        disabled
          ? undefined
          : () => {
              setActiveIndex(index);
              onClick?.();
            }
      }
      {...rest}
    >
      {children}
    </button>
  );
};

const TabsList = ({
  children,
  variant,
  className = "tabs--list",
  hasSeparator = true,
  ...rest
}) => {
  const items = React.Children.toArray(children);
  return (
    <div
      className={clsx(
        items.length > 1 && "tabs--multiple",
        variantClass(variant),
        className,
        rest.className
      )}
    >
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return null;

        return (
          <Fragment key={index}>
            {React.cloneElement(child, { index })}
            {hasSeparator && index < items.length - 1 && (
              <div className="tab-separator" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

const TabContent = ({ children, className, isActive = false, ...rest }) => {
  if (!isActive) return null;
  return (
    <div className={clsx("tab-content", className)} {...rest}>
      {children}
    </div>
  );
};

const TabContentList = ({ children, className }) => {
  const { activeIndex } = useTabsContext();
  const items = React.Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          key: index,
        });
      })}
    </div>
  );
};

export { Tabs, TabsList, TabItem, TabContent, TabContentList };
