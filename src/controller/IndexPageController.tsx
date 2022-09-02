import { useState } from "react"
import IndexPageLayout from "../layouts/IndexPageLayout"

const IndexPageController = () => {
  const [displayValue, setDisplayValue] = useState('0')
  const handleKeyInput = (input: string) => {
    setDisplayValue(input)
  }

  return (
    <IndexPageLayout
      displayValue={displayValue}
      handleKeyInput={handleKeyInput}
    />
  )
}

export default IndexPageController
