import { useState } from "react"
import { Button } from "../Button"
import "./App.styles.css"
import { Modal } from "../Modal"

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
    <div className="App">
      <Button ariaLabel="example button" name="example button">
        Button text
      </Button>
      <>
        <Button ariaLabel="open" onClick={() => setIsOpen(true)}>
          Open modal
        </Button>
        <Modal
          aria-labelledby="modal"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal title"
          children={modalChildren}
        />
      </>
    </div>
  )
}
