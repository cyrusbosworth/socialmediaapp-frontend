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
import { followBug, unfollowBug } from '../../redux/actions/dataActions';
import TooltipButton from '../../util/TooltipButton';
import DeleteBug from './DeleteBug';
import BugDialog from './BugDialog';
import FollowButton from './FollowButton';

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
		padding: 25,
		width: '100%'
	}
};

export class Bug extends Component {
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
			bug: { body, createdAt, userImage, userHandle, commentCount, followCount, bugId, title },
			user: {
				authenticated,
				credentials: { handle }
			}
		} = this.props;

		const bodyFit = body.length > 250 ? body.substr(0, 250) + '...' : body;

		dayjs.extend(relativeTime);

		//TODO max body size certain amount of characters and ellipses

		const deleteButton =
			authenticated && userHandle === handle ? <DeleteBug bugId={bugId}></DeleteBug> : null;

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
					<FollowButton bugId={bugId} />
					<span>{followCount} following</span>
					<TooltipButton tip="comments" onClick={this.handleOpen}>
						<ChatIcon color="primary" />
					</TooltipButton>
					<span>{commentCount} comments</span>
					<BugDialog bugId={bugId} userHandle={userHandle} openDialog={this.state.openDialog} />
				</CardContent>
			</Card>
		);
	}
}

Bug.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	followBug: PropTypes.func.isRequired,
	unfollowBug: PropTypes.func.isRequired,
	bug: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	followBug,
	unfollowBug
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Bug));
