import React, { Component } from 'react';
import TooltipButton from '../../util/TooltipButton';
import { Link } from 'react-router-dom/';

import PropTypes from 'prop-types';

import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import { connect } from 'react-redux';
import { followBug, unfollowBug } from '../../redux/actions/dataActions';

export class FollowButton extends Component {
	followdBug = () => {
		if (
			this.props.user.follows &&
			this.props.user.follows.find(follow => follow.bugId === this.props.bugId)
		)
			return true;
		else return false;
	};

	followBug = () => {
		this.props.followBug(this.props.bugId);
	};

	unfollowBug = () => {
		this.props.unfollowBug(this.props.bugId);
	};
	render() {
		const { authenticated } = this.props.user;
		const followButton = !authenticated ? (
			<Link to="/login">
				<TooltipButton tip="Follow">
					<StarBorder color="primary" />
				</TooltipButton>
			</Link>
		) : this.followdBug() ? (
			<TooltipButton tip="Unfollow" onClick={this.unfollowBug}>
				<StarIcon color="primary" />
			</TooltipButton>
		) : (
			<TooltipButton tip="Follow" onClick={this.followBug}>
				<StarBorder color="primary" />
			</TooltipButton>
		);

		return followButton;
	}
}

FollowButton.propTypes = {
	user: PropTypes.object.isRequired,
	followBug: PropTypes.func.isRequired,
	unfollowBug: PropTypes.func.isRequired,
	bugId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	followBug,
	unfollowBug
};

export default connect(mapStateToProps, mapActionsToProps)(FollowButton);
