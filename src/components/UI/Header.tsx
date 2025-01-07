import { ReactNode } from "react";


interface IProp {
  heading: ReactNode;
  subtitle?: ReactNode;
}

export const Header = ({heading, subtitle}: IProp) => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 capitalize">
          {heading}
        </h1>
        {subtitle ? 
        <p className="text-lg sm:text-xl font-medium text-gray-600 mt-2">
            {subtitle}
        </p>
        : null}
      </div>
    </>
  )
}
