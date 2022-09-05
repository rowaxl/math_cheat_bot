
export interface IKey {
  label: string
  type: KeyType,
}

export enum KeyType {
  operator,
  number,
  arithmetic,
}

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
