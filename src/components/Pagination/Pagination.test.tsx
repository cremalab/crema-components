import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Pagination } from "./Pagination"

describe("Pagination", () => {
  it("renders a button for each surrounding page", async () => {
    const pageFn = jest.fn()

    const { getAllByRole } = render(
      <Pagination currentPage={3} totalPages={6} onPage={pageFn} />,
    )
    const buttons = getAllByRole("button")

    expect(buttons.map((x) => x.textContent)).toEqual([
      "Previous",
      "1",
      "2",
      "4",
      "5",
      "6",
      "Next",
    ])
  })
  it("uses siblingCount to limit number of individual page buttons to display", async () => {
    const pageFn = jest.fn()

    const { getAllByRole } = render(
      <Pagination
        currentPage={3}
        totalPages={100}
        onPage={pageFn}
        siblingCount={2}
      />,
    )
    const buttons = getAllByRole("button")

    expect(buttons.map((x) => x.textContent)).toEqual([
      "Previous",
      "1",
      "2",
      "4",
      "5",
      "100",
      "Next",
    ])
  })
  it("renders siblings to the right if currentPage is below siblingCount", async () => {
    const pageFn = jest.fn()

    const { getAllByRole } = render(
      <Pagination
        currentPage={1}
        totalPages={100}
        onPage={pageFn}
        siblingCount={2}
      />,
    )
    const buttons = getAllByRole("button")

    expect(buttons.map((x) => x.textContent)).toEqual([
      "Previous",
      "2",
      "3",
      "100",
      "Next",
    ])
  })
  it("renders siblings to the left if currentPage is close to totalPages", async () => {
    const pageFn = jest.fn()

    const { getAllByRole } = render(
      <Pagination
        currentPage={98}
        totalPages={100}
        onPage={pageFn}
        siblingCount={2}
      />,
    )
    const buttons = getAllByRole("button")

    expect(buttons.map((x) => x.textContent)).toEqual([
      "Previous",
      "1",
      "96",
      "97",
      "99",
      "100",
      "Next",
    ])
  })
  it("renders an ellipsis for previous range if siblings don't account for all", async () => {
    const pageFn = jest.fn()

    const { getByText } = render(
      <Pagination
        currentPage={98}
        totalPages={100}
        onPage={pageFn}
        siblingCount={2}
      />,
    )
    const ellipsis = getByText("...")

    expect(ellipsis).toBeDefined()
  })
  it("renders an ellipsis for next range if siblings don't account for all", async () => {
    const pageFn = jest.fn()

    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={100}
        onPage={pageFn}
        siblingCount={2}
      />,
    )
    const ellipsis = getByText("...")

    expect(ellipsis).toBeDefined()
  })
  it("renders a component for each page with renderPageItem if defined", async () => {
    const pageFn = jest.fn()

    const { getByTitle } = render(
      <Pagination
        currentPage={3}
        totalPages={6}
        onPage={pageFn}
        renderPageItem={({ pageNumber, label }) => (
          <a
            key={pageNumber}
            title={label || `Go to page ${pageNumber}`}
            href={`https://website.com/articles?page=${pageNumber}`}
          >
            {label || pageNumber}
          </a>
        )}
      />,
    )
    const match = getByTitle("Go to page 4")

    expect(match.tagName).toEqual("A")
  })
  it("calls onPage with event and next page number when clicking the Next button", async () => {
    const user = userEvent.setup()
    const pageFn = jest.fn()

    const { getByText } = render(
      <Pagination currentPage={2} totalPages={3} onPage={pageFn} />,
    )
    const button = getByText("Next")
    await user.click(button)

    expect(pageFn).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onClick" }),
      3,
    )
  })
  it("calls onPage with event and previous page number when clicking the Previous button", async () => {
    const user = userEvent.setup()
    const pageFn = jest.fn()

    const { getByText } = render(
      <Pagination currentPage={2} totalPages={3} onPage={pageFn} />,
    )
    const button = getByText("Previous")
    await user.click(button)

    expect(pageFn).toHaveBeenCalledWith(
      expect.objectContaining({ _reactName: "onClick" }),
      1,
    )
  })
})
