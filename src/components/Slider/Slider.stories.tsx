import decoratorCentered from "@storybook/addon-centered"
import { ComponentStory } from "@storybook/react"
import { useState } from "@storybook/addons"
import { action } from "@storybook/addon-actions"
import { Slider } from "./Slider"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Slider",
  decorators: [decoratorCentered],
}
export const Template: ComponentStory<typeof Slider> = (args) => {
  return <Slider {...args} />
}
export const Basic = Template.bind({})
Basic.args = {
  min: 0,
  max: 100,
  value: 50,
  onChange: action("onChange"),
}

export const SliderExample = () => {
  const [value, setValue] = useState(50)
  return (
    <div style={{ width: "300px" }}>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={(E) => setValue(parseInt(E.target.value))}
      />
    </div>
  )
}
