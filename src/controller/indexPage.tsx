import { useState } from "react"
import { IKey, KeyType, KEYS } from "../libs/consts"
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

    // オペレーター処理
    switch(input.label) {
      case '=': {
        queue.push(input)
        let results: unknown[] = []
        let tmp: string = ''

        // 11 + 11 = 22
        for (const data of queue) {
          if (data.type === KeyType.operator) {
            results.push(parseFloat(tmp))
            tmp = ''
            results.push(data.label)
          } else {
            tmp += data.label
          }
        }

        // 残りをresultsに入れる
        if (tmp) {
          results.push(tmp)
        }

        // TODO: 演算
        console.log({ results, tmp })
        break;
      }
      default: {
        if (queue.length < 1) return

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
