import { useEffect } from 'react';
import { setHeaderSettings } from 'design-system-header';
import { Accordion } from 'design-system';
import 'design-system/css/index.scss';
import './App.css'

export function App() {
  useEffect(() => {
    setHeaderSettings({
      title: 'My guidogerbpublishing.com Site',
      domLocationTarget: {
        element: document.getElementById('header-target'),
      },
      footer: {
        domLocationTarget: {
          element: document.getElementById('footer-target'),
        }
      },
      mainMenu: {
        menuItems: [
          {
            actionUrl: {
              url: '/'
            },
            title: 'Home'
          },
          {
            actionUrl: {
              url: 'https://designsystem',
              openInNewTab: true,
            },
            title: 'Design System',
          },
          {
            actionMenu: [
              {
                actionUrl: {
                  url: 'https://designsystem/library/Header',
                  openInNewTab: true,
                },
                title: 'Header',
              },
              {
                actionUrl: {
                  url: 'https://designsystem/library/Footer',
                  openInNewTab: true,
                },
                title: 'Footer',
              }
            ],
            title: 'Learn More',
          }
        ],
        title: 'Menu'
      }
    });
  }, []);
  return (
    <>
      <div id="header-target" />
      <main id="main-content" className="px-spacing">
        <h1 className="text-center my-spacing-l">React + Vite</h1>
        <p className="text-center">
          The header and footer are configured immediately after the initial render.<br />
          Check the <code>App.jsx</code> file for the full code.<br />
          Find more information on
          the <a href="https://designsystem" target="_blank">
            Design System Website{''}
            <span className="ds-new-tab-link-a11y">
              <span className="visually-hidden">, opens in a new tab</span>
              <span className="ds-icon-after-external-link" aria-hidden="true"></span>
            </span>
          </a>.
        </p>
        <h2 className="text-center my-spacing">CSS</h2>
        <p className="text-center">
          The CSS imported from <code>'./App.css'</code>.<br />
          The design system colors are overridden.<br />
          Find more information on
          the <a href="https://designsystem/resources/gettingStartedDeveloper#h3-css-color-overrides" target="_blank">
            Getting Started for Developers Page{''}
            <span className="ds-new-tab-link-a11y">
              <span className="visually-hidden">, opens in a new tab</span>
              <span className="ds-icon-after-external-link" aria-hidden="true"></span>
            </span>
          </a>
        </p>
        <h2 className="text-center my-spacing">Learn More</h2>
        <div className="flex gap justify-center mb-spacing-xl">
          <a
            className="action-card action-card--primary-color action-card--solid"
            href="https://designsystem/library/Header"
            target="_blank"
          >
            <div className="action-card__title">
              <h3>Header</h3>
              <span className="button--icon button--icon-right">
                <span
                  className="ds-icon-before-arrow-right"
                  aria-hidden="true">
                </span>
              </span>
            </div>
            <div className="action-card__body">
              Learn how to implement the Header.
            </div>
          </a>
          <a
            className="action-card action-card--secondary-color"
            href="https://designsystem/library/Footer"
            target="_blank"
          >
            <div className="action-card__title">
              <h3>Footer</h3>
              <span className="button--icon button--icon-right">
                <span
                  className="ds-icon-before-arrow-right"
                  aria-hidden="true">
                </span>
              </span>
            </div>
            <div className="action-card__body">
              Learn how to implement the Footer.
            </div>
          </a>
        </div>
        <div className="px-spacing-xl">
          <Accordion
            headerClassName="button--solid"
            headerContent={<span>Accordion</span>}
            headingLevel={2}
            id="accordion"
            isOpen={true}
          >
            <p>
              This component has been imported form the Design System:<br />
              <code>import &#123; Accordion &#125; from 'design-system';</code><br />
            </p>
            <span>
              Find more information on
              the <a href="https://designsystem/library/components/containers/accordion" target="_blank">
                Accordion Page{''}
                <span className="ds-new-tab-link-a11y">
                  <span className="visually-hidden">, opens in a new tab</span>
                  <span className="ds-icon-after-external-link" aria-hidden="true"></span>
                </span>
              </a>.
            </span>
          </Accordion>
        </div>
      </main>
      <footer id="footer-target" aria-label="page" className="mt-spacing-xl" />
    </>
  )
}
