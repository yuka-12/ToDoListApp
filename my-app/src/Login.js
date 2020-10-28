import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { userActions } from './_actions/user.actions';
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.props.logout();

		this.state = {
			username: '',
			password: '',
			submitted: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		if (username && password) {
			this.props.login(username, password);
		}
	}

	render() {
		const { username, password, submitted } = this.state;
		return (
			<center>
				<div className='login-form'>
					<h2 className='mt-4 mb-5'>Login</h2>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter username'
								name='username'
								value={username}
								onChange={this.handleChange}
							/>
							{submitted && !username && (
								<div className='help-block text-danger mb-3'>
									Username is required
								</div>
							)}
						</Form.Group>

						<Form.Group className='mb-5' controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								name='password'
								value={password}
								onChange={this.handleChange}
							/>
							{submitted && !password && (
								<div className='help-block text-danger mb-3'>
									Password is required
								</div>
							)}
						</Form.Group>

						<Form.Group controlId='formBasicSubmit'>
							<Button variant='primary' type='submit'>
								Submit
							</Button>
							<Link to='/register'>
								<p className='mt-3'>Create new account</p>
							</Link>
						</Form.Group>
					</Form>
				</div>
			</center>
		);
	}
}

function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
// export default Login;
