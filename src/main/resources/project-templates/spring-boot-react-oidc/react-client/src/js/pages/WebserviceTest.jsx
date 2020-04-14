import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import webservice from "../app/Webservice";


const propTypes = {
	account: PropTypes.object,
	dataLists: PropTypes.object,

};

const defaultProps = {
	account: undefined,
	dataLists: undefined,
};

const mapStateToProps = state => ({
	account: state.account,
	dataLists: state.dataList
});

class WebserviceTest extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		webservice.dataLists();
	}

	render() {
		return (
			<div>
				<div>Hello {this.props.account && this.props.account.user && this.props.account.user.data.firstName}'s world SecurityUser test is great.</div>
				<div>Agency (from dataLists): </div>
				{this.props.dataLists && this.props.dataLists.agencies && this.props.dataLists.agencies.map((item, index) => {
					<div key={index}>{item.name}</div>;
				})
				}
			</div>
		);
	}
}

WebserviceTest.propTypes = propTypes;
WebserviceTest.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps)(WebserviceTest));