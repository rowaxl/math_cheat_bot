import { createContext, PropsWithChildren, FC, useState, ComponentProps } from "react"
import { useRouter } from "next/router"

export type Tab = 'CALCULATOR' | 'BOT'

export const TabContext = createContext({} as {
  tabState: Tab,
  setTabState: React.Dispatch<React.SetStateAction<Tab>>
})

export const TabContextProvider = ({ children }: ComponentProps<FC<PropsWithChildren>>) => {
  const router = useRouter()
  const { pathname } = router
  const [tabState, setTabState] = useState<Tab>(pathname === '/' ? 'CALCULATOR' : 'BOT')
  const value = {
    tabState,
    setTabState
  }

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  )
}