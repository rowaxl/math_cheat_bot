import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { ServiceWorkerUpdateListener } from '../serviceWorkerUpdateListener'
import { BeforeInstallPromptEvent } from '../libs/type'
import '../styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import AppContextProvider from '../context/appContextProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [updateWaiting, setUpdateWaiting] = useState(false)
  const [registration, setRegistration] = useState(null)
  const [swListener, setSwListener] = useState({})

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
      toast.dismiss()
      if (localStorage.getItem('prompt-dismissed')) return

      const deferredPrompt = (e as BeforeInstallPromptEvent)

      const handleInstallPWA = async () => {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'dismissed') {
          localStorage.setItem('prompt-dismissed', 'true')
        }
      }

      const handleDismissPrompt = () => {
        localStorage.setItem('prompt-dismissed', 'true')
        toast.dismiss()
      }

      toast.info(
        <div className="flex flex-col">
          <p>You can use App version!</p>
          <div className="flex flex-row gap-2 mt-2">
            <button className="w-1/2 btn btn-primary" onClick={handleInstallPWA}>
              Install it!
            </button>
            <button className="w-1/2 btn btn-outline btn-warning" onClick={handleDismissPrompt}>
              Don't show this again
            </button>
          </div>
        </div>, {
        position: 'bottom-center',
        autoClose: false,
        closeOnClick: false
      })
    }

    window.addEventListener('beforeinstallprompt', ready)

    return () => window.removeEventListener('beforeinstallprompt', ready)
  }, [])

  useEffect(() => {
    if (updateWaiting) {
      const handleUpdate = () => {
        console.log('apply updating sw')
        toast.dismiss()
        // @ts-ignore
        swListener.skipWaiting(registration.waiting);
      }

      toast.info(
        <div className="flex flex-col">
          <p>New Version is Ready!</p>
          <button className="btn btn-primary btn-outline" onClick={handleUpdate}>
            Update
          </button>
        </div>,
        {
          position: 'bottom-center',
          autoClose: false,
          closeOnClick: false,
          closeButton: false
        }
      )
    }
  }, [updateWaiting])

  return (
    <AppContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AppContextProvider>
  )
}
