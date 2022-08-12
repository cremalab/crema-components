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

export const WithCustomStartIcon = Template.bind({})

WithCustomStartIcon.args = {
  ...Basic.args,
  startIcon: <span>🎃</span>,
}

export const WithCustomEndIcon = Template.bind({})

WithCustomEndIcon.args = {
  ...Basic.args,
  endIcon: <span>✖️</span>,
}
