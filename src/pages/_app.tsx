import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Tab, TabContext } from '../context/tabContext'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [tabState, setTabState] = useState<Tab>('CALCULATOR')

  return (
    <TabContext.Provider value={{ tabState, setTabState }}>
      <Component {...pageProps} />
    </TabContext.Provider>
  )
}
