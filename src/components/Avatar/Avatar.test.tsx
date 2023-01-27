import { render, screen } from "@testing-library/react"
import { getInitials } from "./utils/getInitials"
import { Avatar } from "."

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

  it("renders an aria label when an image is supplied", () => {
    // Arrange
    const name = "Crema Components"
    const ariaLabel = `An avatar with an image of ${name}`

    // Act
    render(<Avatar name={name} src="someUrl" />)

    const label = screen.getByLabelText(ariaLabel)

    // Assert
    expect(label).toBeInTheDocument()
  })

  it("renders an aria label when an image is not supplied", () => {
    // Arrange
    const name = "Crema Components"
    const ariaLabel = `An avatar with initials for ${name}`

    // Act
    render(<Avatar name={name} />)

    const label = screen.getByLabelText(ariaLabel)

    // Assert
    expect(label).toBeInTheDocument()
  })
})
