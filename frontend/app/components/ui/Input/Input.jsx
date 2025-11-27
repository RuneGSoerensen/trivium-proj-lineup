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
        default:
            return "trvm-input";
    };
};

const Input = ({ variant, value, onChange, placeholder, type = "text", className }) => {
    return (
        <input
            className={clsx(
                "trvm-input",
                variantClass(variant),
                className,
            )}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
        />
    );
}

Input.propTypes = {
    /** Input value */
    value: PropTypes.string,
    /** Input onChange handler */
    onChange: PropTypes.func,
    /** Placeholder text */
    placeholder: PropTypes.string,
    /** Input type */
    type: PropTypes.string,
    /** Additional class names */
    className: PropTypes.string,
    variant: PropTypes.oneOf(['active', 'disabled', 'default']),
}

export default Input