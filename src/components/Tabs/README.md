# `<Tabs />`

Composes children `<Tab />` components who's `label` and `children` props are used to
render a `TabList` (i.e "tabs") and corresponding `TabPanel`s. Selecting a `TabListItem`
with a mouse or left/right arrows calls `onTab(Tab)` with a tab object.

## Example Usage

```tsx
<Tabs currentTab={0} onTab={(tab) => setCurrentTab(tab.index)}>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
  <Tab label="Tab 3">Content 3</Tab>
</Tabs>
```

## API

| Prop            | Type   | Description                                 |
| --------------- | ------ | ------------------------------------------- |
| `currentTab`    | number | current tab index                           |
| `onTab(number)` | func   | next index by tab click or arrow left/right |

## Directory Structure

- `Tabs.stories.tsx`: Component stories (`npm run test:playground`)
- `Tabs.test.tsx`: Component tests (`npm run test:unit`)
- `Tabs.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
