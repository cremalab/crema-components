import { render, screen } from "@testing-library/react"
import { Breadcrumb } from "./Breadcrumb"
import { BreadcrumbItem } from "./BreadcrumbItem"

describe("Breadcrumb", () => {
  it("renders children", async () => {
    const breadcrumbLinks = [
      {
        href: "#",
        label: "Home",
        isCurrent: false,
      },
      {
        href: "#",
        label: "About",
        isCurrent: true,
      },
    ]
    const children = <BreadcrumbItem links={breadcrumbLinks} />

    render(<Breadcrumb>{children}</Breadcrumb>)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()

    const lastLink = screen.getByText("About")
    expect(lastLink).toHaveAttribute("aria-current", "page")

    const nav = screen.getByRole("navigation")
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute("aria-label", "breadcrumbs")
  })
})
