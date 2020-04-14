import React from "react";
import userManager from "../app/UserManager";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import SecuredContent from "../common/SecuredContent";
import webservice from '../app/Webservice';
import Header from "../header/Header";
import {Redirect, withRouter} from "react-router";
import PAGES from "../common/Pages";

const propTypes = {
	// the react router history object for pushing/redirecting
	history: PropTypes.object.isRequired,
	oidc: PropTypes.object,
	dataList: PropTypes.object,
	accountUser: PropTypes.object,
};

const defaultProps = {
	oidc: {},
	dataList: {},
};

const mapStateToProps = (state) => ({
	oidc: state.oidc,
	dataList: state.dataList,
	accountUser: state.account.user,
});

// user is not being logged in so do normal routing
class NotLoginCallback extends React.Component {
	constructor(props) {
		super(props);

		// had issues with multiple ajax results on load in offer acceptance
		webservice.batchChange.current()
			.then(() => webservice.dataLists())
			.then(() => webservice.user.get());
	}

	render() {
		return (!this.props.oidc.user || this.props.oidc.user.expired) ? userManager.signinRedirect() : (
			this.props.accountUser ?
			<div className="outer-wrapper .site-full">
				<div className="outer-wrapper__inner-wrapper .site-full content-wrapper">
					<Header />
					<section className="section-content flex1">
						<SecuredContent>
							{() => (
								<Switch>
									<Route path={`/${PAGES.BATCH_CHANGE_DASHBOARD.path}`} render={PAGES.BATCH_CHANGE_DASHBOARD.component}/>
									<Route path={`/${PAGES.BATCH_ITEM_EDIT.path}`} render={PAGES.BATCH_ITEM_EDIT.component}/>
									<Route path={`/${PAGES.WEBSERVICE_TEST.path}`} render={PAGES.WEBSERVICE_TEST.component}/>
									<Route render={() => <Redirect to={`/${PAGES.BATCH_CHANGE_DASHBOARD.path}`}/>}/>
								</Switch>
							)}
						</SecuredContent>
					</section>
				</div>
			</div>
		: <div className="loading">Loading...</div>);
	}
}

NotLoginCallback.propTypes = propTypes;
NotLoginCallback.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps)(NotLoginCallback));
