import { ReactNode } from "react"
import styles from "./Chip.module.css"

export interface ChipProps {
  children: ReactNode
  onSelect?: () => unknown
  onClose?: () => unknown
  closeElement?: ReactNode
}

export function Chip({
  children,
  closeElement = <span>&times;</span>,
  onSelect,
  onClose,
}: ChipProps) {
  return (
    <div className={styles.container}>
      <div
        onClick={onSelect}
        // these next 3 props are important for a11y
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onSelect?.()
          }
        }}
      >
        {children}
      </div>
      {onClose ? (
        <div
          onClick={onClose}
          // these next 4 props are important for a11y
          role="button"
          aria-label="close"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              onClose?.()
            }
          }}
        >
          {closeElement}
        </div>
      ) : null}
    </div>
  )
}
