import { render, screen } from "@testing-library/react"
import { Tab } from "./Tab"

describe("MenuItem", () => {
  it("passes children straight through", () => {
    // Arrange
    const label = "Label"
    const content = "Content"

    // Act
    render(
      <Tab id="1" label={label}>
        {content}
      </Tab>,
    )

    const result = screen.getByText(content)

    // Assert
    expect(result).toBeInTheDocument()
  })
})
