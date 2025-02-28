# Example of using Types with the Header
The Header is fully typed. This small example typescript application imports the Header library from NPM and uses its type system to validate its usage of the Header. You can see this in action in the `src/App.tsx` file.

## Documentation

- [![Header Options](https://img.shields.io/badge/Utah_Header_Options_Documentation-blue)](https://designsystem/library/Header)
- [![Getting Started](https://img.shields.io/badge/Getting%20Started-blue)](https://designsystem/resources/gettingStarted)
- [![Design System Website](https://img.shields.io/badge/Design%20System%20Website-blue)](https://designsystem)

## What to Look For
The only file that is changed from vite's default files is  `src/App.tsx`. In this file you can observe the following:

```typescript
// this line imports the header including its types
import { setHeaderSettings } from 'design-system-header';
```

```typescript
/*
  You can play with this code to see that the setHeaderSettings() function
  call is typed: You can trigger auto complete in the settings object parameter as
  well as hover to see type information.
*/
useEffect(
  () => {
    // setHeaderSettings() is typed! YAY!
    setHeaderSettings({
      title: 'Typed Header!'
    });
  },
  []
);

```


## Try-out This Example

```bash
cd examples/typed/typed-header
npm i
npm run dev
```

## Test type safety
```bash
cd examples/typed/typed-header
npm i
npm run tsc
```

## How This App Was Created
```bash
npm create vite@latest
npm i design-system-header
# Manual Step: Update src/App.tsx to import typed Header
npm run dev
```
