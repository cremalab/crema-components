import { fireEvent, render, screen } from "@testing-library/react"
import { Tab } from "../Tab"
import { Tabs } from "./Tabs"

describe("Tabs", () => {
  it("renders a single Tab", () => {
    // Arrange
    const label = "Tab 1"
    const content = "Content 1"

    // Act
    render(
      <Tabs>
        <Tab label={label}>{content}</Tab>
      </Tabs>,
    )

    const menuItemNode = screen.getByText(label)
    const contentNode = screen.getByText(content)

    // Assert
    expect(menuItemNode).toBeInTheDocument()
    expect(contentNode).toBeInTheDocument()
  })

  it("renders multiple Tabs; only Tab[0]'s content initially shown", () => {
    // Arrange
    const label1 = "Tab 1"
    const content1 = "Content 1"
    const label2 = "Tab 2"
    const content2 = "Content 2"

    // Act
    render(
      <Tabs>
        <Tab label={label1}>{content1}</Tab>
        <Tab label={label2}>{content2}</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText(label1)
    const menuItemNode2 = screen.getByText(label2)
    const contentNode1 = screen.getByText(content1)
    const contentNode2 = screen.queryByText(content2)

    // Assert
    expect(menuItemNode1).toBeInTheDocument()
    expect(menuItemNode2).toBeInTheDocument()
    expect(contentNode1).toBeInTheDocument()
    expect(contentNode2).toBeNull()
  })

  it("sets initial active using initialTab prop", () => {
    // Arrange
    const label1 = "Tab 1"
    const content1 = "Content 1"
    const label2 = "Tab 2"
    const content2 = "Content 2"

    // Act
    render(
      <Tabs initialTab={1}>
        <Tab label={label1}>{content1}</Tab>
        <Tab label={label2}>{content2}</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText(label1)
    const menuItemNode2 = screen.getByText(label2)
    const contentNode1 = screen.queryByText(content1)
    const contentNode2 = screen.getByText(content2)

    // Assert
    expect(menuItemNode1).toBeInTheDocument()
    expect(menuItemNode2).toBeInTheDocument()
    expect(contentNode1).toBeNull()
    expect(contentNode2).toBeInTheDocument()
  })

  it("renders a Tab's content when clicked", async () => {
    // Arrange
    const label1 = "Tab 1"
    const content1 = "Content 1"
    const label2 = "Tab 2"
    const content2 = "Content 2"

    // Act
    render(
      <Tabs>
        <Tab label={label1}>{content1}</Tab>
        <Tab label={label2}>{content2}</Tab>
      </Tabs>,
    )

    const menuItemNode1 = screen.getByText(label1)
    const menuItemNode2 = screen.getByText(label2)

    await fireEvent.click(menuItemNode2)

    const contentNode1 = screen.queryByText(content1)
    const contentNode2 = await screen.findByText(content2)

    // Assert
    expect(menuItemNode1).toBeInTheDocument()
    expect(menuItemNode2).toBeInTheDocument()
    expect(contentNode1).toBeNull()
    expect(contentNode2).toBeInTheDocument()
  })

  it("onTabClick is called when tab is clicked", () => {
    // Arrange
    const onTabClick = jest.fn()
    const label1 = "Tab 1"
    const content1 = "Content 1"
    const label2 = "Tab 2"
    const content2 = "Content 2"

    // Act
    render(
      <Tabs onTab={onTabClick}>
        <Tab label={label1}>{content1}</Tab>
        <Tab label={label2}>{content2}</Tab>
      </Tabs>,
    )

    const menuItemNode2 = screen.getByText(label2)

    fireEvent.click(menuItemNode2)

    // Assert
    expect(onTabClick).toBeCalledWith(1)
  })
})
