import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NumberInput } from "./NumberInput"

describe("NumberInput", () => {
  it("increases the value when increment action is invoked", async () => {
    // Arrange
    const increaseLabel = "click to increase value"
    const testID = "numberInput"
    // Act
    render(
      <NumberInput
        defaultValue={0}
        control={(props) => <input data-testid={testID} {...props} />}
      />,
    )

    const increaseButton = screen.getByLabelText(increaseLabel)
    await userEvent.click(increaseButton)
    const input = screen.getByTestId(testID) as HTMLInputElement

    // Assert
    expect(input.value).toBe("1")
  })
  it("decreases the value when increment action is invoked", async () => {
    // Arrange
    const decreaseLabel = "click to decrease value"
    const testID = "numberInput"
    // Act
    render(
      <NumberInput
        defaultValue={0}
        control={(props) => <input data-testid={testID} {...props} />}
      />,
    )

    const decreaseButton = screen.getByLabelText(decreaseLabel)
    await userEvent.click(decreaseButton)
    const input = screen.getByTestId(testID) as HTMLInputElement

    // Assert
    expect(input.value).toBe("-1")
  })
  it("renders a custom button", () => {
    // Arrange
    const testID = /customButton/
    // Act
    render(
      <NumberInput
        control={(props) => <input {...props} />}
        customButton={(props, buttonType) => (
          <button data-testid={`${testID}_${buttonType}`} {...props} />
        )}
      />,
    )
    const customButtons = screen.getAllByTestId(testID)

    // Assert
    expect(customButtons).toHaveLength(2)
  })
  it("supports step", async () => {
    // Arrange
    const step = 0.1
    const increaseLabel = "click to increase value"
    const testID = "numberInput"
    // Act
    render(
      <NumberInput
        defaultValue={0}
        step={step}
        control={(props) => <input data-testid={testID} {...props} />}
      />,
    )
    const increaseButton = screen.getByLabelText(increaseLabel)
    await userEvent.click(increaseButton)
    const input = screen.getByTestId(testID) as HTMLInputElement

    // Assert

    // Assert
    expect(input.value).toBe("0.1")
  })
})
