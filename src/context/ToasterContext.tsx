import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import { v4 } from "uuid"
import { Toast as ToastCard } from "../components/Toast"

interface Position {
  vertical?: "top" | "center" | "bottom"
  horizontal?: "left" | "center" | "right"
}

export interface ToasterConfig {
  duration?: number
  animationDuration?: number
  autoDismiss?: boolean
  position?: Position
}

export const createToasterConfig = (config: ToasterConfig) => config

interface ToasterProviderProps {
  children: ReactNode
  config?: ToasterConfig
}

type ToastType = "success" | "info" | "error" | "warning"

type Toast = {
  id: string
  message: string
  type: ToastType
  onClose?: () => void
  action?: ReactNode
}

interface ContextProps {
  toasts: Toast[]
  addToast: (notification: Omit<Toast, "id">) => void
}

export const ToasterContext = createContext<ContextProps>({
  toasts: [],
  addToast: (notification) => [notification],
})

const DEFAULT_POSITION: Position = {
  vertical: "bottom",
  horizontal: "center",
}

const DEFAULT_DURATION = 5000

const DEFAULT_ANIMATION_DURATION = 300

export function ToasterProvider({
  children,
  config = {},
}: ToasterProviderProps) {
  const {
    duration = DEFAULT_DURATION,
    autoDismiss = true,
    position = DEFAULT_POSITION,
    animationDuration = DEFAULT_ANIMATION_DURATION,
  } = config

  const id = v4()

  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const timer = setTimeout(
      () => setToasts(toasts.slice(1)),
      duration + DEFAULT_ANIMATION_DURATION,
    )
    return () => {
      clearTimeout(timer)
    }
  }, [toasts, duration])

  const addToast: ContextProps["addToast"] = useCallback(
    (notification) =>
      setToasts((toasts) => [{ ...notification, id }, ...toasts]),
    [id],
  )

  return (
    <ToasterContext.Provider value={{ toasts, addToast }}>
      {children}
      <div>
        {toasts.map((notification) => (
          <div key={notification.id}>
            <ToastCard
              showToast={true}
              autoDismiss={autoDismiss}
              duration={duration}
              animationDuration={animationDuration}
              horizontalPosition={position.horizontal}
              verticalPosition={position.vertical}
              handleClose={notification.onClose}
              message={notification.message}
              action={notification.action}
              type={notification.type}
            />
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  )
}
