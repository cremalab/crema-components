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
import { useKeyPress } from "../../hooks/useKeyPress"
import { Toast as ToastType } from "./types"
import {
  ToasterConfig,
  getToastPositionStyles,
  getToastTransitionStyles,
} from "./utils"
import { Toast } from "./Toast"

interface ToasterProviderProps {
  children: ReactNode
  config: ToasterConfig
}

interface ContextProps {
  addToast: (toast: Omit<ToastType, "id">) => void
  removeAll: () => void
}

export const ToasterContext = createContext<ContextProps | undefined>(undefined)

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
