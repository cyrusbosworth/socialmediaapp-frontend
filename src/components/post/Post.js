import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom/';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import PropTypes from 'prop-types';

//MUI Stuff
import { Card, CardContent, CardMedia } from '@material-ui/core';
//Icons

import { connect } from 'react-redux';
import { followPost, unfollowPost } from '../../redux/actions/dataActions';

import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import FollowButton from './FollowButton';
import CommentDialog from './CommentDialog';
const styles = theme => ({
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200,
		maxWidth: 200,
		maxHeight: 200,
		borderRadius: '50%',
		margin: '20px 5px 20px 20px',
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		},
		[theme.breakpoints.down('sm')]: {
			minWidth: 60,
			maxWidth: 60,
			maxHeight: 60,
			borderRadius: '50%',
			margin: '20px 0px 20px 20px'
		}
	},
	content: {
		padding: 25,
		width: '100%'
	}
});

export class Post extends Component {
	state = {
		openDialog: false
	};
	handleOpen = () => {
		this.setState({
			openDialog: true
		});
	};

	render() {
		const {
			classes,
			post: { body, createdAt, userImage, userHandle, commentCount, followCount, postId, title },
			user: {
				authenticated,
				credentials: { handle }
			}
		} = this.props;

		const bodyFit = body.length > 250 ? body.substr(0, 250) + '...' : body;

		dayjs.extend(relativeTime);

		const deleteButton =
			authenticated && userHandle === handle ? <DeletePost postId={postId}></DeletePost> : null;

		return (
			<Card className={classes.card}>
				<CardMedia image={userImage} title="Profile image" className={classes.image} />
				<CardContent className={classes.content}>
					<Typography variant="h5" color="secondary" component={Link} to={`/users/${userHandle}`}>
						{title && title.length > 40 ? title.substr(0, 40) + '...' : title}
					</Typography>
					<hr style={{ width: '100%' }} />
					{deleteButton}
					<Typography variant="h6" color="primary" component={Link} to={`/users/${userHandle}`}>
						{userHandle}
					</Typography>

					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>

					<Typography variant="body1">{bodyFit}</Typography>
					<FollowButton postId={postId} />
					<span>{followCount} following</span>
					{/* <TooltipButton tip="comments" onClick={this.handleOpen}>
						<ChatIcon color="primary" />
					</TooltipButton> */}
					<CommentDialog postId={postId}></CommentDialog>
					<span>{commentCount} comments</span>
					<PostDialog postId={postId} userHandle={userHandle} openDialog={this.state.openDialog} />
				</CardContent>
			</Card>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	followPost: PropTypes.func.isRequired,
	unfollowPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	followPost,
	unfollowPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
