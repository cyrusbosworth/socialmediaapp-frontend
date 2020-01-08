import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, Grid, TextField, Button } from '@material-ui/core';

import { connect } from 'react-redux';

import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
	...theme.globalStyles
});

//TODO update comment count on page after comment

class CommentForm extends Component {
	state = {
		body: '',
		errors: {},
		submitted: false
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) this.setState({ body: '' });
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.submitComment(this.props.bugId, { body: this.state.body });
		this.setState({ submitted: true });
		if (this.props.onSubmit) this.props.onSubmit();
	};
	render() {
		const { classes, authenticated } = this.props;
		const errors = this.state.errors;
		const commentFormMarkup = authenticated ? (
			<Grid item sm={12}>
				<form onSubmit={this.handleSubmit}>
					<TextField
						name="body"
						type="text"
						label="Leave a comment"
						error={errors.comment ? true : false}
						helperText={errors.comment}
						value={this.state.body}
						onChange={this.handleChange}
						fullWidth
						className={classes.textField}
					/>

					<Button type="submit" variant="contained" color="primary" className={classes.button}>
						Submit
					</Button>
				</form>
				<hr className={classes.visSeparator} />
			</Grid>
		) : null;
		return commentFormMarkup;
	}
}

CommentForm.propTypes = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	submitComment: PropTypes.func.isRequired,

	bugId: PropTypes.string.isRequired,
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	bug: state.data.bug,
	authenticated: state.user.authenticated,
	UI: state.UI
});

const mapActionToProps = {
	submitComment
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommentForm));
