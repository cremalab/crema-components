import { ComponentStory } from "@storybook/react"
import { FC } from "react"
import { Status } from "../../types/Toast"
import { Button } from "../Button"
import { ToasterConfig } from "./utils"
import { Config } from "./utils/ToasterConfig/ToasterConfig"
import { ToasterProvider } from "./ToasterContext"
import { Toast } from "./Toast"
import { ToastPlayground } from "./ToastPlayground"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Toast",
}

const defaultMessage = "Grab a 🍞 and make some toast!"

const Template: ComponentStory<typeof Toast> = (args) => {
  return <Toast {...args} message={args.message || defaultMessage} />
}

const ProviderTemplate: ComponentStory<FC<Config>> = (args) => {
  const toasterConfig = new ToasterConfig(args)
  return (
    <ToasterProvider config={toasterConfig}>
      <ToastPlayground />
    </ToasterProvider>
  )
}

export const ProviderExample = ProviderTemplate.bind({})

ProviderExample.args = {
  animationDuration: 300,
  behavior: "stack",
  duration: 3000,
  position: {
    vertical: "center",
    horizontal: "center",
  },
}

export const WithAction = Template.bind({})

WithAction.args = {
  action: <Button ariaLabel="Dismiss toast">Dismiss</Button>,
}

export const WithDefaults = Template.bind({})

WithDefaults.argTypes = {
  status: {
    control: "select",
    options: ["error", "info", "success", "warning"] as Status[],
  },
}

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
