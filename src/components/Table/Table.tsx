import { ReactNode, useState } from "react"
import styles from "./Table.module.css"

export interface WithID {
  id: string
}

export type TableSortDirection = "asc" | "dsc"

export type TableRenderHeader<D extends WithID> = (args: {
  column: TableColumn<D>
  data: D[]
  sort: {
    dir: TableSortDirection
    isCurrent: boolean
  }
}) => ReactNode

export interface TableColumn<D extends WithID> {
  id: string
  label: string | null
  cell: (datum: D) => ReactNode
  header?: TableRenderHeader<D>
  sortBy?: (datum: D) => string | number | boolean
}

export interface TableProps<D extends WithID> {
  data: D[]
  columns: TableColumn<D>[]
  header?: TableRenderHeader<D>
}

export function Table<D extends WithID>({
  data: dataUnsorted,
  columns,
  header = renderHeaderDefault<D>(),
}: TableProps<D>) {
  const [sortColumn, setSortColumn] = useState<TableColumn<D>>()
  const [sortDir, setSortDir] = useState<TableSortDirection>("dsc")

  const data = [...dataUnsorted].sort((a, b) => {
    if (!sortColumn?.sortBy) return 0
    const valueA = sortColumn.sortBy(a)
    const valueB = sortColumn.sortBy(b)
    if (valueA > valueB) return sortDir === "asc" ? 1 : -1
    if (valueA < valueB) return sortDir === "asc" ? -1 : 1
    return 0
  })

  const handleSort = (column: TableColumn<D>) => () => {
    if (!column.sortBy) return
    if (column === sortColumn || !sortColumn)
      setSortDir((dir) => (dir === "asc" ? "dsc" : "asc"))
    setSortColumn(column)
  }

  const headers = columns.map((column) => {
    const renderHeaderArgs = {
      sort: { dir: sortDir, isCurrent: sortColumn === column },
      data,
      column,
    }

    const headerContent =
      column.header?.(renderHeaderArgs) ?? header(renderHeaderArgs)

    return (
      <th
        scope="col"
        key={`th-${column.id}`}
        onClick={handleSort(column)}
        data-sortable={!!column.sortBy}
      >
        {headerContent}
      </th>
    )
  })

  const rows = data.map((datum) => (
    <tr key={`tr-${datum.id}`}>
      {columns.map((column) => (
        <td key={`tr-${datum.id}-td-${column.id}`}>{column.cell(datum)}</td>
      ))}
    </tr>
  ))

  return (
    <table className={styles.container}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function renderHeaderDefault<D extends WithID>(): TableRenderHeader<D> {
  return ({ sort, column }) =>
    `${column.label} ${sort.isCurrent ? (sort.dir === "asc" ? "↑" : "↓") : ""}`
}
