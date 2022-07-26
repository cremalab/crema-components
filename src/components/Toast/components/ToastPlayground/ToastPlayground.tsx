import { Button } from "../../../Button"
import { useToaster } from "../../useToaster"

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
        ariaLabel="add success Toast"
        onClick={() =>
          addToast({
            message: "Success Toast",
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
        ariaLabel="add info Toast"
        onClick={() =>
          addToast({
            message: "Info Toast",
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
        ariaLabel="add error Toast"
        onClick={() => addToast({ message: "Error Toast", status: "error" })}
      >
        Add Error Toast
      </Button>
      <Button
        ariaLabel="add warning Toast"
        onClick={() =>
          addToast({ message: "Warning Toast", status: "warning" })
        }
      >
        Add Warning Toast
      </Button>
    </div>
  )
}
