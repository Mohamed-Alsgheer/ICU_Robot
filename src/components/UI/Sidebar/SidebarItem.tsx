import { ChevronDown } from "lucide-react"
import { ReactNode, useState } from "react"

interface IProps {
  title: string
  icon?: ReactNode
  children?: ReactNode;
}

export const SidebarItem = ({title, icon, children}: IProps) => {

  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div>
      {/* Button to toggle dropdown */}
      <button
        type="button"
        onClick={toggleSidebar}
        className={`flex items-center w-full p-2 text-base ${isOpen ? "bg-[#f1f1f1] text-blue-700": "bg-[#ffffff] text-black"} hover:bg-[#f1f1f1] hover:text-blue-700 group duration-150 ease-in-out rounded-lg`}
      >
        {icon && icon}
        <span className="capitalize flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {title}
        </span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div 
        className={`py-2 space-y-2 ${
        isOpen ? "block" : "hidden"
        } transition-all`}
      >
        {children}
      </div>
    </div>
  )
}
