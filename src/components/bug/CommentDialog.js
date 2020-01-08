import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import TooltipButton from '../../util/TooltipButton';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import CommentForm from './CommentForm';
import ChatIcon from '@material-ui/icons/Chat';

import CloseIcon from '@material-ui/icons/Close';
class CommentDialog extends Component {
	state = {
		open: false
	};
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false, errors: {} });
	};
	//tipClassName={} classes.closeButton
	render() {
		return (
			<Fragment>
				<TooltipButton tip="Leave A Comment" onClick={this.handleOpen}>
					<ChatIcon />
				</TooltipButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<TooltipButton tip="Close" onClick={this.handleClose}>
						<CloseIcon />
					</TooltipButton>
					<DialogTitle>Comment on this</DialogTitle>
					<DialogContent>
						<CommentForm bugId={this.props.bugId} onSubmit={this.handleClose}></CommentForm>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	bug: state.data.bug,
	UI: state.UI
});

export default connect(mapStateToProps)(CommentDialog);
