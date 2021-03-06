import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	withStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Button
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import TooltipButton from '../../util/TooltipButton';
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

const styles = theme => ({
	...theme.globalStyles,
	button: {
		float: 'right'
	}
});
class EditDetails extends Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location
		};
		this.props.editUserDetails(userDetails);
		this.handleClose();
	};
	handleOpen = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.credentials);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	mapUserDetailsToState = credentials => {
		this.setState({
			bio: credentials.bio ? credentials.bio : ' ',
			website: credentials.website ? credentials.website : ' ',
			location: credentials.location ? credentials.location : ' '
		});
	};
	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<TooltipButton
					tip="Edit user details"
					onClick={this.handleOpen}
					btnClassName={classes.button}
				>
					<EditIcon color="primary" />
				</TooltipButton>

				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<DialogTitle>Edit your details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								multiline
								rows="3"
								placeholder="A short bio about yourself"
								className={classes.textField}
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="website"
								type="text"
								label="Email"
								placeholder="Your Email"
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="location"
								type="text"
								label="Location"
								placeholder="Where you live"
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
