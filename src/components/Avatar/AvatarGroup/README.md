# `<AvatarGroup />`

A wrapper for a group of `<Avatar />`'s. This component's default implementation assumes a minimal list to be passed in. If your use case requires hundreds if not thousands of user avatars, you may want to pass in your own hidden count element via `renderHiddenCount` for handling custom display logic. Please note that this component will throw an error if it receives any children that are not of type `<Avatar />`. Additionally, the size that is passed into the parent `<AvatarGroup />` will override any of its children.

## Directory Structure

- `AvatarList.stories.tsx`: Component stories (`npm run test:playground`)
- `AvatarList.test.tsx`: Component tests (`npm run test:unit`)
- `AvatarList.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

## Example Usage

```tsx
<AvatarGroup size="md">
  <Avatar name="Crema Components" />
  <Avatar name="Jane Doe" />
  <Avatar name="Foo Bar" />
</AvatarGroup>
```

## API

| Prop                | Type         | Required | Description                                        | Default |
| ------------------- | ------------ | -------- | -------------------------------------------------- | ------- |
| `max`               | number       | yes      | max number of avatar's to display                  |         |
| `size`              | string       | no       | the avatar size                                    | "sm"    |
| `renderHiddenCount` | func         | no       | a callback with hiddenCount value that returns JSX |         |
| `children`          | `<Avatar />` | yes      | one or many `<Avatar />`'s                         |         |
