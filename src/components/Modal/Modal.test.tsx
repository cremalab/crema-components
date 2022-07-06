import { render } from "@testing-library/react"
import { Modal } from "./Modal"

describe("Modal", () => {
  it("renders nothing when open = false", async () => {
    // Arrange
    // Act
    const { asFragment } = await render(
      <Modal open={false}>this should not render</Modal>,
    )

    // Assert
    expect(asFragment()).toMatchSnapshot()
  })
})
