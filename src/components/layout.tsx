import { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => (
  <main className={`flex w-full max-w-sm min-h-screen flex-col justify-center items-center flex-1`}>
    { children }
  </main>
)
export default Layout
