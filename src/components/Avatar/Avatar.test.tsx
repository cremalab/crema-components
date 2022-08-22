import { render, screen } from "@testing-library/react"
import { Avatar } from "./Avatar"
import { getInitials } from "./utils/getInitials"

describe("Avatar", () => {
  it("renders an avatar with initials", () => {
    // Arrange
    const name = "Crema Components"
    const initials = getInitials(name)

    // Act
    render(<Avatar name={name} />)

    const received = screen.getByText(initials)

    // Assert
    expect(received).toBeInTheDocument()
  })
})
