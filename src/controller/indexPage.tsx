import { useState } from "react"
import { IKey, KeyType, KEYS, stringToKeys, } from "../libs/consts"
import { findLastIndex, generateOperation, multiplyOrDiviseFirst } from "../libs/utils"
import IndexPageLayout from "../layouts/indexPage"
import { handleQueueInput } from "../libs/queue"


const IndexPageController = () => {
  const [displayValue, setDisplayValue] = useState('0')

  const handleKeyInput = (input: IKey) => {
    const queueResult = handleQueueInput(input)

    setDisplayValue(
      queueResult.length > 0 ?
      queueResult.map(q => q.label).join('') :
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
