# `<Toast />`

All Toast related dependencies are contained within this folder, with the exception of 3rd party libraries and a shared hook `useKeyPress`.

## Directory Structure

- `utils`: Toast utils
  - `getToastTransitionStyles`
    - a util for generating styles based on Toast behaviors and transition states
  - `getToastPositionStyles`
    - a util for generating styles based on Toast x and y axis positioning
  - `ToasterConfig`
    - a class for generating a conig object for the Toast Provider
- `Toast.stories.tsx`: Component stories (`npm run test:playground`)
- `Toast.test.tsx`: Component tests (`npm run test:unit`)
- `Toast.tsx`: Component code
- `ToasterContext.tsx`: A Context and System for handling toasts. It enables the developer to wrap their project with the provider and use the given useToaster hook to manage a notification system for communicating important events to a user.
- `ToastPlayground.tsx`: used internally by `Toast.stories.tsx` as a playground for testing the notication system.
- `useToaster`: exposes the actions `addToast` and `removeAll` allowing the developer to interact with the ToastContext.
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)

## Example Usage

While the component is intended to be used within the given Toaster system, it can act outside of the ToasterContext though its not advised as you'll essentially have to create your own system for managing toasts.

```tsx
<Toast
  id={1}
  message="I am a toast!"
  status="success"
  action={{ type: "dismiss", text: "Dismiss" }}
  onDismiss={(type, id) => doSomething(type, id)}
/>
```

## API

| Prop        | Type   | Required | Description         | Default   |
| ----------- | ------ | -------- | ------------------- | --------- |
| `id`        | number | yes      | the toast id        |           |
| `status`    | string | no       | type of status      | "success" |
| `message`   | string | yes      | the toast message   |           |
| `action`    | object | no       | the type of action  |           |
| `onDismiss` | func   | no       | the action callback |           |

# ToasterContext

## Example Usage

Default config

```tsx
{
  duration: 5000,
  animationDuration: 300,
  behavior: "stack",
  position: {
    vertical: "bottom",
    horizontal: "center",
  }
}
```

Wrap your application with the `<ToasterProvider />`

```tsx
const customConfig = {
  duration: 3000,
  behavior: "replace",
}

<ToasterProvider config={customConfig}>
  <App />
</ToasterProvider>
```

Anywhere you wish to trigger a toast, use the `useToaster` hook to add a Toast

```tsx
export function SomeComponent() {
  const { addToast } = useToaster()

  return (
    <div>
      <button
        onClick={() =>
          addToast({
            message: "Info Toast",
            status: "info",
            action: {
              type: "dismissAll",
              text: "Dismiss All",
            },
          })
        }
      >
        Add Toast
      </button>
    </div>
  )
}
```

You can also programatically `removeAll` toasts if you wish.

```tsx
const { removeAll } = useToaster()

return <button onClick={() => removeAll()}>Remove All</button>
```

## API

| Prop       | Type      | Required | Description         | Default                    |
| ---------- | --------- | -------- | ------------------- | -------------------------- |
| `children` | ReactNode | yes      |                     |                            |
| `config`   | object    | no       | toast configuration | (see default config above) |
