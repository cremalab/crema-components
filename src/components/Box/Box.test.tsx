import { render, screen } from "@testing-library/react"
import { Box, BoxProps } from "./Box"

describe("Box", () => {
  it("renders", () => {
    // Arrange
    const text = "Hello World"

    // Act
    render(
      <Box
        display="flex"
        bg="red"
        height={500}
        width={500}
        borderRadius={8}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <p>{text}</p>
      </Box>,
    )

    const received = screen.getByText(text)

    // Assert
    expect(received).toBeInTheDocument()
  })
  it("supports shorthand properties", () => {
    // Arrange
    const shortHand: Partial<BoxProps> = {
      b: "red",
      br: 8,
      h: 100,
      w: 100,
      maxH: 200,
      maxW: 200,
      minH: 50,
      minW: 50,
    }

    const text = "Hello World"

    // Act
    render(<Box {...shortHand}>{text}</Box>)

    const received = screen.getByText(text)

    // Assert
    expect(received).toHaveStyle(
      "background: red; borderRadius: 8px; height: 100px; width: 100px; maxHeight: 200px; maxWidth: 200px; minHeight: 50px; minWidth: 50px",
    )
  })
  it("renders without children", () => {
    // Arrange
    const label = "without children"

    // Act
    render(<Box aria-label={label} />)

    const received = screen.getByLabelText(label)

    // Assert
    expect(received).toBeInTheDocument()
  })
})
