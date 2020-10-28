import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { DeleteButton } from './DeleteButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import { userActions } from './_actions';
import { connect } from 'react-redux';

class ToDoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.item.id,
			value: this.props.item.value,
			isEditing: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleClick() {
		this.setState({ isEditing: true });
	}

	handleSubmit(event) {
		event.preventDefault();

		const { id, value } = this.state;
		if (value) {
			this.props.update(id, value);
		}
		this.setState({ isEditing: false });
	}

	render() {
		const { id, isEditing, value } = this.state;
		return (
			<li>
				<div className='p-2'>
					<Form>
						<Row>
							<Col>
								<span>
									{isEditing ? (
										<Form.Control
											type='text'
											name='value'
											value={value}
											onChange={this.handleChange}
										/>
									) : (
										value
									)}
								</span>
							</Col>
							<Col>
								<div className='float-right mr-5'>
									<span className='mr-3'>
										{isEditing ? (
											<Button
												variant='outline-secondary'
												onClick={this.handleSubmit}>
												Submit
											</Button>
										) : (
											<Button
												variant='outline-secondary'
												onClick={this.handleClick}>
												Edit
											</Button>
										)}
									</span>
									<span>
										<DeleteButton id={id} />
									</span>
								</div>
							</Col>
						</Row>
					</Form>
				</div>
			</li>
		);
	}
}

function mapState(state) {
	const { authentication } = state;
	const { user } = authentication;
	return { user };
}

const actionCreators = {
	update: userActions.update,
};

const connectedToDoListPage = connect(mapState, actionCreators)(ToDoList);
export { connectedToDoListPage as ToDoList };
