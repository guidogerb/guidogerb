import React from 'react';
import webservice from "./Webservice";

const propTypes = {};

const defaultProps = {};

// https://reactjs.org/docs/error-boundaries.html
export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		this.lastError = undefined;

		window.onerror = (function (message, file, line, col, error) {
			if (message !== this.lastError) {
				this.lastError = message;
				webservice.handleError.sendError({
					message: message,
					file: file,
					line: line,
					col: col,
					error: error,
					// if the browser has the stack, then include it; because of the way it's put in the error JSON.stringify wasn't including it
					stack: error ? error.stack : undefined,
					// show current url
					url: window.location.href,
				});
			}
			// return true stops the error from propagating, essentially hiding the error
			return false;
		}).bind(this);
	}

	static getDerivedStateFromError(error) {
		webservice.handleError.sendError(error);
	}

	componentDidCatch(error, info) {
		webservice.handleError.sendError([error, info]);
	}

	render() {
		return this.props.children;
	}
}

ErrorBoundary.propTypes = propTypes;
ErrorBoundary.defaultProps = defaultProps;