import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	FOLLOW_POST,
	UNFOLLOW_POST,
	MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
	authenticated: false,
	loading: false,
	credentials: {},
	follows: [],
	notifications: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload
			};
		case LOADING_USER:
			return {
				...state,
				loading: true
			};

		case FOLLOW_POST:
			return {
				...state,
				follows: [
					...state.follows,
					{
						userHandle: state.credentials.handle,
						postId: action.payload.postId
					}
				]
			};
		case UNFOLLOW_POST:
			return {
				...state,
				follows: state.follows.filter(follow => follow.postId !== action.payload.postId)
			};
		case MARK_NOTIFICATIONS_READ:
			state.notifications.forEach(note => (note.read = true));
			return {
				...state
			};
		default:
			return state;
	}
}
