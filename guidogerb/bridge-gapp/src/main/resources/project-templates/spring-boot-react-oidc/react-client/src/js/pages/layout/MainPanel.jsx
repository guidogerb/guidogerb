import React from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router";

const propTypes = {
	children: PropTypes.any.isRequired,
};

const defaultProps = {};

class MainPanel extends React.Component {
	render() {
		return (
			<div className="clearfix background-gray fluidfixedcontent">
				{this.props.children}
			</div>
		);
	}
}

MainPanel.propTypes = propTypes;
MainPanel.defaultProps = defaultProps;

export default withRouter(MainPanel);
