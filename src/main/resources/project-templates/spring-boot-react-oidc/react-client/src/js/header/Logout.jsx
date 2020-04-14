import React from 'react';
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

class Logout extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<a href="https://login.bluepantsmedia.com/user/logoff" target="_self" className="logout-link">Sign&nbsp;out</a>
		);
	}
}

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default Logout;