import { useContext } from "react"
import { ToasterContext } from "../../context/ToasterContext"

export function useToaster() {
  const { addNotification } = useContext(ToasterContext)

  return { addNotification }
}
