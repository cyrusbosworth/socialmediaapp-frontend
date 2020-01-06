import React, { Fragment } from 'react';

import { Link } from 'react-router-dom/';
import PropTypes from 'prop-types';
import { Paper, withStyles, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';

import dayjs from 'dayjs';
//MaterialIcons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
	...theme.globalStyles
});

const StaticProfile = props => {
	const {
		classes,
		profile: { handle, createdAt, imageUrl, bio, website, location }
	} = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img className="profile-image" src={imageUrl} alt="profile" />
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
							<LinkIcon color="primary" />
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
			</div>
		</Paper>
	);
};

StaticProfile.propTypes = {
	classes: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
