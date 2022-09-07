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
        className={`${currentTab === 'CALCULATOR' && 'active'}`}
        onClick={() => { handleOnClikTab('CALCULATOR') }}
      >
        <span className="btm-nav-label">Calculator</span>
      </button>
      <button
        className={`${currentTab === 'BOT' && 'active'}`}
        onClick={() => { handleOnClikTab('BOT') }}
      >
        <span className="btm-nav-label">Math BOT</span>
      </button>
    </div>
  )
}

export default PageTab
