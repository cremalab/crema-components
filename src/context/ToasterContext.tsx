import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { v4 } from "uuid"
import { Transition, TransitionGroup } from "react-transition-group"
import { Toast } from "../components/Toast"
import { Position, Toast as ToastType } from "../types/Toast"
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
  addToast: (toast: Omit<ToastType, "id">) => void
  removeAll: () => void
}

export const ToasterContext = createContext<ContextProps>({
  addToast: () => null,
  removeAll: () => null,
})

export function ToasterProvider({ children, config }: ToasterProviderProps) {
  const { animationDuration, duration, behavior, position } = config.getConfig()
  const [toasts, setToasts] = useState<ToastType[]>([])
  const timer = useRef<NodeJS.Timeout>()

  const removeToast = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }, [])

  const removeOldest = useCallback(() => {
    if (toasts.length === 0) {
      return
    }
    setToasts((toasts) => toasts.slice(1))
  }, [toasts])

  useKeyPress(["Escape"], removeOldest)

  useEffect(() => {
    timer.current = setTimeout(removeOldest, duration)
    return () => {
      clearTimeout(timer.current)
    }
  }, [toasts, duration, removeOldest])

  const addToast: ContextProps["addToast"] = useCallback(
    (toast) => {
      const newToast: ToastType = { ...toast, id: v4() }
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

  const removeAll = useCallback(() => {
    setToasts([])
  }, [])

  const value = useMemo(() => ({ addToast, removeAll }), [addToast, removeAll])

  return (
    <ToasterContext.Provider value={value}>
      {children}
      {createPortal(
        <div style={getToastPositionStyles({ position })}>
          <TransitionGroup
            style={{
              display: "flex",
              gap: "8px 0",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {toasts.map((toast) => (
              <Transition
                unmountOnExit
                key={toast.id}
                timeout={animationDuration}
              >
                {(state) => (
                  <div
                    style={getToastTransitionStyles({
                      animationDuration,
                      transitionStatus: state,
                      position,
                      behavior,
                    })}
                  >
                    <Toast
                      message={toast.message}
                      action={toast.action?.(() => removeToast(toast.id))}
                      status={toast.status}
                    />
                  </div>
                )}
              </Transition>
            ))}
          </TransitionGroup>
        </div>,
        document.body,
      )}
    </ToasterContext.Provider>
  )
}
