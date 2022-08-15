import { action } from "@storybook/addon-actions"
import { useState } from "@storybook/addons"
import { ComponentStory } from "@storybook/react"
import { SearchInput } from "./SearchInput"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/SearchInput",
}

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
)

export const WithPlaceholder = Template.bind({})

WithPlaceholder.args = {
  placeholder: "Search...",
}

export const WithCustomSearchIcon = Template.bind({})

WithCustomSearchIcon.args = {
  searchIcon: <span>🎃</span>,
}

export const WithCustomClearIcon = Template.bind({})

WithCustomClearIcon.args = {
  clearIcon: <span>✖️</span>,
}

export const WithSearchButton = Template.bind({})

WithSearchButton.args = {
  onSearchClick: action("onSearchClick"),
}

export const AsControlledInput = () => {
  const [value, setValue] = useState("")
  return (
    <SearchInput
      value={value}
      onDebounce={action("onDebounce")}
      onChange={(e) => {
        setValue(e.target.value)
        action("onChange")(e.target.value)
      }}
    />
  )
}
