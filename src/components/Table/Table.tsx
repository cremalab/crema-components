import { useState } from "react"

export interface WithID {
  id: string
}

export interface Column<Datum extends WithID> {
  getValue: (datum: Datum) => string | number | boolean
  label: string | null
  sortable?: boolean
}

interface Props<Datum extends WithID> {
  data: Datum[]
  columns: Column<Datum>[]
}

export function Table<Datum extends WithID>(props: Props<Datum>) {
  const { data: dataUnsorted, columns } = props
  const [sortColumn, setSortColumn] = useState<Column<Datum>>()
  const [sortAsc, setSortAsc] = useState<boolean>(false)

  const data = [...dataUnsorted].sort((a, b) => {
    const valueA = sortColumn?.getValue(a)
    const valueB = sortColumn?.getValue(b)
    if (valueA === undefined || valueB === undefined) return 0
    if (valueA > valueB) return sortAsc ? 1 : -1
    if (valueA < valueB) return sortAsc ? -1 : 1
    return 0
  })

  const handleSort = (column: Column<Datum>) => () => {
    if (!column.sortable) return
    if (column === sortColumn || !sortColumn) setSortAsc((value) => !value)
    setSortColumn(column)
  }

  const headers = columns.map((column, i) => {
    return (
      <th
        scope="col"
        key={`th-${column.label}-${i}`}
        onClick={handleSort(column)}
      >
        {column.label}
        {column === sortColumn ? (sortAsc ? "↑" : "↓") : " "}
      </th>
    )
  })

  const rows = data.map((datum) => (
    <tr key={`tr-${datum.id}`}>
      {columns.map((column, i) => (
        <td key={`tr-${datum.id}-td-${i}`}>{column.getValue(datum)}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
