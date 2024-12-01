import {AjaxStatusCore, WebserviceCore} from "react-common";
import config from "./Config";
import reduxStore from "./ReduxStore";
import {createPathActionPayload, dispatchField, dispatchFieldCurry, dispatchUpdates} from "../common/Dispatch";

export const ajaxStatusCore = new AjaxStatusCore();

const webserviceCore = new WebserviceCore({
	baseUrl: config.baseWebserviceUrl,
	ajaxStatusCore: ajaxStatusCore,
	jsLogging: undefined,
	loadDefaultsCallback: defaults => defaults.headers.common['Authorization'] = reduxStore.getState().oidc.user && reduxStore.getState().oidc.user.access_token,
});

let baseUrl = config.baseWebserviceUrl;
const webserviceHRIS = new WebserviceCore({
	baseUrl: baseUrl,
	ajaxStatusCore: ajaxStatusCore,
	loadDefaultsCallback: defaults => delete defaults.headers.common['Authorization'],
});

let ajaxId = 1;

export const WEBSERVICE_AJAX_ID = {
	DATA_LISTS: ajaxId++,
	ERROR: ajaxId++,
	USER: {
		GET: ajaxId++,
		SAVE: ajaxId++,
	},
};

const webservice = {
	dataLists: () => webserviceCore.get('data/getListItems', undefined, WEBSERVICE_AJAX_ID.DATA_LISTS)
	// note that validation engine requires values to be strings, otherwise 0 is considered empty so even though they pick "No" as the menu item, it's still showing as required
		.then(lists => dispatchUpdates(Object.keys(lists).map(key => createPathActionPayload(`dataLists.${key}`, lists[key].map(item => ({label: item.name, value: `${item.fk}`})))))),

	handleError: error => webserviceCore.post('error.json', error, WEBSERVICE_AJAX_ID.ERROR),

	user: {
		get: () => webserviceCore.get('user', undefined, WEBSERVICE_AJAX_ID.USER.GET)
			.then(dispatchFieldCurry('account.user')),
	},
};

export default webservice;
