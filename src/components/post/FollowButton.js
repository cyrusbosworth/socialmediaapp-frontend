import React, { Component } from 'react';
import TooltipButton from '../../util/TooltipButton';
import { Link } from 'react-router-dom/';

import PropTypes from 'prop-types';

import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import { connect } from 'react-redux';
import { followPost, unfollowPost } from '../../redux/actions/dataActions';

export class FollowButton extends Component {
	followdPost = () => {
		if (
			this.props.user.follows &&
			this.props.user.follows.find(follow => follow.postId === this.props.postId)
		)
			return true;
		else return false;
	};

	followPost = () => {
		this.props.followPost(this.props.postId);
	};

	unfollowPost = () => {
		this.props.unfollowPost(this.props.postId);
	};
	render() {
		const { authenticated } = this.props.user;
		const followButton = !authenticated ? (
			<Link to="/login">
				<TooltipButton tip="Follow">
					<StarBorder color="primary" />
				</TooltipButton>
			</Link>
		) : this.followdPost() ? (
			<TooltipButton tip="Unfollow" onClick={this.unfollowPost}>
				<StarIcon color="primary" />
			</TooltipButton>
		) : (
			<TooltipButton tip="Follow" onClick={this.followPost}>
				<StarBorder color="primary" />
			</TooltipButton>
		);

		return followButton;
	}
}

FollowButton.propTypes = {
	user: PropTypes.object.isRequired,
	followPost: PropTypes.func.isRequired,
	unfollowPost: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	followPost,
	unfollowPost
};

export default connect(mapStateToProps, mapActionsToProps)(FollowButton);
