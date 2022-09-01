import { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => (
  <main className={`max-w-lg max-h-full flex-col items-center justify-center flex-1`}>
    { children }
  </main>
)
export default Layout
