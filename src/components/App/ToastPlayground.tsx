import { useToaster } from "../../hooks/useToaster"
import { Button } from "../Button"

export function ToastPlayground() {
  const { addToast, removeAll } = useToaster()

  return (
    <div
      style={{
        display: "flex",
        gap: "0 8px",
        justifyContent: "center",
        marginTop: 16,
      }}
    >
      <Button
        ariaLabel="add Toast"
        onClick={() =>
          addToast({
            message: "Hello World",
            status: "success",
            action: (handleClose) => (
              <Button ariaLabel="close toast" onClick={handleClose}>
                Dismiss
              </Button>
            ),
          })
        }
      >
        Add Success Toast
      </Button>
      <Button
        ariaLabel="add Toast"
        onClick={() =>
          addToast({
            message: "Hello World",
            status: "info",
            action: () => (
              <Button ariaLabel="close toast" onClick={removeAll}>
                Dismiss All
              </Button>
            ),
          })
        }
      >
        Add Info Toast
      </Button>
      <Button
        ariaLabel="add Toast"
        onClick={() => addToast({ message: "Hello Toast", status: "error" })}
      >
        Add Error Toast
      </Button>
      <Button
        ariaLabel="add Toast"
        onClick={() =>
          addToast({ message: "Goodbye Toast", status: "warning" })
        }
      >
        Add Warning Toast
      </Button>
    </div>
  )
}
