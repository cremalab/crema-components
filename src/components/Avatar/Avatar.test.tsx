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
  it("does not render initials if image is supplied", () => {
    // Arrange
    const name = "Crema Components"
    const initials = getInitials(name)

    // Act
    render(<Avatar name={name} src="someUrl" />)

    const received = screen.queryByText(initials)

    // Assert
    expect(received).not.toBeInTheDocument()
  })
  it("renders a meaningful aria label when an image is supplied", () => {
    // Arrange
    const name = "Crema Components"
    const initials = getInitials(name)
    const ariaLabel = `An image of ${name}`

    // Act
    render(<Avatar name={name} src="someUrl" />)

    const received = screen.queryByText(initials)
    const label = screen.getByLabelText(ariaLabel)

    // Assert
    expect(received).not.toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })
})
