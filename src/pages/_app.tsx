import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Tab, TabContext } from '../context/tabContext'
import { ToastContainer, toast } from 'react-toastify'
import { ServiceWorkerUpdateListener } from '../serviceWorkerUpdateListener'
import { BeforeInstallPromptEvent } from '../libs/type'
import '../styles/globals.css'
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [tabState, setTabState] = useState<Tab>('CALCULATOR')
  const [updateWaiting, setUpdateWaiting] = useState(false)
  const [registration, setRegistration] = useState(null)
  const [swListener, setSwListener] = useState({})
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === "development" || typeof window === undefined) return

    if("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log("Service Worker registration successful with scope: ", registration.scope);
        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        }
      );
    }

    let listener = new ServiceWorkerUpdateListener()
    setSwListener(listener)

    // @ts-ignore
    listener.onupdateinstalling = (installingEvent) => {
      console.log("SW installed", installingEvent)
    }

    // @ts-ignore
    listener.onupdatewaiting = (waitingEvent) => {
      console.log("new update waiting", waitingEvent)
      setUpdateWaiting(true)
    };
    // @ts-ignore
    listener.onupdateready = (event) => {
      console.log("updateready event", event)
      window.location.reload()
    };

    navigator.serviceWorker.getRegistration().then((reg) => {
      console.log('sw getRegistration')
      // @ts-ignore
      listener.addRegistration(reg)
      // @ts-ignore
      setRegistration(reg)
    });

    // @ts-ignore
    return () => listener.removeEventListener()
  }, [])

  useEffect(() => {
    if (!window) return

    const ready = (e: Event) => {
      e.preventDefault()
      const deferredPrompt = (e as BeforeInstallPromptEvent)
      toast.info(
        <div>
          <p>You can install App version!</p>
          <button onClick={() => deferredPrompt.prompt()}>Install</button>
        </div>, {
        position: 'bottom-center',
        autoClose: false,
      })
    }

    window.addEventListener('beforeinstallprompt', ready)

    return () => window.removeEventListener('beforeinstallprompt', ready)
  }, [])

  useEffect(() => {
    if (updateWaiting) {
      toast.info(
        <div>
          <p>New Version is Ready!</p>
          <button onClick={() => {
            // @ts-ignore
            swListener.skipWaiting(registration.waiting);
          }}>
            Update
          </button>
        </div>, {
        position: 'bottom-center',
        autoClose: false,
      })
    }
  }, [updateWaiting])

  return (
    <TabContext.Provider value={{ tabState, setTabState }}>
      <Component {...pageProps} />
      <ToastContainer />
    </TabContext.Provider>
  )
}
