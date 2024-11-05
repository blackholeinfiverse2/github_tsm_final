import clsx from "clsx";
import React from "react";

// Define the props interface
interface TitleProps {
  title: string; // Required title prop
  className?: string; // Optional className for additional styling
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
  return (
    <h2 className={clsx("text-3xl md:text-4xl font-bold capitalize", className)}>
      {title}
    </h2>
  );
};

export default Title;
