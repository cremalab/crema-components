import { useState } from "react"
import { Button } from "../Button"
import { Modal } from "../Modal"
import { Pagination } from "../Pagination"
import { TextInput } from "../TextInput"
import "./App.styles.css"

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
      <div>
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
      </div>
      <TextInput
        name="test-input"
        label="Test Input"
        hideLabel={false}
        helperText="this is helper text"
      />
      <Pagination
        currentPage={10}
        totalPages={50}
        onPage={(_, page) => alert(`I want to go to page ${page}`)}
      />
    </div>
  )
}
