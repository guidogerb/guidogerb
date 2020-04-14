import {createUserManager} from 'redux-oidc';
import config from './Config';


const userManagerConfig = {
	client_id: config.userManagerConfig.client_id,
	redirect_uri: config.userManagerConfig.redirect_uri,
	silent_redirect_uri: config.userManagerConfig.redirect_uri_slient_renew,

	response_type: 'id_token token',
	scope: 'openid profile email directory',
	// authority: 'https://login.dev.utah.gov:443/sso/oauth2',
	authority: 'https://login.bluepantsmedia.com:443/sso/oauth2',
	automaticSilentRenew: true,
	filterProtocolClaims: false,
	loadUserInfo: true,
};

export default createUserManager(userManagerConfig);
