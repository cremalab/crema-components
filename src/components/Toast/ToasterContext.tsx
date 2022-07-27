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
import { Transition, TransitionGroup } from "react-transition-group"
import { useKeyPress } from "../../hooks/useKeyPress"
import { getToastPositionStyles, getToastTransitionStyles } from "./utils"
import { Toast, ToastAction, ToastProps } from "./Toast"

export interface Config {
  duration: number
  animationDuration: number
  position: Position
  behavior: "stack" | "replace"
}

export interface Position {
  vertical: "top" | "center" | "bottom"
  horizontal: "left" | "center" | "right"
}
interface ToasterProviderProps {
  children: ReactNode
  config?: Partial<Config>
}

interface ContextProps {
  addToast: (toast: Omit<ToastProps, "id" | "onDismiss">) => void
  removeAll: () => void
}

export const ToasterContext = createContext<ContextProps | undefined>(undefined)

const getDefaultConfig = (config: ToasterProviderProps["config"]) => {
  return {
    animationDuration: config?.animationDuration || 300,
    duration: config?.duration || 5000,
    behavior: config?.behavior || "stack",
    position: config?.position || {
      vertical: "bottom",
      horizontal: "center",
    },
  }
}

export function ToasterProvider({ children, config }: ToasterProviderProps) {
  const { animationDuration, position, behavior, duration } =
    getDefaultConfig(config)

  const [toasts, setToasts] = useState<ToastProps[]>([])
  const timer = useRef<NodeJS.Timeout>()
  const isTopOrCenter =
    position.vertical === "top" || position.vertical === "center"

  const removeToast = useCallback((id: number) => {
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
  }, [duration, removeOldest])

  const addToast: ContextProps["addToast"] = useCallback(
    (toast) => {
      const prevToast = toasts[toasts.length - 1]
      const id = prevToast ? prevToast.id + 1 : 1
      const newToast: ToastProps = { ...toast, id }
      if (behavior === "stack") {
        setToasts([...toasts, newToast])
      } else {
        setToasts([newToast])
      }
    },
    [behavior, toasts],
  )

  const removeAll = useCallback(() => {
    setToasts([])
  }, [])

  const value = useMemo(() => ({ addToast, removeAll }), [addToast, removeAll])

  const onDismiss = (action: ToastAction["type"], id: number) => {
    if (action === "dismiss") {
      removeToast(id)
    } else {
      removeAll()
    }
  }

  return (
    <ToasterContext.Provider value={value}>
      {children}
      {createPortal(
        <div style={getToastPositionStyles({ position })}>
          <TransitionGroup
            style={{
              display: "flex",
              gap: "8px 0",
              flexDirection: isTopOrCenter ? "column-reverse" : "column",
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
                      id={toast.id}
                      message={toast.message}
                      action={toast.action}
                      onDismiss={onDismiss}
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
