import classNames from "classnames"
import { HTMLProps, ReactNode } from "react"
import { createPortal } from "react-dom"
import styles from "./Sidebar.module.css"
import { SidebarTitle } from "./SidebarTitle"

export interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  hideOverlay?: boolean
  isOpen: boolean
  onClose?: () => void
  position?: "left" | "right"
}

export const Sidebar = ({
  children,
  hideOverlay,
  isOpen,
  onClose,
  position,
  title,
  ...props
}: Props) => {
  if (!isOpen) return null

  return createPortal(
    <>
      {!hideOverlay && (
        <div
          className={styles.sidebarOverlay}
          onClick={onClose}
          data-testid="sidebar-backdrop"
        ></div>
      )}
      <div
        className={classNames(styles.sidebar, {
          [styles.sidebarRight]: position === "right",
        })}
        {...props}
      >
        {title && <SidebarTitle onClose={onClose}>{title}</SidebarTitle>}
        {children}
      </div>
    </>,
    document.body,
  )
}
