import React, { Component, Fragment } from 'react';

import { withStyles, DialogContent } from '@material-ui/core';

import PropTypes from 'prop-types';

//MUI Stuff
import { Button, Dialog, DialogTitle, CircularProgress, TextField } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { postPost, clearErrors } from '../../redux/actions/dataActions';
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
class PostPost extends Component {
	state = {
		open: false,
		body: '',
		title: '',
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
				title: '',
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
		this.props.postPost({ body: this.state.body, title: this.state.title });
		//this.props.getPosts();
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
					tip="Post new Post"
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<AddIcon />
				</TooltipButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<TooltipButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</TooltipButton>
					<DialogTitle>Post a new post</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="title"
								type="text"
								label="Title"
								rows="1"
								placeholder="Title"
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>

							<TextField
								name="body"
								type="text"
								label="post"
								multiline
								rows="3"
								placeholder="Describe issue"
								error={errors.title ? true : false}
								helperText={errors.title}
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

PostPost.propTypes = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	postPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	UI: state.UI
});

export default connect(mapStateToProps, { postPost, clearErrors })(withStyles(styles)(PostPost));
