
interface IProps {
  message?: string
}

export const InputErorrMessage = ({message}: IProps) => {
  return (
    message ? 
    (<span className="block mt-1 ml-1 text-red-600 font-medium text-base">{message}</span>) : null
  )
}
