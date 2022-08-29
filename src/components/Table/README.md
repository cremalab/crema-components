# `<Table />`

Provides a component for rendering a simple table that supports sorting.

## Usage Example

```tsx
import { Table } from "..."

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

<Table
  data={data}
  columns={[
    {
      id: "name",
      label: "Name",
      renderCell: ({ name }) => name,
      sortBy: ({ name }) => name,
    },
    {
      id: "age",
      label: "Age",
      renderCell: ({ age }) => age,
      sortBy: ({ age }) => age,
      renderHeader: ({ sort, column }) =>
        `${column.label} ${sort.isCurrent ? sort.dir === "asc"? "🔼" : "🔽" : ""}`
    },
  ]}
  renderHeader={({ sort, column }) =>
    `${column.label} ${sort.isCurrent ? sort.dir === "asc"? "👆" : "👇" : ""}`
  }
/>
```

## `TableProps<D>`

Properties for `<Table>` component

```typescript
interface TableProps<D extends WithID> {
  // Array of any data as long as `id` is present (i.e. `WithID`)
  data: D[]

  // Array of TableColumn (see below)
  columns: TableColumn<D>[]

  // Function that defines how all table headers are rendered (unless specified per-column)
  renderHeader?: TableRenderHeader<D>
}
```

## `TableColumn<D>`

Defines a column within the Table system

```typescript
interface TableColumn<D extends WithID> {
  // Unique id
  id: string

  // Label rendered in header
  label: string | null

  // Define how datum is rendered in column cell
  renderCell: (datum: D) => ReactNode

  // Function that defines how specific column header is rendered (overrides Table `renderHeader`)
  renderHeader?: TableRenderHeader<D>

  // Enables sorting by returned datum value
  sortBy?: (datum: D) => string | number | boolean
}
```

## `TableRenderHeader<D>`

An optional function used in both `TableProps` and `TableColumn` to define how header(s) are rendered

```typescript
interface Args {
  // Column sort information; used to render sort icons, etc.
  sort: { dir: TableSortDirection; isCurrent: boolean }

  // The current TableColumn
  column: TableColumn<D>

  // All data—potentially for getting data.length
  data: D[]
}

type TableRenderHeader<D extends WithID> = (args: Args) => ReactNode
```

## `TableSortDirection`

Represents the current sorting direction

```typescript
type TableSortDirection = "asc" | "dsc"
```

## Directory Structure

- `Table.stories.tsx`: Component stories (`npm run test:playground`)
- `Table.test.tsx`: Component tests (`npm run test:unit`)
- `Table.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
