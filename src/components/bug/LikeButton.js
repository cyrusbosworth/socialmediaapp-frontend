import React, { Component } from 'react';
import TooltipButton from '../../util/TooltipButton';
import { Link } from 'react-router-dom/';

import PropTypes from 'prop-types';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { connect } from 'react-redux';
import { likeBug, unlikeBug } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
	likedBug = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(like => like.bugId === this.props.bugId)
		)
			return true;
		else return false;
	};

	likeBug = () => {
		this.props.likeBug(this.props.bugId);
	};

	unlikeBug = () => {
		this.props.unlikeBug(this.props.bugId);
	};
	render() {
		const { authenticated } = this.props.user;
		const likeButton = !authenticated ? (
			<Link to="/login">
				<TooltipButton tip="Like">
					<FavoriteBorder color="primary" />
				</TooltipButton>
			</Link>
		) : this.likedBug() ? (
			<TooltipButton tip="Unlike" onClick={this.unlikeBug}>
				<FavoriteIcon color="primary" />
			</TooltipButton>
		) : (
			<TooltipButton tip="Like" onClick={this.likeBug}>
				<FavoriteBorder color="primary" />
			</TooltipButton>
		);

		return likeButton;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	likeBug: PropTypes.func.isRequired,
	unlikeBug: PropTypes.func.isRequired,
	bugId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeBug,
	unlikeBug
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
