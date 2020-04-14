import store from "../app/ReduxStore";

export const ROLES = {
	ROLE_1: 'role-1',
	ROLE_2: 'role-2',
};

export function hasRole(role) {
	const account = store.getState().account;
	return account && account.user && account.user.roles && account.user.roles.includes(role);
}
