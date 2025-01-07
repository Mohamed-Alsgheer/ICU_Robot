import { TextareaHTMLAttributes } from "react"

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean

}

export const Textarea = ({isError, ...rest}: IProps) => {
  return (
    <textarea
      className={`p-3 border-[1px] shadow-sm focus:ring-1 outline-none rounded-lg text-lg w-full bg-transparent duration-150 ease-in-out ${isError ? "border-red-400 focus:border-red-600 focus:ring-red-600": "border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"}`}
      rows={6} {...rest}
    />
  )
}
