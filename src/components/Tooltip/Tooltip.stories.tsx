import decoratedCenter from "@storybook/addon-centered"
import { ComponentStory } from "@storybook/react"
import { Tooltip } from "./Tooltip"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

const basePlacement = ["top", "bottom", "left", "right", "auto"]
const startPlacement = basePlacement.map((placement) => `${placement}-start`)
const endPlacement = basePlacement.map((placement) => `${placement}-end`)

export default {
  title: "Components/Tooltip",
  decorators: [decoratedCenter],
  argTypes: {
    placement: {
      control: {
        type: "select",
        options: [...basePlacement, ...startPlacement, ...endPlacement],
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
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          in ipsum id orci porta dapibus.
        </p>
      </div>
      <div>
        <p>Some text above.</p>
        <Tooltip {...args} />
        <p>Some text below.</p>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          in ipsum id orci porta dapibus.
        </p>
      </div>
    </div>
  )
}

WithAdditionalContent.args = {
  ...Default.args,
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
