import { action } from "@storybook/addon-actions"
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

export const Basic = Template.bind({})

Basic.args = {
  name: "search_input",
  onDebounce: action("onDebounce"),
}

export const WithPlaceholder = Template.bind({})

WithPlaceholder.args = {
  ...Basic.args,
  placeholder: "Search...",
}

export const WithCustomSearchIcon = Template.bind({})

WithCustomSearchIcon.args = {
  ...Basic.args,
  searchIcon: <span>🎃</span>,
}

export const WithCustomClearIcon = Template.bind({})

WithCustomClearIcon.args = {
  ...Basic.args,
  clearIcon: <span>✖️</span>,
}

export const WithSearchButton = Template.bind({})

WithSearchButton.args = {
  ...Basic.args,
  onSearchClick: action("onSearchClick"),
}
