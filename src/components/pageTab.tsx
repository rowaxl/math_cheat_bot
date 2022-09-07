import { useRouter } from "next/router"
import { useContext } from "react"
import { Tab, TabContext } from "../context/tabContext"

const PageTab = () => {
  const router = useRouter()
  const { tabState: currentTab, setTabState } = useContext(TabContext)

  const handleOnClikTab = (newTab: Tab) => {
    router.push(newTab === 'CALCULATOR' ? '/' : '/bot')
    setTabState(newTab)
  }

  return (
    <div className="btm-nav">
      <button
        className={`${currentTab === 'CALCULATOR' ?
          'bg-blue-400 text-blue-800 active' :
          'text-blue-200'
        }`}
        onClick={() => { handleOnClikTab('CALCULATOR') }}
      >
        <span className="btm-nav-label">Calculator</span>
      </button>
      <button
         className={`${currentTab === 'BOT' ?
          'bg-blue-400 text-blue-800 active' :
          'text-blue-200'
        }`}
        onClick={() => { handleOnClikTab('BOT') }}
      >
        <span className="btm-nav-label">Math BOT</span>
      </button>
    </div>
  )
}

export default PageTab
