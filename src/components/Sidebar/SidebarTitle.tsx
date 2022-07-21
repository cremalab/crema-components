import { ReactNode } from "react"
import { Button } from "../Button"
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
            <Button
              className={styles.sidebarTitleClose}
              ariaLabel="close the sidebar"
              onClick={onClose}
            >
              x
            </Button>
          }
        </div>
      ) : null}
    </div>
  )
}
