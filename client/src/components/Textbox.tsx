import React from "react";
import clsx from "clsx";

interface TextboxProps {
  type?: string; // Optional type, defaulting to 'text'
  placeholder?: string; // Optional placeholder text
  label?: string; // Optional label text
  className?: string; // Optional className for custom styling
  register?: any; // Register function from react-hook-form, use appropriate type if possible
  name: string; // Name of the input field, required
  error?: string; // Optional error message
}

// Use React.forwardRef with the props type
const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(
  ({ type = "text", placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className='w-full flex flex-col gap-1'>
        {label && (
          <label htmlFor={name} className='text-slate-800 text-sm md:text-base'>
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full",
              className
            )}
          />
        </div>
        {error && (
          <span className='text-xs text-red-500 mt-0.5'>{error}</span>
        )}
      </div>
    );
  }
);

// Specify the display name for better debugging
Textbox.displayName = "Textbox";

export default Textbox;
