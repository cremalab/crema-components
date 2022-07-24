import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import { v4 } from "uuid"
import { Toast } from "../components/Toast"

interface Position {
  vertical?: "top" | "center" | "bottom"
  horizontal?: "left" | "center" | "right"
}

export interface ToasterConfig {
  duration?: number
  autoDismiss?: boolean
  position?: Position
}

interface ToasterProviderProps {
  children: ReactNode
  config?: ToasterConfig
}

type NotificationType = "success" | "info" | "error" | "warning"

type Notification = {
  id: string
  message: string
  type: NotificationType
  onClose?: () => void
  action?: ReactNode
}

interface ContextProps {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
}

export const ToasterContext = createContext<ContextProps>({
  notifications: [],
  addNotification: (notification) => [notification],
})

const DEFAULT_POSITION: Position = {
  vertical: "bottom",
  horizontal: "center",
}

const DEFAULT_DURATION = 5000

const ANIMATION_DURATION = 300

export function ToasterProvider({
  children,
  config = {},
}: ToasterProviderProps) {
  const {
    duration = DEFAULT_DURATION,
    autoDismiss = true,
    position = DEFAULT_POSITION,
  } = config

  const id = v4()

  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const timer = setTimeout(
      () => setNotifications(notifications.slice(1)),
      duration + ANIMATION_DURATION,
    )
    return () => {
      clearTimeout(timer)
    }
  }, [notifications, duration])

  const addNotification: ContextProps["addNotification"] = useCallback(
    (notification) =>
      setNotifications((notifications) => [
        { ...notification, id },
        ...notifications,
      ]),
    [id],
  )

  return (
    <ToasterContext.Provider value={{ notifications, addNotification }}>
      {children}
      <div>
        {notifications.map((notification) => (
          <div key={notification.id}>
            <Toast
              showToast={true}
              autoDismiss={autoDismiss}
              duration={duration}
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
