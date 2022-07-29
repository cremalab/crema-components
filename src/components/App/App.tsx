import { useState } from "react"
import { ToastPlayground, ToasterProvider } from "../Toast"
import { Button } from "../Button"
import { Modal } from "../Modal"
import { Sidebar } from "../Sidebar"
import { Pagination } from "../Pagination"
import { TextInput } from "../TextInput"
import "./App.styles.css"

export function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

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
    <ToasterProvider>
      <div className="App">
        <Button ariaLabel="example button" name="example button">
          Button text
        </Button>
        <div>
          <Button
            ariaLabel="sidebar button"
            name="sidebar button"
            onClick={() => setSidebarExpanded(true)}
          >
            Open sidebar
          </Button>
        </div>
        <div>
          <Button ariaLabel="open" onClick={() => setIsModalOpen(true)}>
            Open modal
          </Button>
          <Modal
            aria-labelledby="modal"
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
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
        <Sidebar
          onClose={() => setSidebarExpanded(false)}
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
            onClick={() => setSidebarExpanded(false)}
          >
            Close
          </Button>
        </Sidebar>
        <ToastPlayground />
        <Pagination
          currentPage={10}
          totalPages={50}
          onPage={(_, page) => alert(`I want to go to page ${page}`)}
        />
      </div>
    </ToasterProvider>
  )
}
