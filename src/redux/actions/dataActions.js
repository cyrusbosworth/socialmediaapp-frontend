import {
	SET_BUGS,
	LOADING_DATA,
	LIKE_BUG,
	UNLIKE_BUG,
	DELETE_BUG,
	SET_ERRORS,
	POST_BUG,
	LOADING_UI,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
	SET_BUG,
	SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

//get all bugs
export const getBugs = () => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/bugs')
		.then(res => {
			dispatch({
				type: SET_BUGS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: SET_BUGS,
				payload: []
			});
		});
};
// get one bug detail
export const getBug = bugId => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/bug/${bugId}`)
		.then(res => {
			dispatch({
				type: SET_BUG,
				payload: res.data
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(err => console.log(err));
};
//Like a bug

export const likeBug = bugId => dispatch => {
	axios
		.get(`/bug/${bugId}/like`)
		.then(res => {
			dispatch({
				type: LIKE_BUG,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};
//Unlike a bug

export const unlikeBug = bugId => dispatch => {
	axios
		.get(`/bug/${bugId}/unlike`)
		.then(res => {
			dispatch({
				type: UNLIKE_BUG,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

export const deleteBug = bugId => dispatch => {
	axios
		.delete(`/bug/${bugId}`)
		.then(() => {
			dispatch({
				type: DELETE_BUG,
				payload: bugId
			});
		})
		.catch(err => console.log(err));
};

export const postBug = newBug => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/bug', newBug)
		.then(res => {
			dispatch({
				type: POST_BUG,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const submitComment = (bugId, commentData) => dispatch => {
	axios
		.post(`/bug/${bugId}/comment`, commentData)
		.then(res => {
			dispatch({
				type: SUBMIT_COMMENT,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({ type: SET_ERRORS, payload: err.response.data });
		});
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};

export const getUserData = userHandle => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${userHandle}`)
		.then(res => {
			dispatch({ type: SET_BUGS, payload: res.data.bugs });
		})
		.catch(err => {
			dispatch({ type: SET_BUGS, payload: null });
		});
};
