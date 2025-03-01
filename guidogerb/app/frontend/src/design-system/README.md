# Design System Library

[![See it on NPM!](https://img.shields.io/npm/v/design-system.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/design-system)
[![GitHub](https://img.shields.io/badge/GitHub_Design_System-ad360d?style=for-the-badge)](https://github.com/guidogerb/design-system)
[![License](https://img.shields.io/npm/l/design-system.svg?color=blue&style=for-the-badge)](https://github.com/guidogerb/design-system/raw/main/LICENSE)
[![ARB Approved](https://img.shields.io/badge/Utah_ARB-Approved-2e7114?style=for-the-badge)](https://standards/architecture-review-board)

The library is a collection of css styles and components designed to make it quick and simple for developers to create web experiences using the Design System.
Goes hand in hand with the [Design System Header](https://github.com/guidogerb/design-system/tree/main/examples/header) and Footer.

## What's included

- Compiled CSS
- SASS CSS
- React Components <br>
  (The React components are not a primary resource. Utilize the guidelines and css resources to create your own components for other libraries.)<br>
- Other libraries will be added as they are created. (See [Contributing](#contributing) below)

## Getting Started

- Visit the [![Getting Started](https://img.shields.io/badge/Getting%20Started-blue)](https://designsystem/resources/gettingStarted) page to begin using the Header and Design System.

## Documentation

- [![Design System Website](https://img.shields.io/badge/Design%20System%20Website-blue)](https://designsystem)
- [![Getting Started](https://img.shields.io/badge/Getting%20Started-blue)](https://designsystem/resources/gettingStarted)
- [![Header Options](https://img.shields.io/badge/Utah_Header_Options-blue)](https://designsystem/library/Header)

## NPM

The Header and Design System Library are published to NPM here:
- [![Design System Library](https://img.shields.io/badge/NPM_Design_System_Library-blue)](https://www.npmjs.com/package/%40guidogerb/design-system)

## Install

```bash
npm i design-system
```

### Example Using SCSS source in a javascript import

```JavaScript
//import all scss
import 'design-system/css/index.scss';
```

### Using the SCSS source in a Sass file

In most cases you can simply import the Sass file as illustrated below:

```scss
@use "~design-system/css/index.scss";
```

## Pre-processed bundled resource

The CSS files have been pre-processed and can be delivered via the `unpkg CDN` (Content Delivery Network).

Unpkg syntax:
```
https://unpkg.com/:package@:version/:file
```

Example using version:
```
https://unpkg.com/design-system@1.0.1/dist/style.css
```

Example using latest:
```
https://unpkg.com/design-system/dist/style.css
```

## Contributing
The Design System website is built using React, however we want to expand it to other technologies such as Angular, Vue.js, etc.
If you want to contribute or have any feedback, we'd love to hear from you! Please [contact us](https://designsystem/resources/gettingStarted).

### Design System GitHub

- [Design System](https://github.com/guidogerb/design-system/tree/main/)

## Design System Monorepo

This repo consists of the following:
- [![Header (SCSS / Javascript)](https://img.shields.io/badge/GitHub_Header-blue?logo=github)](https://github.com/guidogerb/design-system/tree/main/%40guidogerb/design-system-header) ![README](https://img.shields.io/badge/README-gray)
- [![Design System Library (SCSS / React)](https://img.shields.io/badge/GitHub-Design_System_Library-blue?logo=github)](https://github.com/guidogerb/design-system/tree/main/%40guidogerb/design-system) ![README](https://img.shields.io/badge/README-gray)
- [![Examples](https://img.shields.io/badge/GitHub-Examples-blue?logo=github)](https://github.com/guidogerb/design-system/tree/main/examples) ![README](https://img.shields.io/badge/README-gray)
- [![Design System Website (SCSS / React)](https://img.shields.io/badge/GitHub-Design_System_Website-blue?logo=github)](https://github.com/guidogerb/design-system/tree/main/design-system-website) ![README](https://img.shields.io/badge/README-gray)

## License

[STATE OF UTAH: MEMORANDUM OF AGREEMENT TO TRANSFER SOFTWARE](https://github.com/guidogerb/design-system/tree/main/LICENSE)
