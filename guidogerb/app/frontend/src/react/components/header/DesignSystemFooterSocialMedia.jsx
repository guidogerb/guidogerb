import { FooterSocialMediaBar } from 'design-system';
import { IconsWebsite } from '../websiteContent/IconsWebsite';

export function DesignSystemFooterSocialMedia() {
  return (
    <FooterSocialMediaBar title="Connect with us">
      <a
        href="mailto:ui@guidogerbpublishing.gov"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        <span className="ds-icon-before-mail" aria-hidden="true" />
        <span className="visually-hidden">Email us, opens in a new tab</span>
      </a>
      <a
        href="https://utahdesignsystem.slack.com"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        <IconsWebsite.IconSlack />
        <span className="visually-hidden">Design System Slack, opens in a new tab</span>
      </a>
      <a
        href="https://github.com/guidogerb/design-system"
        className="icon-link"
        target="_blank"
        rel="noreferrer"
      >
        <IconsWebsite.IconGitHub />
        <span className="visually-hidden">Design System Git Hub, opens in a new tab</span>
      </a>
    </FooterSocialMediaBar>
  );
}
