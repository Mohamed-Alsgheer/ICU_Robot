import { LabelHTMLAttributes, ReactNode } from "react";

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({children, ...rest}: IProps) => {
  return (
    children ?
    (<label className="text-lg font-medium mb-1 inline-block capitalize" {...rest}>{children}</label>) : null
  )
}
