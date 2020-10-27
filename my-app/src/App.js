import React, { useState, useEffect } from 'react';
import { PrivateRoute } from './_components';
import { Login } from './Login.js';
import { RegisterPage } from './RegisterPage/registerPage';
import { HomePage } from './HomePage.js';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	Redirect,
} from 'react-router-dom';
import { history } from './_helpers';
import { alertActions } from './_actions';
import { connect } from 'react-redux';

class App extends React.Component {
	constructor(props) {
		super(props);

		history.listen((location, action) => {
			// clear alert on location change
			this.props.clearAlerts();
		});
	}
	render() {
		const { alert } = this.props;

		return (
			<div className='App'>
				<div>
					{alert.message && (
						<div className={`alert ${alert.type}`}>{alert.message}</div>
					)}
				</div>
				<Navbar bg='light' sticky='top' className='justify-content-between'>
					<NavLink className='navbar-brand' to='/'>
						<h1> ToDoListApp </h1>
					</NavLink>
					<Nav>
						{this.props.authentication.loggedIn ? (
							<NavLink to='/login' className='ml-10'>
								<Button variant='outline-secondary'> Logout </Button>
							</NavLink>
						) : (
							<NavLink to='/login' className='ml-10'>
								<Button variant='secondary'> Login </Button>
							</NavLink>
						)}
					</Nav>
				</Navbar>
				<Container fluid>
					<Switch>
						<PrivateRoute exact path='/' component={HomePage} />
						<Route path='/login' component={Login} />
						<Route path='/register' component={RegisterPage} />
						<Redirect from='*' to='/' />
					</Switch>
				</Container>
			</div>
		);
	}
}

function mapState(state) {
	const { alert, authentication } = state;
	return { alert, authentication };
}

const actionCreators = {
	clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
