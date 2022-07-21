import { useState } from "@storybook/addons"
import { ComponentStory } from "@storybook/react"
import { Button } from "../Button"
import { HorizontalPostion, Toast, ToastType, VerticalPosition } from "./Toast"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Toast",
  argTypes: {
    verticalPosition: {
      control: "select",
      options: ["bottom", "center", "top"] as VerticalPosition[],
    },
    horizontalPosition: {
      control: "select",
      options: ["left", "center", "right"] as HorizontalPostion[],
    },
    type: {
      control: "select",
      options: ["error", "info", "success", "warning"] as ToastType[],
    },
  },
}

const defaultMessage = "Grab a 🍞 and make some toast!"

const Template: ComponentStory<typeof Toast> = (args) => {
  const [showToast, setshowToast] = useState(false)
  const toggle = () => {
    console.log("TOGGLE was called")
    setshowToast(!showToast)
  }

  return (
    <div>
      <Button ariaLabel="Open" onClick={toggle}>
        Open toast
      </Button>
      <Toast
        {...args}
        showToast={showToast}
        handleClose={args.handleClose || toggle}
        message={args.message || defaultMessage}
        autoDismiss={args.autoDismiss}
      />
    </div>
  )
}

const ActionTemplate: ComponentStory<typeof Toast> = (args) => {
  const [showToast, setshowToast] = useState(false)
  const toggle = () => {
    setshowToast(!showToast)
  }

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setshowToast(true)}>
        Open Toast
      </Button>
      <Toast
        {...args}
        showToast={showToast}
        handleClose={toggle}
        message={defaultMessage}
        autoDismiss={false}
        action={
          <Button ariaLabel="Dismiss toast" onClick={toggle}>
            Dismiss
          </Button>
        }
      />
    </div>
  )
}

export const WithAction = ActionTemplate.bind({})

export const WithDefaults = Template.bind({})

export const WithCustomDuration = Template.bind({})

WithCustomDuration.args = {
  duration: 3000,
}

export const Warning = Template.bind({})

Warning.args = {
  type: "warning",
  message: "I am a warning toast.",
  autoDismiss: false,
  duration: 3000,
}

export const Error = Template.bind({})

Error.args = {
  type: "error",
  message: "I am an error toast.",
  autoDismiss: false,
  duration: 3000,
}

export const Info = Template.bind({})

Info.args = {
  type: "info",
  message: "I am an info toast.",
  autoDismiss: false,
  duration: 3000,
}

export const Success = Template.bind({})

Success.args = {
  type: "success",
  message: "I am a success toast.",
  autoDismiss: false,
  duration: 3000,
}
