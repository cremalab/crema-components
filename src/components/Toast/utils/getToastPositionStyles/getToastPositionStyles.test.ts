import { Position } from "../../../../types/Toast"
import { getToastPositionStyles } from "./getToastPositionStyles"

const defaultStyle = {
  position: "absolute",
}

describe("getToastPositionStyles", () => {
  it("returns styles for vertical positions", () => {
    // Arrange
    const verticalCenter: Position = {
      horizontal: "center",
      vertical: "center",
    }

    const verticalTop: Position = {
      horizontal: "center",
      vertical: "top",
    }

    const verticalBottom: Position = {
      horizontal: "center",
      vertical: "bottom",
    }

    const horizontalCenter = {
      left: "50%",
      transform: "translate(-50%)",
    }

    // Act
    const receivedVerticalCenter = getToastPositionStyles({
      position: verticalCenter,
    })

    const receivedVerticalTop = getToastPositionStyles({
      position: verticalTop,
    })

    const receivedVerticalBottom = getToastPositionStyles({
      position: verticalBottom,
    })

    const expectedVerticalCenter = {
      ...defaultStyle,
      ...horizontalCenter,
      top: "50%",
    }

    const expectedVerticalTop = {
      ...defaultStyle,
      ...horizontalCenter,
      marginTop: 24,
      top: 0,
    }

    const expectedVerticalBottom = {
      ...defaultStyle,
      ...horizontalCenter,
      marginBottom: 24,
      bottom: 0,
    }

    // Assert
    expect(receivedVerticalCenter).toEqual(expectedVerticalCenter)
    expect(receivedVerticalTop).toEqual(expectedVerticalTop)
    expect(receivedVerticalBottom).toEqual(expectedVerticalBottom)
  })
  it("returns styles for horizontal positions", () => {
    // Arrange
    const horizontalCenter: Position = {
      horizontal: "center",
      vertical: "center",
    }

    const horizontalLeft: Position = {
      horizontal: "left",
      vertical: "center",
    }

    const horizontalRight: Position = {
      horizontal: "right",
      vertical: "center",
    }

    const verticalCenter = {
      top: "50%",
      transform: "translate(0, -50%)",
    }

    // Act
    const receivedHorizontalCenter = getToastPositionStyles({
      position: horizontalCenter,
    })

    const receivedHorizontalLeft = getToastPositionStyles({
      position: horizontalLeft,
    })

    const receivedHorizontalRight = getToastPositionStyles({
      position: horizontalRight,
    })

    const expectedHorizontalCenter = {
      ...defaultStyle,
      ...verticalCenter,
      left: "50%",
      transform: "translate(-50%)",
    }

    const expectedHorizontalLeft = {
      ...defaultStyle,
      ...verticalCenter,
      left: 0,
      marginLeft: 24,
    }

    const expectedHorizontalRight = {
      ...defaultStyle,
      ...verticalCenter,
      marginRight: 24,
      right: 0,
    }

    // Assert
    expect(receivedHorizontalCenter).toEqual(expectedHorizontalCenter)
    expect(receivedHorizontalLeft).toEqual(expectedHorizontalLeft)
    expect(receivedHorizontalRight).toEqual(expectedHorizontalRight)
  })
})
