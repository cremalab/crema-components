import { action } from "@storybook/addon-actions"
import decoratorCentered from "@storybook/addon-centered"
import { Story } from "@storybook/react"
import { ComponentProps } from "react"
import { NumberInput } from "./NumberInput"
import "./storyStyles.css"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/NumberInput",
  decorators: [decoratorCentered],
}

const Template: Story<ComponentProps<typeof NumberInput>> = (args) => (
  <NumberInput {...args} />
)

export const Default = Template.bind({})

Default.args = {
  acceleration: 100,
  decrementText: "-",
  incrementText: "+",
  min: 4,
  max: 100,
  onChange: action("onChange"),
  step: 0,
}

export const CustomButton = Template.bind({})

CustomButton.args = {
  min: 4,
  max: 100,
  incrementButton: (props) => <button {...props} className="customButton" />,
  decrementButton: (props) => <button {...props} className="customButton" />,
}

export const StyledContainer = Template.bind({})

StyledContainer.args = {
  min: 4,
  max: 100,
  containerClassName: "container",
}

export const StyledInput = Template.bind({})

StyledInput.args = {
  control: (props) => <input {...props} className="customInput" />,
}

export const StyledEverything = Template.bind({})

StyledEverything.args = {
  containerClassName: "container centerItems",
  control: (props) => <input {...props} className="customInput fullWidth" />,
  incrementButton: (props) => {
    return (
      <div {...props} className="flex customButton justifyCenter fullWidth">
        ☝️
      </div>
    )
  },
  decrementButton: (props) => {
    return (
      <div {...props} className="flex customButton justifyCenter fullWidth">
        <div style={{ transform: "rotate(180deg)" }}>☝️</div>
      </div>
    )
  },
}
