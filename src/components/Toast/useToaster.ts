import { useContext } from "react"
import { ToasterContext } from "./ToasterContext"

export function useToaster() {
  const context = useContext(ToasterContext)

  if (context === undefined) {
    throw new Error("useToaster must be used within a ToasterProvider!")
  }

  return { addToast: context.addToast, removeAll: context.removeAll }
}
