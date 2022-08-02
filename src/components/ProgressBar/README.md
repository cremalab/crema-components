# `<ProgressBar />`

This component is intended to be used on processes that take longer than what a user would expect for a typical loading state. Examples include uploading, downloading, or even a page load that takes longer that what is typically expected. For traditional loading state use cases, it is recommended you use the [`<Loader />`](../Loader/README.md) component.
## Directory Structure

- `ProgressBar.stories.tsx`: Component stories (`npm run test:playground`)
- `ProgressBar.test.tsx`: Component tests (`npm run test:unit`)
- `ProgressBar.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

## Example Usage

It has two behaviors: `Determinate` and `Indeterminate`. 

`Determinate` should be used in cases where the total loading time can be calculated. Calculated values are then passed into the `value` prop via your own state. 

```tsx
const [value, setValue] = useState(0)

<ProgressBar value={value} />
```


If there isn't a way to calculate total loading time, use the default state of the component (sans the `value` prop).

```tsx
<ProgressBar />
```


## API

| Prop        | Type   | Required | Description            | Default   |
| ----------- | ------ | -------- | ---------------------- | --------- |
| `value`     | number | no       | A number between 0-100 |           |
| `ariaLabel` | string | no       | an aria-label          |           |
