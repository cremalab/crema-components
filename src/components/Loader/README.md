# `<Loader />`

This component is intended to be used a general purpose loading indicator throughout the application. The main custom aspect is that the Loader has a `timeout` in which it will wait that amount of time (in milliseconds) before actually rendering the Loader, before that it renders `null`. This is intended to reduce the amount of "jank" caused by a loading indicator showing up for less than 200 milliseconds before whatever it was waiting on loads in.

By default the Loader uses a custom "spinner" to indicate loading status, but that can be swapped out using `children`.

## Directory Structure

- `Loader.stories.tsx`: Component stories (`npm run test:playground`)
- `Loader.test.tsx`: Component tests (`npm run test:unit`)
- `Loader.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
