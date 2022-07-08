import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { Button } from "../Button"
import { TextInput } from "../TextInput"
import { Modal } from "./Modal"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>

export const Basic: Story<ComponentProps<typeof Modal>> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setIsOpen(true)}>
        Open basic modal
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} {...args}>
        <p>I am a basic modal 😃</p>
        <Button
          ariaLabel="Close Modal"
          aria-labelledby="close-modal"
          className="close-modal"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </Modal>
    </div>
  )
}

export const WithTitle: Story<ComponentProps<typeof Modal>> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setIsOpen(true)}>
        Open modal with title
      </Button>
      <Modal
        title="Modal With Title"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        {...args}
      >
        <p>I am a modal. I have a title! 😃</p>
        <Button
          ariaLabel="Close Modal"
          aria-labelledby="close-modal"
          className="close-modal"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </Modal>
    </div>
  )
}

export const WithMoreContent: Story<ComponentProps<typeof Modal>> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setIsOpen(true)}>
        Open modal with more content
      </Button>
      <Modal
        title="Modal With Title"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        {...args}
      >
        <div>
          <p>Modals can be cool</p>
          <p>I am a modal. I have a title! 😃</p>
          <TextInput name="test-input" label="Test Input" hideLabel={false} />
          <div style={{ marginTop: "1rem" }}>
            <Button
              ariaLabel="Close Modal"
              aria-labelledby="close-modal"
              className="close-modal"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
