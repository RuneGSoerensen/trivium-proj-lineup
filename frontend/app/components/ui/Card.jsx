// src/components/ui/Card.jsx
import React from "react";
import clsx from "clsx";

const CardHeader = ({ className, children, ...rest }) => {
  return (
    <div className={clsx("card--header", className)} {...rest}>
      {children}
    </div>
  );
};

const CardBody = ({ className, children, ...rest }) => {
  return (
    <div className={clsx("card--body", className)} {...rest}>
      {children}
    </div>
  );
};

const CardFooter = ({ className, children, ...rest }) => {
  return (
    <div className={clsx("card--footer", className)} {...rest}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export const Card = ({ className, children, ...rest }) => {
  return (
    <div className={clsx("trvm-card", className)} {...rest}>
      {children}
    </div>
  );
};