/** @enum {string} */
export const guidogerbIdUrls = {
  PROFILE: 'https://id',
  SIGN_IN: `https://id/login?goto=${window.location}`,
  SIGN_OUT: `https://id/logout?goto=${window.location}`,
  USER_INFO: 'https://id/api/userInfo',
};
