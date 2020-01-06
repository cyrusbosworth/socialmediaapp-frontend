import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBugs } from '../redux/actions/dataActions';

import Bug from '../components/bug/Bug';
import Profile from '../components/profile/Profile';
import BugSkeleton from '../util/BugSkeleton';

export class home extends Component {
	componentDidMount() {
		this.props.getBugs();
	}

	render() {
		const { bugs, loading } = this.props.data;
		let recentBugsMarkUp = !loading ? (
			bugs.map(bug => <Bug key={bug.bugId} bug={bug} />)
		) : (
			<BugSkeleton />
		);
		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{recentBugsMarkUp}
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
	getBugs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getBugs })(home);
