import { ComponentStory } from "@storybook/react"
import { Status } from "../../types/Toast"
import { Button } from "../Button"
import { Toast } from "./Toast"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Toast",
  argTypes: {
    type: {
      control: "select",
      options: ["error", "info", "success", "warning"] as Status[],
    },
  },
}

const defaultMessage = "Grab a 🍞 and make some toast!"

const Template: ComponentStory<typeof Toast> = (args) => {
  return <Toast {...args} message={args.message || defaultMessage} />
}

export const WithAction = Template.bind({})

WithAction.args = {
  action: <Button ariaLabel="Dismiss toast">Dismiss</Button>,
}

export const WithDefaults = Template.bind({})

export const Warning = Template.bind({})

Warning.args = {
  status: "warning",
  message: "I am a warning toast.",
}

export const Error = Template.bind({})

Error.args = {
  status: "error",
  message: "I am an error toast.",
}

export const Info = Template.bind({})

Info.args = {
  status: "info",
  message: "I am an info toast.",
}

export const Success = Template.bind({})

Success.args = {
  status: "success",
  message: "I am a success toast.",
}
