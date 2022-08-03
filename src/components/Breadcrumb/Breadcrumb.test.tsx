import { render, screen } from "@testing-library/react"
import { Breadcrumb } from "./Breadcrumb"

describe("Breadcrumb", () => {
  it("renders", async () => {
    const children = <div>children</div>
    render(<Breadcrumb>{children}</Breadcrumb>)
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})