import { render, screen } from "@testing-library/react"
import { Avatar } from ".."
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
    expect(Rendered).toThrow("<AvatarGroup /> only accepts <Avatar /> children")

    jest.restoreAllMocks()
  })

  it("has a default max of 3", () => {
    // Arrange
    const hiddenLabel = "1 hidden avatar"
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
    const received = screen.getByLabelText(hiddenLabel)

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
        <Avatar name="Crema Components" />
        <Avatar name="Jane Doe" />
        <Avatar name="Foo Bar" />
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

  it("does not render hidden count element if number of children equals max", () => {
    // Arrange
    const testId = "hidden_count"

    // Act
    render(
      <AvatarGroup max={3}>
        <Avatar name="Crema Components" />
        <Avatar name="Jane Doe" />
        <Avatar name="Foo Bar" />
      </AvatarGroup>,
    )

    const received = screen.queryByTestId(testId)

    // Assert
    expect(received).not.toBeInTheDocument()
  })

  it("allows for custom hidden element", () => {
    // Arrange
    const label = "hidden count"
    const hiddenElement = (hiddenCount: number) => (
      <p aria-label={label}>{hiddenCount}</p>
    )

    // Act
    render(
      <AvatarGroup renderHiddenCount={hiddenElement}>
        <Avatar name="Crema Components" />
        <Avatar name="Jane Doe" />
        <Avatar name="John Doe" />
        <Avatar name="Foo Bar" />
      </AvatarGroup>,
    )

    const received = screen.getByLabelText(label)

    // Assert
    expect(received).toBeInTheDocument()
  })
})
