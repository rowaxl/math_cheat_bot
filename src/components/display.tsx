interface DisplayProps {
  value?: string
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className={`flex w-full bg-gray-700 overflow-hidden text-ellipsis text-white text-right font-bold border-b-2 border-b-black items-center justify-end text-6xl px-4 py-4 rounded-t-xl`}>
      { value }
    </div>
  )
}

export default Display
