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

import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldIcon from '@material-ui/icons/UnfoldMore';

import { connect } from 'react-redux';
import { getBug, clearErrors } from '../../redux/actions/dataActions';
import TooltipButton from '../../util/TooltipButton';
import FollowButton from './FollowButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = theme => ({
	...theme.globalStyles,

	profileImage: {
		maxWidth: 200,
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

class BugDialog extends Component {
	state = {
		open: false,
		oldPath: '',
		newPath: ''
	};

	handleOpen = () => {
		let oldPath = window.location.pathname;
		const { userHandle, bugId } = this.props;
		const newPath = `/users/${userHandle}/bug/${bugId}`;

		if (oldPath === newPath) oldPath = `users/${userHandle}`;

		window.history.pushState(null, null, newPath);

		this.setState({ open: true, oldPath, newPath });

		this.props.getBug(this.props.bugId);
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
			bug: {
				bugId,
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
					<FollowButton bugId={bugId} />
					<span>{followCount} following</span>
					<TooltipButton tip="comments">
						<ChatIcon color="primary" />
					</TooltipButton>
					<span>{commentCount} comments</span>
				</Grid>
				{commentCount > 0 && <hr className={classes.visSeparator}></hr>}
				<CommentForm bugId={bugId} />
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

BugDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	getBug: PropTypes.func.isRequired,
	bugId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	bug: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	bug: state.data.bug,
	UI: state.UI
});

const mapActionToProps = {
	getBug,
	clearErrors
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(BugDialog));
