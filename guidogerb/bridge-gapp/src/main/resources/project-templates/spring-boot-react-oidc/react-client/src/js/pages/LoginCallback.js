import React from "react";
import {CallbackComponent} from "redux-oidc";
import userManager from "../app/UserManager";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import currentUrl from "../app/CurrentUrl";
import {withRouter} from "react-router";

const propTypes = {
	// the react router history object for pushing/redirecting
	history: PropTypes.object.isRequired,
};

const defaultProps = {};

class LoginCallback extends React.Component {
	render() {
		return (
			<CallbackComponent
				userManager={userManager}
				successCallback={() => this.props.history.push(currentUrl.getRecentUrl())}
				errorCallback={console.error}
			>
				<div>Redirecting...</div>
			</CallbackComponent>
		);
	}
}

LoginCallback.propTypes = propTypes;
LoginCallback.defaultProps = defaultProps;

export default withRouter(connect()(LoginCallback));
