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
