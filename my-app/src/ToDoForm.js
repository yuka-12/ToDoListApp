import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const ToDoForm = () => {
	const [user_id] = useState(1);
	const [value, setValue] = useState('');

	const createNewTodo = () => {
		fetch('api/create.php', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			},
			body: JSON.stringify({
				user_id,
				value
			})
		})
			.catch(err => console.log(err));
	}
	return (
		<Form className='ml-2 mt-5' onSubmit={() => createNewTodo()}>
				<Form.Group controlId='formAddNewTodo'>
					<InputGroup className='mb-3'>
						<FormControl
							name='value'
							placeholder='new ToDo'
							aria-label='new ToDo'
							aria-describedby='basic-addon2'
							onChange={e => setValue(e.target.value)}
							/>
						<InputGroup.Append>
							<Button
								type='submit'
								variant='outline-secondary'
								>
								Add
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</Form.Group>
			 </Form>
	)
}



export default ToDoForm;
