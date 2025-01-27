"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface InputSelectProps {
  name: string;
  label: string;
  value: string | string[];
  options: string[] | readonly string[];
  title?: string;
  disabled?: boolean;
  multiple?: boolean;
  onChange: (value: string | string[]) => void;
}

export function InputSelect({
  name,
  label,
  value,
  options,
  title,
  multiple = false,
  disabled = false,
  onChange,
}: InputSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSpanElement>(null);

  // todo: Add filtering trough search in input box

  const toggleOption = (value: string) => {
    let newSelectedOptions: string[];

    if (multiple) {
      newSelectedOptions = selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value];
    } else {
      newSelectedOptions = [value];
      setIsOpen(false);
    }

    setSelectedOptions(newSelectedOptions);
    onChange(multiple ? newSelectedOptions : newSelectedOptions[0]);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSelectedOptions(typeof value === "string" ? [value] : value);
  }, [value]);
  return (
    <span className="w-full relative" title={title} ref={selectRef}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2 py-1 rounded bg-input outline-none ${value}`}
      />
      <label
        className={`absolute left-2 top-1 text-secondary duration-300 ${
          value && "-translate-y-3 text-xs peer-focus:text-primary"
        } pointer-events-none`}
      >
        {label} {disabled && "(disabled)"}
      </label>
      {isOpen && (
        <ul className="z-10 absolute w-full rounded -translate-y-1 bg-panel border border-blue-500">
          {options.map((option, index) => (
            <li
              key={index}
              className={`py-1 px-2 flex gap-2 items-center ${
                selectedOptions.includes(option) ? "bg-blue-600 hover:bg-blue-500" : " hover:bg-panel-hover"
              }  ${option}`}
              onClick={() => toggleOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}
