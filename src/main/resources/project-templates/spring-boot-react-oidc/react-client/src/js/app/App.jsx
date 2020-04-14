import '@babel/polyfill';
import React from 'react';
import PropTypes from "prop-types";
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import reduxStore from './ReduxStore';
import {BrowserRouter, withRouter} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import "../../css/index.scss";
import {OidcProvider} from 'redux-oidc';
import userManager from './UserManager';
import config from './Config';
import currentUrl from './CurrentUrl';
import MessagePopup from '../common/MessagePopup';
import {dispatchUpdateData} from '../common/Shared';
import ErrorBoundary from "./ErrorBoundary";
import {CommonAppSetup, Components} from "react-common";

const propTypes = {
	messages: PropTypes.array
};

const defaultProps = {
	messages: []
};

const mapStateToProps = (state) => {
	return {
		messages: state.messages,
	};
};

class AppClass extends React.Component {
	constructor(props) {
		super(props);
        currentUrl.storeUrl();
	}

	componentDidUpdate() {
		currentUrl.storeUrl();
	}

	showMessage() {
		const oneMessage = this.props.messages[0];
		return oneMessage &&
			<MessagePopup
				content={{title: oneMessage.title, message: oneMessage.message, icon: oneMessage.icon}}
				closePopup={() => dispatchUpdateData({field:'messages', value: this.props.messages.slice(1)})}
			/>;
	}

	render() {
		return (
			<React.Fragment>
				{this.showMessage()}
				<main>
					<AppRoutes {...this.props}/>
				</main>
			</React.Fragment>
		);
	}
}

AppClass.propTypes = propTypes;
AppClass.defaultProps = defaultProps;

CommonAppSetup.setClassName(Components.TABLE, 'container', 'entry-table');

const App = withRouter(connect(mapStateToProps)(AppClass));

render((
	<ErrorBoundary>
		<BrowserRouter basename={config.basename}>
			<Provider store={reduxStore}>
				<OidcProvider store={reduxStore} userManager={userManager}>
					<App/>
				</OidcProvider>
			</Provider>
		</BrowserRouter>
	</ErrorBoundary>
), document.getElementById('react'));
