import { ReactNode, useState } from "react"
import styles from "./Table.module.css"

export interface WithID {
  id: string
}

export type TableSortDirection = "asc" | "dsc"

export type TableRenderHeader<D extends WithID> = (args: {
  sort: {
    dir: TableSortDirection
    isCurrent: boolean
  }
  column: TableColumn<D>
  data: D[]
}) => ReactNode

export interface TableColumn<D extends WithID> {
  id: string
  label: string | null
  renderCell: (datum: D) => ReactNode
  renderHeader?: TableRenderHeader<D>
  sortBy?: (datum: D) => string | number | boolean
}

export interface TableProps<D extends WithID> {
  data: D[]
  columns: TableColumn<D>[]
  renderHeader?: TableRenderHeader<D>
}

export function Table<D extends WithID>({
  data: dataUnsorted,
  columns,
  renderHeader = renderHeaderDefault<D>(),
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

    const header =
      column.renderHeader?.(renderHeaderArgs) ?? renderHeader(renderHeaderArgs)

    return (
      <th
        scope="col"
        key={`th-${column.id}`}
        onClick={handleSort(column)}
        data-sortable={!!column.sortBy}
      >
        {header}
      </th>
    )
  })

  const rows = data.map((datum) => (
    <tr key={`tr-${datum.id}`}>
      {columns.map((column) => (
        <td key={`tr-${datum.id}-td-${column.id}`}>
          {column.renderCell(datum)}
        </td>
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

function renderHeaderDefault<D extends WithID>(): TableRenderHeader<D> {
  return ({ sort, column }) =>
    `${column.label} ${sort.isCurrent ? (sort.dir === "asc" ? "↑" : "↓") : ""}`
}
