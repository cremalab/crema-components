import { fireEvent, render, screen } from "@testing-library/react"
import { Button } from "./Button"

describe("Button", () => {
  it("creates the appropriate aria-label", async () => {
    const label = "button label"

    render(<Button ariaLabel={label}>Button</Button>)

    const button = screen.getByLabelText(label)

    expect(button).toBeInTheDocument()
  })

  it("fires the passed function when clicked", async () => {
    const mockFn = jest.fn()

    render(
      <Button name="Button" ariaLabel="example button" onClick={mockFn}>
        Button
      </Button>,
    )

    const button = screen.getByText("Button")
    fireEvent.click(button)

    expect(mockFn).toHaveBeenCalled()
  })

  it("can be disabled", async () => {
    const text = "Button Text"

    render(
      <Button ariaLabel="button label" disabled={true}>
        {text}
      </Button>,
    )

    const buttonText = await screen.findByText(text)

    expect(buttonText).toBeDisabled()
  })
})
