# `<Avatar />`

A component for rendering a circular container used to display a user's initials or an image of a user.

## Directory Structure

- `Avatar.stories.tsx`: Component stories (`npm run test:playground`)
- `Avatar.test.tsx`: Component tests (`npm run test:unit`)
- `Avatar.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

## Example Usage

```tsx
<Avatar name="Crema Components" size="md" src="https://www.someurl.com/someimage.jpg">
```

## API

| Prop         | Type   | Required | Description         | Default |
| ------------ | ------ | -------- | ------------------- | ------- |
| `name`       | string | yes      | A user's name       |         |
| `size`       | string | no       | the avatar size     | "sm"    |
| `src`        | string | no       | the image source    |         |
| `background` | string | no       | override background |         |
| `fontColor`  | string | no       | override font color |         |
