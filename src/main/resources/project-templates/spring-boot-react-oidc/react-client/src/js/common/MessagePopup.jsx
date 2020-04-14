import React from 'react';
import PropTypes from 'prop-types';
import {PopupWindow, Button} from 'react-common';

const propTypes = {
	content: PropTypes.shape({
		icon: PropTypes.func,
		title: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
	}),
	closePopup: PropTypes.func.isRequired
};

const defaultProps = {
	content: {
		icon: undefined
	}
};

class MessagePopup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<PopupWindow
				footerChildren={(
					<div className="message-popup__footer--single">
						<Button label="Okay" onClick={this.props.closePopup}/>
					</div>
				)}
				onCloseButtonCallback={this.props.closePopup}
				onBackdropCallback={this.props.closePopup}
			>
				<div className="message-popup__content-wrapper">
					{this.props.content.icon && this.props.content.icon('popup-icon')}
					<div className="message-popup__message-wrapper flex1">
						<div className="message-popup__title">{this.props.content.title}</div>
						<div className="message-popup__message">{this.props.content.message}</div>
					</div>
				</div>
			</PopupWindow>
		);
	}
}

MessagePopup.propTypes = propTypes;
MessagePopup.defaultProps = defaultProps;

export default MessagePopup;