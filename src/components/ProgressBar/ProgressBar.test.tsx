import { render, screen } from "@testing-library/react"
import { ProgressBar } from "./ProgressBar"

const ariaValueNow = "aria-valuenow"
const ariaValueMin = "aria-valuemin"
const ariaValueMax = "aria-valuemax"

const min = "0"
const max = "100"

describe("ProgressBar", () => {
  it("defaults to indeterminate", () => {
    // Arrange
    const ariaLabel = "indeterminate progress"
    const indicatorTestID = "progressbar_indicator"

    // Act
    render(<ProgressBar ariaLabel={ariaLabel} />)

    const receivedContainer = screen.getByLabelText(ariaLabel)
    const receivedIndicator = screen.getByTestId(indicatorTestID)

    // Assert
    expect(receivedIndicator).toHaveClass("indeterminate")
    expect(receivedContainer).not.toHaveAttribute(ariaValueNow)
    expect(receivedContainer).not.toHaveAttribute(ariaValueMin)
    expect(receivedContainer).not.toHaveAttribute(ariaValueMax)
  })

  it("acts as determinate progress when value passed", () => {
    // Arrange
    const value = 25
    const ariaLabel = "determinate progress"
    const indicatorTestID = "progressbar_indicator"

    // Act
    render(<ProgressBar value={value} ariaLabel={ariaLabel} />)

    const receivedContainer = screen.getByLabelText(ariaLabel)
    const receivedIndicator = screen.getByTestId(indicatorTestID)

    // Assert
    expect(receivedIndicator).not.toHaveClass("indeterminate")
    expect(receivedContainer).toHaveAttribute(ariaValueNow, String(value))
    expect(receivedContainer).toHaveAttribute(ariaValueMin, min)
    expect(receivedContainer).toHaveAttribute(ariaValueMax, max)
  })

  it("has dynamic transform based on determinate value", () => {
    // Arrange
    const initialValue = 0
    const indicatorTestID = "progressbar_indicator"

    // Act
    render(<ProgressBar value={initialValue} />)

    const receivedIndicator = screen.getByTestId(indicatorTestID)

    // Assert
    expect(receivedIndicator).toHaveStyle(
      `transform: translateX(${initialValue - 100}%)`,
    )
  })

  it("does not default to indeterminate when value is 0", () => {
    // Arrange
    const value = 0
    const ariaLabel = "determinate progress"
    const indicatorTestID = "progressbar_indicator"

    // Act
    render(<ProgressBar value={value} ariaLabel={ariaLabel} />)

    const receivedContainer = screen.getByLabelText(ariaLabel)
    const receivedIndicator = screen.getByTestId(indicatorTestID)

    // Assert
    expect(receivedIndicator).not.toHaveClass("indeterminate")
    expect(receivedContainer).toHaveAttribute(ariaValueNow, String(value))
    expect(receivedContainer).toHaveAttribute(ariaValueMin, min)
    expect(receivedContainer).toHaveAttribute(ariaValueMax, max)
  })
})
