import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ColumnConfigs, Table } from "."

interface User {
  id: string
  a: string
  b: string
  c: string
  d: { e: string }
}

const data: User[] = [
  { id: "1", a: "1A", b: "1B", c: "1C", d: { e: "1D" } },
  { id: "3", a: "3A", b: "3B", c: "3C", d: { e: "3D" } },
  { id: "2", a: "2A", b: "2B", c: "2C", d: { e: "2D" } },
]

const columnConfigs: ColumnConfigs<User> = [
  { label: null },
  { label: "LA", getValue: (user) => user.a, sortable: true },
  { label: "LB", getValue: (user) => user.b },
  { label: "LC", getValue: (user) => user.c, sortable: true },
  { label: "LD", getValue: (user) => user.d.e },
]

describe("Table", () => {
  it("is defined", expect(Table).toBeDefined)

  it("renders labels", () => {
    render(<Table data={data} columnConfigs={columnConfigs} />)
    const matcher = /LA|LB|LC|LD/
    const headers = screen.getAllByText(matcher, { selector: "thead tr th" })
    expect(headers).toHaveLength(4)
  })

  it("renders rows", () => {
    render(<Table data={data} columnConfigs={columnConfigs} />)
    const matcher = /1A|2A|3A/
    const rows = screen.getAllByText(matcher, { selector: "tbody tr td" })
    expect(rows).toHaveLength(3)
  })

  it("renders row columns", () => {
    render(<Table data={data} columnConfigs={columnConfigs} />)
    const matcher = /1A|1B|1C|1D/
    const columns = screen.getAllByText(matcher, { selector: "tbody tr td" })
    expect(columns).toHaveLength(4)
  })

  describe("sorting", () => {
    it("does not sort if column is not marked sortable", async () => {
      render(<Table data={data} columnConfigs={columnConfigs} />)
      const header = screen.getByText("LB")
      await userEvent.click(header)
      const rows = screen.getAllByText(/1A|2A|3A/).map((e) => e.innerHTML)
      expect(rows).toEqual(["1A", "3A", "2A"])
    })

    it("sorts equal values as expected", async () => {
      const data: User[] = [
        { id: "1", a: "1A", b: "1B", c: "1C", d: { e: "1D" } },
        { id: "3", a: "1A", b: "3B", c: "3C", d: { e: "3D" } },
        { id: "2", a: "1A", b: "2B", c: "2C", d: { e: "2D" } },
      ]
      render(<Table data={data} columnConfigs={columnConfigs} />)
      const header = screen.getByText("LA")
      await userEvent.click(header)
      const rows = screen.getAllByText(/1A|2A|3A/).map((e) => e.innerHTML)
      expect(rows).toEqual(["1A", "1A", "1A"])
    })

    it("sorts in ascending order on first click", async () => {
      render(<Table data={data} columnConfigs={columnConfigs} />)
      const header = screen.getByText("LA")
      await userEvent.click(header)
      const rows = screen.getAllByText(/1A|2A|3A/).map((e) => e.innerHTML)
      expect(rows).toEqual(["1A", "2A", "3A"])
    })

    it("sorts in descending order on second click", async () => {
      render(<Table data={data} columnConfigs={columnConfigs} />)
      const header = screen.getByText("LA")
      await userEvent.click(header)
      await userEvent.click(header)
      const rows = screen.getAllByText(/1A|2A|3A/).map((e) => e.innerHTML)
      expect(rows).toEqual(["3A", "2A", "1A"])
    })

    it("maintains sort order when switching sort columns", async () => {
      render(<Table data={data} columnConfigs={columnConfigs} />)
      const header1 = screen.getByText("LA")
      const header2 = screen.getByText("LC")
      await userEvent.click(header1)
      await userEvent.click(header2)
      const rows = screen.getAllByText(/1A|2A|3A/).map((e) => e.innerHTML)
      expect(rows).toEqual(["1A", "2A", "3A"])
    })
  })
})
