import { Box } from "./Box"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Box",
  parameters: {
    layout: "centered",
  },
}

export const Example = () => (
  <Box
    display="flex"
    bg="red"
    height={100}
    width={100}
    borderRadius={8}
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <p>Hello World</p>
  </Box>
)
