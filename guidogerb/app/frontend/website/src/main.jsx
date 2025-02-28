import { DesignSystemContextProvider } from 'design-system';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AppContextProvider } from './react/context/AppContext/AppContextProvider';
import { CssContextProvider } from './react/context/cssContext/CssContextProvider';
import { WebsiteHeaderContextProvider } from './react/context/WebsiteHeaderContextProvider';
import { notNull } from './react/util/notNull/notNull';

const baseName = '';

ReactDOM.createRoot(notNull(document.getElementById('root'), 'main.jsx: root not found')).render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <DesignSystemContextProvider defaultSettings={{ bannerDuration: 3500, defaultClassName: 'banner--dark' }}>
        <AppContextProvider>
          <CssContextProvider>
            <WebsiteHeaderContextProvider>
              <App />
            </WebsiteHeaderContextProvider>
          </CssContextProvider>
        </AppContextProvider>
      </DesignSystemContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
