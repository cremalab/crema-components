# `<TabList />`

Provides structure and mapping from `tabs` to `TabListItem`s. `TabList` is a fairly simple wrapper component that handles mapping `tabs` to a `TabListItem`. `TabListItem` is defined along with `TabList` for simplicity.

## API

| Prop                              | Type   | Description                                           |
| --------------------------------- | ------ | ----------------------------------------------------- |
| `onClick(tabId: Tab["id"])`       | func   | function applied to `Tab["id"]` when clicked          |
| `onKeyDown(event: KeyboardEvent)` | func   | function applied to `Keyboard` event when key pressed |
| `tabs`                            | array  | an array of `Tab`                                     |
| `refs`                            | object | refs object used to track array of tab DOM nodes      |

## Styling

- `.container`: the outermost element housing the "tablist"; uses inline-flex
- `.item`: represents a singular "tab"
- `.item + .item`: styling applied to adjacent items
- `.item.selected`: styling applied when tab is selected
- `.items.disabled`: styling applied when tab is disabled

## Directory Structure

- `TabList.tsx`: Component code for `TabList` and `TabListItem`
- `TabList.module.css`: Component styling
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
