import { render, screen } from "@testing-library/react"
import { Breadcrumb } from "./Breadcrumb"
import { BreadcrumbItem } from "./BreadcrumbItem"

describe("Breadcrumb", () => {
  it("renders children", async () => {
    const breadcrumbItems = [
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
    const children = <BreadcrumbItem items={breadcrumbItems} />
    render(<Breadcrumb>{children}</Breadcrumb>)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })
})