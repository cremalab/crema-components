import classNames from "classnames"
import { HTMLProps, ReactNode, useRef } from "react"
import { createPortal } from "react-dom"
import FocusLock from "react-focus-lock"
import { useKeyPress } from "../../hooks/useKeyPress"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import styles from "./Sidebar.module.css"
import { SidebarTitle } from "./SidebarTitle"

export interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  hideOverlay?: boolean
  onClose?: () => void
  position?: "left" | "right"
}

export const Sidebar = ({
  children,
  hideOverlay,
  open,
  onClose,
  position = "left",
  title,
  ...props
}: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null)

  useOutsideClick(sidebarRef, () => {
    onClose?.()
  })

  useKeyPress(["Escape"], () => {
    if (open) onClose?.()
  })

  if (!open) return null

  return createPortal(
    <div>
      {!hideOverlay && (
        <div
          aria-hidden={true}
          className={styles.sidebarOverlay}
          onClick={onClose}
          data-testid="sidebar-backdrop"
        />
      )}
      <div
        aria-label={title ?? "Sidebar"}
        aria-orientation="vertical"
        className={classNames(styles.sidebar, {
          [styles.sidebarRight]: position === "right",
          [styles.sidebarLeft]: position === "left",
        })}
        ref={sidebarRef}
        {...props}
      >
        <FocusLock disabled={!open}>
          {title && <SidebarTitle onClose={onClose}>{title}</SidebarTitle>}
          {children}
        </FocusLock>
      </div>
    </div>,
    document.body,
  )
}
