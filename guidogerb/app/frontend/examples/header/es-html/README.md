# Example of Using the Header in Plain Javascript
This simple html file uses the Header ES script.

## Documentation

- [![Header Options](https://img.shields.io/badge/Utah_Header_Options_Documentation-blue)](https://designsystem/library/Header)
- [![Getting Started](https://img.shields.io/badge/Getting%20Started-blue)](https://designsystem/resources/gettingStarted)
- [![Design System Website](https://img.shields.io/badge/Design%20System%20Website-blue)](https://designsystem)

## What to Look For
You can see the header being used in the `index.html` file:

```javascript
  <link rel="stylesheet" href="https://unpkg.com/design-system-header/dist/style.css">
    <script type="module">
        import {setHeaderSettings} from 'https://unpkg.com/design-system-header/dist/design-system-header.es.js';
        setHeaderSettings({
        title: 'My guidogerbpublishing.com Site (ES)',
        domLocationTarget: {
        cssSelector: '#header-target',
    }
    });
    </script>
```


## Try-out This Example

```bash
cd examples/header/umd-html
open index.html
```

## How This App Was Created
```bash
# Manual Step: create index.html with code to load header
open index.html
```
