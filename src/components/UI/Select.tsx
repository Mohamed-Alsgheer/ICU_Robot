import { ReactNode, SelectHTMLAttributes } from "react";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  isError?: boolean;
  width?: string;
  children?: ReactNode;
}

const Select = ({ isError = false, width = "fit", children, ...rest }: IProps) => {
  return (
    <select
      className={`w-${width} h-12 px-3 border-[1px] shadow-sm focus:ring-1 outline-none rounded-lg text-lg bg-transparent duration-150 ease-in-out 
        ${isError ? "border-red-400 focus:border-red-600 focus:ring-red-600" : "border-gray-400 focus:border-indigo-600 focus:ring-indigo-600"}`}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
