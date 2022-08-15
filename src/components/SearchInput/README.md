# `<SearchInput />`

DESCRIPTION_HERE

## Directory Structure

- `SearchInput.stories.tsx`: Component stories (`npm run test:playground`)
- `SearchInput.test.tsx`: Component tests (`npm run test:unit`)
- `SearchInput.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

## API 

| Prop            | Type                    | Required | Description            | Default |
| --------------- | ----------------------- | -------- | ---------------------- | ------- |
| `searchIcon`     | ReactNode               | no       |                        |    🔍     |
| `clearIcon`       | ReactNode               | no       |           |    ❎     |
| `debounceDelay`       | number               | no       | the debounce delay in ms          |         |
| `onDebounce`    | string                  | no       | A debounced callback that returns the current search term value          |         |
| `onSearchClick` | string                  | no       | A callback that returns the current search term value          |         |
| `...rest`       | ComponentProps<"input"> |          |                        |         |