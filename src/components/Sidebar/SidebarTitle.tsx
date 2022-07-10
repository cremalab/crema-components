import { ReactNode } from "react"
import styles from "./Sidebar.module.css"

interface Props {
  children: ReactNode
  onClose?: () => unknown
}

export function SidebarTitle({ children, onClose }: Props) {
  return (
    <div className={styles.sidebarTitle}>
      <div>{typeof children === "string" ? <p>{children}</p> : children}</div>
      {onClose ? (
        <div>
          {
            <div
              className={styles.sidebarTitleClose}
              aria-label="close the sidebar"
              onClick={onClose}
            >
              x
            </div>
          }
        </div>
      ) : null}
    </div>
  )
}
