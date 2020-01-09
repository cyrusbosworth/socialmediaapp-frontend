import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom/';
import PropTypes from 'prop-types';
import TooltipButton from '../../util/TooltipButton';
import PostPost from '../post/PostPost';

import Notifications from './Notifications';
//MUI stuff
import { AppBar, Toolbar, Button } from '@material-ui/core/';

import HomeIcon from '@material-ui/icons/Home';

import { connect } from 'react-redux';

//TODO ADD TOOLTIPS
export class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<PostPost></PostPost>

							<Link to="/">
								<TooltipButton tip="Home">
									<HomeIcon color="primary" />
								</TooltipButton>
							</Link>

							<Notifications></Notifications>
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/login">
								Log in
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Sign Up
							</Button>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}
const mapStateToProps = state => ({
	authenticated: state.user.authenticated
});

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired
};
export default connect(mapStateToProps)(Navbar);
