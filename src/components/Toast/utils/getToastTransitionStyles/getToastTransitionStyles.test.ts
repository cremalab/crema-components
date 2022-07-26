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
      transform: "scale(1)",
      transition,
    }

    const expectedOthers = {
      ...defaultStyle,
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
})
