import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../redux/actions/dataActions';

import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PostSkeleton from '../util/PostSkeleton';

export class home extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.data;
		let recentPostsMarkUp = !loading ? (
			posts.map(post => <Post key={post.postId} post={post} />)
		) : (
			<PostSkeleton />
		);
		return (
			<Grid container spacing={5}>
				<Grid item sm={8} xs={12}>
					{recentPostsMarkUp}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
	data: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getPosts })(home);
