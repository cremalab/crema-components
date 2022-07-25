/**
 * getToastTransitionStyles
 * ------------------------------------------------
 * DESCRIPTION_HERE
 */

import { CSSProperties } from "react"
import { TransitionStatus } from "react-transition-group"

interface Args {
  animationDuration: number
  transitionStatus: TransitionStatus
}

export const getToastTransitionStyles = ({
  animationDuration,
  transitionStatus,
}: Args) => {
  const defaultStyle: CSSProperties = {
    transition: `all ${animationDuration}ms ease-in-out`,
    width: 300,
  }

  const transitionStyles: { [key in TransitionStatus]: CSSProperties } = {
    entering: { transform: "scale(0)" },
    entered: { transform: "scale(1)" },
    exiting: { transform: "scale(0)" },
    exited: { transform: "scale(0)" },
    unmounted: {},
  }

  const styles = {
    ...defaultStyle,
    ...transitionStyles[transitionStatus],
  }

  return styles
}
