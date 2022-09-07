import { MULTIPLIER, DIVIDER } from "./consts"
import { SubPod, PodImg } from "./type";

export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
      if (predicate(array[l], l, array))
          return l;
  }
  return -1;
}

export const generateOperation = (operator: string) => {
  switch(operator) {
    case '+': {
      return (a: number, b: number) => a + b
    }
    case '-': {
      return (a: number, b: number) => a - b
    }
    case MULTIPLIER: {
      return (a: number, b: number) => a * b
    }
    case DIVIDER: {
      return (a: number, b: number) => {
        if (b === 0) return 0
        return a / b
      }
    }
    default: {
      return () => 0
    }
  }
}

export const multiplyOrDiviseFirst = (numbers: number[], operators: string[]) => {
  let copiedNumbers = [...numbers]
  let copiedOperators = [...operators]

  while (
    copiedOperators.length > 1 &&
    copiedOperators.some(operator => operator === MULTIPLIER || operator === DIVIDER) &&
    !copiedOperators.every(operator => operator === MULTIPLIER)
  ) {
    const targetOperatorIndex = copiedOperators.findIndex(o => o === MULTIPLIER || o === DIVIDER)
    const [firstPart, secondPart] = copiedNumbers.slice(targetOperatorIndex, targetOperatorIndex + 2)

    const partialResult = generateOperation(copiedOperators[targetOperatorIndex])(firstPart, secondPart)

    copiedNumbers = [
      ...copiedNumbers.slice(0, targetOperatorIndex),
      partialResult,
      ...copiedNumbers.slice(targetOperatorIndex + 2)
    ]

    copiedOperators = [
      ...copiedOperators.slice(0, targetOperatorIndex),
      ...copiedOperators.slice(targetOperatorIndex + 1)
    ]
  }

  return {
    copiedNumbers,
    copiedOperators
  }
}
