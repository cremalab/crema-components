import { Placement } from "@popperjs/core"
import { ReactNode, useEffect, useRef, useState } from "react"
import { usePopper } from "react-popper"
import classes from "./Tooltip.module.css"

interface TooltipProps {
  children: ReactNode
  label: string
  alwaysShow?: boolean
  showArrow?: boolean
  horizontalOffset?: number
  verticalOffset?: number
  placement?: Placement
  enterDelay?: number
  exitDelay?: number
}

export function Tooltip({
  children,
  label,
  showArrow,
  alwaysShow,
  placement = "auto",
  horizontalOffset = 10,
  verticalOffset = 0,
  enterDelay,
  exitDelay,
}: TooltipProps) {
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [anchorElement, setAnchorElement] = useState<HTMLSpanElement | null>(
    null,
  )
  const boxRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const { styles, attributes } = usePopper(anchorElement, boxRef.current, {
    modifiers: [
      { name: "arrow", options: { element: arrowRef.current } },
      {
        name: "offset",
        options: { offset: [verticalOffset, horizontalOffset] },
      },
    ],
    placement,
    strategy: "fixed",
  })

  const handleOpen = () => {
    timer.current = setTimeout(() => setIsOpen(true), enterDelay ?? 0)
  }

  const handleClose = () => {
    timer.current = setTimeout(() => setIsOpen(false), exitDelay ?? 0)
  }

  return (
    <div>
      <span
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        ref={setAnchorElement}
      >
        {children}
      </span>
      <div
        ref={boxRef}
        style={styles.popper}
        data-is-open={isOpen || alwaysShow ? "true" : "false"}
        className={classes.box}
        {...attributes.popper}
      >
        {label}
        {showArrow && (
          <div ref={arrowRef} className={classes.arrow} style={styles.arrow} />
        )}
      </div>
    </div>
  )
}
