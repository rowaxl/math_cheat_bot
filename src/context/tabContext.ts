import React, { createContext } from "react";

export type Tab = 'CALCULATOR' | 'BOT'

export const TabContext = createContext({} as {
  tabState: Tab,
  setTabState: React.Dispatch<React.SetStateAction<Tab>>
})
