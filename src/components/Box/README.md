# `<Box />`

A component for building out quick layouts. Provides a number of layout related props and various other props for quick styling. It renders as a `<div />`.

## Directory Structure

- `Box.stories.tsx`: Component stories (`npm run test:playground`)
- `Box.test.tsx`: Component tests (`npm run test:unit`)
- `Box.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

## Example Usage

```tsx
 <Box
  display="flex"
  bg="red"
  height={500}
  width={500}
  borderRadius={8}
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
>
  <p>{text}</p>
</Box>,
```

