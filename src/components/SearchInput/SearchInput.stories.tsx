import decoratorCentered from "@storybook/addon-centered"
import { SearchInput } from "./SearchInput"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "SearchInput",
  decorators: [decoratorCentered],
}

export const Example = () => <SearchInput />
