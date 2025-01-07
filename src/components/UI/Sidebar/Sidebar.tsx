import { ReactNode, useState } from "react";
import { PanelRightClose, X } from "lucide-react";

interface IProps {
  title: string;
  children?: ReactNode;
}

export const Sidebar = ({ title, children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Button to toggle the sidebar (only shown when sidebar is closed) */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="z-30 h-screen sticky top-0 flex items-center justify-center p-2 mt-2 ms-2 max-md:m-2 max-md:items-center text-sm bg-blue-500 border-2 shadow-lg text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200 duration-150 ease-in-out"
      >
        <PanelRightClose size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-80 h-full bg-white text-gray-900 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } border-r-2 shadow-lg`}
      >
        <div className="px-3 py-4 h-full overflow-y-auto">
          <div className="space-y-2 font-medium">
            <div className="mb-5 flex gap-5 items-center justify-between">
              <h2 className="capitalize font-semibold text-2xl">{title}</h2>
              {/* Close Button */}
              <button onClick={toggleSidebar} type="button">
                <X size={25} color="red" />
              </button>
            </div>
            {/* Sidebar content that can scroll */}
            {children}
          </div>
        </div>
      </aside>
    </>
  );
};
