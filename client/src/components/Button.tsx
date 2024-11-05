import clsx from "clsx";
import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;  // Optional icon prop
  className?: string;      // Optional className prop
  label: string;           // Required label prop
  type?: "button" | "submit" | "reset"; // Optional type prop with specific values
  onClick?: () => void;    // Optional onClick handler
}

const Button: React.FC<ButtonProps> = ({
  icon,
  className,
  label,
  type = "button",          // Default to "button"
  onClick = () => {},      // Default to no-op function
}) => {
  return (
    <button
      type={type}
      className={clsx("px-3 py-2 outline-none", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
