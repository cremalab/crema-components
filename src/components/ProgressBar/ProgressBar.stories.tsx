import { useEffect, useRef, useState } from "@storybook/addons"
import { ComponentStory } from "@storybook/react"
import { FC } from "react"
import { Button } from "../Button"
import { ProgressBar } from "./ProgressBar"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "ProgressBar",
}

const IndeterminateTemplate: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
)

export const Indeterminate = IndeterminateTemplate.bind({})

const DeterminateTemplate: ComponentStory<FC<{ interval: number }>> = (
  args,
) => {
  const timer = useRef<NodeJS.Timer | undefined>(undefined)
  const [percentage, setPercentage] = useState(0)

  const handleReset = () => {
    setPercentage(0)
    clearInterval(timer.current)
  }

  useEffect(() => {
    timer.current = setInterval(
      () =>
        setPercentage((percentage) => {
          if (percentage === 100) {
            return 0
          } else {
            return percentage + 1
          }
        }),
      args.interval,
    )
    return () => {
      clearInterval(timer.current)
    }
  }, [args.interval, percentage])

  return (
    <div>
      <Button
        style={{ marginBottom: 16 }}
        ariaLabel="reset progress"
        onClick={handleReset}
      >
        Reset
      </Button>
      <ProgressBar value={percentage} />
    </div>
  )
}

export const Determinate = DeterminateTemplate.bind({})

Determinate.args = {
  interval: 5,
}
