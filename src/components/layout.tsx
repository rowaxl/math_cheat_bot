import { PropsWithChildren } from "react"
import PageTab from "./pageTab"

const Layout = ({ children }: PropsWithChildren) => (
  <main className={`flex w-full px-4 max-w-sm min-h-screen flex-col justify-center items-center flex-1 pb-16`}>
    { children }

    <PageTab />
  </main>
)
export default Layout
