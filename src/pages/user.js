import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

//Components
import Bug from '../components/bug/Bug';
import StaticProfile from '../components/profile/StaticProfile';
import BugSkeleton from '../util/BugSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import axios from 'axios';

class user extends Component {
	state = {
		profile: null,
		bugIdParam: null
	};
	componentDidMount() {
		const handle = this.props.match.params.handle;
		const bugId = this.props.match.params.bugId;

		if (bugId) this.setState({ bugIdParam: bugId });
		this.props.getUserData(handle);
		axios
			.get(`/user/${handle}`)
			.then(res => {
				this.setState({
					profile: res.data.user
				});
			})
			.catch(err => console.log(err));
	}
	render() {
		const { bugs, loading } = this.props.data;
		const { bugIdParam } = this.state;

		let bugMarkup = loading ? (
			<BugSkeleton />
		) : bugs === null ? (
			<p>No bugs submitted by this user</p>
		) : !bugIdParam ? (
			bugs.map(bug => <Bug key={bug.bugId} bug={bug} />)
		) : (
			bugs.map(bug => {
				if (bug.bugId !== bugIdParam) {
					return <Bug key={bug.bugId} bug={bug} />;
				} else {
					return <Bug key={bug.bugId} bug={bug} openDialog />;
				}
			})
		);

		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{bugMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<ProfileSkeleton />
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	//classes: PropTypes.object.isRequired,

	//	dataActions: PropTypes.object.isRequired
	getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
