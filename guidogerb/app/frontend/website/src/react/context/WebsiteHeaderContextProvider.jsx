import { HeaderContextProvider } from 'design-system';
import { defaultSettings } from 'design-system-header';
import React from 'react';
import { useWebsiteHeaderSettings } from '../../useWebsiteHeaderSettings';

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {React.JSX.Element}
 */
export function WebsiteHeaderContextProvider({ children }) {
  const websiteHeaderSettings = useWebsiteHeaderSettings();
  return (
    <HeaderContextProvider defaultSettings={{ ...defaultSettings, ...websiteHeaderSettings }}>
      {children}
    </HeaderContextProvider>
  );
}
