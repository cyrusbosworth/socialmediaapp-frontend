import {
	SET_POSTS,
	FOLLOW_POST,
	UNFOLLOW_POST,
	LOADING_DATA,
	DELETE_POST,
	POST_POST,
	SET_POST,
	SUBMIT_COMMENT
} from '../types';

const initialState = {
	posts: [],
	post: {},
	loading: false
};

export default function(state = initialState, action) {
	let index;
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case SET_POST: {
			return {
				...state,
				post: action.payload
			};
		}
		case FOLLOW_POST:
		case UNFOLLOW_POST:
			index = state.posts.findIndex(post => post.postId === action.payload.postId);

			state.posts[index] = action.payload;

			if (state.post.postId === action.payload.postId) {
				state.post = action.payload;
			}

			return {
				...state
			};
		case DELETE_POST:
			index = state.posts.findIndex(post => post.postId === action.payload);
			state.posts.splice(index, 1);
			return {
				...state
			};
		case POST_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case SUBMIT_COMMENT:
			index = state.posts.findIndex(post => post.postId === action.payload.postId);
			console.log(index);
			const newPost = !state.post.postId ? state.posts[index] : state.post;
			console.log('State.post', state.post);
			console.log('newpost', newPost);

			newPost.commentCount = newPost.commentCount + 1;

			state.post = newPost;
			state.posts[index] = newPost;

			console.log(state.post);
			return {
				...state,
				post: {
					...state.post,
					comments: [action.payload, ...state.post.comments]
				}
			};

		default:
			return state;
	}
}
