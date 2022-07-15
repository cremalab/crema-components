import { useState } from "react"
import { Button } from "../Button"
import { Modal } from "../Modal"
import { Sidebar } from "../Sidebar"
import { TextInput } from "../TextInput"
import "./App.styles.css"

export function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

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
        <Button
          ariaLabel="sidebar button"
          name="sidebar button"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          Open sidebar
        </Button>
      </div>
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
      <Sidebar
        onClose={() => setSidebarExpanded(!sidebarExpanded)}
        open={sidebarExpanded}
        title="Sidebar Title"
        hideOverlay={false}
        position="left"
      >
        <p>This is a sidebar</p>
        <Button
          ariaLabel="Close sidebar"
          aria-labelledby="close-sidebar"
          className="close-sidebar"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          Close
        </Button>
      </Sidebar>
    </div>
  )
}
