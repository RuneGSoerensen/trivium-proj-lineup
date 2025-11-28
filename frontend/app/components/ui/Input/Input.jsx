'use client';

import React from 'react'
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
        default:
            return "trvm-input";
    };
};

const Input = ({ variant, value, onChange = () => { }, placeholder, type = "text", className, hasMessage = false, message, ...rest }) => {
    return (
        <div className='w-full gap-4 flex flex-col'>
            <input
                className={clsx(
                    "trvm-input",
                    variantClass(variant === "error" && hasMessage ? "error" : variant),
                    className
                )}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                aria-invalid={hasMessage}
                aria-describedby={hasMessage ? "input-error" : undefined}
                {...rest}
            />
            {hasMessage && (
                <p className="text-error">{message}</p>
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
    variant: PropTypes.oneOf(['active', 'disabled', 'default']),
    /** Whether to show an inline message */
    hasMessage: PropTypes.bool,
    /** Inline message text */
    message: PropTypes.string,
}

export default Input
