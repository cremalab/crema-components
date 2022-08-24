import { render, screen } from "@testing-library/react"
import { Avatar } from "../Avatar"
import { AvatarGroup } from "./AvatarGroup"

describe("AvatarList", () => {
  it("renders a group of <Avatar /> children", () => {
    // Arrange
    const testId = /avatar_item/

    // Act
    render(
      <AvatarGroup>
        <Avatar name="Crema Components" />
        <Avatar name="Jane Doe" />
        <Avatar name="Foo Bar" />
      </AvatarGroup>,
    )

    const receievedChildren = screen.getAllByTestId(testId)

    // Assert
    expect(receievedChildren).toHaveLength(3)
  })

  it("throws an error if any children passed are not <Avatar />'s", () => {
    // Arrange
    jest.spyOn(console, "error").mockImplementation(() => null)

    // Act
    const Rendered = () =>
      render(
        <AvatarGroup>
          <div>
            <Avatar name="Crema Components" />
          </div>
          <Avatar name="Jane Doe" />
          <Avatar name="Foo Bar" />
        </AvatarGroup>,
      )

    // Assert
    expect(Rendered).toThrowError(
      "<AvatarGroup /> only accepts <Avatar /> children",
    )
    jest.restoreAllMocks()
  })

  it("throws if there are less than 2 <Avatar />'s", () => {
    // Arrange
    jest.spyOn(console, "error").mockImplementation(() => null)

    // Act
    const Rendered = () =>
      render(
        <AvatarGroup>
          <Avatar name="Crema Components" />
        </AvatarGroup>,
      )

    // Assert

    expect(Rendered).toThrowError(
      "<AvatarGroup /> should contain at least 2 children. \n Consider using <Avatar /> on its own.",
    )
    jest.restoreAllMocks()
  })

  it("has a default max of 3", () => {
    // Arrange
    const expectedText = "+1"
    const hiddenName = "John Doe"

    // Act
    render(
      <AvatarGroup>
        <Avatar name="Crema Components" />
        <Avatar name="Jane Doe" />
        <Avatar name="Foo Bar" />
        <Avatar name={hiddenName} />
      </AvatarGroup>,
    )

    const hidden = screen.queryByText(hiddenName)
    const received = screen.getByText(expectedText)

    // Assert
    expect(hidden).not.toBeInTheDocument()
    expect(received).toBeInTheDocument()
  })

  it("allows for custom max", () => {
    // Arrange
    const max = 2
    const visibileNames = ["Crema Components", "Jane Doe"]
    const hiddenNames = ["Foo Bar", "John Doe", "A User"]
    const expectedText = `+${hiddenNames.length}`
    const avatars = [...visibileNames, ...hiddenNames].map((name) => (
      <Avatar key={name} name={name} />
    ))

    // Act
    render(<AvatarGroup max={max}>{avatars}</AvatarGroup>)

    const received = screen.getByText(expectedText)

    // Assert
    hiddenNames.forEach((name) => {
      const hidden = screen.queryByText(name)
      expect(hidden).not.toBeInTheDocument()
    })
    expect(received).toBeInTheDocument()
  })

  it("defaults to a size of 'sm'", () => {
    // Arrange
    const labelMatch = /an avatar with initials for/i

    // Act
    render(
      <AvatarGroup>
        <Avatar size="sm" name="Crema Components" />
        <Avatar size="md" name="Jane Doe" />
        <Avatar size="lg" name="Foo Bar" />
      </AvatarGroup>,
    )

    const avatars = screen.getAllByLabelText(labelMatch, { exact: false })

    // Assert
    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute("data-size", "sm")
    })
  })

  it("overrides individual size props", () => {
    // Arrange
    const size = "md"
    const labelMatch = /an avatar with initials for/i

    // Act
    render(
      <AvatarGroup size={size}>
        <Avatar size="sm" name="Crema Components" />
        <Avatar size="md" name="Jane Doe" />
        <Avatar size="lg" name="Foo Bar" />
      </AvatarGroup>,
    )

    const avatars = screen.getAllByLabelText(labelMatch, { exact: false })

    // Assert
    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute("data-size", size)
    })
  })
})
