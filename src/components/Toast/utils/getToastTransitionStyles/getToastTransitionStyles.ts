import { CSSProperties } from "react"
import { TransitionStatus } from "react-transition-group"
import { Position } from "../../ToasterContext"

interface Args {
  animationDuration: number
  transitionStatus: TransitionStatus
  position: Position
  behavior: "replace" | "stack"
}

/**
 * getToastTransitionStyles
 * ------------------------------------------------
 * This util is used to generate a transition styles object
 * based on animation duration, transition state, position,
 * and behavior.
 */
export const getToastTransitionStyles = ({
  animationDuration,
  transitionStatus,
}: Args) => {
  const defaultStyle: CSSProperties = {
    transition: `transform ${animationDuration}ms ease-in-out`,
  }

  const transitionStyles: { [key in TransitionStatus]: CSSProperties } = {
    entering: { transform: "scale(0)" },
    entered: { transform: "scale(1)" },
    exiting: { transform: "scale(0)" },
    exited: { transform: "scale(0)" },
    unmounted: { transform: "scale(0)" },
  }

  const styles = {
    ...defaultStyle,
    ...transitionStyles[transitionStatus],
  }

  return styles
}
