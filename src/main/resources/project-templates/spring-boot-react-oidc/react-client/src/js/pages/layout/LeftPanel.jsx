import React from 'react';
import PropTypes from "prop-types";
import {joinClassNames} from "react-common";
import {withRouter} from "react-router";

const propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};

const defaultProps = {
	className: undefined,
	children: undefined,
};

class LeftPanel extends React.Component {
	render() {
		return (
			<div className={joinClassNames("section-content__left-panel que-box fluidfixedsidebar background-dark ignore-form-submit", this.props.className)}>
				<div className="inputs-left stack-form">
					{this.props.children}
					<div key="shadowed" className="shadowed"></div>
				</div>
			</div>
		);
	}
}

LeftPanel.propTypes = propTypes;
LeftPanel.defaultProps = defaultProps;

export default withRouter(LeftPanel);
