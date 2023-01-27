import { fireEvent, render, screen } from "@testing-library/react"
import { Checkbox } from "."

describe("Checkbox", () => {
  it("should trigger a change when clicked", async () => {
    const onChange = jest.fn()

    render(<Checkbox handleChange={onChange} label="Test Label" />)
    const received = await screen.findByLabelText("Test Label")
    fireEvent.click(received)

    expect(received).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it("can not be clicked when disabled", async () => {
    const onClick = jest.fn()

    render(
      <Checkbox
        aria-label="Test Label"
        label="Test Label"
        disabled
        onClick={onClick}
      />,
    )

    const received = await screen.findByLabelText("Test Label")

    fireEvent.click(received)

    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it("should have an aria label", async () => {
    const onChange = jest.fn()

    render(
      <Checkbox
        handleChange={onChange}
        label="Test Label"
        aria-label="Test Label"
      />,
    )

    const received = await screen.findByLabelText("Test Label")

    expect(received).toBeInTheDocument()
    expect(received).toHaveAttribute("aria-label", "Test Label")
  })

  it("should be checked when checked is true", async () => {
    const onChange = jest.fn()

    render(<Checkbox handleChange={onChange} label="Test Label" checked />)
    const received = await screen.findByLabelText("Test Label")

    expect(received).toBeInTheDocument()
    expect(received).toBeChecked()
  })

  it("should be unchecked when checked is false", async () => {
    const onChange = jest.fn()

    await render(
      <Checkbox handleChange={onChange} label="Test Label" checked={false} />,
    )

    const received = await screen.findByLabelText("Test Label")

    expect(received).toBeInTheDocument()
    expect(received).not.toBeChecked()
  })
})
