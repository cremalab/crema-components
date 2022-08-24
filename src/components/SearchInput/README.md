# `<SearchInput />`

A minimal search input offering a few helpful callbacks including a debounced callback. The simplest implementation would be to simply use the onDebounce callback and grab the value anytime its updated based on the debounceDelay (default of 300ms). If you wish to include a search button, simply supply a onSearchClick callback which will return the current value when the search button is clicked.

## Directory Structure

- `SearchInput.stories.tsx`: Component stories (`npm run test:playground`)
- `SearchInput.test.tsx`: Component tests (`npm run test:unit`)
- `SearchInput.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

# Example Usage

```tsx
function MyComponent() {
  return <SearchInput onSearch={(text) => doSomethingWithOnSearchText(text)} />
}
```

## API

The following props are unique to the `<SearchInput />`. It also implements all props belonging to the native `<input />` less `onChange` and `type`. Passing a value is not necessary but may be relevant when needing to pass in a value from url parameters or other scenarios where a value needs persistence.

| Prop               | Type      | Required | Description                                                     | Default |
| ------------------ | --------- | -------- | --------------------------------------------------------------- | ------- |
| `name`             | string    | no       |                                                                 |         |
| `placeholder`      | string    | no       |                                                                 |         |
| `showSearchButton` | boolean   | no       | whether to show the search button or not                        |         |
| `searchIcon`       | ReactNode | no       |                                                                 | 🔍      |
| `clearIcon`        | ReactNode | no       |                                                                 | ❎      |
| `debounceDelay`    | number    | no       | the debounce delay in ms                                        | 300     |
| `onSearch`         | function  | no       | A debounced callback that returns the current search term value |         |
| `initialValue`     | string    | no       | the initial value of the input                                  |         |
