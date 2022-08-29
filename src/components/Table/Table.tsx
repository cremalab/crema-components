import { ReactNode, useState } from "react"
import styles from "./Table.module.css"

export interface WithID {
  id: string
}

type SortDirection = "asc" | "dsc"

type RenderHeader<D extends WithID> = (args: {
  sort: {
    dir: SortDirection
    isCurrent: boolean
  }
  column: Column<D>
  data: D[]
}) => ReactNode

export interface Column<D extends WithID> {
  header: string
  id: string
  renderCell: (datum: D) => ReactNode
  renderHeader?: RenderHeader<D>
  sortBy?: (datum: D) => string | number | boolean
}

interface Props<D extends WithID> {
  data: D[]
  columns: Column<D>[]
  renderHeader?: RenderHeader<D>
}

export function Table<D extends WithID>({
  data: dataUnsorted,
  columns,
  renderHeader = renderHeaderDefault<D>(),
}: Props<D>) {
  const [sortColumn, setSortColumn] = useState<Column<D>>()
  const [sortDir, setSortDir] = useState<SortDirection>("dsc")

  const data = [...dataUnsorted].sort((a, b) => {
    if (!sortColumn?.sortBy) return 0
    const valueA = sortColumn.sortBy(a)
    const valueB = sortColumn.sortBy(b)
    if (valueA > valueB) return sortDir === "asc" ? 1 : -1
    if (valueA < valueB) return sortDir === "asc" ? -1 : 1
    return 0
  })

  const handleSort = (column: Column<D>) => () => {
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

function renderHeaderDefault<D extends WithID>(): RenderHeader<D> {
  return ({ sort, column }) =>
    `${column.header} ${sort.isCurrent ? (sort.dir === "asc" ? "↑" : "↓") : ""}`
}
