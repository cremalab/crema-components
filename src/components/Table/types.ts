import { ReactNode } from "react"

export interface WithID {
  id: string
}

export interface ColumnConfig<Datum extends WithID> {
  label: string | null
  getValue?: (datum: Datum) => ReactNode
  sortable?: boolean
}

export type ColumnConfigs<Datum extends WithID> = ColumnConfig<Datum>[]
