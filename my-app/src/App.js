import React, { useState, useEffect } from 'react';
import ToDoForm from './ToDoForm.js';
import ToDoList from './ToDoList.js';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const App = () => {
	const [error] = useState(null);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true)
			const res = await getTodos().catch(err => console.log(err));
			if (res) {
				setItems(res.item)
				setIsLoading(false)
			}
		})()
	}, [])

	const getTodos = async () => {
		const response = await fetch('/api/get.php');
		const data = await response.json();
		if (response.status !== 200) throw Error(data.message);
		setItems(data.item)
		return data
	};

	if (error) {
			return <div> {error.message} </div>;
	} else if (isLoading) {
		return <div> Loading... </div>;
	}
	
	return (
				<div className='App'>
					<Navbar bg='light' sticky='top' className='justify-content-between'>
						<a className='navbar-brand' href='/'>
							<h1> ToDoListApp </h1>
						</a>
						<Nav>
							<Nav.Link href='/' className='ml-10'>
								<Button variant='secondary'> Login </Button>
							</Nav.Link>
						</Nav>
					</Navbar>
					<Container fluid>
						<Row>
							<Col md='3' lg='3'>
								<p className='ml-2 mt-4'> Friends list </p>
							</Col>
							<Col md='9' lg='9'>
								<div className='ml-2 mt-4'>
									<h2 className='mb-4'> Your ToDoList </h2>
									<hr></hr>
									<ToDoForm />
									<div className='mt-3 d-flex flex-column'>
										<ul>
										{items.map(item => (
											<ToDoList item={item} />
										))}
										</ul>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			);
		}


export default App;
