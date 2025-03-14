import logoPng from '../../../../../../static/images/designSystemCircleGray.png';
import { FUNCTION_PLACEHOLDER } from './stringifyHeaderSettings';

const LOGO_IMAGE = `<img src="${logoPng}" id="design-system-logo" />`;

export const HeaderPresets = [
  // --- Size --- //
  {
    options: [
      { settingsSnippet: { size: 'SMALL' }, title: 'Small' },
      { settingsSnippet: { size: 'MEDIUM' }, title: 'Medium' },
      { settingsSnippet: { size: 'LARGE' }, title: 'Large' },
    ],
    title: 'Header Size',
  },

  // --- UtahID --- //
  {
    options: [
      { settingsSnippet: { utahId: false }, title: 'None' },
      { settingsSnippet: { utahId: true }, title: 'Automatic' },
      {
        settingsSnippet: {
          utahId: {
            currentUser: {
              authenticated: true,
              first: 'Philo',
            },
            onProfile: FUNCTION_PLACEHOLDER,
            onSignIn: FUNCTION_PLACEHOLDER,
            onSignOut: FUNCTION_PLACEHOLDER,
          },
        },
        title: 'With User',
      },
      {
        settingsSnippet: {
          utahId: {
            currentUser: null,
            onProfile: FUNCTION_PLACEHOLDER,
            onSignIn: FUNCTION_PLACEHOLDER,
            onSignOut: FUNCTION_PLACEHOLDER,
          },
        },
        title: 'Without User',
      },
      {
        settingsSnippet: {
          utahId: {
            menuItems: [
              {
                actionUrl: { url: 'https://guidogerbpublishing.com', openInNewTab: true },
                title: 'guidogerbpublishing.com',
              },
              {
                actionFunction: FUNCTION_PLACEHOLDER,
                title: 'Custom menu item',
              },
            ],
          },
        },
        title: 'Menu Items',
      },
    ],
    title: 'UtahId Integration',
  },

  // --- Agency Brand / Title --- //
  {
    options: [
      {
        settingsSnippet: {
          logo: null,
          showTitle: true,
          title: 'State of Preset Title',
        },
        title: 'Just Title',
      },
      {
        settingsSnippet: {
          logo: { htmlString: LOGO_IMAGE },
          showTitle: false,
        },
        title: 'Just Brand',
      },
      {
        settingsSnippet: {
          logo: { htmlString: LOGO_IMAGE },
          showTitle: true,
          title: 'State of Preset Title',
        },
        title: 'Title & Brand',
      },
    ],
    title: 'Agency Brand/Title',
  },

  // --- actionItems Icons --- //
  {
    options: [
      // actionItems: None
      {
        settingsSnippet: {
          actionItems: [],
        },
        title: 'None',
      },

      // actionItems: Waffle
      {
        settingsSnippet: {
          actionItems: [
            {
              actionPopupMenu: {
                menuItems: [
                  {
                    actionUrl: { url: 'https://google.com' },
                    title: 'Item #1',
                  },
                  {
                    actionUrl: { url: 'https://guidogerbpublishing.com', openInNewTab: true },
                    title: 'guidogerbpublishing.com',
                  },
                  {
                    actionFunction: FUNCTION_PLACEHOLDER,
                    title: 'Custom menu item',
                  },
                ],
                title: 'Divisions Menu',
              },
              className: 'icon-waffle',
              icon: '<span class="ds-icon-before-waffle" aria-hidden="true" />',
              showTitle: true,
              title: 'Divisions',
            },
          ],
        },
        title: 'Waffle Icon',
      },

      // actionItems: Alerts
      {
        settingsSnippet: {
          actionItems: [
            {
              actionFunction: FUNCTION_PLACEHOLDER,
              badge: {
                // Note: make sure the `label` is plural/singular to match the value
                label: 'Unread Alerts',
                value: 2,
              },
              icon: '<span class="ds-icon-before-alert" aria-hidden="true" />',
              showTitle: false,
              title: 'Alerts',
            },
          ],
        },
        title: 'Alerts Icon',
      },
      // actionItems: help
      {
        settingsSnippet: {
          actionItems: [
            {
              actionDom: '<div>Hello World! <button>Do not press me.</button></div>',
              badge: {
                // Note: make sure the `label` is plural/singular to match the value
                label: 'Help Items Available',
              },
              icon: '<span class="ds-icon-before-help" aria-hidden="true" />',
              showTitle: false,
              title: 'Help',
            },
          ],
        },
        title: 'Help',
      },
      // actionItems: settings
      {
        settingsSnippet: {
          actionItems: [
            {
              actionPopupMenu: {
                menuItems: [
                  {
                    actionUrl: { url: 'https://guidogerbpublishing.com' },
                    title: 'Settings',
                  },
                  {
                    actionUrl: { url: 'https://guidogerbpublishing.com', openInNewTab: true },
                    title: 'guidogerbpublishing.com',
                  },
                  {
                    actionFunction: FUNCTION_PLACEHOLDER,
                    title: 'Clickable menu item',
                  },
                ],
                title: 'Settings Menu',
              },
              icon: '<span class="ds-icon-before-gear" aria-hidden="true" />',
              showTitle: false,
              title: 'Settings',
            },
          ],
        },
        title: 'Settings',
      },
    ],
    title: 'Action Items',
  },
  // --- Main Menu --- //
  {
    options: [
      // -- none -- //
      {
        settingsSnippet: {
          mainMenu: false,
        },
        title: 'None',
      },
      // -- actionUrl -- //
      {
        settingsSnippet: {
          mainMenu: {
            menuItems: [
              {
                actionUrl: { url: '/' },
                title: 'Home',
              },
            ],
            title: 'Design System Main Menu',
          },
        },
        title: 'Url (Home)',
      },
      // -- actionFunction -- //
      {
        settingsSnippet: {
          mainMenu: {
            menuItems: [
              {
                actionFunction: FUNCTION_PLACEHOLDER,
                title: 'Function',
              },
            ],
            title: 'Design System Main Menu',
          },
        },
        title: 'Function',
      },
      // -- actionFunctionUrl -- //
      {
        settingsSnippet: {
          mainMenu: {
            menuItems: [
              {
                actionFunctionUrl: {
                  actionFunction: FUNCTION_PLACEHOLDER,
                  url: 'https://visible-url.edu',
                },
                title: 'Function/Url',
              },
            ],
            title: 'Design System Main Menu',
          },
        },
        title: 'Func/Url',
      },
      // -- actionMenu -- //
      {
        settingsSnippet: {
          mainMenu: {
            menuItems: [
              {
                actionMenu: [
                  {
                    title: 'child2-1',
                    actionMenu: [
                      {
                        title: 'child2-1-1',
                        actionUrl: { url: '/children' },
                      },
                      {
                        title: 'child2-1-2',
                        actionUrl: { url: '/children' },
                      },
                      {
                        title: 'child2-1-3',
                        actionUrl: { url: '/children' },
                      },
                    ],
                  },
                  {
                    title: 'child2-2',
                    actionMenu: [
                      {
                        title: 'child2-2-1',
                        actionUrl: { url: '/children' },
                      },
                      {
                        title: 'child2-2-2',
                        actionUrl: { url: '/children' },
                      },
                      {
                        title: 'child2-2-3',
                        actionUrl: { url: '/children' },
                      },
                    ],
                  },
                ],
                title: 'Menu',
              },
            ],
            title: 'Design System Main Menu',
          },
        },
        title: 'Menu',
      },
    ],
    title: 'Main Menu',
  },
  // --- onSearch --- //
  {
    options: [
      // -- off -- //
      {
        settingsSnippet: {
          onSearch: false,
        },
        title: 'Off',
      },
      // -- on -- //
      {
        settingsSnippet: {
          onSearch: FUNCTION_PLACEHOLDER,
        },
        title: 'On',
      },
    ],
    title: 'Search',
  },
];

