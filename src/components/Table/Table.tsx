import { useState } from "react"

export interface WithID {
  id: string
}

export interface ColumnConfig<Datum extends WithID> {
  label: string | null
  getValue: (datum: Datum) => string | number | boolean
  sortable?: boolean
}

interface Props<Datum extends WithID> {
  data: Datum[]
  columnConfigs: ColumnConfig<Datum>[]
}

export function Table<Datum extends WithID>(props: Props<Datum>) {
  const { data: dataUnsorted, columnConfigs } = props
  const [sortConfig, setSortConfig] = useState<ColumnConfig<Datum>>()
  const [sortAsc, setSortAsc] = useState<boolean>(false)

  const data = [...dataUnsorted].sort((a, b) => {
    const valueA = sortConfig?.getValue(a)
    const valueB = sortConfig?.getValue(b)
    if (valueA && valueB) {
      if (valueA > valueB) return sortAsc ? 1 : -1
      if (valueA < valueB) return sortAsc ? -1 : 1
    }
    return 0
  })

  const handleSort = (columnConfig: ColumnConfig<Datum>) => () => {
    if (columnConfig.sortable) {
      if (columnConfig === sortConfig || !sortConfig) {
        setSortAsc((value) => !value)
      }
      setSortConfig(columnConfig)
    }
  }

  const headers = columnConfigs.map((columnConfig, i) => {
    return (
      <th
        scope="col"
        key={`th-${columnConfig.label}-${i}`}
        onClick={handleSort(columnConfig)}
      >
        {columnConfig.label}
        {columnConfig === sortConfig ? (sortAsc ? "↑" : "↓") : " "}
      </th>
    )
  })

  const rows = data.map((datum) => (
    <tr key={`tr-${datum.id}`}>
      {columnConfigs.map((columnConfig, i) => (
        <td key={`tr-${datum.id}-td-${i}`}>{columnConfig.getValue(datum)}</td>
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
