import {
	SET_POSTS,
	LOADING_DATA,
	FOLLOW_POST,
	UNFOLLOW_POST,
	DELETE_POST,
	SET_ERRORS,
	POST_POST,
	LOADING_UI,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
	SET_POST,
	SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

//get all posts
export const getPosts = () => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/posts')
		.then(res => {
			dispatch({
				type: SET_POSTS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: SET_POSTS,
				payload: []
			});
		});
};
// get one post detail
export const getPost = postId => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/post/${postId}`)
		.then(res => {
			dispatch({
				type: SET_POST,
				payload: res.data
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(err => console.log(err));
};
//Follow a post

export const followPost = postId => dispatch => {
	axios
		.get(`/post/${postId}/follow`)
		.then(res => {
			dispatch({
				type: FOLLOW_POST,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};
//Unfollow a post

export const unfollowPost = postId => dispatch => {
	axios
		.get(`/post/${postId}/unfollow`)

		.then(res => {
			dispatch({
				type: UNFOLLOW_POST,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

export const deletePost = postId => dispatch => {
	axios
		.delete(`/post/${postId}`)
		.then(() => {
			dispatch({
				type: DELETE_POST,
				payload: postId
			});
		})
		.catch(err => console.log(err));
};

export const postPost = newPost => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/post', newPost)
		.then(res => {
			dispatch({
				type: POST_POST,
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

export const submitComment = (postId, commentData) => dispatch => {
	axios
		.post(`/post/${postId}/comment`, commentData)
		.then(res => {
			dispatch({
				type: SUBMIT_COMMENT,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			console.log(err);
			//dispatch({ type: SET_ERRORS, payload: err.response.data });
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
			dispatch({ type: SET_POSTS, payload: res.data.posts });
		})
		.catch(err => {
			dispatch({ type: SET_POSTS, payload: null });
		});
};
