import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { v4 } from "uuid"
import { Transition, TransitionGroup } from "react-transition-group"
import { Toast as ToastCard } from "../components/Toast"
import { Position, Toast } from "../types/Toast"
import { useKeyPress } from "../hooks/useKeyPress"
import {
  getToastPositionStyles,
  getToastTransitionStyles,
} from "../utils/toastUtils"

interface Config {
  duration: number
  animationDuration: number
  position: Position
  behavior: "stack" | "replace"
}

export class ToasterConfig {
  private duration: Config["duration"]
  private animationDuration: Config["animationDuration"]
  private position: Config["position"]
  private behavior: Config["behavior"]
  constructor(config: Partial<Config> = {}) {
    this.duration = config.duration || 5000
    this.animationDuration = config.animationDuration || 300
    this.position = config.position || {
      vertical: "bottom",
      horizontal: "center",
    }
    this.behavior = config.behavior || "stack"
  }

  getConfig() {
    return {
      duration: this.duration,
      animationDuration: this.animationDuration,
      position: this.position,
      behavior: this.behavior,
    }
  }
}

interface ToasterProviderProps {
  children: ReactNode
  config: ToasterConfig
}

interface ContextProps {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeAll: () => void
}

export const ToasterContext = createContext<ContextProps>({
  toasts: [],
  addToast: () => null,
  removeAll: () => null,
})

export function ToasterProvider({ children, config }: ToasterProviderProps) {
  const { animationDuration, duration, behavior, position } = config.getConfig()
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isExiting, setIsExiting] = useState(false)
  const timer = useRef<NodeJS.Timeout>()

  console.log(toasts)

  const removeToast = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }, [])

  const removeOldest = useCallback(() => {
    setToasts((toasts) => toasts.slice(1))
  }, [])

  useKeyPress(["Escape"], removeOldest)

  useEffect(() => {
    if (toasts.length && !isExiting) {
      timer.current = setTimeout(removeOldest, duration)
    }
    return () => {
      clearTimeout(timer.current)
    }
  }, [toasts.length, duration, removeOldest, isExiting])

  const addToast: ContextProps["addToast"] = useCallback(
    (toast) => {
      const newToast: Toast = { ...toast, id: v4() }
      if (behavior === "stack") {
        if (position.vertical === "center" || position.vertical === "top") {
          setToasts((toasts) => [newToast, ...toasts])
        } else {
          setToasts((toasts) => [...toasts, newToast])
        }
      } else {
        setToasts([newToast])
      }
    },
    [behavior, position.vertical],
  )

  const removeAll = () => {
    setToasts([])
  }

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeAll }}>
      {children}
      {createPortal(
        <div>
          <div style={getToastPositionStyles({ position })}>
            <TransitionGroup
              style={{ display: "flex", gap: "8px 0", flexDirection: "column" }}
            >
              {toasts.map((toast) => (
                <Transition
                  onExited={() => {
                    setIsExiting(false)
                  }}
                  onExiting={() => setIsExiting(true)}
                  unmountOnExit
                  key={toast.id}
                  timeout={animationDuration}
                >
                  {(state) => (
                    <div
                      id={toast.id}
                      style={getToastTransitionStyles({
                        animationDuration,
                        transitionStatus: state,
                      })}
                    >
                      <ToastCard
                        message={toast.message}
                        action={toast.action?.(() => removeToast(toast.id))}
                        status={toast.status}
                      />
                    </div>
                  )}
                </Transition>
              ))}
            </TransitionGroup>
          </div>
        </div>,
        document.body,
      )}
    </ToasterContext.Provider>
  )
}
