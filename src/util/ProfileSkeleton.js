import React, { Component, Fragment } from 'react';
import noImg from '../images/no-img.png';

import PropTypes from 'prop-types';

import { Paper, withStyles } from '@material-ui/core';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
	...theme.globalStyles
});

const ProfileSkeleton = props => {
	const { classes } = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={noImg} alt="profile" className="profile-image" />
				</div>
				<hr />
				<div className="profile-details">
					<div className={classes.handle} />
					<hr />
					<div className={classes.fullLine} />
					<div className={classes.fullLine} />
					<hr />
					<LocationOn color="primary" /> <span>Location</span>
					<hr />
					<LinkIcon color="primary" />
					<hr />
					<CalendarToday color="primary" /> Joined date
				</div>
			</div>
		</Paper>
	);
};

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
