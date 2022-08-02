import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TabPanel, Tabs } from "."

describe("Tabs", () => {
  it("renders a single Tab", () => {
    // Arrange
    const onTabChange = jest.fn()
    const label = "Tab 1"
    const content = "Content 1"

    // Act
    render(
      <Tabs currentTab={"first"} onTabChange={onTabChange}>
        <TabPanel id="first" label={label}>
          {content}
        </TabPanel>
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
        <TabPanel id="1" label="Tab 1">
          Content 1
        </TabPanel>
        <TabPanel id="2" label="Tab 2">
          Content 2
        </TabPanel>
        <TabPanel id="3" label="Tab 3">
          Content 3
        </TabPanel>
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
        <TabPanel id="1" label="Tab 1">
          Content 1
        </TabPanel>
        <TabPanel id="2" label="Tab 2">
          Content 2
        </TabPanel>
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
        <TabPanel id="1" label="Tab 1">
          Content 1
        </TabPanel>
        <TabPanel id="2" label="Tab 2">
          Content 2
        </TabPanel>
      </Tabs>,
    )

    const menuItemNode2 = screen.getByText("Tab 2")
    fireEvent.click(menuItemNode2)

    // Assert
    expect(onTabChange).toBeCalledWith("2")
  })

  it("onTabChange is called with expected 'tab' data when ArrowLeft pressed from 1", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="2">
        <TabPanel id="1" label="Tab 1">
          Content 1
        </TabPanel>
        <TabPanel id="2" label="Tab 2">
          Content 2
        </TabPanel>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 2")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowleft}")

    // Assert
    expect(onTabChange).toBeCalledWith("1")
  })

  it("onTabChange is called with expected 'tab' data when ArrowLeft loops back to end", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="1">
        <TabPanel id="1" label="Tab 1">
          Content 1
        </TabPanel>
        <TabPanel id="2" label="Tab 2">
          Content 2
        </TabPanel>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 1")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowleft}")

    // Assert
    expect(onTabChange).toBeCalledWith("2")
  })

  it("onTabChange is called with expected 'tab' data when ArrowRight pressed from 0", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="1">
        <TabPanel id="1" label="Tab 1">
          Content 1
        </TabPanel>
        <TabPanel id="2" label="Tab 2">
          Content 2
        </TabPanel>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 1")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowright}")

    // Assert
    expect(onTabChange).toBeCalledWith("2")
  })

  it("onTabChange is called with expected 'tab' data when ArrowRight loops back to 0", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab="2">
        <TabPanel id="1" label="Tab 1">
          Content 1
        </TabPanel>
        <TabPanel id="2" label="Tab 2">
          Content 2
        </TabPanel>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 2")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowright}")

    // Assert
    expect(onTabChange).toBeCalledWith("1")
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
          <TabPanel id="1" label="Tab 1" disabled>
            Content 1
          </TabPanel>
          <TabPanel id="2" label="Tab 2">
            Content 2
          </TabPanel>
          <TabPanel id="3" label="Tab 3">
            Content 3
          </TabPanel>
        </Tabs>,
      )

    // Assert
    expect(renderWithError).toThrowError("currentTab '4' does not exist")
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
          <TabPanel id="1" label="Tab 1" disabled>
            Content 1
          </TabPanel>
          <TabPanel id="2" label="Tab 2">
            Content 2
          </TabPanel>
          <TabPanel id="3" label="Tab 3">
            Content 3
          </TabPanel>
        </Tabs>,
      )

    // Assert
    expect(renderWithError).toThrowError("currentTab '1' is disabled")
  })
})
