import {
	SET_BUGS,
	FOLLOW_BUG,
	UNFOLLOW_BUG,
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
		case FOLLOW_BUG:
		case UNFOLLOW_BUG:
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
			index = state.bugs.findIndex(bug => bug.bugId === action.payload.bugId);
			console.log(index);
			const newBug = !state.bug.bugId ? state.bugs[index] : state.bug;
			console.log('State.bug', state.bug);
			console.log('newbug', newBug);

			newBug.commentCount = newBug.commentCount + 1;

			state.bug = newBug;
			state.bugs[index] = newBug;

			console.log(state.bug);
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
