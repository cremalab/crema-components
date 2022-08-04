import { Placement } from "@popperjs/core"
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react"
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
  hideOnClick?: boolean
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
  hideOnClick,
}: TooltipProps) {
  const enterTimeout = useRef<NodeJS.Timeout>()
  const exitTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      clearTimeout(enterTimeout.current)
      clearTimeout(exitTimeout.current)
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

  const handleShow = () => setIsOpen(true)

  const handleHide = () => setIsOpen(false)

  const handleClick = () => hideOnClick && handleHide()

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Escape" && hideOnClick) {
      handleHide()
    }
    if (e.key === "Enter") {
      handleShow()
    }
  }

  const handleMouseEnter = () => {
    clearTimeout(enterTimeout.current)
    if (enterDelay) {
      enterTimeout.current = setTimeout(handleShow, enterDelay)
    } else {
      handleShow()
    }
  }

  const handleMouseLeave = () => {
    clearTimeout(exitTimeout.current)
    if (exitDelay) {
      exitTimeout.current = setTimeout(handleHide, exitDelay)
    } else {
      handleHide()
    }
  }

  return (
    <div>
      <span
        role={hideOnClick ? "button" : "none"}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={setAnchorElement}
      >
        {children}
      </span>
      <div
        role="tooltip"
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
