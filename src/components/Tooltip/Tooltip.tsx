import { Placement } from "@popperjs/core"
import {
  CSSProperties,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { usePopper } from "react-popper"
import { Transition, TransitionStatus } from "react-transition-group"
import classes from "./Tooltip.module.css"

interface TooltipProps {
  children: ReactNode
  label: string
  ariaDescribedBy?: string
  animationDuration?: number
  alwaysShow?: boolean
  showArrow?: boolean
  distance?: number
  skidding?: number
  placement?: Placement
  enterDelay?: number
  exitDelay?: number
  hideOnClick?: boolean
}

export function Tooltip({
  children,
  label,
  ariaDescribedBy,
  animationDuration = 300,
  showArrow,
  alwaysShow,
  placement = "auto",
  distance = 10,
  skidding = 0,
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
  /* 
  in order to ensure all elements are properly anchored, 
  we need these states updated via their ref callbacks
  See docs: https://popper.js.org/react-popper/v2/#example
  */
  const [anchorElement, setAnchorElement] = useState<HTMLSpanElement | null>(
    null,
  )
  const [boxElement, setBoxElement] = useState<HTMLDivElement | null>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const { styles, attributes } = usePopper(anchorElement, boxElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowRef.current } },
      {
        name: "offset",
        options: { offset: [skidding, distance] },
      },
    ],
    placement,
    strategy: "fixed",
  })

  const handleShow = () => setIsOpen(true)

  const handleHide = () => setIsOpen(false)

  const handleClick = () => hideOnClick && handleHide()

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Escape") {
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

  const defaultStyle = {
    transition: `opacity ${animationDuration}ms ease-in-out`,
    opacity: 0,
  }

  const transitionStyles: { [key in TransitionStatus]: CSSProperties } = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exited: {},
    exiting: {},
    unmounted: {},
  }

  return (
    <>
      <span
        data-testid="tooltip_span"
        role={hideOnClick ? "button" : "none"}
        aria-describedby={ariaDescribedBy}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={setAnchorElement}
      >
        {children}
      </span>
      <Transition
        mountOnEnter
        in={isOpen || alwaysShow}
        timeout={animationDuration}
      >
        {(status) => (
          <div
            id={ariaDescribedBy}
            role="tooltip"
            ref={setBoxElement}
            style={{
              ...styles.popper,
              ...defaultStyle,
              ...transitionStyles[status],
            }}
            className={classes.box}
            {...attributes.popper}
          >
            {label}
            {showArrow && (
              <div
                data-testid="tooltip_arrow"
                ref={arrowRef}
                className={classes.arrow}
                style={styles.arrow}
              />
            )}
          </div>
        )}
      </Transition>
    </>
  )
}
