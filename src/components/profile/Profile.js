import React, { Component, Fragment } from 'react';

import EditDetails from './EditDetails';

import { Link } from 'react-router-dom/';
import PropTypes from 'prop-types';
import { Paper, withStyles, Typography, Button } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { connect } from 'react-redux';

import dayjs from 'dayjs';
//MaterialIcons
import LocationOn from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import ProfileSkeleton from '../../util/ProfileSkeleton';

import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import TooltipButton from '../../util/TooltipButton';

const styles = theme => ({
	...theme.globalStyles
});

export class Profile extends Component {
	handleImageChange = event => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	};

	handleLogout = () => {
		this.props.logoutUser();
	};
	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};
	render() {
		const {
			classes,
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				loading,
				authenticated
			}
		} = this.props;

		//TODO omg
		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img className="profile-image" src={imageUrl} alt="profile" />
							<input
								type="file"
								id="imageInput"
								hidden="hidden"
								onChange={this.handleImageChange}
							/>
							<TooltipButton
								tip="Edit profile picture"
								onClick={this.handleEditPicture}
								btnClassName="button"
							>
								<EditIcon color="primary" />
							</TooltipButton>
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink component={Link} to={`users/${handle}`} color="primary" variant="h5">
								@{handle}
							</MuiLink>
							<hr />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<hr />
							{location && (
								<Fragment>
									<LocationOn color="primary" />
									<span>{location}</span>
									<hr />
								</Fragment>
							)}
							{website && (
								<Fragment>
									<EmailIcon color="primary" />
									<a href={website} target="_blank" rel="noopener noreferrer">
										{' '}
										{website}
									</a>
									<hr />
								</Fragment>
							)}
							<CalendarToday color="primary" />{' '}
							<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
						</div>
						<EditDetails></EditDetails>

						<TooltipButton tip="Logout" onClick={this.handleLogout} btnClassName="button">
							<KeyboardReturn color="primary" />
						</TooltipButton>
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						No profile found, please login again
					</Typography>
					<div className={classes.buttons}>
						<Button variant="contained" color="primary" component={Link} to="/login">
							Log In
						</Button>
						<Button variant="contained" color="secondary" component={Link} to="/signup">
							Sign Up
						</Button>
					</div>
				</Paper>
			)
		) : (
			<ProfileSkeleton />
		);

		return profileMarkup;
	}
}

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
