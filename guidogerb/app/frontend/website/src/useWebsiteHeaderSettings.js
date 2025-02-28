import { sizes } from 'design-system-header';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPng from './static/images/designSystemCircleGray.png';

/** @typedef {import('design-system-header').SettingsInput} SettingsInput */

/**
 * These are the base default settings for the Design System Website
 * see Routing.jsx for where the mainMenu gets added
 * @type {() => SettingsInput} base settings of the header
 */
export function useWebsiteHeaderSettings() {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      applicationType: 'custom application',
      footer: {
        showHorizontalRule: true,
        domLocationTarget: {
          cssSelector: '#footer-placeholder',
        },
      },
      logo: { imageUrl: logoPng },
      // mainMenu is set in Routing.jsx
      mediaSizes: {
        mobile: 640,
        tabletPortrait: 768,
        tabletLandscape: 1024,
      },
      showTitle: true,
      size: sizes.MEDIUM,
      title: 'Design System',
      titleFunction: (e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate('/');
      },
      titleUrl: '/',
      utahId: true,
      skipLinkUrl: '#main-content',
    }),
    []
  );
}
