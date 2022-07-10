import { useState } from "react"
import { Button } from "../Button"
import { Sidebar } from "../Sidebar"
import { TextInput } from "../TextInput"
import "./App.styles.css"

export function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const onClick = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  return (
    <div className="App">
      <Button ariaLabel="example button" name="example button">
        Button text
      </Button>
      <Button
        ariaLabel="example button"
        name="example button"
        onClick={onClick}
      >
        open sidebar
      </Button>
      <TextInput
        name="test-input"
        label="Test Input"
        hideLabel={false}
        helperText="this is helper text"
      />
      <Sidebar
        onClose={() => setSidebarExpanded(false)}
        isOpen={sidebarExpanded}
        title={<h2>Sidebar Title</h2>}
        hideOverlay={true}
        position="left"
      >
        <div>
          <h1>Sidebar</h1>
          <p>This is a sidebar</p>
        </div>
      </Sidebar>
    </div>
  )
}
