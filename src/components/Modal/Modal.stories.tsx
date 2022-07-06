import decoratorCentered from "@storybook/addon-centered"
import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { Button } from "../Button"
import { Modal } from "./Modal"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Modal",
  component: Modal,
  decorators: [decoratorCentered],
} as ComponentMeta<typeof Modal>

const Template: Story<ComponentProps<typeof Modal>> = (args) => {
  return <Modal {...args} />
}

export const Default = Template.bind({})

Default.args = {
  className: "modal-class",
  open: true,
  title: "Modal title",
  role: "dialog",
  children: (
    <Button
      ariaLabel="Close Modal"
      aria-labelledby="close-modal"
      className="close-modal-button"
      onClick={() => undefined}
    >
      Close
    </Button>
  ),
  "aria-label": "Modal",
}
