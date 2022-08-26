import { render, screen } from "@testing-library/react"
import { Box } from "./Box"

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
})
