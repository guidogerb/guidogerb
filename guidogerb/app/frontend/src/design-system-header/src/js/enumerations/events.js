/** @typedef {import('src/@types/jsDocTypes.d').Events} Events */

/**
 * @enum {Events}
 */
export const events = {
  // Fired when the header is first loaded (setHeaderSettings does not trigger this)
  HEADER_LOADED: /** @type {Events} */ ('HeaderLoaded'),

  // Fired when the header unloads by code calling the function removeHeader() (not when settings updated)
  HEADER_UNLOADED: /** @type {Events} */ ('HeaderUnloaded'),
};
