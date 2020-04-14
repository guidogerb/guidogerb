import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginCallback from "../pages/LoginCallback";
import NotLoginCallback from "../pages/NotLoginCallback";
import {Redirect} from "react-router";
import PAGES from "../common/Pages";

const propTypes = {};

const defaultProps = {};

export default class AppRoutes extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/login/callback" render={props => <LoginCallback {...Object.assign({}, this.props, props)} />}/>
					<Route path="/:page" render={props => <NotLoginCallback {...props}/>}/>
					<Route render={() => <Redirect to={`/${PAGES.DASHBOARD}`}/>}/>;
				</Switch>
			</React.Fragment>
		);
	}
}

AppRoutes.propTypes = propTypes;
AppRoutes.defaultProps = defaultProps;
