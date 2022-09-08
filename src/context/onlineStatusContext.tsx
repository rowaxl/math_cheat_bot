import React, { ComponentProps, createContext, FC, PropsWithChildren, useState } from "react";

export const OnlineStatusContext = createContext({} as {
  isOnline: boolean,
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>
})

export const OnlineStatusContextProvider = ({ children }: ComponentProps<FC<PropsWithChildren>>) => {
  const [isOnline, setIsOnline] = useState(true)
  const value = {
    isOnline,
    setIsOnline
  }

  return (
    <OnlineStatusContext.Provider value={value}>
      {children}
    </OnlineStatusContext.Provider>
  )
}