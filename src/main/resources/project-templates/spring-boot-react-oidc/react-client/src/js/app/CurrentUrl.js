export default {
	storeUrl: () => !window.location.href.includes('login') && localStorage.setItem('currentUrl', window.location.pathname),
	getRecentUrl: () => localStorage.getItem('currentUrl') || '/',
};