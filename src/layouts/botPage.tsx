import Head from "next/head"
import FormularForm from "../components/formularForm"
import Layout from "../components/layout"
import { Pod } from "../libs/type"
import Pods from "../components/pods"

interface BOTPageLayoutProps {
  handleSubmitQuery: (query: string) => void
  handleReset: () => void
  isLoading: boolean
  podData?: Pod[]
}

const BotPageLayout = ({
  handleSubmitQuery,
  handleReset,
  isLoading,
  podData,
}: BOTPageLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Math Cheat: Your Math BOT</title>
      </Head>

      <Layout>
        <FormularForm
          handleSubmit={handleSubmitQuery}
          handleReset={handleReset}
          isLoading={isLoading}
        />

        <Pods pods={podData} />
      </Layout>
    </div>
  )
}

export default BotPageLayout
