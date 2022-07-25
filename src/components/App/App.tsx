import { useState } from "react"
import { ToasterConfig, ToasterProvider } from "../../context/ToasterContext"
import { Button } from "../Button"
import { Modal } from "../Modal"
import { TextInput } from "../TextInput"
import "./App.styles.css"
import { ToastPlayground } from "./ToastPlayground"

const toasterConfig = new ToasterConfig({
  duration: 3000,
  behavior: "stack",
  position: {
    vertical: "bottom",
    horizontal: "center",
  },
})

export function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const modalChildren = (
    <Button
      ariaLabel="Close Modal"
      aria-labelledby="close-modal"
      className="close-modal"
      onClick={() => setIsOpen(false)}
    >
      Close
    </Button>
  )
  return (
    <ToasterProvider config={toasterConfig}>
      <div className="App">
        <Button ariaLabel="example button" name="example button">
          Button text
        </Button>
        <div>
          <Button ariaLabel="open" onClick={() => setIsOpen(true)}>
            Open modal
          </Button>
          <Modal
            aria-labelledby="modal"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title="Modal title"
          >
            {modalChildren}
          </Modal>
        </div>
        <TextInput
          name="test-input"
          label="Test Input"
          hideLabel={false}
          helperText="this is helper text"
        />
        <ToastPlayground />
      </div>
    </ToasterProvider>
  )
}
