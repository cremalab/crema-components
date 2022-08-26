import { ReactNode, useState } from "react"
import styles from "./Table.module.css"

export interface WithID {
  id: string
}

export interface Column<D extends WithID> {
  label: string | null
  renderCell: (datum: D) => ReactNode
  sortBy?: (datum: D) => string | number | boolean
}

interface Props<D extends WithID> {
  data: D[]
  columns: Column<D>[]
}

export function Table<D extends WithID>(props: Props<D>) {
  const { data: dataUnsorted, columns } = props
  const [sortColumn, setSortColumn] = useState<Column<D>>()
  const [sortAsc, setSortAsc] = useState<boolean>(false)

  const data = [...dataUnsorted].sort((a, b) => {
    if (!sortColumn?.sortBy) return 0
    const valueA = sortColumn.sortBy(a)
    const valueB = sortColumn.sortBy(b)
    if (valueA > valueB) return sortAsc ? 1 : -1
    if (valueA < valueB) return sortAsc ? -1 : 1
    return 0
  })

  const handleSort = (column: Column<D>) => () => {
    if (!column.sortBy) return
    if (column === sortColumn || !sortColumn) setSortAsc((value) => !value)
    setSortColumn(column)
  }

  const headers = columns.map((column, i) => {
    return (
      <th
        scope="col"
        key={`th-${column.label}-${i}`}
        onClick={handleSort(column)}
        data-sortable={!!column.sortBy}
      >
        {column.label}
        {column === sortColumn ? (sortAsc ? "↑" : "↓") : " "}
      </th>
    )
  })

  const rows = data.map((datum) => (
    <tr key={`tr-${datum.id}`}>
      {columns.map((column, i) => (
        <td key={`tr-${datum.id}-td-${i}`}>{column.renderCell(datum)}</td>
      ))}
    </tr>
  ))

  return (
    <table className={styles.table}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
