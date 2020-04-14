import React from 'react';
import icons from "../common/Icon";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Pages from "../common/Pages";
import {withRouter} from "react-router";

const propTypes = {
	account: PropTypes.object,
	history: PropTypes.object.isRequired,
};

const defaultProps = {
	account: undefined,
};

const mapStateToProps = state => ({
	account: state.account,
});

class Header extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="header-wrapper-placeholder"></div>
				<div className="header-wrapper site-full">
					<a href="https://bluepantsmedia.com" className="header-wrapper__home">
						{icons.home('header-content__svg')}
						{icons.logo('header-content__svg')}
					</a>
					<div className="account-button-wrapper">
						<span>Hello, {this.props.account && this.props.account.user && this.props.account.user.data && `${this.props.account.user.data.firstName} ${this.props.account.user.data.lastName}`}</span>
					</div>
					<div className="header-wrapper__header-title hcenter vcenter" onClick={() => Pages.BATCH_CHANGE_DASHBOARD.forward(this.props.history)}>Batch Change</div>
				</div>
			</React.Fragment>
		);
	}
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps)(Header));
