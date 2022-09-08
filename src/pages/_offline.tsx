import { useContext, useEffect } from "react";
import { OnlineStatusContext } from "../context/onlineStatusContext";
import IndexPageController from "../controller/indexPage";

export default () => {
  const { setIsOnline } = useContext(OnlineStatusContext)
  useEffect(() => {
    setIsOnline(false)
    console.log('its offline')
  }, [])

  return (
    <IndexPageController />
  )
}