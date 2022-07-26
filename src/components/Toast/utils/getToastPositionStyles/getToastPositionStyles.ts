/**
 * getToastPositionStyles
 * ------------------------------------------------
 * This util is used to generate a styles object that
 * dictates the toast position based on the Position
 * arguments.
 */

import { CSSProperties } from "react"
import { Position } from "../../types"

interface Args {
  position: Position
}

export const getToastPositionStyles = ({ position }: Args) => {
  const defaultStyle: CSSProperties = {
    position: "absolute",
  }

  const verticalStyles: { [key in Position["vertical"]]: CSSProperties } = {
    bottom: { marginBottom: 24, bottom: 0 },
    center: { top: "50%", transform: "translate(0, -50%)" },
    top: { marginTop: 24, top: 0 },
  }

  const horizontalStyles: { [key in Position["horizontal"]]: CSSProperties } = {
    center: { left: "50%", transform: "translate(-50%)" },
    left: { left: 0, marginLeft: 24 },
    right: { right: 0, marginRight: 24 },
  }

  const styles = {
    ...defaultStyle,
    ...verticalStyles[position.vertical],
    ...horizontalStyles[position.horizontal],
  }

  return styles
}
