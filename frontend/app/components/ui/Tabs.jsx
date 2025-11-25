'use client';
import React, { createContext, Fragment, useContext, useState } from "react";
import clsx from "clsx";

const TabsContext = createContext(null);

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

const TabItem = ({ children, isActive = false, disabled = false, onClick, className, ...rest }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("TabItem must be used inside <TabsList>. It cannot be used standalone.");
  }
  const variant = disabled ? "disabled" : isActive ? "active" : "default";
  return (
    <button
      type="button"
      className={clsx("trvm-tab", variantClass(variant), className, variant)}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

const TabsList = ({children, variant, className, ...rest }) => {
  const items = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ insideTabs: true, activeIndex }}>
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

          const isActive = index === activeIndex;

          return (
            <Fragment key={index}>
              {React.cloneElement(child, {
                isActive,
                onClick: () => {
                  console.log("Tab clicked:", index);
                  setActiveIndex(index);
                  if (typeof child.props.onClick === "function") {
                    child.props.onClick();
                  }
                },
              })}
              {index < items.length - 1 && <div className="tab-separator" />}
            </Fragment>
          );
        })}
      </div>
    </TabsContext.Provider>
  );
};

export { TabsList, TabItem };



