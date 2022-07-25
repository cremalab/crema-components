import { useContext } from "react"
import { ToasterContext } from "../../context/ToasterContext"

export function useToaster() {
  const { addToast, removeAll } = useContext(ToasterContext)

  return { addToast, removeAll }
}
