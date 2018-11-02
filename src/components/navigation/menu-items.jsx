import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuItems extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	isUserLoggedIn = () => {
		const loggedIn = window.localStorage.hasOwnProperty(process.env.REACT_APP_JWT_KEY);

		if (loggedIn) {
			return <Link to="/logout">Logout</Link>;
		} else {
			return <Link to="/login">Login</Link>;
		}
	};

	render() {
		return (
			<React.Fragment>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/protected/shop">Shop</Link>
				</li>
				<li>
					<Link to="/protected/profile">Profile</Link>
				</li>
				<li>{this.isUserLoggedIn()}</li>
			</React.Fragment>
		);
	}
}

export default MenuItems;
