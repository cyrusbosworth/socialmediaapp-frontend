import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom/';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import PropTypes from 'prop-types';

//MUI Stuff
import { Card, CardContent, CardMedia } from '@material-ui/core';
//Icons
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import { likeBug, unlikeBug } from '../../redux/actions/dataActions';
import TooltipButton from '../../util/TooltipButton';
import DeleteBug from './DeleteBug';
import BugDialog from './BugDialog';
import LikeButton from './LikeButton';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200
	},
	content: {
		padding: 25
	}
};

export class Bug extends Component {
	handleOpen = () => {};
	render() {
		const {
			classes,
			bug: { body, createdAt, userImage, userHandle, commentCount, likeCount, bugId },
			user: {
				authenticated,
				credentials: { handle }
			}
		} = this.props;

		dayjs.extend(relativeTime);

		//TODO max body size certain amount of characters and ellipses

		const deleteButton =
			authenticated && userHandle === handle ? <DeleteBug bugId={bugId}></DeleteBug> : null;
		const likes = likeCount === 1 ? 'like' : 'likes';
		return (
			<Card className={classes.card}>
				<CardMedia image={userImage} title="Profile image" className={classes.image} />
				<CardContent className={classes.content}>
					<Typography variant="h5" color="secondary" component={Link} to={`/users/${userHandle}`}>
						{userHandle}
					</Typography>
					{deleteButton}
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>

					<Typography variant="body1">{body}</Typography>
					<LikeButton bugId={bugId} />
					<span>
						{likeCount} {likes}
					</span>
					<TooltipButton tip="comments" onClick={this.handleOpen}>
						<ChatIcon color="primary" />
					</TooltipButton>
					<span>{commentCount} comments</span>
					<BugDialog bugId={bugId} userHandle={userHandle} openDialog={this.props.openDialog} />
				</CardContent>
			</Card>
		);
	}
}

Bug.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	likeBug: PropTypes.func.isRequired,
	unlikeBug: PropTypes.func.isRequired,
	bug: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeBug,
	unlikeBug
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Bug));
