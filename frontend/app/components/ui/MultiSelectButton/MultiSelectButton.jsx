"use client";
import { useEffect, useState } from "react";
export default function MultiSelectInput({
  options,
  values,
  setValues,
  placeholder,
  allowNew,
}) {
  const [input, setInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if (!Array.isArray(options)) return;
    setFilteredOptions(
      options.filter(
        (o) =>
          o.toLowerCase().includes(input.toLowerCase()) && !values.includes(o)
      )
    );
  }, [input, options, values]);

  const addValue = (val) => {
    if (!values.includes(val)) setValues([...values, val]);
    setInput("");
  };

  const removeValue = (val) => setValues(values.filter((v) => v !== val));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Only allow new values if allowed
      if (allowNew || options.includes(input)) {
        addValue(input);
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-full border rounded px-3 py-2"
      />
      {/* Dropdown of filtered existing options */}
      {input && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto">
          {filteredOptions.map((opt) => (
            <li
              key={opt}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => addValue(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
