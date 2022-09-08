import { useState } from "react"
import BotPageLayout from "../layouts/botPage"
import { fetchCalculateResult } from "../libs/fetcher"
import { Pod } from "../libs/type"


const BotPageController = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pods, setPods] = useState<Pod[]>()

  const handleSubmitQuery = async (query: string) => {
    setIsLoading(true)

    const results = await fetchCalculateResult(query)

    setPods(results)
    setIsLoading(false)
  }

  const handleReset = () => {
    setPods(undefined)
  }

  return (
    <BotPageLayout
      handleSubmitQuery={handleSubmitQuery}
      handleReset={handleReset}
      isLoading={isLoading}
      podData={pods}
    />
  )
}

export default BotPageController
