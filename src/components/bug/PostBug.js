import React, { Component, Fragment } from 'react';

import { withStyles, DialogContent } from '@material-ui/core';

import PropTypes from 'prop-types';

//MUI Stuff
import { Button, Dialog, DialogTitle, CircularProgress, TextField } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { postBug, clearErrors } from '../../redux/actions/dataActions';
import TooltipButton from '../../util/TooltipButton';

const styles = theme => ({
	...theme.globalStyles,
	submitButton: {
		position: 'relative',
		float: 'right',
		margin: '10px 0'
	},
	progressSpinner: {
		position: 'absolute'
	},
	closeButton: {
		position: 'absolute',
		left: '92%',
		top: '6%'
	}
});
class PostBug extends Component {
	state = {
		open: false,
		body: '',
		errors: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({
				body: '',
				open: false,
				errors: {}
			});
		}
	}

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false, errors: {} });
		this.props.clearErrors();
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.postBug({ body: this.state.body });
		//this.props.getBugs();
	};

	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading }
		} = this.props;

		return (
			<Fragment>
				<TooltipButton
					tip="Post new Bug"
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<AddIcon />
				</TooltipButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<TooltipButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</TooltipButton>
					<DialogTitle>Post a new bug</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="bug"
								multiline
								rows="3"
								placeholder="Describe issue"
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>

							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									></CircularProgress>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostBug.propTypes = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	postBug: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	UI: state.UI
});

export default connect(mapStateToProps, { postBug, clearErrors })(withStyles(styles)(PostBug));
