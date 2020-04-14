import React from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import PageErrorBlock from "./PageErrorBlock";

const propTypes = {
	// the current logged in user must have all these roles
	requiredRoles: PropTypes.arrayOf(PropTypes.string),

	// the current logged in user must have one of these roles
	anyRole: PropTypes.arrayOf(PropTypes.string),

	// use a function to render children so that it only creates React components if it needs to
	children: PropTypes.func.isRequired,

	// the oidc object containing user information
	oidc: PropTypes.object,

	// the account from the webservice (roles)
	account: PropTypes.object.isRequired,
};

const defaultProps = {
	requiredRoles: [],
	anyRole: [],
	oidc: { user: undefined },
};

const mapStateToProps = (state) => {
	return {
		oidc: state.oidc,
		account: state.account,
	};
};

class SecuredContent extends React.Component {

	isSecure() {
		return this.props.oidc.user;// && this.props.account.roles;
	}

	render() {
		return this.isSecure() ? this.props.children() : <PageErrorBlock message="An error has occurred. Unable to authenticate the user or contact the web service." title="Authentication Error"/>;
	}
}

SecuredContent.propTypes = propTypes;
SecuredContent.defaultProps = defaultProps;

export default connect(mapStateToProps)(SecuredContent);
