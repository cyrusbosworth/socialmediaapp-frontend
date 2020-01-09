import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import TooltipButton from '../../util/TooltipButton';
import { Dialog, DialogTitle, DialogContent, withStyles } from '@material-ui/core';
import CommentForm from './CommentForm';
import ChatIcon from '@material-ui/icons/Chat';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
	...theme.globalStyles,
	closeButton: {
		position: 'absolute',
		left: '90%'
	}
});
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

	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<TooltipButton tip="Leave A Comment" onClick={this.handleOpen}>
					<ChatIcon />
				</TooltipButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<TooltipButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</TooltipButton>
					<DialogTitle>Comment On This</DialogTitle>
					<DialogContent>
						<CommentForm postId={this.props.postId} onSubmit={this.handleClose}></CommentForm>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	post: state.data.post,
	UI: state.UI
});

export default connect(mapStateToProps)(withStyles(styles)(CommentDialog));
