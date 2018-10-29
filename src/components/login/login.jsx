import React, { Component } from 'react';
import './login.scss';
import '../utility/user-api';
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			invalidLogin: false,
			password: false,
			username: false
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (event.target.checkValidity()) {
			// change error message class if any
			this.setState({
				username: false,
				password: false
			});

			// check if account can be created
		} else {
			// TODO: move this into a method
			let inputError = {
				username: this.state.username,
				password: this.state.password
			};

			for (let input of event.target.elements) {
				if (!input.checkValidity()) {
					inputError[input.name] = true;
				} else {
					inputError[input.name] = false;
				}
			}

			this.setState(inputError);
		}
	};

	render() {
		return (
			<div className="loginContainer">
				<div className="form">
					<form onSubmit={this.handleSubmit} noValidate>
						<h3>Sign In:</h3>
						<p className={this.state.invalidLogin ? 'visible' : 'hidden'}>
							Username or password is incorrect. Please try again.
						</p>
						<section>
							<label for="username">Username: </label>
							<input name="username" type="text" required />
							<label className={(this.state.username ? 'show' : 'hidden') + ' error-message'}>
								* Username is required
							</label>
						</section>
						<section>
							<label for="password">Password: </label>
							<input name="password" type="password" required />
							<label className={(this.state.password ? 'show' : 'hidden') + ' error-message'}>
								* Password is required
							</label>
						</section>
						<div className="flex-right">
							<button>Login</button>
						</div>
						<p className="center-text">
							Don't have an account?{' '}
							<Link to="/register">
								<span className="link">Register</span>
							</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
