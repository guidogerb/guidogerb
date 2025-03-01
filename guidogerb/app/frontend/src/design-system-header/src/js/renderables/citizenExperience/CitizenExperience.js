import { renderDOMSingle } from '../../misc/renderDOMSingle';
import { getHeaderSettings } from '../../settings/getHeaderSettings.js';
import { ActionItems } from '../actionItems/ActionItems';
import { renderUtahIdForDesktop } from '../guidogerbId/GuidoGerbId.js';
import CitizenExperienceWrapper from './html/CitizenExperienceWrapper.html?raw';

export function CitizenExperience() {
  const citizenExperienceWrapper = renderDOMSingle(CitizenExperienceWrapper);

  const actionItems = ActionItems();
  if (actionItems) {
    citizenExperienceWrapper.appendChild(actionItems);
  }

  if (getHeaderSettings().utahId !== false) {
    citizenExperienceWrapper.appendChild(renderUtahIdForDesktop());
  }

  return citizenExperienceWrapper;
}
