import { valueAtPath } from 'design-system';
import { objectsPathsWithKeys } from '../../../../../util/objectsPathsWithKeys';

/** @typedef {import('design-system-header').Settings} Settings */

export class ParseHeaderSettingsError extends Error {
}

/**
 * turns string functions and DOM in to actual functions and DOM
 * @param {string} settingsString
 * @returns {Settings}
 */
export function parseHeaderSettings(settingsString) {
  /** @type {Settings} */
  let resultSettings;
  try {
    resultSettings = JSON.parse(settingsString);
  } catch (e) {
    // @ts-expect-error e is an exception so all good
    throw new ParseHeaderSettingsError(e);
  }

  // !!!! Changes here need to also be made in stringifyHeaderSettings.js !!!! //
  const customFields = ['actionDom', 'actionFunction', 'icon', 'onAuthChanged', 'onProfile', 'onSignIn', 'onSignOut', 'onSearch'];
  const actionItems = objectsPathsWithKeys(resultSettings, customFields);

  actionItems.forEach((actionItem) => {
    switch (actionItem.searchKey) {
      case 'actionFunction':
      case 'onAuthChanged':
      case 'onProfile':
      case 'onSignIn':
      case 'onSearch':
      case 'onSignOut': {
        // convert function strings to actual MOCKED functions with contents as an alert
        const functionObject = valueAtPath({ object: resultSettings, path: actionItem.path });
        const valueIsFalse = functionObject[actionItem.searchKey] === false;
        // eslint-disable-next-line no-alert
        functionObject[actionItem.searchKey] = valueIsFalse ? false : (() => alert('Header - placeholder function invoked'));
      } break;

      case 'actionDom':
      case 'icon': {
        // just leave it be, the code will call renderDOM on it
        // actionDom COULD be a function, but don't allow that for this example tool since functions are pain in this context
        break;
      }

      default:
        throw new Error(`parseHeaderSettings: Invalid searchKey for actionItem: '${actionItem.searchKey}'`);
    }
  });

  return resultSettings;
}
