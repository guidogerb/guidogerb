import { sizes } from '../../enumerations/sizes';
import { renderDOMSingle } from '../../misc/renderDOMSingle';
import { getHeaderSettings } from '../../settings/getHeaderSettings.js';
import { CitizenExperience } from '../citizenExperience/CitizenExperience';
import CitizenExperienceWrapperMobile from '../citizenExperience/html/CitizenExperienceWrapperMobile.html?raw';
import { LogoTitle } from '../logoTitle/LogoTitle';
import { GuidoGerbLogo } from '../guidogerbLogo/GuidoGerbLogo.js';
import headerLogoWrapper from './html/HeaderLogoWrapper.html?raw';
import headerWrapper from './html/HeaderWrapper.html?raw';
import verticalLineHtml from './html/VerticalLine.html?raw';

/**
 * Creates the header wrapper DOM and appends the:
 * logo, flexible space, Agency Logo, and citizen experience (action items, id button) to it.
 * @returns {Element}
 */
export function HeaderWrapper() {
  const header = renderDOMSingle(headerWrapper);

  header.classList.add(`ds-header--${getHeaderSettings().size?.toLowerCase() || sizes.MEDIUM}`);

  const logoWrapper = renderDOMSingle(headerLogoWrapper);
  header.appendChild(logoWrapper);

  logoWrapper.appendChild(GuidoGerbLogo());

  logoWrapper.appendChild(renderDOMSingle(verticalLineHtml));

  logoWrapper.appendChild(LogoTitle());

  header.appendChild(CitizenExperience());
  header.appendChild(renderDOMSingle(CitizenExperienceWrapperMobile));

  return header;
}
