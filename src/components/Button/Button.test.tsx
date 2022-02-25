import { fireEvent, render, waitFor } from "@testing-library/react"
import { Button } from "./Button"

describe("Button", () => {
  it("creates the appropriate aria-label", async () => {
    const label = "button label"

    const { getByLabelText } = render(<Button ariaLabel={label}>Button</Button>)

    const button = getByLabelText(label)

    expect(button).toBeInTheDocument()
  })

  it("fires the passed function when clicked", async () => {
    const mockFn = jest.fn()

    const { getByText } = render(
      <Button name="Button" ariaLabel="example button" onClick={mockFn}>
        Button
      </Button>,
    )
    const button = getByText("Button")
    await waitFor(() => fireEvent.click(button))

    expect(mockFn).toHaveBeenCalled()
  })

  it("can be disabled", async () => {
    const text = "Button Text"

    const { findByText } = render(
      <Button ariaLabel="button label" disabled={true}>
        {text}
      </Button>,
    )
    const buttonText = await findByText(text)

    expect(buttonText).toBeDisabled()
  })
})
