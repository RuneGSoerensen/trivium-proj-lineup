"use client";

import React, { useId } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';

const variantClass = (variant) => {
    switch (variant) {
        case "active":
            return "input--active";
        case "disabled":
            return "input--disabled";
        case "default":
            return "input--default";
        case "error":
            return "input--error";
        case "success":
            return "input--success";
        default:
            return "trvm-input";
    };
};

const Input = ({
    variant,
    value,
    onChange = () => { },
    placeholder,
    type = "text",
    className,
    hasMessage = false,
    message,
    id,
    icon,
    iconPosition = "left",
    ...rest
}) => {
    const inputId = useId(id);

    return (
        <div className='w-full gap-4 flex flex-col'>
            <div className={clsx(
                "input-wrapper",
                variantClass(variant === "error" && hasMessage ? "error" : variant),
                className
            )}>

                {/* LEFT ICON */}
                {icon && iconPosition === "left" && (
                    <span className="input-icon left">{icon}</span>
                )}
                <input
                    className='trvm-input'
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    aria-invalid={hasMessage}
                    aria-describedby={hasMessage ? `${inputId}-error` : undefined}
                    {...rest}
                />
                {/* RIGHT ICON */}
                {icon && iconPosition === "right" && (
                    <span className="input-icon right">{icon}</span>
                )}
            </div>
            {hasMessage && (
                <p id={`${inputId}-error`} className="color-error text-sm">{message}</p>
            )}
        </div>
    );
}

Input.propTypes = {
    /** Input value */
    value: PropTypes.string,
    /** Input onChange handler */
    onChange: PropTypes.func,
    /** Input onBlur handler */
    onBlur: PropTypes.func,
    /** Placeholder text */
    placeholder: PropTypes.string,
    /** Input type */
    type: PropTypes.string,
    /** Additional class names */
    className: PropTypes.string,
    variant: PropTypes.oneOf(['active', 'disabled', 'default', 'error', 'success']),
    /** Whether to show an inline message */
    hasMessage: PropTypes.bool,
    /** Inline message text */
    message: PropTypes.string,
    /** Icon */
    icon: PropTypes.element,
    /** Icon position */
    iconPosition: PropTypes.oneOf(['left', 'right']),
}

export default Input
