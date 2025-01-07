import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

interface IProps {
  to: string;
  label: string;
  icon?: ReactNode;
  isChild?: boolean;
}

export const SidebarLink = ({ to, label, icon, isChild = false }: IProps) => {
  return (
    <NavLink
      to={to}
      className={
        `capitalize flex items-center w-full p-2 duration-150 ease-in-out rounded-lg ${isChild ? "pl-10" : "pl-2"} hover:bg-[#f1f1f1] hover:text-blue-700`}
    >
      {icon && <span className="me-2">{icon}</span>}
      <span>{label}</span>
    </NavLink>
  );
};
