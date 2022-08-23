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
    { label: "Name", getValue: (user) => user.name, sortable: true },
    { label: "Age", getValue: (user) => user.age, sortable: true },
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
interface Column<Datum extends WithID> {
  // Used for column header text
  label: string | null

  // Returns the primitive value for column
  getValue: (datum: Datum) => string | number | boolean

  // Enables sorting for column
  sortable?: boolean
}
```

## Directory Structure

- `Table.stories.tsx`: Component stories (`npm run test:playground`)
- `Table.test.tsx`: Component tests (`npm run test:unit`)
- `Table.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
