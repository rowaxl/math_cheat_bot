interface NumberPadProps {
  handleKeyInput: (input: string) => void
}

const KEYPAD = [
  'AC', '+/-', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
]

const NumberPad = ({ handleKeyInput }: NumberPadProps) => {
  return (
    <div>
      {
        KEYPAD.map(key =>
          <div
            key={`keypad_button_${key}`}
            onClick={() => handleKeyInput(key)}
          >
            {key}
          </div>
        )
      }
    </div>
  )
}

export default NumberPad
