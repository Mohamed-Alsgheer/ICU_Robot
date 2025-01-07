import { ReactNode, useState } from "react";
import { ChevronDown } from 'lucide-react';

interface IProp {
  title: string;
  children: ReactNode;
}

export const Collapsible = ({ title, children }: IProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-gray-50 rounded-t-lg p-3 border-b-2 border-gray-600">
      <button
        type="button"
        onClick={toggleContent}
        className="collapsible-button w-full flex items-center justify-between font-bold"
      >
        <span className="capitalize text-lg">{title}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={24}
        />
      </button>
      <div
        className={`collapsible-content overflow-hidden max-h-0 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : ""
        }`}
      >
        <div className="mt-2 text-gray-800">{children}</div>
      </div>
    </div>
  );
};
