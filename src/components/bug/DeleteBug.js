import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core';

import PropTypes from 'prop-types';

//MUI Stuff
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteBug } from '../../redux/actions/dataActions';
import TooltipButton from '../../util/TooltipButton';

//TODO fix positioning
const styles = {
	deleteButton: {
		left: '90%',
		top: '10%',
		position: 'absolute'
	}
};
class DeleteBug extends Component {
	state = {
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	deleteBug = () => {
		this.props.deleteBug(this.props.bugId);
		this.setState({ open: false });
	};
	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<TooltipButton
					tip="Delete Bug"
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
						<Button onClick={this.deleteBug} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

DeleteBug.propTypes = {
	classes: PropTypes.object.isRequired,

	deleteBug: PropTypes.func.isRequired,

	bugId: PropTypes.string.isRequired
};

export default connect(null, { deleteBug })(withStyles(styles)(DeleteBug));
