import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom/';

import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import { withStyles, Grid, Typography } from '@material-ui/core';

const styles = theme => ({
	...theme.globalStyles,
	commentImage: {
		maxWidth: '100%',
		height: 100,
		objectFit: 'cover',
		borderRadius: '50%'
	},
	commentData: {
		marginLeft: 20
	}
});

//TODO createdAt for comment key is bad
class Comments extends Component {
	render() {
		const { comments, classes } = this.props;
		return (
			<Grid container>
				{comments.map((comment, index) => {
					const { body, createdAt, userImage, userHandle } = comment;
					return (
						<Fragment key={createdAt}>
							<Grid item sm={12}>
								<Grid container>
									<Grid item sm={2}>
										<img src={userImage} alt="comment" className={classes.commentImage} />
									</Grid>
									<Grid item sm={9}>
										<div className={classes.commentData}>
											<Typography
												variant="h5"
												component={Link}
												to={`users/${userHandle}`}
												color="primary"
											>
												{userHandle}
											</Typography>
											<Typography variant="body2" color="textSecondary">
												{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
											</Typography>
											<hr className={classes.invisSeparator} />
											<Typography variant="body1">{body}</Typography>
										</div>
									</Grid>
								</Grid>
							</Grid>
							{index !== comments.length - 1 && <hr className={classes.visSeparator}></hr>}
						</Fragment>
					);
				})}
			</Grid>
		);
	}
}

Comments.propTypes = {
	classes: PropTypes.object.isRequired,

	comments: PropTypes.array.isRequired
};

// const mapStateToProps = state => ({
// 	user: state.user
// });

// const mapActionsToProps = {
// 	followBug,
// 	unfollowBug
// };

export default withStyles(styles)(Comments);
//connect(mapStateToProps, mapActionsToProps)
