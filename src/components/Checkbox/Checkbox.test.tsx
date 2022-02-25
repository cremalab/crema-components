import { fireEvent, render } from "@testing-library/react"
import { Checkbox } from "."

describe("Checkbox", () => {
  it("it should trigger a change when clicked", async () => {
    const onChange = jest.fn()

    const { findByLabelText } = await render(
      <Checkbox handleChange={onChange} label="Test Label" />,
    )
    const received = await findByLabelText("Test Label")
    fireEvent.click(received)

    expect(received).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it("can not be clicked when disabled", async () => {
    const onClick = jest.fn()

    const { findByLabelText } = render(
      <Checkbox
        aria-label="Test Label"
        label="Test Label"
        disabled
        onClick={onClick}
      />,
    )
    const received = await findByLabelText("Test Label")

    fireEvent.click(received)

    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it("it should have an aria label", async () => {
    const onChange = jest.fn()

    const { findByLabelText } = render(
      <Checkbox
        handleChange={onChange}
        label="Test Label"
        aria-label="Test Label"
      />,
    )
    const received = await findByLabelText("Test Label")

    expect(received).toBeInTheDocument()
    expect(received).toHaveAttribute("aria-label", "Test Label")
  })

  it("it should be checked when checked is true", async () => {
    const onChange = jest.fn()

    const { findByLabelText } = await render(
      <Checkbox handleChange={onChange} label="Test Label" checked />,
    )
    const received = await findByLabelText("Test Label")

    expect(received).toBeInTheDocument()
    expect(received).toBeChecked()
  })

  it("it should be unchecked when checked is false", async () => {
    const onChange = jest.fn()

    const { findByLabelText } = await render(
      <Checkbox handleChange={onChange} label="Test Label" checked={false} />,
    )
    const received = await findByLabelText("Test Label")

    expect(received).toBeInTheDocument()
    expect(received).not.toBeChecked()
  })
})
