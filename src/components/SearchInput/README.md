# `<SearchInput />`

A minimal search input offering a few helpful callbacks including a debounced callback. Can be used as a controlled or uncontrolled input. For full control, supply your own onChange and value props. The simplest implementation would be to simply use the onDebounce callback and grab the value anytime its updated based on the debounceDelay (default of 300ms). If you wish to include a search button, simply supply a onSearchClick callback which will return the current value when the search button is clicked.

## Directory Structure

- `SearchInput.stories.tsx`: Component stories (`npm run test:playground`)
- `SearchInput.test.tsx`: Component tests (`npm run test:unit`)
- `SearchInput.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

# Example Usage

```tsx
function MyComponent() {
  const [value, setValue] = useState("")

  return (
    <SearchInput onDebounce={(text) => doSomethingWithDebouncedText(text)} />
  )
}
```

## API

| Prop               | Type      | Required | Description                                                     | Default |
| ------------------ | --------- | -------- | --------------------------------------------------------------- | ------- |
| `name`             | string    | no       |                                                                 |         |
| `placeholder`      | string    | no       |                                                                 |         |
| `showSearchButton` | boolean   | no       | whether to show the search button or not                        |         |
| `searchIcon`       | ReactNode | no       |                                                                 | 🔍      |
| `clearIcon`        | ReactNode | no       |                                                                 | ❎      |
| `debounceDelay`    | number    | no       | the debounce delay in ms                                        | 300     |
| `onSearch`         | function  | no       | A debounced callback that returns the current search term value |         |
| `onBlur`           | function  | no       | A callback triggered when the input is blurred                  |         |
| `onFocus`          | function  | no       | A callback triggered when the input is focused                  |         |
| `value`            | string    | no       | The initial value to display                                    |         |
