import React from 'react';
import PropTypes from 'prop-types';
import {ajaxStatusCore, WEBSERVICE_AJAX_ID} from "../app/Webservice";
import icons from "./Icon";

const propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};

const defaultProps = {};

class PageErrorBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAjaxing: true,
		};

		this.getOfferAjaxing = ajaxStatusCore.registerChangedCallback((ajaxId, isAjaxing) => {
			this.setState({isAjaxing: isAjaxing});
		}, WEBSERVICE_AJAX_ID.GET_OFFER);
	}

	componentWillUnmount() {
		ajaxStatusCore.unregisterChangedCallback(this.getOfferAjaxing);
	}

	render() {
		return (
			<div className="page-error flex direction-col center align-center">
				<div>{icons.warning()}</div>
				<h2>{this.props.title}</h2>
				<p>{this.props.message}</p>
			</div>
		);
	}

}

PageErrorBlock.propTypes = propTypes;
PageErrorBlock.defaultProps = defaultProps;

export default PageErrorBlock;