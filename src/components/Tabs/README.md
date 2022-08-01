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

| Prop                  | Type   | Description                                 |
| --------------------- | ------ | ------------------------------------------- |
| `currentTab`          | string | current tab ID                              |
| `onTabChange(number)` | func   | next index by tab click or arrow left/right |

## <Tab /> API

| Prop       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `id`       | string    | unique ID                            |
| `label`    | string    | label to be displayed in the TabList |
| `children` | ReactNode | content to be displayed in TabPanel  |

## Directory Structure

```
Tabs
├── components 👈 sub-components
│   ├── Tab
│   ├── TabList
│   └── TabPanel
├── README.md 👈 you are here
├── Tabs.stories.tsx 👈 stories (`npm run test:playground`)
├── Tabs.test.tsx 👈 tests (`npm run test:unit`)
├── Tabs.tsx 👈 implementation
├── index.ts 👈 export
└── types.ts 👈 shared component types
```
