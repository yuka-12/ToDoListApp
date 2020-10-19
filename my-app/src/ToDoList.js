import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import DeleteButton from './DeleteButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';

const ToDoList = ({ item }) => {
	const [id] = useState(item.id);
	const [value, setValue] = useState(item.value);
	const [isEditing, setIsEditing] = useState(false);

	const updateTodo = () => {
		fetch('api/update.php', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify({
				value,
				id,
			}),
		})
			.catch((err) => console.log(err));
	};


	return (
		<li id={id}>
			<div className='p-2'>
				<Form>
					<Row>
						<Col>
							<span>
								{isEditing ? (
									<Form.Control
										type='text'
										value={value}
										onChange={(e) => setValue(e.target.value)}
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
											onClick={() => {
												updateTodo();
												setIsEditing(!isEditing);
												}}>
											Submit
										</Button>
									) : (
										<Button
											variant='outline-secondary'
											onClick={() => setIsEditing(!isEditing)}>
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
};


export default ToDoList;
