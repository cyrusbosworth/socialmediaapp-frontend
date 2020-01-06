import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import themeFile from './util/theme';
//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute.js';
//pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import user from './pages/user';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

//TODO infinite login loop refresh jwt token #17

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={home} />
							<AuthRoute exact path="/login" component={login} />
							<AuthRoute exact path="/signup" component={signup} />
							<Route exact path="/users/:handle" component={user} />
							<Route exact path="/users/:handle/bug/:bugId" component={user} />
						</Switch>
					</div>
				</Router>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
