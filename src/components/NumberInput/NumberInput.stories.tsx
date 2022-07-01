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
  control: (props) => <input {...props} />,
  min: 4,
  max: 100,
}

export const CustomButton = Template.bind({})

CustomButton.args = {
  control: (props) => <input {...props} />,
  min: 4,
  max: 100,
  customButton: (props) => <button {...props} className="customButton" />,
}

export const StyledContainer = Template.bind({})

StyledContainer.args = {
  control: (props) => <input {...props} />,
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
  customButton: (props, buttonType) => {
    if (buttonType === "increment") {
      return (
        <div {...props} className="flex customButton justifyCenter fullWidth">
          ☝️
        </div>
      )
    } else {
      return (
        <div {...props} className="flex customButton justifyCenter fullWidth">
          <div style={{ transform: "rotate(180deg)" }}>☝️</div>
        </div>
      )
    }
  },
  incrementText: "Add",
  decrementText: "Subtract",
}
