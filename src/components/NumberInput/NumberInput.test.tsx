import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NumberInput } from "./NumberInput"

describe("NumberInput", () => {
  it("increases the value when increment action is invoked", async () => {
    // Arrange
    const increaseLabel = "click to increase value"
    const testID = "numberInput"
    // Act
    render(<NumberInput testID={testID} defaultValue={0} />)

    const increaseButton = screen.getByLabelText(increaseLabel)
    await userEvent.click(increaseButton)
    const input = screen.getByTestId(testID) as HTMLInputElement

    // Assert
    expect(input.value).toBe("1")
  })
  it("decreases the value when decrement action is invoked", async () => {
    // Arrange
    const decreaseLabel = "click to decrease value"
    const testID = "numberInput"
    // Act
    render(<NumberInput testID={testID} defaultValue={0} />)

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
        customButton={(props, buttonType) => (
          <button data-testid={`${testID}_${buttonType}`} {...props} />
        )}
      />,
    )
    const customButtons = screen.getAllByTestId(testID)

    // Assert
    expect(customButtons).toHaveLength(2)
  })
  it("renders a custom input", () => {
    // Arrange
    const testID = "customInput"
    // Act
    render(
      <NumberInput testID={testID} control={(props) => <input {...props} />} />,
    )
    const customInput = screen.getByTestId(testID)

    // Assert
    expect(customInput).toBeInTheDocument()
  })
  it("supports step", async () => {
    // Arrange
    const step = 0.1
    const increaseLabel = "click to increase value"
    const testID = "numberInput"
    // Act
    render(<NumberInput testID={testID} defaultValue={0} step={step} />)
    const increaseButton = screen.getByLabelText(increaseLabel)
    await userEvent.click(increaseButton)
    const input = screen.getByTestId(testID) as HTMLInputElement

    // Assert
    expect(input.value).toBe("0.1")
  })
  // this is the default behavior for the native control as well
  it("only allows a range defined by min/max (when pressing arrows)", async () => {
    // Arrange
    const min = 0
    const max = 3
    const increaseLabel = "click to increase value"
    const decreaseLabel = "click to decrease value"
    const testID = "numberInput"

    // Act
    render(<NumberInput testID={testID} defaultValue={0} min={min} max={max} />)

    const increaseButton = screen.getByLabelText(increaseLabel)
    const decreaseButton = screen.getByLabelText(decreaseLabel)

    // Assert
    await userEvent.click(increaseButton)
    await userEvent.click(increaseButton)
    await userEvent.click(increaseButton)
    await userEvent.click(increaseButton)
    const input = screen.getByTestId(testID) as HTMLInputElement
    expect(input.value).toBe("3")
    await userEvent.click(decreaseButton)
    await userEvent.click(decreaseButton)
    await userEvent.click(decreaseButton)
    await userEvent.click(decreaseButton)
    expect(input.value).toBe("0")
  })
  it("invokes onChange anytime the value is changed", async () => {
    // Arrange
    const onChange = jest.fn()
    const decreaseLabel = "click to decrease value"

    // Act
    render(<NumberInput onChange={onChange} />)

    const decreaseButton = screen.getByLabelText(decreaseLabel)
    await userEvent.click(decreaseButton)
    await userEvent.click(decreaseButton)

    // Assert
    expect(onChange).toBeCalledTimes(2)
  })
  it("throws an error if control is passed an element that is not of type 'input'", () => {
    jest.spyOn(global.console, "error").mockImplementation(jest.fn())
    // Assert
    expect(() =>
      render(<NumberInput control={(props) => <p {...props} />} />),
    ).toThrowError(
      "'control' only accepts functions that return elements of type 'input'",
    )
  })
})
