# `<Tab />`

A component used to define a "tab" within `<Tabs />`. It essentially passes its children
and label through while providing type support. Its label and children are read to produce
corresponding MenuItem and Content components dynamically.

## Example Usage

```tsx
<Tabs>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
  <Tab label="Tab 3">Content 3</Tab>
</Tabs>
```

## Directory Structure

- `Tab.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
