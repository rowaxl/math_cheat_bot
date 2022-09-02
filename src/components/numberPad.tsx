interface NumberPadProps {
  handleKeyInput: (input: string) => void
}

export enum KeyType {
  operator,
  number
}

const KEYPAD = [
  { label: 'AC', type: KeyType.operator },
  { label: '+/-', type: KeyType.operator },
  { label: '%', type: KeyType.operator },
  { label: '÷', type: KeyType.operator },
  { label: '7', type: KeyType.number },
  { label: '8', type: KeyType.number },
  { label: '9', type: KeyType.number },
  { label: '×', type: KeyType.operator },
  { label: '4', type: KeyType.number },
  { label: '5', type: KeyType.number },
  { label: '6', type: KeyType.number },
  { label: '-', type: KeyType.operator },
  { label: '1', type: KeyType.number },
  { label: '2', type: KeyType.number },
  { label: '3', type: KeyType.number },
  { label: '+', type: KeyType.operator },
  { label: '0', type: KeyType.number },
  { label: '.', type: KeyType.number },
  { label: '=', type: KeyType.operator },
]

const NumberPad = ({ handleKeyInput }: NumberPadProps) => {
  return (
    <div className={`w-full grid grid-cols-4 grid-flow-row gap-0 rounded-b-xl`}>
      {
        KEYPAD.map(({ label, type }, i) =>
          <div
            className={`text-2xl text-center text-white cursor-pointer py-6 border-gray-600 border-b-2 border-l-2 ${i % 4 === 3 && 'border-r-2'} ${type === KeyType.number ? 'bg-gray-400' : 'bg-orange-400'} ${label === '0' && 'col-span-2 rounded-bl-xl'} ${label === '=' && 'border-r-2 rounded-br-xl'}`}
            key={`keypad_button_${label}`}
            onClick={() => handleKeyInput(label)}
          >
            {label}
          </div>
        )
      }
    </div>
  )
}

export default NumberPad
