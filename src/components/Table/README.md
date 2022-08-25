# `<Table />`

Provides a component for rendering a simple table that supports sorting.

## Usage Example

```tsx
interface User {
  id: string
  name: string
  age: number
}

const data: User[] = [
  { id: "1", name: "Joe", age: 12 },
  { id: "2", name: "Tim", age: 52 },
  { id: "3", name: "Rob", age: 29 },
  { id: "4", name: "Andrea", age: 29 },
]

<Table
  data={data}
  columns={[
    { label: "Name", renderCell: (user) => user.name, sortable: true },
    {
      label: "Age",
      renderCell: (age) => <strong>{age}</strong>,
      sortBy: (user) => user.age,
    },
  ]}
/>
```

## Props

| Prop      | Type               | Description                                              |
| --------- | ------------------ | -------------------------------------------------------- |
| `data`    | `WithID[]`         | Array of objects that must have, at least, an `id`       |
| `columns` | `Column<WithID>[]` | An array of objects that define each column of the table |

## ColumnConfig

```typescript
export interface Column<D extends WithID> {
  // Text for display in column header
  label: string | null

  // Returns customized JSX
  renderCell: (datum: D) => ReactNode

  // Returns which property to sort by
  sortBy?: (datum: D) => string | number | boolean
}
```

## Directory Structure

- `Table.stories.tsx`: Component stories (`npm run test:playground`)
- `Table.test.tsx`: Component tests (`npm run test:unit`)
- `Table.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
