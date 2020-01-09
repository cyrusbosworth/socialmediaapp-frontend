import React, { Fragment } from 'react';
import noImg from '../images/no-img.png';

import PropTypes from 'prop-types';

import { Card, CardMedia, CardContent, withStyles } from '@material-ui/core';

const styles = theme => ({
	...theme.globalStyles
});

const PostSkeleton = props => {
	const { classes } = props;

	const content = Array.from({ length: 5 }).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia className={classes.cover} image={noImg} />
			<CardContent className={classes.cardContent}>
				<div className={classes.handle} />
				<div className={classes.date} />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<div className={classes.halfLine} />
			</CardContent>
		</Card>
	));

	return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton);
