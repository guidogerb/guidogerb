import reducers from './Reducers';
import {loadUser} from "redux-oidc";
import userManager from './UserManager';
import {dispatchUpdateData} from '../common/Shared';
import {createStore} from "redux";
import {objectAtPath} from "react-common";
import {dispatchField} from "../common/Dispatch";

/**
 * set redux state back to default value for a path
 *
 * @param paths single string path or array of string paths
 */
export function dispatchDefaultState(paths) {
	_.castArray(paths).forEach(path => dispatchField(path, objectAtPath(defaultState, path)));
}

/**
 * get the default value of the redux state at a path
 *
 * @param path
 * @return {*}
 */
export function getDefaultState(path) {
	return objectAtPath(defaultState, path);
}

const defaultState = {
	oidc: {},
	app: {
		appItem: undefined,
	},
	account: {
		user: undefined,
	},
	dataLists: {
		changeTypes: [],
		yesNos: [
			{ value: '1', label: 'Yes' },
			{ value: '0', label: 'No' },
		],
	},
	messages: []
};

const reduxStore = createStore((state, action) => {
		// === reducers ===
		let reducer = false;

		// is reducer valid?
		if (action.type in reducers) {
			reducer = reducers[action.type];
		}

		// ignore redux/react "system" reducers
		if (!reducer && action.type.indexOf('@@') !== 0 && action.type.indexOf('redux-oidc') !== 0) {
			console.error('unknown reducer action:', action.type, action);
		}

		// DO IT!
		return reducer ? reducer(state, action) : (state || null);
	},
	defaultState,
	// for chrome redux plugin
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// it doesn't auto-populate reduxstore? the example does, why doesn't this?
loadUser(reduxStore, userManager).then(user => dispatchUpdateData({path: 'oidc', field: 'user', value: user}));

export default reduxStore;
