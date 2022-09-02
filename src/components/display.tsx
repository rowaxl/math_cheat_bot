interface DisplayProps {
  value?: string
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className={`flex w-full bg-gray-700 overflow-hidden border-b-2 border-b-black items-center justify-end px-4 py-4 rounded-t-xl`}>
      <p className={`text-4xl overflow-hidden text-ellipsis text-white text-right font-bold`}>
        { value }
      </p>
    </div>
  )
}

export default Display
