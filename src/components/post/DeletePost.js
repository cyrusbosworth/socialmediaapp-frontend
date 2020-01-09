import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core';

import PropTypes from 'prop-types';

//MUI Stuff
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';
import TooltipButton from '../../util/TooltipButton';

const styles = {
	deleteButton: {
		left: '90%',
		top: 15,
		position: 'absolute'
	}
};
class DeletePost extends Component {
	state = {
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	deletePost = () => {
		this.props.deletePost(this.props.postId);
		this.setState({ open: false });
	};
	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<TooltipButton
					tip="Delete Post"
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<DeleteIcon color="secondary"></DeleteIcon>
				</TooltipButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<DialogTitle>Are you sure you want to delete this?</DialogTitle>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.deletePost} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

DeletePost.propTypes = {
	classes: PropTypes.object.isRequired,

	deletePost: PropTypes.func.isRequired,

	postId: PropTypes.string.isRequired
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
