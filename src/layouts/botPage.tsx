import Head from "next/head"
import Layout from "../components/layout"
import PageTab from "../components/pageTab"
import { IKey } from "../libs/consts"

interface BOTPageLayoutProps {
  displayValue: string
  handleKeyInput: (key: IKey) => void
}

const BotPageLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Math Cheat: Your Math BOT</title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <Layout>
      </Layout>

      <PageTab />
    </div>
  )
}

export default BotPageLayout
