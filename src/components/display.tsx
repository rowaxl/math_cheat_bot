interface DisplayProps {
  value?: string
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className={`flex w-full bg-gray-700 overflow-hidden text-md text-ellipsis text-white text-right`}>
      { value }
    </div>
  )
}

export default Display
