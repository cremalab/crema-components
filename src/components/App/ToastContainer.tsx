import { useToaster } from "../../hooks/useToaster"
import { Button } from "../Button"

export function ToastContainer() {
  const { addNotification } = useToaster()

  return (
    <>
      <Button
        ariaLabel="add notification"
        onClick={() =>
          addNotification({ message: "Hello World", type: "success" })
        }
      >
        Add Notifcation
      </Button>
      <Button
        ariaLabel="add notification"
        onClick={() =>
          addNotification({ message: "Hello Toast", type: "success" })
        }
      >
        Add Notifcation
      </Button>
      <Button
        ariaLabel="add notification"
        onClick={() =>
          addNotification({ message: "Goodbye Toast", type: "success" })
        }
      >
        Add Notifcation
      </Button>
    </>
  )
}
