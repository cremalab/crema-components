# `<Tabs />`

Composes children `<Tab />` components who's `label` and `children` props are used to render a `TabList` (i.e "tabs") and corresponding `TabPanel`s. Selecting a `TabListItem` with a mouse or left/right arrows calls `onTabChange(id)` with the next tab ID.

## Example Usage

```tsx
<Tabs currentTab="1" onTabChange={setCurrentTab}>
  <Tab id="1" label="Tab 1">
    Content 1
  </Tab>
  <Tab id="2" label="Tab 2">
    Content 2
  </Tab>
  <Tab id="3" label="Tab 3">
    Content 3
  </Tab>
</Tabs>
```

## <Tabs /> API

| Prop                         | Type   | Description                              |
| ---------------------------- | ------ | ---------------------------------------- |
| `currentTab`                 | string | current tab ID                           |
| `onTabChange(tabId: string)` | func   | next ID by tab click or arrow left/right |

## <Tab /> API

| Prop       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `children` | ReactNode | content to be displayed in TabPanel  |
| `disabled` | boolean   | makes tab non-interactable           |
| `id`       | string    | unique ID                            |
| `label`    | string    | label to be displayed in the TabList |

## Directory Structure

- `README.md`: Component documentation (hey, that's me!)
- `Tabs.test.tsx`: Component tests
- `Tabs.tsx`: Component code
- `index.ts`: Component export
- components
  - [Tab](./components/Tab/README.md)
  - [TabList](./components/TabList/README.md)
  - [TabPanel](./components/TabPanel/README.md)
