import React, { Component } from 'react';
import { Link } from 'react-router-dom/';

import {
	TextField,
	withStyles,
	Grid,
	Typography,
	Button,
	CircularProgress
} from '@material-ui/core';
import PropTypes from 'prop-types';
import AppIcon from '../images/posticon.svg';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = theme => ({
	...theme.globalStyles
});

export class signup extends Component {
	handleSubmit = event => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle
		};
		this.props.signupUser(newUserData, this.props.history);
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
			errors: {}
		};
	}

	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading }
		} = this.props;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="icon" className={classes.image} />
					<Typography variant="h2" className={classes.pageTitle}>
						Sign up
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						></TextField>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						></TextField>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirm Password"
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						></TextField>
						<TextField
							id="handle"
							name="handle"
							type="handle"
							label="User Handle"
							className={classes.textField}
							helperText={errors.handle}
							error={errors.handle ? true : false}
							value={this.state.handle}
							onChange={this.handleChange}
							fullWidth
						></TextField>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={loading}
							className={classes.button}
						>
							Sign Up
							{loading && <CircularProgress size={30} className={classes.progress} />}
						</Button>
						<br />

						<small>
							Already have an account? Login <Link to="/login">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
