import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TextInput } from "./TextInput"

describe("TextInput", () => {
  it("renders the expected markup", () => {
    const { asFragment } = render(
      <TextInput
        helperText="Test Helper Text"
        name="test-input"
        label="Test Input"
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it("renders an input w/ the required attributes", async () => {
    render(<TextInput name="test-input" label="Test Input" />)
    const received = await screen.findByLabelText("Test Input")

    expect(received).toBeInTheDocument()
    expect(received).toHaveAttribute("name", "test-input")
    expect(received).toHaveAttribute("aria-label", "Test Input")
  })

  it("input calls the most used events during usage", async () => {
    const events = {
      onClick: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onChange: jest.fn(),
    }
    const textToType = "typing into input"

    render(<TextInput name="test-input" label="Test Input" {...events} />)
    const received = await screen.findByLabelText("Test Input")

    await userEvent.type(received, textToType)
    userEvent.tab()

    expect(events.onClick).toHaveBeenCalledTimes(1)
    expect(events.onFocus).toHaveBeenCalledTimes(1)
    expect(events.onBlur).toHaveBeenCalledTimes(1)
    expect(events.onChange).toHaveBeenCalledTimes(textToType.length)
  })

  it("renders the helper text", async () => {
    const helperText = "this is helper text"

    render(
      <TextInput
        name="test-input"
        label="Test Input"
        helperText={helperText}
      />,
    )
    const receivedInput = await screen.findByLabelText("Test Input")
    const receivedHelperText = await screen.findByText(helperText)

    expect(receivedHelperText).toBeInTheDocument()
    expect(receivedInput).toHaveAttribute(
      "aria-describedby",
      receivedHelperText.id,
    )
  })

  it("renders correctly when hideLabel is true", async () => {
    render(<TextInput name="test-input" label="Test Input" hideLabel={true} />)
    const received = await screen.findByLabelText("Test Input")
    const receivedText = screen.queryByText("Test Input")

    expect(received).toBeInTheDocument()
    expect(received).toHaveAttribute("name", "test-input")
    expect(receivedText).not.toBeInTheDocument()
  })

  it("can not be typed into when disabled", async () => {
    const events = {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      onFocus: jest.fn(),
      onClick: jest.fn(),
    }
    const textToType = "typing into input"

    render(
      <TextInput name="test-input" label="Test Input" disabled {...events} />,
    )
    const received = await screen.findByLabelText("Test Input")

    userEvent.type(received, textToType)
    userEvent.tab()

    expect(events.onClick).toHaveBeenCalledTimes(0)
    expect(events.onFocus).toHaveBeenCalledTimes(0)
    expect(events.onChange).toHaveBeenCalledTimes(0)
    expect(events.onBlur).toHaveBeenCalledTimes(0)
  })

  it("renders correctly when helperText is provided", async () => {
    const helperText = "this is helper text"

    render(
      <TextInput
        name="test-input"
        label="Test Input"
        helperText={helperText}
      />,
    )
    const receivedInput = await screen.findByLabelText("Test Input")
    const receivedHelperText = await screen.findByText(helperText)

    expect(receivedHelperText).toBeInTheDocument()
    expect(receivedInput).toHaveAttribute(
      "aria-describedby",
      receivedHelperText.id,
    )
  })
})
