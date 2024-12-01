import React from "react";
import Dashboard from "../pages/Dashboard";
import WebserviceTest from "../pages/WebserviceTest";

export default {
	DASHBOARD: {
		path: '#{artifact-id}',
		component: () => <Dashboard/>,
		forward: history => history.push(`/`),
	},
	WEBSERVICE_TEST: {
		path: 'webservicetest',
		component: () => <WebserviceTest/>,
		forward: history => history.push('/webservicetest'),
	},
};
