import { ReactNode } from "react"
import styles from "./Modal.module.css"

interface Props {
  children: ReactNode
  onClose?: () => unknown
}

export function ModalTitle({ children, onClose }: Props) {
  return (
    <div className={styles.modalTitle}>
      <div>{typeof children === "string" ? <p>{children}</p> : children}</div>
      {onClose ? (
        <div>
          {
            <div
              className={styles.modalTitleClose}
              aria-label="close the modal"
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
