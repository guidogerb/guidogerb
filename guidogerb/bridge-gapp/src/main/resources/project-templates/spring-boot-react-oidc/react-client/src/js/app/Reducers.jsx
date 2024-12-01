import {objectAtPathReducer} from 'react-common';

let reducers = {
	ACTION_TYPES: {
		// App
		UPDATE_DATA: 'UPDATE_DATA',
	}
};

/*
 !! make sure to always create a copy of state instead of manipulating state directly
 action = {
 type: constant action name (required),
 error: error information (optional),
 payload: data for action (optional),
 meta: what else could you possibly want? (optional)
 }
 */

/* ---- Generic Reducer --------------------------------------------------------------------------------------
	payload single: {path: 'path.to.object', field: 'fieldInObject', value: 'new value of the field'}
	payload array: [ {path: 'path.to.object', field: 'fieldInObject', value: 'new value of the field'}, ... ]
   ----------------------------------------------------------------------------------------------------------- */
reducers[reducers.ACTION_TYPES.UPDATE_DATA] = objectAtPathReducer;

export default reducers;
