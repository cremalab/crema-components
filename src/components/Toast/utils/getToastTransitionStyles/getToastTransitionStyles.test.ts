import { TransitionStatus } from "react-transition-group"
import { getToastTransitionStyles } from "./getToastTransitionStyles"

const defaultStyle = {
  width: 300,
}

describe("getToastTransitionStyles", () => {
  it("returns different transition style based on animation duration", () => {
    // Arrange
    const animationDuration = 300

    // Act
    const received = getToastTransitionStyles({
      animationDuration,
      transitionStatus: "entered",
      position: { vertical: "bottom", horizontal: "center" },
      behavior: "stack",
    })

    const expected = {
      ...defaultStyle,
      position: "relative",
      transform: "scale(1)",
      transition: `transform ${animationDuration}ms ease-in-out`,
    }

    // Assert
    expect(received).toEqual(expected)
  })
  it("returns different transition style for each transition status", () => {
    // Arrange
    const transitionStatuses = [
      "entered",
      "entering",
      "exited",
      "exiting",
      "unmounted",
    ] as TransitionStatus[]

    // Act
    const [
      receivedEntered,
      receivedEntering,
      receivedExit,
      receivedExiting,
      receivedUnmounted,
    ] = transitionStatuses.map((transitionStatus) =>
      getToastTransitionStyles({
        animationDuration: 300,
        transitionStatus,
        position: { vertical: "bottom", horizontal: "center" },
        behavior: "stack",
      }),
    )

    const transition = "transform 300ms ease-in-out"

    const expectedEntered = {
      ...defaultStyle,
      position: "relative",
      transform: "scale(1)",
      transition,
    }

    const expectedOthers = {
      ...defaultStyle,
      position: "relative",
      transform: "scale(0)",
      transition,
    }

    // Assert
    expect(receivedEntered).toEqual(expectedEntered)
    expect(receivedEntering).toEqual(expectedOthers)
    expect(receivedExit).toEqual(expectedOthers)
    expect(receivedExiting).toEqual(expectedOthers)
    expect(receivedUnmounted).toEqual(expectedOthers)
  })
  it("sets position absolute if vertical position is top or center and behavior is replace", () => {
    // Arrange
    const animationDuration = 300

    // Act
    const receivedCenter = getToastTransitionStyles({
      animationDuration,
      transitionStatus: "entered",
      position: { vertical: "center", horizontal: "center" },
      behavior: "replace",
    })

    const receivedTop = getToastTransitionStyles({
      animationDuration,
      transitionStatus: "entered",
      position: { vertical: "center", horizontal: "center" },
      behavior: "replace",
    })

    // Assert
    expect(receivedCenter.position).toEqual("absolute")
    expect(receivedTop.position).toEqual("absolute")
  })
})
