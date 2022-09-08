import { TabContextProvider } from "./tabContext"
import { OnlineStatusContextProvider } from "./onlineStatusContext"
import combineComponents from "./combineComponents"

const providers = [
  TabContextProvider,
  OnlineStatusContextProvider
]

export default combineComponents(...providers)
