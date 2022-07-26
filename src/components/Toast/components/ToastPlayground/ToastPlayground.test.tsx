import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ToasterProvider } from "../../ToasterContext"
import { ToastPlayground } from "./ToastPlayground"

describe("ToastPlayground", () => {
  it("adds a toast when a toast button is clicked", async () => {
    // Arrange
    const buttonText = "Add Success Toast"
    const toastMessage = "Success Toast"

    // Act
    render(
      <ToasterProvider config={{ duration: Infinity }}>
        <ToastPlayground />
      </ToasterProvider>,
    )

    const button = screen.getByText(buttonText)

    await userEvent.click(button)

    const received = await screen.findByText(toastMessage)

    // Assert
    expect(received).toBeInTheDocument()
  })
  it("removes all toasts when removeAll is triggered", async () => {
    // Arrange
    const buttonTextInfo = "Add Info Toast"
    const buttonTextSuccess = "Add Warning Toast"
    const toastMessage = "Info Toast"
    const removeAllButtonText = "Dismiss All"

    // Act
    render(
      <ToasterProvider config={{ duration: Infinity }}>
        <ToastPlayground />
      </ToasterProvider>,
    )

    const infoToastButton = screen.getByText(buttonTextInfo)
    const warningToastButton = screen.getByText(buttonTextSuccess)

    await userEvent.click(infoToastButton)

    await userEvent.click(warningToastButton)

    const dismissAllButton = await screen.findByText(removeAllButtonText)

    await userEvent.click(dismissAllButton)

    const receivedAfterDismiss = screen.queryByText(toastMessage)

    // Assert
    await waitFor(() => expect(receivedAfterDismiss).not.toBeInTheDocument())
  })
  it("removes toast by its handleClose callback on custom action", async () => {
    // Arrange
    const buttonText = "Add Success Toast"
    const dismissText = "Dismiss"
    const toastMessage = "Success Toast"

    // Act
    render(
      <ToasterProvider config={{ duration: Infinity }}>
        <ToastPlayground />
      </ToasterProvider>,
    )

    const receivedButton = screen.getByText(buttonText)

    await userEvent.click(receivedButton)

    const receivedDismissButton = await screen.findByText(dismissText)

    await userEvent.click(receivedDismissButton)

    const received = screen.queryByText(toastMessage)

    // Assert
    await waitFor(() => expect(received).not.toBeInTheDocument())
  })
  it("allows interaction with an Error Toast", async () => {
    // Arrange
    const buttonText = "Add Error Toast"
    const toastMessage = "Error Toast"

    // Act
    render(
      <ToasterProvider config={{ duration: Infinity }}>
        <ToastPlayground />
      </ToasterProvider>,
    )

    const button = screen.getByText(buttonText)

    await userEvent.click(button)

    const received = await screen.findByText(toastMessage)

    // Assert
    expect(received).toBeInTheDocument()
  })
  it("pressing escape dismisses oldest toast", async () => {
    // Arrange
    const buttonTextInfo = "Add Info Toast"
    const buttonTextSuccess = "Add Warning Toast"
    const testID = /toast/

    // Act
    render(
      <ToasterProvider config={{ duration: Infinity }}>
        <ToastPlayground />
      </ToasterProvider>,
    )

    const infoToastButton = screen.getByText(buttonTextInfo)
    const warningToastButton = screen.getByText(buttonTextSuccess)

    await userEvent.click(infoToastButton)
    await userEvent.click(warningToastButton)

    const received = screen.getAllByTestId(testID)

    expect(received).toHaveLength(2)

    await userEvent.keyboard("[Escape]")

    // Assert
    await waitFor(() => expect(screen.getAllByTestId(testID)).toHaveLength(1))
  })
  it("throws an error if useToaster is used outside of it's context", () => {
    // Arrange

    // Act

    // Assert
    expect(() => render(<ToastPlayground />)).toThrow(
      "useToaster must be used within a ToasterProvider!",
    )
  })
  it("replaces previous Toast if behavior is set to 'replace'", async () => {
    // Arrange
    const buttonTextInfo = "Add Info Toast"
    const buttonTextSuccess = "Add Warning Toast"
    const testID = /toast/

    // Act
    render(
      <ToasterProvider config={{ duration: Infinity, behavior: "replace" }}>
        <ToastPlayground />
      </ToasterProvider>,
    )

    const infoToastButton = screen.getByText(buttonTextInfo)
    const warningToastButton = screen.getByText(buttonTextSuccess)

    await userEvent.click(infoToastButton)

    await userEvent.click(warningToastButton)

    // Assert
    await waitFor(() => expect(screen.getAllByTestId(testID)).toHaveLength(1))
  })
})
