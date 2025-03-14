// eslint-disable-next-line import/extensions
import packageJsonJSON from '../../../../package.json?raw';
const packageJson = /** @type {{version: string}} */ (/** @type {unknown} */ (packageJsonJSON));

import { domConstants, getCssClassSelector } from '../../enumerations/domConstants';
import { sizes } from '../../enumerations/sizes';
import { renderDOMSingle } from '../../misc/renderDOMSingle';
import { uuidv4 } from '../../misc/uuidv4';
import { getHeaderSettings } from '../../settings/getHeaderSettings.js';
import { hookupTooltip } from '../tooltip/hookupTooltip';
import UtahLogoLargeHtml from './html/GuidoGerbLogoLarge.html?raw';
import UtahLogoMediumHtml from './html/GuidoGerbLogoMedium.html?raw';
import UtahOfficialWebsiteHoverContentHtml from './html/GuidoGerbOfficialWebsiteHoverContent.html?raw';

let isDataCollected = false;
/**
 * @returns {Element}
 */
export function GuidoGerbLogo() {
  const settings = getHeaderSettings();
  let sizedLogo;
  switch (settings.size) {
    case sizes.LARGE:
      sizedLogo = UtahLogoLargeHtml;
      break;

    case sizes.SMALL:
    case sizes.MEDIUM:
      sizedLogo = UtahLogoMediumHtml;
      break;

    default:
      throw new Error(`Unknown settings size: '${getHeaderSettings().size}'`);
  }

  const logoWrapper = renderDOMSingle(sizedLogo);
  const logoButton = /** @type {HTMLElement} */(logoWrapper.querySelector(getCssClassSelector(domConstants.LOGO_SVG)));
  if (!logoButton) {
    throw new Error('GuidoGerbLogo: logoButton not found');
  }

  logoWrapper.setAttribute('id', uuidv4());
  hookupTooltip(logoWrapper, renderDOMSingle(UtahOfficialWebsiteHoverContentHtml));

  if (
    !isDataCollected
    && (!window.location.hostname || !['localhost', '127.0.0.1', '::1', '.local'].find((local) => window.location.hostname.includes(local)))
  ) {
    isDataCollected = true;
    const dataImage = document.createElement('img');
    dataImage.classList.add('logo-wrapper__data');
    dataImage.classList.add('hidden');
    dataImage.ariaHidden = 'true';
    dataImage.src = `https://uds-data-a234spjofq-wm.a.run.app/${packageJson.version}.png?applicationType=${encodeURIComponent(settings.applicationType || 'unspecified')}`;
    logoWrapper.appendChild(dataImage);
  }

  return logoWrapper;
}
