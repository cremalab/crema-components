import { useToaster } from "../../hooks/useToaster"
import { Button } from "../Button"

export function ToastContainer() {
  const { addToast } = useToaster()

  return (
    <>
      <Button
        ariaLabel="add Toast"
        onClick={() => addToast({ message: "Hello World", type: "success" })}
      >
        Add Notifcation
      </Button>
      <Button
        ariaLabel="add Toast"
        onClick={() => addToast({ message: "Hello Toast", type: "success" })}
      >
        Add Notifcation
      </Button>
      <Button
        ariaLabel="add Toast"
        onClick={() => addToast({ message: "Goodbye Toast", type: "success" })}
      >
        Add Notifcation
      </Button>
    </>
  )
}
