import { action } from "@storybook/addon-actions"
import { Table } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Table",
}

interface User {
  id: string
  name: string
  age: number
}

const data: User[] = [
  { id: "1", name: "Joe", age: 43 },
  { id: "4", name: "Andrea", age: 34 },
  { id: "3", name: "Rob", age: 37 },
  { id: "2", name: "Tim", age: 40 },
]

export const Default = () => (
  <Table
    data={data}
    columns={[
      {
        label: "Name",
        renderCell: ({ name }) => name,
        sortBy: ({ name }) => name,
      },
      {
        label: "Age",
        renderCell: ({ age }) => age,
        sortBy: ({ age }) => age,
      },
    ]}
  />
)

export const WithRenderValue = () => (
  <Table
    data={data}
    columns={[
      { label: "Name", renderCell: ({ name }) => name },
      {
        label: "Age",
        sortBy: ({ age }) => age,
        renderCell: ({ age }) => (
          <button onClick={() => action("Click")(age)}>{age}</button>
        ),
      },
    ]}
  />
)
