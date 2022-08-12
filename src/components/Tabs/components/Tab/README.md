# `<Tab />`

A component used to define a "tab" within [Tabs](../../README.md). It provides type support while passing its props through to generate [TabList](../TabList/README.md) and [TabPanel](../TabPanel/README.md).

## Example Usage

```tsx
<Tabs>
  <Tab id="1" label="Tab 1">
    Content 1
  </Tab>
  <Tab id="2" label="Tab 2">
    Content 2
  </Tab>
  <Tab id="3" label="Tab 3" disabled>
    Content 3
  </Tab>
</Tabs>
```

## API

| Prop       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `children` | ReactNode | content to be displayed in TabPanel  |
| `disabled` | boolean   | makes tab non-interactable           |
| `id`       | string    | unique ID                            |
| `label`    | string    | label to be displayed in the TabList |

## Directory Structure

- `README.md`: Component documentation (hey, that's me!)
- `Tab.test.tsx`: Component tests
- `Tab.tsx`: Component code
- `index.ts`: Component export
