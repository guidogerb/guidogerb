const CLIENT_URLS = {
	LOCAL: 'localhost',
	DEV: '#{client.domainname.dev}',
	AT: '#{client.domainname.at}',
	PROD: '#{client.domainname.prod}'
};

const WEBSERVICE_URLS = {
	LOCAL: 'http://localhost:8080/#{artifact-id}/',
	DEV: '#{ws.domainname.dev}',
	AT: '#{ws.domainname.at}',
	PROD: '#{ws.domainname.prod}'
};


/**
 * Get webservice url based on the current clients url
 * @param environment override the url by passing in the key you want (LOCAL, DEV, AT, PROD)
 * @param webserviceUrls urls to choose from for the environments
 * @return {string}
 */
function getWebserviceUrl(webserviceUrls, environment = undefined) {
	// return 'https://guidogerb.bluepantsmedia.com/deployments/';
	const hostname = window.location.hostname;
	//set default webservice url
	let retVal = environment && webserviceUrls[environment];
	if (!retVal) {
		retVal = webserviceUrls.AT;
		for (const key of Object.keys(CLIENT_URLS)) {
			if (hostname.includes(CLIENT_URLS[key])) {
				retVal = webserviceUrls[key];
			}
		}
	}
	return retVal;
}

export default {
	baseWebserviceUrl: getWebserviceUrl(WEBSERVICE_URLS),
	basename: '/',

	userManagerConfig: {
		// get this value from apadmin: https://apadmin.bluepantsmedia.com/#/credentials
		client_id: 'totes-schokker',
		// tell where to go once user is logged in: must be an entry in apadmin
		redirect_uri: `${window.location.origin}/login/callback`,
		// not sure what silent renew does nor how it works
		redirect_uri_slient_renew: 	`${window.location.origin}/login/silent_renew`,
	},
};
