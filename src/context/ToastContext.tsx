import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"

interface ToastProviderProps {
  children: ReactNode
}

interface ContextProps {
  toasts: JSX.Element[]
  addToast: (id: JSX.Element) => void
}

export const ToastContext = createContext<ContextProps>({
  toasts: [],
  addToast: (toast) => [toast],
})

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<JSX.Element[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setToasts(toasts.slice(1)), 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [toasts.length, toasts])

  const addToast = useCallback(
    (toast: JSX.Element) => setToasts((toasts) => [toast, ...toasts]),
    [],
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.props.id}>{toast}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
