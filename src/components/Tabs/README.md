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

| Prop         | Type   | Description                                             |
| ------------ | ------ | ------------------------------------------------------- |
| `currentTab` | number | sets initial active tab/content by index (default: `0`) |
| `onTab(Tab)` | func   | function called on tab click or ArrowLeft/ArrowRight    |

## Directory Structure

- `Tabs.stories.tsx`: Component stories (`npm run test:playground`)
- `Tabs.test.tsx`: Component tests (`npm run test:unit`)
- `Tabs.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
