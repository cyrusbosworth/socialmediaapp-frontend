import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom/';
import PropTypes from 'prop-types';
import TooltipButton from '../../util/TooltipButton';
import PostBug from '../bug/PostBug';

import Notifications from './Notifications';
//MUI stuff
import { AppBar, Toolbar, Button } from '@material-ui/core/';

import HomeIcon from '@material-ui/icons/Home';
import NotifIcon from '@material-ui/icons/Notifications';
import { connect } from 'react-redux';

export class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<PostBug></PostBug>

							<Link to="/">
								<TooltipButton tip="Home">
									<HomeIcon color="primary" />
								</TooltipButton>
							</Link>

							{/* <TooltipButton tip="Notifications">
								<NotifIcon color="primary" />
							</TooltipButton> */}
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
