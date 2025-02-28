import {
  ExternalLink,
  FooterAgencyInformation,
  FooterAgencyInformationColumn,
  FooterAgencyInformationInfo,
  useHeaderContext
} from 'design-system';
import { Link } from 'react-router-dom';
import packageJSON from '../../../../package.json';
import govOps from '../../../static/images/designSystemCircleGray.svg';
import { pageUrls } from '../routing/pageUrls';

export function DesignSystemFooterMainContent() {
  const { settings: HeaderSettings } = useHeaderContext();
  return (
    <FooterAgencyInformation>
      <FooterAgencyInformationColumn>
        <FooterAgencyInformationInfo
          address={{
            city: 'Taylorsville',
            state: 'UT',
            streetAddress1: '4315 South 2700 West',
            zipCode: '84129',
          }}
          agencyTitleSecondLine="Design System"
          agencyTitleFirstLine="Department of Government Operations"
          email="ui@guidogerbpublishing.gov"
          logo={<img src={govOps} alt="Division of Technology Services" />}
        />
      </FooterAgencyInformationColumn>

      <FooterAgencyInformationColumn>
        <div className="footer-agency-information__column-title">Main Menu</div>
        <ul className="footer-agency-information__menu">
          {
            HeaderSettings.mainMenu && HeaderSettings.mainMenu?.menuItems?.map((menuItem) => (
              <li key={`footer-main-menu_${menuItem.title}`}>
                <Link to={menuItem.actionFunctionUrl?.url || menuItem.actionUrl?.url || '/'}>{menuItem.title}</Link>
              </li>
            ))
          }
        </ul>
      </FooterAgencyInformationColumn>

      <FooterAgencyInformationColumn>
        <div className="footer-agency-information__column-title">Helpful Links</div>
        <ul className="footer-agency-information__menu">
          <li><Link to={pageUrls.gettingStarted}>Getting Started</Link></li>
          <li><Link to={pageUrls.mockups}>Design Mocks</Link></li>
          <li><ExternalLink href="https://github.com/guidogerb/design-system">GitHub</ExternalLink></li>
        </ul>
      </FooterAgencyInformationColumn>

      <FooterAgencyInformationColumn>
        <div className="footer-agency-information__column-title">Design System</div>
        <ul className="footer-agency-information__menu">
          <li>Version: {packageJSON.version}</li>
          <li>
            <ExternalLink href="https://github.com/guidogerb/design-system/releases">
              Release Notes
            </ExternalLink>
          </li>
        </ul>
      </FooterAgencyInformationColumn>
    </FooterAgencyInformation>
  );
}
