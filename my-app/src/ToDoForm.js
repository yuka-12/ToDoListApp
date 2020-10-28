import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { userActions } from './_actions';
import { connect } from 'react-redux';

class ToDoForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
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
		const { value } = this.state;

		const userId = this.props.user.user_id;
		console.log(this.state);
		console.log(value);

		if (value) {
			this.props.create(userId, value);
		}
	}

	render() {
		return (
			<Form className='ml-2 mt-5' onSubmit={this.handleSubmit}>
				<Form.Group controlId='formAddNewTodo'>
					<InputGroup className='mb-3'>
						<FormControl
							name='value'
							placeholder='new ToDo'
							aria-label='new ToDo'
							aria-describedby='basic-addon2'
							onChange={this.handleChange}
						/>
						<InputGroup.Append>
							<Button type='submit' variant='outline-secondary'>
								Add
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</Form.Group>
			</Form>
		);
	}
}

function mapState(state) {
	const { authentication } = state;
	const { user } = authentication;
	return { user };
}

const actionCreators = {
	create: userActions.create,
};

const connectedToDoFormPage = connect(mapState, actionCreators)(ToDoForm);
export { connectedToDoFormPage as ToDoForm };
