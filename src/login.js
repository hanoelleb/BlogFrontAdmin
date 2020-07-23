import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import styles from './form.module.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
	this.state = ({username: '', password: '', redirect: false});
    }

    handleSubmit(event) {
        event.preventDefault();

	const message = {
	    username: this.state.username,
            password: this.state.password
	};
        
	var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
	const response =
            fetch(real + 'api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)})
                .then(response => response.json())
                .then( data => {
		    localStorage.setItem('token', data.token);
                    console.log(localStorage.getItem('token'));
		    this.setState({redirect: true});
                });
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    render() {
        var isInvalid = this.username === '' ||
		        this.password === '';

	if (this.state.redirect) 
	    return < Redirect to='/blog' />
        return (
	<div>
            <form className={styles.form} onSubmit={this.handleSubmit}>
		<h2>Login</h2>
		<input type='text' placeholder='Username' name='username'
		    onChange={this.handleChange}
		    value={this.state.username}
		>
		</input>

		<input type='password' placeholder='Password' name='password'
		    onChange={this.handleChange}
	            value={this.state.password}
		>
		</input>

		<input type='submit' value='Login' disabled={isInvalid}>
		</input>
            </form>		
	    <Link to='/register'>No account? Register</Link>
	</div>
	)
    }
}

export default LoginForm;
