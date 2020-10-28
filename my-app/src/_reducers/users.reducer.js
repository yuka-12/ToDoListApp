import { userConstants } from '../_constants';

export function users(state = {}, action) {
	switch (action.type) {
		case userConstants.GETALL_REQUEST:
			return {
				loading: true,
			};
		case userConstants.GETALL_SUCCESS:
			return {
				items: action.items,
			};
		case userConstants.GETALL_FAILURE:
			return {
				error: action.error,
			};
		case userConstants.DELETE_REQUEST:
			// add 'deleting:true' property to user being deleted
			return {
				...state,
				deleting: true,
			};
		case userConstants.DELETE_SUCCESS:
			// remove deleted user from state
			return {
				items: {
					item: state.items.item.filter((item) => item.id !== action.id),
				},
			};
		case userConstants.DELETE_FAILURE:
			// remove 'deleting:true' property and add 'deleteError:[error]' property to user
			return {
				...state,
				items: {
					item: state.items.item.map((item) => {
						if (item.id === action.id) {
							// make copy of user without 'deleting:true' property
							const { deleting, ...userCopy } = item;
							// return copy of user with 'deleteError:[error]' property
							return { ...userCopy, deleteError: action.error };
						}

						return item;
					}),
				},
			};
		default:
			return state;
	}
}
