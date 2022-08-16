import { render, screen } from "@testing-library/react"
import { Breadcrumb } from "./Breadcrumb"
import { BreadcrumbItem } from "./BreadcrumbItem"

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
    const children = breadcrumbLinks.map((link, index) => (
      <BreadcrumbItem key={index} {...link} />
    ))

    render(<Breadcrumb>{children}</Breadcrumb>)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("renders the last link as current", async () => {
    const children = breadcrumbLinks.map((link, index) => (
      <BreadcrumbItem key={index} {...link} />
    ))

    render(<Breadcrumb>{children}</Breadcrumb>)

    const lastLink = screen.getByText("About")
    expect(lastLink).toHaveAttribute("aria-current", "page")
  })

  it("renders other links as not current", async () => {
    const children = breadcrumbLinks.map((link, index) => (
      <BreadcrumbItem key={index} {...link} />
    ))

    render(<Breadcrumb>{children}</Breadcrumb>)

    const firstLink = screen.getByText("Home")
    expect(firstLink).not.toHaveAttribute("aria-current")
  })

  it("renders the expected navigation aria-label", async () => {
    const children = breadcrumbLinks.map((link, index) => (
      <BreadcrumbItem
        key={index}
        {...link}
        isCurrent={index === breadcrumbLinks.length - 1}
      />
    ))

    render(<Breadcrumb>{children}</Breadcrumb>)

    const nav = screen.getByRole("navigation")
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute("aria-label", "breadcrumbs")
  })

  it("renders the breadcrumb items as <li></li> elements", async () => {
    const children = breadcrumbLinks.map((link, index) => (
      <BreadcrumbItem key={index} {...link} />
    ))

    render(<Breadcrumb>{children}</Breadcrumb>)

    const li = screen.getAllByRole("listitem")

    expect(li).toHaveLength(breadcrumbLinks.length)
  })
})
