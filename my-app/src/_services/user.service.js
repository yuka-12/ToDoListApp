// import config from 'config';
import { authHeader } from '../_helpers/auth-header';

export const userService = {
	login,
	logout,
	register,
	create,
	getById,
	update,
	delete: _delete,
};

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
	};

	const url = '/api/login.php';
	// process.env.NODE_ENV && process.env.NODE_ENV === 'production'
	// ? 'https://todolist-php-api.herokuapp.com/login.php'
	// : '/api/login.php';

	return fetch(url, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('user', JSON.stringify(user));

			return user;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

function getById(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(`/api/get.php?user_id=${id}`, requestOptions).then(
		handleResponse
	);
}

function register(user) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};

	return fetch(`/api/register.php`, requestOptions).then(handleResponse);
}

function create(userId, value) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, value }),
	};

	return fetch(`/api/create.php`, requestOptions).then(handleResponse);
}

function update(id, value) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, value }),
	};

	return fetch(`/api/update.php`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(),
	};

	return fetch(`/api/delete.php?id=${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				window.location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
