import { action } from "@storybook/addon-actions"
import decoratorCentered from "@storybook/addon-centered"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Pagination } from "./Pagination"

export default {
  title: "Components/Pagination",
  decorators: [decoratorCentered],
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
)

export const Basic = Template.bind({})

Basic.args = {
  onPage: action("onPage"),
  currentPage: 2,
  totalPages: 6,
}

export const WithLargeSiblingCount = Template.bind({})

WithLargeSiblingCount.args = {
  onPage: action("onPage"),
  currentPage: 50,
  totalPages: 100,
  siblingCount: 5,
}

export const WithNoSiblings = Template.bind({})

WithNoSiblings.args = {
  onPage: action("onPage"),
  currentPage: 50,
  totalPages: 100,
  siblingCount: 0,
}

export const AtBeginning = Template.bind({})

AtBeginning.args = {
  onPage: action("onPage"),
  currentPage: 1,
  totalPages: 100,
}

export const AtEnd = Template.bind({})

AtEnd.args = {
  onPage: action("onPage"),
  currentPage: 100,
  totalPages: 100,
}

export const WithCustomPageItem = Template.bind({})

WithCustomPageItem.args = {
  onPage: action("onPage"),
  currentPage: 30,
  totalPages: 100,
  siblingCount: 1,
  renderPaginationControl: ({ pageNumber, label, disabled }) => (
    <a
      href={`https://www.example.com/articles?page=${pageNumber}`}
      style={{
        padding: "0 1em",
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.2 : 1,
      }}
    >
      {label || `Go to page ${pageNumber}`}
    </a>
  ),
}
