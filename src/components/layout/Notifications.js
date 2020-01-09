import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom/';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import PropTypes from 'prop-types';

//MUI Stuff
import { Menu, MenuItem, IconButton, Tooltip, Typography, Badge } from '@material-ui/core';
//Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';

import { markNotificationsRead } from '../../redux/actions/userActions';

export class Notifications extends Component {
	constructor(props) {
		super(props);
		dayjs.extend(relativeTime);
	}
	state = {
		anchorEl: null
	};

	handleOpen = event => {
		this.setState({
			anchorEl: event.target
		});
	};

	handleClose = () => {
		this.setState({
			anchorEl: null
		});
	};

	onMenuOpened = () => {
		let unreadNotificationsIds = this.props.notifications
			.filter(note => !note.read)
			.map(note => note.notificationId);
		this.props.markNotificationsRead(unreadNotificationsIds);
	};

	render() {
		const notifications = this.props.notifications;
		const anchorEl = this.state.anchorEl;

		//This creates the badge on the icon if there are new notifications
		let notificationsIcon;
		if (notifications && notifications.length > 0) {
			let unread = notifications.filter(note => note.read === false).length;
			unread > 0
				? (notificationsIcon = (
						<Badge badgeContent={unread} color="secondary">
							<NotificationsIcon />
						</Badge>
				  ))
				: (notificationsIcon = <NotificationsIcon />);
		} else {
			notificationsIcon = <NotificationsIcon />;
		}

		let notificationsMarkup =
			notifications && notifications.length > 0 ? (
				notifications.map(note => {
					const verb = note.type === 'follow' ? 'followed' : 'commented on';
					const time = dayjs(note.createdAt).fromNow();
					const iconColor = note.read ? 'primary' : 'secondary';
					const icon =
						note.type === 'follow' ? (
							<FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
						) : (
							<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
						);

					return (
						<MenuItem key={note.createdAt} onClick={this.handleClose}>
							{icon}
							<Typography
								component={Link}
								variant="body1"
								to={`/users/${note.recipient}/post/${note.postId}`}
							>
								{note.sender} {verb} your post {time}
							</Typography>
						</MenuItem>
					);
				})
			) : (
				<MenuItem onClick={this.handleClose}>You have no notifications</MenuItem>
			);

		return (
			<Fragment>
				<Tooltip placement="bottom" title="Notifications">
					<IconButton
						aria-owns={anchorEl ? 'simple-menu' : undefined}
						aria-haspopup="true"
						onClick={this.handleOpen}
					>
						{notificationsIcon}
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					onEntered={this.onMenuOpened}
				>
					{notificationsMarkup}
				</Menu>
			</Fragment>
		);
	}
}
Notifications.propTypes = {
	markNotificationsRead: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	notifications: state.user.notifications
});
export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
