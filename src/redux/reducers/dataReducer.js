import {
	SET_BUGS,
	LIKE_BUG,
	UNLIKE_BUG,
	LOADING_DATA,
	DELETE_BUG,
	POST_BUG,
	SET_BUG,
	SUBMIT_COMMENT
} from '../types';

const initialState = {
	bugs: [],
	bug: {},
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
		case SET_BUGS:
			return {
				...state,
				bugs: action.payload,
				loading: false
			};
		case SET_BUG: {
			return {
				...state,
				bug: action.payload
			};
		}
		case LIKE_BUG:
		case UNLIKE_BUG:
			index = state.bugs.findIndex(bug => bug.bugId === action.payload.bugId);
			state.bugs[index] = action.payload;
			if (state.bug.bugId === action.payload.bugId) {
				state.bug = action.payload;
			}
			return {
				...state
			};
		case DELETE_BUG:
			index = state.bugs.findIndex(bug => bug.bugId === action.payload);
			state.bugs.splice(index, 1);
			return {
				...state
			};
		case POST_BUG:
			return {
				...state,
				bugs: [action.payload, ...state.bugs]
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				bug: {
					...state.bug,
					comments: [action.payload, ...state.bug.comments]
				}
			};
		default:
			return state;
	}
}
