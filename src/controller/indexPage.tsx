import { useState } from "react"
import { IKey, KeyType, KEYS, stringToKeys, } from "../libs/consts"
import { findLastIndex, generateOperation, multiplyOrDiviseFirst } from "../libs/utils"
import IndexPageLayout from "../layouts/indexPage"

let queue:IKey[] = []
const IndexPageController = () => {
  const [displayValue, setDisplayValue] = useState('0')

  const handleKeyInput = (input: IKey) => {
    if (queue.length > 20) return

    if (input.type === KeyType.number) {
      if (queue.length === 0 || queue[queue.length - 1].type !== KeyType.parenthesis) {
        queue.push(input)
      } else {
        queue.splice(queue.length - 1, 0, input)
      }

      setDisplayValue(queue.map(q => q.label).join(''))
      return
    }

    // オペレーター処理
    switch(input.label) {
      case '=': {
        if (queue.length < 1) return
        if (queue.every(q => q.type !== KeyType.operator)) return
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
          } else if (data.type !== KeyType.parenthesis) {
            tmp += data.label
          }
        }

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
        queue = stringToKeys(result.toString())

        return;
      }
      case 'AC': {
        // operator + 数字の場合、operator後の数字のみクリア
        if (
          queue.some(q => q.type === KeyType.operator) &&
          queue[queue.length - 1].type !== KeyType.operator
        ) {
          const operatorIndex = findLastIndex(queue, q => q.type === KeyType.operator)
          queue = queue.slice(0, operatorIndex + 1)

          setDisplayValue(
            queue.length > 0 ?
              queue.map(q => q.label).join('') :
              '0'
          )
          return
        }

        // 全初期化する
        queue = []
        break;
      }
      case '+/-': {
        if (queue.length < 1) return

        if (queue.some(q => q.type === KeyType.operator)) {
          const operatorIndex = findLastIndex(queue, q => q.type === KeyType.operator)

          // 最後がoperatorの場合、次の数字の符号を変える。数字がある場合、数字を括弧に入れる
          if (operatorIndex === queue.length - 1) {
            queue.splice(operatorIndex + 1, 0, KEYS.PARENTHESIS_OPEN, KEYS.MINUS, KEYS.PARENTHESIS_CLOSE)
          } else if (queue[operatorIndex + 1].type !== KeyType.parenthesis) {
            queue.splice(operatorIndex + 1, 0, KEYS.PARENTHESIS_OPEN, KEYS.MINUS)
            queue.push(KEYS.PARENTHESIS_CLOSE)
          } else {
            const partial = queue.slice(operatorIndex + 1).filter(p => p.type === KeyType.number)
            queue.splice(operatorIndex + 1, 0, ...partial)
          }

          setDisplayValue(queue.map(q => q.label).join(''))
          return
        }

        if (queue[0].type === KeyType.parenthesis) {
          queue = queue.filter(q => q.type !== KeyType.parenthesis && q.type !== KeyType.arithmetic)
        } else {
          queue.unshift(KEYS.PARENTHESIS_OPEN, KEYS.MINUS)
          queue.push(KEYS.PARENTHESIS_CLOSE)
        }

        break;
      }
      case '%': {
        if (queue.length < 1) return

        // 数字のみの場合は、 / 100する
        if (queue.every(q => q.type !== KeyType.operator)) {
          const baseValue = queue.reduce((a, c) => a += c.label,'')
          const percentaged = parseFloat(baseValue) / 100

          queue = stringToKeys(percentaged.toFixed(2))
        } else if (queue[queue.length - 1].type === KeyType.operator) {
          // operatorで終わる場合は、[前の数字, operator, 前の数字％]
          const lastNumberStartedAt = queue.filter(q => q.type === KeyType.operator).length > 1 ?
            findLastIndex(queue.slice(0, queue.length - 1), (q) => q.type === KeyType.operator) :
            0

          const partialValue = queue.slice(lastNumberStartedAt, queue.length - 1).reduce((a, c) => a += c.label,'')
          const percentaged = (parseFloat(partialValue) / 100) * parseFloat(partialValue)

          queue.push(...stringToKeys(percentaged.toFixed(2)))
        } else {
          // 数字, operator, 数字の場合、[前の数字, operator, (次の数字 / 前の数字)％]
          // 20 + 20%
          const baseNumberStartedAt = queue.filter(q => q.type === KeyType.operator).length > 1 ?
            findLastIndex(queue.slice(0, queue.length - 1), (q) => q.type === KeyType.operator) :
            0

          const lastNumberStartedAt = queue.filter(q => q.type === KeyType.operator).length > 1 ?
            findLastIndex(queue.slice(0, queue.length - 1), (q) => q.type === KeyType.operator) :
            findLastIndex(queue, (q) => q.type === KeyType.operator)

          const partialBase = queue.slice(baseNumberStartedAt, lastNumberStartedAt).reduce((a, c) => a += c.label,'')
          const partialPercentatge = queue.slice(lastNumberStartedAt, queue.length - 1).reduce((a, c) => a += c.label,'')
          const percentaged = (parseFloat(partialPercentatge) / 100) * parseFloat(partialBase)

          queue = [...queue.slice(0, lastNumberStartedAt + 1), ...stringToKeys(percentaged.toFixed(2))]
        }
        break
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
