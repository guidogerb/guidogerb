# Example of Using the Header in Plain Javascript
This simple html file uses the Header UMD script.

## Documentation

- [![Header Options](https://img.shields.io/badge/Utah_Header_Options_Documentation-blue)](https://designsystem/library/Header)
- [![Getting Started](https://img.shields.io/badge/Getting%20Started-blue)](https://designsystem/resources/gettingStarted)
- [![Design System Website](https://img.shields.io/badge/Design%20System%20Website-blue)](https://designsystem)

## What to Look For
You can see the header being used in the `index.html` file:

```javascript
  <!-- Include the CSS and Javascript for the Header -->
  <link rel="stylesheet" href="https://unpkg.com/design-system-header/dist/style.css">
  <script src="https://unpkg.com/design-system-header/dist/design-system-header.umd.js"></script>
  <script>
    // Wait for the header to be ready
    document.addEventListener('HeaderLoaded', () => {
      // Set up the header
      window["design-system-header"].setHeaderSettings({
        domLocationTarget: {
          cssSelector: '#header-target'
        },
        "mainMenu": {
          "menuItems": [
            {
              "actionUrl": {
                "url": "/"
              },
              "title": "Home"
            }
          ],
          "title": "Design System Main Menu"
        },
        "mediaSizes": {
          "mobile": 640,
          "tabletPortrait": 768,
          "tabletLandscape": 1024
        },
        "showTitle": true,
        "size": "MEDIUM",
        "title": "Design System",
        "utahId": true,
        "footer": null,
        "logo": {
          "imageUrl": "https://designsystem/assets/designSystemCircleGray-a5a6c10d.png"
        },
        "actionItems": null,
        "onSearch": false
      });
    });
  </script>
  <script>
    setTimeout(() => {
      window["design-system-header"].setHeaderSettings({
        footer: {
          domLocationTarget: {
            cssSelector: '#footer-target'
          }
        }
      });
    }, 2000)
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