// add combo action item presets that use same settings as the already entered presets

// main menu - all
const mainMenusPreset = HeaderPresets.find((preset) => preset.title === 'Main Menu');
if (!mainMenusPreset) {
  // this means 'Main Menu' the preset above got ganked
  throw new Error('HeaderPresets: "Main Menu" preset not found.');
}
mainMenusPreset.options.push({
  title: 'All',
  // @ts-expect-error types here are a mess... ;(
  settingsSnippet: {
    mainMenu: {
      menuItems: (
        mainMenusPreset.options
          // @ts-expect-error types here are a mess... ;(
          .filter((option) => option.settingsSnippet.mainMenu)
          // @ts-expect-error types here are a mess... ;(
          .map((option) => option.settingsSnippet.mainMenu.menuItems[0])
      ),
      title: 'Design System Main Menu',
    },
  },
});

// action items - all
const actionItemsPreset = HeaderPresets.find((preset) => preset.title === 'Action Items');
if (!actionItemsPreset) {
  // this means 'Action Items' the preset above got ganked
  throw new Error('HeaderPresets: "Action Items" preset not found.');
}
actionItemsPreset.options.push({
  title: 'All',
  // @ts-expect-error types here are a mess... ;(
  settingsSnippet: {
    actionItems: [
      // @ts-expect-error types here are a mess... ;(
      ...actionItemsPreset.options.map((option) => option.settingsSnippet.actionItems).flat(),
    ],
  },
});
