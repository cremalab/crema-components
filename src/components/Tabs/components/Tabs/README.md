# `<Tabs />`

Composes children `<Tab />` components who's `label` and `children` props are used to
render a `MenuList` (i.e "tabs") and corresponding `Content`. Selecting a `MenuItem`
updates the state and sets that item's content to "active".

## Example Usage

```tsx
<Tabs>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
  <Tab label="Tab 3">Content 3</Tab>
</Tabs>
```

## API

| Prop           | Type   | Description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| `initialTab`   | number | sets initial active tab/content by index (default: `0`) |
| `onTab(index)` | func   | function called on tab click                            |

## Directory Structure

- `Tabs.stories.tsx`: Component stories (`npm run test:playground`)
- `Tabs.test.tsx`: Component tests (`npm run test:unit`)
- `Tabs.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
