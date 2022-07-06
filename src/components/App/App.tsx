import { useState } from "react"
import { Button } from "../Button"
import { NumberInput } from "../NumberInput"
import { TextInput } from "../TextInput"
import "./App.styles.css"

export function App() {
  const [value, setValue] = useState<string>()
  return (
    <div className="App">
      <Button ariaLabel="example button" name="example button">
        Button text
      </Button>
      <TextInput
        name="test-input"
        label="Test Input"
        hideLabel={false}
        helperText="this is helper text"
      />
      <NumberInput value={value} onChange={setValue} />
    </div>
  )
}
