import Head from "next/head"
import Display from "../components/display"
import Layout from "../components/layout"
import NumberPad from "../components/numberPad"

interface IndexPageLayoutProps {
  displayValue: string
  handleKeyInput: (input: string) => void
}

const IndexPageLayout = ({
  displayValue,
  handleKeyInput,
}: IndexPageLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Math Cheat: Calculator</title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <Layout>
        <Display value={displayValue} />
        <NumberPad handleKeyInput={handleKeyInput} />
      </Layout>
    </div>
  )
}

export default IndexPageLayout
