import decoratedCenter from "@storybook/addon-centered"
import { ComponentStory } from "@storybook/react"
import { placements } from "./placements"
import { Tooltip } from "./Tooltip"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Tooltip",
  decorators: [decoratedCenter],
  argTypes: {
    placement: {
      control: {
        type: "select",
        options: placements,
      },
    },
  },
}

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return <Tooltip {...args} />
}

export const Default = Template.bind({})

Default.args = {
  children: "Hello",
  label: "World",
  horizontalOffset: 10,
  verticalOffset: 0,
  placement: "bottom",
  showArrow: false,
  enterDelay: 0,
  exitDelay: 0,
  hideOnClick: false,
  alwaysShow: false,
}

export const WithArrow = Template.bind({})

WithArrow.args = {
  ...Default.args,
  alwaysShow: true,
  showArrow: true,
}

export const WithoutArrow = Template.bind({})

WithoutArrow.args = {
  ...Default.args,
  alwaysShow: true,
}

export const WithAdditionalContent: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <div
      style={{
        lineHeight: "24px",
        width: 400,
      }}
    >
      <p>
        This is a tooltip that lives within a <Tooltip {...args} />. Tooltips
        can be very handy for communicating additional information within a body
        of text :).
      </p>
    </div>
  )
}

WithAdditionalContent.args = {
  ...Default.args,
  children: <b>paragraph</b>,
  label:
    "a distinct section of a piece of writing, usually dealing with a single theme and indicated by a new line, indentation, or numbering.",
  showArrow: true,
  placement: "bottom",
  alwaysShow: false,
}

export const PlacementTop = Template.bind({})

PlacementTop.args = {
  ...Default.args,
  placement: "top",
  alwaysShow: true,
  showArrow: true,
}
export const PlacementRight = Template.bind({})

PlacementRight.args = {
  ...Default.args,
  placement: "right",
  alwaysShow: true,
  showArrow: true,
}

export const PlacementBottom = Template.bind({})

PlacementBottom.args = {
  ...Default.args,
  placement: "bottom",
  alwaysShow: true,
  showArrow: true,
}

export const PlacementLeft = Template.bind({})

PlacementLeft.args = {
  ...Default.args,
  placement: "left",
  alwaysShow: true,
  showArrow: true,
}
