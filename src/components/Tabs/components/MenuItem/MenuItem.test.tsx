import { fireEvent, render, screen } from "@testing-library/react"
import { Tab } from "../../types"
import { MenuItem } from "./MenuItem"

describe("MenuItem", () => {
  it("displays label text", () => {
    // Arrange
    const label = "Tab Label"
    const onClick = jest.fn()
    const tab: Tab = { label, content: "Tab Content" }

    // Act
    render(<MenuItem index={0} isActive={false} onClick={onClick} tab={tab} />)
    const result = screen.getByText(label)

    // Assert
    expect(result).toBeInTheDocument()
  })

  it("calls `onClick` with `index` when clicked", () => {
    // Arrange
    const label = "Tab Label"
    const onClick = jest.fn()
    const tab: Tab = { label, content: "Tab Content" }

    // Act
    render(<MenuItem index={0} isActive={false} onClick={onClick} tab={tab} />)
    fireEvent.click(screen.getByText(label))

    // Assert
    expect(onClick).toBeCalledWith(0)
  })

  it("has active class applied when isActive is true", () => {
    // Arrange
    const label = "Tab Label"
    const onClick = jest.fn()
    const tab: Tab = { label, content: "Tab Content" }

    // Act
    const { container } = render(
      <MenuItem index={0} isActive={true} onClick={onClick} tab={tab} />,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const result = container.getElementsByClassName("isActive")

    // Assert
    expect(result).toHaveLength(1)
  })
})
