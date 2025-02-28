# Example of Using the Header in a Plain Javascript Vite App
This simple javascript app, created with Vite, installs and uses the Header dependency.

## Documentation

- [![Header Options](https://img.shields.io/badge/Utah_Header_Options_Documentation-blue)](https://designsystem/library/Header)
- [![Getting Started](https://img.shields.io/badge/Getting%20Started-blue)](https://designsystem/resources/gettingStarted)
- [![Design System Website](https://img.shields.io/badge/Design%20System%20Website-blue)](https://designsystem)

## What to Look For
You can see the header being imported in the `main.js` file:

```javascript
// import the css to style the header
import 'design-system-header/css';
// import the ability to set the header's configuration
import { setHeaderSettings } from 'design-system-header';

// Set the header's configuration
setHeaderSettings({});

```


## Try-out This Example

```bash
cd examples/header/vite
npm i
npm run dev
```

## How This App Was Created
```bash
npm init vite@latest
npm i design-system-header
# Manual Step: Import the header and set its settings in `main.js`
npm run dev
```
