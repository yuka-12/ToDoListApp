import { userConstants } from '../_constants/user.constants';
import { userService } from '../_services/user.service';
import { alertActions } from './alert.actions';
import { history } from '../_helpers/history';

export const userActions = {
	login,
	logout,
	register,
	create,
	getById,
	update,
	delete: _delete,
};

function login(username, password) {
	return (dispatch) => {
		dispatch(request({ username }));

		userService.login(username, password).then(
			(user) => {
				if (user.message) {
					dispatch(failure(user.message));
					dispatch(alertActions.error(user.message));
				} else {
					dispatch(success(user));
					history.push('/');
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

function register(user) {
	return (dispatch) => {
		dispatch(request(user));

		userService.register(user).then(
			(user) => {
				if (user.message) {
					dispatch(failure(user.message));
					dispatch(alertActions.error(user.message));
				} else {
					dispatch(success(user));
					history.push('/login');
					dispatch(alertActions.success('Registration successful'));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(user) {
		return { type: userConstants.REGISTER_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.REGISTER_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.REGISTER_FAILURE, error };
	}
}

function create(userId, value) {
	return (dispatch) => {
		dispatch(request(value));

		userService.create(userId, value).then(
			(value) => {
				if (value.message) {
					dispatch(failure(value.message));
					dispatch(alertActions.error(value.message));
				} else {
					dispatch(success(value));
					dispatch(alertActions.success());
					history.go(0);
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(value) {
		return { type: userConstants.CREATE_REQUEST, value };
	}
	function success(value) {
		return { type: userConstants.CREATE_SUCCESS, value };
	}
	function failure(value) {
		return { type: userConstants.CREATE_FAILURE, value };
	}
}

function getById(id) {
	return (dispatch) => {
		dispatch(request());

		userService.getById(id).then(
			(items) => dispatch(success(items)),
			(error) => dispatch(failure(error.toString()))
		);
	};

	function request() {
		return { type: userConstants.GETALL_REQUEST };
	}
	function success(items) {
		return { type: userConstants.GETALL_SUCCESS, items };
	}
	function failure(error) {
		return { type: userConstants.GETALL_FAILURE, error };
	}
}

function update(id, value) {
	return (dispatch) => {
		dispatch(request(value));

		userService.update(id, value).then(
			(value) => {
				if (value.message) {
					dispatch(failure(value.message));
					dispatch(alertActions.error(value.message));
				} else {
					dispatch(success(value));
					dispatch(alertActions.success());
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(value) {
		return { type: userConstants.UPDATE_REQUEST, value };
	}
	function success(value) {
		return { type: userConstants.UPDATE_SUCCESS, value };
	}
	function failure(value) {
		return { type: userConstants.UPDATE_FAILURE, value };
	}
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	return (dispatch) => {
		dispatch(request(id));

		userService.delete(id).then(
			(user) => {
				dispatch(success(id));
				history.go(0);
			},
			(error) => {
				dispatch(failure(id, error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(id) {
		return { type: userConstants.DELETE_REQUEST, id };
	}
	function success(id) {
		return { type: userConstants.DELETE_SUCCESS, id };
	}
	function failure(id, error) {
		return { type: userConstants.DELETE_FAILURE, id, error };
	}
}
