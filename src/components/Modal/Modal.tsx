import { HTMLProps, ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import FocusLock from "react-focus-lock"
import { useKeyPress } from "../../hooks/useKeyPress"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import styles from "./Modal.module.css"
import { ModalTitle } from "./ModalTitle"

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  onClose?: () => void
}

export function Modal({ children, open, onClose, title, ...props }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOutsideClick(modalRef, () => {
    onClose?.()
  })

  useKeyPress(["Escape"], () => {
    onClose?.()
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className={styles.modalOverlay} data-testid="modal-overlay">
      <div
        className={styles.modalWindow}
        ref={modalRef}
        aria-modal
        aria-labelledby={title}
        role="dialog"
        {...props}
      >
        <FocusLock disabled={!open}>
          {title ? <ModalTitle onClose={onClose}>{title}</ModalTitle> : null}
          <div>{children}</div>
        </FocusLock>
      </div>
    </div>,
    document.body,
  )
}
