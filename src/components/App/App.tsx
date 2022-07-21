import { useState } from "react"
import { ToastProvider } from "../../context/ToastContext"
import { Button } from "../Button"
import { Modal } from "../Modal"
import { TextInput } from "../TextInput"
import { Toast } from "../Toast"
import "./App.styles.css"

export function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isToastOpen, setIsToastOpen] = useState(false)

  const toggleToast = () => {
    setIsToastOpen(!isToastOpen)
  }

  const modalChildren = (
    <Button
      ariaLabel="Close Modal"
      aria-labelledby="close-modal"
      className="close-modal"
      onClick={() => setIsModalOpen(false)}
    >
      Close
    </Button>
  )
  return (
    <ToastProvider>
      <div className="App">
        <Button ariaLabel="example button" name="example button">
          Button text
        </Button>
        <div>
          <Button ariaLabel="open" onClick={() => setIsModalOpen(true)}>
            Open modal
          </Button>
          <Modal
            aria-labelledby="modal"
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Modal title"
            children={modalChildren}
          />
        </div>
        <div>
          <Button ariaLabel="open" onClick={toggleToast}>
            Open toast
          </Button>
          <Toast
            showToast={isToastOpen}
            handleClose={toggleToast}
            type="success"
            message="Grab a 🍞 and make some toast!"
          />
          <Toast
            showToast={isToastOpen}
            handleClose={toggleToast}
            type="warning"
            message="Grab a 🍞 and make some toast!"
          />
        </div>
        <TextInput
          name="test-input"
          label="Test Input"
          hideLabel={false}
          helperText="this is helper text"
        />
      </div>
    </ToastProvider>
  )
}
