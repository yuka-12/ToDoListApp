import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ToDoForm } from './ToDoForm.js';
import { ToDoList } from './ToDoList.js';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';

import { userActions } from './_actions';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.user.user_id);
	}

	render() {
		const { users } = this.props;
		return (
			<Row>
				<Col md='3' lg='3'>
					<p className='ml-2 mt-4'>Welcome, {this.props.user.userName} !</p>
				</Col>
				<Col md='9' lg='9'>
					<div className='ml-2 mt-4'>
						<h2 className='mb-4'> Your ToDoList </h2>
						<hr></hr>
						<ToDoForm />
						<div className='mt-3 d-flex flex-column'>
							<ul>
								{users.items &&
									users.items.item.map((item) => (
										<ToDoList key={item.id} item={item} />
									))}
							</ul>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

function mapState(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return { user, users };
}

const actionCreators = {
	getUsers: userActions.getById,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
// export default HomePage;
