import { ButtonHTMLAttributes, ReactNode } from "react"
import { ButtonTypes, ButtonVariant, ButtonWidth } from "../../types";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: ButtonTypes;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  isLoading?: boolean;
}

export const Button = ({children, type = "submit", variant = "normal", width = "full", isLoading = false, ...rest}: IProps) => {

  const buttonStyles: Record<ButtonVariant, string> = {
    default: "bg-gray-300 text-dark hover:bg-gray-400",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    error: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    normal: "bg-indigo-600 text-white hover:bg-indigo-700",
    danger: "bg-[#c2344d] text-white hover:bg-red-700",
    cancel: "bg-[#f5f5fa] text-dark hover:bg-gray-200"
  };

  return (
    <button type={type} className={`flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-70 w-${width} min-w-24 h-12 font-medium text-lg capitalize rounded-lg ease-in-out duration-150 p-2 ${buttonStyles[variant]}`} {...rest} disabled={isLoading}>
      {isLoading ? (<svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
      </svg>) : null}
      {children}
    </button>
  )
}
