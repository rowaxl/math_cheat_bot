
export interface IKey {
  label: string
  type: KeyType,
}

export enum KeyType {
  operator,
  number,
  arithmetic,
  parenthesis,
}

type KEY_NAME = "AC" | "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "SIX" | "SEVEN" | "EIGHT" | "NINE" | "CHANGE" | "MINUS" | "PERCENTAGE" | "PLUS" | "SUB" | "MULTI" | "DIV" | "EQUAL" | "DOT" | "PARENTHESIS_OPEN" | "PARENTHESIS_CLOSE"

export const MULTIPLIER = '×'
export const DIVIDER = '÷'

export const KEYS = {
  ZERO: { label: '0', type: KeyType.number },
  ONE: { label: '1', type: KeyType.number },
  TWO: { label: '2', type: KeyType.number },
  THREE: { label: '3', type: KeyType.number },
  FOUR: { label: '4', type: KeyType.number },
  FIVE: { label: '5', type: KeyType.number },
  SIX: { label: '6', type: KeyType.number },
  SEVEN: { label: '7', type: KeyType.number },
  EIGHT: { label: '8', type: KeyType.number },
  NINE: { label: '9', type: KeyType.number },
  AC: { label: 'AC', type: KeyType.operator },
  CHANGE: { label: '+/-', type: KeyType.arithmetic },
  MINUS: { label: '-', type: KeyType.arithmetic },
  PERCENTAGE: { label: '%', type: KeyType.operator },
  PLUS: { label: '+', type: KeyType.operator },
  SUB: { label: '-', type: KeyType.operator },
  MULTI: { label: MULTIPLIER, type: KeyType.operator },
  DIV: { label: DIVIDER, type: KeyType.operator },
  EQUAL: { label: '=', type: KeyType.operator },
  DOT: { label: '.', type: KeyType.number },
  PARENTHESIS_OPEN: { label: '(', type: KeyType.parenthesis },
  PARENTHESIS_CLOSE: { label: ')', type: KeyType.parenthesis },
}

export const KEYPAD = [
  KEYS.AC,
  KEYS.CHANGE,
  KEYS.PERCENTAGE,
  KEYS.DIV,
  KEYS.SEVEN,
  KEYS.EIGHT,
  KEYS.NINE,
  KEYS.MULTI,
  KEYS.FOUR,
  KEYS.FIVE,
  KEYS.SIX,
  KEYS.SUB,
  KEYS.ONE,
  KEYS.TWO,
  KEYS.THREE,
  KEYS.PLUS,
  KEYS.ZERO,
  KEYS.DOT,
  KEYS.EQUAL,
]

export const findKey = (char: string) => {
  const foundKey = Object.keys(KEYS).find((key) =>
    KEYS[key as KEY_NAME].label === char
  )

  return foundKey ? KEYS[foundKey as KEY_NAME] : undefined
}

export const stringToKeys = (value: string): IKey[] => {
  const keys = []
  const chars = value.split('')
  let i = 0

  while(i < value.length) {
    const foundKey = findKey(chars.shift() as string)
    if (foundKey) {
      keys.push(foundKey)
    }

    i++
  }

  // trim last .00
  if (
    keys[keys.length -1].label === KEYS.ZERO.label &&
    keys.some(key => key.label === KEYS.DOT.label)
  ) {
    while(
      keys[keys.length -1].label === KEYS.ZERO.label ||
      keys[keys.length -1].label === KEYS.DOT.label
    ) {
      keys.pop()
    }
  }

  return keys
}
