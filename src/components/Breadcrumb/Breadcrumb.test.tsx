import { render, screen } from "@testing-library/react"
import { Breadcrumb } from "./Breadcrumb"

const breadcrumbLinks = [
  {
    href: "#",
    label: "Home",
  },
  {
    href: "#",
    label: "About",
  },
]

describe("Breadcrumb", () => {
  it("renders children", async () => {
    render(<Breadcrumb links={breadcrumbLinks} />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("renders the last link as current", async () => {
    render(<Breadcrumb links={breadcrumbLinks} />)

    const lastLink = screen.getByText("About")
    expect(lastLink).toHaveAttribute("aria-current", "page")
  })

  it("renders other links as not current", async () => {
    render(<Breadcrumb links={breadcrumbLinks} />)

    const firstLink = screen.getByText("Home")
    expect(firstLink).not.toHaveAttribute("aria-current")
  })

  it("renders the expected navigation aria-label", async () => {
    render(<Breadcrumb links={breadcrumbLinks} />)

    const nav = screen.getByRole("navigation")
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute("aria-label", "breadcrumbs")
  })

  it("renders the breadcrumb items as <li></li> elements", async () => {
    render(<Breadcrumb links={breadcrumbLinks} />)

    const li = screen.getAllByRole("listitem")

    expect(li).toHaveLength(breadcrumbLinks.length)
  })

  it("renders the breadcrumb items as buttons if the linkElement prop is provided", async () => {
    render(
      <Breadcrumb
        links={breadcrumbLinks}
        linkElement={{
          renderItem: ({ item }) => <button>{item.label}</button>,
        }}
      />,
    )

    const buttonElement = screen.getByText("Home")

    expect(buttonElement.tagName).toBe("BUTTON")
  })
})
