import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import NavBar from './components/navigation/navigation';
import NavBarMobile from './components/navigation/navigation-mobile';
import Footer from './components/footer/footer';
import PageNotFound from './components/web-status-error/page-not-found';
import Register from './components/login/register';
import Logout from './components/logout/logout';
import UserAPI from './components/utility/user-api';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: false
		};
	}

	componentDidMount() {
		let viewportWidth = document.documentElement.clientWidth;

		// TODO: make this mobile value an env variable?
		let mobileWidth = 457;

		if (viewportWidth <= mobileWidth) {
			this.setState({
				isMobile: true
			});
		}

		// Add window listener;
		window.addEventListener('resize', () => {
			let viewportWidth = document.documentElement.clientWidth;

			if (viewportWidth <= mobileWidth) {
				this.setState({
					isMobile: true
				});
			} else {
				this.setState({
					isMobile: false
				});
			}
		});
	}

	checkIfUserIsAuthenticated = () => {
		UserAPI.isAuthenticated(process.env.REACT_APP_JWT_KEY).then((result) => {
			console.log(result);
			return false;
		});
	};

	render() {
		return (
			<div className="App">
				<Route
					render={(props) => {
						if (this.state.isMobile) {
							return <NavBarMobile />;
						} else {
							return <NavBar />;
						}
					}}
				/>
				<div id="content">
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/logout" component={Logout} />
						<Route path="/register" component={Register} />
						<Route exact path="/" component={Home} />
						<Route
							path="/protected"
							render={(props) => {
								const isUserAuthenticated = this.checkIfUserIsAuthenticated();
								console.log('value is ', isUserAuthenticated);
								if (isUserAuthenticated) {
									return <p>Hello</p>;
								} else {
									return (
										<Redirect
											to={{
												pathname: '/login',
												state: { message: 'You must login first to access this page' }
											}}
										/>
									);
								}
							}}
						/>
						<Route component={PageNotFound} />
					</Switch>
				</div>
				<div>
					<Footer />
				</div>
			</div>
		);
	}
}

export default App;
