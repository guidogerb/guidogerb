import store from '../app/ReduxStore';
import reducer from '../app/Reducers';

/**
 * Generic redux dispatcher
 * @param payload object
 * @param payload.path string Path to the field to modify
 * @param payload.field string Field that you need to modify
 * @param payload.value any Value of the field
 */
export function dispatchUpdateData(payload) {
    store.dispatch({
        type: reducer.ACTION_TYPES.UPDATE_DATA,
        payload: payload
    });
}

/**
 * Shows a message to the user.
 * @param title The message title
 * @param message The message to show
 * @param icon (optional) The icon to use in the message box
 */
export function showMessage(title, message, icon = undefined) {
	const newMessage = {
		title: title,
		message: message,
		icon: icon
	};
	dispatchUpdateData({field: 'messages', value: store.getState().messages.concat(newMessage)});
}