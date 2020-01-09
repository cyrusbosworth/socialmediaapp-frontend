import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom/';

import PropTypes from 'prop-types';
import dayjs from 'dayjs';

//TODO comment button needs to work
//TODO increment comment count ui on new comment

//MUI Stuff
import {
	Dialog,
	DialogContent,
	withStyles,
	CircularProgress,
	Grid,
	Typography
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import UnfoldIcon from '@material-ui/icons/UnfoldMore';

import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';
import TooltipButton from '../../util/TooltipButton';
import FollowButton from './FollowButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = theme => ({
	...theme.globalStyles,

	profileImage: {
		width: 200,
		height: 200,
		borderRadius: '50%',
		objectFit: 'cover'
	},
	dialogContent: {
		padding: '15px 25px'
	},
	closeButton: {
		position: 'absolute',
		left: '90%'
	},
	expandButton: {
		position: 'absolute',
		left: '90%'
	},
	spinner: {
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50
	}
});

class PostDialog extends Component {
	state = {
		open: false,
		oldPath: '',
		newPath: ''
	};

	handleOpen = () => {
		let oldPath = window.location.pathname;
		const { userHandle, postId } = this.props;
		const newPath = `/users/${userHandle}/post/${postId}`;

		if (oldPath === newPath) oldPath = `users/${userHandle}`;

		window.history.pushState(null, null, newPath);

		this.setState({ open: true, oldPath, newPath });

		this.props.getPost(this.props.postId);
	};

	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath);
		this.setState({ open: false });
		this.props.clearErrors();
	};

	componentDidMount() {
		if (this.props.openDialog) {
			this.handleOpen();
		}
	}

	render() {
		const {
			classes,
			post: {
				postId,
				body,
				createdAt,
				followCount,
				commentCount,
				userImage,
				userHandle,
				comments,
				title
			},
			UI: { loading }
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.spinner}>
				<CircularProgress size={150} thickness={2} />
			</div>
		) : (
			<Grid container spacing={1}>
				<Grid item sm={5} style={{ textAlign: 'center' }}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
					<Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
						@{userHandle}
					</Typography>
				</Grid>
				<Grid item sm={7}>
					<Typography color="secondary" variant="h5">
						{title}
					</Typography>
					<hr className={classes.invisSeparator} />
					<Typography color="primary" variant="body2">
						{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
					</Typography>
					<hr className={classes.invisSeparator} />
					<Typography color="primary" variant="body1">
						{body}
					</Typography>
					<FollowButton postId={postId} />
					{/* TODO style the counts with typography */}
					<span>{followCount} following and </span>

					<span> {commentCount} comments</span>
				</Grid>
				{commentCount > 0 && <hr className={classes.visSeparator}></hr>}
				<CommentForm postId={postId} />
				<Comments comments={comments} />
			</Grid>
		);
		return (
			<Fragment>
				<TooltipButton
					onClick={this.handleOpen}
					tip="Read More"
					tipClassName={classes.expandButton}
				>
					<UnfoldIcon color="primary" />
				</TooltipButton>

				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<TooltipButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</TooltipButton>
					<DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.data.post,
	UI: state.UI
});

const mapActionToProps = {
	getPost,
	clearErrors
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostDialog));
