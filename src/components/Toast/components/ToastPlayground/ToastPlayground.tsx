import { Button } from "../../../Button"
import { useToaster } from "../../useToaster"

export function ToastPlayground() {
  const { addToast } = useToaster()

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
            action: {
              type: "dismiss",
              text: "Dismiss",
            },
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
            action: {
              type: "dismissAll",
              text: "Dismiss All",
            },
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
