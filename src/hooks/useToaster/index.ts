import { useContext } from "react"
import { ToasterContext } from "../../context/ToasterContext"

export function useToaster() {
  const { addToast } = useContext(ToasterContext)

  return { addToast }
}
