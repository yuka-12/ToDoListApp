import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { userActions } from './_actions';
import { connect } from 'react-redux';

class DeleteButton extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const confirm = window.confirm('Are you sure you want to delete?');
		if (confirm) {
			this.props.delete(this.props.id);
		}
	}
	render() {
		return (
			<Button variant='outline-danger' onClick={this.handleClick}>
				Delete
			</Button>
		);
	}
}

function mapState(state) {
	const { authentication } = state;
	const { user } = authentication;
	return { user };
}

const actionCreators = {
	delete: userActions.delete,
};

const connectedDeleteButton = connect(mapState, actionCreators)(DeleteButton);
export { connectedDeleteButton as DeleteButton };
