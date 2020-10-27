import React, { useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import DeleteButton from '../DeleteButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions/user.actions';
import { connect, useSelector } from 'react-redux';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				username: '',
				password: '',
			},
			submitted: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				[name]: value,
			},
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.setState({ submitted: true });
		const { user } = this.state;
		if (user.username && user.password) {
			this.props.register(user);
		}
	}

	render() {
		const { registering } = this.props;
		const { user, submitted } = this.state;
		return (
			<center>
				<div className='register-form'>
					<h2 className='mt-4 mb-5'>Register</h2>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label
								className={submitted && !user.username ? ' has-error' : ''}>
								Username
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter username'
								name='username'
								value={user.username}
								onChange={this.handleChange}
							/>
							{submitted && !user.username && (
								<div className='help-block text-danger mb-3'>
									Username is required
								</div>
							)}
						</Form.Group>

						<Form.Group className='mb-5' controlId='formBasicPassword'>
							<Form.Label
								className={submitted && !user.password ? ' has-error' : ''}>
								Password
							</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								name='password'
								value={user.password}
								onChange={this.handleChange}
							/>
							{submitted && !user.password && (
								<div className='help-block text-danger mb-3'>
									Password is required
								</div>
							)}
						</Form.Group>

						<Form.Group controlId='formBasicSubmit'>
							<Button variant='primary' type='submit'>
								Submit
							</Button>
						</Form.Group>
					</Form>
				</div>
			</center>
		);
	}
}

function mapState(state) {
	const { registering } = state.registration;
	return { registering };
}

const actionCreators = {
	register: userActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
