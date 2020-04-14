import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import LeftPanel from "./layout/LeftPanel";
import MainPanel from "./layout/MainPanel";
import Table from "react-common/components/table/Table";
import webservice, {ajaxStatusCore} from "../app/Webservice";
import {Button, ColumnInformation, ConfirmationButton, PopOver, PopupWindow} from "react-common";
import {hasRole, ROLES} from "../common/Roles";
import icons from "../common/Icon";
import Pages from "../common/Pages";
import {withRouter} from "react-router";
import {dispatchField} from "../common/Dispatch";
import CheckBox from "react-common/components/form/check-box/CheckBox";
import ChildPosition from "react-common/components/form/ChildPosition";

const propTypes = {
	batchChange: PropTypes.object,
};

const defaultProps = {
	batchChange: undefined,
};

const mapStateToProps = (state) => {
	return {
		batchChange: state.app.batchChange,
		accountUser: state.account.user,
	};
};

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.applyChanges = this.applyChanges.bind(this);
		this.applyFieldChange = this.applyFieldChange.bind(this);
		this.closeApplyChangesPopup = this.closeApplyChangesPopup.bind(this);
		this.deleteBatchItem = this.deleteBatchItem.bind(this);
		this.dragDropBatchItem = this.dragDropBatchItem.bind(this);
		this.openApplyChangesPopup = this.openApplyChangesPopup.bind(this);

		this.state = {
			applyChanges: undefined,
		};

		this.columnsNoRole = [
			new ColumnInformation({
				title: 'Type',
				field: 'appliedType',
				tdCallback: (columnInfo, objectData) => {
					const typeDetail = objectData.appliedType === 'Employee' ? ` - ${objectData.actionFk}` : '';
					return (<td key={columnInfo.field}>{`${objectData.appliedType}${typeDetail}`}</td>);
				}
			}),
			new ColumnInformation({ title: 'Title', field: 'title' }),
			new ColumnInformation({ title: 'Total Records', field: 'totalRecords' }),
			new ColumnInformation({
				title: '',
				field: 'comment',
				tdCallback: (columnInfo, objectData) => {
					return (
						<td key="comment">
							{objectData.comment && (
								<PopOver
									anchor={icons.chat('popover__popover__comment-anchor')}
									classNamePopup="elevation--z4"
									dismissible={true}
									focusable={true}
									mode={PopOver.MODE.HOVER}
									position={PopOver.POSITION.TOP}
								>
									{objectData.comment}
								</PopOver>
							)}
						</td>
					);
				},
			}),
		];

		this.columns = this.columnsNoRole.concat(new ColumnInformation({
			title: '',
			field: 'delete',
			tdCallback: (columnInfo, objectData) => {
				return (
					<td key="delete"><ConfirmationButton onConfirm={() => this.deleteBatchItem(objectData)} initialLabel="X" promptLabel="Confirm?"/></td>
				);
			},
		}));
	}

	deleteBatchItem(batchItem) {
		webservice.batchItem.delete(batchItem.batchChangeItemPk)
			.then(() => dispatchField('app.#{artifact-id}.items', this.props.#{artifact-id}.items.filter(batch => batch !== batchItem)));
	}

	openApplyChangesPopup() {
		this.setState({ applyChanges: {
			backedUp: undefined,
	}});
	}

	closeApplyChangesPopup() {
		this.setState({ applyChanges: undefined });
	}

	applyFieldChange(field, value) {
		this.setState({ applyChanges: Object.assign({},  this.state.applyChanges, { [field]: value })});
	}

	applyChanges() {
		webservice.batchChange.apply(this.props.batchChange.batchChangePk)
	}

	dragDropBatchItem(dragStartIndex, dragEndIndex) {
		const newList = [...this.props.batchChange.items];
		newList.splice(dragEndIndex, 0, newList.splice(dragStartIndex, 1)[0]);
		newList.forEach((item, i) => item.processingOrder = i + 1);
		webservice.batchChange.saveProcessingOrder(newList);
		dispatchField('app.batchChange.items', newList);
	}

	render() {
		return (this.props.batchChange ? (
			<React.Fragment>
				<LeftPanel>
					{hasRole(ROLES.CEIB) && <Button label="Start New Employee Batch" onClick={() => Pages.BATCH_ITEM_EDIT.forward(this.props.history, 'NewEmployee')} className="revdropshadowtext background-green-midtone large"/>}
					{hasRole(ROLES.CEIB) && <Button label="Start New Job Batch" onClick={() => Pages.BATCH_ITEM_EDIT.forward(this.props.history, 'NewJob')} className="revdropshadowtext background-green-midtone large"/>}
					{hasRole(ROLES.CEIB) && <Button label="Test Run Batches" onClick={() => alert('This will load the processing tables with results data and generate reports files from those tables.')} className="revdropshadowtext background-blue-midtone large"/>}
					{hasRole(ROLES.AB) && <Button label="Apply Changes" onClick={this.openApplyChangesPopup} className="revdropshadowtext background-red-midtone large"/>}
				</LeftPanel>
				<MainPanel>
					<Table
						columns={hasRole(ROLES.CEIB) ? this.columns : this.columnsNoRole}
						list={this.props.batchChange.items || []}
						ajaxSpinner={ajaxStatusCore.isAjaxing()}
						onRowClick={batchItem => Pages.BATCH_ITEM_EDIT.forward(this.props.history, batchItem.batchChangeItemPk)}
						onDragDrop={this.dragDropBatchItem}
					/>
				</MainPanel>
				{this.state.applyChanges && (
					<PopupWindow
						onBackdropCallback={this.closeApplyChangesPopup}
						onCloseButtonCallback={this.closeApplyChangesPopup}
						footerChildren={(
							<div className="pop-up-box--footer">
								<Button
									onClick={this.closeApplyChangesPopup}
									label="Cancel"
									className="background-darkgray revdropshadowtext fixedwidth125"
								/>
								<Button
									onClick={this.applyChanges}
									label="Apply"
									disabled={!this.state.applyChanges.backedUp}
									className="background-green-midtone revdropshadowtext fixedwidth125"
								/>
							</div>
						)}
					>
						<div className="popup-window__heading popup-window__row">Are you sure?</div>
						<p>These changes will be applied to the whole system.</p>
						<CheckBox
							field="backedUp"
							value={this.state.applyChanges.backedUp}
							label="Database Backup"
							showLabel={false}
							onChange={this.applyFieldChange}
							children={<span className="checkbox--blurb">I have requested and received confirmation from that a point in time database backup has been completed prior to applying these changes.</span>}
							childrenPosition={ChildPosition.AFTER}
						/>
						{this.state.applyChanges.backedUp && <p>When your actions are done processing, an email will be sent to you.</p>}
					</PopupWindow>
				)}
			</React.Fragment>
		) : null);
	}
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps)(Dashboard));
