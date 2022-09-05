import { useState } from "react"
import { IKey, KeyType, MULTIPLIER, DIVIDER } from "../libs/consts"
import { generateOperation, multiplyOrDiviseFirst } from "../libs/utils"
import IndexPageLayout from "../layouts/indexPage"

let queue:IKey[] = []
const IndexPageController = () => {
  const [displayValue, setDisplayValue] = useState('0')

  const handleKeyInput = (input: IKey) => {
    if (queue.length > 20) return

    if (input.type === KeyType.number) {
      queue.push(input)
      setDisplayValue(queue.map(q => q.label).join(''))
      return
    }

    if (queue.length === 0) return

    // オペレーター処理
    switch(input.label) {
      case '=': {
        if (queue[queue.length - 1].type === KeyType.operator) return

        queue.push(input)

        let numbers: number[] = []
        let operators: string[] = []
        let tmp: string = ''

        for (const data of queue) {
          if (data.type === KeyType.operator) {
            numbers.push(parseFloat(tmp))
            tmp = ''
            if (data.label !== '=') operators.push(data.label)
          } else {
            tmp += data.label
          }
        }

        console.log({
          numbers,
          operators,
          isMultipleOperator: operators.length > 1,
          includesMultiplierOrDivider: operators.some(operator => operator === MULTIPLIER || operator === DIVIDER),
          notEveryOperatorMultiply: !operators.every(operator => operator === MULTIPLIER)
        })

        // 1 + 2 * 3 + 4 => 1 + 6 + 4に先行計算
        // 掛け算・割り算を先にやる必要がある場面： 掛け算・割り算を含むoperatorが2つ以上ある かつ 掛け算だけではない
        const {
          copiedNumbers: priorOperatedNumbers,
          copiedOperators: priorOperatedOperators
        } = multiplyOrDiviseFirst(numbers, operators)

        numbers = priorOperatedNumbers
        operators = priorOperatedOperators

        // 四則演算
        const result = numbers.reduce((previous, current, index) => {
          if (index === 0) return current

          const operator = operators.shift() || ''

          return generateOperation(operator)(previous, current)
        }, 0)

        setDisplayValue(result.toString())
        queue = []

        return;
      }
      default: {
        if (queue.length < 1) return

        if (queue[queue.length - 1].type === KeyType.operator) {
          queue.pop()
        }

        queue.push(input)
        setDisplayValue(queue.map(q => q.label).join(''))
        break;
      }
      // case 'AC': {
      //   if (queue.some(q => q.type === KeyType.operator) && queue[queue.length - 1].type === KeyType.operator) {
      //     // 操作中かつ、最後の操作がoperatorでない場合、operatorまでの数字を初期化する
      //     const operatorIndex = queue.findIndex(q => q.type === KeyType.operator && q.label !== '-')
      //     queue = queue.slice(0, operatorIndex)
      //     return
      //   }

      //   // 全初期化する
      //   queue = []
      //   break;
      // }
      // case '+/-': {
      //   // 100 -> -100
      //   // 100 + (-100)
      //   break;
      // }
      // case '%': {
      //   if (queue.length < 1 || queue[0].label === '0') return

      //   if (queue.some(q => q.type === KeyType.operator)) {
      //     // const
      //   }
      // }
    }

    setDisplayValue(
      queue.length > 0 ?
        queue.map(q => q.label).join('') :
        '0'
    )
  }

  return (
    <IndexPageLayout
      displayValue={displayValue}
      handleKeyInput={handleKeyInput}
    />
  )
}

export default IndexPageController
