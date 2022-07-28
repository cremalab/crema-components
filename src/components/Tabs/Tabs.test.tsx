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
      <Tabs currentTab={0} onTabChange={onTabChange}>
        <Tab label={label}>{content}</Tab>
      </Tabs>,
    )

    const menuItemNode = screen.getByText(label)
    const contentNode = screen.getByText(content)

    // Assert
    expect(menuItemNode).toBeInTheDocument()
    expect(contentNode).toBeInTheDocument()
  })

  it("renders multiple Tabs but only one is not hidden", () => {
    // Arrange
    const onTabChange = jest.fn()
    const label0 = "Tab 1"
    const content0 = "Content 1"
    const label1 = "Tab 2"

    // Act
    render(
      <Tabs currentTab={0} onTabChange={onTabChange}>
        <Tab label={label0}>{content0}</Tab>
        <Tab label={label1}>Content 2</Tab>
        <Tab label="Tab 3">Content 3</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText(label0)
    const menuItemNode2 = screen.getByText(label1)
    const contentNode1 = screen.getByRole("tabpanel")

    // Assert
    expect(menuItemNode1).toBeInTheDocument()
    expect(menuItemNode2).toBeInTheDocument()
    expect(contentNode1.textContent).toBe(content0)
  })

  it("renders correct tab when currentTab set", () => {
    // Arrange
    const onTabChange = jest.fn()
    const label0 = "Tab 1"
    const content0 = "Content 1"
    const label1 = "Tab 2"
    const content1 = "Content 2"

    // Act
    render(
      <Tabs currentTab={1} onTabChange={onTabChange}>
        <Tab label={label0}>{content0}</Tab>
        <Tab label={label1}>{content1}</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText(label0)
    const menuItemNode2 = screen.getByText(label1)
    const contentNode2 = screen.getByRole("tabpanel")

    // Assert
    expect(menuItemNode1).toBeInTheDocument()
    expect(menuItemNode2).toBeInTheDocument()
    expect(contentNode2.textContent).toBe(content1)
  })

  it("onTabChange is called when tab is clicked", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab={0}>
        <Tab label="Tab 1">Content 1</Tab>
        <Tab label="Tab 2">Content 2</Tab>
      </Tabs>,
    )

    const menuItemNode2 = screen.getByText("Tab 2")
    fireEvent.click(menuItemNode2)

    // Assert
    expect(onTabChange).toBeCalledWith(1)
  })

  it("onTabChange is called with expected 'tab' data when ArrowLeft pressed from 1", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab={1}>
        <Tab label="Tab 1">Content 1</Tab>
        <Tab label="Tab 2">Content 2</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 2")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowleft}")

    // Assert
    expect(onTabChange).toBeCalledWith(0)
  })

  it("onTabChange is called with expected 'tab' data when ArrowLeft loops back to end", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab={0}>
        <Tab label="Tab 1">Content 1</Tab>
        <Tab label="Tab 2">Content 2</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 1")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowleft}")

    // Assert
    expect(onTabChange).toBeCalledWith(1)
  })

  it("onTabChange is called with expected 'tab' data when ArrowRight pressed from 0", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab={0}>
        <Tab label="Tab 1">Content 1</Tab>
        <Tab label="Tab 2">Content 2</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 1")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowright}")

    // Assert
    expect(onTabChange).toBeCalledWith(1)
  })

  it("onTabChange is called with expected 'tab' data when ArrowRight loops back to 0", () => {
    // Arrange
    const onTabChange = jest.fn()

    // Act
    render(
      <Tabs onTabChange={onTabChange} currentTab={1}>
        <Tab label="Tab 1">Content 1</Tab>
        <Tab label="Tab 2">Content 2</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText("Tab 2")
    menuItemNode1.focus()
    userEvent.keyboard("{arrowright}")

    // Assert
    expect(onTabChange).toBeCalledWith(0)
  })
})
