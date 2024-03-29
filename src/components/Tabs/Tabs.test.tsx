import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tab, Tabs } from "."

describe("Tabs", () => {
  it("renders a single Tab", () => {
    // Arrange
    const onTabChange = jest.fn()
    const label = "Tab 1"
    const content = "Content 1"

    // Act
    render(
      <Tabs currentTab={"first"} onTabChange={onTabChange}>
        <Tab id="first" label={label}>
          {content}
        </Tab>
      </Tabs>,
    )

    // Assert
    const menuItemNode = screen.getByText(label)
    const contentNode = screen.getByText(content)

    expect(menuItemNode).toBeInTheDocument()
    expect(contentNode).toBeInTheDocument()
  })

  it("renders multiple Tabs but only one is not hidden", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs currentTab="1" onTabChange={onTabChange}>
        <Tab id="1" label="Tab 1">
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
        <Tab id="3" label="Tab 3">
          Content 3
        </Tab>
      </Tabs>,
    )

    // Assert
    const menuItemNode1 = screen.getByText("Tab 1")
    const menuItemNode2 = screen.getByText("Tab 2")
    const contentNode1 = screen.getByRole("tabpanel")

    expect(menuItemNode1).toBeInTheDocument()
    expect(menuItemNode2).toBeInTheDocument()
    expect(contentNode1.textContent).toBe("Content 1")
  })

  it("renders correct tab when currentTab set", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs currentTab="2" onTabChange={onTabChange}>
        <Tab id="1" label="Tab 1">
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    )

    // Assert
    const menuItemNode1 = screen.getByText("Tab 1")
    const menuItemNode2 = screen.getByText("Tab 2")
    const contentNode2 = screen.getByRole("tabpanel")

    expect(menuItemNode1).toBeInTheDocument()
    expect(menuItemNode2).toBeInTheDocument()
    expect(contentNode2.textContent).toBe("Content 2")
  })

  it("onTabChange is called when tab is clicked", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="1">
        <Tab id="1" label="Tab 1">
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    )

    const menuItemNode2 = screen.getByText("Tab 2")
    fireEvent.click(menuItemNode2)

    // Assert
    expect(onTabChange).toHaveBeenCalledWith("2")
  })

  it("supports disabled tabs", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act

    render(
      <Tabs onTabChange={onTabChange} currentTab="2">
        <Tab id="1" label="Tab 1" disabled>
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
        <Tab id="3" label="Tab 3">
          Content 3
        </Tab>
      </Tabs>,
    )

    const labelNode = screen.getByLabelText("Tab 1")

    fireEvent.click(labelNode)

    // Assert
    expect(onTabChange).not.toHaveBeenCalled()
    expect(labelNode).toHaveAttribute("aria-disabled", "true")
    expect(labelNode).toHaveClass("item disabled")
  })

  it("onTabChange is called with expected 'tab' data when ArrowLeft pressed from 1", async () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="2">
        <Tab id="1" label="Tab 1">
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 2")
    menuItemNode1.focus()
    await userEvent.keyboard("{arrowleft}")

    // Assert
    expect(onTabChange).toHaveBeenCalledWith("1")
  })

  it("onTabChange is called with expected 'tab' data when ArrowLeft loops back to end", async () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="1">
        <Tab id="1" label="Tab 1">
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 1")
    menuItemNode1.focus()
    await userEvent.keyboard("{arrowleft}")

    // Assert
    expect(onTabChange).toHaveBeenCalledWith("2")
  })

  it("onTabChange is called with expected 'tab' data when ArrowRight pressed from 0", async () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="1">
        <Tab id="1" label="Tab 1">
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 1")
    menuItemNode1.focus()
    await userEvent.keyboard("{arrowright}")

    // Assert
    expect(onTabChange).toHaveBeenCalledWith("2")
  })

  it("onTabChange is called with expected 'tab' data when ArrowRight loops back to 0", async () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="2">
        <Tab id="1" label="Tab 1">
          Content 1
        </Tab>
        <Tab id="2" label="Tab 2">
          Content 2
        </Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 2")
    menuItemNode1.focus()
    await userEvent.keyboard("{arrowright}")

    // Assert
    expect(onTabChange).toHaveBeenCalledWith("1")
  })

  it("throws error if currentTab id is not within list of <Tab />s", () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {})
    const onTabChange = jest.fn()

    // Act

    const renderWithError = () =>
      render(
        <Tabs onTabChange={onTabChange} currentTab="4">
          <Tab id="1" label="Tab 1" disabled>
            Content 1
          </Tab>
          <Tab id="2" label="Tab 2">
            Content 2
          </Tab>
          <Tab id="3" label="Tab 3">
            Content 3
          </Tab>
        </Tabs>,
      )

    // Assert
    expect(renderWithError).toThrow("currentTab '4' does not exist")
  })

  it("throws error if currentTab id belongs to a disabled tab", () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {})
    const onTabChange = jest.fn()

    // Act

    const renderWithError = () =>
      render(
        <Tabs onTabChange={onTabChange} currentTab="1">
          <Tab id="1" label="Tab 1" disabled>
            Content 1
          </Tab>
          <Tab id="2" label="Tab 2">
            Content 2
          </Tab>
          <Tab id="3" label="Tab 3">
            Content 3
          </Tab>
        </Tabs>,
      )

    // Assert
    expect(renderWithError).toThrow("currentTab '1' is disabled")
  })
})
