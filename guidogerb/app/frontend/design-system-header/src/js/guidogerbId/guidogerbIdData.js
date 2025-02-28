import { guidogerbIdUrls } from '../enumerations/guidogerbIdUrls.js';
import { authChangedEventHandler } from '../renderables/guidogerbId/GuidoGerbId.js';
import { getHeaderSettings } from '../settings/getHeaderSettings.js';

/** @typedef {import('src/@types/jsDocTypes.d').UtahIdData} UtahIdData */
/** @typedef {import('src/@types/jsDocTypes.d').UtahIdFetchStyle} UtahIdFetchStyle */
/** @typedef {import('src/@types/jsDocTypes.d').UtahIDSettings} UtahIDSettings */
/** @typedef {import('src/@types/jsDocTypes.d').UserInfo} UserInfo */

/** @enum {UtahIdFetchStyle} */
const UtahIdFetchStyle = {
  AUTOMATIC: /** @type {UtahIdFetchStyle} */ ('Automatic'),
  NONE: /** @type {UtahIdFetchStyle} */ ('None'),
  PROVIDED: /** @type {UtahIdFetchStyle} */ ('Provided'),
};
let lastFetchStyle = UtahIdFetchStyle.NONE;
/**
 * @param {UtahIDSettings | boolean | undefined} utahIdData
 * @returns {UtahIdFetchStyle}
 */
function determineFetchStyle(utahIdData) {
  /** @type {UtahIdFetchStyle} */
  let fetchStyle;
  if (utahIdData === true) {
    fetchStyle = UtahIdFetchStyle.AUTOMATIC;
  } else if (utahIdData === false) {
    fetchStyle = UtahIdFetchStyle.NONE;
  } else if (utahIdData === undefined || utahIdData.currentUser === undefined) {
    fetchStyle = UtahIdFetchStyle.AUTOMATIC;
  } else if (utahIdData.currentUser === null || utahIdData.currentUser) {
    fetchStyle = UtahIdFetchStyle.PROVIDED;
  } else {
    throw new Error('determineFetchStyle: Unknown id fetch style');
  }
  return fetchStyle;
}

/**
 * @type {UtahIdData}
 */
const guidogerbIdData = {
  // null = not yet loaded, false = ajaxing, true = have a result (may be error or user data)
  isDefinitive: null,
  lastError: null,
  userInfo: null,
};

/**
 * when auth status changes, call this to notify the world including the Sign In button
 * @param {UtahIdData} newUtahIdData the current information to store
 */
function maybeTriggerAuthEvent(newUtahIdData) {
  // something asked for new information, so fire off that new information has arrived
  if (newUtahIdData.isDefinitive) {
    // call auth changed so name updates in button
    authChangedEventHandler(newUtahIdData);

    // give settings callback a crack at the auth change
    const utahId = getHeaderSettings()?.utahId;
    if (typeof utahId === 'object') {
      utahId.onAuthChanged?.(newUtahIdData);
    }
  }
}

// give the application a bit of time to call setHeaderSettings() so that they
// can tell the header if the application will be controlling the logged in user
// if the application controls the user, then the user is not fetched from UtahID
// within this "waitForLaunch" window, the application must call setHeaderSettings()
// if the current user is not yet known, make sure to set `settings.utahId.currentUser = null`
// this way the header knows the user is controlled by the app and to not go fetch the user.
let waitingForLaunch = true;
const WAIT_FOR_LAUNCH_MS = 500;

/** @type {number} */
let fetchUserTimeoutId = NaN;

/**
 * @returns {Promise<UtahIdData>}
 */
export async function fetchUtahIdUserDataAsync() {
  /** @type {Promise<UtahIdData>} */
  let result = Promise.resolve(guidogerbIdData);
  const settings = getHeaderSettings();
  const fetchStyle = determineFetchStyle(settings.utahId);

  if (guidogerbIdData.isDefinitive === false) {
    // working on it... come back later...
    result = Promise.resolve(guidogerbIdData);
  } else if (waitingForLaunch) {
    clearTimeout(fetchUserTimeoutId);
    result = new Promise((resolve) => {
      fetchUserTimeoutId = window.setTimeout(
        () => {
          // if the app hasn't called setHeaderSettings() by now, too bad for them...
          waitingForLaunch = false;
          fetchUtahIdUserDataAsync()
            .then((data) => resolve(data))
            // eslint-disable-next-line no-console
            .catch((e) => console.error(e));
        },
        WAIT_FOR_LAUNCH_MS
      );
    });
  } else if (settings.utahId === false) {
    // if utahId is set and currentUser is undefined then the header has control of the user
    // otherwise, if utahId is false then it is turned off
    // otherwise, if utahId is an object and currentUser is not undefined, then the application will control the current user
    // utahId is turned off (probably shouldn't even have gotten here?)
    result = Promise.resolve({
      isDefinitive: true,
      lastError: 'ID is off',
      userInfo: null,
    });
  } else if (settings.utahId === true || settings.utahId?.currentUser === undefined) {
    // 👆 catches true && null cases, both of which allow a refetch 👆

    // header is "on" OR utahId settings has an `undefined` user: Header controls the user!
    if (fetchStyle !== lastFetchStyle || guidogerbIdData.isDefinitive === null) {
      guidogerbIdData.isDefinitive = false;
      result = fetch(guidogerbIdUrls.USER_INFO, { credentials: 'include' })
        .then((resp) => resp.json())
        .then((authResult) => {
          if (authResult.status === 200) {
            guidogerbIdData.lastError = null;
            guidogerbIdData.userInfo = /** @type {UserInfo} */ (authResult.data);
          } else {
            throw new Error(authResult.err);
          }
          return guidogerbIdData;
        })
        .catch((error) => {
          guidogerbIdData.lastError = error;
          guidogerbIdData.userInfo = null;
          return guidogerbIdData;
        })
        .finally(() => {
          guidogerbIdData.isDefinitive = true;
          maybeTriggerAuthEvent(guidogerbIdData);
          return guidogerbIdData;
        });
    }
  } else {
    // utahId settings have currentUser as null or a user, either way the application will be controlling the user, not the header
    const resultData = {
      isDefinitive: true,
      lastError: null,
      userInfo: settings.utahId?.currentUser,
    };
    result = Promise.resolve(resultData);
    maybeTriggerAuthEvent(resultData);
  }
  lastFetchStyle = fetchStyle;
  return result;
}

/**
 * @returns {UtahIdData}
 */
export function getCurrentUtahIdData() {
  return guidogerbIdData;
}
