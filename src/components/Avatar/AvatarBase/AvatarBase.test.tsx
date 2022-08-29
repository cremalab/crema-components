import { render, screen } from "@testing-library/react"
import { AvatarBase, AvatarSize } from "./AvatarBase"

describe("AvatarBase", () => {
  it("renders 3 sizes of avatars", () => {
    // Arrange
    const sizes: AvatarSize[] = ["sm", "md", "lg"]

    sizes.forEach((size) => {
      // Act
      const label = `An avatar with initials for ${size}`

      render(
        <AvatarBase ariaLabel={label} size={size}>
          {size}
        </AvatarBase>,
      )

      const received = screen.getByLabelText(label)

      // Assert
      expect(received).toHaveAttribute("data-size", size)
    })
  })

  it("allows for override of background and font color", () => {
    // Arrange
    const name = "Crema Components"
    const fontColor = "rgb(255, 0, 0)"
    const backgroundColor = "rgb(0, 0, 0)"

    // Act
    render(
      <AvatarBase background={backgroundColor} fontColor={fontColor}>
        {name}
      </AvatarBase>,
    )

    const received = screen.getByText(name)

    // Assert
    expect(received).toHaveStyle(
      `color: ${fontColor}; background-color: ${backgroundColor};`,
    )
  })

  it("renders an image when a src is passed", () => {
    // Arrange
    const fileName = "justink.jpeg"
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const image = require(`../../../assets/${fileName}`)
    const name = "Justin K"
    const label = "An avatar with image of Justin K"

    // Act
    render(
      <AvatarBase ariaLabel={label} src={image}>
        {name}
      </AvatarBase>,
    )

    const received = screen.getByLabelText(label)

    // Assert
    expect(received).toHaveStyle(`background: url(${fileName})`)
  })
})
